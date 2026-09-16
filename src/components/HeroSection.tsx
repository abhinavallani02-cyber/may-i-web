import { Hexagon } from 'lucide-react'
import { GITHUB_URL } from '../lib/site'
import { CopyCommand } from './CopyCommand'
import { DriftOrbs } from './DriftOrbs'
import { HeroLaptop } from './HeroLaptop'
import { Pill } from './Pill'

const CHIPS = ['MIT', 'local-only', 'fail-closed']

export function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden bg-void">
      <DriftOrbs />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-2 lg:gap-10 lg:px-12 lg:py-16">
        <div className="order-1 min-w-0 text-center lg:text-left">
          <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
            {CHIPS.map((chip) => (
              <span
                key={chip}
                className="rounded-full bg-white/6 px-3 py-1 text-[10px] font-bold tracking-[0.18em] text-white/70 uppercase ring-1 ring-white/12"
              >
                {chip}
              </span>
            ))}
          </div>

          <h1 className="font-display mt-7 text-[42px] leading-[0.86] font-extrabold tracking-[-0.04em] text-white uppercase sm:text-6xl lg:text-[80px]">
            Ask before
            <br />
            it acts
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-muted lg:mx-0 sm:text-[17px]">
            A permission layer for AI agents. Every tool call is checked against a YAML policy —
            allowed, blocked, or paused for your approval.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <Pill href="#how-it-works">
              <Hexagon size={14} strokeWidth={2.4} />
              Get started
            </Pill>
            <Pill href={GITHUB_URL} variant="ghost">
              Documentation
            </Pill>
          </div>
        </div>

        <div className="order-3 min-w-0 overflow-hidden lg:order-2">
          <HeroLaptop />
          <p className="mt-5 text-center text-[12px] font-medium tracking-[0.12em] text-white/45 uppercase">
            A real may-i session — <code className="text-acid">/etc</code> denied, then a write that
            waits for you.
          </p>
        </div>

        <div className="order-2 min-w-0 lg:order-3 lg:col-span-2">
          <CopyCommand id="install" />
          <p className="mt-3 text-center text-[12px] text-white/40 lg:text-left">
            Or <span className="text-white/70">npm install -g mayi-mcp</span> then{' '}
            <span className="text-white/70">mayi -- …</span>
          </p>
        </div>
      </div>
    </section>
  )
}
