import BrandText from '@/shared/features/brand/ui/BrandText'

const LoginHeader = () => (
    <div className='flex flex-col gap-2'>
        <BrandText />
        <h2 className='text-4xl font-bold'>С возвращением</h2>
        <p className='text-sm text-muted-foreground'>
            Войди, чтобы продолжить играть на сервере Melorium RP.
        </p>
    </div>
)

export default LoginHeader
