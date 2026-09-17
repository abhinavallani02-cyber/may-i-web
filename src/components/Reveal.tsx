import type { ReactNode } from 'react'
import { motion, useReducedMotion, type Variants } from 'motion/react'

export const EASE = [0.22, 1, 0.36, 1] as const

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: EASE },
  },
}

export function Reveal({
  children,
  className = '',
  delay = 0,
  y = 40,
  scale = 0.98,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  scale?: number
}) {
  const reduce = useReducedMotion() === true

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y, scale }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2, margin: '0px 0px -8% 0px' }}
      transition={{
        duration: reduce ? 0 : 0.8,
        delay: reduce ? 0 : delay,
        ease: EASE,
      }}
    >
      {children}
    </motion.div>
  )
}

export function Stagger({
  children,
  className = '',
  delay = 0.08,
  delayChildren = 0.04,
}: {
  children: ReactNode
  className?: string
  delay?: number
  delayChildren?: number
}) {
  const reduce = useReducedMotion() === true

  return (
    <motion.div
      className={className}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.18, margin: '0px 0px -6% 0px' }}
      variants={{
        hidden: {},
        show: {
          transition: reduce
            ? { duration: 0 }
            : { staggerChildren: delay, delayChildren },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const reduce = useReducedMotion() === true

  return (
    <motion.div
      className={className}
      variants={reduce ? undefined : revealItem}
    >
      {children}
    </motion.div>
  )
}
