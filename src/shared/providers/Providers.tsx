import React from 'react'
import AppInitProvider from './AppInitProvider'
import AuthGuardProvider from './AuthGuardProvider'

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <AppInitProvider>
            <AuthGuardProvider>
                {children}
            </AuthGuardProvider>
        </AppInitProvider>

    )
}

export default Providers