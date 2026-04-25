pub mod manager;
pub mod state;

pub use manager::{ModpackInfo, check_update, install_or_update};

/// Profile name used for the modpack inside the modrinth state
pub const PROFILE_NAME: &str = "MeloriumPack";

/// URL of the backend endpoint that returns a PackManifest JSON.
/// Change this when you move the server.
pub const MANIFEST_URL: &str = "https://api.melorium.com/modpack/manifest";
