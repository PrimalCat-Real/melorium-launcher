import type { ReactNode } from 'react'
import { cn } from '@/modules/shadcn/lib/utils'
import { COL, ROW } from './bentoPositionMaps'

interface BentoMaskCellProps {
    index?: number
    className?: string
    children?: ReactNode
}

const BentoMaskCell = ({ index = 0, className, children }: BentoMaskCellProps) => {
    const col = index % 4
    const row = Math.floor(index / 4)

    return (
        <div className={cn('bento-tile', COL[col], ROW[row], className)}>
            {children}
        </div>
    )
}

export default BentoMaskCell
