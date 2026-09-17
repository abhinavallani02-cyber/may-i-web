import { Hexagon } from 'lucide-react'
import { GITHUB_URL, NPM_URL } from '../lib/site'
import { Pill } from './Pill'

const COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'How it works', href: '#how-it-works' },
      { label: 'Policy', href: '#policy' },
      { label: 'Compare', href: '#compare' },
      { label: 'Trust', href: '#trust' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Limits', href: '#limits' },
      { label: 'FAQ', href: '#faq' },
      { label: 'GitHub', href: GITHUB_URL },
      { label: 'npm', href: NPM_URL },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-void px-5 py-16 text-white sm:px-8 lg:px-16">
      <div className="mx-auto max-w-6xl border-t border-white/10 pt-14">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_auto]">
          <div>
            <p className="font-display text-[28px] font-extrabold tracking-[0.16em] uppercase">
              may-i
            </p>
            <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-muted">
              A permission layer for AI agents. MIT. Local-only. Fail-closed.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-[11px] font-bold tracking-[0.16em] text-white/35 uppercase">
                {col.title}
              </p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                      className="text-[13px] text-white/70 transition-colors hover:text-acid"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="flex flex-col items-start gap-4 md:items-end">
            <Pill href="#install">
              <Hexagon size={13} strokeWidth={2.4} />
              Get started
            </Pill>
            <p className="text-[11px] tracking-[0.14em] text-white/30 uppercase md:text-right">
              In active development
              <br />
              Built by Abhinav Allani
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
