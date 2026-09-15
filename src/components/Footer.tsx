import { GITHUB_URL, NPM_URL } from '../lib/site'

export function Footer() {
  return (
    <footer className="bg-ink px-5 py-14 text-white sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-2xl font-extrabold tracking-tight">may-i</p>
          <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-white/50">
            A permission layer for AI agents. MIT. Local-only. Fail-closed.
          </p>
          <p className="mt-4 text-[13px] text-white/40">Built by Abhinav Allani.</p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-[14px] font-medium">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="text-white/70 transition-colors hover:text-white"
          >
            GitHub
          </a>
          <a
            href={NPM_URL}
            target="_blank"
            rel="noreferrer"
            className="text-white/70 transition-colors hover:text-white"
          >
            npm
          </a>
          <a href="#install" className="text-white/70 transition-colors hover:text-white">
            Install
          </a>
          <a href="#faq" className="text-white/70 transition-colors hover:text-white">
            FAQ
          </a>
        </div>
      </div>
    </footer>
  )
}
