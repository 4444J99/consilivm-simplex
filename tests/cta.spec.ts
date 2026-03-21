import { test, expect } from '@playwright/test';

test.describe('Call to Action (Push to Close)', () => {
  test('every section should have a CTA', async ({ page }) => {
    await page.goto('/');

    // Hero + Media + Systems + Advisory + Archive + Access form = 6
    const ctas = page.locator('.action-btn');
    await expect(ctas).toHaveCount(6);
  });

  test('form submit button should use authoritative language', async ({ page }) => {
    await page.goto('/');

    const button = page.locator('section#access button[type="submit"]');
    await expect(button).toHaveText(/Finalize Authorization/i);
  });

  test('all section CTAs should link to access form', async ({ page }) => {
    await page.goto('/');

    // Non-form CTAs (hero + 4 sections) should all point to #access
    const sectionCtas = page.locator('a.action-btn');
    const count = await sectionCtas.count();
    expect(count).toBe(5);

    for (let i = 0; i < count; i++) {
      const href = await sectionCtas.nth(i).getAttribute('href');
      expect(href).toBe('#access');
    }
  });
});