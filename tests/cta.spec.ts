import { test, expect } from '@playwright/test';

test.describe('Call to Action (Push to Close)', () => {
  test('Index page should have high-intent CTAs in every division', async ({ page }) => {
    await page.goto('/');
    
    // Navigation Tabs
    const headerCta = page.locator('.nav-tab');
    await expect(headerCta).toHaveCount(5);

    // High Intent CTAs
    const ctals = page.locator('.action-btn');
    const count = await ctals.count();
    // Hero + 4 divisions + 1 access form = 6
    expect(count).toBeGreaterThanOrEqual(5);

    // Form button tone
    const button = page.locator('section#access button[type="submit"]');
    await expect(button).toHaveText(/Finalize Authorization/i);
  });
});