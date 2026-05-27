import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createDownloadSlice, type DownloadSlice } from "./gamestate/downloadSlice";
import { createInstallSlice, type InstallSlice } from "./gamestate/installSlice";
import { createLaunchSlice, type LaunchSlice } from "./gamestate/launchSlice";
import { createModpackSlice, type ModpackSlice } from "./gamestate/modpackSlice";

type GameStateStore = DownloadSlice & ModpackSlice & LaunchSlice & InstallSlice;

export const useGameStateStore = create<GameStateStore>()(
    persist(
        (...args) => ({
            ...createDownloadSlice(...args),
            ...createModpackSlice(...args),
            ...createLaunchSlice(...args),
            ...createInstallSlice(...args),
        }),
        {
            name: "game-state",
            partialize: (state) => ({ rawPath: state.rawPath }),
        },
    ),
);
