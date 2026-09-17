import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'
import { Hexagon, Shield, Lock, Zap } from 'lucide-react'
import { CopyCommand } from './CopyCommand'
import { Cta } from './Cta'
import { LimeCube } from './LimeCube'
import { EASE } from './Reveal'

const ORBS: { label?: string; className: string; fill?: string; speed: number }[] = [
  { label: 'MIT', className: 'top-[18%] left-[14%]', speed: 40 },
  { className: 'top-[28%] left-[6%]', fill: 'bg-cyan', speed: -28 },
  { label: 'ASK', className: 'top-[52%] left-[8%]', speed: 55 },
  { className: 'top-[16%] right-[22%]', fill: 'bg-acid', speed: -36 },
  { className: 'top-[42%] right-[9%]', fill: 'bg-[#1a1a1a] ring-1 ring-white/15', speed: 24 },
  { label: 'YAML', className: 'bottom-[22%] left-[18%]', speed: -44 },
]

const BADGES = [
  { icon: Shield, label: 'MIT' },
  { icon: Lock, label: 'local-only' },
  { icon: Zap, label: 'fail-closed' },
]

const LINES = ['Ask before', 'it acts —', 'every tool call', 'hits a policy']

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const reduce = useReducedMotion() === true
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const cubeY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -140]), {
    stiffness: 80,
    damping: 24,
  })
  const cubeScale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 0.78]), {
    stiffness: 80,
    damping: 24,
  })
  const copyOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0.2])
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 80])

  return (
    <section id="hero" ref={heroRef} className="relative min-h-[100svh] overflow-hidden bg-void">
      {ORBS.map((orb, i) => (
        <HeroOrb key={i} orb={orb} progress={scrollYProgress} reduce={reduce} />
      ))}

      <motion.div
        className="relative mx-auto flex min-h-[100svh] max-w-5xl flex-col items-center justify-center px-5 pt-24 pb-10 sm:px-8"
        style={reduce ? undefined : { opacity: copyOpacity, y: copyY }}
      >
        <div className="relative w-full">
          <motion.div
            className="pointer-events-none absolute top-0 left-1/2 z-0 -translate-x-1/2 -translate-y-[48%]"
            style={reduce ? undefined : { y: cubeY, scale: cubeScale }}
          >
            <LimeCube size={118} scrollTargetId="hero" />
          </motion.div>
          <motion.h1
            className="font-display relative z-10 text-center text-[42px] leading-[0.92] font-bold tracking-[-0.045em] text-white uppercase sm:text-[60px] lg:text-[73px]"
            initial={reduce ? false : 'hidden'}
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
            }}
          >
            {LINES.map((line) => (
              <motion.span
                key={line}
                className="block"
                variants={{
                  hidden: { opacity: 0, y: 52 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.9, ease: EASE },
                  },
                }}
              >
                {line}
              </motion.span>
            ))}
          </motion.h1>
        </div>

        <motion.div
          className="relative z-10 mt-9 flex max-w-xl items-center gap-4"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.7, delay: reduce ? 0 : 0.55, ease: EASE }}
        >
          <div
            className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1a1a1a] ring-1 ring-white/12 sm:flex"
            aria-hidden="true"
          >
            <Hexagon size={16} className="text-acid" />
          </div>
          <p className="text-center text-[15px] leading-relaxed text-white/70 sm:text-left sm:text-[16px]">
            may-i sits between an AI agent and its tools. Every action is checked against a YAML
            policy — allowed, blocked, or paused for your approval.
          </p>
        </motion.div>

        <motion.div
          className="relative z-10 mt-7 flex flex-wrap items-center justify-center gap-x-8 gap-y-2"
          initial={reduce ? false : 'hidden'}
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08, delayChildren: 0.62 } },
          }}
        >
          {BADGES.map((badge) => (
            <motion.span
              key={badge.label}
              className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] text-white/45 uppercase"
              variants={{
                hidden: { opacity: 0, y: 12 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
              }}
            >
              <badge.icon size={13} className="text-white/70" />
              {badge.label}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-3"
          initial={reduce ? false : 'hidden'}
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1, delayChildren: 0.78 } },
          }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16, scale: 0.96 },
              show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: EASE } },
            }}
          >
            <Cta href="#install" mark>
              Get started
            </Cta>
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16, scale: 0.96 },
              show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: EASE } },
            }}
          >
            <Cta href="#how-it-works" variant="ghost">
              Scroll to discover
            </Cta>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative z-10 mt-6 w-full max-w-2xl"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.65, delay: reduce ? 0 : 0.98, ease: EASE }}
        >
          <CopyCommand id="install" />
        </motion.div>
      </motion.div>
    </section>
  )
}

function HeroOrb({
  orb,
  progress,
  reduce,
}: {
  orb: (typeof ORBS)[number]
  progress: ReturnType<typeof useScroll>['scrollYProgress']
  reduce: boolean
}) {
  const y = useTransform(progress, [0, 1], [0, orb.speed])

  return (
    <motion.div
      className={`pointer-events-none absolute hidden h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full md:flex ${orb.className} ${
        orb.fill ? `${orb.fill} h-10 w-10 rounded-[10px]` : 'bg-[#1a1a1a] ring-1 ring-white/12'
      }`}
      style={reduce ? undefined : { y }}
      aria-hidden="true"
    >
      {orb.label ? (
        <span className="text-[9px] font-bold tracking-[0.16em] text-white/70 uppercase">
          {orb.label}
        </span>
      ) : null}
    </motion.div>
  )
}
