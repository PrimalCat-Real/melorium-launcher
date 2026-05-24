'use client'
import { usePathname, useRouter } from 'next/navigation'
import { type ReactNode, useEffect } from 'react'
import { useAuthStore } from '@/store/useAuthStore'

const AuthGuardProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter()
    const pathname = usePathname()
    const authStatus = useAuthStore((state) => state.authStatus)

    useEffect(() => {
        if (pathname === '/login') return
        if (authStatus !== 'authenticated') {
            router.replace('/login')
        }
    }, [authStatus, pathname, router])

    return (
        <>
            {children}
        </>
    )
}

export default AuthGuardProvider