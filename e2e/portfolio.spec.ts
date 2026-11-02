import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.beforeEach(async ({ page }) => {
  // External thumbnail failures are deliberate: identity and links must survive.
  await page.route('https://api.microlink.io/**', route => route.abort());
});

for (const locale of ['pt-BR', 'en', 'es']) {
  test(`active homepage ${locale}: SSR, metadata, filters and details`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`/${locale}`);
    await expect(page.locator('html')).toHaveAttribute('lang', locale);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', `https://www.febrate.com/${locale}`);
    await expect(page.locator('link[rel=alternate][hreflang]')).toHaveCount(4);
    const filters = page.locator('.author-filters button');
    await filters.nth(3).click();
    await expect(page.locator('.author-project')).toHaveCount(1);
    await filters.first().click();
    await expect(page.locator('.author-project')).toHaveCount(7);
    await page.locator('#work-jpm summary').click();
    await expect(page.locator('#work-jpm details')).toHaveAttribute('open', '');
    await expect(page.locator('#work-jpm details p').first()).toBeVisible();
    expect(errors).toEqual([]);
  });
  test(`Matéria ${locale}: original narrative and accessible case content`, async ({ page }) => {
    await page.goto(`/${locale}/concepts/matter`);
    await expect(page.locator('h1')).toContainText('Felipe Braat');
    await expect(page.locator('.author-act')).toHaveCount(3);
    await expect(page.locator('meta[name=robots]')).toHaveAttribute('content', /noindex/);
    await expect(page.locator('#work-jpm')).toBeAttached();
    await expect(page.locator('.author-project')).toHaveCount(7);
    await page.locator('#work-jpm summary').click();
    await expect(page.locator('#work-jpm details')).toHaveAttribute('open', '');
  });
}

for (const concept of ['matter', 'archive', 'atlas']) {
  for (const width of [360, 390, 768, 1024, 1440]) {
    test(`viewport ${width} ${concept}: layout and screenshot`, async ({ page }, testInfo) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`/pt-BR/concepts/${concept}`);
      await expect(page.locator('h1')).toBeVisible();
      await page.locator('.author-project-artwork img').first().waitFor();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      if (width < 1024) {
        await expect(page.locator('canvas')).toHaveCount(0);
        const summary = page.locator('.author-menu summary');
        await summary.click();
        await expect(page.locator('.author-menu')).toHaveAttribute('open', '');
        await page.keyboard.press('Escape');
        await expect(summary).toBeFocused();
        await expect(page.locator('.author-menu')).not.toHaveAttribute('open', '');
      }
      for (const artwork of await page.locator('.author-project-artwork img').all()) {
        await artwork.scrollIntoViewIfNeeded();
        await expect.poll(() => artwork.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: testInfo.outputPath(`${concept}-${width}.png`), fullPage: true, animations: 'disabled' });
    });
  }
  test(`${concept}: both themes meet automated accessibility checks`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(`/pt-BR/concepts/${concept}`);
    for (let theme = 0; theme < 2; theme++) {
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      expect(results.violations).toEqual([]);
      await page.locator('.author-theme').click();
    }
    await expect(page.locator('canvas')).toHaveCount(0);
    await expect(page.locator('.author-narrative.is-enhanced')).toHaveCount(0);
  });
}

test('theme persists and language switching preserves the current URL context', async ({ page }) => {
  await page.goto('/pt-BR/concepts/matter?ref=review#about-section');
  await page.locator('.author-theme').click();
  const selected = await page.locator('.authorial').getAttribute('data-theme');
  await page.reload();
  await expect(page.locator('.authorial')).toHaveAttribute('data-theme', selected!);
  await page.locator('.author-languages a[lang=en]').click();
  await expect(page).toHaveURL(/\/en\/concepts\/matter\?ref=review#about-section$/);
  await page.goBack();
  await expect(page).toHaveURL(/\/pt-BR\/concepts\/matter/);
});

test('SSR remains useful without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto('/pt-BR/concepts/matter');
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('.author-act').nth(1)).toBeVisible();
  await expect(page.locator('.author-act').nth(2)).toBeVisible();
  await page.locator('.author-menu summary').click();
  await expect(page.locator('.author-menu nav')).toBeVisible();
  await page.locator('#work-jpm summary').click();
  await expect(page.locator('#work-jpm details p').first()).toBeVisible();
  await expect(page.locator('#work-jpm a').first()).toHaveAttribute('href', 'https://www.jpmlda.com/');
  await page.goto('/pt-BR');
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('.author-project')).toHaveCount(7);
  await context.close();
});

test('header morph reverses; active section follows real anchors', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/pt-BR/concepts/matter');
  await page.evaluate(() => window.scrollTo(0, 150));
  await expect.poll(() => page.locator('.author-nav').evaluate(node => parseFloat(getComputedStyle(node).borderRadius))).toBeGreaterThan(40);
  await page.locator('.author-desktop-nav a[href="#projects-section"]').click();
  await expect(page.locator('.author-desktop-nav a[href="#projects-section"]')).toHaveAttribute('aria-current', 'location');
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect.poll(() => page.locator('.author-nav').evaluate(node => parseFloat(getComputedStyle(node).borderRadius))).toBe(0);
});

test('missing artwork and unavailable WebGL preserve usable content', async ({ page }) => {
  await page.route('**/images/projects/**', route => route.abort());
  await page.route('**/_next/image**', route => route.abort());
  await page.addInitScript(() => {
    const getContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, type: string, ...args: unknown[]) {
      if (type.includes('webgl')) return null;
      return getContext.call(this, type as '2d', ...args as []);
    } as typeof getContext;
  });
  await page.goto('/pt-BR/concepts/matter');
  await expect(page.locator('#work-jpm .author-project-placeholder')).toBeVisible();
  await expect(page.locator('#work-jpm a').first()).toBeVisible();
  await expect(page.locator('h1')).toBeVisible();
});

test('navigation tracks reverse scrolling from contact through skills and about', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/pt-BR');
  await page.locator('.author-desktop-nav a[href="#contact-section"]').click();
  await expect(page.locator('.author-desktop-nav a[href="#contact-section"]')).toHaveAttribute('aria-current', 'location');
  await page.locator('#skills-section').scrollIntoViewIfNeeded();
  await expect(page.locator('.author-desktop-nav a[href="#about-section"]')).toHaveAttribute('aria-current', 'location');
  await page.locator('.author-desktop-nav a[href="#projects-section"]').click();
  await expect(page.locator('.author-desktop-nav a[href="#projects-section"]')).toHaveAttribute('aria-current', 'location');
});

test('invalid locale returns 404 instead of fallback HTML', async ({ request }) => {
  expect((await request.get('/xx')).status()).toBe(404);
});

test('touch navigation moves focus to content and closes the disclosure on resize', async ({ browser }) => {
  const context = await browser.newContext({ hasTouch: true, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto('/pt-BR/concepts/matter');
  await page.locator('.author-menu summary').tap();
  await page.locator('.author-menu a[href="#projects-section"]').tap();
  await expect(page.locator('#projects-section')).toBeFocused();
  await expect(page.locator('.author-menu')).not.toHaveAttribute('open', '');
  await page.locator('.author-menu summary').tap();
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(page.locator('.author-menu')).not.toHaveAttribute('open', '');
  await context.close();
});

test('published homepage: optional skills stay usable when icon services fail', async ({ page }) => {
  await page.route(/^https:\/\//, route => route.abort());
  await page.goto('/pt-BR');
  await page.locator('.author-skill-experience summary').click();
  const skill = page.locator('.author-skill-controls button').filter({ hasText: /^TypeScript$/ });
  await skill.click();
  await expect(skill).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('status')).toContainText('TypeScript');
  await page.getByRole('button', { name: 'Fechar', exact: true }).click();
  await expect(skill).toBeFocused();
});

test('published homepage: marquee pause and reduced motion', async ({ page }) => {
  await page.goto('/pt-BR');
  const pause = page.getByRole('button', { name: 'Pausar animação' });
  await pause.click();
  await expect(page.getByRole('button', { name: 'Retomar animação' })).toHaveAttribute('aria-pressed', 'true');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.marquee-control')).toHaveCount(0);
  await expect(page.locator('canvas')).toHaveCount(0);
  await page.locator('.author-skill-experience summary').click();
  await expect(page.locator('.author-skill-controls button')).toHaveCount(20);
  await expect(page.locator('canvas')).toHaveCount(0);
});

test('published homepage meets automated accessibility checks with skills open', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/pt-BR');
  await expect(page.locator('.author-brand-reveal')).toHaveAccessibleName(/Febrate/);
  await page.locator('.author-skill-experience summary').click();
  await expect(page.locator('.author-skill-controls button')).toHaveCount(20);
  await page.locator('.author-skill-controls button').filter({ hasText: /^TypeScript$/ }).click();
  for (let theme = 0; theme < 2; theme++) {
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(results.violations).toEqual([]);
    await page.locator('.author-theme').click();
  }
});

test('HeroUI stable: keyboard dropdown and compound switches', async ({ page }) => {
  await page.goto('/pt-BR/concepts/components?ref=library');
  const trigger = page.getByRole('button', { name: 'Mudar idioma para' });
  await trigger.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('menu')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
  const control = page.getByRole('switch', { name: 'Dark Mode' });
  await control.focus();
  await page.keyboard.press('Space');
  await expect(control).toBeChecked();
  await trigger.click();
  await page.getByRole('menuitemradio', { name: 'English' }).click();
  await expect(page).toHaveURL(/\/en\/concepts\/components\?ref=library$/);
});
