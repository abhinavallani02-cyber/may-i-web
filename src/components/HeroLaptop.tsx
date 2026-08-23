import { useEffect, useRef } from 'react'
import * as AsciinemaPlayer from 'asciinema-player'
import 'asciinema-player/dist/bundle/asciinema-player.css'
import { useReveal } from '../hooks/useReveal'

const CAST_URL = '/demo.cast'

/**
 * The hero centerpiece: a minimal floating laptop, Kage-style (a single
 * generated object composited over the scene rather than UI chrome). The
 * screen shows a miniature replica of this site's own hero above a live
 * terminal running the real recorded may-i session -- the actual demo.cast
 * used in DemoSection, not a synthetic animation.
 */
export function HeroLaptop() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { ref: revealRef, visible: inView } = useReveal<HTMLDivElement>()

  useEffect(() => {
    if (!inView || !containerRef.current) return
    const player = AsciinemaPlayer.create(CAST_URL, containerRef.current, {
      autoPlay: true,
      preload: true,
      loop: true,
      theme: 'monokai',
      fit: 'width',
    })
    return () => player.dispose()
  }, [inView])

  return (
    <div
      ref={revealRef}
      className="mx-auto mt-10 w-full max-w-[720px] transition-all duration-1000 ease-out"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.98)',
      }}
    >
      {/* Laptop bezel */}
      <div
        className="rounded-t-2xl border border-b-0 border-white/15 bg-[#0a0a0a] p-3 shadow-[0_40px_120px_rgba(0,0,0,0.6)]"
        style={{ backdropFilter: 'blur(6px)' }}
      >
        {/* Camera notch */}
        <div className="mx-auto mb-2 h-1.5 w-1.5 rounded-full bg-white/10" />

        {/* Screen */}
        <div className="overflow-hidden rounded-lg border border-white/10 bg-black">
          {/* Mini hero replica */}
          <div className="flex flex-col gap-3 px-5 pt-6 pb-4 sm:px-7 sm:pt-8">
            <span className="w-fit border-l-2 border-white bg-white/15 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.15em] text-white sm:text-[9px]">
              A permission layer for AI agents
            </span>
            <h3 className="text-xl leading-[1.05] font-normal tracking-tight text-white sm:text-3xl">
              Ask before
              <br />
              it acts.
            </h3>
            <div className="mt-1 flex items-center gap-1.5 rounded-md border border-white/15 bg-white/5 px-2.5 py-1.5 font-mono text-[9px] text-white/70 sm:text-[10px]">
              <span className="text-white/40">$</span>
              <span>npx mayi-mcp -- &lt;your mcp server&gt;</span>
            </div>
          </div>

          {/* Real terminal: the actual asciinema demo recording */}
          <div className="border-t border-white/10 bg-[#111] px-2 pt-2 pb-0">
            <div className="flex items-center gap-1.5 px-2 pb-2">
              <span className="h-2 w-2 rounded-full bg-white/20" />
              <span className="h-2 w-2 rounded-full bg-white/20" />
              <span className="h-2 w-2 rounded-full bg-white/20" />
              <span className="ml-2 font-mono text-[9px] text-white/40">mayi — demo</span>
            </div>
            <div ref={containerRef} className="overflow-hidden text-[11px]" />
          </div>
        </div>
      </div>

      {/* Base/hinge */}
      <div className="mx-auto h-3 w-[104%] max-w-[740px] -translate-x-[2%] rounded-b-xl bg-gradient-to-b from-white/15 to-white/5 shadow-[0_16px_30px_rgba(0,0,0,0.5)]" />
      <div className="mx-auto h-1 w-[30%] rounded-b-md bg-white/10" />
    </div>
  )
}
