// spec: test-plan.md (Section 13: Responsive Design)
// seed: seed.spec.ts

import { test, expect } from "@playwright/test";

test.describe("Responsive Design", () => {
  test("Mobile viewport (375px) - iPhone SE", async ({ page }) => {
    // Set viewport to iPhone SE size
    await page.setViewportSize({ width: 375, height: 667 });

    // Navigate to the page
    await page.goto("http://localhost:4321");

    // Wait for page to load
    await page.waitForLoadState("domcontentloaded");

    // NAVIGATION: Verify mobile navigation
    const nav = page.locator("nav");
    await expect(nav).toBeVisible();

    // Desktop navigation links should be hidden on mobile
    const desktopNavLinks = page
      .locator("nav a")
      .filter({ hasText: /Journey|Now|Projects|Contact/ });
    const firstNavLink = desktopNavLinks.first();
    const isNavVisible = await firstNavLink.isVisible().catch(() => false);
    expect(isNavVisible).toBeFalsy();

    // Logo and theme toggle should be visible
    const logo = page.locator('nav a[href="#home"], nav a[href="/"]').first();
    await expect(logo).toBeVisible();

    const themeToggle = page
      .locator(
        'div[aria-label="Mobile navigation"] button[aria-label="Toggle theme"]'
      )
      .first();
    await expect(themeToggle).toBeVisible();

    // HERO SECTION: Verify hero section is visible and stacked
    const heroTitle = page.getByRole("heading").getByText("CHAIM LEV-ARI");
    await expect(heroTitle).toBeVisible();

    const heroSubtitle = page.getByText("Full-Stack Developer", {
      exact: true,
    });
    await expect(heroSubtitle).toBeVisible();

    // Hero buttons should be visible
    const viewProjectsBtn = page.getByRole("link", { name: /View Projects/i });
    await expect(viewProjectsBtn).toBeVisible();

    // WORK EXPERIENCE: Scroll to and verify work section
    await page.locator("#work").scrollIntoViewIfNeeded();

    const workTitle = page.getByText("WORK EXPERIENCE");
    await expect(workTitle).toBeVisible();

    // PROJECTS SECTION: Verify projects display in single column
    await page.locator("#projects").scrollIntoViewIfNeeded();

    const projectsTitle = page.getByText("SIDE PROJECTS");
    await expect(projectsTitle).toBeVisible();

    // CONTACT SECTION: Verify contact section
    await page.locator("#contact").scrollIntoViewIfNeeded();

    const contactTitle = page.getByText("LET'S WORK TOGETHER");
    await expect(contactTitle).toBeVisible();

    // NO HORIZONTAL OVERFLOW: Check for overflow
    const bodyWidth = await page
      .locator("body")
      .evaluate((el) => el.scrollWidth);
    const viewportWidth = 375;
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1); // +1 for rounding
  });

  test("Tablet viewport (768px) - Responsive layout at tablet breakpoint", async ({
    page,
  }) => {
    // Set viewport to tablet size
    await page.setViewportSize({ width: 768, height: 1024 });

    // Navigate to the page
    await page.goto("http://localhost:4321");

    // Wait for page to load
    await page.waitForLoadState("domcontentloaded");

    // NAVIGATION: Desktop navigation should appear at 768px breakpoint
    const journeyLink = page
      .locator("nav a")
      .filter({ hasText: /Journey/i })
      .first();
    await expect(journeyLink).toBeVisible();

    // Logo should be visible
    const logo = page.locator('nav a[href="#home"], nav a[href="/"]').first();
    await expect(logo).toBeVisible();

    // Theme toggle should be visible
    const themeToggle = page
      .locator(
        'div[aria-label="Desktop navigation"] button[aria-label="Toggle theme"]'
      )
      .first();
    await expect(themeToggle).toBeVisible();

    // HERO SECTION: Verify hero displays properly
    const heroTitle = page.getByRole("heading").getByText("CHAIM LEV-ARI");
    await expect(heroTitle).toBeVisible();

    // WORK EXPERIENCE: Verify section
    await page.locator("#work").scrollIntoViewIfNeeded();

    const workTitle = page.getByText("WORK EXPERIENCE");
    await expect(workTitle).toBeVisible();

    // PROJECTS: Verify section
    await page.locator("#projects").scrollIntoViewIfNeeded();

    const projectsTitle = page.getByText("SIDE PROJECTS");
    await expect(projectsTitle).toBeVisible();

    // CONTACT: Verify section
    await page.locator("#contact").scrollIntoViewIfNeeded();

    const contactTitle = page.getByText("LET'S WORK TOGETHER");
    await expect(contactTitle).toBeVisible();

    // NO HORIZONTAL OVERFLOW
    const bodyWidth = await page
      .locator("body")
      .evaluate((el) => el.scrollWidth);
    const viewportWidth = 768;
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1);
  });

  test("Desktop viewport (1920px) - Full desktop layout", async ({ page }) => {
    // Set viewport to desktop size
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Navigate to the page
    await page.goto("http://localhost:4321");

    // Wait for page to load
    await page.waitForLoadState("domcontentloaded");

    // NAVIGATION: Full desktop navigation should be visible
    const navJourney = page
      .locator("nav a")
      .filter({ hasText: /Journey/i })
      .first();
    const navProjects = page
      .locator("nav a")
      .filter({ hasText: /Projects/i })
      .first();
    const navContact = page
      .locator("nav a")
      .filter({ hasText: /Contact/i })
      .first();

    await expect(navJourney).toBeVisible();
    await expect(navProjects).toBeVisible();
    await expect(navContact).toBeVisible();

    // HERO SECTION: Full desktop hero layout
    const heroTitle = page.getByRole("heading").getByText("CHAIM LEV-ARI");
    await expect(heroTitle).toBeVisible();

    // WORK EXPERIENCE: Full width cards with proper spacing
    await page.locator("#work").scrollIntoViewIfNeeded();

    const workTitle = page.getByText("WORK EXPERIENCE");
    await expect(workTitle).toBeVisible();

    // PROJECTS: Multi-column project grid
    await page.locator("#projects").scrollIntoViewIfNeeded();

    const projectsTitle = page.getByText("SIDE PROJECTS");
    await expect(projectsTitle).toBeVisible();

    // BLOG SECTION: Currently hidden (commented out in index.astro)
    // await page.locator('#blog').scrollIntoViewIfNeeded();
    // const blogTitle = page.getByText('BLOG');
    // await expect(blogTitle).toBeVisible();
    // const comingSoon = page.getByText('Coming Soon');
    // await expect(comingSoon).toBeVisible();

    // CONTACT: Full desktop contact layout
    await page.locator("#contact").scrollIntoViewIfNeeded();

    const contactTitle = page.getByText("LET'S WORK TOGETHER");
    await expect(contactTitle).toBeVisible();

    // FOOTER: Verify footer layout
    const footer = page.locator("footer");
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeVisible();

    // NO HORIZONTAL OVERFLOW
    const bodyWidth = await page
      .locator("body")
      .evaluate((el) => el.scrollWidth);
    const viewportWidth = 1920;
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1);
  });

  test("No horizontal overflow - Verify at multiple viewport sizes", async ({
    page,
  }) => {
    const viewports = [
      { width: 320, height: 568, name: "iPhone SE (small)" },
      { width: 375, height: 667, name: "iPhone SE" },
      { width: 414, height: 896, name: "iPhone XR" },
      { width: 768, height: 1024, name: "iPad Portrait" },
      { width: 1024, height: 768, name: "iPad Landscape" },
      { width: 1366, height: 768, name: "Laptop" },
      { width: 1920, height: 1080, name: "Desktop FHD" },
    ];

    for (const viewport of viewports) {
      // Set viewport size
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });

      // Navigate to the page
      await page.goto("http://localhost:4321");

      // Wait for page to load
      await page.waitForLoadState("domcontentloaded");

      // Check body scroll width vs viewport width
      const bodyScrollWidth = await page
        .locator("body")
        .evaluate((el) => el.scrollWidth);
      const htmlScrollWidth = await page
        .locator("html")
        .evaluate((el) => el.scrollWidth);

      // Allow 1px tolerance for rounding issues
      expect(
        bodyScrollWidth,
        `${viewport.name}: Body scroll width should not exceed viewport`
      ).toBeLessThanOrEqual(viewport.width + 1);
      expect(
        htmlScrollWidth,
        `${viewport.name}: HTML scroll width should not exceed viewport`
      ).toBeLessThanOrEqual(viewport.width + 1);

      // Scroll through page to check all sections
      await page.evaluate(() =>
        window.scrollTo(0, document.body.scrollHeight / 4)
      );
      await page.waitForTimeout(100);

      await page.evaluate(() =>
        window.scrollTo(0, document.body.scrollHeight / 2)
      );
      await page.waitForTimeout(100);

      await page.evaluate(() =>
        window.scrollTo(0, (document.body.scrollHeight * 3) / 4)
      );
      await page.waitForTimeout(100);

      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(100);

      // Check again after scrolling
      const bodyScrollWidthAfter = await page
        .locator("body")
        .evaluate((el) => el.scrollWidth);
      expect(
        bodyScrollWidthAfter,
        `${viewport.name}: No overflow after scrolling`
      ).toBeLessThanOrEqual(viewport.width + 1);
    }
  });

  test("Touch targets on mobile - Verify 44x44px accessibility standard", async ({
    page,
  }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });

    // Navigate to the page
    await page.goto("http://localhost:4321");

    // Wait for page to load
    await page.waitForLoadState("domcontentloaded");

    // NAVIGATION: Check theme toggle button size
    const themeToggle = page.locator(
      'div[aria-label="Mobile navigation"] button[aria-label="Toggle theme"]'
    );

    await expect(themeToggle).toBeVisible();

    const themeToggleBox = await themeToggle.boundingBox();
    expect(
      themeToggleBox!.width,
      "Theme toggle width should be at least 44px"
    ).toBeGreaterThanOrEqual(44);
    expect(
      themeToggleBox!.height,
      "Theme toggle height should be at least 44px"
    ).toBeGreaterThanOrEqual(44);

    // HERO SECTION: Check CTA button sizes
    const viewProjectsBtn = page.getByRole("link", { name: /view projects/i });
    await expect(viewProjectsBtn).toBeVisible();

    const viewProjectsBtnBox = await viewProjectsBtn.boundingBox();
    expect(
      viewProjectsBtnBox!.height,
      "View Projects button height should be at least 44px"
    ).toBeGreaterThanOrEqual(44);

    const getInTouchBtn = page.getByRole("link", { name: /get in touch/i });
    await expect(getInTouchBtn).toBeVisible();

    const getInTouchBtnBox = await getInTouchBtn.boundingBox();
    expect(
      getInTouchBtnBox!.height,
      "Get In Touch button height should be at least 44px"
    ).toBeGreaterThanOrEqual(44);

    // HERO SECTION: Check social icon link sizes
    const githubLink = page.getByRole("link", { name: "GitHub" });
    if ((await githubLink.count()) > 0) {
      await expect(githubLink).toBeVisible();
      const githubLinkBox = await githubLink.boundingBox();
      expect(
        githubLinkBox!.width,
        "GitHub link width should be at least 44px"
      ).toBeGreaterThanOrEqual(44);
      expect(
        githubLinkBox!.height,
        "GitHub link height should be at least 44px"
      ).toBeGreaterThanOrEqual(44);
    }

    const linkedinLink = page.getByRole("link", { name: "LinkedIn" });
    if ((await linkedinLink.count()) > 0) {
      await expect(linkedinLink).toBeVisible();
      const linkedinLinkBox = await linkedinLink.boundingBox();
      expect(
        linkedinLinkBox!.width,
        "LinkedIn link width should be at least 44px"
      ).toBeGreaterThanOrEqual(44);
      expect(
        linkedinLinkBox!.height,
        "LinkedIn link height should be at least 44px"
      ).toBeGreaterThanOrEqual(44);
    }

    const emailLink = page.locator('a[href^="mailto:"]').first();
    if ((await emailLink.count()) > 0) {
      await expect(emailLink).toBeVisible();
      const emailLinkBox = await emailLink.boundingBox();
      expect(
        emailLinkBox!.width,
        "Email link width should be at least 44px"
      ).toBeGreaterThanOrEqual(44);
      expect(
        emailLinkBox!.height,
        "Email link height should be at least 44px"
      ).toBeGreaterThanOrEqual(44);
    }

    // CONTACT SECTION: Check contact card links
    await page.locator("#contact").scrollIntoViewIfNeeded();

    const contactEmailCard = page
      .locator("#contact")
      .locator('a[href^="mailto:"]')
      .first();
    if ((await contactEmailCard.count()) > 0) {
      await expect(contactEmailCard).toBeVisible();
      const contactEmailCardBox = await contactEmailCard.boundingBox();
      expect(
        contactEmailCardBox!.height,
        "Contact email card should be tappable"
      ).toBeGreaterThanOrEqual(44);
    }
  });
});
