'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { BentoGrid } from './BentoGrid'
import type { ProjectData } from '@/lib/projects'
import type { ProjectTranslations } from './types'

const easeSmooth = [0.22, 1, 0.36, 1] as const

interface ProjectsClientProps {
  projects: ProjectData[]
  translations: ProjectTranslations
}

export function ProjectsClient({ projects, translations: t }: ProjectsClientProps) {
  const prefersReducedMotion = useReducedMotion()

  const animProps = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.2 },
          transition: { duration: 0.7, delay, ease: easeSmooth },
        }

  return (
    <section
      id="projects-section"
      className="relative w-full bg-background py-24 sm:py-32 lg:py-40"
      aria-label={t.sectionLabel}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div {...animProps(0)} className="mb-12 sm:mb-16">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-muted sm:mb-8">
            {t.sectionLabel}
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {t.title}
          </h2>
          <p className="mt-4 max-w-2xl text-base text-muted sm:text-lg">
            {t.subtitle}
          </p>
        </motion.div>

        <BentoGrid projects={projects} translations={t} />
      </div>
    </section>
  )
}
