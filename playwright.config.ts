import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  workers: 2,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL: 'http://127.0.0.1:3000', trace: 'retain-on-failure', screenshot: 'only-on-failure' },
  webServer: {
    command: 'node node_modules/next/dist/bin/next start --port 3000',
    env: { FEBRATE_DESIGN_REVIEW: 'true' },
    url: 'http://127.0.0.1:3000/pt-BR', reuseExistingServer: !process.env.CI, timeout: 120000,
  },
});
