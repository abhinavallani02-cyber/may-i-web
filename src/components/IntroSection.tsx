import { LimeMark } from './LimeMark'
import { Reveal } from './Reveal'

const ORBITS = [
  { label: 'ALLOW', top: '4%', left: '50%', color: 'text-acid' },
  { label: 'DENY', top: '22%', left: '88%', color: 'text-magenta' },
  { label: 'ASK', top: '50%', left: '96%', color: 'text-cyan' },
  { label: 'YAML', top: '78%', left: '84%', color: 'text-white' },
  { label: 'AUDIT', top: '92%', left: '50%', color: 'text-white' },
  { label: 'MCP', top: '78%', left: '16%', color: 'text-acid' },
  { label: 'MIT', top: '50%', left: '4%', color: 'text-white' },
  { label: '/ETC', top: '22%', left: '12%', color: 'text-cyan' },
]

export function IntroSection() {
  return (
    <section id="how-it-works" className="bg-void px-5 py-20 sm:px-8 md:py-28 lg:px-16">
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
        <Reveal>
          <h2 className="font-display max-w-lg text-[36px] leading-[1.05] font-extrabold tracking-[-0.03em] text-white sm:text-[44px]">
            Agents stopped suggesting.
            <br />
            They started doing.
          </h2>
          <p className="mt-6 max-w-md text-[16px] leading-relaxed text-muted">
            Connecting an agent to a tool hands over the whole keyring. There’s no way to say read
            but don’t write — or ask first.
          </p>
          <p className="mt-4 max-w-md text-[16px] leading-relaxed text-muted">
            may-i is a proxy. The agent talks to may-i instead of talking to tools directly. Every
            call gets allow, deny, or ask. First match wins.
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
  return (
    <div className="relative h-[400px] w-full max-w-[440px] sm:h-[460px]">
      <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
        {ORBITS.map((orb) => (
          <line
            key={orb.label}
            x1="50%"
            y1="50%"
            x2={orb.left}
            y2={orb.top}
            stroke="rgba(255,255,255,0.14)"
            strokeDasharray="4 6"
          />
        ))}
      </svg>
      {ORBITS.map((orb) => (
        <div
          key={orb.label}
          className="absolute flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#141414] ring-1 ring-white/12"
          style={{ top: orb.top, left: orb.left }}
        >
          <span className={`text-[8px] font-bold tracking-[0.12em] uppercase ${orb.color}`}>
            {orb.label}
          </span>
        </div>
      ))}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <LimeMark size={196} scrollTargetId="how-it-works" />
      </div>
    </div>
  )
}
