'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Chip } from '@heroui/react'
import { motion } from 'framer-motion'
import { ProjectDetailModal } from './ProjectDetailModal'
import type { ProjectData } from '@/lib/projects'
import type { ProjectTranslations } from './types'

interface BentoGridProps {
  projects: ProjectData[]
  translations: ProjectTranslations
}

function BentoCard({
  project,
  translations: t,
  className,
  onSelect,
  index,
}: {
  project: ProjectData
  translations: ProjectTranslations
  className?: string
  onSelect: () => void
  index: number
}) {
  const isInternal = project.status === 'internal'
  const itemT = t.items[project.id]
  const title = itemT?.title ?? project.id
  const description = itemT?.description ?? ''

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-2xl border border-separator bg-surface transition-all duration-300 hover:border-accent/40 hover:shadow-lg ${className ?? ''}`}
    >
      <button
        type="button"
        onClick={onSelect}
        className="absolute inset-0 z-10"
        aria-label={`${t.overview}: ${title}`}
      />

      <div className="relative flex h-full flex-col">
        {project.screenshotUrl && (
          <div className="relative w-full shrink-0 overflow-hidden">
            <Image
              src={project.screenshotUrl}
              alt={title}
              fill
              unoptimized
              sizes="(min-width: 1024px) 60vw, (min-width: 768px) 70vw, 100vw"
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-surface via-surface/60 to-transparent" />
          </div>
        )}

        {!project.screenshotUrl && (
          <div
            className="relative flex aspect-video w-full shrink-0 items-center justify-center overflow-hidden"
            style={{ backgroundColor: project.accentColor ?? 'var(--default)' }}
          >
            <svg
              className="size-16 opacity-15"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
              />
            </svg>
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-surface via-surface/60 to-transparent" />
          </div>
        )}

        <div className="relative z-1 flex flex-1 flex-col gap-3 p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-bold leading-tight text-foreground sm:text-xl">
              {title}
            </h3>
            <div className="flex shrink-0 items-center gap-2">
              {project.stars > 0 && (
                <span className="flex items-center gap-1 text-xs text-muted">
                  <svg className="size-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  {project.stars}
                </span>
              )}
              {isInternal ? (
                <Chip size="sm" color="accent" variant="soft">
                  <svg className="mr-1 size-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                  </svg>
                  {t.internalProject}
                </Chip>
              ) : (
                <Chip size="sm" color="success" variant="soft">
                  Live
                </Chip>
              )}
            </div>
          </div>

          {isInternal && project.staticData && (
            <div className="flex gap-2">
              {project.staticData.highlights.map((h) => (
                <span
                  key={h}
                  className="rounded-md bg-accent/10 px-2 py-0.5 text-xs font-bold text-accent"
                >
                  {h}
                </span>
              ))}
            </div>
          )}

          <p className="line-clamp-3 text-sm leading-relaxed text-muted">
            {description}
          </p>

          <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {project.tags.slice(0, 4).map((tag) => (
              <Chip key={tag} size="sm" variant="soft" color="default">
                {tag}
              </Chip>
            ))}
            {project.tags.length > 4 && (
              <Chip size="sm" variant="soft" color="default">
                +{project.tags.length - 4}
              </Chip>
            )}
          </div>

          <div
            className="relative z-20 flex items-center gap-2 pt-3"
            onClick={(e) => e.stopPropagation()}
          >
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-separator px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-default"
              >
                <svg className="size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                {t.viewCode}
              </a>
            )}
            {project.liveUrl && !isInternal && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
              >
                <svg className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
                {t.viewProject}
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function BentoGrid({ projects, translations: t }: BentoGridProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null)

  const projectCountText = projects.length === 1
    ? t.projectCount_one.replace('{{count}}', '1')
    : t.projectCount_other.replace('{{count}}', String(projects.length))

  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  return (
    <div className="flex flex-col gap-8">
      <div className="grid auto-rows-auto grid-cols-1 gap-4 md:grid-cols-6">
        {featured[0] && (
          <BentoCard
            project={featured[0]}
            translations={t}
            index={0}
            className="md:col-span-4 [&_img]:aspect-16/10"
            onSelect={() => setSelectedProject(featured[0])}
          />
        )}
        {featured[1] && (
          <BentoCard
            project={featured[1]}
            translations={t}
            index={1}
            className="md:col-span-2 [&_img]:aspect-4/3"
            onSelect={() => setSelectedProject(featured[1])}
          />
        )}
        {featured[2] && (
          <BentoCard
            project={featured[2]}
            translations={t}
            index={2}
            className="md:col-span-3 [&_img]:aspect-video"
            onSelect={() => setSelectedProject(featured[2])}
          />
        )}
        {rest[0] && (
          <BentoCard
            project={rest[0]}
            translations={t}
            index={3}
            className="md:col-span-3 [&_img]:aspect-video"
            onSelect={() => setSelectedProject(rest[0])}
          />
        )}
        {rest.slice(1).map((project, i) => (
          <BentoCard
            key={project.id}
            project={project}
            translations={t}
            index={4 + i}
            className="md:col-span-3 [&_img]:aspect-video"
            onSelect={() => setSelectedProject(project)}
          />
        ))}
      </div>

      <div className="flex items-center justify-center">
        <Chip size="sm" variant="soft" color="default">
          {projectCountText}
        </Chip>
      </div>

      <ProjectDetailModal
        project={selectedProject}
        translations={t}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  )
}
