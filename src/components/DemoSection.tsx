import { useState } from 'react'
import { Play } from 'lucide-react'
import { Reveal } from './Reveal'
import { Badge } from './Badge'

const DEMO_VIDEO_URL = '/demo.webm'

export function DemoSection() {
  const [videoAvailable, setVideoAvailable] = useState(true)

  return (
    <section id="demo" className="px-5 py-24 sm:px-8 md:px-12 md:py-32">
      <Reveal delay={0} className="mx-auto max-w-4xl text-center">
        <Badge className="mb-6 inline-block">See it run</Badge>
        <h2 className="mt-6 text-4xl leading-[1.1] font-normal tracking-tight text-white drop-shadow-lg sm:text-5xl">
          A write gets blocked.
          <br />
          You decide, out loud.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-sm text-white/70 sm:text-base">
          A real terminal session: an agent tries to write a file, may-i intercepts the call,
          and a human approves or denies it before anything happens.
        </p>
      </Reveal>

      <Reveal
        delay={150}
        className="mx-auto mt-12 aspect-video w-full max-w-4xl overflow-hidden rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md"
      >
        {videoAvailable ? (
          <video
            src={DEMO_VIDEO_URL}
            controls
            playsInline
            className="h-full w-full"
            onError={() => setVideoAvailable(false)}
          >
            Your browser doesn't support embedded video.
          </video>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/25 bg-white/10">
              <Play size={24} className="translate-x-0.5 text-white/70" />
            </div>
            <div>
              <p className="font-mono text-xs tracking-[0.1em] text-white/60 uppercase">
                Demo coming soon
              </p>
              <p className="mt-1 text-sm text-white/50">
                Drop a recording at <code className="text-white/70">/public/demo.webm</code> to
                fill this in.
              </p>
            </div>
          </div>
        )}
      </Reveal>
    </section>
  )
}
