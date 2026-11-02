'use client';

import { localizedHref } from '@/lib/i18n/navigation';
import type { Locale } from '@/lib/i18n/settings';

export function LocaleLink({ locale, current, path }: { locale: Locale; current: Locale; path: string }) {
  return <a href={localizedHref(path, locale)} hrefLang={locale} lang={locale}
    aria-current={locale === current ? 'page' : undefined}
    className={locale === current ? 'is-current' : ''}
    onClick={event => { event.currentTarget.href = localizedHref(window.location.href, locale); }}>
    {locale === 'pt-BR' ? 'PT' : locale.toUpperCase()}
  </a>;
}
