import { ArrowRight } from 'lucide-react'
import { Reveal } from './Reveal'
import { Badge } from './Badge'
import { HeroLaptop } from './HeroLaptop'

const VERDICTS = ['/ ALLOW', '/ DENY', '/ ASK']

// Phase boundaries as a fraction of scroll progress through the whole
// hero range -- Kage-style staged reveal instead of one flat fade-in.
const TEXT_SETTLE = 0.35
const LAPTOP_START = 0.15
const LAPTOP_SETTLE = 0.55

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n))
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

interface SectionOneProps {
  scrollProgress?: number
}

/**
 * The hero. Taller than one viewport (see the wrapper in App.tsx) so there
 * is real scroll distance to play a staged reveal across, the way Kage
 * paces its own chapters against scroll position rather than a single
 * enter/exit flag. Content is pinned via `sticky` while scrollProgress
 * (0-1, measured across the whole hero range) drives text settle, the
 * laptop's entrance, and a small progress readout in the corner.
 */
export function SectionOne({ scrollProgress = 0 }: SectionOneProps) {
  // Text is visible from the first frame (Kage's own hero copy is never
  // hidden on load) -- progress only nudges it the rest of the way to its
  // settled position, it doesn't gate visibility.
  const textT = Math.max(0.55, clamp01(scrollProgress / TEXT_SETTLE))
  const laptopT = Math.max(0.4, clamp01((scrollProgress - LAPTOP_START) / (LAPTOP_SETTLE - LAPTOP_START)))
  const percent = Math.round(scrollProgress * 100)

  return (
    <section id="hero" className="relative" style={{ height: '220vh' }}>
      <div className="sticky top-0 flex min-h-screen min-h-[100svh] flex-col justify-center gap-10 overflow-hidden px-5 pt-32 pb-16 sm:px-8 sm:pt-36 md:px-12">
        {/* Top row */}
        <div
          className="flex flex-col gap-8 sm:flex-row sm:justify-between"
          style={{
            opacity: lerp(0, 1, textT),
            transform: `translateY(${lerp(16, 0, textT)}px)`,
          }}
        >
          <div className="flex flex-col gap-2">
            {VERDICTS.map((verdict, i) => (
              <Reveal key={verdict} delay={150 + i * 120}>
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-white/90 drop-shadow-md">
                  {verdict}
                </span>
              </Reveal>
            ))}
          </div>

          <Reveal delay={300} className="max-w-md sm:text-right">
            <p className="text-xl leading-relaxed text-white drop-shadow-md sm:text-2xl">
              may-i sits between an AI agent and the tools it can reach. Every action is checked
              against a policy file and either allowed, blocked, or paused for your approval.
              Every decision is logged.
            </p>
          </Reveal>
        </div>

        {/* Headline + CTAs frame the laptop, rather than repeating what's on its screen */}
        <div
          className="text-center"
          style={{
            opacity: lerp(0, 1, textT),
            transform: `translateY(${lerp(24, 0, textT)}px)`,
          }}
        >
          <Reveal delay={150}>
            <Badge className="mb-6 text-xs">A permission layer for AI agents</Badge>
          </Reveal>

          <Reveal delay={280}>
            <h1 className="text-6xl leading-[1.02] font-normal tracking-tight text-white drop-shadow-lg sm:text-7xl lg:text-8xl">
              Ask before it acts.
            </h1>
          </Reveal>

          <Reveal delay={460} className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#quickstart"
              className="flex items-center gap-1.5 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors duration-300 hover:bg-white/85"
            >
              Get started
              <ArrowRight size={16} />
            </a>
            <a
              href="https://github.com/abhinavallani02-cyber/mayI"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/20"
            >
              View on GitHub
            </a>
          </Reveal>
        </div>

        <div
          style={{
            opacity: lerp(0, 1, laptopT),
            transform: `translateY(${lerp(60, 0, laptopT)}px) scale(${lerp(0.94, 1, laptopT)})`,
          }}
        >
          <HeroLaptop />
        </div>

        {/* Scroll progress readout, Kage-style corner cue */}
        <div className="pointer-events-none absolute bottom-6 right-5 flex items-center gap-2 font-mono text-[11px] text-white/40 sm:right-8 md:right-12">
          <span className="h-px w-8 bg-white/25" />
          {String(percent).padStart(2, '0')}%
        </div>
      </div>
    </section>
  )
}
