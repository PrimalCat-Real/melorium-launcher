import type { StateCreator } from "zustand"

export interface InstallState {
    rawPath: string | null
}

export interface InstallActions {
    setRawPath: (path: string | null) => void
}

export interface InstallSlice extends InstallState, InstallActions {}

export const createInstallSlice: StateCreator<InstallSlice> = (set) => ({
    rawPath: null,
    setRawPath: (rawPath) => set({ rawPath }),
})
