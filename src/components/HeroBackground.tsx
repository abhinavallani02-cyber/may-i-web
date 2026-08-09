import { useEffect, useRef } from 'react'

const PARTICLE_COUNT = 70
const MAX_RADIUS = 1.6
const DRIFT_SPEED = 0.06

interface Particle {
  x: number
  y: number
  radius: number
  baseOpacity: number
  driftX: number
  driftY: number
  phase: number
}

function createParticles(width: number, height: number): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * MAX_RADIUS + 0.4,
    baseOpacity: Math.random() * 0.35 + 0.15,
    driftX: (Math.random() - 0.5) * DRIFT_SPEED,
    driftY: (Math.random() - 0.5) * DRIFT_SPEED,
    phase: Math.random() * Math.PI * 2,
  }))
}

/**
 * Lightweight animated backdrop for a pure-black hero: a slow field of
 * drifting, gently pulsing white particles on canvas. No video, no
 * decoding, no seek latency -- just a cheap per-frame canvas draw.
 */
export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    function resize() {
      if (!canvas || !container) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const width = container.clientWidth
      const height = container.clientHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      particlesRef.current = createParticles(width, height)
    }

    resize()
    window.addEventListener('resize', resize)

    let elapsed = 0
    function draw() {
      if (!canvas || !container) return
      const width = container.clientWidth
      const height = container.clientHeight
      ctx!.clearRect(0, 0, width, height)

      elapsed += 1
      for (const p of particlesRef.current) {
        p.x += p.driftX
        p.y += p.driftY
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        const pulse = Math.sin(elapsed * 0.01 + p.phase) * 0.15
        const opacity = Math.max(0, p.baseOpacity + pulse)

        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(255, 255, 255, ${opacity})`
        ctx!.fill()
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-black"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {/* Faint radial glow, purely CSS -- adds depth without a video */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0) 60%)',
        }}
      />
    </div>
  )
}
