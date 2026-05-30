pub mod cleanup;
pub mod commands;
pub mod modpack;
pub mod modrinth;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    crate::modrinth::start_logger("primalcat.melorium");
    tauri::Builder::default()
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_dialog::init())
        .setup(|_app| {
            cleanup::run();
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            commands::download_minecraft,
            commands::play_minecraft,
            commands::get_modpack_info,
            commands::check_install_path,
            commands::is_modpack_present,
            commands::install_or_update_modpack,
            commands::play_modpack,
            commands::get_system_memory_mb,
            commands::set_memory_mb,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
