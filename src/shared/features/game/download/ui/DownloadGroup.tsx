"use client";
import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/modules/shadcn/components/ui/dialog";
import { useGameStateStore } from "@/store/useGameStateStore";
import { isModpackPresent } from "../libs/checkInstall";
import PlayButton from "../../play/ui/PlayButton";
import UpdateButton from "../../update/ui/UpdateButton";
import DownloadButton from "./DownloadButton";
import PathSelector from "./path-selector/PathSelectorDialog";

const DownloadGroup = () => {
  const [open, setOpen] = useState(false);
  const download = useGameStateStore((state) => state.download);
  const modpack = useGameStateStore((state) => state.modpack);
  const { setDownload, setModpack, rawPath } = useGameStateStore();
  const fractionHistoryRef = useRef<{ time: number; fraction: number }[]>([]);
  const speedBytesRef = useRef<{ time: number; bytes: number } | null>(null);

  useEffect(() => {
    const unlisten = listen<{
      fraction: number | null;
      message: string;
      event: { type: string };
    }>("loading", (event) => {
      console.log("[loading]", event.payload); // TODO: remove debug log
      const payload = event.payload as {
        fraction: number | null;
        message: string;
        event?: { type: string };
      };
      const fraction = payload.fraction;
      const barType = payload.event?.type ?? "unknown";

      const current = useGameStateStore.getState().download;
      const prevCompleted =
        current.status === "downloading" ? current.completedBarTypes : [];
      const prevFileEvents =
        current.status === "downloading" ? current.fileEvents : 0;
      const prevDownloadedBytes =
        current.status === "downloading" ? current.downloadedBytes : null;
      const prevTotalBytes =
        current.status === "downloading" ? current.totalBytes : null;
      const prevSpeed = current.status === "downloading" ? current.speed : "";

      if (current.status !== "downloading") return;

      if (fraction === null || fraction === undefined) {
        setDownload({
          ...current,
          completedBarTypes: [...new Set([...prevCompleted, barType])],
          barType: "",
          speed: barType === "pack_download" ? "" : prevSpeed,
        });
        return;
      }

      const now = Date.now();
      const history = fractionHistoryRef.current;
      history.push({ time: now, fraction });
      if (history.length > 8) history.splice(0, history.length - 8);

      let eta = "";
      if (history.length >= 3) {
        const oldest = history[0];
        const newest = history[history.length - 1];
        const timeDiff = (newest.time - oldest.time) / 1000;
        const fracDiff = newest.fraction - oldest.fraction;
        if (timeDiff > 0 && fracDiff > 0) {
          const etaSecs = Math.round(
            (1 - newest.fraction) / (fracDiff / timeDiff),
          );
          if (etaSecs >= 0 && etaSecs < 86400) {
            const m = Math.floor(etaSecs / 60);
            const s = (etaSecs % 60).toString().padStart(2, "00");
            eta = `${m}:${s}`;
          }
        }
      }

      const fileEvents =
        barType === "pack_file_download" ? prevFileEvents + 1 : prevFileEvents;

      setDownload({
        status: "downloading",
        percent: Math.round(fraction * 100),
        speed: prevSpeed,
        eta,
        stage: payload.message,
        barType,
        completedBarTypes: prevCompleted,
        fileEvents,
        downloadedBytes: prevDownloadedBytes,
        totalBytes: prevTotalBytes,
      });
    });
    return () => {
      unlisten.then((fn) => fn());
    };
  }, [setDownload]);

  useEffect(() => {
    const unlisten = listen<{ downloaded: number; total: number }>(
      "pack_download_bytes",
      (event) => {
        const { downloaded, total } = event.payload;
        const now = Date.now();
        const prev = speedBytesRef.current;
        let speed = "";
        if (prev && downloaded > prev.bytes && now - prev.time >= 200) {
          const mbPerSec =
            (downloaded - prev.bytes) /
            1024 /
            1024 /
            ((now - prev.time) / 1000);
          speed = `${mbPerSec.toFixed(1)} MB/s`;
          speedBytesRef.current = { time: now, bytes: downloaded };
        } else if (!prev) {
          speedBytesRef.current = { time: now, bytes: downloaded };
        }
        const current = useGameStateStore.getState().download;
        if (current.status === "downloading") {
          setDownload({
            ...current,
            downloadedBytes: downloaded,
            totalBytes: total,
            ...(speed ? { speed } : {}),
          });
        }
      },
    );
    return () => {
      unlisten.then((fn) => fn());
    };
  }, [setDownload]);

  const handleInstall = async () => {
    if (!rawPath) return;
    setOpen(false);
    fractionHistoryRef.current = [];
    speedBytesRef.current = null;
    const remoteVersion =
      modpack.status === "not_installed" || modpack.status === "update_available"
        ? modpack.remoteVersion
        : "";
    setDownload({
      status: "downloading",
      percent: 0,
      speed: "",
      eta: "",
      stage: "Начало установки...",
      barType: "",
      completedBarTypes: [],
      fileEvents: 0,
      downloadedBytes: null,
      totalBytes: null,
    });
    try {
      const filesPresent = await isModpackPresent(rawPath);
      await invoke("install_or_update_modpack", {
        path: rawPath,
        force: !filesPresent,
      });
      setModpack({ status: "ready", version: remoteVersion });
      setDownload({ status: "idle" });
    } catch (err) {
      setDownload({ status: "idle" });
      toast.error(String(err));
    }
  };

  const handleUpdate = async () => {
    if (!rawPath) {
      setOpen(true);
      return;
    }
    fractionHistoryRef.current = [];
    speedBytesRef.current = null;
    const remoteVersion =
      modpack.status === "update_available" ? modpack.remoteVersion : "";
    setDownload({
      status: "downloading",
      percent: 0,
      speed: "",
      eta: "",
      stage: "Начало обновления...",
      barType: "",
      completedBarTypes: [],
      fileEvents: 0,
      downloadedBytes: null,
      totalBytes: null,
    });
    try {
      await invoke("install_or_update_modpack", { path: rawPath, force: false });
      setModpack({ status: "ready", version: remoteVersion });
      setDownload({ status: "idle" });
    } catch (err) {
      setDownload({ status: "idle" });
      toast.error(String(err));
    }
  };

  const isDownloading = download.status === "downloading";
  const isVerifying = download.status === "verifying";
  const isBusy = isDownloading || isVerifying;
  const percent = isDownloading ? Math.round(download.percent) : null;

  const renderAction = () => {
    if (isBusy) {
      return (
        <DownloadButton
          variant="obsidian"
          isBusy
          percent={percent}
          className="font-bold py-6 rounded-lg shadow-2xl pointer-events-none w-full"
        />
      );
    }
    switch (modpack.status) {
      case "ready":
        return <PlayButton className="w-full" />;
      case "update_available":
        return (
          <UpdateButton
            variant="obsidian"
            className="font-bold py-6 rounded-lg shadow-2xl w-full"
            onClick={handleUpdate}
          >
            <span className="flex gap-2 uppercase tracking-wide">Обновить</span>
          </UpdateButton>
        );
      case "not_installed":
        return (
          <DownloadButton
            variant="obsidian"
            className="font-bold py-6 rounded-lg shadow-2xl w-full"
            onClick={() => setOpen(true)}
          >
            <span className="flex gap-2 uppercase tracking-wide">Установить</span>
          </DownloadButton>
        );
      default:
        return (
          <DownloadButton
            variant="obsidian"
            disabled
            className="font-bold py-6 rounded-lg shadow-2xl w-full pointer-events-none"
          >
            <span className="flex gap-2 uppercase tracking-wide">Установить</span>
          </DownloadButton>
        );
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {renderAction()}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="h-72" showCloseButton={false}>
          <PathSelector onInstall={handleInstall} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DownloadGroup;
