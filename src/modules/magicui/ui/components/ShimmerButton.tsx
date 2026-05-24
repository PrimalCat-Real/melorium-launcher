'use client'
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from 'framer-motion'
import type { ComponentProps } from 'react'
import { cn } from '@/modules/shadcn/lib/utils'

const EASE: [number, number, number, number] = [0.2, 0.7, 0.3, 1]

const glareVariants = {
    rest: { x: '-100%' },
    hover: { x: '250%' },
}

const glareByVariant = {
    obsidian: 'via-secondary/30',
    secondary: 'via-primary/25',
    outline: 'via-foreground/15',
    outlineSecondary: 'via-secondary/25',
} as const

const shimmerButtonVariants = cva(
    cn(
        'relative overflow-hidden cursor-pointer',
        'inline-flex items-center justify-center gap-2 shrink-0 rounded-md',
        'font-medium whitespace-nowrap',
        'outline-none focus-visible:ring-2 focus-visible:ring-ring/30',
        'disabled:pointer-events-none disabled:opacity-50',
        '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4',
        'text-foreground transition-all',
    ),
    {
        variants: {
            variant: {
                obsidian: cn(
                    'border border-blade/20',
                    'bg-shimmer-obsidian',
                    'hover:bg-shimmer-obsidian-hover hover:border-blade/35',
                    'shadow-shimmer-obsidian hover:shadow-shimmer-obsidian-hover',
                ),
                secondary: cn(
                    'border border-secondary/25',
                    'bg-shimmer-secondary',
                    'hover:bg-shimmer-secondary-hover hover:border-secondary/45',
                    'shadow-shimmer-secondary hover:shadow-shimmer-secondary-hover',
                ),
                outline: cn(
                    'border border-blade/20',
                    'bg-foreground/5',
                    'hover:bg-foreground/10 hover:border-blade/35',
                ),
                outlineSecondary: cn(
                    'border border-secondary/30',
                    'bg-secondary/10',
                    'hover:bg-secondary/18 hover:border-secondary/50',
                    'shadow-shimmer-secondary hover:shadow-shimmer-secondary-hover',
                ),
            },
            size: {
                default: 'h-9 px-4 py-2 text-sm',
                sm: 'h-7 px-3 text-xs',
                lg: 'h-11 px-8 text-base',
                icon: 'size-9',
            },
        },
        defaultVariants: { variant: 'obsidian', size: 'default' },
    },
)

type ShimmerButtonProps = ComponentProps<typeof ButtonPrimitive> &
    VariantProps<typeof shimmerButtonVariants> & {
        isBusy?: boolean
    }

function ShimmerButton({ className, children, isBusy, variant = 'obsidian', size, ...props }: ShimmerButtonProps) {
    const glareClass = glareByVariant[variant ?? 'obsidian']
    return (
        <motion.div
            initial="rest"
            whileHover={isBusy ? 'rest' : 'hover'}
            className="relative inline-flex has-disabled:cursor-not-allowed"
        >
            <ButtonPrimitive
                data-slot="button"
                className={cn(shimmerButtonVariants({ variant, size }), className)}
                {...props}
            >
                {!isBusy && (
                    <motion.span
                        variants={glareVariants}
                        transition={{ duration: 0.7, ease: EASE }}
                        className={cn(
                            'absolute top-0 left-0 w-1/2 h-full pointer-events-none -skew-x-18 bg-linear-to-r from-transparent to-transparent mix-blend-screen',
                            glareClass,
                        )}
                    />
                )}
                {children}
            </ButtonPrimitive>
        </motion.div>
    )
}

ShimmerButton.displayName = 'ShimmerButton'
export { ShimmerButton, shimmerButtonVariants, type ShimmerButtonProps }
