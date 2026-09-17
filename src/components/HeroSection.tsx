import { Hexagon, Shield, Lock } from 'lucide-react'
import { CopyCommand } from './CopyCommand'
import { HeroLaptop } from './HeroLaptop'

const ORBS: { label?: string; className: string; fill?: string }[] = [
  { label: 'MIT', className: 'top-[18%] left-[8%] drift-a' },
  { className: 'top-[24%] left-[20%] drift-b', fill: 'bg-cyan' },
  { label: 'ASK', className: 'top-[46%] left-[6%] drift-a' },
  { className: 'top-[30%] right-[14%] drift-b', fill: 'bg-acid' },
  { className: 'top-[52%] right-[7%] drift-a', fill: 'bg-cyan' },
  { label: 'YAML', className: 'bottom-[20%] left-[12%] drift-b' },
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
          className={`pointer-events-none absolute hidden h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full md:flex ${orb.className} ${
            orb.fill ? `${orb.fill} h-11 w-11 rounded-[10px]` : 'bg-[#141414] ring-1 ring-white/12'
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

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col items-center justify-center px-5 pt-28 pb-16 sm:px-8">
        <div className="relative z-20 mx-auto mb-[-4.5rem] w-full max-w-[420px] sm:mb-[-5.5rem] lg:max-w-[460px]">
          <HeroLaptop />
        </div>

        <h1 className="font-display relative z-10 max-w-5xl text-center text-[40px] leading-[0.88] font-extrabold tracking-[-0.045em] text-white uppercase sm:text-[64px] lg:text-[92px]">
          Ask before
          <br />
          it acts —
          <br />
          every tool call
          <br />
          hits a policy
        </h1>

        <p className="relative z-10 mx-auto mt-7 max-w-xl text-center text-[16px] leading-relaxed text-white/70 sm:text-[18px]">
          may-i sits between an AI agent and its tools. Every action is checked against a YAML
          policy — allowed, blocked, or paused for your approval.
        </p>

        <div className="relative z-10 mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
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
