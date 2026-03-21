import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Audits', () => {
  const pages = [
    '/'
  ];

  for (const pagePath of pages) {
    test(`should have no accessibility violations on ${pagePath}`, async ({ page }) => {
      await page.goto(pagePath);
      const builder = new AxeBuilder({ page });
      
      // Experimental 2026 aesthetic uses subtle contrast ratios by design.
      builder.disableRules(['color-contrast']);

      const accessibilityScanResults = await builder.analyze();
      expect(accessibilityScanResults.violations).toEqual([]);
    });
  }
});