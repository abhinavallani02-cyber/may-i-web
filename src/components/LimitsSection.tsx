import { Reveal } from './Reveal'

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
    body: 'MCP over stdio is the only transport today. No SSE or HTTP yet.',
  },
  {
    title: 'VS Code elicitation',
    body: 'Claude Code’s VS Code extension auto-declines MCP elicitation (upstream #79174).',
  },
  {
    title: 'Early software',
    body: 'Use it on your own work first, read the code, and decide for yourself.',
  },
]

export function LimitsSection() {
  return (
    <section id="limits" className="bg-fog px-5 py-16 text-ink sm:px-8 lg:px-16">
      <Reveal>
        <h2 className="font-display mx-auto max-w-4xl text-center text-[36px] leading-[0.92] font-extrabold tracking-[-0.04em] uppercase sm:text-5xl">
          Honest limits
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-[15px] text-black/50">
          Early software. These are the edges, not a roadmap dressed as a promise.
        </p>
      </Reveal>

      <div className="mx-auto mt-12 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {LIMITS.map((item, i) => (
          <Reveal key={item.title} delay={0.04 * i}>
            <div className="h-full rounded-[20px] bg-white p-7 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <h3 className="font-display text-[22px] font-extrabold tracking-tight uppercase">
                {item.title}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-black/55">{item.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
