import { describe, expect, it } from 'vitest';
import { NextRequest } from 'next/server';
import { proxy } from '../src/proxy';
import { localizedHref } from '../src/lib/i18n/navigation';

describe('locale routing', () => {
  it('keeps query and hash when changing languages', () => {
    expect(localizedHref('/pt-BR/concepts/matter?ref=work#projects-section', 'es'))
      .toBe('/es/concepts/matter?ref=work#projects-section');
  });
  it('ignores an invalid cookie and negotiates the browser language', () => {
    const result = proxy(new NextRequest('https://www.febrate.com/?ref=work', {
      headers: { cookie: 'NEXT_LOCALE=invalid', 'accept-language': 'es-ES,es;q=0.9' },
    }));
    expect(result.headers.get('location')).toBe('https://www.febrate.com/es/?ref=work');
  });
  it('honors a supported cookie before Accept-Language', () => {
    const result = proxy(new NextRequest('https://www.febrate.com/', {
      headers: { cookie: 'NEXT_LOCALE=en', 'accept-language': 'es' },
    }));
    expect(result.headers.get('location')).toBe('https://www.febrate.com/en/');
  });
  it.each(['pt-BR', 'en', 'es'])('does not redirect an already localized %s URL', locale => {
    const result = proxy(new NextRequest(`https://www.febrate.com/${locale}?ref=work`));
    expect(result.headers.get('location')).toBeNull();
    expect(result.cookies.get('NEXT_LOCALE')?.value).toBe(locale);
  });
});
