import BrandText from '@/shared/features/brand/ui/BrandText'
import CloseButton from '@/shared/features/titlebar/ui/CloseButton'
import MinimizaButton from '@/shared/features/titlebar/ui/MinimizaButton'
import Version from '@/shared/features/titlebar/ui/Version'
import React from 'react'

const Titlebar = () => {
    return (
        <header data-tauri-drag-region className='flex min-h-10 items-center justify-between border-b muted-border px-6'>
            <div className="titlebar-brand flex items-center gap-1">
                <BrandText />
            </div>
            <div className="titlebar-right flex items-center">
                <Version></Version>
                <div className="win-controls flex gap-0.5 items-center">
                    <MinimizaButton />
                    <CloseButton />
                </div>
            </div>

        </header>
    )
}

export default Titlebar