import { test, expect } from '@playwright/test';

test.describe('Navigation Link Integrity', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have all division links in header', async ({ page, isMobile }) => {
    if (isMobile) return;
    const navLinks = page.locator('nav .nav-links a');
    await expect(navLinks).toHaveCount(5);
    await expect(navLinks.nth(0)).toHaveText('Media');
    await expect(navLinks.nth(1)).toHaveText('Systems');
    await expect(navLinks.nth(2)).toHaveText('Consulting');
    await expect(navLinks.nth(3)).toHaveText('Archive');
    await expect(navLinks.nth(4)).toHaveText('Request Access');
  });

  test('should navigate to Media page', async ({ page, isMobile }) => {
    if (isMobile) {
      await page.goto('/media.html');
    } else {
      await page.click('nav .nav-links a:has-text("Media")');
    }
    await expect(page).toHaveURL(/media.html/);
    await expect(page.locator('h1')).toHaveText('Media');
  });

  test('should navigate to Systems page', async ({ page, isMobile }) => {
    if (isMobile) {
      await page.goto('/systems.html');
    } else {
      await page.click('nav .nav-links a:has-text("Systems")');
    }
    await expect(page).toHaveURL(/systems.html/);
    await expect(page.locator('h1')).toHaveText('Systems');
  });

  test('should navigate to Consulting page', async ({ page, isMobile }) => {
    if (isMobile) {
      await page.goto('/consulting.html');
    } else {
      await page.click('nav .nav-links a:has-text("Consulting")');
    }
    await expect(page).toHaveURL(/consulting.html/);
    await expect(page.locator('h1')).toHaveText('Consulting');
  });

  test('should navigate to Archive page', async ({ page, isMobile }) => {
    if (isMobile) {
      await page.goto('/archive.html');
    } else {
      await page.click('nav .nav-links a:has-text("Archive")');
    }
    await expect(page).toHaveURL(/archive.html/);
    await expect(page.locator('h1')).toHaveText('Archive');
  });

  test('should navigate to Contact page', async ({ page, isMobile }) => {
    if (isMobile) {
      await page.goto('/contact.html');
    } else {
      await page.click('nav .nav-links a:has-text("Request Access")');
    }
    await expect(page).toHaveURL(/contact.html/);
    await expect(page.locator('h1')).toHaveText('Contact');
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