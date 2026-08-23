import { Reveal } from './Reveal'
import { Badge } from './Badge'

const SHIPPED = [
  {
    title: 'v1.0.0 — first public release',
    body: 'Passthrough proxy, policy engine, allow/deny/ask verdicts, human approval at the terminal, append-only audit log. Published to npm as mayi-mcp.',
  },
  {
    title: 'Zero-config default',
    body: 'Runs with no policy file — reads pass, everything else asks. Clean error messages instead of stack traces on bad input.',
  },
  {
    title: 'Privacy default',
    body: 'Audit log records decisions only. Arguments are excluded unless explicitly enabled, and startup tells you which mode is active.',
  },
  {
    title: 'Path-prefix matching',
    body: 'Rules can match on argument paths, not just tool names — which is what makes "never touch /etc" expressible at all.',
  },
]

const BUGS = [
  {
    title: 'Hang on interrupt.',
    body: 'Registering a SIGINT handler suppresses Node’s default exit, so may-i caught the signal and then never left. Fixed with an explicit exit after killing the child.',
  },
  {
    title: 'Terminal input race.',
    body: 'The approval prompt held /dev/tty open from startup, competing with stdin for the same device on macOS and silently swallowing input. Fixed by opening the tty lazily, only while a prompt is live, and serializing concurrent prompts through a queue.',
  },
  {
    title: 'Invisible prompt.',
    body: 'The readline interface had an input stream but no output stream, so the question was never rendered — the prompt was waiting for an answer to a question nobody could see. It timed out and denied, which is at least the right direction to fail in.',
  },
]

const NEXT = [
  {
    title: 'Session-scoped grants',
    body: 'Approve a pattern once for the next N minutes instead of answering the same question repeatedly.',
  },
  {
    title: 'Better prompt context',
    body: 'A diff preview for edits and a size indicator for writes, instead of raw argument dumps.',
  },
  {
    title: 'Structural argument matching',
    body: 'Real parsing per tool type, so an allow rule for SELECT can’t be walked past with a compound statement.',
  },
  {
    title: 'SSE and HTTP transports',
    body: 'stdio is the only one supported today.',
  },
  {
    title: 'Rule packs',
    body: 'Tested, maintained policies for common MCP servers, so a fresh install is useful immediately instead of after an hour of config.',
  },
]

const LIMITATIONS = [
  {
    title: 'Ask verdicts need a visible terminal.',
    body: "The approval prompt is written to /dev/tty, so it only appears if a human is watching the actual terminal running mayi.mjs. Driving may-i through an editor extension instead of a raw terminal — VS Code's Claude Code extension, for one — means the prompt renders nowhere in that UI and silently times out to deny after 30 seconds. Confirmed with a real write_file call that denied with no prompt visible anywhere. This is a design gap, not a bug: the approval flow assumes CLI usage. The real fix is surfacing the prompt through MCP's own elicitation/create request instead of the tty, so any client can render and answer it — not implemented yet.",
  },
]

export function ProgressSection() {
  return (
    <section id="progress" className="px-5 py-24 sm:px-8 md:px-12 md:py-32">
      <div className="mx-auto max-w-3xl">
        <Reveal delay={0}>
          <h2 className="text-4xl leading-[1.1] font-normal tracking-tight text-white drop-shadow-lg sm:text-5xl">
            Built in the open.
          </h2>
        </Reveal>

        <Reveal delay={120} className="mt-6 max-w-xl">
          <p className="text-sm leading-relaxed text-white/80 sm:text-base">
            may-i is new. Rather than a roadmap full of dates I can't promise, here's what's
            actually happened and what's actually next.
          </p>
        </Reveal>

        <Reveal delay={200} className="mt-14">
          <Badge>Shipped</Badge>
        </Reveal>
        <div className="mt-6 flex flex-col gap-4">
          {SHIPPED.map((item, i) => (
            <Reveal
              key={item.title}
              delay={260 + i * 90}
              className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-md"
            >
              <h3 className="text-sm font-medium text-white sm:text-base">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/70">{item.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-14">
          <Badge>Bugs found and fixed</Badge>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Listed because how a tool fails matters more than how it demos.
          </p>
        </Reveal>
        <div className="mt-6 flex flex-col gap-4">
          {BUGS.map((item, i) => (
            <Reveal
              key={item.title}
              delay={320 + i * 100}
              className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-md"
            >
              <h3 className="text-sm font-medium text-white sm:text-base">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/70">{item.body}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={620} className="mt-4">
          <p className="text-sm leading-relaxed text-white/60 italic">
            All three only appeared when the tool was run by a human in a real terminal. None
            showed up in isolated tests.
          </p>
        </Reveal>

        <Reveal delay={200} className="mt-14">
          <Badge>Next</Badge>
        </Reveal>
        <div className="mt-6 flex flex-col gap-4">
          {NEXT.map((item, i) => (
            <Reveal
              key={item.title}
              delay={280 + i * 90}
              className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-md"
            >
              <h3 className="text-sm font-medium text-white sm:text-base">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/70">{item.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-14">
          <Badge>Known limitations</Badge>
        </Reveal>
        <div className="mt-6 flex flex-col gap-4">
          {LIMITATIONS.map((item, i) => (
            <Reveal
              key={item.title}
              delay={280 + i * 90}
              className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-md"
            >
              <h3 className="text-sm font-medium text-white sm:text-base">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/70">{item.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-14">
          <Badge>Open</Badge>
          <p className="mt-4 text-sm leading-relaxed text-white/80 sm:text-base">
            Issues and pull requests welcome. Early bug reports are worth more than stars — if
            you run it and something breaks, that's the most useful thing you can send.
          </p>
          <a
            href="https://github.com/abhinavallani02-cyber/mayI"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block text-sm text-white underline underline-offset-2 hover:text-white/80"
          >
            github.com/abhinavallani02-cyber/may-i
          </a>
        </Reveal>
      </div>
    </section>
  )
}
