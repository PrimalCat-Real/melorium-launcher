use futures::StreamExt;
use serde::{Deserialize, Serialize};
use tauri::Emitter;
use tokio::io::AsyncWriteExt;
use tracing::{error, info, warn};

use crate::modrinth::api::pack::install_from::CreatePackLocation;
use crate::modrinth::api::pack::install_mrpack::install_zipped_mrpack;
use crate::modrinth::api::profile::remove as profile_remove;
use crate::modrinth::state::ProfileInstallStage;
use crate::modrinth::{emit_loading, init_loading, EventState, LoadingBarType};
use crate::modrinth::prelude::ModLoader;
use crate::modrinth::profile::create::profile_create;

use super::state::{self, ModpackState};
use super::MANIFEST_URL;

#[derive(Serialize, Clone)]
struct PackDownloadBytesPayload {
    downloaded: u64,
    total: u64,
}

/// Shape of the JSON your backend returns at MANIFEST_URL
///
/// Example response:
/// ```json
/// { "version": "1.0.5", "mrpack_url": "https://files.melorium.com/melorium-1.0.5.mrpack" }
/// ```
#[derive(Deserialize, Debug)]
pub struct PackManifest {
    pub version: String,
    pub mrpack_url: String,
}

/// Returned to the frontend so the UI knows what to show
#[derive(Serialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct ModpackInfo {
    pub is_installed: bool,
    pub installed_version: Option<String>,
    pub remote_version: String,
    pub needs_update: bool,
}

async fn fetch_manifest() -> Result<PackManifest, String> {
    reqwest::get(MANIFEST_URL)
        .await
        .map_err(|err| format!("Failed to reach manifest: {err}"))?
        .json::<PackManifest>()
        .await
        .map_err(|err| format!("Invalid manifest JSON: {err}"))
}

/// Check whether an update is available without installing anything.
/// Safe to call at startup — does not require modrinth State.
pub async fn check_update() -> Result<ModpackInfo, String> {
    let local = state::load().await;
    info!("check_update; local_version={:?}", local.installed_version);

    let manifest = fetch_manifest().await?;
    info!("check_update; remote_version={}", manifest.version);

    let needs_update = local
        .installed_version
        .as_deref()
        .map(|installed| installed != manifest.version)
        .unwrap_or(true);

    let result = ModpackInfo {
        is_installed: local.installed_version.is_some(),
        installed_version: local.installed_version,
        remote_version: manifest.version,
        needs_update,
    };
    info!(
        "check_update; is_installed={} needs_update={}",
        result.is_installed, result.needs_update
    );
    Ok(result)
}

/// Install or update the modpack.
/// Requires modrinth State to already be initialised by the caller.
pub async fn install_or_update(profile_name: &str, force: bool) -> Result<(), String> {
    let local = state::load().await;
    info!("install_or_update; profile={profile_name} force={force} local_version={:?}", local.installed_version);

    let manifest = fetch_manifest().await?;
    info!("install_or_update; remote_version={}", manifest.version);

    if !force && local.installed_version.as_deref() == Some(&manifest.version) {
        info!("Modpack {} is already up to date, skipping install", manifest.version);
        return Ok(());
    }

    // Remove the old profile so we start clean (preserves nothing — this is a
    // server-oriented modpack where world data lives on the server).
    // Clear state BEFORE removing so a failed install doesn't leave stale "installed" state.
    if local.installed_version.is_some() {
        info!("Clearing local state before profile removal to prevent stale install marker");
        let _ = state::save(&ModpackState::default()).await;
        info!("Removing old modpack profile for update");
        let _ = profile_remove(profile_name).await;
    }

    // Create a blank profile — install_zipped_mrpack overwrites game_version /
    // loader / loader_version from the pack manifest anyway
    info!("Creating blank profile '{profile_name}'");
    profile_create(
        profile_name.to_string(),
        "1.21.1".to_string(),
        ModLoader::Vanilla,
        None,
        None,
        None,
        Some(true), // skip_install: pack installer handles everything
    )
    .await
    .map_err(|err| format!("Failed to create profile: {err}"))?;
    info!("Profile '{profile_name}' created");

    // Download the .mrpack to a temporary file with streaming progress
    info!("Downloading modpack {} from {}", manifest.version, manifest.mrpack_url);
    let response = reqwest::get(&manifest.mrpack_url)
        .await
        .map_err(|err| format!("Failed to download mrpack: {err}"))?;
    info!("mrpack HTTP response status={}", response.status());

    let total_bytes = response.content_length().unwrap_or(0);
    info!("mrpack content_length={total_bytes}");

    let loading_bar = init_loading(
        LoadingBarType::PackDownload {
            profile_path: profile_name.to_string(),
            pack_name: "Melorium".to_string(),
            icon: None,
            pack_id: None,
            pack_version: Some(manifest.version.clone()),
        },
        if total_bytes > 0 { total_bytes as f64 } else { 1.0 },
        "Загрузка модпака",
    )
    .await
    .map_err(|err| err.to_string())?;

    let tmp_dir = tempfile::tempdir().map_err(|err| err.to_string())?;
    let tmp_path = tmp_dir.path().join("modpack.mrpack");
    let mut file = tokio::fs::File::create(&tmp_path)
        .await
        .map_err(|err| format!("Failed to create temp file: {err}"))?;

    let mut downloaded_bytes = 0u64;
    let mut last_emitted_frac = 0.0f64;
    let mut stream = response.bytes_stream();

    while let Some(chunk_result) = stream.next().await {
        let chunk = chunk_result.map_err(|err| format!("Download error: {err}"))?;
        let chunk_len = chunk.len() as u64;
        downloaded_bytes += chunk_len;

        file.write_all(&chunk)
            .await
            .map_err(|err| format!("Failed to write chunk: {err}"))?;

        if total_bytes > 0 {
            let _ = emit_loading(&loading_bar, chunk_len as f64, None);

            let current_frac = downloaded_bytes as f64 / total_bytes as f64;
            if current_frac - last_emitted_frac >= 0.005 || downloaded_bytes >= total_bytes {
                last_emitted_frac = current_frac;
                if let Ok(event_state) = EventState::get() {
                    let _ = event_state.app.emit(
                        "pack_download_bytes",
                        PackDownloadBytesPayload { downloaded: downloaded_bytes, total: total_bytes },
                    );
                }
            }
        }
    }

    file.flush().await.map_err(|err| format!("Failed to flush file: {err}"))?;
    drop(file);
    drop(loading_bar); // emits fraction: None → signals pack_download complete
    info!("Mrpack downloaded ({downloaded_bytes} bytes), starting install pipeline");

    // Run the full install pipeline (downloads mods, applies overrides, installs Minecraft)
    install_zipped_mrpack(
        CreatePackLocation::FromFile { path: tmp_path },
        profile_name.to_string(),
    )
    .await
    .map_err(|err| {
        error!("install_zipped_mrpack failed: {err}");
        format!("Modpack install failed: {err}")
    })?;
    info!("install_zipped_mrpack completed");

    // install_zipped_mrpack leaves the profile in PackInstalling — advance it so
    // the launcher can proceed to install Minecraft on first launch.
    // If install_minecraft already ran internally and set Installed, this is a no-op in effect.
    match crate::modrinth::api::profile::edit(profile_name, |prof| {
        prof.install_stage = ProfileInstallStage::PackInstalled;
        async { Ok(()) }
    })
    .await
    {
        Ok(_) => info!("Profile install_stage set to PackInstalled"),
        Err(err) => warn!("Could not set install_stage to PackInstalled: {err} (continuing)"),
    }

    state::save(&ModpackState {
        installed_version: Some(manifest.version.clone()),
        profile_path: Some(profile_name.to_string()),
    })
    .await?;

    info!("Modpack {} installed and state saved successfully", manifest.version);
    Ok(())
}

/// Returns true if the profile directory exists and contains at least one file.
pub fn is_profile_dir_present(install_path: &str, profile_name: &str) -> bool {
    let dir = std::path::Path::new(install_path)
        .join("profiles")
        .join(profile_name);
    dir.exists() && std::fs::read_dir(&dir).map(|mut it| it.next().is_some()).unwrap_or(false)
}
