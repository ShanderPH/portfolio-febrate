'use client'

import { I18nextProvider } from 'react-i18next'
import { createInstance, type Resource } from 'i18next'
import { initReactI18next } from 'react-i18next/initReactI18next'
import { getOptions, type Locale } from '@/lib/i18n/settings'

interface I18nProviderProps {
  children: React.ReactNode
  locale: Locale
  namespaces: string[]
  resources: Record<string, Record<string, unknown>>
}

export function I18nProvider({
  children,
  locale,
  namespaces,
  resources,
}: I18nProviderProps) {
  const i18nInstance = createInstance()

  i18nInstance.use(initReactI18next).init({
    ...getOptions(locale, namespaces),
    lng: locale,
    resources: resources as Resource,
    preload: [],
  })

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>
}
