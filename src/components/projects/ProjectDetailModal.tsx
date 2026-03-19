'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { Chip, Button } from '@heroui/react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import type { ProjectData } from '@/lib/projects'
import type { ProjectTranslations } from './types'

const easeSmooth = [0.22, 1, 0.36, 1] as const

interface ProjectDetailModalProps {
  project: ProjectData | null
  translations: ProjectTranslations
  onClose: () => void
}

export function ProjectDetailModal({ project, translations: t, onClose }: ProjectDetailModalProps) {
  const prefersReducedMotion = useReducedMotion()
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!project) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  useEffect(() => {
    if (project && dialogRef.current) {
      dialogRef.current.focus()
    }
  }, [project])

  if (!project) return null

  const isInternal = project.status === 'internal'
  const itemT = t.items[project.id]
  const title = itemT?.title ?? project.id
  const longDescription = itemT?.longDescription ?? ''
  const stackDescription = itemT?.stackDescription ?? ''

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="modal-backdrop"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <motion.div
            ref={dialogRef}
            tabIndex={-1}
            key="modal-content"
            initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: easeSmooth }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-surface shadow-2xl ring-1 ring-separator"
          >
            {project.screenshotUrl && (
              <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-default">
                <Image
                  src={project.screenshotUrl}
                  alt={title}
                  fill
                  unoptimized
                  sizes="(min-width: 1024px) 672px, 100vw"
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-surface to-transparent" />
              </div>
            )}

            <div className="flex-1 overflow-y-auto p-6 sm:p-8">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                    {title}
                  </h2>
                  {project.language && (
                    <span className="mt-1 inline-block text-sm text-muted">
                      {project.language}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-default text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  aria-label={t.close}
                >
                  <svg className="size-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              {isInternal && project.staticData && (
                <div className="mb-4 flex flex-wrap gap-2">
                  <Chip size="sm" variant="soft" color="accent">
                    {project.staticData.year}
                  </Chip>
                  {project.staticData.highlights.map((h) => (
                    <Chip key={h} size="sm" variant="primary" color="accent">
                      {h}
                    </Chip>
                  ))}
                </div>
              )}

              <div className="mb-6">
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted">
                  {t.overview}
                </h3>
                <p className="text-sm leading-relaxed text-foreground/80">
                  {longDescription}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted">
                  {t.stack}
                </h3>
                <p className="mb-3 text-sm leading-relaxed text-foreground/80">
                  {stackDescription}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <Chip key={tag} size="sm" variant="soft" color="default">
                      {tag}
                    </Chip>
                  ))}
                </div>
              </div>

              {project.stars > 0 && (
                <div className="mb-6 flex items-center gap-3 rounded-lg bg-default/50 px-4 py-3">
                  <svg className="size-5 text-accent" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className="text-sm font-medium text-foreground">
                    {project.stars} stars on GitHub
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 border-t border-separator px-6 py-4 sm:px-8">
              {project.githubUrl && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="gap-1.5"
                  onPress={() => window.open(project.githubUrl!, '_blank', 'noopener,noreferrer')}
                >
                  <svg className="size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  {t.viewCode}
                </Button>
              )}
              {project.liveUrl && !isInternal && (
                <Button
                  size="sm"
                  variant="primary"
                  className="gap-1.5"
                  onPress={() => window.open(project.liveUrl!, '_blank', 'noopener,noreferrer')}
                >
                  <svg className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                  {t.viewProject}
                </Button>
              )}
              <div className="ml-auto">
                <Button
                  size="sm"
                  variant="ghost"
                  onPress={onClose}
                >
                  {t.close}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
