"use client";
import { invoke } from "@tauri-apps/api/core";
import { relaunch } from "@tauri-apps/plugin-process";
import {
  check as checkTauriUpdate,
  type Update,
} from "@tauri-apps/plugin-updater";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useUpdateStore } from "@/store/useUpdateStore";

type CheckFn = () => Promise<void>;

const checkLauncherUpdate: CheckFn = async () => {
  const { setLauncherUpdate, setPendingLauncherUpdate } =
    useUpdateStore.getState();
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
    setPendingLauncherUpdate(update.version);

    // Download in background right away
    let totalBytes = 0;
    const toastId = toast.loading(`Загрузка обновления ${update.version}...`, {
      duration: Infinity,
    });

    await update.download((event) => {
      switch (event.event) {
        case "Started":
          totalBytes = event.data.contentLength ?? 0;
          break;
        case "Progress":
          if (totalBytes > 0) {
            const percent = Math.round(
              (event.data.chunkLength / totalBytes) * 100,
            );
            toast.loading(
              `Загрузка обновления ${update.version}... ${percent}%`,
              {
                id: toastId,
                duration: Infinity,
              },
            );
          }
          break;
        case "Finished":
          break;
      }
    });

    console.log("[launcher-update] download complete, awaiting restart");

    toast.success(`Обновление ${update.version} загружено`, {
      id: toastId,
      description: "Перезапустите лаунчер для установки",
      duration: Infinity,
      action: {
        label: "Перезапустить",
        onClick: () => installAndRelaunch(update),
      },
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

async function installAndRelaunch(update: Update) {
  try {
    await update.install();
    await relaunch();
  } catch (error) {
    console.error("[launcher-update] install failed:", error);
  }
}

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

export type UpdateInstallState = {
  isInstallingUpdate: boolean;
  updateVersion: string | null;
  updateProgress: number;
};

export const useAppInit = (): UpdateInstallState => {
  const initialized = useRef(false);
  const [isInstallingUpdate, setIsInstallingUpdate] = useState(false);
  const [updateVersion, setUpdateVersion] = useState<string | null>(null);
  const [updateProgress, setUpdateProgress] = useState(0);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const { pendingLauncherUpdate, setPendingLauncherUpdate } =
      useUpdateStore.getState();

    // User ignored the restart toast last session — install on startup
    if (pendingLauncherUpdate) {
      setIsInstallingUpdate(true);
      setUpdateVersion(pendingLauncherUpdate);

      checkTauriUpdate()
        .then(async (update) => {
          if (!update) {
            setPendingLauncherUpdate(null);
            setIsInstallingUpdate(false);
            Promise.allSettled(CHECKS.map((fn) => fn()));
            return;
          }
          let totalBytes = 0;
          await update.downloadAndInstall((event) => {
            switch (event.event) {
              case "Started":
                totalBytes = event.data.contentLength ?? 0;
                break;
              case "Progress":
                if (totalBytes > 0) {
                  setUpdateProgress((prev) => {
                    const next = Math.min(
                      99,
                      prev + (event.data.chunkLength / totalBytes) * 100,
                    );
                    return Math.round(next);
                  });
                }
                break;
              case "Finished":
                setUpdateProgress(100);
                break;
            }
          });
          setPendingLauncherUpdate(null);
          await relaunch();
        })
        .catch((error) => {
          console.error("[launcher-update] startup install failed:", error);
          setPendingLauncherUpdate(null);
          setIsInstallingUpdate(false);
          Promise.allSettled(CHECKS.map((fn) => fn()));
        });

      return;
    }

    Promise.allSettled(CHECKS.map((fn) => fn()));
  }, []);

  return { isInstallingUpdate, updateVersion, updateProgress };
};
