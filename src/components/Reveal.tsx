import type { ElementType, ReactNode } from 'react'
import { revealClasses, useReveal } from '../hooks/useReveal'

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
  as?: ElementType
}

/**
 * Wraps children in the standard fade-up reveal used throughout the page:
 * hidden -> translate-y-8 opacity-0, visible -> translate-y-0 opacity-100,
 * transition all 700ms ease-out, with a per-instance transition-delay.
 */
export function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>()

  return (
    <Tag
      ref={ref}
      className={`${revealClasses(visible)} ${className}`}
      style={{
        transitionProperty: 'all',
        transitionDuration: '700ms',
        transitionTimingFunction: 'ease-out',
        transitionDelay: `${delay}ms`,
        willChange: 'transform',
      }}
    >
      {children}
    </Tag>
  )
}
