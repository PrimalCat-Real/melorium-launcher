import React from 'react'

const AuthGuardProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            {children}
        </>
    )
}

export default AuthGuardProvider