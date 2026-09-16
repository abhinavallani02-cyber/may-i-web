import { useEffect, useRef } from 'react'
import * as AsciinemaPlayer from 'asciinema-player'
import { animate, scroll } from 'motion'
import { CAST_URL } from '../lib/site'

/**
 * Product focal: a laptop whose screen is a real recorded may-i session.
 * Scroll-linked rotation is compositor-only and skipped for reduced motion.
 */
export function HeroLaptop() {
  const terminalRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!terminalRef.current) return
    const player = AsciinemaPlayer.create(CAST_URL, terminalRef.current, {
      autoPlay: true,
      preload: true,
      loop: true,
      theme: 'monokai',
      fit: 'width',
      controls: false,
      terminalFontSize: '12px',
    })
    return () => player.dispose()
  }, [])

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      frame.style.transform = 'perspective(1600px) rotateY(0deg) rotateX(0deg) scale(1)'
      return
    }

    const hero = document.getElementById('hero')
    if (!hero) return

    const stop = scroll(
      animate(
        frame,
        {
          transform: [
            'perspective(1600px) rotateY(-22deg) rotateX(10deg) scale(0.9)',
            'perspective(1600px) rotateY(0deg) rotateX(0deg) scale(1)',
          ],
        },
        { ease: 'linear' },
      ),
      {
        target: hero,
        offset: ['start start', 'end start'],
      },
    )
    return () => stop()
  }, [])

  return (
    <div className="w-full" style={{ perspective: '1600px' }}>
      <div ref={frameRef} className="hero-laptop-frame origin-bottom will-change-transform">
        <div className="rounded-t-2xl border border-b-0 border-acid/25 bg-[#111] p-2.5 shadow-[0_0_80px_rgba(210,255,0,0.16),0_40px_80px_rgba(0,0,0,0.55)] sm:p-3">
          <div className="mx-auto mb-2 h-1.5 w-1.5 rounded-full bg-acid/70" />
          <div className="overflow-hidden rounded-lg border border-white/10 bg-black">
            <div className="flex items-center gap-1.5 border-b border-white/8 bg-white/[0.04] px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-white/18" />
              <span className="h-2 w-2 rounded-full bg-white/18" />
              <span className="h-2 w-2 rounded-full bg-white/18" />
              <span className="ml-2 font-mono text-[10px] text-white/40">mayi — approval</span>
            </div>
            <div className="hero-terminal relative h-[220px] overflow-hidden bg-black sm:h-[280px] lg:h-[340px] xl:h-[380px]">
              <div
                ref={terminalRef}
                className="absolute top-0 left-0 w-[124%] origin-top-left text-[10px]"
              />
            </div>
          </div>
        </div>
        <div className="mx-auto h-2.5 w-full rounded-b-xl bg-gradient-to-b from-white/20 to-white/5" />
        <div className="mx-auto h-1 w-[24%] rounded-b-md bg-acid/30" />
      </div>
    </div>
  )
}
