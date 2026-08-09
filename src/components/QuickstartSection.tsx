import { Reveal } from './Reveal'

const FLAGS = [
  { flag: '--policy <file>', body: 'Policy file. Defaults to ./policy.yaml if present.' },
  { flag: '--audit <file>', body: 'Audit log path. Defaults to ./audit.jsonl.' },
  { flag: '--audit-include-args', body: 'Include call arguments in the log. Off by default.' },
  { flag: '--help', body: 'Usage and flags.' },
]

export function QuickstartSection() {
  return (
    <section id="quickstart" className="px-5 py-24 sm:px-8 md:px-12 md:py-32">
      <div className="mx-auto max-w-3xl">
        <Reveal delay={0}>
          <h2 className="text-4xl leading-[1.1] font-normal tracking-tight text-white drop-shadow-lg sm:text-5xl">
            Running in under a minute.
          </h2>
        </Reveal>

        <Reveal delay={140} className="mt-10">
          <p className="font-mono text-[11px] tracking-[0.15em] text-white/50 uppercase">
            Step 1 — Run it
          </p>
          <div className="mt-3 overflow-x-auto rounded-2xl border border-white/15 bg-black/60 p-5 font-mono text-[13px] text-white/80 backdrop-blur-md">
            <pre>npx mayi-mcp -- npx -y @modelcontextprotocol/server-filesystem ./your-project</pre>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            With no config, may-i uses a conservative built-in default: reads and lookups pass,
            everything else asks.
          </p>
        </Reveal>

        <Reveal delay={260} className="mt-12">
          <p className="font-mono text-[11px] tracking-[0.15em] text-white/50 uppercase">
            Step 2 — Write a policy
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            Create <code className="rounded bg-white/10 px-1.5 py-0.5 text-white">policy.yaml</code>{' '}
            in your project. may-i picks it up automatically.
          </p>
          <div className="mt-3 overflow-x-auto rounded-2xl border border-white/15 bg-black/60 p-5 font-mono text-[13px] leading-relaxed text-white/80 backdrop-blur-md">
            <pre>{`rules:
  - tool: read_*
    action: allow
  - tool: write_*
    action: ask
  - tool: "*"
    action: ask`}</pre>
          </div>
        </Reveal>

        <Reveal delay={380} className="mt-12">
          <p className="font-mono text-[11px] tracking-[0.15em] text-white/50 uppercase">
            Step 3 — Check the log
          </p>
          <div className="mt-3 overflow-x-auto rounded-2xl border border-white/15 bg-black/60 p-5 font-mono text-[13px] text-white/80 backdrop-blur-md">
            <pre>cat audit.jsonl</pre>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            One JSON object per decision, in order, append-only.
          </p>
        </Reveal>

        <Reveal delay={500} className="mt-14">
          <h3 className="text-xl font-medium text-white sm:text-2xl">Flags</h3>
          <div className="mt-4 flex flex-col divide-y divide-white/10 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md">
            {FLAGS.map((f) => (
              <div key={f.flag} className="flex flex-col gap-1 p-4 sm:flex-row sm:items-center sm:gap-6">
                <code className="w-full shrink-0 font-mono text-sm text-white sm:w-52">
                  {f.flag}
                </code>
                <span className="text-sm text-white/70">{f.body}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
