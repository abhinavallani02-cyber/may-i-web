import { motion, useReducedMotion } from 'motion/react'
import { Reveal, Stagger, StaggerItem, EASE } from './Reveal'
import { Cta } from './Cta'
import { GITHUB_URL } from '../lib/site'

const CARDS = [
  {
    name: 'Built-in is a prompt',
    body: 'A system prompt is not a control plane. The agent can still call the tool.',
    tone: 'sand' as const,
    mark: 'circles' as const,
  },
  {
    name: 'A file you write once',
    body: 'YAML you can diff and commit. First match wins. Last rule should ask.',
    tone: 'acid' as const,
    mark: 'tiles' as const,
  },
  {
    name: 'Fail closed by default',
    body: 'Silence times out to deny. If the proxy dies, the tool connection dies with it.',
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
  const reduce = useReducedMotion() === true

  return (
    <section id="compare" className="bg-void px-5 py-24 sm:px-8 lg:px-16">
      <Stagger className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3" delay={0.12} delayChildren={0.06}>
        {CARDS.map((card) => (
          <StaggerItem key={card.name}>
            <motion.div
              className={`flex min-h-[420px] flex-col justify-between rounded-[20px] p-8 sm:min-h-[507px] ${TONE[card.tone]}`}
              whileHover={reduce ? undefined : { y: -8, transition: { duration: 0.35, ease: EASE } }}
            >
              <CardMark kind={card.mark} />
              <div>
                <h3 className="font-display text-[28px] leading-[0.95] font-bold tracking-[-0.03em] uppercase sm:text-[31px]">
                  {card.name}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-black/60">{card.body}</p>
              </div>
            </motion.div>
          </StaggerItem>
        ))}
      </Stagger>
      <Reveal delay={0.16} className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Cta href="#install" mark>
          Get started
        </Cta>
        <Cta href={GITHUB_URL} variant="ghost">
          Read the docs
        </Cta>
      </Reveal>
    </section>
  )
}

function CardMark({ kind }: { kind: 'circles' | 'tiles' | 'sheets' }) {
  if (kind === 'circles') {
    return (
      <div className="grid h-32 w-32 grid-cols-2 gap-2.5">
        {[0, 1, 2, 3].map((n) => (
          <span key={n} className="rounded-full bg-white/70 shadow-inner" />
        ))}
      </div>
    )
  }
  if (kind === 'tiles') {
    return (
      <div className="grid h-32 w-32 grid-cols-2 gap-2.5">
        {[0, 1, 2, 3].map((n) => (
          <span key={n} className="rounded-lg bg-black/10" />
        ))}
      </div>
    )
  }
  return (
    <div className="relative h-32 w-32">
      <span className="absolute top-2 left-2 h-24 w-[4.5rem] rounded-xl bg-black/8 ring-1 ring-black/10" />
      <span className="absolute top-8 left-8 h-24 w-[4.5rem] rounded-xl bg-white ring-1 ring-black/10" />
    </div>
  )
}
