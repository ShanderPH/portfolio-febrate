'use client'

import { useEffect, useMemo, useState, useCallback, useRef, useSyncExternalStore } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  Cloud,
  fetchSimpleIcons,
  renderSimpleIcon,
  type ICloud,
  type SimpleIcon,
} from 'react-icon-cloud'
import { portfolioSkills } from '@/lib/portfolio/skills'

const SKILL_ICON_SLUGS = portfolioSkills.map(skill => skill.slug)

const cloudProps: Omit<ICloud, 'children'> = {
  containerProps: {
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      paddingTop: 20,
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: 'pointer',
    tooltip: 'native',
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: '#0000',
    maxSpeed: 0.04,
    minSpeed: 0.02,
  },
}

const easeSmooth = [0.22, 1, 0.36, 1] as const

type IconData = Awaited<ReturnType<typeof fetchSimpleIcons>>

interface SkillCardData {
  name: string
  slug: string
}

function renderCustomIcon(
  icon: SimpleIcon,
  isDark: boolean,
  onIconClick: (slug: string, name: string) => void,
) {
  const bgHex = isDark ? '#1a1510' : '#f5f0eb'
  const fallbackHex = isDark ? '#ffffff' : '#6e6e73'
  const minContrastRatio = isDark ? 2 : 1.2

  return renderSimpleIcon({
    icon,
    bgHex,
    fallbackHex,
    minContrastRatio,
    size: 42,
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: (e: React.MouseEvent) => {
        e.preventDefault()
        onIconClick(icon.slug, icon.title)
      },
    },
  })
}

function subscribeTheme(notify: () => void) {
  const observer = new MutationObserver(notify)
  observer.observe(document.documentElement, { subtree: true, attributes: true, attributeFilter: ['data-theme'] })
  return () => observer.disconnect()
}

export default function SkillCloud({ closeLabel }: { closeLabel: string }) {
  const prefersReducedMotion = useReducedMotion()
  const [data, setData] = useState<IconData | null>(null)
  const [iconsFailed, setIconsFailed] = useState(false)
  const isDark = useSyncExternalStore(subscribeTheme, () => document.querySelector('.authorial')?.getAttribute('data-theme') === 'dark', () => false)
  const [activeSkill, setActiveSkill] = useState<SkillCardData | null>(null)
  const container = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const lastTrigger = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    let intersecting = false
    const update = () => setVisible(intersecting && document.visibilityState === 'visible')
    const observer = new IntersectionObserver(entries => {
      intersecting = entries.some(entry => entry.isIntersecting)
      update()
    })
    if (container.current) observer.observe(container.current)
    document.addEventListener('visibilitychange', update)
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', update) }
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) return
    let alive = true
    fetchSimpleIcons({ slugs: SKILL_ICON_SLUGS }).then(value => {
      if (!alive) return
      setData(value)
      setIconsFailed(Object.keys(value.simpleIcons).length === 0)
    }).catch(() => { if (alive) setIconsFailed(true) })
    return () => { alive = false }
  }, [prefersReducedMotion])

  const handleIconClick = useCallback((slug: string, name: string) => {
    setActiveSkill((prev) => (prev?.slug === slug ? null : { slug, name }))
  }, [])

  const handleCloseCard = useCallback(() => {
    setActiveSkill(null)
    lastTrigger.current?.focus()
  }, [])

  const renderedIcons = useMemo(() => {
    if (!data) return null
    return Object.values(data.simpleIcons).map((icon) =>
      renderCustomIcon(icon, isDark, handleIconClick),
    )
  }, [data, isDark, handleIconClick])

  return (
    <div ref={container}>
      <div className="relative flex flex-col items-center justify-center">
          {!prefersReducedMotion && !iconsFailed && <div className="relative h-[350px] w-full max-w-[600px] sm:h-[420px]" aria-hidden="true">
            {renderedIcons && visible && (
              <Cloud {...cloudProps}>
                <>{renderedIcons}</>
              </Cloud>
            )}
          </div>}

          <AnimatePresence>
            {activeSkill && (
              <motion.div
                key={activeSkill.slug}
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.85, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 10 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: easeSmooth }}
                className="relative z-20 my-4"
              >
                <div className="flex items-center gap-3 rounded-xl bg-surface px-5 py-3 shadow-lg ring-1 ring-separator" role="status">
                  <span className="text-sm font-bold text-foreground sm:text-base">
                    {activeSkill.name}
                  </span>
                  <button
                    type="button"
                    onClick={handleCloseCard}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-default text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    aria-label={closeLabel}
                  >
                    <svg
                      className="size-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
      </div>
      <div className="author-skill-controls">{portfolioSkills.map(({ slug, name }) => <button type="button" key={slug} aria-pressed={activeSkill?.slug === slug} onClick={event => { lastTrigger.current = event.currentTarget; handleIconClick(slug, name) }}>{name}</button>)}</div>
    </div>
  )
}
