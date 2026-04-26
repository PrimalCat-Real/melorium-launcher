import React from 'react'
import { GoPlus } from "react-icons/go";
import type { BentoCardProps } from './BentoCard'
import { cn } from '@/modules/shadcn/lib/utils';

interface BentoTitle extends BentoCardProps {
    title: string
}

const BentoTitle = ({ className, children, title }: BentoTitle) => {
    return (
        <div className={cn('w-full h-full flex flex-col justify-between p-2', className)}>
            <GoPlus />
            {title ? <span className='text-base leading-tight text-balance'>{title}</span> : children}
        </div>
    )
}

export default BentoTitle