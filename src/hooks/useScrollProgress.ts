import { useEffect, useRef, useState } from 'react'

/**
 * Tracks scroll progress (0-1) across a target element's own height, the
 * way Kage drives its chapter scenes off scroll position rather than a
 * single enter/exit flag. Progress is 0 when the element's top is at the
 * viewport top and 1 once its bottom has scrolled past the viewport top --
 * i.e. it tracks scrolling *through* the element, not into/out of view.
 */
export function useScrollProgress<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function onScroll() {
      const node = ref.current
      if (!node) return
      const rect = node.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      if (total <= 0) {
        setProgress(rect.top <= 0 ? 1 : 0)
        return
      }
      const raw = -rect.top / total
      setProgress(Math.min(1, Math.max(0, raw)))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return { ref, progress }
}
