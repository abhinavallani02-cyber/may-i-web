import { useEffect, useRef } from 'react'
import { animate, scroll } from 'motion'

export function LimeCube({
  label = 'MAY-I',
  size = 180,
  scrollTargetId,
  spin = false,
}: {
  label?: string
  size?: number
  scrollTargetId?: string
  spin?: boolean
}) {
  const cubeRef = useRef<HTMLDivElement>(null)
  const half = size / 2
  const fontSize = Math.round(size * 0.16)

  useEffect(() => {
    const cube = cubeRef.current
    if (!cube) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      cube.style.transform = 'rotateX(-16deg) rotateY(22deg)'
      return
    }
    if (spin || !scrollTargetId) return
    const target = document.getElementById(scrollTargetId)
    if (!target) return
    const stop = scroll(
      animate(
        cube,
        {
          transform: [
            'rotateX(-28deg) rotateY(-24deg)',
            'rotateX(-12deg) rotateY(32deg)',
          ],
        },
        { ease: 'linear' },
      ),
      { target, offset: ['start end', 'end start'] },
    )
    return () => stop()
  }, [scrollTargetId, spin])

  return (
    <div className="lime-cube-scene" style={{ width: size, height: size }}>
      <div
        ref={cubeRef}
        className={`lime-cube lime-mark-frame ${spin ? 'cube-spin' : ''}`}
        style={{ width: size, height: size }}
      >
        <div
          className="lime-cube-face front"
          style={{ transform: `translateZ(${half}px)` }}
        >
          <span
            className="font-display whitespace-nowrap font-bold text-black uppercase"
            style={{ fontSize, letterSpacing: '0.08em' }}
          >
            {label}
          </span>
        </div>
        <div
          className="lime-cube-face top"
          style={{ transform: `rotateX(90deg) translateZ(${half}px)` }}
        />
        <div
          className="lime-cube-face right"
          style={{ transform: `rotateY(90deg) translateZ(${half}px)` }}
        />
      </div>
    </div>
  )
}
