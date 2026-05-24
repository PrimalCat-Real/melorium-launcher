'use client'
import { useState } from 'react'
import SettingsSection from '@/shared/features/settings/ui/SettingsSection'
import SettingsRow from '@/shared/features/settings/ui/SettingsRow'
import SettingsSwitch from '@/shared/features/settings/ui/SettingsSwitch'

const LauncherSection = () => {
    const [autoUpdates, setAutoUpdates] = useState(true)
    const [discordRpc, setDiscordRpc] = useState(true)
    const [notifications, setNotifications] = useState(true)

    return (
        <SettingsSection title='Лаунчер'>
            <SettingsRow
                label='Автообновление'
                description='Обновлять лаунчер автоматически при запуске'
            >
                <SettingsSwitch checked={autoUpdates} onCheckedChange={setAutoUpdates} />
            </SettingsRow>

            <SettingsRow
                label='Discord Rich Presence'
                description='Показывать статус игры в Discord'
            >
                <SettingsSwitch checked={discordRpc} onCheckedChange={setDiscordRpc} />
            </SettingsRow>

            <SettingsRow
                label='Уведомления'
                description='Системные уведомления о событиях лаунчера'
            >
                <SettingsSwitch checked={notifications} onCheckedChange={setNotifications} />
            </SettingsRow>
        </SettingsSection>
    )
}

export default LauncherSection
