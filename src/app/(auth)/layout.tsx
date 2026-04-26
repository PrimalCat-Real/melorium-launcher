import type { ReactNode } from 'react'
import Titlebar from '@/components/titlebar/Titlebar'

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Titlebar />
            <main className="flex flex-1 h-full w-full">
                {children}
            </main>
        </>
    )
}