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
    <header className="sticky top-0 z-50 bg-white">
      <div className="flex min-h-10 items-center justify-center border-b border-black/[0.06] px-4 py-2 text-center">
        <p className="text-[12px] leading-none text-muted sm:text-[13px]">
          In active development — expect rough edges.{' '}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-ink underline decoration-black/20 underline-offset-2 hover:decoration-black/50"
          >
            Follow progress on GitHub
          </a>
        </p>
      </div>

      <div className="flex h-16 items-center justify-between px-5 sm:px-8 lg:px-12">
        <a href="#hero" className="flex items-center gap-2 text-ink">
          <Hexagon size={22} strokeWidth={1.8} />
          <span className="text-[17px] font-semibold tracking-tight">may-i</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex lg:gap-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[14px] font-medium text-ink/70 transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="text-[14px] font-medium text-ink/70 transition-colors hover:text-ink"
          >
            GitHub
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={NPM_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden text-[14px] font-medium text-ink/70 transition-colors hover:text-ink sm:inline"
          >
            npm
          </a>
          <Pill href="#install" className="!px-5 !py-2 text-[13px]">
            Install may-i
          </Pill>
        </div>
      </div>
    </header>
  )
}
