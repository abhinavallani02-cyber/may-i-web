import { useEffect, useRef } from 'react'
import * as AsciinemaPlayer from 'asciinema-player'
import { animate, scroll } from 'motion'
import { CAST_URL } from '../lib/site'

/**
 * Codex-style glowing device: lime bezel, live may-i recording on the screen.
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
      frame.style.transform = 'perspective(1400px) rotateY(12deg) rotateX(-8deg)'
      return
    }
    const hero = document.getElementById('hero')
    if (!hero) return
    const stop = scroll(
      animate(
        frame,
        {
          transform: [
            'perspective(1400px) rotateY(-18deg) rotateX(12deg) scale(0.92)',
            'perspective(1400px) rotateY(16deg) rotateX(-6deg) scale(1)',
          ],
        },
        { ease: 'linear' },
      ),
      { target: hero, offset: ['start start', 'end start'] },
    )
    return () => stop()
  }, [])

  return (
    <div className="w-full" style={{ perspective: '1400px' }}>
      <div ref={frameRef} className="hero-laptop-frame origin-center will-change-transform">
        <div className="rounded-[26px] bg-acid p-[3px] shadow-[0_0_80px_rgba(204,255,0,0.38),0_30px_80px_rgba(0,0,0,0.65)]">
          <div className="overflow-hidden rounded-[23px] bg-[#070707]">
            <div className="flex items-center gap-1.5 border-b border-white/8 bg-white/[0.03] px-3 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-acid" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
              <span className="ml-2 font-mono text-[10px] tracking-[0.14em] text-white/35 uppercase">
                mayi — approval
              </span>
            </div>
            <div className="hero-terminal relative h-[200px] overflow-hidden bg-black sm:h-[240px] lg:h-[280px]">
              <div
                ref={terminalRef}
                className="absolute top-0 left-0 w-[128%] origin-top-left text-[10px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
