import { GITHUB_URL } from '../lib/site'
import { Reveal } from './Reveal'
import { Pill } from './Pill'

const STATS = [
  {
    value: 'MIT',
    label: 'License',
    body: 'Open source. You’re putting this between an agent and your tools — you can read every line.',
  },
  {
    value: 'Local',
    label: 'Only',
    body: 'Nothing leaves the machine. No model in the path. Matching is string and path comparison.',
  },
  {
    value: 'Fail',
    label: 'Closed',
    body: 'Last rule should ask. Silence times out to deny. If may-i dies, the tool connection dies with it.',
  },
]

export function StatsSection() {
  return (
    <section id="trust" className="bg-fog px-5 py-24 text-ink sm:px-8 md:py-32 lg:px-16">
      <Reveal>
        <h2 className="font-display mx-auto max-w-4xl text-center text-[40px] leading-[0.9] font-extrabold tracking-[-0.04em] uppercase sm:text-6xl lg:text-[72px]">
          Nothing leaves
          <br />
          the machine
        </h2>
      </Reveal>

      <div className="mx-auto mt-16 grid max-w-5xl gap-12 md:grid-cols-3">
        {STATS.map((item, i) => (
          <Reveal key={item.label} delay={0.06 * i}>
            <p className="font-display text-[64px] leading-none font-extrabold tracking-[-0.05em] text-black/25 uppercase sm:text-[72px]">
              {item.value}
            </p>
            <p className="mt-2 border-t border-black/15 pt-3 text-[13px] font-bold tracking-[0.18em] uppercase">
              {item.label}
            </p>
            <p className="mt-3 text-[14px] leading-relaxed text-black/55">{item.body}</p>
          </Reveal>
        ))}
      </div>

      <div className="mt-14 flex justify-center">
        <Pill href={GITHUB_URL}>Read the code</Pill>
      </div>
    </section>
  )
}
