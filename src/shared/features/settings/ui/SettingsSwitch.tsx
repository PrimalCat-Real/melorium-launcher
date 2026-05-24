'use client'
import { Switch, SwitchThumb } from '@/modules/animate-ui/components/base/switch'
import { cn } from '@/modules/shadcn/lib/utils'

interface SettingsSwitchProps {
    checked: boolean
    onCheckedChange: (checked: boolean) => void
}

const SettingsSwitch = ({ checked, onCheckedChange }: SettingsSwitchProps) => (
    <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        nativeButton
        className={cn(
            'flex h-5 w-9 items-center rounded-full border border-input px-0.5',
            'transition-colors data-checked:border-primary data-checked:bg-primary',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50'
        )}
    >
        <SwitchThumb
            className={cn(
                'block h-3.5 w-3.5 rounded-full bg-muted-foreground',
                'data-checked:bg-primary-foreground'
            )}
        />
    </Switch>
)

export default SettingsSwitch
