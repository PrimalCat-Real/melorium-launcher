const UNITS = ['B', 'KB', 'MB', 'GB', 'TB'] as const

export function formatBytes(bytes: number, decimals = 2): string {
    if (bytes === 0) return '0 B'
    const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), UNITS.length - 1)
    return `${(bytes / 1024 ** exponent).toFixed(decimals)} ${UNITS[exponent]}`
}

export function formatSpeed(bytesPerSecond: number): string {
    return `${formatBytes(bytesPerSecond)}/s`
}
