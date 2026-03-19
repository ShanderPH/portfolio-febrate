'use client'

import { useEffect, useState } from 'react'
import i18next, { type FlatNamespace } from 'i18next'
import {
  initReactI18next,
  useTranslation as useTranslationOrg,
} from 'react-i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { useParams } from 'next/navigation'
import { getOptions, languages, fallbackLng, type Locale } from './settings'

const runsOnServerSide = typeof window === 'undefined'

i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`./translations/${language}/${namespace}.json`)
    )
  )

if (!i18next.isInitialized) {
  i18next.init({
    ...getOptions(),
    lng: undefined,
    detection: {
      order: ['path', 'htmlTag', 'cookie', 'navigator'],
    },
    preload: runsOnServerSide ? [...languages] : [],
  })
}

export function useT(ns: FlatNamespace | FlatNamespace[] = 'common') {
  const params = useParams()
  const lng = (params?.locale as Locale) || fallbackLng
  const [isReady, setIsReady] = useState(i18next.isInitialized)

  useEffect(() => {
    if (!i18next.isInitialized) {
      const handler = () => setIsReady(true)
      i18next.on('initialized', handler)
      return () => { i18next.off('initialized', handler) }
    }
  }, [])

  useEffect(() => {
    if (isReady && i18next.resolvedLanguage !== lng) {
      i18next.changeLanguage(lng)
    }
  }, [lng, isReady])

  return useTranslationOrg(ns)
}
