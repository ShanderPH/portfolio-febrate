export const fallbackLng = 'pt-BR'
export const languages = ['pt-BR', 'en', 'es'] as const
export const defaultNS = 'common'
export const cookieName = 'NEXT_LOCALE'
export const headerName = 'x-i18next-current-language'

export type Locale = (typeof languages)[number]

export function getOptions(lng = fallbackLng, ns: string | string[] = defaultNS) {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns: Array.isArray(ns) ? ns : [ns],
  }
}
