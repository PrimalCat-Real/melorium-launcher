'use client'
import { useState } from 'react'
import SettingsSection from '@/shared/features/settings/ui/SettingsSection'
import SettingsRow from '@/shared/features/settings/ui/SettingsRow'
import SettingsCheckbox from '@/shared/features/settings/ui/SettingsCheckbox'
import { Input } from '@/modules/shadcn/components/ui/input'

const JavaSection = () => {
    const [customArgs, setCustomArgs] = useState(false)
    const [javaArgs, setJavaArgs] = useState('')

    return (
        <SettingsSection title='Аргументы Java'>
            <SettingsRow
                label='Пользовательские аргументы'
                description='Передавать дополнительные флаги JVM при запуске'
            >
                <SettingsCheckbox checked={customArgs} onCheckedChange={setCustomArgs} />
            </SettingsRow>

            {customArgs && (
                <Input
                    value={javaArgs}
                    onChange={event => setJavaArgs(event.target.value)}
                    placeholder='-XX:+UseG1GC -Xss1M ...'
                    className='font-mono text-xs'
                />
            )}
        </SettingsSection>
    )
}

export default JavaSection
