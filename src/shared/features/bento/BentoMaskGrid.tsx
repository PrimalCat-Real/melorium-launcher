import { cn } from '@/modules/shadcn/lib/utils'
import Image from 'next/image'
import React from 'react'

interface BentoMaskGridProps {
    imageSrc: string
    imageAlt?: string
    imagePosition?: string
    children: React.ReactNode
}

type MaskCell = React.ReactElement<{ children?: React.ReactNode; className?: string }>

const gridClass = 'grid grid-cols-[repeat(4,minmax(9rem,1fr))] absolute -top-28 -left-10 right-0 gap-1 content-start'

const BentoMaskGrid = ({ imageSrc, imageAlt = '', imagePosition = 'center', children }: BentoMaskGridProps) => {
    const cells = React.Children.toArray(children) as MaskCell[]

    return (
        <>
            <div className={gridClass}>
                {cells.map((cell) => React.cloneElement(cell, { children: null }))}
            </div>

            <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className={cn('object-cover mix-blend-multiply', `object-[${imagePosition}]`)}
            />

            <div className={cn(gridClass, 'z-10')}>
                {cells.map((cell) => (
                    <div key={`content-${cell.key}`} className='aspect-square relative'>
                        {cell.props.children ?? null}
                    </div>
                ))}
            </div>
        </>
    )
}

export default BentoMaskGrid
