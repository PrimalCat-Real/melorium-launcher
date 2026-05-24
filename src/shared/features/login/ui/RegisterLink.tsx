import { Button } from '@/modules/shadcn/components/ui/button'

const RegisterLink = () => (
    <p className='text-center text-sm text-muted-foreground'>
        Ещё нет аккаунта?{' '}
        <Button
            type='button'
            variant='link'
            className='h-auto p-0 text-sm text-primary'
        >
            Создать
        </Button>
    </p>
)

export default RegisterLink
