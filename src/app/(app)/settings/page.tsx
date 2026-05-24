import MemorySection from "@/components/settings/MemorySection"


const SettingsPage = () => (
    <div className='flex-1 flex flex-col h-full p-4 gap-8 overflow-y-auto'>
        <h1 className='text-xl font-bold'>Настройки</h1>
        {/* <MemorySection /> */}
        <MemorySection></MemorySection>
    </div>
)

export default SettingsPage
