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
        </Reveal>

        <Reveal delay={150} className="flex flex-col gap-4 md:w-2/3">
          <p className="text-sm leading-relaxed text-white/80 sm:text-base">
            I'm a high school student who builds things — mostly at the intersection of AI and
            security. I made may-i because agents are getting the ability to take real actions
            faster than anyone is building the controls for them, and that gap seemed worth
            working on.
          </p>
          <p className="text-sm leading-relaxed text-white/80 sm:text-base">
            It's early and I'm learning in the open. If you use it and something breaks, tell me.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
