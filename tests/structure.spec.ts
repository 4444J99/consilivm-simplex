import { test, expect } from '@playwright/test';

test.describe('Structural Integrity', () => {
  test('Index page should have hero elements', async ({ page }) => {
    await page.goto('/');
    const h1Text = await page.innerText('h1');
    expect(h1Text.toLowerCase()).toBe('victoroff group');
    
    const descriptorText = await page.innerText('.descriptor');
    expect(descriptorText.toLowerCase()).toContain('strategic asset architecture');
    
    await expect(page.locator('#bg-canvas')).toBeAttached();
    await expect(page.locator('#scroll-progress')).toBeAttached();
  });

  test('Division pages should have lead content and service items', async ({ page }) => {
    const pages = ['media.html', 'systems.html', 'consulting.html', 'archive.html'];
    for (const p of pages) {
      await page.goto(`/${p}`);
      await expect(page.locator('h1')).toBeAttached();
      await expect(page.locator('.lead')).toBeAttached();
      const serviceItems = page.locator('h2'); // The items were changed to h2
      const count = await serviceItems.count();
      // On sub-pages, h1 is title, then service items are h2. 
      // index.html has h1, h2 (divisions), then h2 (items).
      expect(count).toBeGreaterThanOrEqual(2);
    }
  });

  test('Contact page should have inquiry form', async ({ page }) => {
    await page.goto('/contact.html');
    await expect(page.locator('form.contact-form')).toBeVisible();
    await expect(page.locator('input[type="text"]')).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('textarea')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });
});