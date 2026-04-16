import { test, expect } from '@playwright/test';

test.describe('Aesthetic & Language Constraints', () => {
  test('should adhere to B&W color palette', async ({ page }) => {
    await page.goto('/');
    const bgColor = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    const textColor = await page.evaluate(() => getComputedStyle(document.body).color);
    
    // Allow for black (#000000) and white (#ffffff)
    expect(bgColor).toBe('rgb(0, 0, 0)');
    expect(textColor).toBe('rgb(255, 255, 255)');
  });

  test('should use authoritative font stack', async ({ page }) => {
    await page.goto('/');
    const fontFamily = await page.evaluate(() => getComputedStyle(document.body).fontFamily);
    expect(fontFamily.toLowerCase()).toMatch(/geist|helvetica neue/);
  });

  test('should exclude prohibited terminology', async ({ page }) => {
    await page.goto('/');
    const bodyText = await page.innerText('body');
    const prohibited = ['Growth Auditor', 'Victoroff'];

    for (const term of prohibited) {
      expect(bodyText).not.toContain(term);
    }

    // Ensure Padavano brand is present (CSS text-transform may uppercase)
    expect(bodyText.toLowerCase()).toContain('padavano');
  });
});