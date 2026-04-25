'use client'
import { Button } from '@/modules/shadcn/components/ui/button';
import { cn } from '@/modules/shadcn/lib/utils';
import { getCurrentWindow } from '@tauri-apps/api/window';
import React from 'react'
import { FiMinus } from "react-icons/fi";

const MinimizaButton = ({ className }: { className?: string }) => {
    // if (typeof window !== 'undefined') return
    const minimize = async () => {
        const appWindow = getCurrentWindow();
        await appWindow.minimize();
    };
    return (
        <Button className={cn(className, '')} onClick={minimize} size={'icon'} variant={'ghost'}>
            <FiMinus />
        </Button>
    )
}

export default MinimizaButton