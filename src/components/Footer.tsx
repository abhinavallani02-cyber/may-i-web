import { GITHUB_URL, NPM_URL } from '../lib/site'
import { Cta } from './Cta'
import { CopyCommand } from './CopyCommand'
import { LimeCube } from './LimeCube'

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
      { label: 'FAQ', href: '#faq' },
      { label: 'GitHub', href: GITHUB_URL },
      { label: 'npm', href: NPM_URL },
    ],
  },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-void px-5 pt-24 pb-10 text-white sm:px-8 lg:px-16">
      <div className="pointer-events-none absolute top-[-20%] right-[-8%] opacity-30" aria-hidden="true">
        <LimeCube size={420} spin />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <h2 className="font-display max-w-4xl text-[42px] leading-[0.9] font-bold tracking-[-0.045em] uppercase sm:text-[60px] lg:text-[73px]">
          Get started
          <br />
          with may-i
        </h2>
        <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
          Drop it on the path between your agent and a tool. MIT. Local-only. Fail-closed.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Cta href="#install" mark>
            Get started
          </Cta>
          <Cta href={GITHUB_URL} variant="ghost">
            GitHub
          </Cta>
        </div>
        <div className="mt-8 max-w-2xl">
          <CopyCommand />
        </div>

        <div className="mt-20 rounded-[20px] bg-[#0c0c0c] px-8 py-10 sm:px-10">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <p className="font-display text-[22px] font-bold tracking-[0.18em] uppercase">may-i</p>
              <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-muted">
                A permission layer for AI agents. In active development — built by Abhinav Allani.
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
          </div>
        </div>
      </div>
    </footer>
  )
}
