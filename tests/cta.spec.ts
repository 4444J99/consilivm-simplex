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
  });

  test('Sub-pages should have closing modules', async ({ page }) => {
    const pages = ['/media.html', '/systems.html', '/consulting.html', '/archive.html'];
    for (const p of pages) {
      await page.goto(p);
      const cta = page.locator('.cta-link');
      await expect(cta).toBeVisible();
      await expect(cta).toHaveAttribute('href', /contact.html/);
    }
  });

  test('Contact form should maintain authoritative tone', async ({ page }) => {
    await page.goto('/contact.html');
    const h1 = await page.innerText('h1');
    expect(h1.toLowerCase()).toBe('contact');
    
    const button = page.locator('button[type="submit"]');
    await expect(button).toHaveText(/Submit Inquiry/i);
  });
});