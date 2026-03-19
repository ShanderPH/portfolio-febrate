import { type i18n, type TFunction, type FlatNamespace } from 'i18next'
import initI18next from './i18next'
import { fallbackLng, type Locale } from './settings'

export { fallbackLng, languages, defaultNS, cookieName, headerName } from './settings'
export type { Locale } from './settings'

type Namespace = FlatNamespace | FlatNamespace[]

interface ServerSideTranslationResult {
  t: TFunction
  i18n: i18n
  resources: Record<string, Record<string, unknown>>
}

export async function serverSideTranslation(
  locale: Locale | string,
  namespaces: Namespace = 'common'
): Promise<ServerSideTranslationResult> {
  const lng = (locale || fallbackLng) as Locale
  const ns = Array.isArray(namespaces) ? namespaces : [namespaces]
  
  const i18nInstance = await initI18next(lng, ns as string[])
  
  const resources: Record<string, Record<string, unknown>> = {}
  
  for (const namespace of ns) {
    if (!resources[lng]) {
      resources[lng] = {}
    }
    resources[lng][namespace] = i18nInstance.getResourceBundle(lng, namespace)
  }
  
  return {
    t: i18nInstance.getFixedT(lng, ns as FlatNamespace | FlatNamespace[]),
    i18n: i18nInstance,
    resources,
  }
}
