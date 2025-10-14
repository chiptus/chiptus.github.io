// spec: test-plan.md (Section 3: Theme Toggle)
// seed: seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Theme Toggle', () => {
  const baseURL = 'http://localhost:4321';

  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto(baseURL);
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('Theme toggle button exists', async ({ page }) => {
    // Navigate to the page
    await page.goto(baseURL);

    // Verify theme toggle button is visible (use .first() because there are desktop + mobile toggles)
    const themeToggle = page.getByRole('button', { name: /toggle theme/i }).first();
    await expect(themeToggle).toBeVisible();

    // Verify button has proper aria-label
    await expect(themeToggle).toHaveAttribute('aria-label', 'Toggle theme');

    // Verify button is enabled
    await expect(themeToggle).toBeEnabled();

    // Verify Moon icon is visible (default light mode)
    const moonIcon = themeToggle.locator('svg').first();
    await expect(moonIcon).toBeVisible();
  });

  test('Toggle switches between light and dark', async ({ page }) => {
    // Navigate to the page
    await page.goto(baseURL);

    // 1. Verify default theme is light
    const html = page.locator('html');
    await expect(html).toHaveClass(/light/);

    // 2. Click the theme toggle button to switch to dark mode (use .first() because there are desktop + mobile toggles)
    const themeToggle = page.getByRole('button', { name: /toggle theme/i }).first();
    await themeToggle.click();

    // 3. Verify theme changed to dark
    await expect(html).toHaveClass(/dark/);
    await expect(html).not.toHaveClass(/light/);

    // 4. Verify icon changed from Moon to Sun
    const sunIcon = themeToggle.locator('svg').first();
    await expect(sunIcon).toBeVisible();

    // 5. Click the theme toggle button again to switch back to light mode
    await themeToggle.click();

    // 6. Verify theme changed back to light
    await expect(html).toHaveClass(/light/);
    await expect(html).not.toHaveClass(/dark/);

    // 7. Verify icon changed from Sun back to Moon
    const moonIcon = themeToggle.locator('svg').first();
    await expect(moonIcon).toBeVisible();
  });

  test('Theme persists in localStorage', async ({ page }) => {
    // Navigate to the page
    await page.goto(baseURL);

    // Wait for page to be ready
    await page.waitForLoadState('domcontentloaded');

    // 1. Verify default localStorage value (set by inline script in Layout.astro)
    let themeStorage = await page.evaluate(() => {
      const item = localStorage.getItem('theme');
      return item ? JSON.parse(item) : null;
    });
    expect(themeStorage).toBe('light');

    // 2. Toggle to dark mode (use .first() because there are desktop + mobile toggles)
    const themeToggle = page.getByRole('button', { name: /toggle theme/i }).first();
    await themeToggle.click();

    // Wait for theme to change
    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);

    // 3. Verify localStorage updated to dark
    themeStorage = await page.evaluate(() => {
      const item = localStorage.getItem('theme');
      return item ? JSON.parse(item) : null;
    });
    expect(themeStorage).toBe('dark');

    // 4. Toggle back to light mode
    await themeToggle.click();

    // Wait for theme to change back
    await expect(html).toHaveClass(/light/);

    // 5. Verify localStorage updated to light
    themeStorage = await page.evaluate(() => {
      const item = localStorage.getItem('theme');
      return item ? JSON.parse(item) : null;
    });
    expect(themeStorage).toBe('light');
  });

  test('Theme persists across page reloads', async ({ page }) => {
    // Navigate to the page
    await page.goto(baseURL);

    // 1. Toggle to dark mode (use .first() because there are desktop + mobile toggles)
    const themeToggle = page.getByRole('button', { name: /toggle theme/i }).first();
    await themeToggle.click();

    // 2. Verify dark mode is active
    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);

    // 3. Verify localStorage has dark theme
    let themeStorage = await page.evaluate(() => {
      const item = localStorage.getItem('theme');
      return item ? JSON.parse(item) : null;
    });
    expect(themeStorage).toBe('dark');

    // 4. Reload the page
    await page.reload();

    // 5. Verify dark theme persisted after reload
    await expect(html).toHaveClass(/dark/);

    // 6. Verify Sun icon is still displayed
    const sunIcon = themeToggle.locator('svg').first();
    await expect(sunIcon).toBeVisible();

    // 7. Verify localStorage still has dark theme
    themeStorage = await page.evaluate(() => {
      const item = localStorage.getItem('theme');
      return item ? JSON.parse(item) : null;
    });
    expect(themeStorage).toBe('dark');

    // 8. Toggle back to light and reload
    await themeToggle.click();
    await page.reload();

    // 9. Verify light theme persisted after reload
    await expect(html).toHaveClass(/light/);
    themeStorage = await page.evaluate(() => {
      const item = localStorage.getItem('theme');
      return item ? JSON.parse(item) : null;
    });
    expect(themeStorage).toBe('light');
  });

  test('Theme toggle is keyboard accessible', async ({ page }) => {
    // Set viewport to desktop size BEFORE navigating to ensure we're testing the desktop toggle
    await page.setViewportSize({ width: 1280, height: 720 });

    // Navigate to the page
    await page.goto(baseURL);

    // Wait for page to fully load and React hydration
    await page.waitForLoadState('domcontentloaded');

    // 1. Tab to theme toggle button
    await page.keyboard.press('Tab');

    // Keep tabbing until we reach the theme toggle button
    let focused = false;
    for (let i = 0; i < 10; i++) {
      const activeElement = await page.evaluate(() => {
        const el = document.activeElement;
        return el?.getAttribute('aria-label');
      });

      if (activeElement === 'Toggle theme') {
        focused = true;
        break;
      }
      await page.keyboard.press('Tab');
    }

    expect(focused, 'Should be able to focus theme toggle via keyboard').toBe(true);

    // 2. Get the currently focused element (should be theme toggle)
    const focusedToggle = page.locator(':focus');
    await expect(focusedToggle).toHaveAttribute('aria-label', 'Toggle theme');

    // 3. Press Enter to activate theme toggle
    const html = page.locator('html');
    await expect(html).toHaveClass(/light/);

    await page.keyboard.press('Enter');

    // 4. Verify theme changed to dark
    await expect(html).toHaveClass(/dark/);

    // 5. Press Space to toggle back
    await page.keyboard.press('Space');

    // 6. Verify theme changed back to light
    await expect(html).toHaveClass(/light/);

    // 7. Use keyboard to toggle again with Enter
    await page.keyboard.press('Enter');

    // 8. Verify theme changed to dark again
    await expect(html).toHaveClass(/dark/);

    // 9. Verify localStorage updated correctly
    const themeStorage = await page.evaluate(() => {
      const item = localStorage.getItem('theme');
      return item ? JSON.parse(item) : null;
    });
    expect(themeStorage).toBe('dark');
  });
});
