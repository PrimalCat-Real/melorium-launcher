"use client";
import UpdateScreen from "@/shared/features/update/UpdateScreen";
import { useAppInit } from "@/shared/hooks/useAppInit";

const AppInitProvider = ({ children }: { children: React.ReactNode }) => {
  const { isInstallingUpdate, updateVersion, updateProgress } = useAppInit();

  if (isInstallingUpdate) {
    return <UpdateScreen version={updateVersion} progress={updateProgress} />;
  }

  return <>{children}</>;
};

export default AppInitProvider;
