'use client'
import { invoke } from '@tauri-apps/api/core'
import { useEffect, useState } from 'react'
import { IoCloseOutline } from "react-icons/io5"
import { LuFolderCog } from "react-icons/lu"
import { ShimmerButton } from "@/modules/magicui/ui/components/ShimmerButton"
import { buttonVariants } from '@/modules/shadcn/components/ui/button'
import { DialogClose, DialogFooter, DialogHeader, DialogTitle } from '@/modules/shadcn/components/ui/dialog'
import { cn } from "@/modules/shadcn/lib/utils"
import IconBadge from "@/shared/features/icons/IconBadge"
import { useGameStateStore } from '@/store/useGameStateStore'
import PathSelectorButton from "./PathSelectorButton"
import PathSelectionStatus, { PathSelectionStatusFactory } from "./PathSelectionStatus"
import type { PathSelectionStatusType } from "./PathSelectionStatus"

interface PathCheckResult {
    ok: boolean
    error_kind: string | null
    free_bytes: number | null
    suggested_path: string | null
}

interface PathSelectorProps {
    onInstall?: () => void
}

const PathSelector = ({ onInstall }: PathSelectorProps) => {
    const rawPath = useGameStateStore(state => state.rawPath)
    const setRawPath = useGameStateStore(state => state.setRawPath)
    const [pathStatus, setPathStatus] = useState<PathSelectionStatusType | null>(null)
    const [checking, setChecking] = useState(false)

    useEffect(() => {
        if (!rawPath) {
            setPathStatus(null)
            return
        }
        setChecking(true)
        invoke<PathCheckResult>('check_install_path', { path: rawPath })
            .then(result => {
                if (result.suggested_path) {
                    setRawPath(result.suggested_path)
                    return
                }
                if (result.ok) {
                    setPathStatus(PathSelectionStatusFactory.pathSuccess())
                    return
                }
                switch (result.error_kind) {
                    case 'no_free_space':
                        setPathStatus(PathSelectionStatusFactory.noFreeSpace())
                        break
                    case 'no_permission':
                        setPathStatus(PathSelectionStatusFactory.noPermission())
                        break
                    default:
                        setPathStatus(PathSelectionStatusFactory.custom('Ошибка проверки пути'))
                }
            })
            .catch(() => setPathStatus(PathSelectionStatusFactory.custom('Ошибка проверки пути')))
            .finally(() => setChecking(false))
    }, [rawPath, setRawPath])

    const canInstall = !checking && pathStatus?.kind === 'success_init'

    return (
        <>
            <DialogHeader className="flex justify-between flex-row items-center">
                <DialogTitle className="flex gap-2 items-center">
                    <IconBadge>
                        <LuFolderCog size={14} />
                    </IconBadge>
                    <span>Выбор папки установки</span>
                </DialogTitle>
                <DialogClose className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}>
                    <IoCloseOutline size={16} />
                </DialogClose>
            </DialogHeader>
            <div className="flex flex-col gap-4">
                <p>Путь установки</p>
                <PathSelectorButton />
                {pathStatus && !checking && (
                    <PathSelectionStatus status={pathStatus} />
                )}
            </div>
            <DialogFooter>
                <ShimmerButton variant="outline" onClick={onInstall} disabled={!canInstall}>
                    Установить
                </ShimmerButton>
            </DialogFooter>
        </>
    )
}

export default PathSelector
