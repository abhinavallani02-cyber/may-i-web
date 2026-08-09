import { Hexagon } from 'lucide-react'
import { Reveal } from './Reveal'

const NAV_LINKS = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Quickstart', href: '#quickstart' },
  { label: 'Status', href: '#status' },
  { label: 'GitHub', href: 'https://github.com/abhinavallani02-cyber/mayI' },
]

export function Navbar() {
  return (
    <header
      className="border-b border-white/10 backdrop-blur-md"
      style={{
        background:
          'linear-gradient(180deg, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.8) 70%, rgba(10,10,10,0.6) 100%)',
      }}
    >
      <div className="flex items-center justify-between px-5 py-4 sm:px-8 md:px-12">
        <Reveal delay={0} className="flex items-center gap-2">
          <Hexagon size={24} strokeWidth={1.5} className="text-white" />
          <span className="text-lg font-medium tracking-tight text-white sm:text-xl">may-i</span>
        </Reveal>

        <nav className="hidden items-center gap-8 md:flex lg:gap-10">
          {NAV_LINKS.map((link, i) => (
            <Reveal key={link.label} delay={100 + i * 100} as="span">
              <a
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                className="flex items-center text-sm text-white/85 transition-colors duration-300 hover:text-white"
              >
                {link.label}
              </a>
            </Reveal>
          ))}
        </nav>

        <Reveal delay={500}>
          <a
            href="https://www.npmjs.com/package/mayi-mcp"
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-white/20 bg-white/15 px-4 py-2 text-xs text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/25 sm:px-5 sm:text-sm"
          >
            Install may-i
          </a>
        </Reveal>
      </div>
    </header>
  )
}
