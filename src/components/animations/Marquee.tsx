'use client'

import {
  useRef,
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
  type CSSProperties,
} from 'react'

function getReducedMotionPreference() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function subscribeToReducedMotion(callback: () => void) {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  mediaQuery.addEventListener('change', callback)
  return () => mediaQuery.removeEventListener('change', callback)
}

type MarqueeDirection = 'left' | 'right'

interface MarqueeProps {
  children: ReactNode
  speed?: number
  direction?: MarqueeDirection
  pauseOnHover?: boolean
  className?: string
  style?: CSSProperties
  gap?: number
}

/**
 * Marquee - Infinite horizontal scrolling component
 *
 * Uses pure CSS animations for optimal performance (GPU-accelerated).
 * Automatically duplicates content for seamless looping.
 *
 * @param children - Content to scroll (will be duplicated for seamless loop)
 * @param speed - Animation speed in pixels per second (default: 50)
 * @param direction - Scroll direction ('left' | 'right')
 * @param pauseOnHover - Pause animation on hover
 * @param className - Additional CSS classes for the container
 * @param style - Inline styles for the container
 * @param gap - Gap between repeated items in pixels (default: 48)
 *
 * @example
 * ```tsx
 * <Marquee speed={60} pauseOnHover>
 *   <span>Item 1</span>
 *   <span>Item 2</span>
 *   <span>Item 3</span>
 * </Marquee>
 * ```
 *
 * @example With logos
 * ```tsx
 * <Marquee direction="right" speed={40}>
 *   {logos.map(logo => (
 *     <img key={logo.id} src={logo.src} alt={logo.name} />
 *   ))}
 * </Marquee>
 * ```
 */
export function Marquee({
  children,
  speed = 50,
  direction = 'left',
  pauseOnHover = false,
  className,
  style,
  gap = 48,
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [duration, setDuration] = useState(20)
  
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionPreference,
    () => false
  )

  useEffect(() => {
    if (contentRef.current) {
      const contentWidth = contentRef.current.scrollWidth
      const calculatedDuration = contentWidth / speed
      setDuration(calculatedDuration)
    }
  }, [speed, children])

  const animationDirection = direction === 'left' ? 'normal' : 'reverse'

  if (prefersReducedMotion) {
    return (
      <div
        ref={containerRef}
        className={className}
        style={{
          overflow: 'hidden',
          ...style,
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: `${gap}px`,
          }}
        >
          {children}
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        overflow: 'hidden',
        ...style,
      }}
    >
      <div
        className={pauseOnHover ? 'marquee-pause-on-hover' : undefined}
        style={{
          display: 'flex',
          width: 'max-content',
          animationName: 'marquee-scroll',
          animationDuration: `${duration}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationDirection,
        }}
      >
        <div
          ref={contentRef}
          style={{
            display: 'flex',
            gap: `${gap}px`,
            paddingRight: `${gap}px`,
          }}
        >
          {children}
        </div>
        <div
          aria-hidden="true"
          style={{
            display: 'flex',
            gap: `${gap}px`,
            paddingRight: `${gap}px`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

interface MarqueeItemProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

/**
 * MarqueeItem - Optional wrapper for marquee items with consistent styling
 *
 * @param children - Item content
 * @param className - Additional CSS classes
 * @param style - Inline styles
 */
export function MarqueeItem({ children, className, style }: MarqueeItemProps) {
  return (
    <div
      className={className}
      style={{
        flexShrink: 0,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
