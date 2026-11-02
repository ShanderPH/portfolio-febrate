import type { Metadata } from 'next';
import { languages, fallbackLng, type Locale } from '@/lib/i18n/settings';
import { dictionaries } from '@/lib/portfolio/dictionaries';
import { lexendDeca } from '@/lib/fonts';
import '../globals.css';
import { notFound } from 'next/navigation';
import { isLocale } from '@/lib/i18n/navigation';

const siteUrl = new URL('https://www.febrate.com');

export function generateStaticParams() {
  return languages.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = languages.includes(rawLocale as Locale) ? rawLocale as Locale : fallbackLng;
  const copy = dictionaries[locale].home;
  const title = `Felipe Braat | ${copy.about.label} — Febrate`;
  return {
    metadataBase: siteUrl,
    title,
    description: copy.hero.tagline,
    applicationName: 'Febrate Portfolio',
    alternates: {
      canonical: `/${locale}`,
      languages: { 'pt-BR': '/pt-BR', en: '/en', es: '/es', 'x-default': '/pt-BR' },
    },
    openGraph: {
      type: 'website',
      title,
      description: copy.hero.tagline,
      locale: locale === 'pt-BR' ? 'pt_BR' : locale === 'es' ? 'es_ES' : 'en_US',
      siteName: 'Febrate',
      url: `/${locale}`,
      images: [{ url: '/images/febrate.png', alt: 'Felipe Braat' }],
    },
    twitter: { card: 'summary_large_image', title, description: copy.hero.tagline, images: ['/images/febrate.png'] },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = languages.includes(rawLocale as Locale) ? rawLocale as Locale : fallbackLng;
  return (
    <html lang={locale} dir="ltr">
      <body className={`${lexendDeca.variable} antialiased`}>
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
