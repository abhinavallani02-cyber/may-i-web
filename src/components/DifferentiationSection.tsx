import { Check, X } from 'lucide-react'
import { Reveal } from './Reveal'

const POINTS = [
  {
    n: '1',
    title: 'Some things should never be a question',
    body: (
      <>
        A prompt asks. A rule decides.
        <br />
        <br />
        <code className="rounded bg-white/10 px-1.5 py-0.5 text-white">deny</code> means the call
        is blocked before it reaches the tool, with no prompt, no keystroke, and no chance to
        approve it by accident. Writes to <code className="rounded bg-white/10 px-1.5 py-0.5 text-white">/etc</code>,
        drops against production, anything you've already decided is never okay — those don't
        interrupt you and they don't depend on you being alert.
        <br />
        <br />
        This is the difference that matters most. Approval fatigue isn't solved by better
        prompts. It's solved by having fewer of them.
      </>
    ),
  },
  {
    n: '2',
    title: 'You decide once, not every time',
    body: (
      <>
        Built-in approval is a decision you make repeatedly, in the moment, under time pressure,
        with whatever context fits on one line.
        <br />
        <br />
        A policy file is a decision you make once, calmly, with the whole picture in front of
        you — and it holds. You can review it, diff it, and reason about it as a whole. You
        can't do any of that with a history of yes-clicks.
      </>
    ),
  },
  {
    n: '3',
    title: 'One policy, every agent',
    body: (
      <>
        Built-in permissions protect the tool that ships them. Add a second agent, switch
        editors, write something custom against the MCP spec — and you're configuring
        permissions again, differently, in a different place.
        <br />
        <br />
        may-i sits at the protocol layer, not inside any one product. The same policy file
        covers everything you run.
      </>
    ),
  },
  {
    n: '4',
    title: "There's a record",
    body: (
      <>
        Approval prompts aren't built to leave a searchable trail. If your agent's log doesn't
        keep one, there's no answer to "what did it actually do?" once the terminal closes.
        <br />
        <br />
        may-i writes an append-only log: timestamp, tool, verdict, in order. You can grep it,
        diff it across sessions, and hand it to whoever asks. Payloads stay out of it by
        default.
      </>
    ),
  },
]

const EARNS_ITS_PLACE = [
  'There’s something that should be blocked outright, not asked about',
  'You run more than one agent and want them under one set of rules',
  'Someone other than you might need to know what happened',
  'The same rules need to apply across a repo or a team',
]

const COMPARISON_ROWS = [
  { label: 'Blocks without asking', builtin: 'No — everything is a prompt', mayi: 'Yes, via deny rules', builtinOk: false, mayiOk: true },
  { label: 'Where rules live', builtin: 'In the moment, per click', mayi: 'A file you write once', builtinOk: false, mayiOk: true },
  { label: 'Scope', builtin: 'One tool', mayi: 'Any MCP agent', builtinOk: false, mayiOk: true },
  { label: 'Record kept', builtin: 'Not in a form you can search', mayi: 'Append-only log on disk', builtinOk: false, mayiOk: true },
  { label: 'Shareable', builtin: 'No', mayi: 'Commit the policy file', builtinOk: false, mayiOk: true },
  { label: 'Setup cost', builtin: 'None', mayi: 'A few minutes', builtinOk: true, mayiOk: false },
]

export function DifferentiationSection() {
  return (
    <section className="px-5 py-24 sm:px-8 md:px-12 md:py-32">
      <div className="mx-auto max-w-3xl">
        <Reveal delay={0}>
          <h2 className="text-4xl leading-[1.1] font-normal tracking-tight text-white drop-shadow-lg sm:text-5xl">
            Every agent asks now.
            <br />
            That's not the problem.
          </h2>
        </Reveal>

        <Reveal delay={120} className="mt-6 flex flex-col gap-4">
          <p className="text-sm leading-relaxed text-white/80 sm:text-base">
            Approval prompts have become standard. Most agent tools will stop and check with you
            before doing something destructive, and for a solo developer using one tool
            casually, that's often enough.
          </p>
          <p className="text-sm leading-relaxed text-white/80 sm:text-base">
            But prompting has a failure mode, and everyone who's used it knows what it is: you
            approve without reading. The tenth prompt of the afternoon gets a reflexive yes. The
            one at 2am gets a yes too. Prompting puts a human in the loop, and humans in the loop
            get tired.
          </p>
          <p className="text-sm leading-relaxed text-white/80 sm:text-base">
            may-i is built around a different idea — that most decisions shouldn't reach you at
            all.
          </p>
        </Reveal>

        <div className="mt-10 flex flex-col gap-6">
          {POINTS.map((p, i) => (
            <Reveal
              key={p.n}
              delay={220 + i * 100}
              className="flex gap-5 rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-md"
            >
              <span className="font-mono text-sm text-white/40">{p.n}</span>
              <div>
                <h3 className="text-base font-medium text-white sm:text-lg">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={640} className="mt-14">
          <h3 className="text-xl font-medium text-white sm:text-2xl">Where built-in is fine</h3>
          <p className="mt-4 text-sm leading-relaxed text-white/80 sm:text-base">
            Worth saying plainly, because a tool that claims to win everywhere isn't credible.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">
            If you use one agent, on your own machine, on projects where the worst case is
            losing an afternoon — the built-in prompt is fine and may-i is extra setup for
            little gain.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">
            may-i earns its place when at least one of these is true:
          </p>
          <ul className="mt-4 flex flex-col gap-2.5">
            {EARNS_ITS_PLACE.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-white/80">
                <Check size={16} className="mt-0.5 shrink-0 text-white/50" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={720} className="mt-14 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse overflow-hidden rounded-2xl border border-white/15 text-sm">
            <thead>
              <tr className="border-b border-white/15 bg-white/5">
                <th className="p-4 text-left font-medium text-white/50"></th>
                <th className="p-4 text-left font-medium text-white">Built-in approval</th>
                <th className="p-4 text-left font-medium text-white">may-i</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.label} className="border-b border-white/10 last:border-b-0">
                  <td className="p-4 text-white/60">{row.label}</td>
                  <td className="p-4 text-white/80">
                    <span className="flex items-center gap-2">
                      {row.builtinOk ? (
                        <Check size={14} className="shrink-0 text-white/50" />
                      ) : (
                        <X size={14} className="shrink-0 text-white/30" />
                      )}
                      {row.builtin}
                    </span>
                  </td>
                  <td className="p-4 text-white/80">
                    <span className="flex items-center gap-2">
                      {row.mayiOk ? (
                        <Check size={14} className="shrink-0 text-white/50" />
                      ) : (
                        <X size={14} className="shrink-0 text-white/30" />
                      )}
                      {row.mayi}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  )
}
