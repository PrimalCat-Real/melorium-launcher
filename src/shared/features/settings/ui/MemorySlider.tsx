'use client'
import { Slider as SliderPrimitive } from '@base-ui/react/slider'
import { cn } from '@/modules/shadcn/lib/utils'

interface MemorySliderProps {
    min: number
    max: number
    value: number
    onChange: (value: number) => void
    onCommit: (value: number) => void
    className?: string
}

const MemorySlider = ({ min, max, value, onChange, onCommit, className }: MemorySliderProps) => {
    const handleChange = (raw: unknown) => onChange(raw as number)
    const handleCommit = (raw: unknown) => onCommit(raw as number)

    return (
        <SliderPrimitive.Root
            min={min}
            max={max}
            step={8}
            value={[value]}
            onValueChange={handleChange}
            onValueCommitted={handleCommit}
            className={cn('w-full', className)}
        >
            <SliderPrimitive.Control className='relative flex w-full touch-none items-center select-none'>
                <SliderPrimitive.Track className='relative h-1.5 w-full grow overflow-hidden rounded-full bg-muted'>
                    <SliderPrimitive.Indicator className={cn(
                        'h-full',
                        'bg-linear-to-r from-accent to-primary',
                        'shadow-progress-fill'
                    )} />
                </SliderPrimitive.Track>

                <SliderPrimitive.Thumb
                    index={0}
                    className={cn(
                        'relative block size-4 shrink-0 rounded-full bg-white select-none',
                        'ring-ring/50 transition-shadow',
                        'after:absolute after:-inset-2',
                        'hover:ring-3 focus-visible:ring-3 focus-visible:outline-hidden active:ring-3'
                    )}
                />
            </SliderPrimitive.Control>
        </SliderPrimitive.Root>
    )
}

export default MemorySlider
