'use client'
import { PiCubeDuotone, PiGameController } from "react-icons/pi";
import { TbSettings2 } from "react-icons/tb";;
import { AiOutlineSkin } from "react-icons/ai";
import { useState, useRef, useEffect } from "react";
import SideBarItem from "./SideBarItem";
import SideBarSlidingItem from "./SideBarSlidingItem";
import { SlChemistry } from "react-icons/sl";
import { PiPaintBrush } from "react-icons/pi";
import type { IconType } from "react-icons";

export interface SideItem {
    id: string,
    icon: IconType,
    label: string,
    link: string
}

const items: SideItem[] = [
    { id: "play", icon: PiCubeDuotone, label: "Играть", link: "/" },
    { id: "settings", icon: TbSettings2, label: "Моды", link: "/mods" },
    { id: "cosmetic", icon: PiPaintBrush, label: "Кастомизация", link: "/cosmetic" },
    { id: "info", icon: SlChemistry, label: "Настройки", link: "/info" },
];

const SideBar = () => {
    const [activeId, setActiveId] = useState(items[0].id);
    const activeIndex = items.findIndex(item => item.id === activeId);
    const itemsRef = useRef<HTMLDivElement>(null);

    // TODO: itemHeight dynamic value
    return (
        <aside className="flex flex-col h-full w-18 items-center border-r muted-border py-4">
            <div ref={itemsRef} className="relative flex flex-col w-full items-center gap-1">

                <SideBarSlidingItem activeIndex={activeIndex} itemHeight={44} />
                {items.map(item => (
                    <SideBarItem
                        key={item.id}
                        {...item}
                        isActive={item.id === activeId}
                        iconSize={24}
                        className="w-12 h-12"
                        onClick={() => setActiveId(item.id)}
                    />
                ))}
            </div>
        </aside>
    );
};

export default SideBar;
