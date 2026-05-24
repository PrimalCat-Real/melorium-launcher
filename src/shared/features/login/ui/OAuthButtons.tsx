import { BsDiscord } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'
import { cn } from '@/modules/shadcn/lib/utils'
import { Button } from '@/modules/shadcn/components/ui/button'

const OAuthButtons = () => (
    <div className='grid grid-cols-2 gap-4'>
        <Button type='button' variant='outline' size='lg' className='gap-2 h-10'>
            <FcGoogle size={16} />
            Google
        </Button>
        <Button
            type='button'
            variant='outline'
            size='lg'
            className={cn('gap-2 h-10', 'text-[#5865F2]')}
        >
            <BsDiscord size={16} />
            Discord
        </Button>
    </div>
)

export default OAuthButtons
