import { Quote } from 'lucide-react'
import { Reveal } from './Reveal'

export function ProblemSection() {
  return (
    <section className="px-5 py-24 sm:px-8 md:px-12 md:py-32">
      <div className="mx-auto max-w-3xl">
        <Reveal delay={0}>
          <h2 className="text-4xl leading-[1.1] font-normal tracking-tight text-white drop-shadow-lg sm:text-5xl">
            Agents stopped suggesting.
            <br />
            They started doing.
          </h2>
        </Reveal>

        <Reveal delay={120} className="mt-8 flex flex-col gap-4">
          <p className="text-sm leading-relaxed text-white/80 sm:text-base">
            An AI agent used to hand you a diff. Now it writes the file. It runs the query. It
            sends the message. It processes the refund.
          </p>
          <p className="text-sm leading-relaxed text-white/80 sm:text-base">
            That shift happened fast, and permissions didn't follow. When you connect an agent to
            a tool, you hand over the whole keyring — every file, every table, every endpoint.
            There's no way to say <em className="text-white not-italic">read but don't write</em>,
            or <em className="text-white not-italic">never touch production</em>, or{' '}
            <em className="text-white not-italic">ask me first if it's over two hundred dollars</em>.
          </p>
          <p className="text-sm leading-relaxed text-white/80 sm:text-base">
            So one of two things happens. Either you give the agent full access and hope, or you
            don't deploy it at all.
          </p>
          <p className="text-sm leading-relaxed text-white/80 sm:text-base">
            Most teams pick the second one. The capability is there; the controls aren't.
          </p>
        </Reveal>

        <Reveal
          delay={260}
          className="mt-10 flex gap-4 rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-md"
        >
          <Quote size={20} className="mt-1 shrink-0 text-white/30" />
          <p className="text-base leading-relaxed text-white/90 italic sm:text-lg">
            The blocker isn't whether the agent is smart enough. It's that nobody can say what
            it's allowed to do.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
