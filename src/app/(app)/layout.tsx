import type { ReactNode } from 'react'
import Titlebar from '@/components/titlebar/Titlebar'
import SideBar from '@/components/sidebar/SideBar'

export default function AppLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Titlebar />
            <main className="flex h-full w-full">
                <SideBar />
                {children}
            </main>
        </>
    )
}
