import { test, expect } from '@playwright/test';

test.describe('Disclosure Interaction', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should open a disclosure item on click', async ({ page }) => {
    const firstTrigger = page.locator('#media .disclosure-trigger').first();
    const firstItem = page.locator('#media .disclosure-item').first();

    await expect(firstTrigger).toHaveAttribute('aria-expanded', 'false');
    await firstTrigger.click();
    await expect(firstTrigger).toHaveAttribute('aria-expanded', 'true');
    await expect(firstItem).toHaveClass(/open/);
  });

  test('should close an open item on second click', async ({ page }) => {
    const firstTrigger = page.locator('#media .disclosure-trigger').first();
    const firstItem = page.locator('#media .disclosure-item').first();

    await firstTrigger.click();
    await expect(firstItem).toHaveClass(/open/);

    await firstTrigger.click();
    await expect(firstTrigger).toHaveAttribute('aria-expanded', 'false');
    await expect(firstItem).not.toHaveClass(/open/);
  });

  test('should auto-close siblings when opening another item', async ({ page }) => {
    const triggers = page.locator('#media .disclosure-trigger');
    const items = page.locator('#media .disclosure-item');

    // Open first
    await triggers.nth(0).click();
    await expect(items.nth(0)).toHaveClass(/open/);

    // Open second — first should close
    await triggers.nth(1).click();
    await expect(items.nth(1)).toHaveClass(/open/);
    await expect(items.nth(0)).not.toHaveClass(/open/);
    await expect(triggers.nth(0)).toHaveAttribute('aria-expanded', 'false');
  });

  test('every section with disclosures should have triggers with aria-expanded', async ({ page }) => {
    const allTriggers = page.locator('.disclosure-trigger');
    const count = await allTriggers.count();

    // 4 sections × 2-3 items = at least 11 disclosure triggers
    expect(count).toBeGreaterThanOrEqual(11);

    for (let i = 0; i < count; i++) {
      await expect(allTriggers.nth(i)).toHaveAttribute('aria-expanded', 'false');
    }
  });
});
