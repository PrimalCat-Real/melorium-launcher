'use client'

import { cn } from '@/modules/shadcn/lib/utils'
import { useRender } from '@base-ui/react/use-render'
import React, { ReactNode, useEffect, useId, useRef, useState } from 'react'


type GradientType = "radial" | "linear"

interface CardGradientBorderProps extends useRender.ComponentProps<'div'> {
    type?: GradientType
    from?: string
    via?: string
    to?: string
    fixedWidth?: number
    fixedHeight?: number
}

const CardGradientBorder = ({
    render,
    children,
    className,
    type = "linear",
    from = "#ffffff",
    via,
    to = "#666666",
    fixedWidth,
    fixedHeight,
    ...props
}: CardGradientBorderProps) => {
    const gradientId = useId()
    const containerRef = useRef<HTMLElement | null>(null)
    const [observedSize, setObservedSize] = useState({ width: 0, height: 0 })

    const width = fixedWidth ?? observedSize.width
    const height = fixedHeight ?? observedSize.height

    // Disable ResizeObserver if both fixed dimensions are provided
    const hasFixedSize = fixedWidth !== undefined && fixedHeight !== undefined

    useEffect(() => {
        if (hasFixedSize) return

        const element = containerRef.current
        if (!element) return

        const sizeObserver = new ResizeObserver(([entry]) => {
            const target = entry.target as HTMLElement
            setObservedSize({
                width: target.offsetWidth,
                height: target.offsetHeight
            })
        })

        sizeObserver.observe(element)
        return () => sizeObserver.disconnect()
    }, [hasFixedSize])

    const gradients: Record<GradientType, ReactNode> = {
        linear: (
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={from} />
                {via && <stop offset="50%" stopColor={via} />}
                <stop offset="100%" stopColor={to} />
            </linearGradient>
        ),
        radial: (
            <radialGradient id={gradientId} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={from} />
                {via && <stop offset="50%" stopColor={via} />}
                <stop offset="100%" stopColor={to} />
            </radialGradient>
        )
    }

    // Merge SVG border and children together to pass them into useRender
    const mergedChildren = (
        <>
            {width > 0 && height > 0 && (
                // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
                <svg
                    width={width}
                    height={height}
                    viewBox={`0 0 ${width} ${height}`}
                    className="absolute inset-0 pointer-events-none"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect
                        x="0"
                        y="0"
                        width={width}
                        height={height}
                        stroke={`url(#${gradientId})`}
                        vectorEffect="non-scaling-stroke"
                        strokeWidth={2}
                    />
                    <defs>
                        {gradients[type]}
                    </defs>
                </svg>
            )}
            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </>
    )

    return useRender({
        render: render ?? <div />,
        props: {
            ...props,
            ref: containerRef,
            className: cn("relative", className),
            children: mergedChildren
        }
    })
}

export default CardGradientBorder