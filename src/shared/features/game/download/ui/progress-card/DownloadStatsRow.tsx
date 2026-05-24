import { cn } from '@/modules/shadcn/lib/utils'

interface DownloadStatsRowProps {
    fileEvents: number
    downloadedBytes: number | null
    totalBytes: number | null
}

interface StatCellProps {
    label: string
    value: string
    highlight?: boolean
}

function formatMb(bytes: number): string {
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

const StatCell = ({ label, value, highlight }: StatCellProps) => (
    <div className={cn(
        'px-3 py-2 rounded-[10px] bg-black/55 border border-blade/18',
        highlight && 'border-emerald-500/30',
    )}>
        <p className="text-[9px] font-bold tracking-[0.18em] uppercase text-muted-foreground mb-1">{label}</p>
        <p className={cn('text-[13px] font-bold tabular-nums text-foreground', highlight && 'text-emerald-400')}>{value}</p>
    </div>
)

const DownloadStatsRow = ({ fileEvents, downloadedBytes, totalBytes }: DownloadStatsRowProps) => {
    const downloadedValue = downloadedBytes !== null ? formatMb(downloadedBytes) : '—'
    const totalValue = totalBytes !== null && totalBytes > 0 ? formatMb(totalBytes) : '—'
    const filesValue = fileEvents > 0 ? String(fileEvents) : '—'
    return (
        <div className="grid grid-cols-3 gap-2">
            <StatCell label="Скачано" value={downloadedValue} />
            <StatCell label="Всего" value={totalValue} />
            <StatCell label="Файлов" value={filesValue} highlight={fileEvents > 0} />
        </div>
    )
}

export default DownloadStatsRow
