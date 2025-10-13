# Playwright Test Suite

Comprehensive end-to-end tests for the portfolio website.

## Test Files

- **accessibility.spec.ts** - Accessibility compliance tests (WCAG 2.1 Level AA)
- **page-load.spec.ts** - Page load and initial state tests (to be created)
- **navigation.spec.ts** - Navigation bar functionality tests (to be created)
- **theme-toggle.spec.ts** - Theme toggle (light/dark mode) tests (to be created)
- **hero-section.spec.ts** - Hero section and 3D animation tests (to be created)
- **work-experience.spec.ts** - Work experience section tests (to be created)
- **projects.spec.ts** - Projects section with filtering tests (to be created)
- **responsive.spec.ts** - Responsive design tests (to be created)

## Setup

### Install Playwright

```bash
npm install -D @playwright/test
npx playwright install
```

### Running Tests

```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test tests/accessibility.spec.ts

# Run in UI mode (interactive)
npx playwright test --ui

# Run in headed mode (see browser)
npx playwright test --headed

# Run specific test by name
npx playwright test -g "Keyboard navigation works"

# Debug mode
npx playwright test --debug
```

### View Test Results

```bash
# Open HTML report
npx playwright show-report
```

## Test Coverage

### 1. Page Load (page-load.spec.ts)
- Page loads successfully with 200 status
- Essential meta tags present (SEO, Open Graph, Twitter Cards)
- No console errors on load
- All sections render correctly
- Default theme loads

### 2. Navigation (navigation.spec.ts)
- Navigation bar is fixed at top
- All navigation links present
- Links scroll to correct sections
- Scroll changes nav style (backdrop blur, shadow)
- Mobile responsive navigation
- Hover states work
- Keyboard accessible

### 3. Theme Toggle (theme-toggle.spec.ts)
- Toggle button exists and is visible
- Switches between light and dark themes
- Theme persists in localStorage
- Theme persists across page reloads
- Keyboard accessible

### 4. Hero Section (hero-section.spec.ts)
- Hero section renders with name, title, description
- 3D animation loads and renders (Three.js canvas)
- CTA buttons navigate correctly
- Social links work with proper attributes
- Responsive on mobile

### 5. Work Experience (work-experience.spec.ts)
- Section renders with title and cards
- All 4 work experience cards display
- Card content is correct (company, role, dates, description)
- Achievement badges display
- External company links work

### 6. Projects (projects.spec.ts)
- Projects section renders
- All project cards display
- Technology filters work (currently commented out in code)
- Filter shows correct projects
- Clear filters works
- Project Visit/Code links work

### 7. Responsive Design (responsive.spec.ts)
- Mobile viewport (375px) - iPhone SE
- Tablet viewport (768px) - Breakpoint testing
- Desktop viewport (1920px) - Full desktop layout
- No horizontal overflow at any size
- Touch targets meet 44x44px standard (WCAG 2.1)

### 8. Accessibility (accessibility.spec.ts)
- Keyboard navigation works
- ARIA labels present on interactive elements
- Semantic HTML (nav, main, section, article, footer)
- Focus visible on all interactive elements
- Alt text on all images
- Proper heading hierarchy (single h1, h2 sections, h3 cards)
- Links have descriptive text
- External links have security attributes
- Form elements have labels
- Color contrast (basic check)
- Language attribute set on html
- Page has title
- Reduced motion respected
- Interactive elements have appropriate roles

## Notes

### Projects Filter
The technology filter feature in the Projects section is currently commented out in the source code ([Projects.tsx:34-50](../src/components/Projects.tsx)). The tests for filtering functionality have been generated but will need the feature to be uncommented to pass.

### Test Helpers
The [seed.spec.ts](../seed.spec.ts) file contains shared test utilities and helpers:
- Viewport size constants
- Theme switching fixture
- localStorage clearing fixture
- Scroll to section helper
- Check horizontal overflow helper
- Verify touch target size helper
- External link verification helper
- Common test data

## CI/CD

The `playwright.config.ts` is configured for CI environments:
- Automatic retries (2x on CI)
- Single worker on CI
- Video recording on failure
- Screenshot on failure
- Trace collection on retry

## Browser Coverage

Tests run on:
- Chromium (Desktop Chrome)
- Firefox (Desktop)
- WebKit (Desktop Safari)
- Mobile Chrome (Pixel 5)
- Mobile Safari (iPhone 12)

## Best Practices

1. **Use semantic selectors** - Prefer `getByRole`, `getByText`, `getByLabel` over CSS selectors
2. **Wait appropriately** - Use `waitForLoadState`, `waitForTimeout` for animations
3. **Test user flows** - Test complete user journeys, not just individual elements
4. **Mobile-first** - Always test responsive behavior
5. **Accessibility** - Ensure keyboard navigation and screen reader compatibility
6. **Isolation** - Clear state between tests (localStorage, cookies)

## Troubleshooting

### Tests failing due to timing
- Increase `waitForTimeout` values for slow animations
- Use `waitForLoadState('networkidle')` for async content

### Elements not found
- Check if navigation is at correct URL/hash
- Verify element selectors match actual DOM structure
- Use `page.pause()` to debug interactively

### Projects filter tests failing
- Uncomment the filter feature in [Projects.tsx](../src/components/Projects.tsx)
- Verify `allTechs` array is properly populated

## Future Improvements

- [ ] Add visual regression tests (Percy, Chromatic)
- [ ] Add performance tests (Lighthouse CI)
- [ ] Add more detailed color contrast tests
- [ ] Test form submissions (contact, blog notify)
- [ ] Add network mocking for external API calls
- [ ] Test error states and edge cases
- [ ] Add more granular mobile gesture tests
