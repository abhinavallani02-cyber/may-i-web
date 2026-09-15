import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { POLICY_YAML } from '../lib/site'
import { Reveal } from './Reveal'
import { Pill } from './Pill'

export function PolicySection() {
  const [copied, setCopied] = useState(false)

  async function copySample() {
    try {
      await navigator.clipboard.writeText(POLICY_YAML)
    } catch {
      return
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="policy" className="bg-white px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <h2 className="font-display text-5xl leading-[0.95] font-extrabold tracking-[-0.045em] text-ink sm:text-6xl lg:text-[72px]">
            Write the rules once.
          </h2>
          <p className="mt-6 max-w-md text-[16px] leading-relaxed text-muted sm:text-[17px]">
            YAML you can read, diff, and commit. Rules match in order — first match wins. Keep a
            last rule that asks so anything you haven’t reasoned about stops. Fail closed.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => void copySample()}
              className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied sample' : 'Copy sample'}
            </button>
            <Pill href="#compare" variant="outline">
              Built-in vs may-i
            </Pill>
          </div>
        </Reveal>

        <Reveal delay={0.12} y={48}>
          <div className="overflow-hidden rounded-[28px] bg-ink p-6 shadow-[0_30px_80px_rgba(0,0,0,0.12)] sm:p-8">
            <div className="mb-5 flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="ml-2 text-[12px] font-medium text-white/35">policy.yaml</span>
            </div>
            <pre className="overflow-x-auto font-mono text-[13px] leading-relaxed text-white/85 sm:text-[14px]">
              {POLICY_YAML}
            </pre>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
