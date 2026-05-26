# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Melorium Launcher is a Tauri v2 desktop app — a Minecraft launcher with a custom UI. The frontend is Next.js 16 + React 19 + Tailwind CSS v4, rendered inside a Tauri WebView. The backend is Rust (`src-tauri/`) and uses a heavily customized fork of the Modrinth launcher library for profile management, downloading, and launching Minecraft.

> **ВАЖНО: Tauri v2, не v1.** API, плагины и структура команд отличаются от первой версии. Не использовать документацию, примеры или паттерны Tauri v1. Плагины подключаются через `tauri-plugin-*` крейты и `.plugin(...)` в `lib.rs`. Команды регистрируются через `tauri::generate_handler!` и вызываются на фронтенде через `invoke` из `@tauri-apps/api/core` (не из `@tauri-apps/api`).

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

- **`src/app/`** — Next.js App Router pages. Each route corresponds to a sidebar section.
- **`src/features/`** — Feature folders. Each feature has `components/` for UI pieces and `constants/` for config.
- **`src/components/`** — Stateful grouper components (`'use client'`, own state, compose features).
- **`src/store/`** — Zustand store with slice pattern and `persist` middleware.
- **`src/modules/`** — Vendored/local UI libraries. Contents grow over time — always check what's available before writing UI from scratch.
- **`src/shared/`** — Shared reusable components and hooks, organized by feature.

### Backend (`src-tauri/src/`)

- **`commands.rs`** — Tauri commands exposed to the frontend via `invoke()` in React.
- **`lib.rs`** — Tauri app setup; registers commands via `invoke_handler`.
- **`modrinth/`** — Minecraft launcher engine (forked from Modrinth app):
  - `state/` — Global app state: profiles, settings, auth, DB (SQLite via sqlx), process tracking, Discord RPC, friends.
  - `api/` — High-level operations: profile create/run/update, pack install (`.mrpack`), JRE management, settings, world data.
  - `launcher/` — Low-level launch logic: JVM args, asset/library downloading.
  - `util/` — HTTP fetch, I/O helpers, JRE detection, server ping, network utils.
  - `event/` — Event emitting for progress updates to the frontend.

### Tauri IPC Pattern

Frontend calls `invoke("command_name")` from `@tauri-apps/api/core`. Commands are async Rust functions annotated with `#[tauri::command]` in `commands.rs` and registered in `lib.rs`.

## Download / Game State Statuses

`DownloadStatus` (in `src/store/gamestate/downloadSlice.ts`) describes the full lifecycle:

| Status | Прогресс бар | Когда |
|---|---|---|
| `idle` | нет | начальное состояние |
| `downloading` | да — `percent`, `speed`, `stage` | идёт загрузка файлов модпака |
| `verifying` | нет | проверка хешей после загрузки, и перед запуском игры |
| `ready` | нет | всё готово, можно запускать |
| `error` | нет | ошибка, `message` |

**Правила отображения:**
- Прогресс бар показывать **только** при `status === 'downloading'`
- При `verifying` — спиннер-иконка без текста (не писать "Проверка...")
- При `error` — показать `message`
- Не делать `|| status === 'checking'` и похожие многосоставные проверки — каждый статус обрабатывается отдельно

## Key Conventions

### Component syntax
- **Always arrow functions** for components: `const Foo = () => (...)`. Never `function Foo() {}`.
- **No `'use client'` in page.tsx** — pages are server components. Put `'use client'` only in stateful grouper components.
- **Component decomposition**: each distinct UI display element gets its own named file in the feature's `ui/` folder. A parent should read like a list of named sub-components, not a wall of anonymous divs.
- **Don't decompose plain layout** into wrapper components. `SettingsRow`, `SettingsSection` etc. are over-engineering — use plain divs with Tailwind classes instead.
- **File structure**:
  - `src/components/<context>/` — stateful groupers (`'use client'`, own state, compose features)
  - `src/shared/features/<feature>/ui/` — reusable presentational components
  - `src/shared/features/<feature>/lib/` — hooks and utilities for the feature
  - `src/app/(app)/<page>/page.tsx` — only semantic section components, no state, no `'use client'`

### Styling
- **`cn()`** from `@/modules/shadcn/lib/utils` for all className construction. Never template literals or string concatenation.
- **Long class lists** split across lines by semantic group: layout, visual/color, conditional.
- **No inline `style={{ }}`** in TSX. Use Tailwind arbitrary classes. For dynamic positions/sizes that can't be expressed statically, use CSS custom properties via a wrapper element.
- **Gaps use powers of 2**: `gap-2`, `gap-4`, `gap-8`. Never `gap-1.5`, `gap-2.5`, `gap-3.5`.
- **CSS architecture**: colors/tokens → `:root` + `@theme inline`. Utility classes (shadows, gradients, layouts) → `@layer utilities`. Never write multi-value arbitrary values inline in `className`.
- **Shadows**: extract to named classes in `@layer utilities` (e.g. `.shadow-banner`, `.shadow-progress-fill`). Never inline `shadow-[0_60px_...]`.
- **Tailwind v4**: use `bg-linear-to-r` not `bg-gradient-to-r`, `var(--color-X)` not `theme(colors.X)` in arbitrary values.
- **Prefer canonical Tailwind classes** over arbitrary values: `h-1.5` = 6px, `p-4.5` = 18px, etc. The linter (`suggestCanonicalClasses`) will flag violations.

### Typography
- **Never write uppercase letters in JSX**. Use Tailwind `uppercase` class instead: `<span className='uppercase'>текст</span>`.
- **Field/section labels**: `font-manrope font-semibold uppercase tracking-widest text-xs text-muted-foreground`.

### Icons
- Use **`react-icons`** exclusively for all icons. Never use `HugeiconsIcon` or `@hugeicons/react`.
- Common packages: `react-icons/hi2` (Heroicons v2), `react-icons/fc` (Google etc.), `react-icons/bs` (Discord etc.), `react-icons/pi`, `react-icons/tb`.
- Always type icon props as `IconType` from `react-icons`.

### Buttons and interactive elements
- Never use plain `<button>`. Always use `Button` from `@/modules/shadcn/components/ui/button`.
- Variants: `default` (primary), `outline` (secondary), `ghost` (link-style inline), `destructive` (danger actions).

### Forms and validation
- No inline error text below inputs. Error feedback: `aria-invalid={hasError}` on the Input (auto-styles `border-destructive`) + `toast.error(...)` on submit.

### Loading and progress states
- Never use text like "Проверка..." for loading states. Use a spinning icon instead.
- Never use `...` (ellipsis) in loading/progress text.
- **Progress bars** use gradient: `bg-linear-to-r from-accent to-primary shadow-progress-fill`. Never plain `bg-primary` for a progress fill.
- Each status handled separately with `switch`. Never `|| status === 'checking'` style multi-conditions.

### UI components — always use the library
- Before writing any UI element from scratch, **search `src/modules/` for an existing component**. The set of modules is not fixed — new ones can be added at any time, so always search rather than assuming.
- Prefer animated/enhanced variants over plain primitives when both exist in `src/modules/`.
- **If a needed component doesn't exist in `src/modules/`**, tell the user and suggest installing it (e.g. `pnpm dlx shadcn@latest add <name>`) rather than building it from scratch.
- **Never modify files inside `src/modules/`** — those are library files, not project code.

### State management
- Zustand with slice pattern. Add new slices in `src/store/` and compose them in the relevant store file.
- Persist with `persist` middleware — values may be `undefined` before hydration. Always use `?? fallback` when reading from persisted store.

### Misc
- **Conditional logic**: never nested ternaries for state — use `switch` or `if/else`.
- **Clarify before implementing**: when design or implementation detail is ambiguous, ask via `AskUserQuestion` immediately.
- **No section comments** (`/* --- Section --- */`) or padding spaces to align values.
- **No single-letter variables** (`i`, `e`, `v`) — use descriptive names.
- **Package manager**: pnpm.
- **Linting**: Biome (not ESLint). `pnpm lint` before committing.
- **Path aliases**: `@/` maps to `src/`.
