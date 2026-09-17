import { GITHUB_URL } from '../lib/site'
import { Reveal } from './Reveal'
import { Cta } from './Cta'

const TILES = [
  '#111', '#e5ff5d', '#2f6bff', '#fff', '#ff2d8a', '#1a1a1a', '#cfc8bb', '#111',
  '#2f6bff', '#fff', '#111', '#e5ff5d', '#1a1a1a', '#ff2d8a', '#fff', '#111',
  '#cfc8bb', '#111', '#e5ff5d', '#2f6bff', '#fff', '#1a1a1a', '#ff2d8a', '#e5ff5d',
  '#111', '#fff', '#cfc8bb', '#111', '#2f6bff', '#e5ff5d', '#1a1a1a', '#fff',
  '#ff2d8a', '#111', '#e5ff5d', '#fff', '#cfc8bb', '#2f6bff', '#111', '#e5ff5d',
  '#1a1a1a', '#fff', '#ff2d8a', '#111', '#e5ff5d', '#cfc8bb', '#2f6bff', '#111',
]

const STATS = [
  {
    value: 'MIT',
    label: 'License',
    body: 'Open source. You’re putting this between an agent and your tools — you can read every line.',
  },
  {
    value: 'Local',
    label: 'Only',
    body: 'Nothing leaves the machine. No model in the path. Matching is string and path comparison.',
  },
  {
    value: 'Fail',
    label: 'Closed',
    body: 'Last rule should ask. Silence times out to deny. If may-i dies, the tool connection dies with it.',
  },
]

export function StatsSection() {
  return (
    <section id="trust" className="bg-fog px-5 py-24 text-ink sm:px-8 md:py-32 lg:px-16">
      <div className="mx-auto grid max-w-6xl items-start gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="lg:sticky lg:top-24">
          <Reveal>
            <div className="mx-auto max-w-[420px] overflow-hidden rounded-[20px] bg-white p-3">
              <div className="grid grid-cols-8 gap-1.5">
                {TILES.map((color, i) => (
                  <span
                    key={i}
                    className="aspect-square rounded-[6px] ring-1 ring-black/5"
                    style={{ background: color }}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <div className="flex flex-col gap-16 pt-4">
          {STATS.map((item, i) => (
            <Reveal key={item.label} delay={0.06 * i}>
              <div className="flex items-baseline justify-between gap-6">
                <p className="font-display text-[clamp(40px,6vw,80px)] leading-none font-bold tracking-[-0.06em] text-ink uppercase">
                  {item.value}
                </p>
                <p className="text-[18px] font-semibold tracking-[0.12em] text-black/55 uppercase sm:text-[22px]">
                  {item.label}
                </p>
              </div>
              <p className="mt-3 border-t border-black/15 pt-4 text-[15px] leading-relaxed text-black/55">
                {item.body}
              </p>
            </Reveal>
          ))}
          <Cta href={GITHUB_URL} mark className="self-start">
            Read the code
          </Cta>
        </div>
      </div>
    </section>
  )
}
