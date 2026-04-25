import type { StateCreator } from "zustand";

export type UpdateStatus =
    | { status: "idle" }
    | { status: "checking" }
    | { status: "available"; version: string; changelog?: string }
    | { status: "updating"; percent: number; speed: string; eta: string; stage: string }
    | { status: "verifying"; percent: number }
    | { status: "up_to_date" }
    | { status: "error"; message: string };

export interface UpdateState {
    update: UpdateStatus;
}

export interface UpdateActions {
    setUpdate: (update: UpdateStatus) => void;
}

export interface UpdateSlice extends UpdateState, UpdateActions {}

export const createUpdateSlice: StateCreator<UpdateSlice> = (set) => ({
    update: { status: "idle" },
    setUpdate: (update) => set({ update }),
});
