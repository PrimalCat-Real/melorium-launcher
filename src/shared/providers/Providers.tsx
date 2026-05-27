import type React from 'react'
import { Toaster } from 'sonner'
import AppInitProvider from './AppInitProvider'
import AuthGuardProvider from './AuthGuardProvider'
import ModpackCheckProvider from './ModpackCheckProvider'

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <AppInitProvider>
            <ModpackCheckProvider>
                <AuthGuardProvider>
                    {children}
                </AuthGuardProvider>
            </ModpackCheckProvider>
            <Toaster theme="dark" position="bottom-right" richColors />
        </AppInitProvider>
    )
}

export default Providers
