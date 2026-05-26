"use client";
import { invoke } from "@tauri-apps/api/core";
import { check as checkTauriUpdate } from "@tauri-apps/plugin-updater";
import { useEffect, useRef } from "react";
import { useUpdateStore } from "@/store/useUpdateStore";

type CheckFn = () => Promise<void>;

const checkLauncherUpdate: CheckFn = async () => {
  const { setLauncherUpdate } = useUpdateStore.getState();
  console.log("[launcher-update] checkingы");
  try {
    const update = await checkTauriUpdate();
    console.log("[launcher-update] raw response:", update);
    if (update) {
      console.log("[launcher-update] update available:", {
        version: update.version,
        currentVersion: update.currentVersion,
        body: update.body,
        date: update.date,
        rawJson: update.rawJson,
      });
      setLauncherUpdate({
        available: true,
        version: update.version,
        body: update.body ?? "",
      });
    } else {
      console.log("[launcher-update] up to date (check returned null)");
    }
  } catch (error) {
    console.warn("[launcher-update] check failed");
    console.warn("[launcher-update] typeof:", typeof error);
    console.warn("[launcher-update] value:", error);
    try {
      console.warn("[launcher-update] JSON.stringify:", JSON.stringify(error));
    } catch {
      /* not serializable */
    }
    if (error instanceof Error) {
      console.warn("[launcher-update] .message:", error.message);
      console.warn("[launcher-update] .stack:", error.stack);
    }
    // silently ignore — no internet or update server unavailable
  }
};

const checkGameUpdate: CheckFn = async () => {
  const { setUpdate } = useUpdateStore.getState();
  try {
    setUpdate({ status: "checking" });
    const result = await invoke<{
      available: boolean;
      version?: string;
      changelog?: string;
    }>("check_game_update");
    if (result.available && result.version) {
      setUpdate({
        status: "available",
        version: result.version,
        changelog: result.changelog,
      });
    } else {
      setUpdate({ status: "up_to_date" });
    }
  } catch (error) {
    setUpdate({ status: "error", message: String(error) });
  }
};

// Register new global checks here
const CHECKS: CheckFn[] = [checkLauncherUpdate, checkGameUpdate];

export const useAppInit = () => {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    Promise.allSettled(CHECKS.map((fn) => fn()));
  }, []);
};
