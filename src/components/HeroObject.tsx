import { useEffect, useRef } from 'react'

// A cube subdivided 3x3x3, drawn as isometric-projected faces. Kept as
// plain math rather than a 3D library: there are only 27 cells and three
// visible faces each, so a painter's-algorithm pass per frame is cheap
// and avoids shipping a WebGL runtime for one decorative object.
const N = 3
const CELL = 1 / N

interface Face {
  // Center in object space, used only for depth sorting.
  depth: number
  points: [number, number][]
  shade: number
}

function rotateY([x, y, z]: [number, number, number], a: number): [number, number, number] {
  return [x * Math.cos(a) + z * Math.sin(a), y, -x * Math.sin(a) + z * Math.cos(a)]
}
function rotateX([x, y, z]: [number, number, number], a: number): [number, number, number] {
  return [x, y * Math.cos(a) - z * Math.sin(a), y * Math.sin(a) + z * Math.cos(a)]
}

// Isometric-ish projection: no perspective divide, so the object reads as
// a solid form rather than a photographed one -- closer to a rendered
// product still than a game camera.
function project([x, y, z]: [number, number, number], scale: number): [number, number] {
  return [(x - z) * 0.866 * scale, (y + (x + z) * 0.5) * scale]
}

export function HeroObject() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0

    function resize() {
      if (!canvas || !container) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = container.clientWidth
      height = container.clientHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    // One interior cell is hollowed out. Kept to a single cell that is
    // never on the silhouette, so the form still reads as one solid
    // object -- removing edge or corner cells instead leaves fragments
    // that look like a rendering fault rather than a deliberate void.
    const voids = new Set(['1,1,1'])

    // Per-cell surface variation, fixed at mount so faces don't shimmer
    // frame to frame. Most cells are dark; a minority catch the light
    // hard, which is what gives the object its scattered-highlight look
    // instead of reading as a uniform grey block.
    const cellTone = new Map<string, number>()
    for (let x = 0; x < N; x++) {
      for (let y = 0; y < N; y++) {
        for (let z = 0; z < N; z++) {
          const roll = Math.random()
          cellTone.set(`${x},${y},${z}`, roll > 0.78 ? 1 : roll > 0.55 ? 0.5 : 0.16)
        }
      }
    }

    let t = 0
    function draw() {
      if (!canvas) return
      ctx!.clearRect(0, 0, width, height)

      t += 0.0022
      const angleY = t
      const angleX = 0.42 + Math.sin(t * 0.6) * 0.06

      const scale = Math.min(width, height) * 0.33
      const cx = width / 2
      const cy = height / 2

      const faces: Face[] = []

      for (let x = 0; x < N; x++) {
        for (let y = 0; y < N; y++) {
          for (let z = 0; z < N; z++) {
            const key = `${x},${y},${z}`
            if (voids.has(key)) continue
            const tone = cellTone.get(key) ?? 0.22

            // Cell corner in object space, centered on the origin. The
            // inset is applied around each cell's own center rather than
            // from its corner -- insetting from the corner shifts every
            // cell toward the origin, which pulls the outer cells inward
            // and leaves the silhouette ragged instead of flush.
            const s = CELL * 0.94
            const inset = (CELL - s) / 2
            const ox = x * CELL - 0.5 + inset
            const oy = y * CELL - 0.5 + inset
            const oz = z * CELL - 0.5 + inset

            // All six faces, each with its outward normal. Which ones are
            // actually visible changes as the cube turns, so they can't be
            // hardcoded -- picking a fixed three (as an earlier version
            // did) draws faces that should be hidden once rotation passes
            // 90 degrees, which tears holes in the silhouette.
            const faceDefs: {
              corners: [number, number, number][]
              normal: [number, number, number]
            }[] = [
              {
                corners: [
                  [ox, oy + s, oz],
                  [ox + s, oy + s, oz],
                  [ox + s, oy + s, oz + s],
                  [ox, oy + s, oz + s],
                ],
                normal: [0, 1, 0],
              },
              {
                corners: [
                  [ox, oy, oz],
                  [ox, oy, oz + s],
                  [ox + s, oy, oz + s],
                  [ox + s, oy, oz],
                ],
                normal: [0, -1, 0],
              },
              {
                corners: [
                  [ox, oy, oz],
                  [ox, oy + s, oz],
                  [ox, oy + s, oz + s],
                  [ox, oy, oz + s],
                ],
                normal: [-1, 0, 0],
              },
              {
                corners: [
                  [ox + s, oy, oz],
                  [ox + s, oy, oz + s],
                  [ox + s, oy + s, oz + s],
                  [ox + s, oy + s, oz],
                ],
                normal: [1, 0, 0],
              },
              {
                corners: [
                  [ox, oy, oz + s],
                  [ox + s, oy, oz + s],
                  [ox + s, oy + s, oz + s],
                  [ox, oy + s, oz + s],
                ],
                normal: [0, 0, 1],
              },
              {
                corners: [
                  [ox, oy, oz],
                  [ox, oy + s, oz],
                  [ox + s, oy + s, oz],
                  [ox + s, oy, oz],
                ],
                normal: [0, 0, -1],
              },
            ]

            for (const def of faceDefs) {
              const rotated = def.corners.map((c) => rotateX(rotateY(c, angleY), angleX))
              const n = rotateX(rotateY(def.normal, angleY), angleX)

              // Backface cull. The projection looks down -Z, so a face is
              // only visible when its rotated normal points toward the
              // viewer.
              if (n[2] >= 0) continue

              const points = rotated.map((r) => {
                const [px, py] = project(r, scale)
                return [cx + px, cy + py] as [number, number]
              })
              const depth = rotated.reduce((sum, r) => sum + r[2], 0) / rotated.length

              // Lambertian falloff against a fixed key light sitting up
              // and to the left, so the lighting stays put in world space
              // while the object turns under it.
              const L: [number, number, number] = [-0.42, 0.82, -0.39]
              const lambert = Math.max(0, n[0] * L[0] + n[1] * L[1] + n[2] * L[2])
              const light = 0.16 + lambert * 0.84

              faces.push({ depth, points, shade: light * tone })
            }
          }
        }
      }

      // Painter's algorithm: far faces first. The view direction is -Z, so
      // a larger z is farther away and must be drawn earlier.
      faces.sort((a, b) => b.depth - a.depth)

      for (const face of faces) {
        ctx!.beginPath()
        ctx!.moveTo(face.points[0][0], face.points[0][1])
        for (let i = 1; i < face.points.length; i++) {
          ctx!.lineTo(face.points[i][0], face.points[i][1])
        }
        ctx!.closePath()

        // Wide tonal range on purpose: the darkest cells sit just above
        // the black field while the lit ones come up near silver, so the
        // object reads as dark metal catching a hard source rather than a
        // uniform grey block. The curve is eased so mid tones stay dark
        // and only the top of the range brightens sharply.
        const v = Math.round(Math.pow(face.shade, 1.5) * 205 + 9)
        ctx!.fillStyle = `rgb(${v}, ${v}, ${v + 2})`
        ctx!.fill()
        ctx!.strokeStyle = 'rgba(255,255,255,0.07)'
        ctx!.lineWidth = 1
        ctx!.stroke()
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
    <div ref={containerRef} className="relative aspect-square w-full" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  )
}
