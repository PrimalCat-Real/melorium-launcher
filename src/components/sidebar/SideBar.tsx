import CardGradientBorder from '@/modules/primalui/ui/components/cards/CardGradientBorder'
import React from 'react'

const SideBar = () => {
    return (
        // <CardGradientBorder
        //     from="var(--color-primary)"
        //     via="var(--color-primary)"
        //     to="var(--color-secondary)"
        //     className='h-full min-w-16 rounded-lg'
        //     render={<aside></aside>}>
        // </CardGradientBorder>
        <aside className='h-full bg-linear-150 from-primary/20 via-primary/10 to-secondary/10 min-w-16 rounded-lg border-2 border-border/15'>SideBar</aside>
    )
}

export default SideBar