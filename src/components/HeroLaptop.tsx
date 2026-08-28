import { useEffect, useRef } from 'react'
import * as AsciinemaPlayer from 'asciinema-player'
import 'asciinema-player/dist/bundle/asciinema-player.css'
import { animate, scroll } from 'motion'

const CAST_URL = '/demo.cast'

/**
 * The hero's right-hand visual: a laptop running the real recorded may-i
 * session -- the same demo.cast DemoSection plays, not a synthetic
 * animation, so the first thing on the page is the product actually
 * doing the thing.
 *
 * The laptop starts tilted back and slightly small, then straightens and
 * rises as the hero scrolls. That's driven by Motion's scroll() rather
 * than a scroll listener feeding React state: keeping the transform off
 * the render path means no re-render per scroll event, and the animation
 * is free to run on the compositor.
 */
export function HeroLaptop() {
  const terminalRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)

  // The recording is mounted once and left playing. It sits far enough up
  // the page to be visible immediately, so there's nothing to defer.
  useEffect(() => {
    if (!terminalRef.current) return
    const player = AsciinemaPlayer.create(CAST_URL, terminalRef.current, {
      autoPlay: true,
      preload: true,
      loop: true,
      theme: 'monokai',
      fit: 'width',
    })
    return () => player.dispose()
  }, [])

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return

    // Respect a reduced-motion preference: the laptop still renders, it
    // just sits at its settled position instead of moving under scroll.
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      frame.style.transform = 'perspective(1600px) rotateX(0deg) scale(1)'
      return
    }

    // Tracked against the hero section, not the laptop itself. The laptop
    // is already near the middle of the viewport on load, so an
    // entrance-based range ('start end' -> 'center center') is essentially
    // complete before the page has been scrolled at all -- it settles
    // within the first couple hundred pixels and the tilt is never really
    // seen. Measuring across the hero's own top-to-bottom travel gives the
    // transform the full section to play out over.
    const hero = document.getElementById('hero')
    if (!hero) return

    const stop = scroll(
      animate(
        frame,
        {
          transform: [
            'perspective(1600px) rotateX(18deg) scale(0.94)',
            'perspective(1600px) rotateX(0deg) scale(1)',
          ],
        },
        { ease: 'linear' }
      ),
      {
        target: hero,
        offset: ['start start', 'end start'],
      }
    )
    return () => stop()
  }, [])

  return (
    <div className="w-full" style={{ perspective: '1600px' }}>
      <div ref={frameRef} className="origin-bottom will-change-transform">
        {/* Lid */}
        <div className="rounded-t-xl border border-b-0 border-white/12 bg-[#0b0b0b] p-2.5 shadow-[0_40px_120px_rgba(0,0,0,0.7)]">
          {/* Camera */}
          <div className="mx-auto mb-2 h-1 w-1 rounded-full bg-white/15" />

          {/* Screen */}
          <div className="overflow-hidden rounded-md border border-white/10 bg-black">
            {/* Title bar */}
            <div className="flex items-center gap-1.5 border-b border-white/8 bg-white/[0.03] px-3 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
              <span className="ml-2 font-mono text-[9px] text-white/35">mayi — approval</span>
            </div>

            {/* The real recording. It was captured at a much wider terminal
                than this column, so fitting it whole would shrink the text
                past legibility and leave most of the screen as unused black
                rows. Instead the player is scaled up and the overflow
                clipped, framing the active top-left region where the
                session actually happens. */}
            <div className="relative h-[240px] overflow-hidden bg-black sm:h-[280px]">
              <div
                ref={terminalRef}
                className="absolute top-0 left-0 w-[122%] origin-top-left text-[10px]"
              />
            </div>
          </div>
        </div>

        {/* Base */}
        <div className="mx-auto h-2.5 w-[106%] -translate-x-[3%] rounded-b-lg bg-gradient-to-b from-white/12 to-white/[0.03] shadow-[0_18px_36px_rgba(0,0,0,0.6)]" />
        <div className="mx-auto h-0.5 w-[22%] rounded-b bg-white/8" />
      </div>
    </div>
  )
}
