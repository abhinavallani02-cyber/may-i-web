import { useEffect, useRef } from 'react'
import * as AsciinemaPlayer from 'asciinema-player'
import 'asciinema-player/dist/bundle/asciinema-player.css'
import { Reveal } from './Reveal'
import { Badge } from './Badge'
import { useReveal } from '../hooks/useReveal'

const CAST_URL = '/demo.cast'

export function DemoSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { ref: revealRef, visible: inView } = useReveal<HTMLDivElement>()

  // Mount the player once the section scrolls into view, and start
  // playback immediately -- this is a real recorded terminal session
  // (asciinema), not a synthetic animation, so "plays on itself" here
  // means the actual captured mayi run starts without a click.
  useEffect(() => {
    if (!inView || !containerRef.current) return
    const player = AsciinemaPlayer.create(CAST_URL, containerRef.current, {
      autoPlay: true,
      preload: true,
      loop: true,
      theme: 'monokai',
      fit: 'width',
    })
    return () => player.dispose()
  }, [inView])

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
          A real terminal session, recorded with asciinema: an agent tries to write a file,
          may-i intercepts the call, and a human approves it before anything happens.
        </p>
      </Reveal>

      <Reveal
        delay={150}
        className="mx-auto mt-12 w-full max-w-4xl overflow-hidden rounded-2xl border border-white/15 bg-white/5 p-2 backdrop-blur-md"
      >
        <div ref={revealRef}>
          <div ref={containerRef} className="overflow-hidden rounded-xl" />
        </div>
      </Reveal>
    </section>
  )
}
