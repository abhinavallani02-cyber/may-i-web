import type { ReactNode } from 'react'

const variants = {
  dark: 'bg-black text-white hover:bg-neutral-800',
  light: 'bg-white text-black hover:bg-white/90',
  ghost: 'bg-white/20 text-white ring-1 ring-white/30 hover:bg-white/30',
  outline: 'bg-transparent text-ink ring-1 ring-black/12 hover:bg-black/[0.04]',
} as const

export function Pill({
  href,
  children,
  variant = 'dark',
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
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-tight transition-colors duration-200 ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  )
}
