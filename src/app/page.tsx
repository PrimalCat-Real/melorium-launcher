"use client"
import React, { useState } from 'react'
import { invoke } from '@tauri-apps/api/core'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Folder01Icon,
  CloudIcon,
  PackageIcon,
  FileLockIcon,
  UserIcon,
  CrownIcon,
  PlayIcon,
  HardDriveIcon,
  Settings01Icon,
  Delete02Icon,
  LockedIcon as LockIcon,
  MoreHorizontalIcon
} from '@hugeicons/core-free-icons'
import CardGradientBorder from '@/modules/primalui/ui/components/cards/CardGradientBorder'
import { cn } from '@/modules/shadcn/lib/utils'
import { Button } from '@/modules/shadcn/components/ui/button'

const NavItem = ({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) => (
  <div className={cn(
    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer group",
    active ? "bg-primary/20 text-white" : "text-foreground/40 hover:text-foreground/70 hover:bg-white/5"
  )}>
    <HugeiconsIcon icon={icon} size={20} />
    <span className="font-medium text-sm">{label}</span>
    {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.8)]" />}
  </div>
)

const StatusCard = ({ icon, title, progress, detail, secondaryDetail }: { icon: any, title: string, progress?: number, detail: string, secondaryDetail?: string }) => (
  <CardGradientBorder
    className="flex-1 min-w-[200px] p-5 rounded-2xl bg-white/5 backdrop-blur-sm border-white/5"
    from="rgba(var(--primary), 0.3)"
    to="rgba(var(--secondary), 0.3)"
    radius={16}
  >
    <div className="flex justify-between items-start mb-4">
      <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
        <HugeiconsIcon icon={icon} size={22} />
      </div>
      <button type="button" className="text-foreground/20 hover:text-foreground/50 transition-colors">
        <HugeiconsIcon icon={MoreHorizontalIcon} size={20} />
      </button>
    </div>

    <h3 className="text-xs font-bold uppercase tracking-wider text-foreground/40 mb-1">{title}</h3>

    {progress !== undefined && (
      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-gradient-to-r from-primary to-secondary"
          style={{ width: `${progress}%` }}
        />
      </div>
    )}

    <div className="flex flex-col gap-0.5">
      <span className="text-sm font-semibold text-foreground/80">{detail}</span>
      {secondaryDetail && <span className="text-[10px] uppercase font-bold text-foreground/30">{secondaryDetail}</span>}
    </div>
  </CardGradientBorder>
)

export default function Home() {
  const [status, setStatus] = useState("")

  const handleDownload = async () => {
    try {
      setStatus("Downloading...")
      await invoke("download_minecraft")
      setStatus("Download complete!")
    } catch (e: any) {
      setStatus("Error: " + e)
    }
  }

  const handlePlay = async () => {
    try {
      setStatus("Launching...")
      await invoke("play_minecraft")
      setStatus("Game launched!")
    } catch (e: any) {
      setStatus("Error: " + e)
    }
  }

  return (
    <main className="flex-1 flex gap-6 h-full overflow-hidden">
      <div className="flex-1 flex flex-col gap-6 py-4">
        <CardGradientBorder
          className="flex-1 rounded-[32px] relative overflow-hidden flex flex-col justify-end p-10 bg-[#0c0c0e]"
          from="var(--color-primary)"
          to="var(--color-secondary)"
          radius={32}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-transparent to-transparent" />

          <div className="relative z-10 flex flex-col gap-8">
            <h1 className="text-7xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary opacity-90">
              MELORIUM
            </h1>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={handleDownload}
                className="flex items-center justify-center gap-3 px-10 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all active:scale-[0.98]"
              >
                <HugeiconsIcon icon={CloudIcon} size={20} />
                Скачать
              </button>

              <button
                type="button"
                onClick={handlePlay}
                className="flex items-center justify-center gap-3 px-12 py-4 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-black text-lg shadow-2xl shadow-primary/40 hover:scale-[1.03] transition-transform active:scale-[0.98]"
              >
                <HugeiconsIcon icon={PlayIcon} size={24} />
                Играть
              </button>
            </div>
            {status && (
              <span className="text-sm font-bold text-foreground/60">{status}</span>
            )}
          </div>
        </CardGradientBorder>
      </div>
      {/* <div className="flex gap-4 h-[160px]">
        <StatusCard
          icon={HardDriveIcon}
          title="Local Drive"
          progress={75}
          detail="750 MB / 1 GB USED"
          secondaryDetail="250 MB LEFT"
        />
        <StatusCard
          icon={Settings01Icon}
          title="Installed Mods"
          progress={97}
          detail="97% PACKED"
        />
        <StatusCard
          icon={Delete02Icon}
          title="System Cache"
          progress={60}
          detail="1.2 GB CACHED"
        />
        <StatusCard
          icon={LockIcon}
          title="Premium Features"
          detail="GO PREMIUM TO UNLOCK"
        />
      </div> */}
      {/* <div className="w-64 flex flex-col gap-6 py-4">
        <div className="flex flex-col gap-2">
          <h2 className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30 mb-2">Storage</h2>
          <NavItem icon={Folder01Icon} label="Files" active />
          <NavItem icon={CloudIcon} label="Remote Saves" />
          <NavItem icon={PackageIcon} label="Mods" />
          <NavItem icon={FileLockIcon} label="Outdated Content" />
          <NavItem icon={UserIcon} label="Account" />
        </div>

        

      <div className="flex-1 flex flex-col gap-6 py-4">
        <CardGradientBorder
          className="flex-1 rounded-[32px] relative overflow-hidden flex flex-col justify-end p-10 bg-[#0c0c0e]"
          from="var(--color-primary)"
          to="var(--color-secondary)"
          radius={32}
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614728263952-84ea206f99b6?q=80&w=2000')] bg-cover bg-center opacity-60 grayscale-[0.2]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-transparent to-transparent" />

          <div className="relative z-10 flex flex-col gap-8">
            <h1 className="text-7xl font-black italic tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-primary via-white to-secondary opacity-90">
              MELORIUM
            </h1>

            <div className="flex items-center gap-8">
              <button type="button" className="flex items-center justify-center gap-3 px-12 py-5 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-black text-lg shadow-2xl shadow-primary/40 hover:scale-[1.03] transition-transform active:scale-[0.98]">
                <HugeiconsIcon icon={PlayIcon} size={24} />
                PLAY
              </button>

              <div className="flex-1 flex flex-col gap-3">
                <div className="flex justify-between items-end">
                  <span className="text-xs font-bold text-foreground/60">Downloading: <span className="text-white">1.62 GB / 6.23 GB</span> at <span className="text-secondary">50.10 MB/s</span></span>
                </div>
                <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden p-[2px] border border-white/5">
                  <div className="h-full bg-linear-to-r from-primary via-white to-secondary rounded-full shadow-[0_0_15px_rgba(var(--primary),0.5)]" style={{ width: '35%' }} />
                </div>
              </div>
            </div>
          </div>
        </CardGradientBorder>

        <div className="flex gap-4 h-[160px]">
          <StatusCard
            icon={HardDriveIcon}
            title="Local Drive"
            progress={75}
            detail="750 MB / 1 GB USED"
            secondaryDetail="250 MB LEFT"
          />
          <StatusCard
            icon={Settings01Icon}
            title="Installed Mods"
            progress={97}
            detail="97% PACKED"
          />
          <StatusCard
            icon={Delete02Icon}
            title="System Cache"
            progress={60}
            detail="1.2 GB CACHED"
          />
          <StatusCard
            icon={LockIcon}
            title="Premium Features"
            detail="GO PREMIUM TO UNLOCK"
          />
        </div>
      </div> */}
    </main>
  );
}
