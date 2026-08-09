import { Reveal } from './Reveal'

const POINTS = [
  {
    title: 'Rules stick.',
    body: "A built-in prompt asks you every time, and relies on you reading carefully at 2am. may-i lets you write never touch /prod once, and it holds forever without asking.",
  },
  {
    title: 'One policy, every agent.',
    body: "Built-in permissions protect one tool. Switch editors, add a second agent, write your own — you start over. may-i's policy file follows you across all of them.",
  },
  {
    title: "There's a record.",
    body: 'Approval clicks vanish when you close the terminal. may-i writes an append-only log you can search, diff, and hand to someone who asks.',
  },
  {
    title: "It's shareable.",
    body: "A policy file goes in your repo and everyone runs the same rules. A person's click history doesn't.",
  },
]

export function WhyNotManualSection() {
  return (
    <section className="px-5 py-24 sm:px-8 md:px-12 md:py-32">
      <div className="mx-auto max-w-3xl">
        <Reveal delay={0}>
          <h2 className="text-4xl leading-[1.1] font-normal tracking-tight text-white drop-shadow-lg sm:text-5xl">
            Your agent already asks.
            <br />
            Why add a layer?
          </h2>
        </Reveal>

        <Reveal delay={120} className="mt-6 max-w-xl">
          <p className="text-sm leading-relaxed text-white/80 sm:text-base">
            Fair question, and worth answering straight: several agent tools have built-in
            approval prompts, and for a solo developer using one tool, they cover a lot of the
            same ground.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/80 sm:text-base">
            Here's what's different.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {POINTS.map((p, i) => (
            <Reveal
              key={p.title}
              delay={220 + i * 110}
              className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-md"
            >
              <h3 className="text-base font-medium text-white sm:text-lg">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
