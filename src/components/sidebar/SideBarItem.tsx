'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import type { SideItem } from './SideBar'
import { Button } from '@/modules/shadcn/components/ui/button'
import { cn } from '@/modules/shadcn/lib/utils'
import { usePathname } from 'next/navigation'


interface SideBarItemProps extends SideItem {
    className?: string,
    isActive?: boolean,
    iconSize?: number,
    onClick?: () => void,
}

const SideBarItem = ({ icon: Icon, label, link, className, iconSize, onClick }: SideBarItemProps) => {

    const pathname = usePathname();
    const [isActive, setActive] = useState<boolean>(false)

    useEffect(() => {
        setActive(pathname === link)
    }, [pathname, link])
    return (
        <Link href={link} onClick={onClick} title={label}>
            <Button
                size='icon-xl'
                variant="ghost"
                className={cn("relative z-10 flex items-center justify-center p-0 transition-all duration-300 rounded-lg", !isActive && "text-primary", isActive && "bg-dim", className)}
            >
                <Icon size={iconSize} />
            </Button>
        </Link>
    )
}

export default SideBarItem