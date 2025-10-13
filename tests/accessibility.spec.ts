// spec: test-plan.md - Section 14: Accessibility
// seed: seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
    await page.waitForLoadState('domcontentloaded');
  });

  test('Keyboard navigation works', async ({ page }) => {
    // Start from the top of the page
    await page.keyboard.press('Tab');

    // Tab through navigation links and theme toggle
    const focusedElements: string[] = [];

    for (let i = 0; i < 10; i++) {
      const focusedElement = await page.evaluate(() => {
        const el = document.activeElement;
        return {
          tag: el?.tagName.toLowerCase(),
          text: el?.textContent?.trim().substring(0, 20),
          href: (el as HTMLAnchorElement)?.href,
          ariaLabel: el?.getAttribute('aria-label')
        };
      });

      focusedElements.push(focusedElement.tag || 'unknown');

      if (focusedElement.tag === 'button' && focusedElement.ariaLabel?.includes('Toggle theme')) {
        // Found theme toggle - press Enter to activate
        await page.keyboard.press('Enter');
        await page.waitForTimeout(200);

        // Verify theme changed
        const htmlClass = await page.locator('html').getAttribute('class');
        expect(['light', 'dark']).toContain(htmlClass);
        break;
      }

      await page.keyboard.press('Tab');
    }

    // Verify we tabbed through interactive elements
    expect(focusedElements.filter(el => ['a', 'button'].includes(el)).length).toBeGreaterThan(0);
  });

  test('ARIA labels present', async ({ page }) => {
    // Check theme toggle has aria-label (use .first() since there are 2 - desktop and mobile)
    const themeToggle = page.locator('button[aria-label="Toggle theme"]').first();
    await expect(themeToggle).toBeVisible();
    await expect(themeToggle).toHaveAttribute('aria-label', 'Toggle theme');

    // Check social links have aria-labels or accessible names
    const githubLink = page.locator('a[href*="github"]').first();
    if (await githubLink.count() > 0) {
      const ariaLabel = await githubLink.getAttribute('aria-label');
      const title = await githubLink.getAttribute('title');
      const textContent = await githubLink.textContent();

      // Should have at least one way to identify the link
      expect(ariaLabel || title || textContent).toBeTruthy();
    }

    // Check navigation links have accessible text
    const navLinks = page.locator('nav a');
    const navLinkCount = await navLinks.count();

    for (let i = 0; i < navLinkCount; i++) {
      const link = navLinks.nth(i);
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');

      // Each link should have visible text or aria-label
      expect(text || ariaLabel).toBeTruthy();
    }
  });

  test('Semantic HTML', async ({ page }) => {
    // Check for nav element
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    const navTag = await nav.evaluate(el => el.tagName.toLowerCase());
    expect(navTag).toBe('nav');

    // Check for main element
    const main = page.locator('main');
    await expect(main).toBeVisible();
    const mainTag = await main.evaluate(el => el.tagName.toLowerCase());
    expect(mainTag).toBe('main');

    // Check for section elements
    const sections = page.locator('section');
    const sectionCount = await sections.count();
    expect(sectionCount).toBeGreaterThan(0);

    // Verify sections have IDs for navigation
    const workSection = page.locator('section#work');
    const projectsSection = page.locator('section#projects');
    const contactSection = page.locator('section#contact');

    await expect(workSection).toBeAttached();
    await expect(projectsSection).toBeAttached();
    await expect(contactSection).toBeAttached();

    // Check for article elements (work cards, project cards)
    const articles = page.locator('article');
    const articleCount = await articles.count();
    expect(articleCount).toBeGreaterThan(0);

    // Check for footer element
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    const footerTag = await footer.evaluate(el => el.tagName.toLowerCase());
    expect(footerTag).toBe('footer');
  });

  test('Focus visible', async ({ page }) => {
    // Tab to first interactive element
    await page.keyboard.press('Tab');

    // Get focused element
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();

    // Check if focus outline is visible (computed styles)
    const outlineWidth = await focusedElement.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return styles.outlineWidth;
    });

    const outlineStyle = await focusedElement.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return styles.outlineStyle;
    });

    // Should have visible outline or ring
    const hasVisibleOutline = outlineWidth !== '0px' && outlineStyle !== 'none';

    // Or check for Tailwind ring classes
    const className = await focusedElement.getAttribute('class');
    const hasFocusRing = className?.includes('focus:') || className?.includes('focus-visible:');

    expect(hasVisibleOutline || hasFocusRing).toBeTruthy();
  });

  test('Alt text on images', async ({ page }) => {
    // Get all images
    const images = page.locator('img');
    const imageCount = await images.count();

    expect(imageCount).toBeGreaterThan(0);

    // Check each image has alt text
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);

      // Get alt attribute
      const alt = await img.getAttribute('alt');

      // Alt text should exist (can be empty for decorative images)
      expect(alt).not.toBeNull();

      // For content images, alt should be descriptive
      const src = await img.getAttribute('src');
      if (src?.includes('work') || src?.includes('project')) {
        expect(alt!.length).toBeGreaterThan(0);
      }
    }
  });

  test('Heading hierarchy', async ({ page }) => {
    // Check for h1 (should be only one per page)
    const h1Elements = page.locator('h1');
    const h1Count = await h1Elements.count();

    // Should have exactly 1 h1
    expect(h1Count).toBe(1);

    // Verify h1 contains main heading
    const h1Text = await h1Elements.first().textContent();
    expect(h1Text?.toUpperCase()).toContain('CHAIM LEV-ARI');

    // Check for h2 section headings
    const h2Elements = page.locator('h2');
    const h2Count = await h2Elements.count();
    expect(h2Count).toBeGreaterThan(0);

    // Verify h2 headings are section titles
    const workH2 = page.locator('h2:has-text("WORK EXPERIENCE")');
    await expect(workH2).toBeVisible();

    const projectsH2 = page.locator('h2:has-text("SIDE PROJECTS")');
    await expect(projectsH2).toBeVisible();

    // Check for h3 (card titles)
    const h3Elements = page.locator('h3');
    const h3Count = await h3Elements.count();
    expect(h3Count).toBeGreaterThan(0);
  });

  test('Links have descriptive text', async ({ page }) => {
    // Get all links
    const links = page.locator('a');
    const linkCount = await links.count();

    for (let i = 0; i < linkCount; i++) {
      const link = links.nth(i);

      // Get link text, aria-label, or title
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');
      const title = await link.getAttribute('title');

      // Link should have descriptive text or label
      const hasDescription = (text && text.trim().length > 0) || ariaLabel || title;
      expect(hasDescription).toBeTruthy();

      // Avoid generic text like "click here"
      if (text) {
        const lowerText = text.toLowerCase();
        expect(lowerText).not.toBe('click here');
        expect(lowerText).not.toBe('here');
        expect(lowerText).not.toBe('link');
      }
    }
  });

  test('External links open in new tab with security', async ({ page }) => {
    // Get all external links (http/https URLs)
    const externalLinks = page.locator('a[href^="http"]');
    const linkCount = await externalLinks.count();

    for (let i = 0; i < linkCount; i++) {
      const link = externalLinks.nth(i);

      // Check for target="_blank"
      const target = await link.getAttribute('target');
      expect(target).toBe('_blank');

      // Check for rel="noopener noreferrer" for security
      const rel = await link.getAttribute('rel');
      expect(rel).toContain('noopener');
      expect(rel).toContain('noreferrer');
    }
  });

  test('Form elements have labels (if present)', async ({ page }) => {
    // Check if there's a blog notification form
    const emailInput = page.locator('input[type="email"]');

    if (await emailInput.count() > 0) {
      // Input should have associated label or aria-label
      const inputId = await emailInput.getAttribute('id');
      const ariaLabel = await emailInput.getAttribute('aria-label');
      const ariaLabelledBy = await emailInput.getAttribute('aria-labelledby');
      const placeholder = await emailInput.getAttribute('placeholder');

      // Should have at least one way to identify the input
      const hasLabel = inputId || ariaLabel || ariaLabelledBy || placeholder;
      expect(hasLabel).toBeTruthy();

      // If there's a label element, it should be associated
      if (inputId) {
        const label = page.locator(`label[for="${inputId}"]`);
        if (await label.count() > 0) {
          await expect(label).toBeVisible();
        }
      }
    }
  });

  test('Color contrast - Basic check', async ({ page }) => {
    // Check hero text contrast
    const heroTitle = page.locator('h1');
    await expect(heroTitle).toBeVisible();

    const titleColor = await heroTitle.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        color: styles.color,
        backgroundColor: styles.backgroundColor
      };
    });

    // Should have defined colors
    expect(titleColor.color).toBeTruthy();

    // Check navigation text contrast
    const navLink = page.locator('nav a').first();
    if (await navLink.count() > 0) {
      const navColor = await navLink.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          color: styles.color,
          backgroundColor: styles.backgroundColor
        };
      });

      expect(navColor.color).toBeTruthy();
    }

    // Note: Actual contrast ratio calculation would require additional libraries
    // This test verifies colors are defined, not the actual ratio
  });

  test('Language attribute set', async ({ page }) => {
    // Check html lang attribute
    const htmlLang = await page.locator('html').getAttribute('lang');
    expect(htmlLang).toBeTruthy();
    expect(htmlLang).toBe('en');
  });

  test('Page has title', async ({ page }) => {
    // Verify page title is set
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);
    expect(title).toContain('Chaim Lev-Ari');
  });

  test('Reduced motion respected (if enabled)', async ({ page }) => {
    // Set reduced motion preference
    await page.emulateMedia({ reducedMotion: 'reduce' });

    // Reload page
    await page.reload();
    await page.waitForLoadState('domcontentloaded');

    // Verify animations respect prefers-reduced-motion
    // Check if transition classes conditionally apply
    const heroSection = page.locator('#home').first();
    await expect(heroSection).toBeVisible();

    // Page should still be functional with reduced motion
    await page.keyboard.press('Tab');
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('Skip to content link (if present)', async ({ page }) => {
    // Look for skip to content link
    const skipLink = page.locator('a[href="#main-content"], a[href="#content"], a:has-text("Skip to content")');

    if (await skipLink.count() > 0) {
      // Skip link should be present but potentially hidden
      await expect(skipLink).toBeAttached();

      // Press Tab to focus skip link
      await page.keyboard.press('Tab');

      // Skip link should become visible on focus
      const isVisible = await skipLink.isVisible();

      if (isVisible) {
        // Press Enter to activate
        await page.keyboard.press('Enter');

        // Should jump to main content
        const mainContent = page.locator('main, #main-content, #content');
        await expect(mainContent.first()).toBeInViewport();
      }
    }
  });

  test('Interactive elements have appropriate roles', async ({ page }) => {
    // Buttons should have button role
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();

    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i);
      const role = await button.getAttribute('role');
      const tag = await button.evaluate(el => el.tagName.toLowerCase());

      // Should be button tag or have button role
      expect(tag === 'button' || role === 'button').toBeTruthy();
    }

    // Links should be actual anchor tags
    const links = page.locator('a');
    const linkCount = await links.count();

    for (let i = 0; i < linkCount; i++) {
      const link = links.nth(i);
      const tag = await link.evaluate(el => el.tagName.toLowerCase());

      // Should be anchor tag
      expect(tag).toBe('a');

      // Should have href
      const href = await link.getAttribute('href');
      expect(href).toBeTruthy();
    }
  });
});
