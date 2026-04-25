'use client'
import { useAppInit } from "@/shared/hooks/useAppInit";

const AppInitProvider = ({ children }: { children: React.ReactNode }) => {
    useAppInit();
    return <>{children}</>;
};

export default AppInitProvider;
