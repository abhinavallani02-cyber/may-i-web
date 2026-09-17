import { Reveal } from './Reveal'
import { LimeMark } from './LimeMark'

const VERDICTS = [
  {
    name: 'Allow',
    body: 'Reads and lookups pass through untouched. You never see them.',
  },
  {
    name: 'Deny',
    body: 'Blocked before the tool. Clean JSON-RPC error. No prompt.',
  },
  {
    name: 'Ask',
    body: 'Anything you haven’t written a rule for stops and waits for you.',
  },
  {
    name: 'First match',
    body: 'Rules run top to bottom. The first hit wins — keep a last rule that asks.',
  },
  {
    name: 'Audit log',
    body: 'Append-only decisions on disk. Diffable. Greppable. Yours.',
  },
  {
    name: 'Fail closed',
    body: 'Silence times out to deny. If the proxy dies, the tool connection dies with it.',
  },
]

export function VerdictsSection() {
  return (
    <section id="verdicts" className="relative overflow-hidden bg-fog px-5 py-24 text-ink sm:px-8 md:py-32 lg:px-16">
      <div
        className="pointer-events-none absolute -right-8 -bottom-24 hidden opacity-90 lg:block"
        aria-hidden="true"
      >
        <LimeMark size={280} />
      </div>

      <Reveal>
        <h2 className="font-display mx-auto max-w-4xl text-center text-[40px] leading-[0.9] font-extrabold tracking-[-0.04em] uppercase sm:text-6xl lg:text-[72px]">
          Every tool call
          <br />
          hits a rule
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-center text-[16px] text-black/50">
          Here’s what may-i does when an agent reaches for a tool:
        </p>
      </Reveal>

      <div className="relative mx-auto mt-14 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {VERDICTS.map((item, i) => (
          <Reveal key={item.name} delay={0.04 * i}>
            <div className="h-full rounded-[22px] bg-white p-7 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <h3 className="font-display text-[26px] leading-[0.95] font-extrabold tracking-tight uppercase sm:text-[28px]">
                {item.name}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-black/55">{item.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
