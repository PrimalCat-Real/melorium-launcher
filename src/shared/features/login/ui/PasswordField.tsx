'use client'
import { useState } from 'react'
import { HiEye, HiEyeSlash } from 'react-icons/hi2'
import { cn } from '@/modules/shadcn/lib/utils'
import { Input } from '@/modules/shadcn/components/ui/input'
import FieldLabel from './FieldLabel'

interface PasswordFieldProps {
    value: string
    onChange: (value: string) => void
    onBlur: () => void
    hasError: boolean
}

const PasswordField = ({ value, onChange, onBlur, hasError }: PasswordFieldProps) => {
    const [visible, setVisible] = useState(false)

    return (
        <div className='flex flex-col gap-2'>
            <FieldLabel htmlFor='password'>Пароль</FieldLabel>
            <div className='relative'>
                <Input
                    id='password'
                    type={visible ? 'text' : 'password'}
                    value={value}
                    onChange={event => onChange(event.target.value)}
                    onBlur={onBlur}
                    aria-invalid={hasError}
                    className={cn('pr-10', hasError && 'border-destructive')}
                />
                <button
                    type='button'
                    onClick={() => setVisible(prev => !prev)}
                    className={cn(
                        'absolute right-3 top-1/2 -translate-y-1/2',
                        'text-muted-foreground transition-colors hover:text-foreground'
                    )}
                >
                    {visible ? <HiEyeSlash size={16} /> : <HiEye size={16} />}
                </button>
            </div>
        </div>
    )
}

export default PasswordField
