use tracing::{info, warn};

const LEGACY_DIR_NAMES: &[&str] = &["com.melorium.launcher"];

pub fn run() {
    let Some(data_dir) = dirs::data_dir() else {
        warn!("cleanup: could not resolve data_dir, skipping");
        return;
    };

    for name in LEGACY_DIR_NAMES {
        let path = data_dir.join(name);
        if path.exists() {
            match std::fs::remove_dir_all(&path) {
                Ok(()) => info!("cleanup: removed legacy directory {:?}", path),
                Err(err) => warn!("cleanup: failed to remove {:?}: {err}", path),
            }
        }
    }
}
