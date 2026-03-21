import { test, expect } from '@playwright/test';

test.describe('Call to Action (Push to Close)', () => {
  test('Index page should have high-intent CTAs in every division', async ({ page, isMobile }) => {
    await page.goto('/');
    
    // Header CTA
    const headerCta = page.locator('nav .nav-links a:has-text("Request Access")');
    if (!isMobile) {
      await expect(headerCta).toBeVisible();
    }

    // Division CTAs
    const ctals = page.locator('.cta-link');
    const count = await ctals.count();
    // 4 divisions + 1 final close = 5
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