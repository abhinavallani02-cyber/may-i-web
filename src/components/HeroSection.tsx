import { GITHUB_URL } from '../lib/site'
import { CopyCommand } from './CopyCommand'
import { HeroLaptop } from './HeroLaptop'
import { Pill } from './Pill'

const CHIPS = ['MIT', 'local-only', 'fail-closed']

export function HeroSection() {
  return (
    <section
      id="hero"
      className="hero-sky relative flex min-h-[calc(100svh-6.5rem)] items-center overflow-hidden"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:gap-10 lg:px-12 lg:py-16">
        <div className="relative z-10 order-1 min-w-0 max-w-xl">
          <div className="flex flex-wrap gap-2">
            {CHIPS.map((chip) => (
              <span
                key={chip}
                className="rounded-full bg-white/18 px-3 py-1 text-[12px] font-semibold tracking-tight text-white ring-1 ring-white/25"
              >
                {chip}
              </span>
            ))}
          </div>

          <h1 className="font-display mt-6 text-[52px] leading-[0.92] font-extrabold tracking-[-0.045em] text-white sm:text-7xl lg:text-[84px]">
            Ask before
            <br />
            it acts.
          </h1>

          <p className="mt-6 max-w-md text-[16px] leading-relaxed text-white/90 sm:text-[17px]">
            A permission layer for AI agents. Every tool call is checked against a YAML policy —
            allowed, blocked, or paused for your approval.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Pill href="#how-it-works" variant="dark">
              Get started
            </Pill>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-white/90 transition-colors hover:text-white"
            >
              Documentation
            </a>
          </div>
        </div>

        <div className="order-3 mx-auto w-full min-w-0 max-w-xl lg:order-2 lg:max-w-none">
          <HeroLaptop />
          <p className="mt-6 text-center text-[13px] font-medium text-white/85">
            A real may-i session — <code className="text-white">/etc</code> denied, then a write
            that waits for you.
          </p>
        </div>

        <div className="order-2 min-w-0 lg:order-3 lg:col-span-2">
          <CopyCommand id="install" variant="sky" />
          <p className="mt-3 text-[12px] text-white/75">
            Or <span className="font-medium text-white">npm install -g mayi-mcp</span> then{' '}
            <span className="font-medium text-white">mayi -- …</span>
          </p>
        </div>
      </div>
    </section>
  )
}
