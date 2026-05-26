'use client'
import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
import { useEffect } from "react";
import { FiDownload } from "react-icons/fi";
import { Button } from "@/modules/shadcn/components/ui/button";
import { useGameStateStore } from "@/store/useGameStateStore";

const Download = () => {
    const { download, setDownload } = useGameStateStore();

    useEffect(() => {
        console.log("[download] registering download_progress listener");
        const unlisten = listen<{ percent: number; speed: string; eta: string; stage: string }>(
            "download_progress",
            (event) => {
                console.log("[download] progress event:", event.payload);
                setDownload({
                    status: "downloading",
                    barType: "",
                    completedBarTypes: [],
                    fileEvents: 0,
                    downloadedBytes: null,
                    totalBytes: null,
                    ...event.payload,
                });
            },
        );
        return () => { unlisten.then((fn) => fn()); };
    }, [setDownload]);

    const handleDownload = async () => {
        console.log("[download] handleDownload called");
        try {
            setDownload({ status: "checking" });
            console.log("[download] invoking download_minecraft...");
            await invoke("download_minecraft");
            console.log("[download] download_minecraft completed successfully");
            setDownload({ status: "ready" });
        } catch (error) {
            console.error("[download] download_minecraft failed:", error);
            console.error("[download] error type:", typeof error);
            console.error("[download] error stringified:", JSON.stringify(error));
            setDownload({ status: "error", message: String(error) });
        }
    };

    return (
        <Button variant="ghost" onClick={handleDownload} disabled={download.status !== "idle"}>
            <FiDownload size={20} />
            Скачать
        </Button>
    );
};

export default Download;
