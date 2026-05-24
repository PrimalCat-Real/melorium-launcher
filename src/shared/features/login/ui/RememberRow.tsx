'use client'
import { Checkbox, CheckboxIndicator } from '@/modules/animate-ui/components/base/checkbox'
import { Button } from '@/modules/shadcn/components/ui/button'
import { Label } from '@/modules/shadcn/components/ui/label'
import { cn } from '@/modules/shadcn/lib/utils'

interface RememberRowProps {
    checked: boolean
    onCheckedChange: (checked: boolean) => void
}

const RememberRow = ({ checked, onCheckedChange }: RememberRowProps) => (
    <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
            <Checkbox
                id='remember'
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
            <Label htmlFor='remember' className='text-sm cursor-pointer select-none'>
                Запомнить меня
            </Label>
        </div>
        <Button
            type='button'
            variant='ghost'
            className={cn(
                'h-auto p-0 text-sm',
                'text-primary hover:bg-transparent hover:text-primary/80'
            )}
        >
            Забыл пароль?
        </Button>
    </div>
)

export default RememberRow
