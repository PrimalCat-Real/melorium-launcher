import { cn } from '@/modules/shadcn/lib/utils'
import { Input } from '@/modules/shadcn/components/ui/input'
import FieldLabel from './FieldLabel'

interface NickFieldProps {
    value: string
    onChange: (value: string) => void
    onBlur: () => void
    hasError: boolean
}

const NickField = ({ value, onChange, onBlur, hasError }: NickFieldProps) => (
    <div className='flex flex-col gap-2'>
        <FieldLabel htmlFor='nick'>Ник</FieldLabel>
        <Input
            id='nick'
            value={value}
            onChange={event => onChange(event.target.value)}
            onBlur={onBlur}
            aria-invalid={hasError}
            className={cn(hasError && 'border-destructive')}
        />
    </div>
)

export default NickField
