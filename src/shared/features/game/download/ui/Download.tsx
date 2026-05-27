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
        console.log("[download] registering download_progress listener"); // TODO: remove debug log
        const unlisten = listen<{ percent: number; speed: string; eta: string; stage: string }>(
            "download_progress",
            (event) => {
                console.log("[download] progress event:", event.payload); // TODO: remove debug log
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
        console.log("[download] handleDownload called"); // TODO: remove debug log
        try {
            setDownload({ status: "checking" });
            console.log("[download] invoking download_minecraft..."); // TODO: remove debug log
            await invoke("download_minecraft");
            console.log("[download] download_minecraft completed successfully"); // TODO: remove debug log
            setDownload({ status: "ready" });
        } catch (error) {
            console.error("[download] download_minecraft failed:", error); // TODO: remove debug log
            console.error("[download] error type:", typeof error); // TODO: remove debug log
            console.error("[download] error stringified:", JSON.stringify(error)); // TODO: remove debug log
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
