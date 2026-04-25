import type { StateCreator } from "zustand";

export interface SettingsState {
    gamePath: string;
    javaPath: string;
    allocatedRamMb: number;
}

export interface SettingsActions {
    setGamePath: (path: string) => void;
    setJavaPath: (path: string) => void;
    setAllocatedRamMb: (mb: number) => void;
}

export interface SettingsSlice extends SettingsState, SettingsActions {}

export const createSettingsSlice: StateCreator<SettingsSlice> = (set) => ({
    gamePath: "",
    javaPath: "",
    allocatedRamMb: 2048,
    setGamePath: (path) => set({ gamePath: path }),
    setJavaPath: (path) => set({ javaPath: path }),
    setAllocatedRamMb: (mb) => set({ allocatedRamMb: mb }),
});
