import BentoSection from '@/shared/features/bento/BentoSection'
import LoginSection from '@/shared/features/login/LoginSection'

const LoginPage = () => (
    <div className='flex h-full w-full items-center justify-between px-4 py-4 gap-6'>
        <BentoSection />
        <LoginSection />
    </div>
)

export default LoginPage
