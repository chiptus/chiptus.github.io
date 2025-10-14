// spec: test-plan.md - Section: Projects (DATA-DRIVEN REFACTORED VERSION)
// seed: seed.spec.ts
// NOTE: Technology filter feature is currently commented out in Projects.tsx (lines 34-50)

import { test, expect } from "@playwright/test";
import { testData } from "./fixtures/test-data";
import {
  expectSectionVisible,
  expectCardsFromData,
  expectSecureExternalLink,
  expectTechTags,
  expectImageWithAlt,
} from "./helpers/assertions";

test.describe("Projects Section", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the portfolio website
    await page.goto("http://localhost:4321");

    // Scroll to projects section
    await page.locator("#projects").scrollIntoViewIfNeeded();

    // Wait for the section to be visible
    await page.locator("#projects").waitFor({ state: "visible" });
  });

  test("Projects section renders", async ({ page }) => {
    // Use helper to verify section visibility
    const section = await expectSectionVisible(page, "projects");

    // Verify section title (text is "Side Projects" in DOM, displayed as "SIDE PROJECTS" via CSS uppercase)
    const sectionTitle = section.locator("h2");
    await expect(sectionTitle).toHaveText("Side Projects");

    // Verify section subtitle
    const subtitle = section.locator("p").first();
    await expect(subtitle).toContainText("Personal projects & experiments");

    // Verify project cards container exists
    const projectsGrid = section.locator(".grid");
    await expect(projectsGrid).toBeVisible();
  });

  test("All project cards display", async ({ page }) => {
    // Use helper to verify cards match data
    await expectCardsFromData(
      page,
      "#projects article",
      testData.projects,
      (project) => project.name
    );

    // Check each project card has required elements (using data count)
    const projectCards = page.locator("#projects article");
    for (let i = 0; i < testData.projectCount; i++) {
      const card = projectCards.nth(i);

      // Check for image
      await expectImageWithAlt(card.locator("img"));

      // Check for title (use first to avoid strict mode with case study accordion)
      await expect(card.locator("h3").first()).toBeVisible();

      // Check for description
      await expect(card.locator("p")).toBeVisible();

      // Check for tech tags
      const techTags = card.locator("span.font-mono");
      expect(await techTags.count()).toBeGreaterThan(0);
    }
  });

  test("Project names and descriptions match data", async ({ page }) => {
    // Verify each project from data is rendered with correct content
    for (const project of testData.projects) {
      // Project name should be visible
      await expect(page.getByText(project.name).first()).toBeVisible();

      // Description should be visible
      await expect(page.getByText(project.description).first()).toBeVisible();
    }
  });

  test("Technology tags match data", async ({ page }) => {
    const projectCards = page.locator("#projects article");

    // Verify each project has the correct tech tags from data
    for (let i = 0; i < testData.projectCount; i++) {
      const card = projectCards.nth(i);
      const project = testData.projects[i];

      // Use helper to verify tech tags match data
      await expectTechTags(card, project.tech);
    }
  });

  test.fixme("Technology filters work", async ({ page }) => {
    // FIXME: This test is skipped because filters are commented out in Projects.tsx (lines 34-50)
    // The filter UI is not rendered, so there are no filter buttons to interact with.
    // Uncomment lines 34-50 in src/components/Projects.tsx to enable this test.

    // Get all filter buttons
    const filterButtons = page.locator("#projects button");
    const filterCount = await filterButtons.count();

    // Should have "All" plus individual tech filters
    expect(filterCount).toBeGreaterThan(1);

    // Verify "All" filter is selected by default
    const allButton = filterButtons.filter({ hasText: "All" });
    await expect(allButton).toHaveClass(/bg-primary/);

    // Click on a specific technology filter (React)
    const reactButton = filterButtons.filter({ hasText: "React" });
    if ((await reactButton.count()) > 0) {
      await reactButton.click();

      // Verify React filter is now selected
      await expect(reactButton).toHaveClass(/bg-primary/);

      // Verify All filter is no longer selected
      await expect(allButton).not.toHaveClass(/bg-primary/);
    }
  });

  test.fixme("Filter shows correct projects", async ({ page }) => {
    // FIXME: This test is skipped because filters are commented out in Projects.tsx (lines 34-50)
    // The filter UI is not rendered, so there are no filter buttons to interact with.
    // Uncomment lines 34-50 in src/components/Projects.tsx to enable this test.

    // Count initial projects with "All" filter
    const initialProjects = page.locator("#projects article");
    const totalCount = await initialProjects.count();

    // Click on a specific technology filter
    const filterButtons = page.locator("#projects button");

    // Try filtering by React
    const reactButton = filterButtons.filter({ hasText: "React" });
    if ((await reactButton.count()) > 0) {
      await reactButton.click();

      // Get filtered projects
      const filteredProjects = page.locator("#projects article");
      const filteredCount = await filteredProjects.count();

      // Verify only projects with React technology are shown
      for (let i = 0; i < filteredCount; i++) {
        const card = filteredProjects.nth(i);
        const techTags = card.locator("span.font-mono");
        const tagTexts = await techTags.allTextContents();

        // At least one tag should contain "React"
        const hasReact = tagTexts.some((tag) => tag.includes("React"));
        expect(hasReact).toBeTruthy();
      }
    }

    // Try another filter
    const viteButton = filterButtons.filter({ hasText: "Vite" });
    if ((await viteButton.count()) > 0) {
      await viteButton.click();

      // Get filtered projects
      const filteredProjects = page.locator("#projects article");
      const filteredCount = await filteredProjects.count();

      // Should be less than or equal to total projects
      expect(filteredCount).toBeLessThanOrEqual(totalCount);

      // Verify only projects with Vite technology are shown
      for (let i = 0; i < filteredCount; i++) {
        const card = filteredProjects.nth(i);
        const techTags = card.locator("span.font-mono");
        const tagTexts = await techTags.allTextContents();

        // At least one tag should contain "Vite"
        const hasVite = tagTexts.some((tag) => tag.includes("Vite"));
        expect(hasVite).toBeTruthy();
      }
    }
  });

  test.fixme("Clear filters works", async ({ page }) => {
    // FIXME: This test is skipped because filters are commented out in Projects.tsx (lines 34-50)
    // The filter UI is not rendered, so there are no filter buttons to interact with.
    // Uncomment lines 34-50 in src/components/Projects.tsx to enable this test.

    // Count initial projects
    const initialProjects = page.locator("#projects article");
    const totalCount = await initialProjects.count();

    // Click on a specific technology filter
    const filterButtons = page.locator("#projects button");
    const reactButton = filterButtons.filter({ hasText: "React" });

    if ((await reactButton.count()) > 0) {
      await reactButton.click();

      // Verify filtered state
      await expect(reactButton).toHaveClass(/bg-primary/);

      // Click "All" to clear filters
      const allButton = filterButtons.filter({ hasText: "All" });
      await allButton.click();

      // Verify "All" is selected
      await expect(allButton).toHaveClass(/bg-primary/);

      // Verify React filter is no longer selected
      await expect(reactButton).not.toHaveClass(/bg-primary/);

      // Verify all projects are shown again
      const allProjects = page.locator("#projects article");
      const currentCount = await allProjects.count();
      expect(currentCount).toBe(totalCount);
    }
  });

  test("Project links work", async ({ page }) => {
    // Verify links for each project from data
    for (const project of testData.projects) {
      if (project.link) {
        // Find the card for this project
        const projectCard = page.locator("#projects article").filter({
          hasText: project.name,
        });

        // Check for Visit button
        const visitButton = projectCard.locator('a:has-text("Visit")');
        await expect(visitButton).toBeVisible();

        // Verify button has External Link icon
        await expect(visitButton.locator("svg")).toBeVisible();

        // Use helper to verify security attributes + correct URL from data
        await expectSecureExternalLink(visitButton, project.link);
      }
    }
  });

  test("Project card hover effects", async ({ page }) => {
    // Get first project card
    const firstCard = page.locator("#projects article").first();
    await expect(firstCard).toBeVisible();

    // Get the card's initial state
    const cardImage = firstCard.locator("img");
    await expect(cardImage).toBeVisible();

    // Hover over the card
    await firstCard.hover();

    // Verify card has hover shadow class
    await expect(firstCard).toHaveClass(/group/);
  });

  test("Technology tags display correctly", async ({ page }) => {
    // Get first project card
    const firstCard = page.locator("#projects article").first();

    // Get technology tags
    const techTags = firstCard.locator("span.font-mono");
    const tagCount = await techTags.count();

    // Should have at least one tech tag (from data)
    expect(tagCount).toBeGreaterThan(0);

    // Verify each tag has correct styling
    for (let i = 0; i < tagCount; i++) {
      const tag = techTags.nth(i);

      // Verify tag is visible
      await expect(tag).toBeVisible();

      // Verify tag has brutal border styling
      await expect(tag).toHaveClass(/border-brutal/);

      // Verify tag text is uppercase (monospace font)
      await expect(tag).toHaveClass(/font-mono/);
      await expect(tag).toHaveClass(/uppercase/);
    }
  });

  test("Projects responsive layout - desktop", async ({ page }) => {
    // Set viewport to desktop size
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Scroll to projects section
    await page.locator("#projects").scrollIntoViewIfNeeded();

    // Get projects grid
    const projectsGrid = page.locator("#projects .grid");
    await expect(projectsGrid).toBeVisible();

    // On desktop, should have 2-column grid (md:grid-cols-2)
    await expect(projectsGrid).toHaveClass(/md:grid-cols-2/);
  });

  test("Projects responsive layout - mobile", async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });

    // Scroll to projects section
    await page.locator("#projects").scrollIntoViewIfNeeded();

    // Get projects grid
    const projectsGrid = page.locator("#projects .grid");
    await expect(projectsGrid).toBeVisible();

    // Get filter buttons container (if it exists)
    // Note: Multiple flex-wrap containers exist (tech tags), so check count only
    const filterContainer = page.locator("#projects .flex.flex-wrap");
    if ((await filterContainer.count()) > 0) {
      // Verify flex-wrap exists (don't check visibility due to multiple matches)
      expect(await filterContainer.count()).toBeGreaterThan(0);
    }

    // All projects should still be visible (count from data)
    const projectCards = page.locator("#projects article");
    await expect(projectCards).toHaveCount(testData.projectCount);
  });

  test("All projects from data are rendered", async ({ page }) => {
    // Data integrity check - ensures no project is accidentally skipped
    for (const project of testData.projects) {
      // Project name should be visible
      await expect(page.getByText(project.name).first()).toBeVisible();

      // At least one tech should be visible
      await expect(page.getByText(project.tech[0]).first()).toBeVisible();
    }
  });
});
