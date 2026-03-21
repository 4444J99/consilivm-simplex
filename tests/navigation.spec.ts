import { test, expect } from '@playwright/test';

test.describe('Navigation Link Integrity', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have all division links in header', async ({ page, isMobile }) => {
    if (isMobile) return;
    const navLinks = page.locator('nav .nav-protocol a');
    await expect(navLinks).toHaveCount(4);
    await expect(navLinks.nth(0)).toHaveText(/Media/);
    await expect(navLinks.nth(1)).toHaveText(/Systems/);
    await expect(navLinks.nth(2)).toHaveText(/Consulting/);
    await expect(navLinks.nth(3)).toHaveText(/Archive/);
  });

  test('should navigate to sections on index page', async ({ page, isMobile }) => {
    if (isMobile) return;
    const sections = ['media', 'systems', 'consulting', 'archive'];
    for (const s of sections) {
      await page.click(`nav .nav-protocol a[href="#${s}"]`);
      await expect(page).toHaveURL(new RegExp(`#${s}`));
    }
  });

  test('should return to Index from sub-pages', async ({ page }) => {
    const subPages = ['media.html', 'systems.html', 'consulting.html', 'archive.html', 'contact.html'];
    for (const subPage of subPages) {
      await page.goto(`/${subPage}`);
      await page.click('.logo');
      await expect(page).toHaveURL(/\/index.html|\/$/);
    }
  });
});