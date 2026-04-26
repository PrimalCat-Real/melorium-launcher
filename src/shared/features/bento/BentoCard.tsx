import { cn } from '@/modules/shadcn/lib/utils'
import React from 'react'

export interface BentoCardProps {
    className?: string,
    children?: React.ReactNode
}

const BentoCard = ({ className, children }: BentoCardProps) => {
    return (
        <div className={cn('', className)}>
            {children}
        </div>
    )
}

export default BentoCard