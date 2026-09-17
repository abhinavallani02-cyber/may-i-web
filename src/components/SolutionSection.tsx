import { LimeCube } from './LimeCube'
import { Reveal, Stagger, StaggerItem } from './Reveal'

const FEATURES = [
  'Allow',
  'Deny',
  'Ask',
  'Audit log',
  'YAML policy',
  'Fail-closed',
]

export function SolutionSection() {
  return (
    <section id="solution" className="bg-void px-5 pt-8 pb-4 sm:px-8 lg:px-16">
      <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-3 lg:items-center">
        <Reveal className="lg:sticky lg:top-32">
          <h2 className="font-display text-[28px] leading-[1.15] font-bold tracking-[-0.03em] text-white sm:text-[31px]">
            Write the rules once. may-i handles the rest.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-muted">
            YAML you can read, diff, and commit. First match wins. Keep a last rule that asks so
            anything new stops.
          </p>
          <p className="mt-4 text-[15px] font-medium text-white/80">
            We focus on the gate. You focus on the agent.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="flex justify-center lg:sticky lg:top-28">
          <LimeCube size={240} scrollTargetId="solution" />
        </Reveal>

        <Stagger className="flex flex-col gap-3.5" delay={0.07} delayChildren={0.12}>
          {FEATURES.map((item) => (
            <StaggerItem key={item}>
              <div className="flex items-center gap-2.5 text-[13px] font-bold tracking-[0.14em] text-white uppercase">
                <span className="text-acid">▸</span>
                {item}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
