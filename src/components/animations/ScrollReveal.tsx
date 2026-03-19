'use client'

import { useRef, type ReactNode, type CSSProperties } from 'react'
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from 'framer-motion'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

interface ScrollRevealProps {
  children: ReactNode
  direction?: Direction
  delay?: number
  duration?: number
  once?: boolean
  className?: string
  style?: CSSProperties
  amount?: number
  staggerChildren?: number
  staggerDirection?: 1 | -1
}

const directionOffsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 40 },
  down: { x: 0, y: -40 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
  none: { x: 0, y: 0 },
}

const mobileDirectionOffsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 24 },
  down: { x: 0, y: -24 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
  none: { x: 0, y: 0 },
}

/**
 * ScrollReveal - Wrapper component for scroll-triggered entrance animations
 *
 * @param children - Content to animate
 * @param direction - Animation entrance direction ('up' | 'down' | 'left' | 'right' | 'none')
 * @param delay - Animation delay in seconds
 * @param duration - Animation duration in seconds
 * @param once - Whether animation should only play once
 * @param className - Additional CSS classes
 * @param style - Inline styles
 * @param amount - Viewport amount required to trigger (0-1)
 * @param staggerChildren - Delay between staggered children animations
 * @param staggerDirection - Direction of stagger (1 = forward, -1 = reverse)
 *
 * @example
 * ```tsx
 * <ScrollReveal direction="up" delay={0.2}>
 *   <h1>Hello World</h1>
 * </ScrollReveal>
 * ```
 *
 * @example Staggered list
 * ```tsx
 * <ScrollReveal staggerChildren={0.1}>
 *   {items.map(item => (
 *     <ScrollReveal key={item.id} direction="up">
 *       <Card>{item.title}</Card>
 *     </ScrollReveal>
 *   ))}
 * </ScrollReveal>
 * ```
 */
export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  once = true,
  className,
  style,
  amount = 0.2,
  staggerChildren,
  staggerDirection = 1,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount })
  const prefersReducedMotion = useReducedMotion()

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const offsets = isMobile ? mobileDirectionOffsets : directionOffsets
  const offset = offsets[direction]

  const hidden = prefersReducedMotion
    ? { opacity: 0 }
    : {
        opacity: 0,
        x: offset.x,
        y: offset.y,
      }

  const visible = {
    opacity: 1,
    x: 0,
    y: 0,
  }

  const containerVariants: Variants | undefined = staggerChildren
    ? {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren,
            staggerDirection,
            delayChildren: delay,
          },
        },
      }
    : undefined

  const itemVariants: Variants = {
    hidden,
    visible: {
      ...visible,
      transition: {
        duration: prefersReducedMotion ? 0.01 : duration,
        delay: staggerChildren ? 0 : delay,
        ease: [0.32, 0.72, 0, 1] as const,
      },
    },
  }

  if (staggerChildren) {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={containerVariants}
        className={className}
        style={style}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={itemVariants}
      className={className}
      style={{
        willChange: isInView ? 'auto' : 'transform, opacity',
        ...style,
      }}
    >
      {children}
    </motion.div>
  )
}

interface ScrollRevealItemProps {
  children: ReactNode
  direction?: Direction
  className?: string
  style?: CSSProperties
}

/**
 * ScrollRevealItem - Child component for use within staggered ScrollReveal
 *
 * @param children - Content to animate
 * @param direction - Animation entrance direction
 * @param className - Additional CSS classes
 * @param style - Inline styles
 */
export function ScrollRevealItem({
  children,
  direction = 'up',
  className,
  style,
}: ScrollRevealItemProps) {
  const prefersReducedMotion = useReducedMotion()
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const offsets = isMobile ? mobileDirectionOffsets : directionOffsets
  const offset = offsets[direction]

  const itemVariants: Variants = {
    hidden: prefersReducedMotion
      ? { opacity: 0 }
      : {
          opacity: 0,
          x: offset.x,
          y: offset.y,
        },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.6,
        ease: [0.32, 0.72, 0, 1] as const,
      },
    },
  }

  return (
    <motion.div
      variants={itemVariants}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}
