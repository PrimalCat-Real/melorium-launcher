import GradientText from '@/modules/primalui/ui/components/text/GradientText'

const BrandText = () => {
    return (
        <GradientText
            render={<h1 />}
            className='font-manrope font-black uppercase tracking-tight text-sm from-primary via-primary to-glow'
        >
            Melorium
        </GradientText>
    )
}

export default BrandText