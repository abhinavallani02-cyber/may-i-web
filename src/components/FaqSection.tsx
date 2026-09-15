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
    q: 'Can I use it in production?',
    a: 'It’s early. Use it on your own work first, read the code, and decide for yourself.',
  },
  {
    q: 'Is it really free?',
    a: 'Yes, MIT. You’re being asked to put this between an agent and your credentials — that only makes sense if you can read every line.',
  },
]

export function FaqSection() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="bg-white px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      <Reveal>
        <h2 className="font-display mx-auto max-w-3xl text-center text-5xl leading-[0.95] font-extrabold tracking-[-0.045em] text-ink sm:text-6xl lg:text-[72px]">
          Questions.
        </h2>
      </Reveal>

      <div className="mx-auto mt-12 max-w-3xl divide-y divide-black/10 border-y border-black/10">
        {FAQS.map((item, i) => {
          const isOpen = open === i
          return (
            <Reveal key={item.q} delay={0.03 * i}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-start justify-between gap-6 py-6 text-left"
                aria-expanded={isOpen}
              >
                <span>
                  <span className="block text-[17px] font-semibold tracking-tight text-ink">
                    {item.q}
                  </span>
                  <span
                    className={`mt-2 block text-[15px] leading-relaxed text-muted ${
                      isOpen ? '' : 'hidden'
                    }`}
                  >
                    {item.a}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="mt-1 text-2xl leading-none font-light text-ink/40"
                >
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
