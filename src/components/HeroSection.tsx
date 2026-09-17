import { Hexagon, Shield, Lock } from 'lucide-react'
import { CopyCommand } from './CopyCommand'
import { HeroLaptop } from './HeroLaptop'

const ORBS: { label?: string; className: string; fill?: string }[] = [
  { label: 'MIT', className: 'top-[16%] left-[9%] drift-a' },
  { className: 'top-[22%] left-[22%] drift-b', fill: 'bg-cyan' },
  { label: 'ASK', className: 'top-[48%] left-[5%] drift-a' },
  { className: 'top-[12%] right-[28%] drift-b', fill: 'bg-acid' },
  { className: 'top-[38%] right-[8%] drift-a', fill: 'bg-cyan' },
  { className: 'bottom-[28%] right-[18%] drift-b', fill: 'bg-magenta' },
  { label: 'YAML', className: 'bottom-[18%] left-[14%] drift-b' },
]

const CHIPS = [
  { icon: Shield, label: 'MIT' },
  { icon: Lock, label: 'local-only' },
  { icon: Hexagon, label: 'fail-closed' },
]

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-[100svh] overflow-hidden bg-void">
      {ORBS.map((orb, i) => (
        <div
          key={i}
          className={`pointer-events-none absolute hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center md:flex ${orb.className} ${
            orb.fill
              ? `${orb.fill} h-10 w-10 rounded-[10px]`
              : 'h-14 w-14 rounded-full bg-[#141414] ring-1 ring-white/12'
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

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col items-center justify-center px-5 pt-28 pb-10 sm:px-8">
        <div className="relative w-full">
          <div className="pointer-events-none absolute top-0 left-1/2 z-0 w-[148px] -translate-x-1/2 -translate-y-[58%] sm:w-[180px] lg:w-[196px]">
            <HeroLaptop />
          </div>

          <h1 className="font-display relative z-10 text-center text-[40px] leading-[0.88] font-extrabold tracking-[-0.045em] text-white uppercase sm:text-[64px] lg:text-[92px]">
            Ask before
            <br />
            it acts —
            <br />
            every tool call
            <br />
            hits a policy
          </h1>
        </div>

        <div className="relative z-10 mt-8 flex max-w-xl items-center gap-4 sm:mt-10">
          <div
            className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#141414] ring-1 ring-white/12 sm:flex"
            aria-hidden="true"
          >
            <Hexagon size={16} className="text-acid" />
          </div>
          <p className="text-center text-[15px] leading-relaxed text-white/70 sm:text-left sm:text-[17px]">
            The may-i proxy checks every agent tool call against a YAML policy —
            allowed, blocked, or paused for your approval.
          </p>
        </div>

        <div className="relative z-10 mt-7 flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
          {CHIPS.map((chip) => (
            <span
              key={chip.label}
              className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] text-white/45 uppercase"
            >
              <chip.icon size={12} className="text-acid" />
              {chip.label}
            </span>
          ))}
        </div>

        <div className="relative z-10 mt-8 w-full max-w-2xl">
          <CopyCommand id="install" />
          <p className="mt-3 text-center text-[12px] text-white/35">
            Or <span className="text-white/60">npm install -g mayi-mcp</span> then{' '}
            <span className="text-white/60">mayi -- …</span>
          </p>
        </div>
      </div>
    </section>
  )
}
