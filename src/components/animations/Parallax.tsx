'use client'

import { useRef, type ReactNode, type CSSProperties, useSyncExternalStore } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useSpring,
} from 'framer-motion'

const emptySubscribe = () => () => {}

function getIsTouchDevice() {
  if (typeof window === 'undefined') return false
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

interface ParallaxProps {
  children: ReactNode
  speed?: number
  className?: string
  style?: CSSProperties
  disabled?: boolean
}

/**
 * Parallax - Wrapper component for parallax scroll effects
 *
 * @param children - Content to apply parallax effect to
 * @param speed - Parallax speed multiplier (negative = slower/opposite, positive = faster)
 *               Range: -1 to 1 recommended. 0 = no effect
 * @param className - Additional CSS classes
 * @param style - Inline styles
 * @param disabled - Force disable parallax effect
 *
 * @example
 * ```tsx
 * <Parallax speed={-0.3}>
 *   <img src="/hero-bg.jpg" alt="Background" />
 * </Parallax>
 * ```
 *
 * @example Faster parallax
 * ```tsx
 * <Parallax speed={0.5}>
 *   <div className="floating-element">Float faster</div>
 * </Parallax>
 * ```
 */
export function Parallax({
  children,
  speed = -0.2,
  className,
  style,
  disabled = false,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
  
  const isTouchDevice = useSyncExternalStore(
    emptySubscribe,
    getIsTouchDevice,
    () => false
  )

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const baseRange = 100 * speed
  const y = useTransform(scrollYProgress, [0, 1], [baseRange, -baseRange])

  const smoothY = useSpring(y, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const shouldDisable =
    disabled || prefersReducedMotion || (isTouchDevice && Math.abs(speed) > 0.3)

  if (!isMounted) {
    return (
      <div ref={ref} className={className} style={style}>
        {children}
      </div>
    )
  }

  if (shouldDisable) {
    return (
      <div ref={ref} className={className} style={style}>
        {children}
      </div>
    )
  }

  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden', ...style }}>
      <motion.div
        style={{
          y: smoothY,
          willChange: 'transform',
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

interface ParallaxLayerProps {
  children: ReactNode
  speed?: number
  className?: string
  style?: CSSProperties
}

/**
 * ParallaxLayer - For creating layered parallax effects
 * Use multiple layers with different speeds for depth effect
 *
 * @param children - Layer content
 * @param speed - Layer speed (further layers should have smaller absolute values)
 * @param className - Additional CSS classes
 * @param style - Inline styles
 *
 * @example
 * ```tsx
 * <div className="relative">
 *   <ParallaxLayer speed={-0.1} className="absolute inset-0 -z-10">
 *     <img src="/bg-far.jpg" />
 *   </ParallaxLayer>
 *   <ParallaxLayer speed={-0.3} className="absolute inset-0 -z-5">
 *     <img src="/bg-mid.jpg" />
 *   </ParallaxLayer>
 *   <div>Foreground content</div>
 * </div>
 * ```
 */
export function ParallaxLayer({
  children,
  speed = -0.1,
  className,
  style,
}: ParallaxLayerProps) {
  return (
    <Parallax speed={speed} className={className} style={style}>
      {children}
    </Parallax>
  )
}
