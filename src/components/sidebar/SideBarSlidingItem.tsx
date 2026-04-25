import { motion } from "framer-motion";
import { cn } from "@/modules/shadcn/lib/utils";

interface SideBarSlidingItemProps {
    activeIndex: number;
    itemHeight: number;
    className?: string;
}

const SideBarSlidingItem = ({ activeIndex, itemHeight, className }: SideBarSlidingItemProps) => {
    return (
        <motion.div
            className={cn("absolute left-0 w-full pointer-events-none", className)}
            style={{ height: itemHeight }}
            animate={{ y: activeIndex * itemHeight }}
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
        >
            <div className={cn("h-1/2 translate-y-1/2 w-0.75 bg-border rounded-r-2xl rounded-l-md mx-1")} />
        </motion.div>
    );
};

export default SideBarSlidingItem;
