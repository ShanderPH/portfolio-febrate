'use client'

import { useEffect, useMemo, useState, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  Cloud,
  fetchSimpleIcons,
  renderSimpleIcon,
  type ICloud,
  type SimpleIcon,
} from 'react-icon-cloud'
import { useT } from '@/lib/i18n/client'

const SKILL_ICON_SLUGS = [
  'typescript',
  'python',
  'javascript',
  'react',
  'nextdotjs',
  'nodedotjs',
  'tailwindcss',
  'postgresql',
  'supabase',
  'fastapi',
  'flask',
  'openai',
  'docker',
  'git',
  'github',
  'jira',
  'postman',
  'n8n',
  'hubspot',
  'googlesheets',
]

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

export function SkillsSection() {
  const { t } = useT('home')
  const prefersReducedMotion = useReducedMotion()
  const [data, setData] = useState<IconData | null>(null)
  const [isDark, setIsDark] = useState(false)
  const [activeSkill, setActiveSkill] = useState<SkillCardData | null>(null)

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    checkTheme()

    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    fetchSimpleIcons({ slugs: SKILL_ICON_SLUGS }).then(setData)
  }, [])

  const handleIconClick = useCallback((slug: string, name: string) => {
    setActiveSkill((prev) => (prev?.slug === slug ? null : { slug, name }))
  }, [])

  const handleCloseCard = useCallback(() => {
    setActiveSkill(null)
  }, [])

  const renderedIcons = useMemo(() => {
    if (!data) return null
    return Object.values(data.simpleIcons).map((icon) =>
      renderCustomIcon(icon, isDark, handleIconClick),
    )
  }, [data, isDark, handleIconClick])

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
      id="skills-section"
      className="relative w-full bg-background py-24 sm:py-32 lg:py-40"
      aria-label={t('skills.title')}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div {...animProps(0)} className="mb-12 text-center sm:mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {t('skills.title')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted sm:text-lg">
            {t('skills.subtitle')}
          </p>
        </motion.div>

        <motion.div
          {...animProps(0.2)}
          className="relative flex items-center justify-center"
        >
          <div className="relative h-[350px] w-full max-w-[600px] sm:h-[420px]">
            {renderedIcons && (
              <Cloud {...cloudProps}>
                <>{renderedIcons}</>
              </Cloud>
            )}
          </div>

          <AnimatePresence>
            {activeSkill && (
              <motion.div
                key={activeSkill.slug}
                initial={{ opacity: 0, scale: 0.85, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 10 }}
                transition={{ duration: 0.25, ease: easeSmooth }}
                className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 sm:bottom-8"
              >
                <div className="flex items-center gap-3 rounded-xl bg-surface px-5 py-3 shadow-lg ring-1 ring-separator">
                  <span className="text-sm font-bold text-foreground sm:text-base">
                    {activeSkill.name}
                  </span>
                  <button
                    type="button"
                    onClick={handleCloseCard}
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-default text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    aria-label="Close"
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
        </motion.div>
      </div>
    </section>
  )
}
