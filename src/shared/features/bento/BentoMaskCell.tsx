import { cn } from '@/modules/shadcn/lib/utils'
import type { ReactNode } from 'react'

interface BentoMaskCellProps {
    className?: string
    children?: ReactNode
    span?: number
}

const BentoMaskCell = ({ className, children, span }: BentoMaskCellProps) => {
    return (
        <div
            className={cn('rounded-2xl xl:rounded-4xl bg-white aspect-square relative overflow-hidden', className)}
            style={span ? { gridColumn: `span ${span}` } : undefined}
        >
            {children}
        </div>
    )
}

export default BentoMaskCell
