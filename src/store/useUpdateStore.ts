import { create } from "zustand";
import type { UpdateSlice } from "./gamestate/updateSlice";
import { createUpdateSlice } from "./gamestate/updateSlice";

interface LauncherUpdate {
    available: boolean;
    version: string;
    body: string;
}

interface LauncherUpdateState {
    launcherUpdate: LauncherUpdate | null;
    setLauncherUpdate: (update: LauncherUpdate) => void;
}

type UpdateStore = UpdateSlice & LauncherUpdateState;

export const useUpdateStore = create<UpdateStore>()((...args) => ({
    ...createUpdateSlice(...args),
    launcherUpdate: null,
    setLauncherUpdate: (update) => args[0]({ launcherUpdate: update }),
}));
