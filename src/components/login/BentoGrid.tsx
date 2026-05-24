import BentoDots from '@/shared/features/bento/BentoDots'
import BentoMaskCell from '@/shared/features/bento/BentoMaskCell'
import BentoMaskCellPastel from '@/shared/features/bento/BentoMaskCellPastel'
import BentoMaskCellSolid from '@/shared/features/bento/BentoMaskCellSolid'
import BentoMaskGrid from '@/shared/features/bento/BentoMaskGrid'

const BentoGrid = () => (
    <BentoMaskGrid>
        {/* row 0 — верх обрезается секцией */}
        <BentoMaskCell />
        <BentoMaskCell />
        <BentoMaskCell />
        <BentoMaskCell />

        {/* row 1 */}
        <BentoMaskCell>
            {/* <BentoDots /> */}
        </BentoMaskCell>
        <BentoMaskCell />
        <BentoMaskCellPastel>
            {/* <div className='absolute inset-0 z-10 flex items-end p-4'>
                <p className='font-bold text-lg leading-snug text-white'>
                    Строй<br />свою эпоху.
                </p>
            </div> */}
        </BentoMaskCellPastel>
        <BentoMaskCell />

        {/* row 2 */}
        <BentoMaskCellSolid colorClass='bg-primary'>
            {/* <div className='absolute inset-0 z-10 flex items-center justify-center'>
                <span className='text-5xl font-black text-primary-foreground'>M</span>
            </div> */}
        </BentoMaskCellSolid>
        <BentoMaskCellPastel>
            {/* <div className='absolute inset-0 z-10 flex flex-col justify-end p-4'>
                <span className='text-white/50 text-xl leading-none mb-2'>+</span>
                <p className='font-bold text-sm leading-tight text-white'>
                    12 фракций<br />один сервер
                </p>
            </div> */}
        </BentoMaskCellPastel>
        <BentoMaskCell />
        <BentoMaskCell />

        {/* row 3 */}
        <BentoMaskCell>
            {/* <div className='absolute inset-0 z-10 flex items-center justify-center'>
                <span className='text-2xl text-white/30'>+</span>
            </div> */}
        </BentoMaskCell>
        <BentoMaskCell />
        <BentoMaskCell />
        <BentoMaskCell />

        {/* row 4 — низ обрезается секцией */}
        <BentoMaskCell>
            {/* <div className='absolute inset-0 z-10 flex flex-col justify-end p-4'>
                <p className='font-semibold text-sm text-white'>
                    Сезон IV<br />«Эпоха Пустоты»
                </p>
            </div> */}
        </BentoMaskCell>
        <BentoMaskCell />
        <BentoMaskCell />
        <BentoMaskCell />
    </BentoMaskGrid>
)

export default BentoGrid
