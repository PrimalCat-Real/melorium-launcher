import React from 'react'
import AppInitProvider from './AppInitProvider'

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <AppInitProvider>
            {children}
        </AppInitProvider>

    )
}

export default Providers