import { create } from "zustand";

import { createSidebarSlice, type SidebarSlice } from "./sidebar/sidebarSlice";
import { persist } from "zustand/middleware";

type StoreState = SidebarSlice;

export const useUIStore = create<StoreState>()(
  persist(
    (...argument) => ({
      ...createSidebarSlice(...argument),
    }),
    {
      name: "ui-state",
    },
  ),
);
