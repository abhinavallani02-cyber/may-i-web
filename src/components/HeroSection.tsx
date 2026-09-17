import { Hexagon, Shield, Lock, Zap } from 'lucide-react'
import { CopyCommand } from './CopyCommand'
import { Cta } from './Cta'
import { LimeCube } from './LimeCube'

const ORBS: { label?: string; className: string; fill?: string }[] = [
  { label: 'MIT', className: 'top-[18%] left-[14%] drift-a' },
  { className: 'top-[28%] left-[6%] drift-b', fill: 'bg-cyan' },
  { label: 'ASK', className: 'top-[52%] left-[8%] drift-a' },
  { className: 'top-[16%] right-[22%] drift-b', fill: 'bg-acid' },
  { className: 'top-[42%] right-[9%] drift-a', fill: 'bg-[#1a1a1a] ring-1 ring-white/15' },
  { label: 'YAML', className: 'bottom-[22%] left-[18%] drift-b' },
]

const BADGES = [
  { icon: Shield, label: 'MIT' },
  { icon: Lock, label: 'local-only' },
  { icon: Zap, label: 'fail-closed' },
]

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-[100svh] overflow-hidden bg-void">
      {ORBS.map((orb, i) => (
        <div
          key={i}
          className={`pointer-events-none absolute hidden h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full md:flex ${orb.className} ${
            orb.fill ? `${orb.fill} h-10 w-10 rounded-[10px]` : 'bg-[#1a1a1a] ring-1 ring-white/12'
          }`}
          aria-hidden="true"
        >
          {orb.label ? (
            <span className="text-[9px] font-bold tracking-[0.16em] text-white/70 uppercase">
              {orb.label}
            </span>
          ) : null}
        </div>
      ))}

      <div className="relative mx-auto flex min-h-[100svh] max-w-5xl flex-col items-center justify-center px-5 pt-24 pb-10 sm:px-8">
        <div className="relative w-full">
          <div className="pointer-events-none absolute top-0 left-1/2 z-0 -translate-x-1/2 -translate-y-[62%]">
            <LimeCube size={132} scrollTargetId="hero" />
          </div>
          <h1 className="font-display relative z-10 text-center text-[42px] leading-[0.92] font-bold tracking-[-0.045em] text-white uppercase sm:text-[60px] lg:text-[73px]">
            Ask before
            <br />
            it acts —
            <br />
            every tool call
            <br />
            hits a policy
          </h1>
        </div>

        <div className="relative z-10 mt-9 flex max-w-xl items-center gap-4">
          <div
            className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1a1a1a] ring-1 ring-white/12 sm:flex"
            aria-hidden="true"
          >
            <Hexagon size={16} className="text-acid" />
          </div>
          <p className="text-center text-[15px] leading-relaxed text-white/70 sm:text-left sm:text-[16px]">
            may-i sits between an AI agent and its tools. Every action is checked against a YAML
            policy — allowed, blocked, or paused for your approval.
          </p>
        </div>

        <div className="relative z-10 mt-7 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          {BADGES.map((badge) => (
            <span
              key={badge.label}
              className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] text-white/45 uppercase"
            >
              <badge.icon size={13} className="text-white/70" />
              {badge.label}
            </span>
          ))}
        </div>

        <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-3">
          <Cta href="#install" mark>
            Get started
          </Cta>
          <Cta href="#how-it-works" variant="ghost">
            Scroll to discover
          </Cta>
        </div>

        <div className="relative z-10 mt-6 w-full max-w-2xl">
          <CopyCommand id="install" />
        </div>
      </div>
    </section>
  )
}
