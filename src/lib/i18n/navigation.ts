import { languages, type Locale } from './settings';

export function isLocale(value: string): value is Locale {
  return languages.includes(value as Locale);
}

export function localizedHref(href: string, locale: Locale): string {
  const url = new URL(href, 'https://www.febrate.com');
  const segments = url.pathname.split('/');
  if (isLocale(segments[1])) segments[1] = locale;
  else segments.splice(1, 0, locale);
  return segments.join('/') + url.search + url.hash;
}
