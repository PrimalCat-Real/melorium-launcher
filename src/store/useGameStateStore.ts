import { create } from "zustand";
import {
  createDownloadSlice,
  type DownloadSlice,
} from "./gamestate/downloadSlice";
import { createLaunchSlice, type LaunchSlice } from "./gamestate/launchSlice";
import { createUpdateSlice, type UpdateSlice } from "./gamestate/updateSlice";

type GameStateStore = DownloadSlice & UpdateSlice & LaunchSlice;

export const useGameStateStore = create<GameStateStore>()((...args) => ({
  ...createDownloadSlice(...args),
  ...createUpdateSlice(...args),
  ...createLaunchSlice(...args),
}));
