import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Audits', () => {
  const pages = [
    '/',
    '/media.html',
    '/systems.html',
    '/consulting.html',
    '/archive.html',
    '/contact.html'
  ];

  for (const pagePath of pages) {
    test(`should have no accessibility violations on ${pagePath}`, async ({ page }) => {
      await page.goto(pagePath);
      const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
      expect(accessibilityScanResults.violations).toEqual([]);
    });
  }
});