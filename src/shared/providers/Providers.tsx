import React from 'react'
import { Toaster } from 'sonner'
import AppInitProvider from './AppInitProvider'
import AuthGuardProvider from './AuthGuardProvider'

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <AppInitProvider>
            <AuthGuardProvider>
                {children}
            </AuthGuardProvider>
            <Toaster theme="dark" position="bottom-right" richColors />
        </AppInitProvider>
    )
}

export default Providers