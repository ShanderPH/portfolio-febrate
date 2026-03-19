import type { Metadata } from 'next'
import { languages, type Locale } from '@/lib/i18n/settings'
import { lexendDeca } from '@/lib/fonts'
import { serverSideTranslation } from '@/lib/i18n'
import { I18nProvider } from '@/components/i18n/I18nProvider'
import { Navbar } from '@/components/layout'
import '../globals.css'


export async function generateStaticParams() {
  return languages.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = localeParam as Locale
  const { t } = await serverSideTranslation(locale, ['common', 'home'])

  return {
    title: `Febrate Portfolio - ${t('nav.home')}`,
    description: t('hero.tagline', { ns: 'home' }),
  }
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale: localeParam } = await params
  const locale = localeParam as Locale
  const { resources } = await serverSideTranslation(locale, ['common', 'home'])

  return (
    <html lang={locale} dir="ltr" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme') || 'system';
                  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  const resolvedTheme = theme === 'system' ? systemTheme : theme;
                  document.documentElement.classList.add(resolvedTheme);
                  document.documentElement.setAttribute('data-theme', resolvedTheme);
                  document.documentElement.style.colorScheme = resolvedTheme;
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${lexendDeca.className} antialiased min-h-screen text-foreground`}
      >
        <I18nProvider locale={locale} namespaces={['common', 'home']} resources={resources}>
          <Navbar />
          <main id="main-content">
            {children}
          </main>
        </I18nProvider>
      </body>
    </html>
  )
}
