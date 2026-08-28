import { ArrowRight } from 'lucide-react'
import { Reveal } from './Reveal'
import { HeroObject } from './HeroObject'

/**
 * The hero: a left-aligned editorial column against a near-black field,
 * with a slowly rotating dark object holding the right half. The headline
 * is set in a high-contrast display serif against sans-serif body copy --
 * that contrast, plus the restraint everywhere else (one solid button,
 * one plain text link, no competing texture), is what carries it.
 */
export function SectionOne() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen min-h-[100svh] items-center px-5 pt-32 pb-20 sm:px-8 sm:pt-36 md:px-12"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-8">
        {/* Left: copy */}
        <div>
          <Reveal delay={100}>
            <a
              href="#progress"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 text-[13px] text-white/70 transition-colors duration-300 hover:border-white/25 hover:text-white"
            >
              In active development — follow along
              <span aria-hidden="true" className="text-white/40">
                ›
              </span>
            </a>
          </Reveal>

          <Reveal delay={200}>
            <h1 className="mt-7 font-display text-6xl leading-[0.98] font-normal tracking-[-0.01em] text-white sm:text-7xl lg:text-[88px]">
              Ask before
              <br />
              it acts.
            </h1>
          </Reveal>

          <Reveal delay={300}>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-white/55">
              may-i sits between an AI agent and the tools it can reach. Every action is checked
              against a policy file and either allowed, blocked, or paused for your approval.
            </p>
          </Reveal>

          <Reveal delay={400} className="mt-9 flex flex-wrap items-center gap-6">
            <a
              href="#quickstart"
              className="flex items-center gap-1.5 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition-colors duration-300 hover:bg-white/85"
            >
              Get started
              <ArrowRight size={15} />
            </a>
            <a
              href="https://github.com/abhinavallani02-cyber/mayI"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-white/70 transition-colors duration-300 hover:text-white"
            >
              Documentation
            </a>
          </Reveal>
        </div>

        {/* Right: the object */}
        <Reveal delay={250} className="mx-auto w-full max-w-md md:max-w-none">
          <HeroObject />
        </Reveal>
      </div>
    </section>
  )
}
