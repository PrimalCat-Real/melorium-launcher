'use client'
import { useEffect, useRef } from "react";
import { check as checkTauriUpdate } from "@tauri-apps/plugin-updater";
import { invoke } from "@tauri-apps/api/core";
import { useUpdateStore } from "@/store/useUpdateStore";

type CheckFn = () => Promise<void>;

const checkLauncherUpdate: CheckFn = async () => {
    const { setLauncherUpdate } = useUpdateStore.getState();
    try {
        const update = await checkTauriUpdate();
        if (update?.available) {
            setLauncherUpdate({ available: true, version: update.version, body: update.body ?? "" });
        }
    } catch {
        // silently ignore — no internet or update server unavailable
    }
};

const checkGameUpdate: CheckFn = async () => {
    const { setUpdate } = useUpdateStore.getState();
    try {
        setUpdate({ status: "checking" });
        const result = await invoke<{ available: boolean; version?: string; changelog?: string }>(
            "check_game_update",
        );
        if (result.available && result.version) {
            setUpdate({ status: "available", version: result.version, changelog: result.changelog });
        } else {
            setUpdate({ status: "up_to_date" });
        }
    } catch (error) {
        setUpdate({ status: "error", message: String(error) });
    }
};

// Register new global checks here
const CHECKS: CheckFn[] = [
    checkLauncherUpdate,
    checkGameUpdate,
];

export const useAppInit = () => {
    const initialized = useRef(false);

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        Promise.allSettled(CHECKS.map((fn) => fn()));
    }, []);
};
