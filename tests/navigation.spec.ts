import { test, expect } from '@playwright/test';

test.describe('Navigation Link Integrity', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have all division links in header', async ({ page }) => {
    const navLinks = page.locator('.protocol-tab');
    await expect(navLinks).toHaveCount(4);
    await expect(navLinks.nth(0)).toHaveText(/HOME/);
    await expect(navLinks.nth(1)).toHaveText(/MEDIA/);
    await expect(navLinks.nth(2)).toHaveText(/SYS/);
    await expect(navLinks.nth(3)).toHaveText(/INTEL/);
  });

  test('should navigate to sections on index page', async ({ page }) => {
    const sections = ['media', 'systems', 'consult'];
    for (const s of sections) {
      await page.click(`.protocol-tab[href="#${s}"]`);
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