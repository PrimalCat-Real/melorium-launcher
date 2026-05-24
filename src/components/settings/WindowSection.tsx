'use client'
import { useState } from 'react'
import SettingsSection from '@/shared/features/settings/ui/SettingsSection'
import SettingsRow from '@/shared/features/settings/ui/SettingsRow'
import SettingsSwitch from '@/shared/features/settings/ui/SettingsSwitch'
import { Input } from '@/modules/shadcn/components/ui/input'

const WindowSection = () => {
    const [fullscreen, setFullscreen] = useState(false)
    const [windowWidth, setWindowWidth] = useState('1280')
    const [windowHeight, setWindowHeight] = useState('720')

    return (
        <SettingsSection title='Окно игры'>
            <SettingsRow
                label='Полноэкранный режим'
                description='Запускать игру в полноэкранном режиме'
            >
                <SettingsSwitch checked={fullscreen} onCheckedChange={setFullscreen} />
            </SettingsRow>

            <SettingsRow
                label='Разрешение окна'
                description='Ширина и высота окна игры в пикселях'
            >
                <div className='flex items-center gap-2'>
                    <Input
                        type='number'
                        value={windowWidth}
                        onChange={event => setWindowWidth(event.target.value)}
                        className='w-20 text-center'
                        disabled={fullscreen}
                    />
                    <span className='text-muted-foreground text-sm'>×</span>
                    <Input
                        type='number'
                        value={windowHeight}
                        onChange={event => setWindowHeight(event.target.value)}
                        className='w-20 text-center'
                        disabled={fullscreen}
                    />
                </div>
            </SettingsRow>
        </SettingsSection>
    )
}

export default WindowSection
