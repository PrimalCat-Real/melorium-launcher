import React from 'react'
import type { BentoCardProps } from './BentoCard'
import { cn } from '@/modules/shadcn/lib/utils'

const BentoDots = ({ className, children }: BentoCardProps) => {
    return (
        <div className={cn('bento-grid-dots inset-3.5 absolute', className)}>
            {children}
        </div>
    )
}

export default BentoDots