use serde::{Deserialize, Serialize};
use std::path::PathBuf;
use tokio::fs;

const STATE_FILE: &str = "modpack_state.json";

/// Tracks which modpack version is installed on this machine
#[derive(Serialize, Deserialize, Clone, Debug, Default)]
pub struct ModpackState {
    pub installed_version: Option<String>,
    pub profile_path: Option<String>,
}

fn data_dir() -> PathBuf {
    dirs::data_dir()
        .unwrap_or_else(|| PathBuf::from("."))
        .join("com.melorium.launcher")
}

pub async fn load() -> ModpackState {
    let path = data_dir().join(STATE_FILE);
    match fs::read_to_string(&path).await {
        Ok(content) => serde_json::from_str(&content).unwrap_or_default(),
        Err(_) => ModpackState::default(),
    }
}

pub async fn save(state: &ModpackState) -> Result<(), String> {
    let dir = data_dir();
    fs::create_dir_all(&dir).await.map_err(|err| err.to_string())?;
    let content = serde_json::to_string_pretty(state).map_err(|err| err.to_string())?;
    fs::write(dir.join(STATE_FILE), content)
        .await
        .map_err(|err| err.to_string())
}
