import { invoke } from '@tauri-apps/api/core'

export async function isModpackPresent(installPath: string): Promise<boolean> {
    return invoke<boolean>('is_modpack_present', { path: installPath })
}
