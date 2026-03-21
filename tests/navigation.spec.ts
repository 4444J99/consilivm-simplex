import { test, expect } from '@playwright/test';

test.describe('Navigation Link Integrity', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have all division links in header', async ({ page }) => {
    const navLinks = page.locator('.nav-tab');
    await expect(navLinks).toHaveCount(5);
    await expect(navLinks.nth(0)).toHaveText(/HOME/i);
    await expect(navLinks.nth(1)).toHaveText(/MEDIA/i);
    await expect(navLinks.nth(2)).toHaveText(/SYSTEMS/i);
    await expect(navLinks.nth(3)).toHaveText(/ADVISORY/i);
    await expect(navLinks.nth(4)).toHaveText(/ARCHIVE/i);
  });

  test('should navigate to sections on index page', async ({ page }) => {
    const sections = ['media', 'systems', 'advisory', 'archive'];
    for (const s of sections) {
      await page.click(`.nav-tab[href="#${s}"]`);
      await expect(page).toHaveURL(new RegExp(`#${s}`));
    }
  });
});