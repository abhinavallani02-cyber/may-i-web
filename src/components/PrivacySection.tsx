import { Reveal } from './Reveal'

const POINTS = [
  {
    title: 'Nothing leaves your machine.',
    body: 'No telemetry, no crash reports, no usage stats. There is no network code in the decision path. You can verify that yourself — the whole thing is a few hundred readable lines.',
  },
  {
    title: "Payloads aren't logged by default.",
    body: (
      <>
        The audit log records the decision, not the contents: timestamp, tool name, verdict.
        Arguments are excluded unless you explicitly pass{' '}
        <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[0.9em] text-white">
          --audit-include-args
        </code>
        , and the startup log tells you which mode you're in.
      </>
    ),
  },
  {
    title: 'Inspection is transient.',
    body: 'Payloads live in memory for the duration of one decision and are never written to disk.',
  },
  {
    title: 'No model in the path.',
    body: 'Matching is deterministic string and path comparison. Nothing is sent to an LLM to be classified, which means no latency, no cost, and nothing to leak.',
  },
]

export function PrivacySection() {
  return (
    <section className="px-5 py-24 sm:px-8 md:px-12 md:py-32">
      <div className="mx-auto max-w-3xl">
        <Reveal delay={0}>
          <h2 className="text-4xl leading-[1.1] font-normal tracking-tight text-white drop-shadow-lg sm:text-5xl">
            What may-i sees,
            <br />
            and what it keeps.
          </h2>
        </Reveal>

        <Reveal delay={120} className="mt-6 max-w-xl">
          <p className="text-sm leading-relaxed text-white/80 sm:text-base">
            may-i has to read your tool calls to make decisions about them. That means file
            paths, queries, and payloads pass through it. We think you should know exactly what
            happens to them.
          </p>
        </Reveal>

        <div className="mt-8 flex flex-col gap-6">
          {POINTS.map((p, i) => (
            <Reveal key={p.title} delay={220 + i * 100} className="flex flex-col gap-1.5">
              <h3 className="text-base font-medium text-white sm:text-lg">{p.title}</h3>
              <p className="text-sm leading-relaxed text-white/70 sm:text-base">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
