import { Reveal, Stagger, StaggerItem } from './Reveal'
import { LimeCube } from './LimeCube'
import { Cta } from './Cta'
import { GITHUB_URL } from '../lib/site'

const CARDS = [
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
    name: 'Native bypass',
    body: 'Built-in file tools (for example Claude Code’s) can go around may-i.',
  },
  {
    name: 'stdio only',
    body: 'MCP over stdio is the only transport today. No SSE or HTTP yet.',
  },
  {
    name: 'Early software',
    body: 'Use it on your own work first, read the code, and decide for yourself.',
  },
]

export function VerdictsSection() {
  return (
    <section id="verdicts" className="relative overflow-hidden bg-fog px-5 py-28 text-ink sm:px-8 lg:px-16">
      <div
        className="pointer-events-none absolute right-[-4%] bottom-[-8%] hidden opacity-90 lg:block"
        aria-hidden="true"
      >
        <LimeCube size={320} drift />
      </div>

      <Reveal>
        <h2 className="font-display mx-auto max-w-4xl text-center text-[42px] leading-[0.9] font-bold tracking-[-0.045em] uppercase sm:text-[60px] lg:text-[73px]">
          Every tool call
          <br />
          hits a rule
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-center text-[16px] text-black/50">
          Here’s what may-i does when an agent reaches for a tool — and where it won’t.
        </p>
      </Reveal>

      <Stagger
        className="relative mx-auto mt-14 grid max-w-6xl gap-3 sm:grid-cols-2 lg:grid-cols-3"
        delay={0.07}
      >
        {CARDS.map((item) => (
          <StaggerItem key={item.name}>
            <div className="h-full rounded-[12px] bg-white p-7">
              <h3 className="text-[22px] leading-tight font-semibold tracking-tight">{item.name}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-black/55">{item.body}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal delay={0.12} className="relative mt-12 flex flex-wrap items-center justify-center gap-3">
        <Cta href="#install" mark>
          Get started
        </Cta>
        <Cta href={GITHUB_URL} variant="ghost">
          GitHub
        </Cta>
      </Reveal>
    </section>
  )
}
