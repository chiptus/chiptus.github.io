// spec: test-plan.md (Section 2: Navigation Bar)
// seed: seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Navigation Bar', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the application before each test
    await page.goto('http://localhost:4321');
  });

  test('Navigation bar is fixed at top', async ({ page }) => {
    // 1. Verify navigation bar is visible at the top
    const nav = page.locator('nav, header').first();
    await expect(nav).toBeVisible();

    // 2. Get initial position of the nav bar
    const initialBox = await nav.boundingBox();
    expect(initialBox).not.toBeNull();
    expect(initialBox?.y).toBeLessThanOrEqual(10);

    // 3. Scroll down the page
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(300);

    // 4. Verify nav bar is still at the top (fixed position)
    const scrolledBox = await nav.boundingBox();
    expect(scrolledBox).not.toBeNull();
    expect(scrolledBox?.y).toBeLessThanOrEqual(10);

    // 5. Verify nav bar has fixed position CSS
    const position = await nav.evaluate((el) => window.getComputedStyle(el).position);
    expect(position).toBe('fixed');
  });

  test('All navigation links are present', async ({ page }) => {
    // 1. Wait for navigation to be visible
    const nav = page.locator('nav, header').first();
    await expect(nav).toBeVisible();

    // 2. Set viewport to desktop size to ensure links are visible
    await page.setViewportSize({ width: 1280, height: 720 });

    // 3. Check for "CL" logo/link
    const logo = nav.locator('a[href="#home"], a[href="/"]').first();
    await expect(logo).toBeVisible();

    // 4. Check for Journey link
    const journeyLink = nav.locator('a[href="#about"], a:has-text("Journey")');
    await expect(journeyLink).toBeVisible();

    // 5. Check for Now link
    const nowLink = nav.locator('a[href="#now"], a:has-text("Now")');
    await expect(nowLink).toBeVisible();

    // 6. Check for Projects link
    const projectsLink = nav.locator('a[href="#projects"], a:has-text("Projects")');
    await expect(projectsLink).toBeVisible();

    // 7. Blog link is currently hidden (commented out in Navigation.tsx)
    // const blogLink = nav.locator('a[href="#blog"], a:has-text("Blog")');
    // await expect(blogLink).toBeVisible();

    // 8. Check for Contact link
    const contactLink = nav.locator('a[href="#contact"], a:has-text("Contact")');
    await expect(contactLink).toBeVisible();

    // 9. Verify theme toggle is present
    const themeToggle = nav.locator('button[aria-label*="theme" i], button[aria-label*="Toggle" i]');
    await expect(themeToggle).toBeVisible();
  });

  test('Navigation links scroll to sections', async ({ page }) => {
    // Set viewport to desktop size
    await page.setViewportSize({ width: 1280, height: 720 });

    const nav = page.locator('nav, header').first();

    // 1. Click "Journey" link and verify scroll to #about section
    await nav.locator('a[href="#about"], a:has-text("Journey")').click();
    await page.waitForTimeout(500);
    expect(page.url()).toContain('#about');

    const aboutSection = page.locator('#about');
    await expect(aboutSection).toBeInViewport();

    // 2. Click "Now" link and verify scroll to #now section
    await nav.locator('a[href="#now"], a:has-text("Now")').click();
    await page.waitForTimeout(500);
    expect(page.url()).toContain('#now');

    const nowSection = page.locator('#now');
    await expect(nowSection).toBeInViewport();

    // 3. Click "Projects" link and verify scroll to #projects section
    await nav.locator('a[href="#projects"], a:has-text("Projects")').click();
    await page.waitForTimeout(500);
    expect(page.url()).toContain('#projects');

    const projectsSection = page.locator('#projects');
    await expect(projectsSection).toBeInViewport();

    // 4. Blog link is currently hidden (commented out in Navigation.tsx)
    // await nav.locator('a[href="#blog"], a:has-text("Blog")').click();
    // await page.waitForTimeout(500);
    // expect(page.url()).toContain('#blog');
    // const blogSection = page.locator('#blog');
    // await expect(blogSection).toBeInViewport();

    // 5. Click "Contact" link and verify scroll to #contact section
    await nav.locator('a[href="#contact"], a:has-text("Contact")').click();
    await page.waitForTimeout(500);
    expect(page.url()).toContain('#contact');

    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeInViewport();

    // 6. Click "CL" logo and verify scroll back to top/home
    await nav.locator('a[href="#home"], a[href="/"]').first().click();
    await page.waitForTimeout(500);

    const scrollPosition = await page.evaluate(() => window.scrollY);
    expect(scrollPosition).toBeLessThan(100);
  });

  test('Scroll changes nav style', async ({ page }) => {
    const nav = page.locator('nav, header').first();
    await expect(nav).toBeVisible();

    // 1. Check initial state at top of page
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);

    // 2. Scroll down more than 50 pixels
    await page.evaluate(() => window.scrollTo(0, 100));
    await page.waitForTimeout(400);

    // 3. Verify navigation background changes on scroll (backdrop-blur effect)
    const hasBackdropBlur = await nav.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.backdropFilter.includes('blur') ||
             el.className.includes('backdrop-blur');
    });

    expect(hasBackdropBlur).toBeTruthy();

    // 4. Verify shadow appears on scroll
    const hasShadow = await nav.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.boxShadow !== 'none' ||
             el.className.includes('shadow');
    });

    expect(hasShadow).toBeTruthy();
  });

  test('Mobile responsive navigation', async ({ page }) => {
    // 1. Set viewport to mobile size (<768px width)
    await page.setViewportSize({ width: 375, height: 667 });

    const nav = page.locator('nav, header').first();
    await expect(nav).toBeVisible();

    // 2. Verify "CL" logo is visible on mobile
    const logo = nav.locator('a[href="#home"], a[href="/"]').first();
    await expect(logo).toBeVisible();

    // 3. Verify theme toggle is visible on mobile
    const themeToggle = nav.locator('button[aria-label*="theme" i], button[aria-label*="Toggle" i]');
    await expect(themeToggle).toBeVisible();

    // 4. Verify desktop navigation links are hidden on mobile
    const journeyLink = nav.locator('a[href="#about"], a:has-text("Journey")');
    const nowLink = nav.locator('a[href="#now"], a:has-text("Now")');
    const projectsLink = nav.locator('a[href="#projects"], a:has-text("Projects")');
    const contactLink = nav.locator('a[href="#contact"], a:has-text("Contact")');

    // Check if links are hidden (not visible)
    const isJourneyVisible = await journeyLink.isVisible().catch(() => false);
    const isNowVisible = await nowLink.isVisible().catch(() => false);
    const isProjectsVisible = await projectsLink.isVisible().catch(() => false);
    const isContactVisible = await contactLink.isVisible().catch(() => false);

    const visibleCount = [isJourneyVisible, isNowVisible, isProjectsVisible, isContactVisible]
      .filter(Boolean).length;

    expect(visibleCount).toBe(0);

    // 5. Test at the exact breakpoint (768px) - desktop navigation should appear
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(200);

    await expect(journeyLink).toBeVisible();
    await expect(nowLink).toBeVisible();
    await expect(projectsLink).toBeVisible();
    // Blog link is hidden (commented out in Navigation.tsx)
    // await expect(blogLink).toBeVisible();
    await expect(contactLink).toBeVisible();
  });

  test('Navigation links have hover states', async ({ page }) => {
    // Set viewport to desktop size
    await page.setViewportSize({ width: 1280, height: 720 });

    const nav = page.locator('nav, header').first();
    const journeyLink = nav.locator('a[href="#about"], a:has-text("Journey")');

    // 1. Verify link is visible
    await expect(journeyLink).toBeVisible();

    // 2. Hover over the link
    await journeyLink.hover();
    await page.waitForTimeout(100);

    // 3. Verify cursor changes to pointer
    const cursor = await journeyLink.evaluate((el) =>
      window.getComputedStyle(el).cursor
    );
    expect(cursor).toBe('pointer');

    // 4. Verify hover state applies (check for transition properties)
    const transition = await journeyLink.evaluate((el) =>
      window.getComputedStyle(el).transition
    );
    expect(transition).toBeTruthy();
  });

  test('Navigation bar accessibility', async ({ page }) => {
    // Set viewport to desktop
    await page.setViewportSize({ width: 1280, height: 720 });

    const nav = page.locator('nav, header').first();

    // 1. Verify navigation has semantic HTML
    const navElement = await nav.evaluate((el) => el.tagName.toLowerCase());
    expect(['nav', 'header']).toContain(navElement);

    // 2. Verify all links are keyboard accessible
    const journeyLink = nav.locator('a[href="#about"], a:has-text("Journey")');
    await journeyLink.focus();
    await expect(journeyLink).toBeFocused();

    // 3. Press Enter to activate the link
    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);
    expect(page.url()).toContain('#about');

    // 4. Verify theme toggle is keyboard accessible
    const themeToggle = nav.locator('button[aria-label*="theme" i], button[aria-label*="Toggle" i]');
    await themeToggle.focus();
    await expect(themeToggle).toBeFocused();

    // 5. Verify theme toggle has aria-label
    const ariaLabel = await themeToggle.getAttribute('aria-label');
    expect(ariaLabel).toBeTruthy();
    expect(ariaLabel?.toLowerCase()).toContain('theme');
  });
});
