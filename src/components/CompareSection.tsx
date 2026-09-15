import { ArrowUpRight } from 'lucide-react'
import { Reveal } from './Reveal'

const PLANS = [
  {
    name: 'Built-in prompts',
    price: 'Already there',
    body: 'Fine for one agent, on your own machine, when the worst case is losing an afternoon. Every decision is a click in the moment.',
    points: ['No setup', 'One tool at a time', 'No searchable record'],
    href: '#faq',
    featured: false,
  },
  {
    name: 'may-i',
    price: 'A file you write once',
    body: 'Deny without asking. One policy for every MCP agent. An append-only log when someone asks what happened.',
    points: ['Blocks without a prompt', 'Shareable YAML', 'Fail closed by default'],
    href: '#install',
    featured: true,
  },
]

export function CompareSection() {
  return (
    <section id="compare" className="bg-charcoal px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      <Reveal>
        <h2 className="font-display mx-auto max-w-4xl text-center text-5xl leading-[0.95] font-extrabold tracking-[-0.045em] text-white sm:text-6xl lg:text-[72px]">
          Built-in is a prompt.
          <br />
          This is a policy.
        </h2>
      </Reveal>

      <div className="mx-auto mt-14 grid max-w-5xl gap-4 md:grid-cols-2">
        {PLANS.map((plan, i) => (
          <Reveal key={plan.name} delay={0.08 * i}>
            <a
              href={plan.href}
              className={`group flex h-full flex-col rounded-[28px] p-8 motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:-translate-y-1 ${
                plan.featured ? 'bg-white text-ink' : 'bg-white/[0.06] text-white ring-1 ring-white/10'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-3xl font-extrabold tracking-tight">{plan.name}</h3>
                  <p
                    className={`mt-1 text-sm font-semibold ${plan.featured ? 'text-ink/55' : 'text-white/50'}`}
                  >
                    {plan.price}
                  </p>
                </div>
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                    plan.featured
                      ? 'bg-black text-white group-hover:bg-neutral-800'
                      : 'bg-white/10 text-white group-hover:bg-white/20'
                  }`}
                >
                  <ArrowUpRight size={18} />
                </span>
              </div>
              <p
                className={`mt-6 text-[15px] leading-relaxed ${plan.featured ? 'text-ink/70' : 'text-white/65'}`}
              >
                {plan.body}
              </p>
              <ul className="mt-6 flex flex-col gap-2">
                {plan.points.map((point) => (
                  <li
                    key={point}
                    className={`text-[14px] ${plan.featured ? 'text-ink/80' : 'text-white/75'}`}
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
