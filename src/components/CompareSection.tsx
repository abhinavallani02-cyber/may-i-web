import { Reveal } from './Reveal'

const CARDS = [
  {
    name: 'Built-in is a prompt',
    href: '#faq',
    tone: 'sand' as const,
    mark: 'circles' as const,
  },
  {
    name: 'A file you write once',
    href: '#install',
    tone: 'acid' as const,
    mark: 'tiles' as const,
  },
  {
    name: 'Fail closed by default',
    href: '#how-it-works',
    tone: 'paper' as const,
    mark: 'sheets' as const,
  },
]

const TONE = {
  sand: 'bg-sand text-ink',
  acid: 'bg-acid text-ink',
  paper: 'bg-white text-ink',
}

export function CompareSection() {
  return (
    <section id="compare" className="bg-void px-5 py-24 sm:px-8 lg:px-16">
      <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
        {CARDS.map((card, i) => (
          <Reveal key={card.name} delay={0.06 * i}>
            <a
              href={card.href}
              className={`flex min-h-[380px] flex-col justify-between rounded-[22px] p-8 motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:-translate-y-1 ${TONE[card.tone]}`}
            >
              <CardMark kind={card.mark} />
              <h3 className="font-display text-[32px] leading-[0.95] font-extrabold tracking-[-0.03em] uppercase sm:text-[36px]">
                {card.name}
              </h3>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function CardMark({ kind }: { kind: 'circles' | 'tiles' | 'sheets' }) {
  if (kind === 'circles') {
    return (
      <div className="grid h-28 w-28 grid-cols-2 gap-2">
        {[0, 1, 2, 3].map((n) => (
          <span key={n} className="rounded-full bg-white/70 shadow-inner" />
        ))}
      </div>
    )
  }
  if (kind === 'tiles') {
    return (
      <div className="grid h-28 w-28 grid-cols-2 gap-2">
        {[0, 1, 2, 3].map((n) => (
          <span key={n} className="rounded-lg bg-black/10" />
        ))}
      </div>
    )
  }
  return (
    <div className="relative h-28 w-28">
      <span className="absolute top-2 left-2 h-20 w-16 rounded-xl bg-black/8 ring-1 ring-black/10" />
      <span className="absolute top-8 left-8 h-20 w-16 rounded-xl bg-white ring-1 ring-black/10" />
    </div>
  )
}
