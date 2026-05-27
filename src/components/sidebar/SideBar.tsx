'use client'
import { useRef, useState } from "react";
import type { IconType } from "react-icons";
import { HiCog6Tooth } from "react-icons/hi2";
import { PiCubeDuotone, PiPaintBrush } from "react-icons/pi";
import { TbSettings2 } from "react-icons/tb";
import SideBarItem from "./SideBarItem";
import SideBarSlidingItem from "./SideBarSlidingItem";

export interface SideItem {
    id: string,
    icon: IconType,
    label: string,
    link: string
}

const items: SideItem[] = [
    { id: "play", icon: PiCubeDuotone, label: "Играть", link: "/" },
    { id: "mods", icon: TbSettings2, label: "Моды", link: "/mods" },
    { id: "cosmetic", icon: PiPaintBrush, label: "Кастомизация", link: "/cosmetic" },
    { id: "settings", icon: HiCog6Tooth, label: "Настройки", link: "/settings" },
];

const SideBar = () => {
    const [activeId, setActiveId] = useState(items[0].id);
    const activeIndex = items.findIndex(item => item.id === activeId);
    const itemsRef = useRef<HTMLDivElement>(null);

    // TODO: itemHeight dynamic value
    return (
        <aside className="flex flex-col h-full w-18 items-center border-r border-border/70 py-4 bg-linear-to-b from-dialog-bg-from/40 via-dialog-bg-via/20 to-dialog-bg-to/30">
            <div ref={itemsRef} className="relative flex flex-col w-full items-center gap-1">

                <SideBarSlidingItem activeIndex={activeIndex} itemHeight={44} />
                {items.map(item => (
                    <SideBarItem
                        key={item.id}
                        {...item}
                        iconSize={22}
                        className="w-12 h-12"
                        onClick={() => setActiveId(item.id)}
                    />
                ))}
            </div>
        </aside>
    );
};

export default SideBar;
