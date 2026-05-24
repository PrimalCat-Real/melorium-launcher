pub mod manager;
pub mod state;

pub use manager::{ModpackInfo, check_update, install_or_update, is_profile_dir_present};

/// Profile name used for the modpack inside the modrinth state
pub const PROFILE_NAME: &str = "MeloriumPack";

/// URL of the backend endpoint that returns a PackManifest JSON.
/// Change this when you move the server.
pub const MANIFEST_URL: &str = "https://pub-cbb3d7831b1f44c2ab3bb13ccae83644.r2.dev/manifest.json";
