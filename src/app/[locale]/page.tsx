import { notFound } from 'next/navigation';
import { isLocale } from '@/lib/i18n/navigation';
import { getProjects } from '@/lib/projects';
import { dictionaries } from '@/lib/portfolio/dictionaries';
import { AuthorialShell } from '@/components/portfolio/AuthorialShell';
import { AuthorialNavbar } from '@/components/portfolio/AuthorialNavbar';
import { HeroNarrative } from '@/components/hero/HeroNarrative';
import { HeroMarquee } from '@/components/hero/HeroMarquee';
import { AuthorialContent } from '@/components/portfolio/AuthorialContent';
import '@/styles/authorial.css';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = dictionaries[locale];
  const projects = await getProjects();
  const { nav, accessibility } = dictionary.common;
  return <AuthorialShell concept="matter" themeLabel={dictionary.common.theme.toggle}>
    <AuthorialNavbar locale={locale} path={`/${locale}`}
      labels={{ ...nav, open: accessibility.openMenu, skip: accessibility.skipToContent }} />
    <HeroNarrative hero={dictionary.home.hero} />
    <HeroMarquee items={dictionary.home.hero.marqueeItems} pauseLabel={dictionary.home.hero.pause} resumeLabel={dictionary.home.hero.resume} />
    <AuthorialContent dictionary={dictionary} projects={projects} />
  </AuthorialShell>;
}
