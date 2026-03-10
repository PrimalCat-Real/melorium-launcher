import React from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import {
    CloudIcon,
    CrownIcon,
    PackageIcon,
    Activity01Icon,
    LockedIcon,
    ComputerVideoIcon,
    Add01Icon,
    FavouriteIcon
} from '@hugeicons/core-free-icons'
import { cn } from '@/modules/shadcn/lib/utils'

const SideBarItem = ({ icon, active = false }: { icon: any, active?: boolean }) => (
    <button type="button" className={cn(
        "p-3 rounded-lg transition-all duration-300 relative group",
        active ? "text-primary bg-primary/10 shadow-[0_0_15px_rgba(var(--primary),0.3)]" : "text-foreground/40 hover:text-foreground/70 hover:bg-white/5"
    )}>
        <HugeiconsIcon icon={icon} size={24} />
        {active && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />}
    </button>
)

const SideBar = () => {
    return (
        <aside className='h-full bg-linear-150 from-primary/10 via-white/5 to-secondary/10 min-w-[72px] flex flex-col items-center py-6 gap-6 rounded-2xl border-2 border-white/5 ring-1 ring-white/5 backdrop-blur-xl'>
            {/* Logo */}
            <div className="w-10 h-10 bg-linear-to-br from-primary to-secondary rounded-xl flex items-center justify-center p-2 mb-4 shadow-lg shadow-primary/20">
                <HugeiconsIcon icon={FavouriteIcon} className="text-white" size={24} />
            </div>

            {/* Navigation Items */}
            <nav className="flex flex-col gap-3 flex-1">
                <SideBarItem icon={CloudIcon} active />
                <SideBarItem icon={CrownIcon} />
                <SideBarItem icon={PackageIcon} />
                <SideBarItem icon={Activity01Icon} />
                <SideBarItem icon={LockedIcon} />
                <SideBarItem icon={ComputerVideoIcon} />
            </nav>

            {/* Bottom Actions */}
            <button type="button" className="p-3 rounded-xl border-2 border-dashed border-white/10 text-foreground/30 hover:text-foreground/60 hover:border-white/20 transition-all">
                <HugeiconsIcon icon={Add01Icon} size={20} />
            </button>
        </aside>
    )
}

export default SideBar
