import { useEffect, useRef } from 'react'
import * as AsciinemaPlayer from 'asciinema-player'
import { animate, scroll } from 'motion'
import { CAST_URL } from '../lib/site'

/**
 * Compact Codex-style glowing device: lime bezel, live may-i recording.
 * Sits on the first headline line like Codex’s cube — not a full-bleed laptop.
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
      terminalFontSize: '10px',
    })
    return () => player.dispose()
  }, [])

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      frame.style.transform = 'rotateX(-16deg) rotateY(18deg)'
      return
    }
    const hero = document.getElementById('hero')
    if (!hero) return
    const stop = scroll(
      animate(
        frame,
        {
          transform: [
            'rotateX(-28deg) rotateY(-22deg) scale(0.92)',
            'rotateX(-10deg) rotateY(26deg) scale(1)',
          ],
        },
        { ease: 'linear' },
      ),
      { target: hero, offset: ['start start', 'end start'] },
    )
    return () => stop()
  }, [])

  return (
    <div className="w-full" style={{ perspective: '1200px' }}>
      <div
        ref={frameRef}
        className="hero-laptop-frame origin-center will-change-transform"
        style={{ transform: 'rotateX(-16deg) rotateY(18deg)' }}
      >
        <div className="rounded-[28px] bg-acid p-[4px] shadow-[0_0_90px_rgba(204,255,0,0.5),0_24px_60px_rgba(0,0,0,0.55)]">
          <div className="overflow-hidden rounded-[24px] bg-[#070707]">
            <div className="flex items-center gap-1.5 border-b border-white/8 bg-white/[0.03] px-2.5 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-acid" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
              <span className="ml-1.5 font-mono text-[8px] tracking-[0.16em] text-white/40 uppercase">
                mayi
              </span>
            </div>
            <div className="hero-terminal relative h-[92px] overflow-hidden bg-black sm:h-[108px]">
              <div
                ref={terminalRef}
                className="absolute top-0 left-0 w-[160%] origin-top-left"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
