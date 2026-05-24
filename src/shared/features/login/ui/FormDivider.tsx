import { cn } from '@/modules/shadcn/lib/utils'

const FormDivider = () => (
    <div className='flex items-center gap-4'>
        <div className='h-px flex-1 bg-border' />
        <span className={cn(
            'font-manrope uppercase tracking-widest',
            'text-xs text-muted-foreground'
        )}>
            или
        </span>
        <div className='h-px flex-1 bg-border' />
    </div>
)

export default FormDivider
