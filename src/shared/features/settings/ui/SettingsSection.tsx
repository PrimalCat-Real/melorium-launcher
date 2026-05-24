import type { ReactNode } from 'react'
import { cn } from '@/modules/shadcn/lib/utils'

interface SettingsSectionProps {
    title: string
    children: ReactNode
    className?: string
}

const SettingsSection = ({ title, children, className }: SettingsSectionProps) => (
    <section className={cn('flex flex-col gap-4', className)}>
        <h2 className={cn(
            'font-manrope font-semibold uppercase tracking-widest',
            'text-xs text-muted-foreground'
        )}>
            {title}
        </h2>
        <div className='flex flex-col gap-2'>
            {children}
        </div>
    </section>
)

export default SettingsSection
