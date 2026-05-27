import type { StateCreator } from "zustand";

export type ModpackStatus =
    | { status: "checking" }
    | { status: "not_installed"; remoteVersion: string }
    | { status: "update_available"; installedVersion: string; remoteVersion: string }
    | { status: "ready"; version: string };

export interface ModpackState {
    modpack: ModpackStatus;
}

export interface ModpackActions {
    setModpack: (modpack: ModpackStatus) => void;
}

export interface ModpackSlice extends ModpackState, ModpackActions {}

export const createModpackSlice: StateCreator<ModpackSlice> = (set) => ({
    modpack: { status: "checking" },
    setModpack: (modpack) => set({ modpack }),
});
