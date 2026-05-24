import { motion } from 'framer-motion'
import {
    Progress,
    ProgressIndicator,
    ProgressTrack,
} from '@/modules/animate-ui/primitives/base/progress'
import { cn } from '@/modules/shadcn/lib/utils'

interface DownloadProgressBarProps {
    percent: number
    shimmer?: boolean
}

const DownloadProgressBar = ({ percent, shimmer }: DownloadProgressBarProps) => (
    <Progress value={percent}>
        <ProgressTrack className="relative h-1 w-full overflow-hidden rounded-full bg-blade/15">
            <ProgressIndicator
                className={cn(
                    'h-full rounded-full',
                    'bg-linear-to-r from-accent to-primary',
                    'shadow-progress-fill',
                )}
            />
            {shimmer && (
                <motion.div
                    className="absolute inset-0 pointer-events-none shimmer-overlay"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
                />
            )}
        </ProgressTrack>
    </Progress>
)

export default DownloadProgressBar
