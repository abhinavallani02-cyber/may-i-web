import { Check, X, HelpCircle } from 'lucide-react'
import { Reveal } from './Reveal'

const VERDICTS = [
  {
    icon: Check,
    name: 'allow',
    body: "passes through untouched. You never see it. Reads, lookups, anything you've decided is safe.",
  },
  {
    icon: X,
    name: 'deny',
    body: 'blocked before it reaches the tool. The agent gets a clean error and moves on. The action never happened.',
  },
  {
    icon: HelpCircle,
    name: 'ask',
    body: "paused. You get a prompt showing exactly what's about to happen, and nothing proceeds until you answer.",
  },
]

const POLICY_YAML = `rules:
  - tool: read_*
    action: allow

  - tool: write_*
    path_prefix: /etc
    action: deny

  - tool: write_*
    action: ask

  - tool: "*"
    action: ask`

export function SectionTwo() {
  return (
    <section id="how-it-works" className="px-5 py-24 sm:px-8 md:px-12 md:py-32">
      <div className="mx-auto max-w-3xl">
        <Reveal delay={0}>
          <h2 className="text-4xl leading-[1.1] font-normal tracking-tight text-white drop-shadow-lg sm:text-5xl">
            Three answers and a notebook.
          </h2>
        </Reveal>

        <Reveal delay={120} className="mt-6 max-w-xl">
          <p className="text-sm leading-relaxed text-white/80 sm:text-base">
            may-i is a proxy. Your agent talks to may-i instead of talking to its tools directly,
            and may-i decides what gets through. Every tool call gets one of three verdicts:
          </p>
        </Reveal>

        <div className="mt-8 flex flex-col divide-y divide-white/15 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md">
          {VERDICTS.map((v, i) => (
            <Reveal key={v.name} delay={200 + i * 110} className="flex gap-4 p-6">
              <v.icon size={20} className="mt-0.5 shrink-0 text-white/50" />
              <p className="text-sm leading-relaxed text-white/80 sm:text-base">
                <span className="font-mono font-semibold text-white">{v.name}</span> — {v.body}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={560} className="mt-6 max-w-xl">
          <p className="text-sm leading-relaxed text-white/80 sm:text-base">
            Every verdict is written to an append-only log. When someone asks what the agent did
            last Tuesday, there's an answer.
          </p>
        </Reveal>

        <Reveal delay={640} className="mt-16">
          <h3 className="text-2xl font-normal tracking-tight text-white sm:text-3xl">
            The policy file
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-white/80 sm:text-base">
            Rules live in a YAML file. They match on tool name and on argument paths, in order,
            first match wins.
          </p>
        </Reveal>

        <Reveal
          delay={720}
          className="mt-6 overflow-x-auto rounded-2xl border border-white/15 bg-black/60 p-5 font-mono text-[13px] leading-relaxed text-white/80 backdrop-blur-md"
        >
          <pre>{POLICY_YAML}</pre>
        </Reveal>

        <Reveal delay={800} className="mt-6 max-w-xl">
          <p className="text-sm leading-relaxed text-white/80 sm:text-base">
            That last rule is the important one. Anything you haven't explicitly reasoned about
            stops and asks. Default-deny, not default-allow.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
