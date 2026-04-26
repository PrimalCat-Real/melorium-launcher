import BentoDots from '@/shared/features/bento/BentoDots'
import BentoMaskCell from '@/shared/features/bento/BentoMaskCell'
import BentoMaskGrid from '@/shared/features/bento/BentoMaskGrid'
import BentoTitle from '@/shared/features/bento/BentoTitle'

const LoginPage = () => {
    return (
        <div className='flex h-full w-full justify-between items-center pb-4 px-4 pt-4'>
            <section className='w-1/2 relative h-full overflow-hidden bg-black rounded-2xl'>
                <BentoMaskGrid
                    imageSrc='/assets/sword_girl.png'
                    imageAlt='sword girl'
                    imagePosition='16%_center'
                >
                    {/* row 1 */}
                    <BentoMaskCell />
                    <BentoMaskCell />
                    <BentoMaskCell />
                    <BentoMaskCell />
                    {/* row 2 */}
                    <BentoMaskCell />
                    <BentoMaskCell><BentoDots /></BentoMaskCell>
                    <BentoMaskCell />
                    <BentoMaskCell />
                    {/* row 3 */}
                    <BentoMaskCell />
                    <BentoMaskCell />
                    <BentoMaskCell><BentoTitle title='Скоро' /></BentoMaskCell>
                    <BentoMaskCell />
                    {/* row 4 */}
                    <BentoMaskCell />
                    <BentoMaskCell />
                    <BentoMaskCell />
                    <BentoMaskCell />
                    {/* row 5 */}
                    <BentoMaskCell />
                    <BentoMaskCell />
                    <BentoMaskCell />
                    <BentoMaskCell />
                </BentoMaskGrid>
            </section>
            <section className='w-auto h-full flex flex-col gap-2'>
                <span className='font-manrope uppercase'>Login</span>
                <h2>Добро пожаловать</h2>
                <p>Войди, чтобы продолжить играть на сервере Melorium RP</p>
                <form action=''></form>
            </section>
        </div>
    )
}

export default LoginPage
