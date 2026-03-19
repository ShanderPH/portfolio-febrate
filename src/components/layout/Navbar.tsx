'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { Button } from '@heroui/react'
import { useT } from '@/lib/i18n/client'
import { LocaleSwitcher } from '@/components/i18n/LocaleSwitcher'
import { ThemeSwitcher } from '@/app/components/theme-switcher'
import { type Locale } from '@/lib/i18n/settings'
import { useSmoothScroll } from '@/components/animations/SmoothScrollProvider'

type NavKey = 'nav.home' | 'nav.about' | 'nav.projects' | 'nav.contact'

interface NavLink {
  key: NavKey
  href: string
  sectionId: string
}

const navLinks: NavLink[] = [
  { key: 'nav.home', sectionId: 'main-content', href: '' },
  { key: 'nav.about', sectionId: 'about-section', href: 'about' },
  { key: 'nav.projects', sectionId: 'projects-section', href: 'projects' },
  { key: 'nav.contact', sectionId: 'footer', href: 'contact' },
]

/**
 * Navbar - Animated navigation bar with smooth scroll transform effect
 *
 * Transforms gradually from full-width transparent header to floating glass-effect
 * navigation bar as user scrolls, with smooth interpolated transitions.
 */
export function Navbar() {
  const { t } = useT('common')
  const params = useParams()
  const pathname = usePathname()
  const locale = (params?.locale as Locale) || 'pt-BR'
  
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('main-content')
  const { scrollTo } = useSmoothScroll()
  
  const { scrollY } = useScroll()
  
  const scrollProgress = useTransform(scrollY, [0, 100], [0, 1])
  const navPadding = useTransform(scrollProgress, [0, 1], [24, 12])
  const navPaddingX = useTransform(scrollProgress, [0, 1], [32, 24])
  const navBorderRadius = useTransform(scrollProgress, [0, 1], [0, 9999])
  const navMarginTop = useTransform(scrollProgress, [0, 1], [0, 16])
  const navMaxWidth = useTransform(scrollProgress, [0, 1], ['100%', '56rem'])
  const bgOpacity = useTransform(scrollProgress, [0, 1], [0, 0.85])
  const blurAmount = useTransform(scrollProgress, [0, 1], [0, 16])
  const shadowOpacity = useTransform(scrollProgress, [0, 1], [0, 1])
  
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 50)

    const sections = navLinks.map(l => l.sectionId)
    let current = sections[0]
    for (const id of sections) {
      const el = document.getElementById(id)
      if (el) {
        const rect = el.getBoundingClientRect()
        if (rect.top <= 120) current = id
      }
    }
    setActiveSection(current)
  })

  const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/`

  const isActiveLink = (link: NavLink) => {
    if (isHomePage) return activeSection === link.sectionId
    const fullPath = `/${locale}${link.href ? `/${link.href}` : ''}`
    return pathname === fullPath || (link.href === '' && pathname === `/${locale}`)
  }

  const handleNavClick = useCallback((e: React.MouseEvent, link: NavLink) => {
    if (isHomePage) {
      e.preventDefault()
      scrollTo(`#${link.sectionId}`, { offset: -80, duration: 1.2 })
    }
  }, [isHomePage, scrollTo])

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2 focus:bg-accent focus:text-accent-foreground focus:rounded-lg"
      >
        {t('accessibility.skipToContent')}
      </a>
      
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 px-4"
        initial={false}
      >
        <motion.nav
          className="mx-auto flex items-center justify-between"
          style={{
            paddingTop: navPadding,
            paddingBottom: navPadding,
            paddingLeft: navPaddingX,
            paddingRight: navPaddingX,
            borderRadius: navBorderRadius,
            marginTop: navMarginTop,
            maxWidth: navMaxWidth,
            backgroundColor: `color-mix(in oklch, var(--surface) calc(var(--bg-opacity) * 100%), transparent)`,
            backdropFilter: `blur(calc(var(--blur) * 1px))`,
            boxShadow: scrolled ? 'var(--overlay-shadow)' : 'none',
            // @ts-expect-error CSS custom properties
            '--bg-opacity': bgOpacity,
            '--blur': blurAmount,
            '--shadow-opacity': shadowOpacity,
          }}
          aria-label="Main navigation"
        >
          <Link
            href={`/${locale}`}
            className="text-xl font-bold text-foreground hover:text-accent transition-colors duration-200"
          >
            Febrate
          </Link>

          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.key}>
                <Link
                  href={isHomePage ? `#${link.sectionId}` : `/${locale}${link.href ? `/${link.href}` : ''}`}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                    ${isActiveLink(link)
                      ? 'bg-accent text-accent-foreground'
                      : 'text-foreground hover:bg-default hover:text-foreground'
                    }
                  `}
                >
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2">
              <LocaleSwitcher />
              <ThemeSwitcher />
            </div>
            
            <Button
              variant="secondary"
              isIconOnly
              className="md:hidden"
              onPress={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? t('accessibility.closeMenu') : t('accessibility.openMenu')}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <motion.svg
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {mobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
                )}
              </motion.svg>
            </Button>
          </div>
        </motion.nav>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            navLinks={navLinks}
            locale={locale}
            isHomePage={isHomePage}
            isActiveLink={isActiveLink}
            handleNavClick={handleNavClick}
            onClose={() => setMobileMenuOpen(false)}
            t={t}
          />
        )}
      </AnimatePresence>
    </>
  )
}

interface MobileMenuProps {
  navLinks: NavLink[]
  locale: Locale
  isHomePage: boolean
  isActiveLink: (link: NavLink) => boolean
  handleNavClick: (e: React.MouseEvent, link: NavLink) => void
  onClose: () => void
  t: ReturnType<typeof useT>['t']
}

function MobileMenu({ navLinks, locale, isHomePage, isActiveLink, handleNavClick, onClose, t }: MobileMenuProps) {
  return (
    <motion.div
      id="mobile-menu"
      className="fixed inset-0 z-40 md:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      
      <motion.nav
        className="absolute top-20 left-4 right-4 p-6 rounded-2xl bg-surface shadow-lg border border-separator"
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
        style={{ backdropFilter: 'blur(16px)' }}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <ul className="flex flex-col gap-2">
          {navLinks.map((link, index) => (
            <motion.li
              key={link.key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 + 0.1 }}
            >
              <Link
                href={isHomePage ? `#${link.sectionId}` : `/${locale}${link.href ? `/${link.href}` : ''}`}
                className={`
                  flex min-h-[44px] items-center rounded-xl px-4 py-3 text-base font-medium transition-all duration-200
                  ${isActiveLink(link)
                    ? 'bg-accent text-accent-foreground'
                    : 'text-foreground hover:bg-default'
                  }
                `}
                onClick={(e) => { handleNavClick(e, link); onClose() }}
              >
                {t(link.key)}
              </Link>
            </motion.li>
          ))}
        </ul>
        
        <motion.div
          className="mt-6 pt-6 border-t border-separator flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <LocaleSwitcher />
          <ThemeSwitcher />
        </motion.div>
      </motion.nav>
    </motion.div>
  )
}
