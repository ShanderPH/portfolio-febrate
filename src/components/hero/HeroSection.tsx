'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, useMotionValueEvent } from 'framer-motion'
import { Button } from '@heroui/react'
import { useT } from '@/lib/i18n/client'
import { MeshGradientBackground } from './MeshGradientBackground'
import { HeroMarquee } from './HeroMarquee'
import { TextBlockAnimation } from '@/components/animations'

interface HeroSectionProps {
  onCtaClick?: () => void
}

export function HeroSection({ onCtaClick }: HeroSectionProps) {
  const { t } = useT('home')
  const containerRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const [phase1Active, setPhase1Active] = useState(true)
  const [phase2Active, setPhase2Active] = useState(false)
  const [phase3Active, setPhase3Active] = useState(false)
  const [ctaVisible, setCtaVisible] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (prefersReducedMotion) return

    setPhase1Active(latest < 0.2)
    setPhase2Active(latest >= 0.2 && latest < 0.55)
    setPhase3Active(latest >= 0.55 && latest < 0.9)
    setCtaVisible(latest >= 0.7)
  })

  useEffect(() => {
    if (!prefersReducedMotion) {
      const timer = setTimeout(() => setPhase1Active(true), 100)
      return () => clearTimeout(timer)
    }
  }, [prefersReducedMotion])

  const phase1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0])
  const phase2Opacity = useTransform(scrollYProgress, [0.2, 0.28, 0.5, 0.58], [0, 1, 1, 0])
  const phase3Opacity = useTransform(scrollYProgress, [0.55, 0.63, 0.85, 0.93], [0, 1, 1, 0])
  const ctaOpacity = useTransform(scrollYProgress, [0.7, 0.78], [0, 1])
  const ctaY = useTransform(scrollYProgress, [0.7, 0.78], ['30px', '0px'])
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])

  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick()
    } else {
      const aboutSection = document.getElementById('about-section')
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <section
      ref={containerRef}
      className="relative w-full"
      style={{ height: '400vh' }}
      aria-label="Hero"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <MeshGradientBackground />

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-4xl mx-auto text-center">
            <motion.div
              style={{ opacity: prefersReducedMotion ? 1 : phase1Opacity }}
              className="absolute inset-0 flex items-center justify-center px-4"
            >
              <div className="w-full max-w-4xl mx-auto text-center">
                <TextBlockAnimation
                  trigger={phase1Active}
                  delay={0.3}
                  duration={0.6}
                  blockColor="var(--accent)"
                >
                  <h1 className="text-4xl font-black tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight">
                    {t('hero.lines.intro')}
                  </h1>
                </TextBlockAnimation>
              </div>
            </motion.div>

            <motion.div
              style={{ opacity: prefersReducedMotion ? 0 : phase2Opacity }}
              className="absolute inset-0 flex items-center justify-center px-4"
            >
              <div className="w-full max-w-3xl mx-auto space-y-6 sm:space-y-8">
                <TextBlockAnimation
                  trigger={phase2Active}
                  delay={0}
                  duration={0.5}
                  blockColor="var(--accent)"
                >
                  <h2 className="text-2xl font-bold text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
                    {t('hero.lines.notJust')}
                  </h2>
                </TextBlockAnimation>
                <TextBlockAnimation
                  trigger={phase2Active}
                  delay={0.15}
                  duration={0.5}
                  blockColor="var(--accent)"
                >
                  <p className="text-xl font-bold text-accent sm:text-2xl md:text-3xl lg:text-4xl">
                    {t('hero.lines.problemSolver')}
                  </p>
                </TextBlockAnimation>
              </div>
            </motion.div>

            <motion.div
              style={{ opacity: prefersReducedMotion ? 0 : phase3Opacity }}
              className="absolute inset-0 flex items-center justify-center px-4"
            >
              <div className="w-full max-w-3xl mx-auto space-y-8 sm:space-y-10">
                <TextBlockAnimation
                  trigger={phase3Active}
                  delay={0}
                  duration={0.5}
                  blockColor="var(--accent)"
                >
                  <div className="pl-4 sm:pl-6 border-l-2 border-accent text-left">
                    <p className="text-base italic text-muted sm:text-lg md:text-xl lg:text-2xl">
                      {t('hero.tagline')}
                    </p>
                  </div>
                </TextBlockAnimation>
                
                <motion.div
                  style={{
                    opacity: prefersReducedMotion ? 1 : ctaOpacity,
                    y: prefersReducedMotion ? 0 : ctaY,
                  }}
                  className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6 pt-4"
                >
                  <Button
                    size="lg"
                    onPress={handleCtaClick}
                    className="min-w-[200px] px-8 py-4 text-base font-medium sm:text-lg"
                    style={{ opacity: ctaVisible ? 1 : 0, transition: 'opacity 0.3s ease' }}
                  >
                    {t('hero.cta')}
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>

          <motion.div
            style={{ opacity: prefersReducedMotion ? 1 : scrollIndicatorOpacity }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 sm:bottom-16"
          >
            <ScrollIndicator label={t('hero.scrollIndicator')} />
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20">
          <HeroMarquee />
        </div>
      </div>
    </section>
  )
}

interface ScrollIndicatorProps {
  label: string
}

function ScrollIndicator({ label }: ScrollIndicatorProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <>
      <span className="text-xs font-medium uppercase tracking-widest text-muted/60 sm:text-sm">{label}</span>
      <motion.div
        className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-muted/40 p-1"
        aria-hidden="true"
      >
        <motion.div
          className="h-2 w-1 rounded-full bg-muted/60"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  y: [0, 12, 0],
                }
          }
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </>
  )
}
