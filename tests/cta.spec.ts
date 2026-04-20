import { test, expect } from '@playwright/test';

test.describe('Call to Action (Push to Close)', () => {
  test('every section should have a CTA', async ({ page }) => {
    await page.goto('/');

    // Hero + Media + Systems + Advisory + Archive = 5 anchor CTAs
    // Access section: 3 booking buttons + 1 email link = 4
    // Total: 9
    const ctas = page.locator('.action-btn');
    await expect(ctas).toHaveCount(9);
  });

  test('booking buttons should be present in access section', async ({ page }) => {
    await page.goto('/');

    const bookingBtns = page.locator('section#access button[data-cal-link]');
    await expect(bookingBtns).toHaveCount(3);

    // Each booking button should have a Cal.com link
    for (let i = 0; i < 3; i++) {
      const calLink = await bookingBtns.nth(i).getAttribute('data-cal-link');
      expect(calLink).toContain('padavano/');
    }
  });

  test('section CTAs should link to contact, portfolio, or email', async ({ page }) => {
    await page.goto('/');

    const sectionCtas = page.locator('a.action-btn');
    const count = await sectionCtas.count();
    expect(count).toBe(6);

    for (let i = 0; i < count; i++) {
      const href = await sectionCtas.nth(i).getAttribute('href');
      expect(href === '#access' || href?.startsWith('https://') || href?.startsWith('mailto:')).toBeTruthy();
    }
  });
});
