import type { ReactNode } from 'react'
import { cn } from '@/modules/shadcn/lib/utils'
import { Label } from '@/modules/shadcn/components/ui/label'

interface FieldLabelProps {
    htmlFor?: string
    children: ReactNode
}

const FieldLabel = ({ htmlFor, children }: FieldLabelProps) => (
    <Label
        htmlFor={htmlFor}
        className={cn(
            'font-manrope font-semibold uppercase tracking-widest',
            'text-xs text-muted-foreground'
        )}
    >
        {children}
    </Label>
)

export default FieldLabel
