import { Hexagon } from 'lucide-react'
import { GITHUB_URL, NPM_URL } from '../lib/site'
import { Pill } from './Pill'

const NAV_LINKS = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Policy', href: '#policy' },
  { label: 'Trust', href: '#trust' },
  { label: 'FAQ', href: '#faq' },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-void/80 backdrop-blur-md">
      <p className="border-b border-white/8 px-4 py-2 text-center text-[11px] tracking-[0.18em] text-white/40 uppercase">
        In active development — expect rough edges.{' '}
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className="text-white/70 underline decoration-white/20 underline-offset-4 hover:text-acid"
        >
          Follow on GitHub
        </a>
      </p>

      <div className="flex h-16 items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
        <a href="#hero" className="flex items-center gap-2 text-white">
          <Hexagon size={20} strokeWidth={2} className="text-acid" />
          <span className="font-display text-[15px] font-extrabold tracking-[0.18em] uppercase">
            may-i
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[11px] font-semibold tracking-[0.18em] text-white/55 uppercase transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="text-[11px] font-semibold tracking-[0.18em] text-white/55 uppercase transition-colors hover:text-white"
          >
            GitHub
          </a>
          <a
            href={NPM_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden text-[11px] font-semibold tracking-[0.18em] text-white/55 uppercase transition-colors hover:text-white lg:inline"
          >
            npm
          </a>
        </nav>

        <Pill href="#install" className="!px-3.5 !py-2">
          Install
        </Pill>
      </div>
    </header>
  )
}
