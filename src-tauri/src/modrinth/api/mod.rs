//! API for interacting with Theseus
pub mod cache;
pub mod jre;
pub mod metadata;
pub mod minecraft_auth;
pub mod minecraft_skins;
pub mod pack;
pub mod process;
pub mod profile;
pub mod server_address;
pub mod settings;

pub mod data {
    pub use crate::modrinth::state::{
        CacheBehaviour, CacheValueType, Credentials, Dependency, DirectoryInfo, Hooks, JavaVersion,
        LinkedData, MemorySettings, ModLoader, ModrinthCredentials, Organization, ProcessMetadata,
        ProfileFile, Project, ProjectType, ProjectV3, SearchResult, SearchResults, SearchResultsV3,
        Settings, TeamMember, Theme, User, UserFriend, Version, WindowSize,
    };
    pub use ariadne::users::UserStatus;
}

pub mod prelude {
    pub use crate::modrinth::{
        State,
        data::*,
        event::CommandPayload,
        jre, metadata, minecraft_auth, pack, process,
        profile::{self, Profile, create},
        settings,
        util::{
            io::{IOError, canonicalize},
            network::{is_network_metered, tcp_listen_any_loopback},
        },
    };
}
pub mod worlds;
