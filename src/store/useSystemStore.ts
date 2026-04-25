import { create } from "zustand";
import { createSystemSlice, type SystemSlice } from "./system/systemSlice";

export const useSystemStore = create<SystemSlice>()((...args) => ({
    ...createSystemSlice(...args),
}));
