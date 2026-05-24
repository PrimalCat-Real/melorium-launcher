import { cn } from '@/modules/shadcn/lib/utils'
import { Button } from '@/modules/shadcn/components/ui/button'

const SubmitButton = () => (
    <Button
        type='submit'
        size='lg'
        className={cn(
            'w-full font-semibold',
            'bg-white text-black hover:bg-white/90',
            'h-10 rounded-lg'
        )}
    >
        Войти
    </Button>
)

export default SubmitButton
