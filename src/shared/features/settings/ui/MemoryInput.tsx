'use client'
import { useEffect, useState } from 'react'
import { Input } from '@/modules/shadcn/components/ui/input'

interface MemoryInputProps {
    min: number
    max: number
    value: number
    onChange: (value: number) => void
    onCommit: (value: number) => void
    className?: string
}

const MemoryInput = ({ min, max, value, onChange, onCommit, className }: MemoryInputProps) => {
    const [display, setDisplay] = useState(String(value))

    useEffect(() => {
        setDisplay(String(value))
    }, [value])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const raw = event.target.value
        setDisplay(raw)
        const parsed = Number(raw)
        if (!Number.isNaN(parsed) && raw !== '') {
            onChange(Math.max(min, Math.min(max, parsed)))
        }
    }

    const handleBlur = () => {
        const parsed = Number(display)
        if (Number.isNaN(parsed) || display === '') {
            setDisplay(String(value))
        } else {
            const clamped = Math.max(min, Math.min(max, parsed))
            onChange(clamped)
            onCommit(clamped)
            setDisplay(String(clamped))
        }
    }

    return (
        <Input
            type='number'
            value={display}
            min={min}
            max={max}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={`${min}–${max}`}
            className={className}
        />
    )
}

export default MemoryInput
