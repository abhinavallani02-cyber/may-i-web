import { useEffect, useRef, useState } from 'react'
import * as AsciinemaPlayer from 'asciinema-player'
import { Check, Copy } from 'lucide-react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'
import { CAST_URL, POLICY_YAML } from '../lib/site'
import { Reveal } from './Reveal'

const TABS = ['Policy', 'Allow', 'Deny', 'Ask'] as const

const TAB_COPY: Record<(typeof TABS)[number], string> = {
  Policy: POLICY_YAML,
  Allow: `rules:
  - tool: read_*
    action: allow

Reads and lookups pass through
untouched. You never see them.`,
  Deny: `rules:
  - tool: write_*
    path_prefix: /etc
    action: deny

Blocked before the tool.
Clean JSON-RPC error. No prompt.`,
  Ask: `rules:
  - tool: "*"
    action: ask

Anything you haven’t reasoned
about stops. Silence denies.`,
}

const TAB_STATUS: Record<(typeof TABS)[number], { value: string; hint: string }> = {
  Policy: { value: 'YAML', hint: 'active' },
  Allow: { value: 'ALLOW', hint: 'forward' },
  Deny: { value: 'DENY', hint: 'blocked' },
  Ask: { value: 'ASK', hint: 'paused' },
}

const CHIPS = [
  { tab: 'Allow' as const, label: 'read_*' },
  { tab: 'Deny' as const, label: 'write_*' },
  { tab: 'Ask' as const, label: '*' },
  { tab: 'Policy' as const, label: 'yaml' },
]

const TRAILS = [-22, 22, -8, 8]

export function DemoSection() {
  const [tab, setTab] = useState<(typeof TABS)[number]>('Policy')
  const [copied, setCopied] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const laptopRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion() === true

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.85', 'start 0.25'],
  })
  const trail = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
    stiffness: 90,
    damping: 24,
  })

  const { scrollYProgress: laptopProgress } = useScroll({
    target: laptopRef,
    offset: ['start end', 'end start'],
  })
  const laptopRotateY = useSpring(useTransform(laptopProgress, [0, 1], [-10, 10]), {
    stiffness: 60,
    damping: 22,
  })
  const laptopRotateX = useSpring(useTransform(laptopProgress, [0, 1], [8, -6]), {
    stiffness: 60,
    damping: 22,
  })

  useEffect(() => {
    if (!terminalRef.current) return
    const player = AsciinemaPlayer.create(CAST_URL, terminalRef.current, {
      autoPlay: true,
      preload: true,
      loop: true,
      theme: 'monokai',
      fit: 'width',
      controls: false,
      terminalFontSize: '12px',
    })
    return () => player.dispose()
  }, [])

  async function copySample() {
    try {
      await navigator.clipboard.writeText(POLICY_YAML)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      return
    }
  }

  const status = TAB_STATUS[tab]

  return (
    <section id="policy" ref={sectionRef} className="bg-void px-5 pt-4 pb-24 sm:px-8 lg:px-16">
      <div className="relative mx-auto max-w-6xl">
        <div className="relative h-24 sm:h-36" aria-hidden="true">
          <motion.div
            className="mx-auto h-full w-px origin-top bg-gradient-to-b from-acid to-transparent"
            style={reduce ? { scaleY: 1 } : { scaleY: trail }}
          />
          {TRAILS.map((deg) => (
            <motion.div
              key={deg}
              className="absolute top-0 left-1/2 h-full w-px origin-top bg-gradient-to-b from-acid/80 to-transparent"
              style={{
                rotate: deg,
                ...(reduce ? { scaleY: 1 } : { scaleY: trail }),
              }}
            />
          ))}
        </div>

        <Reveal y={28}>
          <div className="-mt-6 overflow-hidden rounded-[20px] border border-white/12 bg-[#0c0c0c]">
            <div className="flex flex-wrap items-center gap-1 border-b border-white/8 px-3 pt-3">
              {TABS.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setTab(item)}
                  className={`rounded-t-md px-5 py-3 text-[11px] font-bold tracking-[0.16em] uppercase ${
                    tab === item ? 'text-white' : 'text-white/35 hover:text-white/70'
                  }`}
                >
                  {item}
                  {tab === item ? <span className="mt-2 block h-[2px] bg-acid" /> : null}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/8 px-4 py-3 sm:px-6">
              <div className="flex flex-wrap gap-2">
                {CHIPS.map((chip) => (
                  <button
                    key={chip.label}
                    type="button"
                    onClick={() => setTab(chip.tab)}
                    className={`rounded-md px-3 py-1.5 font-mono text-[11px] font-bold tracking-tight ${
                      tab === chip.tab
                        ? 'bg-[#1a1a1a] text-white ring-1 ring-white/15'
                        : 'text-white/40 hover:text-white/70'
                    }`}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
              <div className="text-right">
                <p className="text-[13px] tracking-[0.08em] text-white/45 uppercase">{status.hint}</p>
                <p className="font-display text-[32px] leading-none font-bold tracking-tight text-acid sm:text-[40px]">
                  {status.value}
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2">
              <div
                ref={laptopRef}
                className="relative min-h-[320px] border-b border-white/8 p-4 lg:border-r lg:border-b-0 lg:p-6"
                style={{ perspective: '1200px' }}
              >
                <motion.div
                  className="flex h-full min-h-[280px] flex-col overflow-hidden rounded-[16px] bg-acid p-[3px] shadow-[0_0_50px_rgba(229,255,93,0.22)] will-change-transform"
                  style={
                    reduce
                      ? undefined
                      : { rotateY: laptopRotateY, rotateX: laptopRotateX, transformStyle: 'preserve-3d' }
                  }
                >
                  <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[13px] bg-[#070707]">
                    <div className="flex shrink-0 items-center gap-1.5 border-b border-white/8 px-3 py-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-acid" />
                      <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                      <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                      <span className="ml-2 font-mono text-[10px] tracking-[0.14em] text-white/35 uppercase">
                        mayi — approval
                      </span>
                    </div>
                    <div className="hero-terminal relative min-h-0 flex-1 overflow-hidden bg-black">
                      <div ref={terminalRef} className="absolute top-0 left-0 w-[140%] origin-top-left" />
                    </div>
                  </div>
                </motion.div>
              </div>
              <div className="relative">
                <pre className="min-h-[280px] overflow-x-auto p-6 font-mono text-[13px] leading-relaxed text-white/80 sm:p-8">
                  {TAB_COPY[tab]}
                </pre>
                <button
                  type="button"
                  onClick={() => void copySample()}
                  className="absolute top-4 right-4 inline-flex h-8 items-center gap-1.5 rounded-lg bg-acid px-3 text-[10px] font-bold tracking-[0.14em] text-black uppercase"
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  {copied ? 'Copied' : 'Copy YAML'}
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
