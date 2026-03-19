'use client'

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import Lenis from 'lenis'

interface SmoothScrollContextValue {
  lenis: Lenis | null
  scrollTo: (target: string | number | HTMLElement, options?: ScrollToOptions) => void
}

interface ScrollToOptions {
  offset?: number
  duration?: number
  immediate?: boolean
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  lenis: null,
  scrollTo: () => {},
})

/**
 * Hook to access Lenis instance and scroll utilities
 *
 * @returns SmoothScrollContextValue with lenis instance and scrollTo function
 *
 * @example
 * ```tsx
 * function ScrollButton() {
 *   const { scrollTo } = useSmoothScroll()
 *
 *   return (
 *     <button onClick={() => scrollTo('#contact', { offset: -100 })}>
 *       Go to Contact
 *     </button>
 *   )
 * }
 * ```
 */
export function useSmoothScroll() {
  return useContext(SmoothScrollContext)
}

interface SmoothScrollProviderProps {
  children: ReactNode
  enabled?: boolean
  options?: {
    duration?: number
    easing?: (t: number) => number
    smoothWheel?: boolean
    wheelMultiplier?: number
    touchMultiplier?: number
  }
}

/**
 * SmoothScrollProvider - Global smooth scroll wrapper using Lenis
 *
 * Provides smooth scrolling behavior across the entire application.
 * Automatically disabled on touch devices and when user prefers reduced motion.
 *
 * @param children - Application content
 * @param enabled - Enable/disable smooth scroll (default: true)
 * @param options - Lenis configuration options
 *
 * @example
 * ```tsx
 * // In your root layout
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <SmoothScrollProvider>
 *           {children}
 *         </SmoothScrollProvider>
 *       </body>
 *     </html>
 *   )
 * }
 * ```
 *
 * @example With custom options
 * ```tsx
 * <SmoothScrollProvider
 *   options={{
 *     duration: 1.2,
 *     wheelMultiplier: 1,
 *     smoothWheel: true,
 *   }}
 * >
 *   {children}
 * </SmoothScrollProvider>
 * ```
 */
export function SmoothScrollProvider({
  children,
  enabled = true,
  options = {},
}: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    if (!enabled) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0

    if (prefersReducedMotion || isTouchDevice) {
      return
    }

    const defaultEasing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))

    lenisRef.current = new Lenis({
      duration: options.duration ?? 1.2,
      easing: options.easing ?? defaultEasing,
      smoothWheel: options.smoothWheel ?? true,
      wheelMultiplier: options.wheelMultiplier ?? 1,
      touchMultiplier: options.touchMultiplier ?? 2,
    })

    setLenis(lenisRef.current)

    function raf(time: number) {
      lenisRef.current?.raf(time)
      requestAnimationFrame(raf)
    }

    const rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenisRef.current?.destroy()
      lenisRef.current = null
      setLenis(null)
    }
  }, [enabled, options.duration, options.easing, options.smoothWheel, options.wheelMultiplier, options.touchMultiplier])

  const scrollTo = (
    target: string | number | HTMLElement,
    scrollOptions?: ScrollToOptions
  ) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        offset: scrollOptions?.offset ?? 0,
        duration: scrollOptions?.duration,
        immediate: scrollOptions?.immediate ?? false,
      })
    } else {
      if (typeof target === 'string') {
        const element = document.querySelector(target)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      } else if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' })
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <SmoothScrollContext.Provider value={{ lenis, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  )
}
