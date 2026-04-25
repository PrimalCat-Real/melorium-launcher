use serde::{Deserialize, Serialize};
use tracing::info;

use crate::modrinth::api::pack::install_from::CreatePackLocation;
use crate::modrinth::api::pack::install_mrpack::install_zipped_mrpack;
use crate::modrinth::api::profile::remove as profile_remove;
use crate::modrinth::prelude::ModLoader;
use crate::modrinth::profile::create::profile_create;

use super::state::{self, ModpackState};
use super::MANIFEST_URL;

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
    let manifest = fetch_manifest().await?;

    let needs_update = local
        .installed_version
        .as_deref()
        .map(|installed| installed != manifest.version)
        .unwrap_or(true);

    Ok(ModpackInfo {
        is_installed: local.installed_version.is_some(),
        installed_version: local.installed_version,
        remote_version: manifest.version,
        needs_update,
    })
}

/// Install or update the modpack.
/// Requires modrinth State to already be initialised by the caller.
pub async fn install_or_update(profile_name: &str) -> Result<(), String> {
    let local = state::load().await;
    let manifest = fetch_manifest().await?;

    if local.installed_version.as_deref() == Some(&manifest.version) {
        info!("Modpack {} is already up to date", manifest.version);
        return Ok(());
    }

    // Remove the old profile so we start clean (preserves nothing — this is a
    // server-oriented modpack where world data lives on the server)
    if local.installed_version.is_some() {
        info!("Removing old modpack profile for update");
        let _ = profile_remove(profile_name).await;
    }

    // Create a blank profile — install_zipped_mrpack overwrites game_version /
    // loader / loader_version from the pack manifest anyway
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

    // Download the .mrpack to a temporary file
    info!("Downloading modpack {} from {}", manifest.version, manifest.mrpack_url);
    let mrpack_bytes = reqwest::get(&manifest.mrpack_url)
        .await
        .map_err(|err| format!("Failed to download mrpack: {err}"))?
        .bytes()
        .await
        .map_err(|err| format!("Failed to read mrpack bytes: {err}"))?;

    let tmp_dir = tempfile::tempdir().map_err(|err| err.to_string())?;
    let tmp_path = tmp_dir.path().join("modpack.mrpack");
    tokio::fs::write(&tmp_path, &mrpack_bytes)
        .await
        .map_err(|err| format!("Failed to write temp mrpack: {err}"))?;

    // Run the full install pipeline (downloads mods, applies overrides, installs Minecraft)
    install_zipped_mrpack(
        CreatePackLocation::FromFile { path: tmp_path },
        profile_name.to_string(),
    )
    .await
    .map_err(|err| format!("Modpack install failed: {err}"))?;

    state::save(&ModpackState {
        installed_version: Some(manifest.version.clone()),
        profile_path: Some(profile_name.to_string()),
    })
    .await?;

    info!("Modpack {} installed successfully", manifest.version);
    Ok(())
}
