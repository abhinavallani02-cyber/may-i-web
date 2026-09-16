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
    <section id="policy" className="bg-fog px-5 py-24 text-ink sm:px-8 md:py-32 lg:px-12">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="text-[12px] font-bold tracking-[0.22em] text-black/40 uppercase">Policy</p>
          <h2 className="font-display mt-4 text-5xl leading-[0.88] font-extrabold tracking-[-0.045em] uppercase sm:text-6xl lg:text-[72px]">
            Write the
            <br />
            rules once
          </h2>
          <p className="mt-6 max-w-md text-[16px] leading-relaxed text-black/55 sm:text-[17px]">
            YAML you can read, diff, and commit. Rules match in order — first match wins. Keep a
            last rule that asks so anything you haven’t reasoned about stops. Fail closed.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => void copySample()}
              className="inline-flex items-center gap-2 rounded-md bg-acid px-4 py-2.5 text-[11px] font-bold tracking-[0.16em] text-black uppercase transition-colors hover:bg-[#e1ff4a]"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied sample' : 'Copy sample'}
            </button>
            <Pill href="#compare" variant="outline">
              Built-in vs may-i
            </Pill>
          </div>
        </Reveal>

        <Reveal delay={0.12} y={48}>
          <div className="overflow-hidden rounded-2xl bg-void p-6 ring-1 ring-black/10 sm:p-8">
            <div className="mb-5 flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-acid" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="ml-2 text-[11px] font-bold tracking-[0.16em] text-white/35 uppercase">
                policy.yaml
              </span>
            </div>
            <pre className="overflow-x-auto font-mono text-[13px] leading-relaxed text-white/80 sm:text-[14px]">
              {POLICY_YAML}
            </pre>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
