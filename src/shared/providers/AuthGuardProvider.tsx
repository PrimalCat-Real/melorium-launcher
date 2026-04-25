'use client'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { useAuthStore } from '@/store/useAuthStore'

const AuthGuardProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()
    const pathname = usePathname()
    const { authStatus } = useAuthStore()
    return (
        <>
            {children}
        </>
    )
}

export default AuthGuardProvider