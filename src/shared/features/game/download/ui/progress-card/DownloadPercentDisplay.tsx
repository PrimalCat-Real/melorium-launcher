import Counter from '@/modules/animate-ui/components/text/counter'
import { cn } from '@/modules/shadcn/lib/utils'

interface DownloadPercentDisplayProps {
    percent: number
    eta: string | null
    speed: string | null
}

const badgeClass = cn(
    'tabular-nums font-mono text-[10px] font-bold',
    'text-primary bg-primary/10 border border-primary/30',
    'px-2 py-1 rounded-md leading-none',
)

const DownloadPercentDisplay = ({ percent, eta, speed }: DownloadPercentDisplayProps) => {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-0.5">
                <Counter
                    className={cn(
                        'text-4xl font-black leading-none tracking-[-0.04em] tabular-nums',
                        'bg-linear-to-b from-foreground to-blade bg-clip-text text-transparent',
                    )}
                    format={(value) => String(Math.round(value))}
                    targetValue={Math.round(percent)}
                />
                <span className={cn(
                    'text-2xl font-black',
                    'bg-linear-to-b from-white/70 to-blade/60 bg-clip-text text-transparent',
                )}>%</span>
            </div>
            <div className="flex flex-col items-end gap-1.5">
                {eta && <span className={badgeClass}>~ {eta}</span>}
                {speed && <span className={badgeClass}>{speed}</span>}
            </div>
        </div>
    )
}

export default DownloadPercentDisplay
