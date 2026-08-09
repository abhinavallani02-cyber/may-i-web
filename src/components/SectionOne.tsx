import { ArrowRight, Terminal } from 'lucide-react'
import { Reveal } from './Reveal'
import { Badge } from './Badge'

const VERDICTS = ['/ ALLOW', '/ DENY', '/ ASK']

export function SectionOne() {
  return (
    <section
      id="hero"
      className="flex min-h-screen min-h-[100svh] flex-col justify-between px-5 pt-32 pb-12 sm:px-8 sm:pt-36 md:px-12 md:pb-16"
    >
      {/* Top row */}
      <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
        <div className="flex flex-col gap-2">
          {VERDICTS.map((verdict, i) => (
            <Reveal key={verdict} delay={150 + i * 120}>
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-white/90 drop-shadow-md">
                {verdict}
              </span>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300} className="max-w-sm sm:text-right">
          <p className="text-lg leading-relaxed text-white drop-shadow-md sm:text-xl">
            may-i sits between an AI agent and the tools it can reach. Every action is checked
            against a policy file and either allowed, blocked, or paused for your approval. Every
            decision is logged.
          </p>
        </Reveal>
      </div>

      {/* Bottom row */}
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <Reveal delay={150}>
            <Badge className="mb-5">A permission layer for AI agents</Badge>
          </Reveal>

          <Reveal delay={280}>
            <h1 className="text-5xl leading-[1.05] font-normal tracking-tight text-white drop-shadow-lg sm:text-6xl lg:text-7xl">
              Ask before
              <br />
              it acts.
            </h1>
          </Reveal>

          <Reveal delay={380} className="mt-8">
            <div className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-3 font-mono text-xs text-white/80 backdrop-blur-md sm:text-sm">
              <Terminal size={14} className="shrink-0 text-white/40" />
              <code>npx mayi-mcp -- &lt;your mcp server&gt;</code>
            </div>
          </Reveal>

          <Reveal delay={460} className="mt-5 flex flex-wrap gap-3">
            <a
              href="#quickstart"
              className="flex items-center gap-1 rounded-full bg-white px-5 py-2.5 text-xs font-medium text-black transition-colors duration-300 hover:bg-white/85 sm:text-sm"
            >
              Get started
              <ArrowRight size={14} />
            </a>
            <a
              href="https://github.com/abhinavallani02-cyber/mayI"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-xs text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/20 sm:text-sm"
            >
              View on GitHub
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
