import { Reveal } from './Reveal'
import { Badge } from './Badge'

export function AboutSection() {
  return (
    <section id="about" className="px-5 py-24 sm:px-8 md:px-12 md:py-32">
      <div className="mx-auto flex max-w-4xl flex-col gap-10 md:flex-row md:gap-16">
        <Reveal delay={0} className="md:w-1/3">
          <Badge>About</Badge>
          <h2 className="mt-6 text-3xl leading-[1.1] font-normal tracking-tight text-white drop-shadow-lg sm:text-4xl">
            Abhinav Allani
          </h2>
          <p className="mt-2 font-mono text-[11px] tracking-[0.15em] text-white/50 uppercase">
            Founder, may-i
          </p>
        </Reveal>

        <Reveal delay={150} className="flex flex-col gap-4 md:w-2/3">
          <p className="text-sm leading-relaxed text-white/80 sm:text-base">
            I'm a high school builder and aspiring AI/ML engineer focused on turning emerging
            technology into practical products. I've built projects across AI, education,
            automation, and cybersecurity, and I enjoy learning by building rather than just
            studying theory.
          </p>
          <p className="text-sm leading-relaxed text-white/80 sm:text-base">
            I'm particularly interested in AI agents, cybersecurity, and the infrastructure
            needed to make AI systems safe and reliable. I've worked with APIs, LLMs, automation
            workflows, Python, JavaScript, and cloud platforms, while continuously teaching
            myself new technologies.
          </p>
          <p className="text-sm leading-relaxed text-white/80 sm:text-base">
            I'm also a co-founder of SilentHelp, a privacy-focused digital wellness project, and
            the creator of Choose &amp; Rise, an education platform designed to help students
            make better decisions about their academic futures.
          </p>
          <p className="text-sm leading-relaxed text-white/80 sm:text-base">
            I built may-i because I'm excited about the intersection of AI agents and security. As
            agents gain the ability to take real actions, controlling what they can access and
            execute becomes increasingly important. I want to keep building it in the open, learn
            from anyone who uses it, and turn may-i into something developers can actually trust.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
