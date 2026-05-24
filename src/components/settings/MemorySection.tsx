'use client'
import { useState } from 'react'
import { cn } from '@/modules/shadcn/lib/utils'
import useSystemMemoryMb from '@/shared/features/settings/lib/useSystemMemoryMb'
import MemoryInput from '@/shared/features/settings/ui/MemoryInput'
import MemorySlider from '@/shared/features/settings/ui/MemorySlider'
import { useSettingsStore } from '@/store/useSettingsStore'
import GradientText from '@/modules/primalui/ui/components/text/GradientText'

const MEM_MIN = 4096

const MemorySection = () => {
    const maxMemoryMb = useSystemMemoryMb() ?? MEM_MIN
    const allocatedRamMb = useSettingsStore(state => state.allocatedRamMb)
    const setAllocatedRamMb = useSettingsStore(state => state.setAllocatedRamMb)

    const [localValue, setLocalValue] = useState(allocatedRamMb ?? MEM_MIN)

    return (
        <div className='flex flex-col gap-4'>
            <h2 className={cn(
                'font-manrope font-semibold uppercase tracking-widest',
                'text-xs text-muted-foreground'
            )}>
                Выделение памяти
            </h2>

            <div className='rounded-lg border border-border/50 bg-card/30 px-4 py-3'>
                <div className='flex w-full items-center gap-4'>
                    <div className='w-full flex flex-col'>
                        <MemorySlider
                            min={MEM_MIN}
                            max={maxMemoryMb}
                            value={localValue}
                            onChange={setLocalValue}
                            onCommit={setAllocatedRamMb}
                        />
                        <div className='flex justify-between w-full font-mono mt-1 font-medium text-sm'>
                            <GradientText className='to-primary'>{MEM_MIN} МБ</GradientText>
                            <GradientText className=' to-primary'>{maxMemoryMb} МБ</GradientText>
                        </div>
                    </div>

                    <MemoryInput
                        className='w-28'
                        min={MEM_MIN}
                        max={maxMemoryMb}
                        value={localValue}
                        onChange={setLocalValue}
                        onCommit={setAllocatedRamMb}
                    />
                </div>
            </div>
        </div>
    )
}

export default MemorySection
