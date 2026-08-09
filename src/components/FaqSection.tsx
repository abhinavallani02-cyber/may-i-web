import { Reveal } from './Reveal'

const FAQS = [
  {
    q: 'Does it slow things down?',
    a: 'No. Matching is string comparison against a compiled pattern list — microseconds, no network calls, no model.',
  },
  {
    q: 'What happens if may-i crashes?',
    a: 'The agent loses its connection to the tool, same as if the tool itself had died. It fails closed, not open.',
  },
  {
    q: "What if I don't answer a prompt?",
    a: 'It times out and denies. Silence is never taken as approval.',
  },
  {
    q: 'Does it work with tools other than MCP?',
    a: 'Not yet. MCP over stdio is the only transport today.',
  },
  {
    q: 'Can I use it in production?',
    a: "It's early. Use it on your own work first, read the code, and decide for yourself.",
  },
  {
    q: 'Is it really free?',
    a: "Yes, MIT. You're being asked to put this between an agent and your credentials — that only makes sense if you can read every line.",
  },
]

export function FaqSection() {
  return (
    <section className="px-5 py-24 sm:px-8 md:px-12 md:py-32">
      <div className="mx-auto max-w-3xl">
        <Reveal delay={0}>
          <h2 className="text-4xl leading-[1.1] font-normal tracking-tight text-white drop-shadow-lg sm:text-5xl">
            FAQ
          </h2>
        </Reveal>

        <div className="mt-10 flex flex-col divide-y divide-white/10 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md">
          {FAQS.map((item, i) => (
            <Reveal key={item.q} delay={100 + i * 90} className="p-6">
              <h3 className="text-base font-medium text-white sm:text-lg">{item.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70 sm:text-base">{item.a}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
