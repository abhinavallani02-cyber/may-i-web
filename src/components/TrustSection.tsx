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
    <section id="trust" className="bg-white px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <h2 className="font-display text-5xl leading-[0.95] font-extrabold tracking-[-0.045em] text-ink sm:text-6xl lg:text-[72px]">
            Your tools.
            <br />
            Your machine.
          </h2>
          <p className="mt-6 max-w-md text-[16px] leading-relaxed text-muted sm:text-[17px]">
            may-i has to read tool calls to decide on them. File paths and payloads pass through
            it. Here’s exactly what happens to them.
          </p>
          <div className="mt-8">
            <Pill href={GITHUB_URL} variant="dark">
              Read the code
            </Pill>
          </div>
          <ul className="mt-10 flex flex-col gap-5">
            {BULLETS.map((item) => (
              <li key={item.title}>
                <p className="text-[16px] font-semibold tracking-tight text-ink">{item.title}</p>
                <p className="mt-1 text-[15px] leading-relaxed text-muted">{item.body}</p>
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
    <svg
      viewBox="0 0 280 320"
      className="w-full max-w-[320px] drop-shadow-[0_28px_60px_rgba(0,0,0,0.18)]"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="shield-body" x1="0.15" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#f7f7f8" />
          <stop offset="38%" stopColor="#d2d5d8" />
          <stop offset="72%" stopColor="#9aa0a6" />
          <stop offset="100%" stopColor="#6d737a" />
        </linearGradient>
        <linearGradient id="shield-edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#8b9198" />
        </linearGradient>
      </defs>
      <path
        d="M140 18 L248 58 V148 C248 214 200 266 140 302 C80 266 32 214 32 148 V58 Z"
        fill="url(#shield-body)"
        stroke="url(#shield-edge)"
        strokeWidth="3"
      />
      <path
        d="M140 54 L92 78 V148 L140 176 L188 148 V78 Z"
        fill="none"
        stroke="#1a1a1a"
        strokeWidth="10"
        strokeLinejoin="round"
      />
    </svg>
  )
}
