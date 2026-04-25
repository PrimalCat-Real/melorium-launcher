# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Melorium Launcher is a Tauri v2 desktop app — a Minecraft launcher with a custom UI. The frontend is Next.js 16 + React 19 + Tailwind CSS v4, rendered inside a Tauri WebView. The backend is Rust (`src-tauri/`) and uses a heavily customized fork of the Modrinth launcher library for profile management, downloading, and launching Minecraft.

## Commands

### Frontend (Next.js)
```bash
pnpm dev          # Next.js dev server
pnpm build        # Production build
pnpm lint         # Biome linter (biome check)
pnpm format       # Biome formatter (biome format --write)
```

### Tauri (full app)
```bash
pnpm tauri dev    # Run the full desktop app (Tauri + Next.js)
pnpm tauri build  # Build distributable
```

### Rust (backend only)
```bash
cd src-tauri && cargo build
cd src-tauri && cargo check
```

No test suite is currently set up.

## Architecture

### Frontend (`src/`)

- **`src/app/`** — Next.js App Router pages. Each route corresponds to a sidebar section: `/` (play), `/mods`, `/settings`, `/news`, `/maps`, `/forum`, `/shop`, `/battlepass`, `/cosmetics`, `/profile`.
- **`src/features/sidebar/`** — Sidebar feature: `constants/nav-config.tsx` defines the navigation groups and items, `components/` has the actual UI pieces (`IconRail`, `SidebarDetail`, `NavButton`, etc.).
- **`src/components/sidebar/SideBar.tsx`** — Entry point that composes `IconRail` + `SidebarDetail`.
- **`src/store/`** — Zustand store. `useUIStore.ts` combines slices with `persist` middleware. `sidebar/sidebarSlice.ts` manages which nav group is active.
- **`src/modules/`** — Vendored/local UI libraries:
  - `shadcn/` — shadcn/ui components and `cn()` utility
  - `primalui/` — Custom card component (`CardGradientBorder`)
- **`src/shared/`** — Shared UI primitives (currently `NavItem`).

### Backend (`src-tauri/src/`)

- **`commands.rs`** — Tauri commands exposed to the frontend: `download_minecraft` and `play_minecraft`. These are the IPC bridge invoked via `invoke()` in React.
- **`lib.rs`** — Tauri app setup; registers commands via `invoke_handler`.
- **`modrinth/`** — Minecraft launcher engine (forked from Modrinth app):
  - `state/` — Global app state: profiles, settings, auth, DB (SQLite via sqlx), process tracking, Discord RPC, friends.
  - `api/` — High-level operations: profile create/run/update, pack install (`.mrpack`), JRE management, settings, world data.
  - `launcher/` — Low-level launch logic: JVM args, asset/library downloading.
  - `util/` — HTTP fetch, I/O helpers, JRE detection, server ping, network utils.
  - `event/` — Event emitting for progress updates to the frontend.

### Tauri IPC Pattern

Frontend calls `invoke("command_name")` from `@tauri-apps/api/core`. Commands are async Rust functions annotated with `#[tauri::command]` in `commands.rs` and registered in `lib.rs`.

## Key Conventions

- **Icons**: Use `@hugeicons/react` + `@hugeicons/core-free-icons` for icons in main UI; `react-icons/hi2` in sidebar nav config.
- **Styling**: Tailwind CSS v4 with CSS custom properties for theming. Color tokens like `var(--color-primary)`, `var(--color-secondary)` are defined in `globals.css`. Use `cn()` from `@/modules/shadcn/lib/utils` for class merging.
- **State**: Zustand with slice pattern. Add new slices in `src/store/` and compose them in `useUIStore.ts`.
- **Path aliases**: `@/` maps to `src/`.
- **Linting**: Biome (not ESLint). Run `pnpm lint` before committing. Biome also auto-organizes imports.
- **Package manager**: pnpm.
