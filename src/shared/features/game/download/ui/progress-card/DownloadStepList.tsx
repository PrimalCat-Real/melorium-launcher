import { CheckmarkCircle02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { cn } from '@/modules/shadcn/lib/utils'

const STEPS = [
    { barTypes: ['pack_download'], label: 'Загрузка пака' },
    { barTypes: ['zip_extract', 'java_download', 'minecraft_download'], label: 'Установка окружения' },
    { barTypes: ['pack_file_download'], label: 'Загрузка модов' },
    { barTypes: ['profile_update', 'config_change'], label: 'Настройка профиля' },
] as const

interface DownloadStepListProps {
    completedBarTypes: string[]
    activeBarType: string
}

const DownloadStepList = ({ completedBarTypes, activeBarType }: DownloadStepListProps) => (
    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        {STEPS.map((step) => {
            const isDone = step.barTypes.some((t) => completedBarTypes.includes(t))
            const isActive = !isDone && step.barTypes.some((t) => t === activeBarType)
            return (
                <div
                    key={step.label}
                    className={cn(
                        'flex items-center gap-2 text-[11px]',
                        isDone && 'text-emerald-400',
                        isActive && 'text-foreground',
                        !isDone && !isActive && 'text-muted-foreground/60',
                    )}
                >
                    {isDone ? (
                        <HugeiconsIcon icon={CheckmarkCircle02Icon} size={13} className="shrink-0" />
                    ) : isActive ? (
                        <span className="w-3 h-3 shrink-0 rounded-full border border-blade/20 border-t-blade animate-spin" />
                    ) : (
                        <span className="w-1.5 h-1.5 mx-0.75 shrink-0 rounded-full bg-blade/25" />
                    )}
                    {step.label}
                </div>
            )
        })}
    </div>
)

export default DownloadStepList
