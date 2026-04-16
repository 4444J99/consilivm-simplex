import { test, expect } from '@playwright/test';

test.describe('Structural Integrity', () => {
  test('Index page should have all core components', async ({ page }) => {
    await page.goto('/');

    // Hero
    const h1Text = await page.innerText('h1');
    expect(h1Text.toLowerCase()).toContain('padavano');

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
    await expect(page.locator('input[type="text"]').first()).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('footer should display copyright', async ({ page }) => {
    await page.goto('/');

    const footer = page.locator('.site-footer');
    await expect(footer).toBeVisible();
    const footerText = (await footer.innerText()).toLowerCase();
    expect(footerText).toContain('© 2026 anthony james padavano');
  });

  test('design tokens should be defined on :root', async ({ page }) => {
    await page.goto('/');

    const tokens = await page.evaluate(() => {
      const style = getComputedStyle(document.documentElement);
      return {
        bg: style.getPropertyValue('--bg').trim(),
        fg: style.getPropertyValue('--fg').trim(),
        muted: style.getPropertyValue('--muted').trim(),
        fontMono: style.getPropertyValue('--font-mono').trim(),
        fontSans: style.getPropertyValue('--font-sans').trim(),
        tapTarget: style.getPropertyValue('--tap-target').trim(),
      };
    });

    expect(tokens.bg).toBe('#000000');
    expect(tokens.fg).toBe('#ffffff');
    expect(tokens.muted).toBe('#bbbbbb');
    expect(tokens.fontMono).toContain('Geist Mono');
    expect(tokens.fontSans).toContain('Geist');
    expect(tokens.tapTarget).toBe('54px');
  });
});