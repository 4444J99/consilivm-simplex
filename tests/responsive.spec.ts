import { test, expect } from '@playwright/test';

test.describe('Responsive Layout', () => {
  test('mobile: navigation bar should be at the bottom', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
    });
    const page = await context.newPage();
    await page.goto('/');

    const nav = page.locator('#navigation-bar');
    const navBox = await nav.boundingBox();
    const viewportHeight = 844;

    // Nav should be in the bottom half of the viewport
    expect(navBox).not.toBeNull();
    expect(navBox!.y + navBox!.height).toBeGreaterThan(viewportHeight - 100);

    await context.close();
  });

  test('desktop: navigation bar should be at the top', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    });
    const page = await context.newPage();
    await page.goto('/');

    const nav = page.locator('#navigation-bar');
    const navBox = await nav.boundingBox();

    // Nav should be pinned to the top
    expect(navBox).not.toBeNull();
    expect(navBox!.y).toBe(0);

    await context.close();
  });

  test('desktop: nav icons should be hidden', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    });
    const page = await context.newPage();
    await page.goto('/');

    const navSvgs = page.locator('.nav-tab svg');
    const count = await navSvgs.count();
    for (let i = 0; i < count; i++) {
      await expect(navSvgs.nth(i)).not.toBeVisible();
    }

    await context.close();
  });

  test('mobile: all tap targets should meet 48px minimum', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
    });
    const page = await context.newPage();
    await page.goto('/');

    const navTabs = page.locator('.nav-tab');
    const count = await navTabs.count();
    for (let i = 0; i < count; i++) {
      const box = await navTabs.nth(i).boundingBox();
      expect(box).not.toBeNull();
      // 48px minimum per WCAG touch target guidelines
      expect(box!.height).toBeGreaterThanOrEqual(48);
    }

    await context.close();
  });
});
