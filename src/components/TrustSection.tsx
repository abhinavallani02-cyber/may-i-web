import { GITHUB_URL } from '../lib/site'
import { Reveal } from './Reveal'
import { Pill } from './Pill'

const BULLETS = [
  {
    title: 'Nothing leaves the machine',
    body: 'No telemetry. No model in the path. Matching is deterministic string and path comparison.',
  },
  {
    title: 'Payloads stay out of the log',
    body: 'The audit log is append-only: timestamp, tool, verdict. Arguments are off by default.',
  },
  {
    title: 'Inspection is transient',
    body: 'Payloads live in memory for one decision. They are not written to disk by default.',
  },
  {
    title: 'Open source, MIT',
    body: 'You’re putting this between an agent and your tools — you can read every line.',
  },
]

export function TrustSection() {
  return (
    <section id="trust" className="bg-fog px-5 py-24 text-ink sm:px-8 md:py-32 lg:px-12">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="text-[12px] font-bold tracking-[0.22em] text-black/40 uppercase">Trust</p>
          <h2 className="font-display mt-4 text-5xl leading-[0.88] font-extrabold tracking-[-0.045em] uppercase sm:text-6xl lg:text-[72px]">
            Your tools.
            <br />
            Your machine.
          </h2>
          <p className="mt-6 max-w-md text-[16px] leading-relaxed text-black/55 sm:text-[17px]">
            may-i has to read tool calls to decide on them. File paths and payloads pass through
            it. Here’s exactly what happens to them.
          </p>
          <div className="mt-8">
            <Pill href={GITHUB_URL}>Read the code</Pill>
          </div>
          <ul className="mt-10 flex flex-col gap-4">
            {BULLETS.map((item) => (
              <li key={item.title} className="flex gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-sm bg-acid" />
                <div>
                  <p className="text-[15px] font-semibold tracking-tight">{item.title}</p>
                  <p className="mt-1 text-[14px] leading-relaxed text-black/55">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="flex justify-center lg:justify-end">
          <TrustMark />
        </Reveal>
      </div>
    </section>
  )
}

function TrustMark() {
  return (
    <div className="relative flex h-[340px] w-full max-w-[340px] items-center justify-center">
      <div className="spin-slow absolute inset-8 rounded-full border border-dashed border-black/15" />
      <div className="absolute h-48 w-48 rotate-12 rounded-3xl bg-acid shadow-[0_0_80px_rgba(210,255,0,0.45)]" />
      <div className="relative font-display text-5xl font-extrabold tracking-[0.12em] text-black uppercase">
        may-i
      </div>
    </div>
  )
}
