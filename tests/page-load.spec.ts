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

    // Listen for console errors before navigating
    page.on('console', msg => {
      if (msg.type() === 'error') {
        const text = msg.text();
        // Filter out known harmless errors
        if (!text.includes('favicon') &&
            !text.includes('Failed to load resource') &&
            !text.includes('net::ERR')) {
          consoleErrors.push(text);
        }
      }
    });

    // 1. Navigate to the page
    await page.goto(baseURL);

    // 2. Wait for page to fully load
    await page.waitForLoadState('load');
    await page.waitForLoadState('domcontentloaded');

    // Wait for React hydration by checking if theme toggle is interactive
    await page.waitForSelector('button[aria-label*="theme" i]', { state: 'visible', timeout: 5000 });

    // Verify no JavaScript errors in console
    if (consoleErrors.length > 0) {
      console.log('Console errors found:', consoleErrors);
    }
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

    // Check for hero content (DOM text is title case, displayed as uppercase via CSS)
    await expect(page.getByText('Chaim Lev-Ari').first()).toBeVisible();
    await expect(page.getByText('Full-Stack Developer').first()).toBeVisible();

    // 4. Verify presence of work experience section (DOM text is title case, displayed as uppercase via CSS)
    await expect(page.getByText('Work Experience').first()).toBeVisible();

    // 5. Verify presence of journey timeline section (DOM text is title case, displayed as uppercase via CSS)
    await expect(page.getByText('Journey').first()).toBeVisible();

    // 6. Verify presence of now section (DOM text is title case, displayed as uppercase via CSS)
    await expect(page.getByText('Now', { exact: true }).first()).toBeVisible();

    // 7. Verify presence of projects section (DOM text is title case, displayed as uppercase via CSS)
    await expect(page.getByText('Side Projects').first()).toBeVisible();

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

    // Verify default theme (should be 'light' as the default)
    expect(htmlClass).toBeTruthy();
    expect(htmlClass).toBe('light');

    // Verify localStorage has the theme set
    const storedTheme = await page.evaluate(() => {
      const stored = localStorage.getItem('theme');
      return stored ? JSON.parse(stored) : null;
    });

    // localStorage should now have the default theme set by the inline script
    expect(storedTheme).toBe('light');

    // Verify theme toggle button is present
    const themeToggle = page.locator('button[aria-label*="theme" i]').or(
      page.locator('button').filter({ hasText: /moon|sun/i })
    );
    await expect(themeToggle.first()).toBeVisible();
  });
});
