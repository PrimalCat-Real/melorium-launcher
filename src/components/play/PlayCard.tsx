

import Download from '@/shared/features/game/download/ui/Download'
import DownloadGroup from '@/shared/features/game/download/ui/DownloadGroup'
import Image from 'next/image'
import React from 'react'

const PlayCard = () => {
    return (
        <div className='relative w-full border border-border/70 h-1/2 rounded-2xl p-8 overflow-hidden shadow-banner'>
            <Image
                src="/assets/banner-violet-ruins.png"
                alt=""
                fill
                className="object-cover object-[center_42%]"
                priority
            />

            <div className="relative z-10">
                {/* <Download></Download> */}
                <DownloadGroup />
            </div>
        </div>
    )
}

export default PlayCard