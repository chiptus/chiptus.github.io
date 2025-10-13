// spec: test-plan.md - Section: Projects
// seed: seed.spec.ts
// NOTE: Technology filter feature is currently commented out in Projects.tsx (lines 34-50)

import { test, expect } from '@playwright/test';

test.describe('Projects Section', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the portfolio website
    await page.goto('http://localhost:4321');

    // Scroll to projects section
    await page.locator('#projects').scrollIntoViewIfNeeded();

    // Wait for the section to be visible
    await page.locator('#projects').waitFor({ state: 'visible' });
  });

  test('Projects section renders', async ({ page }) => {
    // Verify section title (text is "Side Projects" in DOM, displayed as "SIDE PROJECTS" via CSS uppercase)
    const sectionTitle = page.locator('#projects h2');
    await expect(sectionTitle).toBeVisible();
    await expect(sectionTitle).toHaveText('Side Projects');

    // Verify section subtitle
    const subtitle = page.locator('#projects p').first();
    await expect(subtitle).toBeVisible();
    await expect(subtitle).toContainText('Personal projects & experiments');

    // Verify project cards container exists
    const projectsGrid = page.locator('#projects .grid');
    await expect(projectsGrid).toBeVisible();
  });

  test('All project cards display', async ({ page }) => {
    // Verify that multiple project cards are displayed
    const projectCards = page.locator('#projects article');
    const count = await projectCards.count();

    // Should have at least 2 projects based on the data
    expect(count).toBeGreaterThanOrEqual(2);

    // Check each project card has required elements
    for (let i = 0; i < count; i++) {
      const card = projectCards.nth(i);

      // Check for image
      await expect(card.locator('img')).toBeVisible();

      // Check for title
      await expect(card.locator('h3')).toBeVisible();

      // Check for description
      await expect(card.locator('p')).toBeVisible();

      // Check for tech tags
      const techTags = card.locator('span.font-mono');
      expect(await techTags.count()).toBeGreaterThan(0);
    }
  });

  test.fixme('Technology filters work', async ({ page }) => {
    // FIXME: This test is skipped because filters are commented out in Projects.tsx (lines 34-50)
    // The filter UI is not rendered, so there are no filter buttons to interact with.
    // Uncomment lines 34-50 in src/components/Projects.tsx to enable this test.

    // Get all filter buttons
    const filterButtons = page.locator('#projects button');
    const filterCount = await filterButtons.count();

    // Should have "All" plus individual tech filters
    expect(filterCount).toBeGreaterThan(1);

    // Verify "All" filter is selected by default
    const allButton = filterButtons.filter({ hasText: 'All' });
    await expect(allButton).toHaveClass(/bg-primary/);

    // Click on a specific technology filter (React)
    const reactButton = filterButtons.filter({ hasText: 'React' });
    if (await reactButton.count() > 0) {
      await reactButton.click();

      // Verify React filter is now selected
      await expect(reactButton).toHaveClass(/bg-primary/);

      // Verify All filter is no longer selected
      await expect(allButton).not.toHaveClass(/bg-primary/);
    }
  });

  test.fixme('Filter shows correct projects', async ({ page }) => {
    // FIXME: This test is skipped because filters are commented out in Projects.tsx (lines 34-50)
    // The filter UI is not rendered, so there are no filter buttons to interact with.
    // Uncomment lines 34-50 in src/components/Projects.tsx to enable this test.

    // Count initial projects with "All" filter
    const initialProjects = page.locator('#projects article');
    const totalCount = await initialProjects.count();

    // Click on a specific technology filter
    const filterButtons = page.locator('#projects button');

    // Try filtering by React
    const reactButton = filterButtons.filter({ hasText: 'React' });
    if (await reactButton.count() > 0) {
      await reactButton.click();

      // Wait for filtering to complete
      await page.waitForTimeout(300);

      // Get filtered projects
      const filteredProjects = page.locator('#projects article');
      const filteredCount = await filteredProjects.count();

      // Verify only projects with React technology are shown
      for (let i = 0; i < filteredCount; i++) {
        const card = filteredProjects.nth(i);
        const techTags = card.locator('span.font-mono');
        const tagTexts = await techTags.allTextContents();

        // At least one tag should contain "React"
        const hasReact = tagTexts.some(tag => tag.includes('React'));
        expect(hasReact).toBeTruthy();
      }
    }

    // Try another filter
    const viteButton = filterButtons.filter({ hasText: 'Vite' });
    if (await viteButton.count() > 0) {
      await viteButton.click();

      // Wait for filtering to complete
      await page.waitForTimeout(300);

      // Get filtered projects
      const filteredProjects = page.locator('#projects article');
      const filteredCount = await filteredProjects.count();

      // Should be less than or equal to total projects
      expect(filteredCount).toBeLessThanOrEqual(totalCount);

      // Verify only projects with Vite technology are shown
      for (let i = 0; i < filteredCount; i++) {
        const card = filteredProjects.nth(i);
        const techTags = card.locator('span.font-mono');
        const tagTexts = await techTags.allTextContents();

        // At least one tag should contain "Vite"
        const hasVite = tagTexts.some(tag => tag.includes('Vite'));
        expect(hasVite).toBeTruthy();
      }
    }
  });

  test.fixme('Clear filters works', async ({ page }) => {
    // FIXME: This test is skipped because filters are commented out in Projects.tsx (lines 34-50)
    // The filter UI is not rendered, so there are no filter buttons to interact with.
    // Uncomment lines 34-50 in src/components/Projects.tsx to enable this test.

    // Count initial projects
    const initialProjects = page.locator('#projects article');
    const totalCount = await initialProjects.count();

    // Click on a specific technology filter
    const filterButtons = page.locator('#projects button');
    const reactButton = filterButtons.filter({ hasText: 'React' });

    if (await reactButton.count() > 0) {
      await reactButton.click();

      // Wait for filtering to complete
      await page.waitForTimeout(300);

      // Verify filtered state
      await expect(reactButton).toHaveClass(/bg-primary/);

      // Click "All" to clear filters
      const allButton = filterButtons.filter({ hasText: 'All' });
      await allButton.click();

      // Wait for filtering to complete
      await page.waitForTimeout(300);

      // Verify "All" is selected
      await expect(allButton).toHaveClass(/bg-primary/);

      // Verify React filter is no longer selected
      await expect(reactButton).not.toHaveClass(/bg-primary/);

      // Verify all projects are shown again
      const allProjects = page.locator('#projects article');
      const currentCount = await allProjects.count();
      expect(currentCount).toBe(totalCount);
    }
  });

  test('Project links work', async ({ page }) => {
    // Get all project cards
    const projectCards = page.locator('#projects article');
    const cardCount = await projectCards.count();

    let visitLinkFound = false;
    let codeLinkFound = false;

    // Check for Visit and Code buttons in project cards
    for (let i = 0; i < cardCount; i++) {
      const card = projectCards.nth(i);

      // Check for Visit button
      const visitButton = card.locator('a:has-text("Visit")');
      if (await visitButton.count() > 0) {
        visitLinkFound = true;

        // Verify button has External Link icon
        await expect(visitButton.locator('svg')).toBeVisible();

        // Verify link opens in new tab
        await expect(visitButton).toHaveAttribute('target', '_blank');
        await expect(visitButton).toHaveAttribute('rel', 'noopener noreferrer');

        // Verify href attribute exists and is valid
        const href = await visitButton.getAttribute('href');
        expect(href).toBeTruthy();
        expect(href).toMatch(/^https?:\/\//);
      }

      // Check for Code button (GitHub link)
      const codeButton = card.locator('a:has-text("Code")');
      if (await codeButton.count() > 0) {
        codeLinkFound = true;

        // Verify button has GitHub icon
        await expect(codeButton.locator('svg')).toBeVisible();

        // Verify link opens in new tab
        await expect(codeButton).toHaveAttribute('target', '_blank');
        await expect(codeButton).toHaveAttribute('rel', 'noopener noreferrer');

        // Verify href points to GitHub
        const href = await codeButton.getAttribute('href');
        expect(href).toBeTruthy();
        expect(href).toMatch(/github\.com/);
      }
    }

    // Note: Not all projects may have both links, but we should find at least some
  });

  test('Project card hover effects', async ({ page }) => {
    // Get first project card
    const firstCard = page.locator('#projects article').first();
    await expect(firstCard).toBeVisible();

    // Get the card's initial state
    const cardImage = firstCard.locator('img');
    await expect(cardImage).toBeVisible();

    // Hover over the card
    await firstCard.hover();

    // Wait for hover transition
    await page.waitForTimeout(100);

    // Verify card has hover shadow class
    await expect(firstCard).toHaveClass(/group/);
  });

  test('Technology tags display correctly', async ({ page }) => {
    // Get first project card
    const firstCard = page.locator('#projects article').first();

    // Get technology tags
    const techTags = firstCard.locator('span.font-mono');
    const tagCount = await techTags.count();

    // Should have at least one tech tag
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

  test('Projects responsive layout - desktop', async ({ page }) => {
    // Set viewport to desktop size
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Scroll to projects section
    await page.locator('#projects').scrollIntoViewIfNeeded();

    // Get projects grid
    const projectsGrid = page.locator('#projects .grid');
    await expect(projectsGrid).toBeVisible();

    // On desktop, should have 2-column grid (md:grid-cols-2)
    await expect(projectsGrid).toHaveClass(/md:grid-cols-2/);
  });

  test('Projects responsive layout - mobile', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });

    // Scroll to projects section
    await page.locator('#projects').scrollIntoViewIfNeeded();

    // Get projects grid
    const projectsGrid = page.locator('#projects .grid');
    await expect(projectsGrid).toBeVisible();

    // Get filter buttons container (if it exists)
    const filterContainer = page.locator('#projects .flex.flex-wrap');
    if (await filterContainer.count() > 0) {
      await expect(filterContainer).toBeVisible();

      // Verify filters wrap properly on mobile
      await expect(filterContainer).toHaveClass(/flex-wrap/);
    }

    // All projects should still be visible
    const projectCards = page.locator('#projects article');
    expect(await projectCards.count()).toBeGreaterThan(0);
  });
});
