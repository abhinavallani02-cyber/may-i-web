import { useEffect, useRef, useState } from 'react'

/**
 * Reveals an element (translate-y-8 opacity-0 -> translate-y-0 opacity-100)
 * once it crosses 15% into the viewport. Returns a ref to attach to the
 * element and a boolean for the current visibility state.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.15 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return { ref, visible }
}

export function revealClasses(visible: boolean) {
  return visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
}
