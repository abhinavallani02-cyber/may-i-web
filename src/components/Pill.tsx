import type { ReactNode } from 'react'

const variants = {
  acid:
    'bg-acid text-black hover:bg-[#e1ff4a] uppercase tracking-[0.16em] text-[11px] font-bold rounded-md',
  ghost:
    'bg-[#161616] text-white ring-1 ring-white/12 hover:bg-[#1e1e1e] uppercase tracking-[0.16em] text-[11px] font-bold rounded-md',
  outline:
    'bg-transparent text-ink ring-1 ring-black/15 hover:bg-black/[0.04] uppercase tracking-[0.16em] text-[11px] font-bold rounded-md',
} as const

export function Pill({
  href,
  children,
  variant = 'acid',
  className = '',
}: {
  href: string
  children: ReactNode
  variant?: keyof typeof variants
  className?: string
}) {
  const external = href.startsWith('http')

  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 transition-colors duration-200 ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  )
}
