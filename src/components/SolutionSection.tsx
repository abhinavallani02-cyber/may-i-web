import { LimeCube } from './LimeCube'
import { Reveal } from './Reveal'

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
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-3">
        <Reveal>
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

        <Reveal delay={0.08} className="flex justify-center">
          <LimeCube size={240} scrollTargetId="solution" />
        </Reveal>

        <Reveal delay={0.12}>
          <ul className="flex flex-col gap-3.5">
            {FEATURES.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2.5 text-[13px] font-bold tracking-[0.14em] text-white uppercase"
              >
                <span className="text-acid">▸</span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
