import { create } from "zustand";
import { createDownloadSlice, type DownloadSlice } from "./gamestate/downloadSlice";
import { createInstallSlice, type InstallSlice } from "./gamestate/installSlice";
import { createLaunchSlice, type LaunchSlice } from "./gamestate/launchSlice";
import { createUpdateSlice, type UpdateSlice } from "./gamestate/updateSlice";

type GameStateStore = DownloadSlice & UpdateSlice & LaunchSlice & InstallSlice;

export const useGameStateStore = create<GameStateStore>()((...args) => ({
  ...createDownloadSlice(...args),
  ...createUpdateSlice(...args),
  ...createLaunchSlice(...args),
  ...createInstallSlice(...args),
}));
