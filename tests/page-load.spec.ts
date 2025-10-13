// spec: test-plan.md - Section 1: Page Load and Initial State
// seed: Clear localStorage before tests

import { test, expect } from '@playwright/test';

test.describe('Page Load and Initial State', () => {
  const baseURL = 'http://localhost:4321';

  // Seed: Clear localStorage before each test
  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
    await page.evaluate(() => localStorage.clear());
  });

  test('Page loads successfully', async ({ page }) => {
    // 1. Navigate to http://localhost:4321
    const response = await page.goto(baseURL);

    // Verify page loads with 200 status
    expect(response?.status()).toBe(200);

    // 2. Wait for page to fully load
    await page.waitForLoadState('domcontentloaded');

    // Verify title is correct
    await expect(page).toHaveTitle('Chaim Lev-Ari | Full-Stack Developer');

    // Verify hero section is visible in viewport
    const heroSection = page.locator('main').first();
    await expect(heroSection).toBeVisible();

    // Verify fixed navigation bar appears at top
    const navigation = page.locator('nav');
    await expect(navigation).toBeVisible();
  });

  test('Essential meta tags present', async ({ page }) => {
    // 1. Navigate to the page
    await page.goto(baseURL);

    // 2. Check for viewport meta tag
    const viewportMeta = page.locator('meta[name="viewport"]');
    await expect(viewportMeta).toHaveAttribute('content', 'width=device-width, initial-scale=1.0');

    // Check for description meta tag
    const descriptionMeta = page.locator('meta[name="description"]');
    await expect(descriptionMeta).toHaveAttribute(
      'content',
      'Full-stack developer with 10+ years experience, specializing in React, TypeScript, and modern web technologies.'
    );

    // Check for og:title meta tag
    const ogTitleMeta = page.locator('meta[property="og:title"]');
    await expect(ogTitleMeta).toHaveAttribute('content', 'Chaim Lev-Ari | Full-Stack Developer');

    // Check for og:description meta tag
    const ogDescriptionMeta = page.locator('meta[property="og:description"]');
    await expect(ogDescriptionMeta).toHaveAttribute(
      'content',
      'Full-stack developer with 10+ years experience, specializing in React, TypeScript, and modern web technologies.'
    );

    // Check for Twitter card meta tags
    const twitterCardMeta = page.locator('meta[name="twitter:card"]');
    await expect(twitterCardMeta).toHaveAttribute('content', 'summary_large_image');

    const twitterTitleMeta = page.locator('meta[name="twitter:title"]');
    await expect(twitterTitleMeta).toHaveAttribute('content', 'Chaim Lev-Ari | Full-Stack Developer');

    // Check for canonical URL
    const canonicalLink = page.locator('link[rel="canonical"]');
    await expect(canonicalLink).toBeAttached();

    // Check for structured data (JSON-LD) for Person schema
    const structuredData = page.locator('script[type="application/ld+json"]');
    await expect(structuredData).toBeAttached();

    const jsonLdContent = await structuredData.textContent();
    expect(jsonLdContent).toBeTruthy();
    const parsedData = JSON.parse(jsonLdContent!);
    expect(parsedData['@type']).toBe('Person');
    expect(parsedData.name).toBe('Chaim Lev-Ari');
    expect(parsedData.jobTitle).toBe('Full-Stack Developer');
  });

  test('No console errors on load', async ({ page }) => {
    const consoleErrors: string[] = [];

    // Listen for console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // 1. Navigate to the page
    await page.goto(baseURL);

    // 2. Wait for page to fully load
    await page.waitForLoadState('domcontentloaded');

    // Wait a bit more for any async operations
    await page.waitForTimeout(1000);

    // Verify no JavaScript errors in console
    expect(consoleErrors).toHaveLength(0);
  });

  test('All sections render', async ({ page }) => {
    // 1. Navigate to the page
    await page.goto(baseURL);
    await page.waitForLoadState('domcontentloaded');

    // 2. Verify presence of nav
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();

    // 3. Verify presence of hero section
    const hero = page.locator('main').first();
    await expect(hero).toBeVisible();

    // Check for hero content
    await expect(page.getByText('CHAIM LEV-ARI')).toBeVisible();
    await expect(page.getByText('FULL-STACK DEVELOPER')).toBeVisible();

    // 4. Verify presence of work experience section
    await expect(page.getByText('WORK EXPERIENCE')).toBeVisible();

    // 5. Verify presence of journey timeline section
    await expect(page.getByText('JOURNEY')).toBeVisible();

    // 6. Verify presence of now section
    await expect(page.getByText('NOW', { exact: true })).toBeVisible();

    // 7. Verify presence of projects section
    await expect(page.getByText('SIDE PROJECTS')).toBeVisible();

    // 8. Blog section is currently hidden (commented out in index.astro)
    // await expect(page.getByText('BLOG')).toBeVisible();

    // 9. Verify presence of contact section
    await expect(page.getByText("LET'S WORK TOGETHER")).toBeVisible();

    // 10. Verify presence of footer
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('Default theme loads', async ({ page }) => {
    // 1. Clear localStorage
    await page.goto(baseURL);
    await page.evaluate(() => localStorage.clear());

    // 2. Reload the page
    await page.reload();
    await page.waitForLoadState('domcontentloaded');

    // 3. Check if light or dark theme is applied by default
    const htmlElement = page.locator('html');
    const htmlClass = await htmlElement.getAttribute('class');

    // Verify default theme (should be either 'light' or 'dark')
    expect(htmlClass).toBeTruthy();
    expect(['light', 'dark']).toContain(htmlClass);

    // If theme is persisted, verify localStorage
    const storedTheme = await page.evaluate(() => {
      const stored = localStorage.getItem('theme');
      return stored ? JSON.parse(stored) : null;
    });

    // If localStorage has a value, it should match the HTML class
    if (storedTheme) {
      expect(storedTheme).toBe(htmlClass);
    }

    // Verify theme toggle button is present
    const themeToggle = page.locator('button[aria-label*="theme" i]').or(
      page.locator('button').filter({ hasText: /moon|sun/i })
    );
    await expect(themeToggle.first()).toBeVisible();
  });
});
