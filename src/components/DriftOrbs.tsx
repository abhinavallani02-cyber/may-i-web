export function DriftOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block" aria-hidden="true">
      <div className="drift-a absolute top-[14%] right-[18%] h-16 w-16 rounded-2xl bg-acid shadow-[0_0_50px_rgba(210,255,0,0.35)]" />
      <div className="drift-b absolute top-[28%] left-[8%] flex h-14 w-14 items-center justify-center rounded-full bg-[#141414] ring-1 ring-white/12">
        <span className="text-[11px] font-bold tracking-widest text-white/70">MIT</span>
      </div>
      <div className="drift-a absolute top-[18%] left-[22%] h-10 w-10 rounded-full bg-cyan/90" />
      <div className="drift-b absolute right-[10%] bottom-[32%] h-12 w-12 rounded-full bg-[#141414] ring-1 ring-white/12">
        <span className="flex h-full items-center justify-center text-[10px] font-bold text-magenta">
          ASK
        </span>
      </div>
      <div className="drift-a absolute bottom-[22%] left-[14%] h-9 w-9 rounded-md bg-[#2563ff]" />
      <div className="spin-slow absolute top-[42%] right-[8%] h-20 w-20 rounded-full border border-dashed border-white/15" />
    </div>
  )
}
