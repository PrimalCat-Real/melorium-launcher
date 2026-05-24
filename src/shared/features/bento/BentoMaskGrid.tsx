import React from 'react'
import { cn } from '@/modules/shadcn/lib/utils'

interface BentoMaskGridProps {
    className?: string
    children: React.ReactNode
}

const BentoMaskGrid = ({ className, children }: BentoMaskGridProps) => {
    const cells = React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child
        return React.cloneElement(child as React.ReactElement<{ index: number }>, { index })
    })

    return (
        <div className={cn(
            'bento-mosaic bento-art-sword',
            'absolute -left-12 top-1/2 -translate-y-1/2',
            className
        )}>
            {cells}
        </div>
    )
}

export default BentoMaskGrid
