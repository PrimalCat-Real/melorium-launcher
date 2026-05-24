'use client'
import { useEffect, useState } from 'react'
import { invoke } from '@tauri-apps/api/core'

const useSystemMemoryMb = () => {
    const [memoryMb, setMemoryMb] = useState<number | null>(null)

    useEffect(() => {
        invoke<number>('get_system_memory_mb').then(setMemoryMb)
    }, [])

    return memoryMb
}

export default useSystemMemoryMb
