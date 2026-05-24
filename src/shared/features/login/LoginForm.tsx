'use client'
import { useForm } from '@tanstack/react-form'
import { useRouter } from 'next/navigation'
import { type FormEvent, useState } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'
import { useAuthStore } from '@/store/useAuthStore'
import FormDivider from './ui/FormDivider'
import NickField from './ui/NickField'
import OAuthButtons from './ui/OAuthButtons'
import PasswordField from './ui/PasswordField'
import RegisterLink from './ui/RegisterLink'
import RememberRow from './ui/RememberRow'
import SubmitButton from './ui/SubmitButton'

const LoginForm = () => {
    const router = useRouter()
    const setLogin = useAuthStore(state => state.setLogin)
    const setAuthStatus = useAuthStore(state => state.setAuthStatus)
    const [remember, setRemember] = useState(false)

    const form = useForm({
        defaultValues: { login: '', password: '' },
        onSubmit: async ({ value }) => {
            setLogin(value.login)
            setAuthStatus('authenticated')
            router.push('/')
        },
    })

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        await form.handleSubmit()
        const hasErrors = Object.values(form.state.fieldMeta).some(
            meta => meta.errors.length > 0
        )
        if (hasErrors) {
            toast.error('Проверь правильность заполнения полей')
        }
    }

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <form.Field
                name='login'
                validators={{ onBlur: z.string().min(3) }}
            >
                {field => (
                    <NickField
                        value={field.state.value}
                        onChange={field.handleChange}
                        onBlur={field.handleBlur}
                        hasError={field.state.meta.errors.length > 0}
                    />
                )}
            </form.Field>

            <form.Field
                name='password'
                validators={{ onBlur: z.string().min(1) }}
            >
                {field => (
                    <PasswordField
                        value={field.state.value}
                        onChange={field.handleChange}
                        onBlur={field.handleBlur}
                        hasError={field.state.meta.errors.length > 0}
                    />
                )}
            </form.Field>

            <RememberRow checked={remember} onCheckedChange={setRemember} />
            <SubmitButton />
            <FormDivider />
            <OAuthButtons />
            <RegisterLink />
        </form>
    )
}

export default LoginForm
