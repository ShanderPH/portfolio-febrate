'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { useT } from '@/lib/i18n/client'

const LINKEDIN_URL = 'https://www.linkedin.com/in/felipebraat'

const easeSmooth = [0.22, 1, 0.36, 1] as const

interface HighlightItem {
  value: string
  labelKey: string
}

const highlights: HighlightItem[] = [
  { value: '48%', labelKey: 'about.highlights.responseTime' },
  { value: '350+', labelKey: 'about.highlights.hoursSaved' },
  { value: '3+', labelKey: 'about.highlights.experience' },
  { value: '98%', labelKey: 'about.highlights.csat' },
]

export function AboutSection() {
  const { t } = useT('home')
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
      id="about-section"
      className="relative w-full bg-background py-24 sm:py-32 lg:py-40"
      aria-label={t('about.label')}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div {...animProps(0)}>
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-muted sm:mb-8">
            {t('about.label')}
          </p>
        </motion.div>

        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:gap-16">
          <motion.div
            {...(prefersReducedMotion
              ? {}
              : {
                  initial: { opacity: 0, scale: 0.95, y: 30 },
                  whileInView: { opacity: 1, scale: 1, y: 0 },
                  viewport: { once: true, amount: 0.2 },
                  transition: { duration: 0.7, delay: 0.15, ease: easeSmooth },
                })}
            className="relative h-[420px] w-[320px] shrink-0 overflow-hidden rounded-2xl sm:h-[500px] sm:w-[360px]"
          >
            <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-t from-black/25 via-transparent to-transparent" />
            <Image
              src="/images/febrate.png"
              alt={`${t('about.firstName')} ${t('about.lastName')}`}
              fill
              sizes="(max-width: 640px) 320px, 360px"
              className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105"
              priority
            />
          </motion.div>

          <motion.div
            {...(prefersReducedMotion
              ? {}
              : {
                  initial: { opacity: 0, x: 40 },
                  whileInView: { opacity: 1, x: 0 },
                  viewport: { once: true, amount: 0.2 },
                  transition: { duration: 0.6, delay: 0.3, ease: easeSmooth },
                })}
            className="flex flex-1 flex-col gap-10 lg:gap-14"
          >
            <div>
              <h2 className="text-4xl leading-[1.1] font-light tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {t('about.firstName')}
                <br />
                <span className="font-bold">{t('about.lastName')}</span>
              </h2>
            </div>

            <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10">
              <motion.div
                whileHover={prefersReducedMotion ? {} : { scale: 1.08 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                className="shrink-0"
              >
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-16 w-16 items-center justify-center rounded-full border border-muted/30 bg-transparent text-muted transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-accent-foreground sm:h-20 sm:w-20"
                  aria-label={t('about.cta')}
                >
                  <svg
                    className="size-5 transition-transform duration-300 group-hover:-rotate-45 sm:size-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </motion.div>

              <div className="max-w-md">
                <p className="text-sm leading-[1.8] text-muted sm:text-base">
                  {t('about.description')}
                </p>
              </div>
            </div>

            <motion.div
              {...animProps(0.5)}
              className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6"
            >
              {highlights.map((item, index) => (
                <motion.div
                  key={item.labelKey}
                  {...(prefersReducedMotion
                    ? {}
                    : {
                        initial: { opacity: 0, y: 20 },
                        whileInView: { opacity: 1, y: 0 },
                        viewport: { once: true },
                        transition: {
                          duration: 0.5,
                          delay: 0.6 + index * 0.1,
                          ease: easeSmooth,
                        },
                      })}
                  className="group relative overflow-hidden rounded-xl bg-surface/50 p-4 transition-all duration-300 hover:bg-surface/80 sm:p-5"
                >
                  <div className="absolute inset-0 -z-10 bg-linear-to-br from-accent/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="text-2xl font-bold text-accent sm:text-3xl">
                    {item.value}
                  </span>
                  <p className="mt-1 text-xs font-medium text-muted sm:text-sm">
                    {t(item.labelKey as 'about.highlights.responseTime')}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
