import { Hexagon } from 'lucide-react'
import { Pill } from './Pill'

const ITEMS = [
  'ALLOW',
  'DENY',
  'ASK',
  'YAML POLICY',
  'AUDIT LOG',
  'LOCAL-ONLY',
  'FAIL-CLOSED',
  'MIT',
  'MCP',
  'STDIO',
]

export function MarqueeSection() {
  const loop = [...ITEMS, ...ITEMS]

  return (
    <section className="bg-void pb-6">
      <div className="flex flex-wrap items-center justify-center gap-3 px-5">
        <Pill href="#install">
          <Hexagon size={13} strokeWidth={2.4} />
          Get started
        </Pill>
        <Pill href="#how-it-works" variant="ghost">
          Scroll to discover
        </Pill>
      </div>

      <div className="mt-10 overflow-hidden border-y border-white/8 py-5">
        <div className="marquee-track flex w-max gap-12 px-6">
          {loop.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="font-display text-[18px] font-extrabold tracking-[0.18em] text-white/35 uppercase"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
