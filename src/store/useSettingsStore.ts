import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createSettingsSlice, type SettingsSlice } from "./settings/settingsSlice";

export const useSettingsStore = create<SettingsSlice>()(
    persist(
        (...args) => ({
            ...createSettingsSlice(...args),
        }),
        { name: "settings" },
    ),
);
