import { LimeCube } from './LimeCube'

const ROWS = [
  ['MCP', 'YAML', 'stdio', 'Claude', 'filesystem'],
  ['allow', 'deny', 'ask', 'audit log', 'fail-closed'],
  ['MIT', 'local-only', 'first match', 'elicitation', 'JSON-RPC'],
]

export function LogoStrip() {
  return (
    <section className="relative overflow-hidden bg-void pb-8 pt-2">
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="flex flex-col gap-7 py-10">
          {ROWS.map((row) => (
            <div key={row.join()} className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 sm:gap-x-14">
              {row.map((item) => (
                <span
                  key={item}
                  className="font-display text-[18px] font-bold tracking-[0.04em] text-white/28 uppercase sm:text-[22px]"
                >
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute right-[12%] bottom-[-40%] hidden lg:block">
          <LimeCube size={220} spin />
        </div>
      </div>
    </section>
  )
}
