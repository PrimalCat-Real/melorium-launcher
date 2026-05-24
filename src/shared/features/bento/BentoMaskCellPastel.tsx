import type { ReactNode } from 'react'
import { cn } from '@/modules/shadcn/lib/utils'
import { COL, ROW } from './bentoPositionMaps'

interface BentoMaskCellPastelProps {
    index?: number
    className?: string
    children?: ReactNode
}

const BentoMaskCellPastel = ({ index = 0, className, children }: BentoMaskCellPastelProps) => {
    const col = index % 4
    const row = Math.floor(index / 4)

    return (
        <div className={cn('bento-tile', COL[col], ROW[row], className)}>
            <div className='absolute inset-0 z-[1] pointer-events-none mix-blend-screen bento-overlay-pastel' />
            {children}
        </div>
    )
}

export default BentoMaskCellPastel
