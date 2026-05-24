import { Backlight } from '@/modules/magicui/ui/components/Backlight'
import BrandText from '@/shared/features/brand/ui/BrandText'
import LogoBrand from '@/shared/features/logo/LogoBrand'
import CloseButton from '@/shared/features/titlebar/ui/CloseButton'
import MinimizaButton from '@/shared/features/titlebar/ui/MinimizaButton'
import Version from '@/shared/features/titlebar/ui/Version'
import React from 'react'

const Titlebar = () => {
    return (
        <header data-tauri-drag-region className='flex min-h-10 items-center justify-between border-b border-border/70 px-5 bg-linear-to-r from-dialog-bg-from/40 via-dialog-bg-via/20 to-dialog-bg-to/30'>
            <div className="titlebar-brand flex items-center gap-2">
                <Backlight blur={5}>
                    <LogoBrand width={16} ></LogoBrand>
                </Backlight>
                <BrandText />
            </div>
            <div className="titlebar-right flex items-center gap-1">
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