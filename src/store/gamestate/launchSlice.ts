import type { StateCreator } from "zustand";

export type LaunchStatus =
    | { status: "idle" }
    | { status: "launching" }
    | { status: "running"; pid: number; startedAt: number }
    | { status: "crashed"; exitCode: number; log?: string }
    | { status: "error"; message: string };

export interface LaunchState {
    launch: LaunchStatus;
}

export interface LaunchActions {
    setLaunch: (launch: LaunchStatus) => void;
}

export interface LaunchSlice extends LaunchState, LaunchActions {}

export const createLaunchSlice: StateCreator<LaunchSlice> = (set) => ({
    launch: { status: "idle" },
    setLaunch: (launch) => set({ launch }),
});
