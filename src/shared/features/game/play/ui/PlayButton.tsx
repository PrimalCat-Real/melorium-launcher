'use client'
import { PlayIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { invoke } from '@tauri-apps/api/core'
import { listen } from '@tauri-apps/api/event'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { ShimmerButton } from '@/modules/magicui/ui/components/ShimmerButton'
import GradientText from '@/modules/primalui/ui/components/text/GradientText'
import { cn } from '@/modules/shadcn/lib/utils'
import { useAuthStore } from '@/store/useAuthStore'
import { useSettingsStore } from '@/store/useSettingsStore'

type PlayButtonProps = {
    className?: string
}

const PlayButton = ({ className }: PlayButtonProps) => {
    const [isLaunching, setIsLaunching] = useState(false)
    const [stage, setStage] = useState('')
    const [percent, setPercent] = useState<number | null>(null)
    const username = useAuthStore((state) => state.login)
    const allocatedRamMb = useSettingsStore((state) => state.allocatedRamMb)
    const isLaunchingRef = useRef(false)

    useEffect(() => {
        console.log("[play] registering loading listener")
        const unlisten = listen<{ fraction: number | null; message: string }>(
            'loading',
            (event) => {
                console.log("[play] loading event:", event.payload)
                if (!isLaunchingRef.current) return
                const { fraction, message } = event.payload
                setStage(message)
                setPercent(fraction != null ? Math.round(fraction * 100) : null)
            },
        )
        return () => { unlisten.then((fn) => fn()) }
    }, [])

    const handlePlay = async () => {
        if (isLaunching) return
        console.log("[play] handlePlay called, username:", username, "ram:", allocatedRamMb)
        isLaunchingRef.current = true
        setIsLaunching(true)
        setStage('')
        setPercent(null)
        try {
            console.log("[play] invoking play_modpack...")
            await invoke('play_modpack', { username, memoryMb: allocatedRamMb })
            console.log("[play] play_modpack completed")
        } catch (err) {
            console.error("[play] play_modpack failed:", err)
            console.error("[play] error stringified:", JSON.stringify(err))
            toast.error(String(err))
        } finally {
            isLaunchingRef.current = false
            setIsLaunching(false)
            setStage('')
            setPercent(null)
        }
    }

    return (
        <ShimmerButton
            variant="secondary"
            isBusy={isLaunching}
            className={cn('font-bold py-6 rounded-lg shadow-2xl', isLaunching && 'pointer-events-none', className)}
            onClick={handlePlay}
        >
            {isLaunching ? (
                <span className="flex items-center gap-3 min-w-0">
                    <span className="w-5.5 h-5.5 shrink-0 rounded-full border-2 border-secondary/20 border-t-secondary border-r-secondary/60 animate-spin" />
                    <GradientText className="text-[14px] font-extrabold uppercase tracking-[0.22em] bg-linear-to-b from-foreground to-shimmer-obsidian via-none shrink-0">
                        Запуск
                    </GradientText>
                    {stage && (
                        <span className="text-xs text-foreground/50 truncate min-w-0">
                            {percent != null ? `${percent}% · ` : ''}{stage}
                        </span>
                    )}
                </span>
            ) : (
                <span className="flex items-center gap-2 uppercase tracking-wide">
                    <HugeiconsIcon icon={PlayIcon} size={18} />
                    Играть
                </span>
            )}
        </ShimmerButton>
    )
}

export default PlayButton
