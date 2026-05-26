'use client'
import { Progress, ProgressIndicator, ProgressTrack } from '@/modules/animate-ui/primitives/base/progress'
import { cn } from '@/modules/shadcn/lib/utils'

type UpdateScreenProps = {
    version: string | null
    progress: number
}

const UpdateScreen = ({ version, progress }: UpdateScreenProps) => (
    <div className='bg-launcher fixed inset-0 z-50 flex flex-col items-center justify-center gap-8'>
        <div className='flex flex-col items-center gap-3'>
            <span className='font-sans text-2xl font-bold tracking-wide text-foreground'>
                Melorium Launcher
            </span>
            <div className='flex items-center gap-2 text-sm text-foreground/50'>
                <span className='h-3.5 w-3.5 shrink-0 animate-spin rounded-full border-2 border-foreground/20 border-t-foreground/60' />
                Устанавливается обновление{version ? ` ${version}` : ''}
            </div>
        </div>

        <div className='flex w-64 flex-col gap-2'>
            <Progress value={Math.max(4, progress)}>
                <ProgressTrack className='h-1.5 rounded-full bg-white/10'>
                    <ProgressIndicator className={cn(
                        'h-full rounded-full',
                        'bg-linear-to-r from-accent to-primary shadow-progress-fill',
                        progress === 0 && 'animate-pulse',
                    )} />
                </ProgressTrack>
            </Progress>
            <span className='text-center text-xs text-foreground/40'>
                {progress > 0 ? `${progress}%` : 'Подготовка'}
            </span>
        </div>
    </div>
)

export default UpdateScreen
