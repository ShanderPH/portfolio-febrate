import { notFound } from 'next/navigation';
import { ComponentsDemo } from '@/app/components/components-demo';
import { LocaleSwitcher } from '@/components/i18n/LocaleSwitcher';
import { I18nProvider } from '@/components/i18n/I18nProvider';
import { dictionaries } from '@/lib/portfolio/dictionaries';
import { isLocale } from '@/lib/i18n/navigation';
import '@/styles/library.css';

export default async function Components({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <I18nProvider locale={locale} namespaces={['common', 'home', 'projects']} resources={{ [locale]: dictionaries[locale] }}>
    <div className="p-8 bg-background text-foreground min-h-screen"><h1 className="text-4xl mb-8">HeroUI — revisão de migração</h1><LocaleSwitcher/><ComponentsDemo/></div>
  </I18nProvider>;
}
