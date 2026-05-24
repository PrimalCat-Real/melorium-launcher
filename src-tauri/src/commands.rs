use crate::modrinth::State;
use crate::modrinth::api::profile::run as profile_run;
use crate::modrinth::prelude::ModLoader;
use crate::modrinth::profile::QuickPlayType;
use crate::modrinth::profile::create::profile_create;
use crate::modpack;

use tracing::info;

#[tauri::command]
pub async fn download_minecraft(app_handle: tauri::AppHandle) -> Result<(), String> {
    info!("Initializing state for download...");
    let _ = crate::modrinth::EventState::init(app_handle.clone()).await;
    let _ = State::init("com.melorium.launcher".to_string()).await;

    let _state = State::get().await.map_err(|e| e.to_string())?;

    info!("Creating profile for Minecraft 1.21.1 with NeoForge...");
    let profile_name = "MeloriumTest".to_string();

    // Check if profile exists, if not create it
    let result = profile_create(
        profile_name.clone(),
        "1.21.1".to_string(), // Game version
        ModLoader::NeoForge,  // Modloader
        None,                 // latest neoforge
        None,
        None,
        Some(false), // Don't skip install, actually download and install the game
    )
    .await;

    match result {
        Ok(path) => {
            info!("Profile created and installed successfully at {}", path);
            Ok(())
        }
        Err(e) => {
            let err_str = format!("Failed to create profile: {}", e);
            if err_str.contains("Profile .json exists") {
                info!("Profile already exists, skipping creation");
                Ok(())
            } else {
                Err(err_str)
            }
        }
    }
}

#[tauri::command]
pub async fn play_minecraft(app_handle: tauri::AppHandle) -> Result<(), String> {
    info!("Initializing state for play...");
    let _ = crate::modrinth::EventState::init(app_handle.clone()).await;
    let _ = State::init("com.melorium.launcher".to_string()).await;
    let state = State::get().await.map_err(|e| e.to_string())?;

    info!("Setting up dummy credentials 'Test'...");
    // Create and upsert credentials directly
    let _uuid = uuid::Uuid::parse_str("00000000-0000-0000-0000-000000000000").unwrap();
    let _ = sqlx::query(
        "
        INSERT INTO minecraft_users (uuid, active, username, access_token, refresh_token, expires)
        VALUES ($1, TRUE, $2, $3, $4, $5)
        ON CONFLICT (uuid) DO UPDATE SET active = TRUE, username = $2, access_token = $3, refresh_token = $4, expires = $5
        "
    )
    .bind("00000000-0000-0000-0000-000000000000")
    .bind("Test")
    .bind("Test")
    .bind("Test")
    .bind(9999999999i64)
    .execute(&state.pool)
    .await;

    info!("Launching MeloriumTest...");
    let profile = crate::modrinth::profile::get("MeloriumTest")
        .await
        .map_err(|e| e.to_string())?
        .ok_or_else(|| "Profile MeloriumTest not found. You must download first!".to_string())?;

    match profile_run(&profile.path, QuickPlayType::None).await {
        Ok(_) => {
            info!("Successfully launched MeloriumTest!");
            Ok(())
        }
        Err(e) => {
            let err_msg = format!("Failed to launch profile: {:?}", e);
            tracing::error!("{}", err_msg);
            Err(err_msg)
        }
    }
}

/// Returns the current modpack status + whether an update is available.
/// Safe to call at startup — does not trigger any install.
#[tauri::command]
pub async fn get_modpack_info() -> Result<modpack::ModpackInfo, String> {
    modpack::check_update().await
}

#[derive(serde::Serialize)]
pub struct PathCheckResult {
    pub ok: bool,
    pub error_kind: Option<String>,
    pub free_bytes: Option<u64>,
}

const MIN_FREE_BYTES: u64 = 2 * 1024 * 1024 * 1024;

#[tauri::command]
pub fn check_install_path(path: String) -> PathCheckResult {
    use std::path::Path;
    use sysinfo::Disks;

    let target = Path::new(&path);

    // Walk up to find the nearest existing ancestor
    let existing = {
        let mut current = target;
        loop {
            if current.exists() {
                break current;
            }
            match current.parent() {
                Some(parent) => current = parent,
                None => {
                    return PathCheckResult {
                        ok: false,
                        error_kind: Some("no_permission".to_string()),
                        free_bytes: None,
                    };
                }
            }
        }
    };

    // Test write permission via a temp file
    let test_file = existing.join(".melorium_write_test");
    match std::fs::File::create(&test_file) {
        Ok(_) => {
            let _ = std::fs::remove_file(&test_file);
        }
        Err(_) => {
            return PathCheckResult {
                ok: false,
                error_kind: Some("no_permission".to_string()),
                free_bytes: None,
            };
        }
    }

    // Find the disk that covers this path and check free space
    let disks = Disks::new_with_refreshed_list();
    let free_bytes = disks
        .iter()
        .filter(|disk| existing.starts_with(disk.mount_point()))
        .max_by_key(|disk| disk.mount_point().as_os_str().len())
        .map(|disk| disk.available_space());

    match free_bytes {
        Some(free) if free < MIN_FREE_BYTES => PathCheckResult {
            ok: false,
            error_kind: Some("no_free_space".to_string()),
            free_bytes: Some(free),
        },
        Some(free) => PathCheckResult {
            ok: true,
            error_kind: None,
            free_bytes: Some(free),
        },
        None => PathCheckResult {
            ok: true,
            error_kind: None,
            free_bytes: None,
        },
    }
}

#[tauri::command]
pub async fn set_memory_mb(mb: u32) -> Result<(), String> {
    let _ = crate::modrinth::State::init("com.melorium.launcher".to_string()).await;
    let mut settings = crate::modrinth::api::settings::get()
        .await
        .map_err(|err| err.to_string())?;
    settings.memory.maximum = mb;
    crate::modrinth::api::settings::set(settings)
        .await
        .map_err(|err| err.to_string())
}

#[tauri::command]
pub fn get_system_memory_mb() -> u64 {
    use sysinfo::System;
    let mut sys = System::new();
    sys.refresh_memory();
    sys.total_memory() / 1024 / 1024
}

/// Install the modpack for the first time, or update it if the remote version
/// differs from the locally installed one.
#[tauri::command]
pub fn is_modpack_present(path: String) -> bool {
    modpack::is_profile_dir_present(&path, modpack::PROFILE_NAME)
}

#[tauri::command]
pub async fn install_or_update_modpack(app_handle: tauri::AppHandle, path: String, force: bool) -> Result<(), String> {
    info!("Initializing modrinth state for modpack install/update...");
    let _ = crate::modrinth::EventState::init(app_handle.clone()).await;
    let _ = State::init("com.melorium.launcher".to_string()).await;

    let mut settings = crate::modrinth::settings::get().await.unwrap_or_default();
    settings.custom_dir = Some(path);
    crate::modrinth::settings::set(settings)
        .await
        .map_err(|err| err.to_string())?;

    modpack::install_or_update(modpack::PROFILE_NAME, force).await
}

/// Launch the modpack profile.
#[tauri::command]
pub async fn play_modpack(app_handle: tauri::AppHandle, username: String, memory_mb: u32) -> Result<(), String> {
    info!("Initializing state for modpack launch...");
    let _ = crate::modrinth::EventState::init(app_handle.clone()).await;
    let _ = State::init("com.melorium.launcher".to_string()).await;
    let state = State::get().await.map_err(|err| err.to_string())?;

    let _ = sqlx::query(
        "INSERT INTO minecraft_users (uuid, active, username, access_token, refresh_token, expires)
         VALUES ($1, TRUE, $2, $3, $4, $5)
         ON CONFLICT (uuid) DO UPDATE SET active = TRUE, username = $2, access_token = $3, refresh_token = $4, expires = $5"
    )
    .bind("00000000-0000-0000-0000-000000000000")
    .bind(&username)
    .bind(&username)
    .bind(&username)
    .bind(9999999999i64)
    .execute(&state.pool)
    .await;

    let mut settings = crate::modrinth::api::settings::get()
        .await
        .map_err(|err| err.to_string())?;
    settings.memory.maximum = memory_mb;
    crate::modrinth::api::settings::set(settings)
        .await
        .map_err(|err| err.to_string())?;

    let profile = crate::modrinth::profile::get(modpack::PROFILE_NAME)
        .await
        .map_err(|err| err.to_string())?
        .ok_or_else(|| format!("Profile {} not found — install the modpack first", modpack::PROFILE_NAME))?;

    profile_run(&profile.path, QuickPlayType::None)
        .await
        .map(|_| ())
        .map_err(|err| format!("Failed to launch modpack: {err:?}"))
}
