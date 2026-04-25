import PlayCard from '@/components/play/PlayCard'


export default function Home() {
  // const [status, setStatus] = useState("")





  return (
    <div className="flex-1 flex h-full p-4">
      <PlayCard></PlayCard>
      {/* <div className="flex-1 flex flex-col gap-6 py-4">
        <CardGradientBorder
          className="flex-1 rounded-[32px] relative overflow-hidden flex flex-col justify-end p-10 bg-[#0c0c0e]"
          from="var(--color-primary)"
          to="var(--color-secondary)"
          radius={32}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-transparent to-transparent" />

          <div className="relative z-10 flex flex-col gap-8">
            <h1 className="text-7xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary opacity-90">
              MELORIUM
            </h1>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={handleDownload}
                className="flex items-center justify-center gap-3 px-10 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all active:scale-[0.98]"
              >
                <HugeiconsIcon icon={CloudIcon} size={20} />
                Скачать
              </button>

              <button
                type="button"
                onClick={handlePlay}
                className="flex items-center justify-center gap-3 px-12 py-4 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-black text-lg shadow-2xl shadow-primary/40 hover:scale-[1.03] transition-transform active:scale-[0.98]"
              >
                <HugeiconsIcon icon={PlayIcon} size={24} />
                Играть
              </button>
            </div>
            {status && (
              <span className="text-sm font-bold text-foreground/60">{status}</span>
            )}
          </div>
        </CardGradientBorder>
      </div> */}

    </div>
  );
}
