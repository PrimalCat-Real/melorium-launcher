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
        const unlisten = listen<{ percent: number; speed: string; eta: string; stage: string }>(
            "download_progress",
            (event) => {
                setDownload({ status: "downloading", ...event.payload });
            },
        );
        return () => { unlisten.then((fn) => fn()); };
    }, [setDownload]);

    const handleDownload = async () => {
        try {
            setDownload({ status: "checking" });
            await invoke("download_minecraft");
            setDownload({ status: "ready" });
        } catch (error) {
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
