import { useState } from 'react'
import { Reveal } from './Reveal'

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
    <section id="faq" className="bg-fog px-5 py-20 text-ink sm:px-8 lg:px-16">
      <Reveal>
        <h2 className="font-display text-center text-[36px] leading-[0.92] font-extrabold tracking-[-0.04em] uppercase sm:text-5xl">
          Questions
        </h2>
      </Reveal>

      <div className="mx-auto mt-12 max-w-3xl">
        {FAQS.map((item, i) => {
          const isOpen = open === i
          return (
            <Reveal key={item.q} delay={0.03 * i}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-start justify-between gap-6 border-t border-black/10 py-5 text-left last:border-b"
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
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
