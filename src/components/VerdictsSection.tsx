import { useEffect, useRef, useState } from 'react'
import { useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Reveal } from './Reveal'
import { Pill } from './Pill'

const VERDICTS = [
  {
    name: 'Allow',
    kicker: 'Forward untouched',
    body: 'Reads, lookups, anything you’ve already decided is safe. You never see it.',
  },
  {
    name: 'Deny',
    kicker: 'Block before the tool',
    body: 'The agent gets a clean JSON-RPC error. The action never happened — and nobody was asked to approve it.',
  },
  {
    name: 'Ask',
    kicker: 'Pause for a human',
    body: 'Nothing proceeds until you answer. Silence times out to deny. Fail closed.',
  },
]

function VerdictCopy({ index }: { index: number }) {
  const v = VERDICTS[index]
  return (
    <div className="text-center">
      <p className="text-[12px] font-bold tracking-[0.22em] text-acid uppercase">{v.kicker}</p>
      <h2 className="font-display mt-4 text-6xl leading-[0.84] font-extrabold tracking-[-0.05em] text-white uppercase sm:text-7xl lg:text-[92px]">
        {v.name}
      </h2>
      <p className="mx-auto mt-6 max-w-md text-[16px] leading-relaxed text-muted sm:text-[17px]">
        {v.body}
      </p>
    </div>
  )
}

function VerdictPills({
  active,
  onSelect,
}: {
  active: number
  onSelect: (index: number) => void
}) {
  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
      {VERDICTS.map((v, i) => (
        <button
          key={v.name}
          type="button"
          onClick={() => onSelect(i)}
          className={`rounded-md px-4 py-2 text-[11px] font-bold tracking-[0.16em] uppercase transition-colors ${
            i === active ? 'bg-acid text-black' : 'bg-[#161616] text-white/70 ring-1 ring-white/10 hover:text-white'
          }`}
          aria-pressed={i === active}
        >
          {v.name}
        </button>
      ))}
    </div>
  )
}

export function VerdictsSection() {
  const reduce = useReducedMotion() === true
  const pinRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ['start start', 'end end'],
  })
  const step = useTransform(scrollYProgress, [0, 0.12, 0.5, 0.88, 1], [0, 0, 1, 2, 2])
  const [active, setActive] = useState(0)

  useMotionValueEvent(step, 'change', (value) => {
    if (reduce) return
    setActive(Math.round(value))
  })

  useEffect(() => {
    if (reduce) setActive(0)
  }, [reduce])

  function scrollToStep(index: number) {
    const el = pinRef.current
    if (!el) {
      setActive(index)
      return
    }
    const start = el.offsetTop
    const travel = el.offsetHeight - window.innerHeight
    const top = start + travel * (index / 2)
    window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' })
    setActive(index)
  }

  return (
    <section id="how-it-works" className="border-t border-white/8 bg-void text-white">
      <div className={`px-5 py-24 sm:px-8 ${reduce ? '' : 'md:hidden'}`}>
        <Reveal>
          <p className="text-center text-[12px] font-bold tracking-[0.22em] text-acid uppercase">
            The model
          </p>
          <h2 className="font-display mt-4 text-center text-5xl leading-[0.88] font-extrabold tracking-[-0.045em] uppercase">
            Allow. Deny. Ask.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-center text-[15px] leading-relaxed text-muted">
            That’s the whole product. Rules match in order. First match wins.
          </p>
        </Reveal>
        <div className="mt-12 flex flex-col gap-3">
          {VERDICTS.map((v, i) => (
            <Reveal key={v.name} delay={0.08 * i}>
              <div className="rounded-2xl bg-[#121212] p-7 ring-1 ring-white/10">
                <p className="text-[11px] font-bold tracking-[0.18em] text-acid uppercase">{v.kicker}</p>
                <h3 className="font-display mt-2 text-3xl font-extrabold tracking-tight uppercase">
                  {v.name}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Pill href="#policy">See the policy</Pill>
        </div>
      </div>

      <div ref={pinRef} className={reduce ? 'hidden' : 'relative hidden h-[240vh] md:block'}>
        <div className="sticky top-[5.5rem] flex h-[calc(100svh-5.5rem)] flex-col items-center justify-center px-8">
          <p className="text-[12px] font-bold tracking-[0.22em] text-acid uppercase">The model</p>
          <div className="relative mt-2 flex min-h-[280px] w-full max-w-3xl items-start justify-center">
            {VERDICTS.map((v, i) => (
              <div
                key={v.name}
                className={`transition-all duration-500 ease-out ${
                  i === active
                    ? 'relative opacity-100 translate-y-0'
                    : 'pointer-events-none absolute inset-x-0 top-0 opacity-0 translate-y-6'
                } ${reduce ? '!translate-y-0' : ''}`}
                aria-hidden={i !== active}
              >
                <VerdictCopy index={i} />
              </div>
            ))}
          </div>
          <VerdictPills active={active} onSelect={scrollToStep} />
          <div className="mt-8">
            <Pill href="#policy">See the policy</Pill>
          </div>
        </div>
      </div>
    </section>
  )
}
