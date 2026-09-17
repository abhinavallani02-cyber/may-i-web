import { Hexagon } from 'lucide-react'
import { GITHUB_URL, NPM_URL } from '../lib/site'
import { Pill } from './Pill'

export function Footer() {
  return (
    <footer className="bg-void px-5 py-16 text-white sm:px-8 lg:px-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 border-t border-white/10 pt-12 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-[28px] font-extrabold tracking-[0.16em] uppercase">may-i</p>
          <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-muted">
            A permission layer for AI agents. MIT. Local-only. Fail-closed.
          </p>
          <p className="mt-4 text-[11px] tracking-[0.14em] text-white/30 uppercase">
            In active development — built by Abhinav Allani
          </p>
        </div>
        <div className="flex flex-col items-start gap-5 sm:items-end">
          <Pill href="#install">
            <Hexagon size={13} strokeWidth={2.4} />
            Get started
          </Pill>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-[10px] font-bold tracking-[0.16em] uppercase">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="text-white/45 transition-colors hover:text-acid"
            >
              GitHub
            </a>
            <a
              href={NPM_URL}
              target="_blank"
              rel="noreferrer"
              className="text-white/45 transition-colors hover:text-acid"
            >
              npm
            </a>
            <a href="#policy" className="text-white/45 transition-colors hover:text-acid">
              Policy
            </a>
            <a href="#faq" className="text-white/45 transition-colors hover:text-acid">
              FAQ
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
