import Counter from '@/modules/animate-ui/components/text/counter'
import { normalizeBytesForCounter } from '../../libs/formatBytes'

interface DownloadCounterDisplayProps {
    barType: string
    downloadedBytes: number | null
    fileEvents: number
}

const counterClass = 'font-mono text-[11px] font-bold tabular-nums text-primary/80'

const DownloadCounterDisplay = ({ barType, downloadedBytes, fileEvents }: DownloadCounterDisplayProps) => {
    if (barType === 'pack_download' && downloadedBytes !== null && downloadedBytes > 0) {
        const { value, format } = normalizeBytesForCounter(downloadedBytes)
        return (
            <div className="flex justify-end">
                <Counter
                    className={counterClass}
                    targetValue={value}
                    format={format}
                />
            </div>
        )
    }

    if (barType === 'pack_file_download' && fileEvents > 0) {
        return (
            <div className="flex justify-end">
                <Counter
                    className={counterClass}
                    targetValue={fileEvents}
                    format={(val) => String(Math.round(val))}
                />
            </div>
        )
    }

    return null
}

export default DownloadCounterDisplay
