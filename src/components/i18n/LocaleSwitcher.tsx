'use client'

import { useParams, usePathname, useRouter } from 'next/navigation'
import { Button, Dropdown, Label } from '@heroui/react'
import { languages, cookieName, type Locale } from '@/lib/i18n/settings'
import { useT } from '@/lib/i18n/client'
import Image from 'next/image'

const localeConfig: Record<Locale, { flag: string; shortCode: string; name: string }> = {
  'pt-BR': { flag: '/flags/br.svg', shortCode: 'PT', name: 'Português' },
  en: { flag: '/flags/us.svg', shortCode: 'EN', name: 'English' },
  es: { flag: '/flags/es.svg', shortCode: 'ES', name: 'Español' },
}

export function LocaleSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const currentLocale = (params?.locale as Locale) || 'pt-BR'
  const { t } = useT('common')

  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale === currentLocale) return

    document.cookie = `${cookieName}=${newLocale};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`

    const segments = pathname.split('/')
    segments[1] = newLocale
    const newPath = segments.join('/')

    router.push(newPath)
    router.refresh()
  }

  const currentConfig = localeConfig[currentLocale]

  return (
    <Dropdown>
      <Button
        variant="secondary"
        aria-label={t('locale.switchTo')}
        className="gap-2 transition-all duration-300 ease-out-quart"
      >
        <Image
          src={currentConfig.flag}
          alt=""
          width={20}
          height={15}
          className="rounded-sm"
        />
        <span className="hidden sm:inline">{currentConfig.shortCode}</span>
        <svg
          className="size-4 text-muted"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Button>
      <Dropdown.Popover placement="bottom end" className="min-w-[160px]">
        <Dropdown.Menu
          selectionMode="single"
          selectedKeys={new Set([currentLocale])}
          onAction={(key) => handleLocaleChange(key as Locale)}
        >
          {languages.map((locale) => {
            const config = localeConfig[locale]
            return (
              <Dropdown.Item
                key={locale}
                id={locale}
                textValue={config.name}
              >
                <Dropdown.ItemIndicator />
                <div className="flex items-center gap-2">
                  <Image
                    src={config.flag}
                    alt=""
                    width={20}
                    height={15}
                    className="rounded-sm"
                  />
                  <Label>{config.name}</Label>
                </div>
              </Dropdown.Item>
            )
          })}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  )
}
