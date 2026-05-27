"use client";
import { invoke } from "@tauri-apps/api/core";
import { getCurrentWindow } from "@tauri-apps/api/window";
import {
  check as checkTauriUpdate,
  type Update,
} from "@tauri-apps/plugin-updater";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useUpdateStore } from "@/store/useUpdateStore";

type CheckFn = () => Promise<void>;

let readyUpdate: Update | null = null;

const checkLauncherUpdate: CheckFn = async () => {
  const { setLauncherUpdate } = useUpdateStore.getState();
  console.log("[launcher-update] checking");
  try {
    const update = await checkTauriUpdate();
    console.log("[launcher-update] raw response:", update);
    if (!update) {
      console.log("[launcher-update] up to date");
      return;
    }

    console.log("[launcher-update] update available:", update.version);
    setLauncherUpdate({
      available: true,
      version: update.version,
      body: update.body ?? "",
    });

    await update.download();
    readyUpdate = update;

    console.log("[launcher-update] downloaded, will install on close");
    toast.info(`Доступна версия ${update.version}`, {
      description: "Обновление установится при закрытии лаунчера",
    });

    const win = getCurrentWindow();
    win.onCloseRequested(async (event) => {
      if (!readyUpdate) return;
      event.preventDefault();
      try {
        await readyUpdate.install();
      } catch (error) {
        console.error("[launcher-update] install on close failed:", error);
        await win.destroy();
      }
    });
  } catch (error) {
    console.warn("[launcher-update] check/download failed");
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

const CHECKS: CheckFn[] = [checkLauncherUpdate, checkGameUpdate];

export const useAppInit = () => {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    Promise.allSettled(CHECKS.map((fn) => fn()));
  }, []);
};
