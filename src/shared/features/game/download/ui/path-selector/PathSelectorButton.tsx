'use client'
import { open } from '@tauri-apps/plugin-dialog'
import { IoFolderOpenOutline } from 'react-icons/io5'
import { RippleButton } from '@/modules/shadcn/components/ui/ripple-button'
import { useGameStateStore } from '@/store/useGameStateStore'

const truncateCenter = (path: string, maxLen = 36): string => {
    if (path.length <= maxLen) return path
    const half = Math.floor((maxLen - 3) / 2)
    return `${path.slice(0, half)}...${path.slice(-half)}`
}

const PathSelectorButton = () => {
    const rawPath = useGameStateStore((state) => state.rawPath)
    const setRawPath = useGameStateStore((state) => state.setRawPath)

    const handlePick = async () => {
        const selected = await open({ directory: true, multiple: false })
        if (selected) setRawPath(selected as string)
    }

    return (
        <RippleButton onClick={handlePick} rippleColor="var(--color-primary)" className="w-full [&>div]:w-full border-border/70">
            <span className="flex items-center justify-between gap-2 w-full">
                <span className="truncate text-left">
                    {rawPath ? truncateCenter(rawPath) : 'Путь установки'}
                </span>
                <IoFolderOpenOutline size={16} className="shrink-0" />
            </span>
        </RippleButton>
    )
}

export default PathSelectorButton
