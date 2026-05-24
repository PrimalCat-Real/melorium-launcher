import type { ReactNode } from 'react'
import { cn } from '@/modules/shadcn/lib/utils'

interface SettingsRowProps {
    label: string
    description?: string
    children: ReactNode
    className?: string
}

const SettingsRow = ({ label, description, children, className }: SettingsRowProps) => (
    <div className={cn(
        'flex items-center justify-between',
        'rounded-lg border border-border/50 bg-card/30 px-4 py-3',
        className
    )}>
        <div className='flex flex-col gap-0.5'>
            <span className='text-sm font-medium'>{label}</span>
            {description && (
                <span className='text-xs text-muted-foreground'>{description}</span>
            )}
        </div>
        <div className='flex items-center gap-3 shrink-0'>
            {children}
        </div>
    </div>
)

export default SettingsRow
