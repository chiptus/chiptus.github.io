// seed.spec.ts - Shared test utilities and setup for all Playwright tests

import {
  test as base,
  expect,
  type ElementHandle,
  type Page,
} from "@playwright/test";

// Base URL configuration
export const BASE_URL = "http://localhost:4321";

// Common viewport sizes
export const VIEWPORTS = {
  mobile: { width: 375, height: 667 }, // iPhone SE
  mobileLarge: { width: 414, height: 896 }, // iPhone XR
  tablet: { width: 768, height: 1024 }, // iPad Portrait
  desktop: { width: 1280, height: 720 }, // Standard laptop
  desktopLarge: { width: 1920, height: 1080 }, // Full HD
};

// Extend base test with custom fixtures
export const test = base.extend<{
  clearLocalStorage: void;
  setTheme: (theme: "light" | "dark") => Promise<void>;
}>({
  // Fixture to clear localStorage before tests
  clearLocalStorage: async ({ page }, use) => {
    await page.goto(BASE_URL);
    await page.evaluate(() => localStorage.clear());
    await use();
  },

  // Fixture to set theme
  setTheme: async ({ page }, use) => {
    const setTheme = async (theme: "light" | "dark") => {
      await page.goto(BASE_URL);
      await page.evaluate((theme) => {
        localStorage.setItem("theme", JSON.stringify({ theme }));
      }, theme);
      await page.reload();
    };
    await use(setTheme);
  },
});

// Re-export expect
export { expect };

// Helper function to wait for section to be in viewport
export async function scrollToSection(page: Page, sectionId: string) {
  const section = page.locator(`#${sectionId}`);
  await section.scrollIntoViewIfNeeded();
  // Wait for section to be in viewport instead of arbitrary timeout
  await expect(section).toBeInViewport();
}

// Helper function to check for horizontal overflow
export async function checkNoHorizontalOverflow(
  page: Page,
  viewportWidth: number
) {
  const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
  const htmlWidth = await page.evaluate(
    () => document.documentElement.scrollWidth
  );

  expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1); // +1 for rounding
  expect(htmlWidth).toBeLessThanOrEqual(viewportWidth + 1);
}

// Helper function to verify touch target size (WCAG 2.1 Level AA)
export async function verifyTouchTargetSize(
  element: ElementHandle,
  minSize: number = 44
) {
  const box = await element.boundingBox();
  if (box) {
    expect(box.width).toBeGreaterThanOrEqual(minSize);
    expect(box.height).toBeGreaterThanOrEqual(minSize);
  }
}

// Helper to get computed color values
export async function getComputedColors(element: ElementHandle) {
  return await element.evaluate((el: Element) => {
    const styles = window.getComputedStyle(el);
    return {
      color: styles.color,
      backgroundColor: styles.backgroundColor,
      borderColor: styles.borderColor,
    };
  });
}

// Helper to check if element is in viewport
export async function isInViewport(
  page: Page,
  selector: string
): Promise<boolean> {
  return await page.evaluate((sel: string) => {
    const element = document.querySelector(sel);
    if (!element) return false;

    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }, selector);
}

// Helper to test keyboard navigation
export async function tabToElement(
  page: Page,
  maxTabs: number = 20
): Promise<string[]> {
  const focusedElements: string[] = [];

  for (let i = 0; i < maxTabs; i++) {
    await page.keyboard.press("Tab");

    const focusedTag = await page.evaluate(() => {
      return document.activeElement?.tagName.toLowerCase() || "";
    });

    focusedElements.push(focusedTag);

    // Stop if we've cycled back to body
    if (focusedTag === "body" && i > 0) break;
  }

  return focusedElements;
}

// Helper to verify external link attributes
export async function verifyExternalLink(link: any) {
  await expect(link).toHaveAttribute("target", "_blank");
  await expect(link).toHaveAttribute("rel", /noopener/);
  await expect(link).toHaveAttribute("rel", /noreferrer/);
}

// Helper to wait for theme change
export async function waitForThemeChange(
  page: Page,
  expectedTheme: "light" | "dark"
) {
  await page.waitForFunction(
    (theme) => {
      const html = document.documentElement;
      return html.classList.contains(theme);
    },
    expectedTheme,
    { timeout: 2000 }
  );
}

// Helper to capture console errors
export function captureConsoleErrors(page: Page): string[] {
  const errors: string[] = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      errors.push(msg.text());
    }
  });

  return errors;
}

// Common test data
export const TEST_DATA = {
  name: "Chaim Lev-Ari",
  title: "Full-Stack Developer",
  email: "chaim@lev-ari.me",
  github: "https://github.com/chiptus",
  linkedin: "http://linkedin.com/in/chiptus",

  sections: {
    hero: "#home",
    work: "#work",
    journey: "#about",
    now: "#now",
    projects: "#projects",
    blog: "#blog",
    contact: "#contact",
  },

  companies: [
    "Crater Studios",
    "Portainer",
    "cnvrg.io",
    "Cobwebs Technologies",
  ],
};

// Export everything for use in test files
export default {
  BASE_URL,
  VIEWPORTS,
  TEST_DATA,
  scrollToSection,
  checkNoHorizontalOverflow,
  verifyTouchTargetSize,
  getComputedColors,
  isInViewport,
  tabToElement,
  verifyExternalLink,
  waitForThemeChange,
  captureConsoleErrors,
};
