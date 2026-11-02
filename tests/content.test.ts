import { describe, expect, it } from 'vitest';
import pt from '../src/lib/i18n/translations/pt-BR/home.json';
import en from '../src/lib/i18n/translations/en/home.json';
import es from '../src/lib/i18n/translations/es/home.json';
import ptProjects from '../src/lib/i18n/translations/pt-BR/projects.json';
import enProjects from '../src/lib/i18n/translations/en/projects.json';
import esProjects from '../src/lib/i18n/translations/es/projects.json';
import { projectsConfig } from '../src/lib/projects.config';
import { buildScreenshotUrl } from '../src/lib/screenshot';
import { featuredProjectIds } from '../src/lib/portfolio/featured-projects';

function keys(value: unknown, prefix = ''): string[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return [prefix];
  return Object.entries(value).flatMap(([key, item]) => keys(item, `${prefix}.${key}`)).sort();
}
describe('authorial content contract', () => {
  it('preserves all three narrative acts in every language', () => {
    expect(keys(en)).toEqual(keys(pt));
    expect(keys(es)).toEqual(keys(pt));
    for (const home of [pt, en, es]) {
      expect(Object.values(home.hero.lines).every(line => line.length > 0)).toBe(true);
      expect(home.hero.lines.intro).toContain('Felipe Braat');
    }
  });
  it('retains JPM and translates every configured project', () => {
    expect(projectsConfig.some(project => project.id === 'jpm')).toBe(true);
    expect(featuredProjectIds).toContain('jpm');
    expect(featuredProjectIds.every(id => projectsConfig.some(project => project.id === id))).toBe(true);
    expect(new Set(projectsConfig.map(project => project.id)).size).toBe(projectsConfig.length);
    for (const dictionary of [ptProjects, enProjects, esProjects]) {
      for (const project of projectsConfig) {
        expect(dictionary.items).toHaveProperty(project.id);
      }
    }
  });
  it('encodes screenshot targets rather than sending an HTML URL to an image', () => {
    const target = 'https://www.jpmlda.com/?a=1&b=2';
    const url = new URL(buildScreenshotUrl(target));
    expect(url.hostname).toBe('api.microlink.io');
    expect(url.searchParams.get('url')).toBe(target);
    expect(url.searchParams.get('embed')).toBe('screenshot.url');
  });
});
