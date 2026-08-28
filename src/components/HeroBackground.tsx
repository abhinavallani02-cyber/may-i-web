/**
 * The page backdrop: pure black with a soft diagonal light sweep and a
 * faint pool of light low and left, layered as CSS gradients. Deliberately
 * quiet -- the hero's serif headline and the rotating object carry the
 * page, so the background's job is to give them a field with some depth
 * rather than to compete for attention.
 */
export function HeroBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-black" aria-hidden="true">
      {/* Broad diagonal sweep, upper right */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(215deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.018) 24%, rgba(0,0,0,0) 52%)',
        }}
      />
      {/* Low pool of light, lower left -- the grazing highlight that keeps
          the lower half from going flat black */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 55% at 18% 88%, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0) 60%)',
        }}
      />
      {/* Vignette, so the edges fall off toward the frame */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)',
        }}
      />
    </div>
  )
}
