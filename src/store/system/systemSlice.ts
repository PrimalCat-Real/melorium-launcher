import type { StateCreator } from "zustand";

export interface HardwareInfo {
    totalRamMb: number;
    availableRamMb: number;
    cpuName: string;
    gpuName: string;
    osName: string;
}

export interface SystemState {
    hardware: HardwareInfo | null;
}

export interface SystemActions {
    setHardware: (hardware: HardwareInfo) => void;
}

export interface SystemSlice extends SystemState, SystemActions {}

export const createSystemSlice: StateCreator<SystemSlice> = (set) => ({
    hardware: null,
    setHardware: (hardware) => set({ hardware }),
});
