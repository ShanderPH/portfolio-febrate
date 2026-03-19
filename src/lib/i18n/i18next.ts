import { createInstance, i18n } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'
import { getOptions, type Locale } from './settings'

const initI18next = async (lng: Locale, ns: string | string[]): Promise<i18n> => {
  const i18nInstance = createInstance()
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`./translations/${language}/${namespace}.json`)
      )
    )
    .init(getOptions(lng, ns))
  return i18nInstance
}

export default initI18next
