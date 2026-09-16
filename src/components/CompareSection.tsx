import { Reveal } from './Reveal'

const CARDS = [
  {
    name: 'Built-in prompts',
    kicker: 'Already there',
    body: 'Fine for one agent, on your own machine, when the worst case is losing an afternoon. Every decision is a click in the moment.',
    points: ['No setup', 'One tool at a time', 'No searchable record'],
    href: '#faq',
    tone: 'sand' as const,
  },
  {
    name: 'may-i',
    kicker: 'A file you write once',
    body: 'Deny without asking. One policy for every MCP agent. An append-only log when someone asks what happened.',
    points: ['Blocks without a prompt', 'Shareable YAML', 'Fail closed by default'],
    href: '#install',
    tone: 'acid' as const,
  },
  {
    name: 'Fail closed',
    kicker: 'Default deny',
    body: 'Last rule should ask. Anything you haven’t reasoned about stops. Silence times out to deny.',
    points: ['First match wins', 'No silent allow', 'Human in the loop'],
    href: '#how-it-works',
    tone: 'paper' as const,
  },
]

const TONE = {
  sand: 'bg-[#cfc9bc] text-ink',
  acid: 'bg-acid text-ink',
  paper: 'bg-white text-ink',
}

export function CompareSection() {
  return (
    <section id="compare" className="bg-void px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      <Reveal>
        <p className="text-center text-[12px] font-bold tracking-[0.22em] text-acid uppercase">
          Compact vs built-in
        </p>
        <h2 className="font-display mx-auto mt-4 max-w-4xl text-center text-5xl leading-[0.88] font-extrabold tracking-[-0.045em] text-white uppercase sm:text-6xl lg:text-[72px]">
          Built-in is a prompt.
          <br />
          This is a policy.
        </h2>
      </Reveal>

      <div className="mx-auto mt-14 grid max-w-6xl gap-4 md:grid-cols-3">
        {CARDS.map((card, i) => (
          <Reveal key={card.name} delay={0.08 * i}>
            <a
              href={card.href}
              className={`group flex h-full min-h-[320px] flex-col justify-end rounded-2xl p-7 motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:-translate-y-1 ${TONE[card.tone]}`}
            >
              <p className="text-[11px] font-bold tracking-[0.16em] uppercase opacity-55">{card.kicker}</p>
              <h3 className="font-display mt-3 text-[28px] leading-[0.95] font-extrabold tracking-tight uppercase">
                {card.name}
              </h3>
              <p className="mt-4 text-[14px] leading-relaxed text-black/70">{card.body}</p>
              <ul className="mt-5 flex flex-col gap-1.5 text-[13px] font-medium text-black/80">
                {card.points.map((point) => (
                  <li key={point}>▸ {point}</li>
                ))}
              </ul>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
