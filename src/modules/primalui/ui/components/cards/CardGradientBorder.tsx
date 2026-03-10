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
    radius?: number | string
    strokeWidth?: number
    gradientAngle?: number
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
    radius = 0,
    strokeWidth = 2,
    gradientAngle = 180, // Default to top-to-bottom
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

    // Calculate linear gradient points based on angle
    const angleRad = (gradientAngle * Math.PI) / 180
    const x1 = Math.round(50 + 50 * Math.sin(angleRad + Math.PI))
    const y1 = Math.round(50 + 50 * Math.cos(angleRad))
    const x2 = Math.round(50 + 50 * Math.sin(angleRad))
    const y2 = Math.round(50 + 50 * Math.cos(angleRad + Math.PI))

    const gradients: Record<GradientType, ReactNode> = {
        linear: (
            <linearGradient id={gradientId} x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`}>
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
                        x={strokeWidth / 2}
                        y={strokeWidth / 2}
                        width={width - strokeWidth}
                        height={height - strokeWidth}
                        rx={radius}
                        ry={radius}
                        stroke={`url(#${gradientId})`}
                        vectorEffect="non-scaling-stroke"
                        strokeWidth={strokeWidth}
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
