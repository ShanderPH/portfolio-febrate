import type { Metadata } from 'next';
import { languages, fallbackLng, type Locale } from '@/lib/i18n/settings';
import { portfolioCopy } from '@/components/portfolio/portfolio-copy';
import '../globals.css';

const siteUrl = new URL('https://www.febrate.com');

export function generateStaticParams() {
  return languages.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = languages.includes(rawLocale as Locale) ? rawLocale as Locale : fallbackLng;
  const copy = portfolioCopy[locale];
  const title = `Felipe Braat | Software Engineer — Febrate`;
  return {
    metadataBase: siteUrl,
    title,
    description: copy.intro,
    applicationName: 'Febrate Portfolio',
    alternates: {
      canonical: `/${locale}`,
      languages: { 'pt-BR': '/pt-BR', en: '/en', es: '/es', 'x-default': '/pt-BR' },
    },
    openGraph: {
      type: 'website',
      title,
      description: copy.intro,
      locale: locale === 'pt-BR' ? 'pt_BR' : locale === 'es' ? 'es_ES' : 'en_US',
      siteName: 'Febrate',
      url: `/${locale}`,
    },
    twitter: { card: 'summary', title, description: copy.intro },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale: rawLocale } = await params;
  const locale = languages.includes(rawLocale as Locale) ? rawLocale as Locale : fallbackLng;
  return (
    <html lang={locale} dir="ltr">
      <body className="antialiased">
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
