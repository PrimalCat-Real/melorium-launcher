use crate::modrinth::State;
use crate::modrinth::profile::create::profile_create;
use crate::modrinth::api::profile::run as profile_run;
use crate::modrinth::profile::QuickPlayType;
use crate::modrinth::prelude::ModLoader;



use tracing::info;

#[tauri::command]
pub async fn download_minecraft(app_handle: tauri::AppHandle) -> Result<(), String> {
    info!("Initializing state for download...");
    let _ = crate::modrinth::EventState::init(app_handle.clone()).await;
    let _ = State::init("com.melorium.launcher".to_string()).await;
    
    // Wait for state to be ready
    let _state = State::get().await.map_err(|e| e.to_string())?;
    
    // Force the custom directory to be C:\Projects\supertest in settings
    let mut settings = crate::modrinth::settings::get().await.unwrap_or_default();
    settings.custom_dir = Some("C:\\Projects\\supertest".to_string());
    crate::modrinth::settings::set(settings.clone()).await.map_err(|e| e.to_string())?;
    
    info!("Creating profile for Minecraft 1.21.1 with NeoForge...");
    let profile_name = "MeloriumTest".to_string();
    
    // Check if profile exists, if not create it
    let result = profile_create(
        profile_name.clone(),
        "1.21.1".to_string(), // Game version
        ModLoader::NeoForge, // Modloader
        None, // latest neoforge
        None,
        None,
        Some(false), // Don't skip install, actually download and install the game
    ).await;
    
    match result {
        Ok(path) => {
            info!("Profile created and installed successfully at {}", path);
            Ok(())
        },
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
    let profile = crate::modrinth::profile::get("MeloriumTest").await.map_err(|e| e.to_string())?
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
