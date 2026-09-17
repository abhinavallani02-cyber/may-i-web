import { Cta } from './Cta'
import { GITHUB_URL } from '../lib/site'

const NAV_LINKS = [
  { label: 'Product', href: '#how-it-works' },
  { label: 'Policy', href: '#policy' },
  { label: 'Trust', href: '#trust' },
  { label: 'Docs', href: GITHUB_URL },
]

export function SiteHeader() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex h-[62px] items-center justify-between px-4 sm:px-6 lg:px-8">
      <a
        href="#hero"
        className="pointer-events-auto font-display text-[22px] font-bold tracking-[0.22em] text-white uppercase mix-blend-difference"
      >
        may-i
      </a>

      <nav className="pointer-events-auto flex items-center rounded-lg bg-[#1c1c1c] p-1 pl-3 shadow-[0_12px_40px_rgba(0,0,0,0.45)] sm:pl-4">
        <div className="hidden items-center gap-5 pr-4 md:flex">
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
        <Cta href="#install" variant="nav" size="sm">
          Get started
        </Cta>
      </nav>
    </header>
  )
}
