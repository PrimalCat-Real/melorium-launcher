import { create } from "zustand";
import { persist } from "zustand/middleware";
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
    pendingLauncherUpdate: string | null;
    setPendingLauncherUpdate: (version: string | null) => void;
}

type UpdateStore = UpdateSlice & LauncherUpdateState;

export const useUpdateStore = create<UpdateStore>()(
    persist(
        (...args) => ({
            ...createUpdateSlice(...args),
            launcherUpdate: null,
            setLauncherUpdate: (update) => args[0]({ launcherUpdate: update }),
            pendingLauncherUpdate: null,
            setPendingLauncherUpdate: (version) => args[0]({ pendingLauncherUpdate: version }),
        }),
        {
            name: "update-state",
            partialize: (state) => ({ pendingLauncherUpdate: state.pendingLauncherUpdate }),
        },
    ),
);
