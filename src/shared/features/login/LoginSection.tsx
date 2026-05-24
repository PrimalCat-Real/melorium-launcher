import LoginForm from './LoginForm'
import LoginHeader from './ui/LoginHeader'

const LoginSection = () => (
    <section className='flex h-full w-2/5 flex-col justify-center gap-8 pr-8'>
        <LoginHeader />
        <LoginForm />
    </section>
)

export default LoginSection
