'use client'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/modules/shadcn/components/ui/button'
import { cn } from '@/modules/shadcn/lib/utils'
import type { SideItem } from './SideBar'

interface SideBarItemProps extends SideItem {
    className?: string
    iconSize?: number
    onClick?: () => void
}

const SideBarItem = ({ icon: Icon, label, link, className, iconSize, onClick }: SideBarItemProps) => {
    const pathname = usePathname()
    const router = useRouter()
    const isActive = pathname === link || pathname === `${link}/`

    return (
        <Button
            size='icon-none'
            variant="ghost"
            title={label}
            className={cn(
                "relative z-10 flex items-center justify-center p-0 transition-all duration-300 rounded-lg",
                !isActive && "text-primary",
                isActive && "bg-dim",
                className,
            )}
            onClick={() => {
                router.push(link)
                onClick?.()
            }}
        >
            <Icon style={{ width: iconSize, height: iconSize }} />
        </Button>
    )
}

export default SideBarItem
