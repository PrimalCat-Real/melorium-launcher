import { cn } from '@/modules/shadcn/lib/utils'
import React, { ReactNode } from 'react'

interface IconBadgeProps {
    children: ReactNode,
    className?: string
}

const IconBadge = ({ className, children }: IconBadgeProps) => {
    return (
        <div className={cn("rounded-md bg-linear-to-b from-secondary/20 to-primary/40 w-min h-min p-2", className)}>
            {children}
        </div>
    )
}

export default IconBadge