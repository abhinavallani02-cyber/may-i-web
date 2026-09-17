import { useEffect, useRef } from 'react'
import { animate, scroll } from 'motion'

export function LimeMark({
  label = 'MAY-I',
  size = 200,
  scrollTargetId,
}: {
  label?: string
  size?: number
  scrollTargetId?: string
}) {
  const frameRef = useRef<HTMLDivElement>(null)
  const fontSize = Math.round(size * 0.2)

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      frame.style.transform = 'rotateX(-16deg) rotateY(18deg)'
      return
    }
    if (!scrollTargetId) return
    const target = document.getElementById(scrollTargetId)
    if (!target) return
    const stop = scroll(
      animate(
        frame,
        {
          transform: [
            'rotateX(-28deg) rotateY(-24deg) scale(0.92)',
            'rotateX(-12deg) rotateY(28deg) scale(1)',
          ],
        },
        { ease: 'linear' },
      ),
      { target, offset: ['start end', 'end start'] },
    )
    return () => stop()
  }, [scrollTargetId])

  return (
    <div className="relative" style={{ width: size, height: size, perspective: size * 4 }}>
      <div
        ref={frameRef}
        className="lime-mark-frame flex h-full w-full items-center justify-center rounded-[28px] bg-acid px-2 shadow-[0_0_90px_rgba(204,255,0,0.42)] will-change-transform"
        style={{ transform: 'rotateX(-16deg) rotateY(18deg)' }}
      >
        <span
          className="font-display text-center leading-none font-extrabold text-black uppercase"
          style={{ fontSize, letterSpacing: '0.04em' }}
        >
          {label}
        </span>
      </div>
    </div>
  )
}
