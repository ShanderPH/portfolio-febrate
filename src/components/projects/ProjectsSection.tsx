import { getProjects } from '@/lib/projects'
import { ProjectsClient } from './ProjectsClient'
import type { ProjectTranslations } from './types'

import ptBR from '@/lib/i18n/translations/pt-BR/projects.json'
import en from '@/lib/i18n/translations/en/projects.json'
import es from '@/lib/i18n/translations/es/projects.json'

const translationsByLocale: Record<string, ProjectTranslations> = {
  'pt-BR': ptBR as unknown as ProjectTranslations,
  en: en as unknown as ProjectTranslations,
  es: es as unknown as ProjectTranslations,
}

interface ProjectsSectionProps {
  locale: string
}

export async function ProjectsSection({ locale }: ProjectsSectionProps) {
  const projects = await getProjects()
  const translations = translationsByLocale[locale] ?? translationsByLocale['pt-BR']

  return <ProjectsClient projects={projects} translations={translations} />
}
