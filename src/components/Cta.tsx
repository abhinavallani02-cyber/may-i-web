import type { ReactNode } from 'react'
import { Hexagon } from 'lucide-react'

const sizes = {
  sm: 'h-9 rounded-lg px-3 text-[11px]',
  md: 'h-12 rounded-lg px-4 text-[12px]',
} as const

const variants = {
  acid: 'bg-acid text-black hover:bg-[#edff7a]',
  ghost: 'bg-[#1c1c1c] text-white hover:bg-[#252525]',
  nav: 'bg-acid text-black hover:bg-[#edff7a]',
} as const

export function Cta({
  href,
  children,
  variant = 'acid',
  size = 'md',
  mark = false,
  className = '',
}: {
  href: string
  children: ReactNode
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  mark?: boolean
  className?: string
}) {
  const external = href.startsWith('http')

  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className={`inline-flex items-center justify-center gap-2.5 font-bold tracking-[0.14em] uppercase transition-colors duration-200 ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {mark ? (
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-black">
          <Hexagon size={13} strokeWidth={2.6} className="text-acid" />
        </span>
      ) : null}
      {children}
    </a>
  )
}
