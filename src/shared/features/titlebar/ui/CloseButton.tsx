'use client'
import { Button } from '@/modules/shadcn/components/ui/button';
import { cn } from '@/modules/shadcn/lib/utils';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { IoClose } from "react-icons/io5";

const CloseButton = ({ className }: { className?: string }) => {
    const close = async () => {
        const appWindow = getCurrentWindow();
        await appWindow.close();
    };
    return (
        <Button className={cn(className, '')} onClick={close} size={'icon'} variant={'ghost'}>
            <IoClose />
        </Button>
    )
}

export default CloseButton