'use client'

import { useRef, useLayoutEffect, useEffect, ReactNode, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface TextBlockAnimationProps {
  children: ReactNode
  animateOnScroll?: boolean
  trigger?: boolean
  delay?: number
  blockColor?: string
  duration?: number
  className?: string
  onAnimationComplete?: () => void
  direction?: 'in' | 'out'
}

export function TextBlockAnimation({
  children,
  animateOnScroll = false,
  trigger,
  delay = 0,
  blockColor = 'var(--accent)',
  duration = 0.5,
  className,
  onAnimationComplete,
  direction = 'in',
}: TextBlockAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const blockRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const hasAnimatedRef = useRef(false)

  const animateIn = useCallback(() => {
    if (!textRef.current || !blockRef.current) return

    const text = textRef.current
    const block = blockRef.current

    if (timelineRef.current) {
      timelineRef.current.kill()
    }

    gsap.set(text, { opacity: 0 })
    gsap.set(block, { scaleX: 0, transformOrigin: 'left center' })

    timelineRef.current = gsap.timeline({
      defaults: { ease: 'expo.inOut' },
      delay: delay,
      onComplete: onAnimationComplete,
    })

    timelineRef.current
      .to(block, {
        scaleX: 1,
        duration: duration,
        transformOrigin: 'left center',
      })
      .set(text, { opacity: 1 }, `<${duration * 0.5}`)
      .to(
        block,
        {
          scaleX: 0,
          duration: duration,
          transformOrigin: 'right center',
        },
        `<${duration * 0.4}`
      )
  }, [delay, duration, onAnimationComplete])

  const animateOut = useCallback(() => {
    if (!textRef.current || !blockRef.current) return

    const text = textRef.current
    const block = blockRef.current

    if (timelineRef.current) {
      timelineRef.current.kill()
    }

    gsap.set(block, { scaleX: 0, transformOrigin: 'right center' })

    timelineRef.current = gsap.timeline({
      defaults: { ease: 'expo.inOut' },
      onComplete: onAnimationComplete,
    })

    timelineRef.current
      .to(block, {
        scaleX: 1,
        duration: duration * 0.8,
        transformOrigin: 'right center',
      })
      .set(text, { opacity: 0 }, `<${duration * 0.4}`)
      .to(
        block,
        {
          scaleX: 0,
          duration: duration * 0.8,
          transformOrigin: 'left center',
        },
        `<${duration * 0.3}`
      )
  }, [duration, onAnimationComplete])

  useLayoutEffect(() => {
    if (!containerRef.current || !textRef.current || !blockRef.current) return

    if (animateOnScroll) {
      const ctx = gsap.context(() => {
        const text = textRef.current
        const block = blockRef.current

        gsap.set(text, { opacity: 0 })
        gsap.set(block, { scaleX: 0, transformOrigin: 'left center' })

        const tl = gsap.timeline({
          defaults: { ease: 'expo.inOut' },
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          delay: delay,
        })

        tl.to(block, {
          scaleX: 1,
          duration: duration,
          transformOrigin: 'left center',
        })
          .set(text, { opacity: 1 }, `<${duration * 0.5}`)
          .to(
            block,
            {
              scaleX: 0,
              duration: duration,
              transformOrigin: 'right center',
            },
            `<${duration * 0.4}`
          )

        timelineRef.current = tl
      }, containerRef)

      return () => ctx.revert()
    }
  }, [animateOnScroll, delay, duration])

  useEffect(() => {
    if (trigger === undefined || animateOnScroll) return

    if (trigger && !hasAnimatedRef.current) {
      hasAnimatedRef.current = true
      animateIn()
    } else if (!trigger && hasAnimatedRef.current && direction === 'out') {
      hasAnimatedRef.current = false
      animateOut()
    }
  }, [trigger, animateOnScroll, animateIn, animateOut, direction])

  return (
    <div ref={containerRef} className={`relative ${className || ''}`}>
      <div className="relative overflow-hidden">
        <div ref={textRef} style={{ opacity: trigger === undefined && !animateOnScroll ? 1 : 0 }}>
          {children}
        </div>
        <div
          ref={blockRef}
          className="absolute inset-0 z-10"
          style={{ backgroundColor: blockColor }}
        />
      </div>
    </div>
  )
}
