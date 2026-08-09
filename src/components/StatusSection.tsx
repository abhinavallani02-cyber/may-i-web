import { Check, Circle } from 'lucide-react'
import { Reveal } from './Reveal'

const WORKING = [
  'MCP over stdio',
  'allow / deny / ask verdicts',
  'Glob matching on tool names, prefix matching on argument paths',
  'Human approval at the terminal',
  'Append-only audit log, decision-only by default',
  'Zero-config default policy',
]

const NOT_YET = [
  'SSE and HTTP transports',
  'Structural argument parsing (a policy that allows SELECT can currently be evaded by a compound statement — glob matching is not a SQL parser)',
  "Session-scoped grants, so you're not asked twice for the same thing",
  'Rate limits and cumulative budgets',
  'Curated rule packs for common servers',
]

export function StatusSection() {
  return (
    <section id="status" className="px-5 py-24 sm:px-8 md:px-12 md:py-32">
      <div className="mx-auto max-w-3xl">
        <Reveal delay={0}>
          <h2 className="text-4xl leading-[1.1] font-normal tracking-tight text-white drop-shadow-lg sm:text-5xl">
            Early, and honest about it.
          </h2>
        </Reveal>

        <Reveal delay={120} className="mt-6 max-w-xl">
          <p className="text-sm leading-relaxed text-white/80 sm:text-base">
            may-i works. It's also new, and there are things it doesn't do yet.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <Reveal delay={220}>
            <h3 className="font-mono text-[11px] tracking-[0.15em] text-white/50 uppercase">
              Working now
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {WORKING.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-white/80">
                  <Check size={16} className="mt-0.5 shrink-0 text-white/60" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={320}>
            <h3 className="font-mono text-[11px] tracking-[0.15em] text-white/50 uppercase">
              Not yet
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {NOT_YET.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-white/60">
                  <Circle size={16} className="mt-0.5 shrink-0 text-white/30" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={480} className="mt-10">
          <p className="text-sm leading-relaxed text-white/70">
            If you hit something broken,{' '}
            <a
              href="https://github.com/abhinavallani02-cyber/mayI/issues"
              target="_blank"
              rel="noreferrer"
              className="text-white underline underline-offset-2 hover:text-white/80"
            >
              open an issue
            </a>
            . Early bug reports are worth more than stars.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
