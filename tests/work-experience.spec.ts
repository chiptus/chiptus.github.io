// spec: test-plan.md - Section 5: Work Experience Section (DATA-DRIVEN VERSION)
// seed: seed.spec.ts

import { test, expect } from '@playwright/test';
import { testData } from './fixtures/test-data';
import {
  expectSectionVisible,
  expectCardsFromData,
  expectSecureExternalLink,
  expectTechTags,
  expectImageWithAlt,
  expectAchievementsList
} from './helpers/assertions';

test.describe('Work Experience Section', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the portfolio website
    await page.goto('http://localhost:4321');

    // Scroll to work experience section
    await page.locator('#work').scrollIntoViewIfNeeded();

    // Wait for section to be visible
    await expect(page.locator('#work')).toBeVisible();
  });

  test('Work experience section renders', async ({ page }) => {
    // Use helper to verify section visibility
    const section = await expectSectionVisible(page, 'work');

    // Verify section title (text is "Work Experience" in DOM, displayed as "WORK EXPERIENCE" via CSS uppercase)
    const sectionTitle = section.locator('h2');
    await expect(sectionTitle).toHaveText('Work Experience');

    // Verify subtitle is displayed
    const subtitle = section.locator('p').first();
    await expect(subtitle).toContainText('Professional roles & achievements');

    // Verify work experience cards are present (using data count)
    const cards = section.locator('article');
    await expect(cards).toHaveCount(testData.workCount);
  });

  test('All work experience cards display', async ({ page }) => {
    // Use helper to verify cards match data
    await expectCardsFromData(
      page,
      '#work article',
      testData.workExperience,
      (job) => job.company
    );

    // Check each card has required elements (using data count)
    const cards = page.locator('#work article');
    for (let i = 0; i < testData.workCount; i++) {
      const card = cards.nth(i);

      // Check for image
      await expectImageWithAlt(card.locator('img'));

      // Check for company name
      await expect(card.locator('h3').first()).toBeVisible();

      // Check for role
      await expect(card.locator('p')).toBeVisible();

      // Check for tech tags
      const techTags = card.locator('span.font-mono');
      expect(await techTags.count()).toBeGreaterThan(0);
    }
  });

  test('First card content matches data', async ({ page }) => {
    const firstCard = page.locator('#work article').first();
    const firstJob = testData.firstJob;

    // Verify role name (DOM text in title case)
    const role = firstCard.locator('h3').first();
    await expect(role).toHaveText(firstJob.role);

    // Verify company name
    await expect(firstCard.getByText(firstJob.company)).toBeVisible();

    // Verify period
    await expect(firstCard.getByText(firstJob.period)).toBeVisible();

    // Verify description
    await expect(firstCard.getByText(firstJob.description)).toBeVisible();

    // Verify technologies match data
    await expectTechTags(firstCard, firstJob.tech);
  });

  test('Achievement badges display from data', async ({ page }) => {
    const firstCard = page.locator('#work article').first();
    const firstJob = testData.firstJob;

    // Use helper to verify achievements list
    if (firstJob.achievements) {
      await expectAchievementsList(firstCard, firstJob.achievements.length);

      // Verify actual achievement text
      for (const achievement of firstJob.achievements) {
        await expect(firstCard.getByText(achievement)).toBeVisible();
      }
    }
  });

  test('External links work for all cards', async ({ page }) => {
    const cards = page.locator('#work article');

    // Verify links for each job from data
    for (let i = 0; i < testData.workCount; i++) {
      const card = cards.nth(i);
      const job = testData.workExperience[i];

      if (job.link) {
        // Check for Visit button
        const visitButton = card.locator('a:has-text("Visit")');
        await expect(visitButton).toBeVisible();

        // Verify external link icon
        const externalLinkIcon = visitButton.locator('svg');
        await expect(externalLinkIcon).toBeVisible();

        // Use helper to verify security attributes + correct URL from data
        await expectSecureExternalLink(visitButton, job.link);
      }
    }
  });

  test('Card images display correctly', async ({ page }) => {
    const cards = page.locator('#work article');

    // Verify each card image from data
    for (let i = 0; i < testData.workCount; i++) {
      const card = cards.nth(i);
      const job = testData.workExperience[i];

      const img = card.locator('img');
      await expectImageWithAlt(img);

      // Verify image src matches data
      const src = await img.getAttribute('src');
      expect(src).toBe(job.image);
    }
  });

  test('Card hover interactions work', async ({ page }) => {
    const firstCard = page.locator('#work article').first();
    await expect(firstCard).toBeVisible();

    // Verify card has group class for hover effects
    await expect(firstCard).toHaveClass(/group/);

    // Hover over the card
    await firstCard.hover();

    // Verify card image has hover scale class
    const cardImage = firstCard.locator('img');
    await expect(cardImage).toHaveClass(/group-hover:scale-105/);
  });

  test('Responsive layout - desktop view', async ({ page }) => {
    // Set viewport to desktop
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Scroll to section
    await page.locator('#work').scrollIntoViewIfNeeded();

    // Verify cards are displayed in grid
    const cards = page.locator('#work article');
    await expect(cards).toHaveCount(testData.workCount);

    // Verify all cards are visible
    for (let i = 0; i < testData.workCount; i++) {
      await expect(cards.nth(i)).toBeVisible();
    }
  });

  test('Responsive layout - mobile view', async ({ page }) => {
    // Set viewport to mobile
    await page.setViewportSize({ width: 375, height: 667 });

    // Scroll to section
    await page.locator('#work').scrollIntoViewIfNeeded();

    // Verify cards stack vertically on mobile
    const cards = page.locator('#work article');
    await expect(cards).toHaveCount(testData.workCount);

    // Verify all cards are still visible
    for (let i = 0; i < testData.workCount; i++) {
      await expect(cards.nth(i)).toBeVisible();
    }
  });

  test('Section structure and styling', async ({ page }) => {
    const section = page.locator('#work');

    // Verify section has proper padding/background
    await expect(section).toHaveClass(/py-24/);
    await expect(section).toHaveClass(/bg-muted\/30/);

    // Verify section title styling
    const title = section.locator('h2');
    await expect(title).toHaveClass(/text-4xl/);
    await expect(title).toHaveClass(/md:text-5xl/);
    await expect(title).toHaveClass(/uppercase/);
  });

  test('Technology tags have correct styling', async ({ page }) => {
    const firstCard = page.locator('#work article').first();
    const techTags = firstCard.locator('span.font-mono');

    // Verify at least one tech tag exists
    expect(await techTags.count()).toBeGreaterThan(0);

    // Check first tag styling
    const firstTag = techTags.first();
    await expect(firstTag).toHaveClass(/border-brutal/);
    await expect(firstTag).toHaveClass(/uppercase/);
    await expect(firstTag).toHaveClass(/font-mono/);
  });

  test('Company icon displays', async ({ page }) => {
    const firstCard = page.locator('#work article').first();
    const firstJob = testData.firstJob;

    // Verify briefcase icon is present
    const briefcaseIcon = firstCard.locator('svg').first();
    await expect(briefcaseIcon).toBeVisible();

    // Verify company name is next to icon
    await expect(firstCard.getByText(firstJob.company)).toBeVisible();
  });

  test('All jobs in data are rendered', async ({ page }) => {
    // This test ensures no job is accidentally skipped during rendering
    for (const job of testData.workExperience) {
      // Company name should be visible
      await expect(page.getByText(job.company).first()).toBeVisible();

      // Role should be visible somewhere
      await expect(page.getByText(job.role).first()).toBeVisible();

      // At least one tech should be visible
      await expect(page.getByText(job.tech[0]).first()).toBeVisible();
    }
  });
});
