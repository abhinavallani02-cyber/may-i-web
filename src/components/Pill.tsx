import type { ReactNode } from 'react'

const variants = {
  acid:
    'bg-acid text-black hover:bg-[#d8ff33] rounded-lg uppercase tracking-[0.14em] text-[11px] font-bold',
  ghost:
    'bg-[#1a1a1a] text-white ring-1 ring-white/10 hover:bg-[#222] rounded-lg uppercase tracking-[0.14em] text-[11px] font-bold',
  outline:
    'bg-transparent text-ink ring-1 ring-black/15 hover:bg-black/[0.04] rounded-lg uppercase tracking-[0.14em] text-[11px] font-bold',
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
      className={`inline-flex items-center justify-center gap-2 px-3.5 py-2 transition-colors duration-200 ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  )
}
