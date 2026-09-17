import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'

export function LimeCube({
  label = 'MAY-I',
  size = 180,
  scrollTargetId,
  drift = false,
}: {
  label?: string
  size?: number
  scrollTargetId?: string
  drift?: boolean
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion() === true
  const fontSize = Math.round(size * 0.17)
  const radius = Math.round(size * 0.18)
  const extrude = Math.max(10, Math.round(size * 0.08))

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start end', 'end start'],
  })

  const rotateY = useSpring(useTransform(scrollYProgress, [0, 1], [-20, 26]), {
    stiffness: 70,
    damping: 22,
    mass: 0.6,
  })
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 1], [-8, -20]), {
    stiffness: 70,
    damping: 22,
    mass: 0.6,
  })
  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], [drift ? 70 : 28, drift ? -90 : -28]),
    { stiffness: 50, damping: 20, mass: 0.7 },
  )
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [0.94, 1.04]), {
    stiffness: 50,
    damping: 20,
  })

  return (
    <div
      ref={wrapRef}
      className="lime-cube-scene"
      style={{ width: size, height: size }}
      data-scroll-target={scrollTargetId}
    >
      <motion.div
        className="lime-cube flex items-center justify-center will-change-transform"
        style={{
          width: size,
          height: size,
          borderRadius: radius,
          background: 'linear-gradient(145deg, #f6ff9a 0%, #e5ff5d 42%, #d2ee4a 100%)',
          boxShadow: `${extrude}px ${extrude}px 0 #b8d030, 0 28px 50px rgba(0,0,0,0.32), 0 0 70px rgba(229,255,93,0.38)`,
          ...(reduce ? {} : { rotateX, rotateY, y, scale }),
        }}
      >
        <span
          className="font-display whitespace-nowrap font-bold text-black uppercase"
          style={{ fontSize, letterSpacing: '0.08em' }}
        >
          {label}
        </span>
      </motion.div>
    </div>
  )
}
