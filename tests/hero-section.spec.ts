// spec: test-plan.md - Section 4: Hero Section
// seed: seed.spec.ts

import { test, expect } from "@playwright/test";

test.describe("Hero Section", () => {
  test("Hero section renders correctly", async ({ page }) => {
    // Navigate to the portfolio homepage
    await page.goto("http://localhost:4321");

    // Wait for the hero section to be visible
    const heroSection = page.locator("section#home");
    await expect(heroSection).toBeVisible();

    // Verify name is displayed (DOM text is "Chaim Lev-Ari", displayed as "CHAIM LEV-ARI" via CSS uppercase)
    await expect(page.locator("h1")).toContainText("Chaim Lev-Ari");

    // Verify title is displayed (DOM text is "Full-Stack Developer", displayed as "FULL-STACK DEVELOPER" via CSS uppercase)
    await expect(
      page.getByText("Full-Stack Developer", { exact: true })
    ).toBeVisible();

    // Verify skills are displayed
    await expect(page.getByText("React • TypeScript • Go")).toBeVisible();

    // Verify description paragraph is visible
    await expect(
      page.getByText(/Full-stack developer with 10\+ years of experience/)
    ).toBeVisible();

    // Verify CTA buttons are present and visible
    const viewProjectsBtn = page.getByRole("link", { name: /View Projects/i });
    await expect(viewProjectsBtn).toBeVisible();

    const getInTouchBtn = page.getByRole("link", { name: /Get In Touch/i });
    await expect(getInTouchBtn).toBeVisible();

    // Verify social icons are visible
    const githubLink = page.getByRole("link", { name: "GitHub" });
    await expect(githubLink).toBeVisible();

    const linkedinLink = page.getByRole("link", { name: "LinkedIn" });
    await expect(linkedinLink).toBeVisible();

    const emailLink = page.getByRole("link", { name: "Email" });
    await expect(emailLink).toBeVisible();

    // Verify hero section has correct styling (full viewport height)
    await expect(heroSection).toHaveClass(/min-h-screen/);
  });

  test("3D animation loads and renders", async ({ page }) => {
    // Navigate to the portfolio homepage
    await page.goto("http://localhost:4321");

    // Wait for the page to be fully loaded
    await page.waitForLoadState("domcontentloaded");

    // Check that canvas element exists (Three.js renders to canvas)
    const canvas = page.locator("canvas");
    await expect(canvas).toBeVisible();

    // Verify canvas is within the hero section
    const heroSection = page.locator("section#home");
    const canvasInHero = heroSection.locator("canvas");
    await expect(canvasInHero).toBeVisible();

    // Verify the 3D scene container has reduced opacity
    const scene3DContainer = page.locator(".absolute.inset-0.opacity-30");
    await expect(scene3DContainer).toBeVisible();

    // Wait a bit for the animation to render frames
    await page.waitForTimeout(1000);

    // Verify canvas has proper dimensions (should be non-zero)
    const canvasBoundingBox = await canvas.boundingBox();
    expect(canvasBoundingBox).not.toBeNull();
    expect(canvasBoundingBox!.width).toBeGreaterThan(0);
    expect(canvasBoundingBox!.height).toBeGreaterThan(0);

    // Verify WebGL context is initialized (canvas should have WebGL rendering)
    const hasWebGL = await canvas.evaluate((canvas) => {
      const c = canvas as HTMLCanvasElement;
      const gl = c.getContext("webgl") || c.getContext("webgl2");
      return gl !== null;
    });
    expect(hasWebGL).toBeTruthy();
  });

  test("CTA buttons are functional", async ({ page }) => {
    // Navigate to the portfolio homepage
    await page.goto("http://localhost:4321");

    // Test "View Projects" button
    const viewProjectsButton = page.getByRole("link", {
      name: /View Projects/i,
    });
    await expect(viewProjectsButton).toBeVisible();

    // Verify it has correct href
    await expect(viewProjectsButton).toHaveAttribute("href", "#projects");

    // Click and verify navigation to projects section
    await viewProjectsButton.click();
    await page.waitForTimeout(500); // Wait for smooth scroll

    // Verify URL hash updated
    expect(page.url()).toContain("#projects");

    // Navigate back to home
    await page.goto("http://localhost:4321");

    // Test "Get In Touch" button
    const getInTouchButton = page.getByRole("link", { name: /Get In Touch/i });
    await expect(getInTouchButton).toBeVisible();

    // Verify it has correct href
    await expect(getInTouchButton).toHaveAttribute("href", "#contact");

    // Click and verify navigation to contact section
    await getInTouchButton.click();
    await page.waitForTimeout(500); // Wait for smooth scroll

    // Verify URL hash updated
    expect(page.url()).toContain("#contact");

    // Verify buttons have proper styling
    await page.goto("http://localhost:4321");

    // Re-locate buttons after navigation
    const viewProjectsBtnRefreshed = page.getByRole("link", {
      name: /View Projects/i,
    });
    const getInTouchBtnRefreshed = page.getByRole("link", {
      name: /Get In Touch/i,
    });

    // View Projects button should have shadow effect
    const viewProjectsBtnClass = await viewProjectsBtnRefreshed.getAttribute(
      "class"
    );
    expect(viewProjectsBtnClass).toContain("shadow-brutal");

    // Get In Touch button should have outline variant
    const getInTouchBtnClass = await getInTouchBtnRefreshed.getAttribute(
      "class"
    );
    expect(getInTouchBtnClass).toContain("border-brutal");

    // Verify arrow icon is visible on View Projects button
    const arrowIcon = viewProjectsBtnRefreshed.locator("svg");
    await expect(arrowIcon).toBeVisible();
  });

  test("Social links work", async ({ page }) => {
    // Navigate to the portfolio homepage
    await page.goto("http://localhost:4321");

    // Test GitHub link
    const githubLink = page.getByRole("link", { name: "GitHub" });
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/chiptus"
    );
    await expect(githubLink).toHaveAttribute("target", "_blank");
    await expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");

    // Verify GitHub icon is present
    const githubIcon = githubLink.locator("svg");
    await expect(githubIcon).toBeVisible();

    // Test LinkedIn link
    const linkedinLink = page.getByRole("link", { name: "LinkedIn" });
    await expect(linkedinLink).toBeVisible();
    await expect(linkedinLink).toHaveAttribute(
      "href",
      "http://linkedin.com/in/chiptus"
    );
    await expect(linkedinLink).toHaveAttribute("target", "_blank");
    await expect(linkedinLink).toHaveAttribute("rel", "noopener noreferrer");

    // Verify LinkedIn icon is present
    const linkedinIcon = linkedinLink.locator("svg");
    await expect(linkedinIcon).toBeVisible();

    // Test Email link
    const emailLink = page.getByRole("link", { name: "Email" });
    await expect(emailLink).toBeVisible();
    await expect(emailLink).toHaveAttribute("href", "mailto:chaim@lev-ari.me");

    // Verify Email icon is present
    const emailIcon = emailLink.locator("svg");
    await expect(emailIcon).toBeVisible();

    // Verify social links have hover transition classes
    const githubClass = await githubLink.getAttribute("class");
    const linkedinClass = await linkedinLink.getAttribute("class");
    const emailClass = await emailLink.getAttribute("class");

    expect(githubClass).toContain("transition-colors");
    expect(linkedinClass).toContain("transition-colors");
    expect(emailClass).toContain("transition-colors");

    // Test hover state on GitHub link
    await githubLink.hover();
    await page.waitForTimeout(200); // Wait for transition

    // Verify the hover classes are present
    expect(githubClass).toContain("hover:text-primary");
  });

  test("Hero responsive on mobile", async ({ page }) => {
    // Set viewport to mobile size (iPhone SE dimensions)
    await page.setViewportSize({ width: 375, height: 667 });

    // Navigate to the portfolio homepage
    await page.goto("http://localhost:4321");

    // Verify hero section is visible on mobile
    const heroSection = page.locator("section#home");
    await expect(heroSection).toBeVisible();

    // Verify name is readable on mobile (DOM text is "Chaim Lev-Ari", displayed as "CHAIM LEV-ARI" via CSS uppercase)
    const nameHeading = page.locator("h1");
    await expect(nameHeading).toBeVisible();
    await expect(nameHeading).toContainText("Chaim Lev-Ari");

    // Verify responsive text sizing (should use smaller size on mobile)
    await expect(nameHeading).toHaveClass(/text-5xl/);

    // Verify title and skills are visible
    await expect(
      page.getByText("Full-Stack Developer", { exact: true })
    ).toBeVisible();
    await expect(page.getByText("React • TypeScript • Go")).toBeVisible();

    // Verify description is visible and readable
    await expect(
      page.getByText(/Full-stack developer with 10\+ years of experience/)
    ).toBeVisible();

    // Verify CTA buttons stack properly on mobile
    const viewProjectsButton = page.getByRole("link", {
      name: /View Projects/i,
    });
    const getInTouchButton = page.getByRole("link", { name: /Get In Touch/i });

    await expect(viewProjectsButton).toBeVisible();
    await expect(getInTouchButton).toBeVisible();

    // Buttons should wrap using flex-wrap
    const buttonContainer = page.locator(".flex.flex-wrap.items-center.gap-4");
    await expect(buttonContainer).toBeVisible();

    // Verify social icons are visible and accessible on mobile
    await expect(page.getByRole("link", { name: "GitHub" })).toBeVisible();
    await expect(page.getByRole("link", { name: "LinkedIn" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Email" })).toBeVisible();

    // Verify 3D canvas still renders on mobile
    const canvas = page.locator("canvas");
    await expect(canvas).toBeVisible();

    // Verify no horizontal overflow
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth);

    // Verify content is properly padded on mobile
    const container = page.locator(".container.mx-auto.px-6");
    await expect(container).toBeVisible();

    // Test tablet viewport (768px)
    await page.setViewportSize({ width: 768, height: 1024 });

    // Verify responsive heading size increases at md breakpoint
    await expect(nameHeading).toHaveClass(/md:text-7xl/);
  });
});
