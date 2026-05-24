import type { ButtonProps } from '@base-ui/react/button'
import React from 'react'
import { Button } from '@/modules/shadcn/components/ui/button'
import { cn } from '@/modules/shadcn/lib/utils'

const ButtonGlaze = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, ...rest }, ref) => {
        return (
            <Button
                ref={ref}
                {...rest}
                className={cn(
                    'relative overflow-hidden group',
                    'bg-linear-to-br from-glaze-from via-glaze-mid to-glaze-to',
                    'text-white font-bold',
                    rest.className,
                )}
            >
                <span className="absolute top-0 left-0 w-1/2 h-full pointer-events-none -skew-x-18 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent mix-blend-overlay transition-transform duration-700 ease-[cubic-bezier(.2,.7,.3,1)] group-hover:translate-x-[250%]" />
                {children}
            </Button>
        )
    }
)
ButtonGlaze.displayName = 'ButtonGlaze'

export default ButtonGlaze
