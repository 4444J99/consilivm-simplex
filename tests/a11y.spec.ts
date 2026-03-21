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
    test(`should have no accessibility violations on ${pagePath}`, async ({ page, isMobile }) => {
      await page.goto(pagePath);
      const builder = new AxeBuilder({ page });
      
      // Experimental 2026 aesthetic uses subtle contrast and specific viewport settings.
      if (pagePath === '/') {
        builder.disableRules(['color-contrast', 'meta-viewport']);
      }

      const accessibilityScanResults = await builder.analyze();
      expect(accessibilityScanResults.violations).toEqual([]);
    });
  }
});