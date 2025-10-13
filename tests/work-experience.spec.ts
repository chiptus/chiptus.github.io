// spec: test-plan.md - Section 5: Work Experience Section
// seed: seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Work Experience Section', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the portfolio website
    await page.goto('http://localhost:4321');

    // Scroll to work experience section
    await page.locator('#work').scrollIntoViewIfNeeded();

    // Wait for section to be visible
    await expect(page.locator('#work')).toBeVisible();
  });

  test('1. Work experience section renders', async ({ page }) => {
    // Verify section title is displayed (text is "Work Experience" in DOM, displayed as "WORK EXPERIENCE" via CSS uppercase)
    const sectionTitle = page.locator('#work h2');
    await expect(sectionTitle).toBeVisible();
    await expect(sectionTitle).toHaveText('Work Experience');

    // Verify subtitle is displayed
    const subtitle = page.locator('#work p').first();
    await expect(subtitle).toBeVisible();
    await expect(subtitle).toContainText('Professional roles & achievements');

    // Verify work experience cards are present
    const cards = page.locator('#work article');
    await expect(cards).toHaveCount(4); // Based on work-experience.json data

    // Verify at least one card is visible
    await expect(cards.first()).toBeVisible();
  });

  test('2. All work experience cards display', async ({ page }) => {
    // Get all work experience cards
    const cards = page.locator('#work article');

    // Verify we have 4 work experience entries (Crater Studios, Portainer, cnvrg.io, Cobwebs)
    await expect(cards).toHaveCount(4);

    // Verify all cards are visible
    const cardCount = await cards.count();
    for (let i = 0; i < cardCount; i++) {
      await expect(cards.nth(i)).toBeVisible();
    }

    // Verify expected companies are present
    const companies = ['Crater Studios', 'Portainer', 'cnvrg.io', 'Cobwebs Technologies'];
    for (const company of companies) {
      await expect(page.locator('#work').getByText(company)).toBeVisible();
    }
  });

  test('3. Card content is correct', async ({ page }) => {
    // Test first card (Crater Studios) in detail
    const firstCard = page.locator('#work article').first();

    // Verify role is displayed
    const role = firstCard.locator('h3');
    await expect(role).toBeVisible();
    await expect(role).toHaveText('GAME DEVELOPER');

    // Verify company name is displayed
    await expect(firstCard.getByText('Crater Studios')).toBeVisible();

    // Verify period/dates are displayed
    await expect(firstCard.getByText('Mar 2024 - Dec 2024')).toBeVisible();

    // Verify description is present and contains expected text
    const description = firstCard.locator('p').first();
    await expect(description).toBeVisible();
    await expect(description).toContainText('Developed engaging multiplayer gaming experiences');

    // Verify technologies are displayed
    const techTags = firstCard.locator('span.font-mono.text-xs');
    await expect(techTags).toHaveCount(6); // NodeJS, Socket.io, Unreal Engine, Redis, C++, TypeScript

    // Check for specific technologies
    await expect(firstCard.getByText('NODEJS', { exact: true })).toBeVisible();
    await expect(firstCard.getByText('TYPESCRIPT', { exact: true })).toBeVisible();
    await expect(firstCard.getByText('C++', { exact: true })).toBeVisible();
  });

  test('4. Achievement badges display', async ({ page }) => {
    // Get first card with achievements
    const firstCard = page.locator('#work article').first();

    // Verify "Key Achievements" heading is displayed
    const achievementsHeading = firstCard.getByText('KEY ACHIEVEMENTS');
    await expect(achievementsHeading).toBeVisible();

    // Verify achievement list items are present
    const achievements = firstCard.locator('ul li');
    await expect(achievements).toHaveCount(2); // Crater Studios has 2 achievements

    // Verify check circle icons are present for each achievement
    const checkIcons = firstCard.locator('svg.lucide-check-circle-2');
    await expect(checkIcons).toHaveCount(2);

    // Verify achievement content
    await expect(firstCard.getByText(/Scaled infrastructure to support peak traffic/)).toBeVisible();
    await expect(firstCard.getByText(/Delivered core multiplayer features/)).toBeVisible();

    // Test second card (Portainer) achievements
    const secondCard = page.locator('#work article').nth(1);
    const portainerAchievements = secondCard.locator('ul li');
    await expect(portainerAchievements).toHaveCount(3); // Portainer has 3 achievements

    // Verify specific achievement
    await expect(secondCard.getByText(/500K\+ developers globally/)).toBeVisible();
  });

  test('5. External links work', async ({ page }) => {
    // Test "Visit" button on first card (Crater Studios)
    const firstCard = page.locator('#work article').first();
    const visitButton = firstCard.getByRole('link', { name: /visit/i });

    // Verify button is visible
    await expect(visitButton).toBeVisible();

    // Verify button has external link icon
    const externalLinkIcon = visitButton.locator('svg.lucide-external-link');
    await expect(externalLinkIcon).toBeVisible();

    // Verify link attributes
    await expect(visitButton).toHaveAttribute('href', 'https://www.craterstudiosgames.com');
    await expect(visitButton).toHaveAttribute('target', '_blank');
    await expect(visitButton).toHaveAttribute('rel', 'noopener noreferrer');

    // Test hover state
    await visitButton.hover();
    // Button should remain visible and clickable
    await expect(visitButton).toBeVisible();

    // Test second card (Portainer) link
    const secondCard = page.locator('#work article').nth(1);
    const portainerLink = secondCard.getByRole('link', { name: /visit/i });
    await expect(portainerLink).toHaveAttribute('href', 'https://www.portainer.io');
    await expect(portainerLink).toHaveAttribute('target', '_blank');

    // Test third card (cnvrg.io) link
    const thirdCard = page.locator('#work article').nth(2);
    const cnvrgLink = thirdCard.getByRole('link', { name: /visit/i });
    await expect(cnvrgLink).toHaveAttribute('href', 'https://cnvrg.io');
    await expect(cnvrgLink).toHaveAttribute('target', '_blank');

    // Test fourth card (Cobwebs) link
    const fourthCard = page.locator('#work article').nth(3);
    const cobwebsLink = fourthCard.getByRole('link', { name: /visit/i });
    await expect(cobwebsLink).toHaveAttribute('href', 'https://www.cobwebs.com');
    await expect(cobwebsLink).toHaveAttribute('target', '_blank');
  });

  test('6. Card images display correctly', async ({ page }) => {
    // Verify all cards have images
    const images = page.locator('#work article img');
    await expect(images).toHaveCount(4);

    // Test first card image
    const firstImage = images.first();
    await expect(firstImage).toBeVisible();
    await expect(firstImage).toHaveAttribute('src', '/assets/dwarven-realms.jpg');
    await expect(firstImage).toHaveAttribute('alt', 'Crater Studios project');

    // Test image hover effect - verify image has scale transition class
    await expect(firstImage).toHaveClass(/transition-transform/);
    await expect(firstImage).toHaveClass(/group-hover:scale-105/);
  });

  test('7. Card hover interactions', async ({ page }) => {
    const firstCard = page.locator('#work article').first();

    // Verify card has group class for hover effects
    await expect(firstCard).toHaveClass(/group/);

    // Hover over the card
    await firstCard.hover();

    // Verify card remains visible after hover
    await expect(firstCard).toBeVisible();

    // Verify image is still visible (should have scale effect via CSS)
    const image = firstCard.locator('img');
    await expect(image).toBeVisible();
  });

  test('8. Responsive layout - desktop view', async ({ page }) => {
    // Set viewport to desktop size
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.locator('#work').scrollIntoViewIfNeeded();

    // Verify cards use grid layout on desktop (image side by side with content)
    const firstCard = page.locator('#work article').first();

    // Check that card has grid classes
    const cardGrid = firstCard.locator('.grid');
    await expect(cardGrid).toBeVisible();

    // Verify image container is visible
    const imageContainer = firstCard.locator('.relative.h-64');
    await expect(imageContainer).toBeVisible();
  });

  test('9. Responsive layout - mobile view', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    await page.locator('#work').scrollIntoViewIfNeeded();

    // Verify section is still visible
    await expect(page.locator('#work')).toBeVisible();

    // Verify cards are still visible and stacked vertically
    const cards = page.locator('#work article');
    await expect(cards.first()).toBeVisible();

    // Verify content is readable
    await expect(page.locator('#work h2')).toBeVisible();
  });

  test('10. Section background and styling', async ({ page }) => {
    const workSection = page.locator('#work');

    // Verify section has proper ID for anchor navigation
    await expect(workSection).toHaveAttribute('id', 'work');

    // Verify section has background styling
    await expect(workSection).toHaveClass(/bg-muted\/30/);

    // Verify section has padding
    await expect(workSection).toHaveClass(/py-24/);
  });

  test('11. Technology tags styling', async ({ page }) => {
    const firstCard = page.locator('#work article').first();
    const techTags = firstCard.locator('span.font-mono.text-xs');

    // Verify tags have brutal border styling
    const firstTag = techTags.first();
    await expect(firstTag).toHaveClass(/border-brutal/);
    await expect(firstTag).toHaveClass(/border-foreground/);

    // Verify tags have monospace font
    await expect(firstTag).toHaveClass(/font-mono/);

    // Verify tags are uppercase
    await expect(firstTag).toHaveClass(/uppercase/);
  });

  test('12. Briefcase icon displays', async ({ page }) => {
    const firstCard = page.locator('#work article').first();

    // Verify briefcase icon is present
    const briefcaseIcon = firstCard.locator('svg.lucide-briefcase');
    await expect(briefcaseIcon).toBeVisible();

    // Verify icon is near company name
    const companySection = firstCard.locator('.flex.items-center.gap-2').first();
    await expect(companySection).toContainText('Crater Studios');
  });
});
