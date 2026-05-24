'use client'
import { motion } from 'framer-motion'
import type { ComponentProps } from 'react'
import { FiDownload } from 'react-icons/fi'
import Counter from '@/modules/animate-ui/components/text/counter'
import { ShimmerButton } from '@/modules/magicui/ui/components/ShimmerButton'
import { cn } from '@/modules/shadcn/lib/utils'
import GradientText from '@/modules/primalui/ui/components/text/GradientText'

const EASE: [number, number, number, number] = [0.2, 0.7, 0.3, 1]

const iconVariants = {
    rest: { width: 0, opacity: 0, marginLeft: 0 },
    hover: { width: 18, opacity: 1, marginLeft: 6 },
}

type DownloadButtonProps = Omit<ComponentProps<typeof ShimmerButton>, 'isBusy'> & {
    isBusy?: boolean
    percent?: number | null
}

const BusyContent = ({ percent }: { percent?: number | null }) => (
    <span className="flex items-center gap-3">
        <span className="w-5.5 h-5.5 shrink-0 rounded-full border-2 border-blade/18 border-t-blade border-r-primary animate-spin" />
        <GradientText className='text-[14px] font-extrabold uppercase tracking-[0.22em] bg-linear-to-b from-foreground to-shimmer-obsidian via-none'>Загрузка</GradientText>
        {percent != null && (
            <span className="px-2 py-0.5 rounded-sm bg-primary/15 border border-primary/30">
                <Counter
                    className=" text-xs font-medium tabular-nums"
                    targetValue={percent}
                    format={(val) => `${Math.round(val)}%`}
                />
            </span>
        )}
    </span>
)

const DownloadButton = ({ className, children, isBusy, percent, size, variant, ...rest }: DownloadButtonProps) => (
    <ShimmerButton
        variant={variant}
        isBusy={isBusy}
        size={size}
        className={cn('overflow-hidden gap-0 px-4', className)}
        {...rest}
    >
        <span className="relative z-10">
            {isBusy ? <BusyContent percent={percent} /> : children}
        </span>
        <motion.span
            variants={iconVariants}
            transition={{ duration: 0.35, ease: EASE }}
            className="relative z-10 overflow-hidden flex items-center shrink-0"
        >
            <FiDownload className="w-4 h-4 shrink-0" />
        </motion.span>
    </ShimmerButton>
)

export default DownloadButton
