import { useEffect, useRef } from 'react'

// Real log line shapes from mayi.mjs / the demo recording -- not filler
// text, so the drift reads as "this is what may-i actually watches"
// rather than generic decorative code.
const LOG_LINES = [
  '[CONFIG] policy: policy.yaml',
  '[INSPECT] id=3 tool=write_file args={"path":"/etc/hosts"}',
  '[VERDICT] id=3 tool=write_file decision=deny',
  '{"jsonrpc":"2.0","id":4,"method":"tools/call","params":{"name":"write_file"}}',
  '[ASK] id=4 tool=write_file — approve? (y/n)',
  '[VERDICT] id=4 tool=write_file decision=ask→approved',
  '[INSPECT] id=2 tool=read_text_file args={"path":"hello.txt"}',
  '[VERDICT] id=2 tool=read_text_file decision=allow',
  'Client does not support MCP Roots, using allowed directories from server args',
  '{"result":{"content":[{"type":"text","text":"hello from the sandbox"}]}}',
  'Secure MCP Filesystem Server running on stdio',
  '$ npx mayi-mcp -- npx -y @modelcontextprotocol/server-filesystem .',
]

const ROW_COUNT = 16
const SPEED = 0.16

interface Row {
  y: number
  x: number
  text: string
  opacity: number
  speed: number
}

function createRows(width: number, height: number): Row[] {
  return Array.from({ length: ROW_COUNT }, (_, i) => {
    const text = LOG_LINES[Math.floor(Math.random() * LOG_LINES.length)]
    return {
      y: (height / ROW_COUNT) * i + Math.random() * 20,
      x: Math.random() * width,
      text,
      opacity: Math.random() * 0.1 + 0.05,
      speed: SPEED * (0.6 + Math.random() * 0.8),
    }
  })
}

/**
 * Full-bleed generated backdrop for the hero: faint rows of real may-i log
 * lines drifting sideways in the dark, monospace, ghost-low-opacity --
 * built as a reference-inspired reinterpretation of the code-editor scenes
 * in the source video, not a replay of the clip itself. Reacts subtly to
 * scroll progress by nudging drift speed, so it deepens through the hero
 * the way Kage's own chapters do.
 */
export function HeroBackground({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const rowsRef = useRef<Row[]>([])
  const rafRef = useRef<number | null>(null)
  const progressRef = useRef(scrollProgress)
  progressRef.current = scrollProgress

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
      ctx!.font = '13px "JetBrains Mono", ui-monospace, monospace'
      rowsRef.current = createRows(width, height)
    }

    resize()
    window.addEventListener('resize', resize)

    function draw() {
      if (!canvas || !container) return
      const width = container.clientWidth
      const height = container.clientHeight
      ctx!.clearRect(0, 0, width, height)

      const speedMul = 1 + progressRef.current * 0.8
      for (const row of rowsRef.current) {
        row.x -= row.speed * speedMul
        const textWidth = ctx!.measureText(row.text).width
        if (row.x < -textWidth) {
          row.x = width + Math.random() * 200
          row.text = LOG_LINES[Math.floor(Math.random() * LOG_LINES.length)]
        }
        ctx!.fillStyle = `rgba(200, 220, 255, ${row.opacity})`
        ctx!.fillText(row.text, row.x, row.y)
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
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 30%, rgba(120,180,255,0.05) 0%, rgba(0,0,0,0) 60%), radial-gradient(ellipse at 50% 100%, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 55%)',
        }}
      />
    </div>
  )
}
