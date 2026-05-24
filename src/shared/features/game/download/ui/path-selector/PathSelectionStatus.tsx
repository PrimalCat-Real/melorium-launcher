import type { IconType } from 'react-icons'
import { BiCheckCircle, BiError } from 'react-icons/bi'
import { cn } from '@/modules/shadcn/lib/utils'

export type PathSelectionStatusType =
    | { kind: 'error_no_free_space' }
    | { kind: 'success_init' }
    | { kind: 'error_no_permission' }
    | { kind: 'error_custom'; title: string }

export const PathSelectionStatusFactory = {
    noFreeSpace: (): PathSelectionStatusType => ({ kind: 'error_no_free_space' }),
    custom: (title: string): PathSelectionStatusType => ({ kind: 'error_custom', title }),
    pathSuccess: (): PathSelectionStatusType => ({ kind: 'success_init' }),
    noPermission: (): PathSelectionStatusType => ({ kind: 'error_no_permission' }),
}

type StatusVariant = 'error' | 'success'

function resolveVariant(status: PathSelectionStatusType): StatusVariant {
    return status.kind === 'success_init' ? 'success' : 'error'
}

function resolveTitle(status: PathSelectionStatusType): string {
    switch (status.kind) {
        case 'error_no_free_space': return 'Недостаточно свободного места'
        case 'error_no_permission': return 'Нет прав для записи'
        case 'success_init': return 'Путь подтверждён'
        case 'error_custom': return status.title
    }
}

const variantConfig: Record<StatusVariant, { container: string; iconColor: string; Icon: IconType }> = {
    error: {
        container: 'bg-rose-500/6 border-rose-500/25',
        iconColor: 'text-rose-400/80',
        Icon: BiError,
    },
    success: {
        container: 'bg-emerald-500/6 border-emerald-500/20',
        iconColor: 'text-emerald-500/65',
        Icon: BiCheckCircle,
    },
}

interface PathSelectionStatusProps {
    status: PathSelectionStatusType
    status_description?: string
}

const PathSelectionStatus = ({ status, status_description }: PathSelectionStatusProps) => {
    const variant = resolveVariant(status)
    const title = resolveTitle(status)
    const { container, iconColor, Icon } = variantConfig[variant]

    return (
        <div className={cn('border rounded-md px-3 py-2.5 flex items-start gap-2', container)}>
            <Icon size={14} className={cn('shrink-0 mt-px', iconColor)} />
            <div className="flex flex-col gap-0.5">
                <span className="text-xs font-normal leading-tight">{title}</span>
                {status_description && (
                    <span className="text-[11px] text-foreground/35 leading-tight">{status_description}</span>
                )}
            </div>
        </div>
    )
}

export default PathSelectionStatus
