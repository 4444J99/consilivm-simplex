import { test, expect } from '@playwright/test';

test.describe('Structural Integrity', () => {
  test('Index page should have all core components', async ({ page }) => {
    await page.goto('/');
    
    // Hero
    const h1Text = await page.innerText('h1');
    expect(h1Text.toLowerCase()).toContain('victoroff');
    expect(h1Text.toLowerCase()).toContain('group');
    
    await expect(page.locator('.lead').first()).toBeAttached();
    await expect(page.locator('#ui-grid')).toBeAttached();
    await expect(page.locator('#navigation-bar')).toBeAttached();

    // Divisions (now as sections on main page)
    const divisions = ['media', 'systems', 'advisory', 'archive'];
    for (const id of divisions) {
      await expect(page.locator(`section#${id}`)).toBeAttached();
      await expect(page.locator(`section#${id} h2`)).toBeVisible();
    }

    // Access Form
    await expect(page.locator('section#access form')).toBeVisible();
    await expect(page.locator('input[type="text"]')).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });
});