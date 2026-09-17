import { GITHUB_URL } from '../lib/site'
import { Reveal } from './Reveal'
import { Pill } from './Pill'

const TILES = [
  { letter: 'A', bg: '#111', color: '#ccff00' },
  { letter: 'D', bg: '#1a1a1a', color: '#ff2d8a' },
  { letter: 'K', bg: '#0d0d0d', color: '#2f6bff' },
  { letter: 'Y', bg: '#161616', color: '#fff' },
  { letter: 'M', bg: '#ccff00', color: '#000' },
  { letter: 'C', bg: '#111', color: '#fff' },
  { letter: 'P', bg: '#1b1b1b', color: '#ccff00' },
  { letter: 'F', bg: '#0e0e0e', color: '#ff2d8a' },
  { letter: '/', bg: '#141414', color: '#9c9c9c' },
  { letter: 'I', bg: '#111', color: '#2f6bff' },
  { letter: 'T', bg: '#1a1a1a', color: '#fff' },
  { letter: 'S', bg: '#0d0d0d', color: '#ccff00' },
  { letter: 'O', bg: '#151515', color: '#fff' },
  { letter: 'L', bg: '#111', color: '#ff2d8a' },
  { letter: 'N', bg: '#1c1c1c', color: '#2f6bff' },
  { letter: 'E', bg: '#0f0f0f', color: '#fff' },
]

const STATS = [
  {
    value: 'MIT',
    label: 'License',
    body: 'Open source. You’re putting this between an agent and your tools — you can read every line.',
  },
  {
    value: '0',
    label: 'Egress',
    body: 'Nothing leaves the machine. No model in the path. Matching is string and path comparison.',
  },
  {
    value: '1',
    label: 'Host',
    body: 'One local process. Fail closed: if may-i dies, the tool connection dies with it.',
  },
]

export function StatsSection() {
  return (
    <section id="trust" className="bg-fog px-5 py-24 text-ink sm:px-8 md:py-32 lg:px-16">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <div className="relative mx-auto aspect-square w-full max-w-[420px] overflow-hidden rounded-[28px] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <div className="grid h-full grid-cols-4 gap-2.5">
              {TILES.map((tile, i) => (
                <span
                  key={`${tile.letter}-${i}`}
                  className="flex items-center justify-center rounded-full font-display text-[15px] font-extrabold ring-1 ring-black/10 sm:text-[18px]"
                  style={{ background: tile.bg, color: tile.color }}
                >
                  {tile.letter}
                </span>
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white font-display text-[28px] font-extrabold tracking-[0.08em] text-black shadow-[0_12px_40px_rgba(0,0,0,0.12)] sm:h-24 sm:w-24 sm:text-[32px]">
                M
              </span>
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col gap-10">
          {STATS.map((item, i) => (
            <Reveal key={item.label} delay={0.06 * i}>
              <div className="flex items-baseline justify-between gap-6">
                <p className="font-display text-[64px] leading-none font-extrabold tracking-[-0.06em] text-black/20 uppercase sm:text-[80px]">
                  {item.value}
                </p>
                <p className="text-[18px] font-semibold tracking-[0.14em] text-black/70 uppercase sm:text-[22px]">
                  {item.label}
                </p>
              </div>
              <p className="mt-3 border-t border-black/15 pt-4 text-[14px] leading-relaxed text-black/55">
                {item.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-16 flex justify-center">
        <Pill href={GITHUB_URL}>Read the code</Pill>
      </div>
    </section>
  )
}
