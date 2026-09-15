import { useEffect, useRef } from 'react'
import * as AsciinemaPlayer from 'asciinema-player'
import { animate, scroll } from 'motion'
import { CAST_URL } from '../lib/site'

/**
 * Large product mockup whose screen is a real recorded may-i session.
 * Scroll-linked tilt is applied on the compositor via Motion, and skipped
 * when the user prefers reduced motion.
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
      frame.style.transform = 'perspective(1600px) rotateX(0deg) scale(1)'
      return
    }

    const hero = document.getElementById('hero')
    if (!hero) return

    const stop = scroll(
      animate(
        frame,
        {
          transform: [
            'perspective(1600px) rotateX(16deg) scale(0.94) translateY(28px)',
            'perspective(1600px) rotateX(0deg) scale(1) translateY(0px)',
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
        <div className="rounded-t-2xl border border-b-0 border-white/20 bg-[#111] p-2.5 shadow-[0_40px_100px_rgba(8,40,70,0.35)] sm:p-3">
          <div className="mx-auto mb-2 h-1.5 w-1.5 rounded-full bg-white/20" />
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
        <div className="mx-auto h-2.5 w-[106%] -translate-x-[3%] rounded-b-xl bg-gradient-to-b from-white/30 to-white/10" />
        <div className="mx-auto h-1 w-[24%] rounded-b-md bg-white/20" />
      </div>
    </div>
  )
}
