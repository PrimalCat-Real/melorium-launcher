const KB = 1024
const MB = 1024 * KB
const GB = 1024 * MB

type ByteUnit = 'B' | 'KB' | 'MB' | 'GB'

function resolveUnit(bytes: number): ByteUnit {
    if (bytes >= GB) return 'GB'
    if (bytes >= MB) return 'MB'
    if (bytes >= KB) return 'KB'
    return 'B'
}

const DIVISOR: Record<ByteUnit, number> = { B: 1, KB, MB, GB }
const DECIMALS: Record<ByteUnit, number> = { B: 0, KB: 1, MB: 1, GB: 2 }

export function normalizeBytesForCounter(bytes: number): {
    value: number
    format: (val: number) => string
} {
    const unit = resolveUnit(bytes)
    const divisor = DIVISOR[unit]
    const decimals = DECIMALS[unit]
    return {
        value: bytes / divisor,
        format: (val) => `${val.toFixed(decimals)} ${unit}`,
    }
}
