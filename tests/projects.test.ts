import { expect, it, vi } from 'vitest';
import { getProjects } from '../src/lib/projects';

it('keeps every configured project usable when GitHub is unavailable', async () => {
  vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
  const projects = await getProjects();
  expect(projects).toHaveLength(7);
  expect(projects.find(project => project.id === 'jpm')?.liveUrl).toBe('https://www.jpmlda.com/');
  expect(projects.every(project => project.githubUrl === null)).toBe(true);
});

it('does not serialize private metadata obtained with a token', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({
    private: true, stargazers_count: 42, language: 'Confidential', topics: ['private-topic'],
    html_url: 'https://github.com/private/repo', homepage: 'https://private.example', updated_at: 'private-date',
  }) }));
  const projects = await getProjects();
  expect(JSON.stringify(projects)).not.toContain('private-topic');
  expect(JSON.stringify(projects)).not.toContain('private-date');
  expect(projects.every(project => project.githubUrl === null && project.stars === 0)).toBe(true);
});
