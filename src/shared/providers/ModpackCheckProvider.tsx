"use client";
import { invoke } from "@tauri-apps/api/core";
import { useEffect } from "react";
import { useGameStateStore } from "@/store/useGameStateStore";

interface ModpackInfoResponse {
    isInstalled: boolean;
    installedVersion: string | null;
    remoteVersion: string;
    needsUpdate: boolean;
}

const ModpackCheckProvider = ({ children }: { children: React.ReactNode }) => {
    const setModpack = useGameStateStore((state) => state.setModpack);

    useEffect(() => {
        invoke<ModpackInfoResponse>("get_modpack_info")
            .then((info) => {
                if (!info.isInstalled) {
                    setModpack({ status: "not_installed", remoteVersion: info.remoteVersion });
                } else if (info.needsUpdate) {
                    setModpack({
                        status: "update_available",
                        installedVersion: info.installedVersion ?? "",
                        remoteVersion: info.remoteVersion,
                    });
                } else {
                    setModpack({ status: "ready", version: info.installedVersion ?? "" });
                }
            })
            .catch(() => {
                setModpack({ status: "not_installed", remoteVersion: "" });
            });
    }, [setModpack]);

    return <>{children}</>;
};

export default ModpackCheckProvider;
