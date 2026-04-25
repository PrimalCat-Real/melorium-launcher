import type { StateCreator } from "zustand";

export type DownloadStatus =
    | { status: "idle" }
    | { status: "checking" }
    | { status: "downloading"; percent: number; speed: string; eta: string; stage: string }
    | { status: "verifying"; percent: number }
    | { status: "ready" }
    | { status: "error"; message: string };

export interface DownloadState {
    download: DownloadStatus;
}

export interface DownloadActions {
    setDownload: (download: DownloadStatus) => void;
}

export interface DownloadSlice extends DownloadState, DownloadActions {}

export const createDownloadSlice: StateCreator<DownloadSlice> = (set) => ({
    download: { status: "idle" },
    setDownload: (download) => set({ download }),
});
