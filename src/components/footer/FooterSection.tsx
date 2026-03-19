'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion, useReducedMotion } from 'framer-motion'
import { Separator } from '@heroui/react'
import { useT } from '@/lib/i18n/client'
import { type Locale } from '@/lib/i18n/settings'

const LINKEDIN_URL = 'https://www.linkedin.com/in/felipebraat'
const GITHUB_URL = 'https://github.com/felipebraat'

const easeSmooth = [0.22, 1, 0.36, 1] as const

interface NavItem {
  labelKey: string
  href: string
}

const navItems: NavItem[] = [
  { labelKey: 'nav.home', href: '' },
  { labelKey: 'nav.about', href: 'about' },
  { labelKey: 'nav.projects', href: 'projects' },
  { labelKey: 'nav.contact', href: 'contact' },
]

function TextHoverEffect({ text, className }: { text: string; className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const [maskPosition, setMaskPosition] = useState({ cx: '50%', cy: '50%' })

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect()
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      })
    }
  }, [cursor])

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={`select-none uppercase cursor-pointer ${className ?? ''}`}
    >
      <defs>
        <linearGradient
          id="footerTextGradient"
          gradientUnits="userSpaceOnUse"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor="var(--earth-accent)" />
              <stop offset="25%" stopColor="var(--sage)" />
              <stop offset="50%" stopColor="var(--amber)" />
              <stop offset="75%" stopColor="var(--earth-accent-light)" />
              <stop offset="100%" stopColor="var(--terracotta)" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="footerRevealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: '50%', cy: '50%' }}
          animate={maskPosition}
          transition={{ duration: 0, ease: 'easeOut' }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="footerTextMask">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#footerRevealMask)" />
        </mask>
      </defs>

      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent font-[helvetica] text-7xl font-bold"
        style={{
          opacity: hovered ? 0.7 : 0,
          stroke: 'var(--muted)',
          transition: 'opacity 0.3s ease',
        }}
      >
        {text}
      </text>

      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent font-[helvetica] text-7xl font-bold"
        style={{ stroke: 'var(--accent)' }}
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{ strokeDashoffset: 0, strokeDasharray: 1000 }}
        transition={{ duration: 4, ease: 'easeInOut' }}
      >
        {text}
      </motion.text>

      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#footerTextGradient)"
        strokeWidth="0.3"
        mask="url(#footerTextMask)"
        className="fill-transparent font-[helvetica] text-7xl font-bold"
      >
        {text}
      </text>
    </svg>
  )
}

function FooterBackgroundGradient() {
  return (
    <div
      className="absolute inset-0 z-0"
      style={{
        background:
          'radial-gradient(125% 125% at 50% 10%, var(--background) 50%, var(--accent) 200%)',
        opacity: 0.15,
      }}
    />
  )
}

export function FooterSection() {
  const { t } = useT('common')
  const params = useParams()
  const locale = (params?.locale as Locale) || 'pt-BR'
  const prefersReducedMotion = useReducedMotion()
  const currentYear = new Date().getFullYear()

  const animProps = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.2 },
          transition: { duration: 0.6, delay, ease: easeSmooth },
        }

  return (
    <footer
      id="footer"
      className="relative w-full overflow-hidden bg-background pt-16 pb-8 sm:pt-24 sm:pb-12"
      aria-label="Footer"
    >
      <FooterBackgroundGradient />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div {...animProps(0)} className="mb-12 h-24 w-full sm:mb-16 sm:h-32">
          <TextHoverEffect text="FEBRATE" />
        </motion.div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
          <motion.div {...animProps(0.1)} className="space-y-4">
            <h3 className="text-lg font-bold text-foreground">Felipe Braat</h3>
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              {t('footer.tagline')}
            </p>
            <p className="text-xs text-muted/70">
              {t('footer.location')}
            </p>
          </motion.div>

          <motion.div {...animProps(0.2)} className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
              {t('footer.navigation')}
            </h4>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.labelKey}>
                    <Link
                      href={`/${locale}${item.href ? `/${item.href}` : ''}`}
                      className="text-sm text-muted transition-colors duration-200 hover:text-accent"
                    >
                      {t(item.labelKey as 'nav.home')}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>

          <motion.div {...animProps(0.3)} className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
              {t('footer.connect')}
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-sm text-muted transition-colors duration-200 hover:text-accent"
                aria-label="LinkedIn"
              >
                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                  LinkedIn
                </span>
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-sm text-muted transition-colors duration-200 hover:text-accent"
                aria-label="GitHub"
              >
                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                  GitHub
                </span>
              </a>
            </div>
          </motion.div>
        </div>

        <Separator className="my-8 sm:my-12" />

        <motion.div
          {...animProps(0.4)}
          className="flex flex-col items-center justify-between gap-4 sm:flex-row"
        >
          <p className="text-xs text-muted/70">
            © {currentYear} Felipe Braat. {t('footer.rights')}
          </p>
          <p className="text-xs text-muted/50">
            {t('footer.builtWith')}
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
