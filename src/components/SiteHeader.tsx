import { GITHUB_URL, NPM_URL } from '../lib/site'
import { Pill } from './Pill'

const NAV_LINKS = [
  { label: 'Product', href: '#how-it-works' },
  { label: 'Policy', href: '#policy' },
  { label: 'Compare', href: '#compare' },
  { label: 'Trust', href: '#trust' },
  { label: 'FAQ', href: '#faq' },
  { label: 'GitHub', href: GITHUB_URL },
  { label: 'npm', href: NPM_URL },
]

export function SiteHeader() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-start justify-between px-4 pt-4 sm:px-6 lg:px-8">
      <a
        href="#hero"
        className="pointer-events-auto font-display text-[22px] font-extrabold tracking-[0.18em] text-white uppercase"
      >
        may-i
      </a>

      <nav className="pointer-events-auto flex items-center gap-1 rounded-xl bg-[#1a1a1a] p-1.5 pl-3 shadow-[0_12px_40px_rgba(0,0,0,0.45)] sm:pl-4">
        <div className="hidden items-center gap-4 pr-3 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
              className="text-[10px] font-semibold tracking-[0.16em] text-white/55 uppercase transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>
        <Pill href="#install">Get started</Pill>
      </nav>
    </header>
  )
}
