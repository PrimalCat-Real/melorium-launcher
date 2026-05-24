import PlayCard from '@/components/play/PlayCard'

export default function Home() {
    return (
        <div className="flex-1 flex flex-col h-full p-4 gap-3">
            <PlayCard />
            <div className="flex-1 min-h-0 flex">
                <div className="w-1/3 h-full">
                </div>
            </div>
        </div>
    )
}
