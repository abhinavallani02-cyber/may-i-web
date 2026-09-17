import { motion, useReducedMotion } from 'motion/react'
import { LimeCube } from './LimeCube'
import { Reveal, EASE } from './Reveal'

const ORBITS = [
  { label: 'ALLOW', top: '6%', left: '50%', color: 'text-acid' },
  { label: 'DENY', top: '22%', left: '86%', color: 'text-magenta' },
  { label: 'ASK', top: '50%', left: '94%', color: 'text-cyan' },
  { label: 'YAML', top: '78%', left: '84%', color: 'text-white' },
  { label: 'AUDIT', top: '94%', left: '50%', color: 'text-white' },
  { label: 'MCP', top: '78%', left: '16%', color: 'text-acid' },
  { label: 'MIT', top: '50%', left: '6%', color: 'text-white' },
  { label: '/ETC', top: '22%', left: '14%', color: 'text-cyan' },
]

export function IntroSection() {
  return (
    <section id="how-it-works" className="bg-void px-5 py-24 sm:px-8 md:py-28 lg:px-16">
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[0.4fr_0.6fr]">
        <Reveal>
          <h2 className="font-display max-w-md text-[28px] leading-[1.15] font-bold tracking-[-0.03em] text-white sm:text-[31px]">
            Agents stopped suggesting. They started doing.
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted">
            Connecting an agent to a tool hands over the whole keyring. There’s no way to say read
            but don’t write — or ask first.
          </p>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">
            Maintaining mountains of custom wrappers is a headache you don’t want. may-i is a proxy:
            the agent talks to it instead of talking to tools directly.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="flex justify-center">
          <NetworkGraphic />
        </Reveal>
      </div>
    </section>
  )
}

function NetworkGraphic() {
  const reduce = useReducedMotion() === true

  return (
    <div className="relative h-[420px] w-full max-w-[520px] sm:h-[480px]">
      <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
        {ORBITS.map((orb) => (
          <line
            key={orb.label}
            x1="50%"
            y1="50%"
            x2={orb.left}
            y2={orb.top}
            stroke="rgba(255,255,255,0.16)"
            strokeDasharray="4 6"
          />
        ))}
      </svg>
      {ORBITS.map((orb, i) => (
        <motion.div
          key={orb.label}
          className="absolute flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#1a1a1a] ring-1 ring-white/12"
          style={{ top: orb.top, left: orb.left }}
          initial={reduce ? false : { opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 0.05 * i, ease: EASE }}
        >
          <span className={`text-[8px] font-bold tracking-[0.12em] uppercase ${orb.color}`}>
            {orb.label}
          </span>
        </motion.div>
      ))}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <LimeCube size={168} scrollTargetId="how-it-works" />
      </div>
    </div>
  )
}
