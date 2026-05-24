'use client'
import { Checkbox, CheckboxIndicator } from '@/modules/animate-ui/components/base/checkbox'
import { cn } from '@/modules/shadcn/lib/utils'

interface SettingsCheckboxProps {
    checked: boolean
    onCheckedChange: (checked: boolean) => void
}

const SettingsCheckbox = ({ checked, onCheckedChange }: SettingsCheckboxProps) => (
    <Checkbox
        checked={checked}
        onCheckedChange={onCheckedChange}
        nativeButton
        className={cn(
            'flex h-4 w-4 shrink-0 items-center justify-center rounded-sm',
            'border border-input transition-colors',
            'data-checked:border-primary data-checked:bg-primary',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50'
        )}
    >
        <CheckboxIndicator className='h-3 w-3 text-primary-foreground' />
    </Checkbox>
)

export default SettingsCheckbox
