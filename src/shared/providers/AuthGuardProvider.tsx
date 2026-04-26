'use client'
import { usePathname, useRouter } from 'next/navigation'
import { type ReactNode, useEffect } from 'react'
import { useAuthStore } from '@/store/useAuthStore'

const AuthGuardProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter()
    const pathname = usePathname()
    const { login, password } = useAuthStore()

    useEffect(() => {
        if (pathname === '/login') return
        if (!login || !password) {
            router.replace('/login')
        }
    }, [login, password, pathname, router])

    return (
        <>
            {children}
        </>
    )
}

export default AuthGuardProvider