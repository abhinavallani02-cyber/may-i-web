import { motion } from 'motion/react'
import { LimeCube } from './LimeCube'
import { Stagger, StaggerItem } from './Reveal'

const ROWS = [
  ['MCP', 'YAML', 'stdio', 'Claude', 'filesystem'],
  ['allow', 'deny', 'ask', 'audit log', 'fail-closed'],
  ['MIT', 'local-only', 'first match', 'elicitation', 'JSON-RPC'],
]

export function LogoStrip() {
  return (
    <section className="relative overflow-hidden bg-void pb-16 pt-4">
      <div className="relative mx-auto max-w-5xl px-6 py-8">
        <Stagger className="flex flex-col gap-8" delay={0.05} delayChildren={0.02}>
          {ROWS.map((row) => (
            <StaggerItem key={row.join()}>
              <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 sm:gap-x-14">
                {row.map((item) => (
                  <span
                    key={item}
                    className="font-display text-[18px] font-bold tracking-[0.04em] text-white/28 uppercase sm:text-[22px]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <motion.div
          className="pointer-events-none absolute right-[8%] -bottom-10 hidden lg:block"
          aria-hidden="true"
        >
          <LimeCube size={200} drift />
        </motion.div>
      </div>
    </section>
  )
}
