// Reusable assertion helpers for data-driven tests
import { type Page, expect, type Locator } from "@playwright/test";

/**
 * Assert a section is visible and has a heading
 */
export async function expectSectionVisible(page: Page, sectionId: string) {
  const section = page.locator(`#${sectionId}`);
  await expect(section).toBeVisible();

  // Check section has a heading (h2 or h3)
  const heading = section.locator("h2, h3").first();
  await expect(heading).toBeVisible();

  return section;
}

/**
 * Assert cards match data array
 * Generic helper that works for any card-based section
 */
export async function expectCardsFromData<T>(
  page: Page,
  cardSelector: string,
  dataArray: T[],
  getIdentifier: (item: T) => string
) {
  const cards = page.locator(cardSelector);

  // Count should match data
  await expect(cards).toHaveCount(dataArray.length);

  // Each item should be visible
  for (const item of dataArray) {
    const identifier = getIdentifier(item);
    await expect(page.getByText(identifier).first()).toBeVisible();
  }
}

/**
 * Assert external link has proper security attributes
 */
export async function expectSecureExternalLink(
  link: Locator,
  expectedHref?: string
) {
  await expect(link).toHaveAttribute("target", "_blank");
  await expect(link).toHaveAttribute("rel", /noopener/);
  await expect(link).toHaveAttribute("rel", /noreferrer/);

  if (expectedHref) {
    await expect(link).toHaveAttribute("href", expectedHref);
  }
}

/**
 * Assert an image has src and alt attributes
 */
export async function expectImageWithAlt(image: Locator) {
  await expect(image).toBeVisible();

  const src = await image.getAttribute("src");
  const alt = await image.getAttribute("alt");

  expect(src).toBeTruthy();
  expect(alt).not.toBeNull();
}

/**
 * Assert tech tags are displayed correctly
 */
export async function expectTechTags(
  container: Locator,
  expectedTech: string[]
) {
  const techTags = container.locator("span.font-mono");

  // Should have expected number of tags
  await expect(techTags).toHaveCount(expectedTech.length);

  // Each tag should be visible
  for (const tech of expectedTech) {
    await expect(container.getByText(tech, { exact: true })).toBeVisible();
  }
}

/**
 * Assert achievements list is displayed
 */
export async function expectAchievementsList(
  container: Locator,
  expectedCount: number
) {
  // Check for achievements heading
  const achievementsHeading = container.getByText("Key Achievements");
  await expect(achievementsHeading).toBeVisible();

  // Check achievement items
  const achievements = container.locator("ul li");
  await expect(achievements).toHaveCount(expectedCount);

  // Check for check icons (flexible selector to handle different lucide versions)
  const checkIcons = container.locator("ul li svg").first();
  await expect(checkIcons).toBeVisible();
}
