import { GITHUB_URL } from '../lib/site'
import { Reveal } from './Reveal'
import { Pill } from './Pill'

const LIMITS = [
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
    body: 'Claude Code’s VS Code extension auto-declines MCP elicitation (upstream #79174).',
  },
]

export function LimitsSection() {
  return (
    <section id="limits" className="bg-black px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      <Reveal>
        <h2 className="font-display mx-auto max-w-3xl text-center text-5xl leading-[0.95] font-extrabold tracking-[-0.045em] text-white sm:text-6xl lg:text-[72px]">
          Honest limits.
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-center text-[16px] leading-relaxed text-white/60">
          Early software. These are the edges, not a roadmap dressed as a promise.
        </p>
      </Reveal>

      <div className="mx-auto mt-14 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {LIMITS.map((item, i) => (
          <Reveal key={item.title} delay={0.05 * i}>
            <div className="h-full rounded-[24px] bg-white/[0.05] p-6 ring-1 ring-white/10">
              <h3 className="text-[17px] font-semibold tracking-tight text-white">{item.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-white/60">{item.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Pill href={GITHUB_URL} variant="light">
          Open on GitHub
        </Pill>
      </div>
    </section>
  )
}
