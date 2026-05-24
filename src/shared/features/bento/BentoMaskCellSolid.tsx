import type { ReactNode } from 'react'
import { cn } from '@/modules/shadcn/lib/utils'
import { COL, ROW } from './bentoPositionMaps'

interface BentoMaskCellSolidProps {
    index?: number
    colorClass: string
    className?: string
    children?: ReactNode
}

const BentoMaskCellSolid = ({ index = 0, colorClass, className, children }: BentoMaskCellSolidProps) => {
    const col = index % 4
    const row = Math.floor(index / 4)

    return (
        <div className={cn(
            'bento-tile [background-image:none]',
            COL[col], ROW[row],
            colorClass,
            className
        )}>
            {children}
        </div>
    )
}

export default BentoMaskCellSolid
