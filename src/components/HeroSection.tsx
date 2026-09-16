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

      <div className="relative z-10 mx-auto max-w-6xl px-5 pt-16 pb-10 sm:px-8 sm:pt-20 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {CHIPS.map((chip) => (
              <span
                key={chip}
                className="rounded-full bg-white/6 px-3 py-1 text-[10px] font-bold tracking-[0.18em] text-white/70 uppercase ring-1 ring-white/12"
              >
                {chip}
              </span>
            ))}
          </div>

          <h1 className="font-display mt-8 text-[44px] leading-[0.86] font-extrabold tracking-[-0.04em] text-white uppercase sm:text-7xl lg:text-[92px]">
            Ask before
            <br />
            it acts
          </h1>

          <p className="mx-auto mt-7 max-w-xl text-[16px] leading-relaxed text-muted sm:text-[17px]">
            A permission layer for AI agents. Every tool call is checked against a YAML policy —
            allowed, blocked, or paused for your approval.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Pill href="#how-it-works">
              <Hexagon size={14} strokeWidth={2.4} />
              Get started
            </Pill>
            <Pill href={GITHUB_URL} variant="ghost">
              Documentation
            </Pill>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <CopyCommand id="install" />
          <p className="mt-3 text-center text-[12px] text-white/40">
            Or <span className="text-white/70">npm install -g mayi-mcp</span> then{' '}
            <span className="text-white/70">mayi -- …</span>
          </p>
        </div>

        <div className="mx-auto mt-12 w-full max-w-4xl">
          <HeroLaptop />
          <p className="mt-6 text-center text-[12px] font-medium tracking-[0.12em] text-white/45 uppercase">
            A real may-i session — <code className="text-acid">/etc</code> denied, then a write that
            waits for you.
          </p>
        </div>
      </div>
    </section>
  )
}
