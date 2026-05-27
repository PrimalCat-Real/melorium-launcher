'use client'
import { usePathname, useRouter } from 'next/navigation'
import { type ReactNode, useEffect, useState } from 'react'
import { useAuthStore } from '@/store/useAuthStore'

const AuthGuardProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter()
    const pathname = usePathname()
    const authStatus = useAuthStore((state) => state.authStatus)
    const [hydrated, setHydrated] = useState(false)

    useEffect(() => {
        if (useAuthStore.persist.hasHydrated()) {
            setHydrated(true)
        } else {
            const unsub = useAuthStore.persist.onFinishHydration(() => setHydrated(true))
            return unsub
        }
    }, [])

    useEffect(() => {
        if (!hydrated) return
        if (pathname === '/login') return
        if (authStatus !== 'authenticated') {
            router.replace('/login')
        }
    }, [hydrated, authStatus, pathname, router])

    return <>{children}</>
}

export default AuthGuardProvider
