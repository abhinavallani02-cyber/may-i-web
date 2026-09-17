import { LimeCube } from './LimeCube'

const ROWS = [
  ['MCP', 'YAML', 'stdio', 'Claude', 'filesystem'],
  ['allow', 'deny', 'ask', 'audit log', 'fail-closed'],
  ['MIT', 'local-only', 'first match', 'elicitation', 'JSON-RPC'],
]

export function LogoStrip() {
  return (
    <section className="relative overflow-hidden bg-void pb-16 pt-4">
      <div className="relative mx-auto max-w-5xl px-6 py-8">
        <div className="flex flex-col gap-8">
          {ROWS.map((row) => (
            <div
              key={row.join()}
              className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 sm:gap-x-14"
            >
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
        <div className="pointer-events-none absolute right-[8%] -bottom-10 hidden lg:block">
          <LimeCube size={200} />
        </div>
      </div>
    </section>
  )
}
