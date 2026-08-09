import { useEffect, useRef, useState } from 'react'
import { MousePointer2, Check } from 'lucide-react'

const START = { top: '-34px', left: '-40px' }

// Phase boundaries, as a fraction of total scroll progress across the
// Hero + How-it-works span.
const CLICK_AT = 0.55
const TYPE_START = 0.62
const TYPE_END = 0.95

const CODE_LINES = [
  '$ mayi --policy policy.yaml -- npx -y @modelcontextprotocol/server-filesystem .',
  '[CONFIG] policy: policy.yaml',
  '[INSPECT] id=7 tool=write_file args={"path":"notes.md","content":"..."}',
  '[VERDICT] id=7 tool=write_file decision=ask→approved',
  'writing notes.md...',
  'done.',
]

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}
function clamp01(n: number) {
  return Math.min(1, Math.max(0, n))
}

/**
 * A fixed backdrop that plays a small story confined entirely to the
 * Hero section's scroll range: a cursor travels toward an "Allow"
 * button, clicks it, then the panel morphs into a terminal that types
 * out a real may-i session using the actual log line format from
 * mayi.mjs. Progress is measured against the DOM range from the top of
 * the page to the bottom of #hero-spacer (a dedicated spacer right after
 * Hero), so it never overlaps Problem/How-it-works/Demo copy -- it's
 * fully done and hidden before any of that scrolls into view.
 */
export function ClickThroughBackdrop() {
  const [progress, setProgress] = useState(0)
  const [visibleChars, setVisibleChars] = useState(0)
  const [buttonOffset, setButtonOffset] = useState<{ top: number; left: number } | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const allowButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    function onScroll() {
      // Measured against the spacer's bottom, not #hero's own bottom --
      // #hero is exactly one viewport tall on its own, so its bottom sits
      // at scrollY=0 and gives zero scroll room. The spacer directly
      // after it is what actually gives this animation somewhere to play
      // out before Problem begins.
      const spacer = document.getElementById('hero-spacer')
      if (!spacer) return
      const spacerBottom = spacer.getBoundingClientRect().bottom + window.scrollY
      const total = spacerBottom - window.innerHeight
      if (total <= 0) return
      setProgress(clamp01(window.scrollY / total))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Measure the real, rendered position of the Allow button relative to
  // the card, so the cursor lands exactly on it instead of a guessed
  // percentage that drifts with font size, padding, or content changes.
  // This component returns null whenever progress <= 0 (see below), so
  // on first mount -- before any scrolling -- cardRef/allowButtonRef are
  // both null and a mount-only effect would capture nothing, forever.
  // Depending on `progress` re-runs this after the card (and button)
  // actually exist in the DOM, once scrolling begins.
  useEffect(() => {
    function measure() {
      const card = cardRef.current
      const button = allowButtonRef.current
      if (!card || !button) return
      const cardRect = card.getBoundingClientRect()
      const buttonRect = button.getBoundingClientRect()
      setButtonOffset({
        top: buttonRect.top - cardRect.top + buttonRect.height / 2,
        left: buttonRect.left - cardRect.left + buttonRect.width / 2,
      })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [progress])

  const fullScript = CODE_LINES.join('\n')
  const typingProgress = clamp01((progress - TYPE_START) / (TYPE_END - TYPE_START))

  useEffect(() => {
    const target = Math.round(typingProgress * fullScript.length)
    setVisibleChars(target)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typingProgress])

  // Hidden entirely once we've scrolled past Hero (so it can never reach
  // Problem/How-it-works/Demo) or before the page has scrolled at all.
  if (progress <= 0 || progress >= 1) return null

  const clicked = progress >= CLICK_AT
  const typing = progress >= TYPE_START
  // Confined to Hero's own empty middle band now, so it doesn't need to
  // stay dim to avoid competing with body text -- full opacity except a
  // brief fade in/out at the very ends of the range.
  const cardOpacity = progress < 0.05 ? progress / 0.05 : progress > 0.97 ? (1 - progress) / 0.03 : 1

  const cursorTravel = clamp01(progress / CLICK_AT)
  const end = buttonOffset ?? { top: 60, left: 90 }
  const cursorTop = lerp(parseFloat(START.top), end.top, cursorTravel)
  const cursorLeft = lerp(parseFloat(START.left), end.left, cursorTravel)

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-[38%] z-[5] hidden justify-center md:flex"
      style={{ opacity: clamp01(cardOpacity) }}
      aria-hidden="true"
    >
      <div ref={cardRef} className="relative w-full max-w-[260px]">
        {!typing ? (
          <div
            className="flex flex-col gap-2.5 rounded-xl p-4"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.04) 100%)',
              backdropFilter: 'blur(20px) saturate(160%)',
              WebkitBackdropFilter: 'blur(20px) saturate(160%)',
              border: '1px solid rgba(255,255,255,0.25)',
              boxShadow:
                'inset 0 1px 1px rgba(255,255,255,0.3), inset 0 -1px 8px rgba(255,255,255,0.05), 0 8px 32px rgba(0,0,0,0.4)',
            }}
          >
            <div className="flex items-center justify-between font-mono text-[9px] text-white/50">
              <span>[ASK]</span>
              <span>id=7 write_file</span>
            </div>
            <p className="text-xs text-white/80">
              write_file(<span className="text-white">notes.md</span>) — approve?
            </p>
            <div className="mt-1.5 flex gap-2">
              <button
                ref={allowButtonRef}
                type="button"
                className={`relative flex-1 rounded-full px-3 py-1.5 text-xs font-medium text-black transition-transform duration-150 ${
                  clicked ? 'scale-95 bg-white' : 'bg-white'
                }`}
              >
                {clicked ? (
                  <span className="flex items-center justify-center gap-1">
                    <Check size={12} /> Allowed
                  </span>
                ) : (
                  'Allow'
                )}
              </button>
              <button
                type="button"
                className="flex-1 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs text-white"
              >
                Deny
              </button>
            </div>
          </div>
        ) : (
          <div
            className="rounded-xl p-4 font-mono text-[10px] leading-relaxed text-white/80"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)',
              backdropFilter: 'blur(20px) saturate(160%)',
              WebkitBackdropFilter: 'blur(20px) saturate(160%)',
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow:
                'inset 0 1px 1px rgba(255,255,255,0.25), 0 8px 32px rgba(0,0,0,0.4)',
            }}
          >
            <pre className="whitespace-pre-wrap">
              {fullScript.slice(0, visibleChars)}
              <span className="animate-pulse text-white">▍</span>
            </pre>
          </div>
        )}

        {!typing && (
          <div
            className="pointer-events-none absolute -translate-x-[15%] -translate-y-[15%] transition-transform duration-150"
            style={{ top: `${cursorTop}px`, left: `${cursorLeft}px` }}
          >
            <MousePointer2
              size={26}
              className={`text-white drop-shadow-lg transition-transform duration-150 ${clicked ? 'scale-90' : 'scale-100'}`}
              fill={clicked ? 'white' : 'none'}
            />
          </div>
        )}
      </div>
    </div>
  )
}
