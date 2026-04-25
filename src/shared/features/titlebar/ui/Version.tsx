'use client'
import { useEffect, useState } from 'react'
import { getVersion } from "@tauri-apps/api/app";

const Version = () => {
    const [version, setVersion] = useState("");

    useEffect(() => {
        getVersion().then(setVersion);
    }, []);
    return (
        <span className='text-xs text-dim-foreground lowercase'>v{version} BETA</span>
    )
}

export default Version