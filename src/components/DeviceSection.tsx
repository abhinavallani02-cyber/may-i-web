import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { POLICY_YAML } from '../lib/site'
import { LimeMark } from './LimeMark'
import { Reveal } from './Reveal'

const FEATURES = [
  'Allow — forward untouched',
  'Deny — block before the tool',
  'Ask — pause for a human',
  'Append-only audit log',
  'First match wins',
  'Fail closed / default-deny',
]

const TABS = ['Policy', 'Allow', 'Deny', 'Ask'] as const

const TAB_COPY: Record<(typeof TABS)[number], string> = {
  Policy: POLICY_YAML,
  Allow: `rules:
  - tool: read_*
    action: allow

Reads and lookups pass through
untouched. You never see them.`,
  Deny: `rules:
  - tool: write_*
    path_prefix: /etc
    action: deny

Blocked before the tool.
Clean JSON-RPC error. No prompt.`,
  Ask: `rules:
  - tool: "*"
    action: ask

Anything you haven’t reasoned
about stops. Silence denies.`,
}

export function DeviceSection() {
  const [tab, setTab] = useState<(typeof TABS)[number]>('Policy')
  const [copied, setCopied] = useState(false)

  async function copySample() {
    try {
      await navigator.clipboard.writeText(POLICY_YAML)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      return
    }
  }

  return (
    <section id="policy" className="bg-void px-5 pt-10 pb-24 sm:px-8 lg:px-16">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-3">
        <Reveal>
          <h2 className="font-display text-[32px] leading-[1.05] font-extrabold tracking-[-0.03em] text-white sm:text-[40px]">
            Write the rules once.
            <br />
            may-i handles the rest.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-muted">
            YAML you can read, diff, and commit. Keep a last rule that asks so anything new stops.
          </p>
          <p className="mt-3 text-[15px] font-medium text-white/80">
            We focus on the gate. You focus on the agent.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="flex justify-center">
          <LimeMark size={220} scrollTargetId="policy" />
        </Reveal>

        <Reveal delay={0.12}>
          <ul className="flex flex-col gap-3">
            {FEATURES.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-[13px] font-bold tracking-[0.12em] text-white uppercase"
              >
                <span className="mt-0.5 text-acid">▸</span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <div className="relative mx-auto mt-6 max-w-6xl">
        <div
          className="pointer-events-none mx-auto h-24 w-px bg-gradient-to-b from-acid to-transparent sm:h-32"
          aria-hidden="true"
        />
        <div className="flex justify-center gap-8 sm:gap-16" aria-hidden="true">
          <div className="h-20 w-px origin-top -rotate-[18deg] bg-gradient-to-b from-acid/80 to-transparent sm:h-28" />
          <div className="h-20 w-px origin-top rotate-[18deg] bg-gradient-to-b from-acid/80 to-transparent sm:h-28" />
        </div>

        <Reveal y={28}>
          <div className="-mt-8 overflow-hidden rounded-[22px] border border-white/10 bg-[#0c0c0c]">
            <div className="flex flex-wrap items-center gap-1 border-b border-white/8 px-3 pt-3">
              {TABS.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setTab(item)}
                  className={`rounded-t-md px-4 py-2.5 text-[11px] font-bold tracking-[0.16em] uppercase ${
                    tab === item ? 'text-white' : 'text-white/35 hover:text-white/70'
                  }`}
                >
                  {item}
                  {tab === item ? <span className="mt-2 block h-[2px] bg-acid" /> : null}
                </button>
              ))}
              <button
                type="button"
                onClick={() => void copySample()}
                className="ml-auto mb-2 inline-flex items-center gap-1.5 rounded-md bg-acid px-3 py-1.5 text-[10px] font-bold tracking-[0.14em] text-black uppercase"
              >
                {copied ? <Check size={12} /> : <Copy size={12} />}
                {copied ? 'Copied' : 'Copy YAML'}
              </button>
            </div>
            <pre className="min-h-[280px] overflow-x-auto p-6 font-mono text-[13px] leading-relaxed text-white/80 sm:p-8 sm:text-[14px]">
              {TAB_COPY[tab]}
            </pre>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
