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
  const fontSize = Math.round(size * 0.17)
  const radius = Math.round(size * 0.18)
  const extrude = Math.max(10, Math.round(size * 0.08))

  useEffect(() => {
    const cube = cubeRef.current
    if (!cube) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const rest = 'rotateX(-16deg) rotateY(22deg)'
    if (prefersReduced) {
      cube.style.transform = rest
      return
    }
    if (spin) return
    if (!scrollTargetId) return
    const target = document.getElementById(scrollTargetId)
    if (!target) return
    const stop = scroll(
      animate(
        cube,
        {
          transform: ['rotateX(-26deg) rotateY(-18deg)', 'rotateX(-10deg) rotateY(28deg)'],
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
        className={`lime-cube flex items-center justify-center ${spin ? 'cube-spin' : ''}`}
        style={{
          width: size,
          height: size,
          borderRadius: radius,
          background: 'linear-gradient(145deg, #f6ff9a 0%, #e5ff5d 42%, #d2ee4a 100%)',
          boxShadow: `${extrude}px ${extrude}px 0 #b8d030, 0 28px 50px rgba(0,0,0,0.32), 0 0 70px rgba(229,255,93,0.38)`,
        }}
      >
        <span
          className="font-display whitespace-nowrap font-bold text-black uppercase"
          style={{ fontSize, letterSpacing: '0.08em' }}
        >
          {label}
        </span>
      </div>
    </div>
  )
}
