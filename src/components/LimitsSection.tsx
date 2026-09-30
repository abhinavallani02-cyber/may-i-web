import type { ReactNode } from 'react'
import { GITHUB_URL } from '../lib/site'
import { Reveal } from './Reveal'
import { Pill } from './Pill'

const ELICITATION_ISSUE_URL = 'https://github.com/anthropics/claude-code/issues/79174'

const LIMITS: { title: string; body: ReactNode }[] = [
  {
    title: 'Native tool bypass',
    body: 'Built-in file tools (for example Claude Code’s) can go around may-i.',
  },
  {
    title: 'Policy loads once',
    body: 'The YAML is read at start. Change it, restart the proxy.',
  },
  {
    title: 'Globs aren’t parsing',
    body: 'Matching is glob/prefix comparison, not a structural understanding of the call.',
  },
  {
    title: 'stdio only',
    body: 'MCP over stdio is the transport today. No SSE or HTTP yet.',
  },
  {
    title: 'VS Code elicitation',
    body: (
      <>
        Approval via MCP's native elicitation/create is implemented and verified working in Cursor.
        Claude Code's VS Code extension declares elicitation support but auto-declines without
        rendering UI (
        <a
          href={ELICITATION_ISSUE_URL}
          target="_blank"
          rel="noreferrer"
          className="text-white/70 underline decoration-white/20 underline-offset-4 hover:text-acid"
        >
          issue #79174
        </a>
        ); may-i detects this and falls back to a terminal prompt.
      </>
    ),
  },
]

export function LimitsSection() {
  return (
    <section id="limits" className="border-t border-white/8 bg-void px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      <Reveal>
        <p className="text-center text-[12px] font-bold tracking-[0.22em] text-acid uppercase">
          Limitations
        </p>
        <h2 className="font-display mx-auto mt-4 max-w-3xl text-center text-5xl leading-[0.88] font-extrabold tracking-[-0.045em] text-white uppercase sm:text-6xl lg:text-[72px]">
          Honest limits
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-center text-[16px] leading-relaxed text-muted">
          Early software. These are the edges, not a roadmap dressed as a promise.
        </p>
      </Reveal>

      <div className="mx-auto mt-14 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {LIMITS.map((item, i) => (
          <Reveal key={item.title} delay={0.05 * i}>
            <div className="h-full rounded-2xl bg-[#121212] p-6 ring-1 ring-white/10">
              <h3 className="font-display text-[18px] font-extrabold tracking-tight text-white uppercase">
                {item.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">{item.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Pill href={GITHUB_URL}>Open on GitHub</Pill>
      </div>
    </section>
  )
}
