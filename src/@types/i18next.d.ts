import 'i18next'

import type commonPtBR from '@/lib/i18n/translations/pt-BR/common.json'
import type homePtBR from '@/lib/i18n/translations/pt-BR/home.json'
import type aboutPtBR from '@/lib/i18n/translations/pt-BR/about.json'
import type projectsPtBR from '@/lib/i18n/translations/pt-BR/projects.json'
import type contactPtBR from '@/lib/i18n/translations/pt-BR/contact.json'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common'
    resources: {
      common: typeof commonPtBR
      home: typeof homePtBR
      about: typeof aboutPtBR
      projects: typeof projectsPtBR
      contact: typeof contactPtBR
    }
  }
}
