import { useState } from 'react'
import { Reveal } from './Reveal'
import { LimeCube } from './LimeCube'

const FAQS = [
  {
    q: 'Does it slow things down?',
    a: 'No. Matching is string comparison against a compiled pattern list — microseconds, no network, no model.',
  },
  {
    q: 'What happens if may-i crashes?',
    a: 'The agent loses its connection to the tool, same as if the tool itself had died. It fails closed, not open.',
  },
  {
    q: 'What if I don’t answer a prompt?',
    a: 'It times out and denies. Silence is never taken as approval.',
  },
  {
    q: 'Does it work with tools other than MCP?',
    a: 'Not yet. MCP over stdio is the only transport today.',
  },
  {
    q: 'What about native file tools?',
    a: 'They can bypass may-i. That’s a known limit — may-i only sees traffic that goes through it.',
  },
  {
    q: 'Is it really free?',
    a: 'Yes, MIT. You’re being asked to put this between an agent and your credentials — that only makes sense if you can read every line.',
  },
]

export function FaqSection() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="relative overflow-hidden bg-fog px-5 py-28 text-ink sm:px-8 lg:px-16">
      <div className="pointer-events-none absolute top-[12%] right-[8%] hidden opacity-80 lg:block" aria-hidden="true">
        <LimeCube size={180} spin />
      </div>
      <div className="pointer-events-none absolute right-[18%] bottom-[-10%] hidden opacity-70 lg:block" aria-hidden="true">
        <LimeCube size={140} />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[0.42fr_0.58fr]">
        <Reveal>
          <h2 className="font-display text-[40px] leading-[0.9] font-bold tracking-[-0.045em] uppercase sm:text-[56px] lg:text-[64px]">
            may-i is early,
            <br />
            honest software
          </h2>
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-black/50">
            Policy loads once. Globs aren’t parsing. Native tools can bypass it. Read the answers
            before you put it on the path.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="rounded-[12px] bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.06)] sm:p-8">
            {FAQS.map((item, i) => {
              const isOpen = open === i
              return (
                <button
                  key={item.q}
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-start justify-between gap-6 border-b border-black/8 py-5 text-left first:pt-0 last:border-b-0 last:pb-0"
                  aria-expanded={isOpen}
                >
                  <span>
                    <span className="block text-[16px] font-semibold tracking-tight">{item.q}</span>
                    <span
                      className={`mt-2 block text-[15px] leading-relaxed text-black/55 ${isOpen ? '' : 'hidden'}`}
                    >
                      {item.a}
                    </span>
                  </span>
                  <span aria-hidden="true" className="text-xl text-black/30">
                    {isOpen ? '–' : '+'}
                  </span>
                </button>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
