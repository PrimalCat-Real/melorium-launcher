import SettingsSection from '@/shared/features/settings/ui/SettingsSection'
import SettingsRow from '@/shared/features/settings/ui/SettingsRow'
import { Button } from '@/modules/shadcn/components/ui/button'

const ServiceSection = () => (
    <SettingsSection title='Сервис'>
        <SettingsRow
            label='Восстановить настройки'
            description='Сбросить все настройки до значений по умолчанию'
        >
            <Button variant='outline' size='sm'>Восстановить</Button>
        </SettingsRow>

        <SettingsRow
            label='Очистить кэш'
            description='Удалить временные файлы лаунчера'
        >
            <Button variant='outline' size='sm'>Очистить</Button>
        </SettingsRow>

        <SettingsRow
            label='Полный сброс'
            description='Удалить все данные лаунчера, включая профили и аккаунты'
        >
            <Button variant='destructive' size='sm'>Сбросить</Button>
        </SettingsRow>
    </SettingsSection>
)

export default ServiceSection
