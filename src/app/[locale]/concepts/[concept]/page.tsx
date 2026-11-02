import { notFound } from 'next/navigation';
import { isLocale } from '@/lib/i18n/navigation';
import { dictionaries } from '@/lib/portfolio/dictionaries';
import { getProjects } from '@/lib/projects';
import { AuthorialShell } from '@/components/portfolio/AuthorialShell';
import { AuthorialNavbar } from '@/components/portfolio/AuthorialNavbar';
import { AuthorialContent } from '@/components/portfolio/AuthorialContent';
import { ConceptHero } from '@/components/portfolio/ConceptHero';

export default async function Concept({ params }: { params: Promise<{ locale: string; concept: string }> }) {
  const { locale, concept } = await params;
  if (!isLocale(locale) || !['matter', 'archive', 'atlas'].includes(concept)) notFound();
  const dictionary = dictionaries[locale];
  const projects = await getProjects();
  const { nav, accessibility } = dictionary.common;
  return <AuthorialShell concept={concept} themeLabel={dictionary.common.theme.toggle}>
    <AuthorialNavbar locale={locale} path={`/${locale}/concepts/${concept}`}
      labels={{ ...nav, open: accessibility.openMenu, skip: accessibility.skipToContent }} />
    <ConceptHero concept={concept} dictionary={dictionary} projects={projects} />
    <AuthorialContent dictionary={dictionary} projects={projects} />
  </AuthorialShell>;
}
