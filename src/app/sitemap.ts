import type { MetadataRoute } from 'next';
import { languages } from '@/lib/i18n/settings';

const origin = 'https://www.febrate.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const alternates = {
    'pt-BR': `${origin}/pt-BR`,
    en: `${origin}/en`,
    es: `${origin}/es`,
  };

  return languages.map(locale => ({
    url: `${origin}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: locale === 'pt-BR' ? 1 : 0.8,
    alternates: { languages: { ...alternates, 'x-default': `${origin}/pt-BR` } },
  }));
}
