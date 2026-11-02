import { languages, fallbackLng, type Locale } from '@/lib/i18n/settings';
import { getProjects } from '@/lib/projects';
import { PortfolioHome } from '@/components/portfolio/PortfolioHome';
import type { ProjectTranslations } from '@/components/projects/types';
import ptBR from '@/lib/i18n/translations/pt-BR/projects.json';
import en from '@/lib/i18n/translations/en/projects.json';
import es from '@/lib/i18n/translations/es/projects.json';
import '@/components/portfolio/portfolio.css';

const translations: Record<Locale, ProjectTranslations> = {
  'pt-BR': ptBR as ProjectTranslations,
  en: en as ProjectTranslations,
  es: es as ProjectTranslations,
};

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = languages.includes(rawLocale as Locale) ? rawLocale as Locale : fallbackLng;
  const projects = await getProjects();
  return <PortfolioHome locale={locale} projects={projects} translations={translations[locale]} />;
}
