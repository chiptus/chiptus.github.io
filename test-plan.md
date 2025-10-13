`# Portfolio Website - Comprehensive Test Plan

## Application Overview

This is a single-page portfolio website for Chaim Lev-Ari, a full-stack developer. The application is built with:
- **Framework**: Astro 5 with React 19 components
- **Styling**: Tailwind CSS 4 with custom brutal/neobrutalism design system
- **UI Components**: Radix UI primitives (shadcn/ui)
- **3D Graphics**: Three.js with React Three Fiber
- **Icons**: Lucide React

### Key Features

1. **Fixed Navigation Bar**: Responsive navigation with theme toggle, scroll-aware background blur
2. **Hero Section**: 3D animated background with social links and CTA buttons
3. **Work Experience Section**: Detailed professional experience cards with images and achievements
4. **Journey Timeline**: Visual timeline of career milestones
5. **Now Section**: Current status and activities
6. **Beyond Code Section**: Personal interests
7. **Projects Section**: Filterable project cards with technology tags
8. **Blog Section**: Coming soon placeholder
9. **Contact Section**: Multiple contact methods with links
10. **Footer**: Technology stack and social links
11. **Theme Toggle**: Light/dark mode with localStorage persistence

## Page Sections

The page is divided into the following sections with anchor navigation:
- `#home` - Hero section
- `#work` - Work Experience
- `#about` - Journey Timeline
- `#now` - Now Section
- `#projects` - Projects
- `#blog` - Blog placeholder
- `#contact` - Contact

---

## Test Scenarios

### 1. Page Load and Initial State

**Seed**: Fresh page load with no localStorage data

#### 1.1 Verify Page Loads Successfully
**Steps:**
1. Navigate to `http://localhost:4321`
2. Wait for page to fully load

**Expected Results:**
- Page loads without errors
- All sections render correctly
- Hero section is visible in viewport
- Fixed navigation bar appears at top
- 3D scene renders in hero background
- No console errors

#### 1.2 Verify Meta Tags and SEO
**Steps:**
1. Load the page
2. Inspect page head elements

**Expected Results:**
- Page title is "Chaim Lev-Ari | Full-Stack Developer"
- Meta description is present
- Open Graph tags are present with correct values
- Twitter card meta tags are present
- Canonical URL is set
- Structured data (JSON-LD) is present for Person schema

#### 1.3 Verify Default Theme
**Steps:**
1. Clear localStorage
2. Reload the page
3. Check document root class

**Expected Results:**
- Default theme is "light" mode
- HTML root element has class "light"
- Theme persists to localStorage

---

### 2. Navigation Bar

**Seed**: Fresh page load

#### 2.1 Navigation Bar Initial State
**Steps:**
1. Load the page
2. Observe navigation bar at page top

**Expected Results:**
- Navigation bar is fixed at top of page
- "CL" logo/link is visible on left
- Desktop navigation links visible on screens >= 768px: Journey, Now, Projects, Blog, Contact
- Theme toggle button is visible
- Background is transparent initially

#### 2.2 Navigation Bar Scroll Behavior
**Steps:**
1. Load the page
2. Scroll down more than 50 pixels
3. Scroll back to top

**Expected Results:**
- After scrolling >50px, navigation background becomes `bg-background/80` with `backdrop-blur-lg`
- Shadow effect appears on scroll
- When scrolled back to top, background becomes transparent again
- Transition is smooth (300ms duration)

#### 2.3 Navigation Links - Desktop
**Steps:**
1. Load the page on desktop viewport (width >= 768px)
2. Click "Journey" link
3. Click "Now" link
4. Click "Projects" link
5. Click "Blog" link
6. Click "Contact" link
7. Click "CL" logo

**Expected Results:**
- Each link navigates to corresponding section via anchor
- Clicking "Journey" scrolls to `#about` section
- Clicking "Now" scrolls to `#now` section
- Clicking "Projects" scrolls to `#projects` section
- Clicking "Blog" scrolls to `#blog` section
- Clicking "Contact" scrolls to `#contact` section
- Clicking "CL" logo scrolls to `#home` section
- URL hash updates accordingly

#### 2.4 Navigation Links - Hover States
**Steps:**
1. Load the page
2. Hover over each navigation link

**Expected Results:**
- Links show hover color transition to primary color
- Text color changes smoothly
- Cursor changes to pointer

#### 2.5 Mobile Navigation
**Steps:**
1. Set viewport to mobile size (<768px width)
2. Observe navigation bar

**Expected Results:**
- Desktop navigation links are hidden
- Only "CL" logo and theme toggle are visible
- Theme toggle is on the right side

---

### 3. Theme Toggle

**Seed**: Fresh page load, cleared localStorage

#### 3.1 Toggle to Dark Mode
**Steps:**
1. Clear localStorage
2. Load the page (defaults to light mode)
3. Locate theme toggle button in navigation
4. Click the theme toggle button

**Expected Results:**
- Theme changes from light to dark
- HTML root element class changes from "light" to "dark"
- Moon icon changes to Sun icon
- All colors update according to dark theme
- Theme preference saved to localStorage as `{"theme":"dark"}`

#### 3.2 Toggle Back to Light Mode
**Steps:**
1. With dark mode active
2. Click the theme toggle button again

**Expected Results:**
- Theme changes from dark to light
- HTML root element class changes from "dark" to "light"
- Sun icon changes to Moon icon
- All colors update according to light theme
- Theme preference saved to localStorage as `{"theme":"light"}`

#### 3.3 Theme Persistence on Reload
**Steps:**
1. Set theme to dark mode
2. Reload the page

**Expected Results:**
- Dark theme is maintained after reload
- Page loads with dark theme applied
- No flash of light theme

#### 3.4 Theme Toggle Accessibility
**Steps:**
1. Load the page
2. Tab to theme toggle button
3. Press Enter or Space key

**Expected Results:**
- Button is focusable via keyboard
- Button has `aria-label="Toggle theme"`
- Button can be activated with Enter or Space
- Theme toggles on keyboard activation

---

### 4. Hero Section

**Seed**: Fresh page load

#### 4.1 Hero Content Display
**Steps:**
1. Load the page
2. Observe hero section

**Expected Results:**
- Hero section is full viewport height (`min-h-screen`)
- Name "CHAIM LEV-ARI" is displayed prominently
- Title "FULL-STACK DEVELOPER" is visible
- Skills "React • TypeScript • Go" are displayed
- Description paragraph is visible
- Two CTA buttons are present: "View Projects" and "Get In Touch"
- Three social icons are visible: GitHub, LinkedIn, Email
- 3D animated scene is visible in background with reduced opacity

#### 4.2 Hero CTA Buttons - View Projects
**Steps:**
1. Load the page
2. Click "View Projects" button

**Expected Results:**
- Page scrolls to projects section (`#projects`)
- Button has primary styling with shadow effect
- Button shows hover state with shadow transition
- Arrow icon is visible on the right

#### 4.3 Hero CTA Buttons - Get In Touch
**Steps:**
1. Load the page
2. Click "Get In Touch" button

**Expected Results:**
- Page scrolls to contact section (`#contact`)
- Button has outline variant styling
- Button shows hover state

#### 4.4 Hero Social Links
**Steps:**
1. Load the page
2. Click GitHub icon
3. Click LinkedIn icon
4. Click Email icon

**Expected Results:**
- GitHub link opens `https://github.com/chiptus` in new tab
- LinkedIn link opens `http://linkedin.com/in/chiptus` in new tab
- Email link opens mail client with `mailto:chaim@lev-ari.me`
- All external links have `rel="noopener noreferrer"`
- Icons have proper `aria-label` attributes
- Hover states show color transition to primary

#### 4.5 3D Scene Animation
**Steps:**
1. Load the page
2. Observe 3D scene in hero background
3. Wait 5-10 seconds

**Expected Results:**
- Three 3D shapes are visible: sphere, box, torus
- All shapes are wireframe style in primary blue color
- Shapes continuously animate and float
- Scene auto-rotates slowly
- Mouse drag can manually rotate the view (OrbitControls)
- Zoom and pan are disabled
- Scene has 30% opacity overlay

---

### 5. Work Experience Section

**Seed**: Fresh page load

#### 5.1 Work Experience Display
**Steps:**
1. Load the page
2. Scroll to Work Experience section (`#work`)

**Expected Results:**
- Section title "WORK EXPERIENCE" is visible
- Subtitle "Professional roles & achievements" is displayed
- Multiple work experience cards are shown
- Each card has an image on the left (desktop) or top (mobile)
- Each card displays: role, company, period, description, achievements list, tech stack

#### 5.2 Work Experience Card Interactions
**Steps:**
1. Scroll to Work Experience section
2. Hover over a work experience card
3. Hover over the image within the card

**Expected Results:**
- Card has brutal border styling
- Image scales up on hover (105% scale with transition)
- If card has a "Visit" button, button is visible
- Hover on button shows outline style

#### 5.3 Work Experience Visit Links
**Steps:**
1. Scroll to Work Experience section
2. Find a card with a "Visit" button
3. Click the "Visit" button

**Expected Results:**
- Link opens in new tab
- External link icon is visible on button
- Link has `rel="noopener noreferrer"`
- URL matches the experience link in data

#### 5.4 Work Experience Achievements
**Steps:**
1. Scroll to Work Experience section
2. Observe achievement lists in cards

**Expected Results:**
- Each achievement has a check circle icon
- Achievements are listed with proper spacing
- Icons are in primary color
- Text is readable in muted foreground color

#### 5.5 Work Experience Tech Tags
**Steps:**
1. Scroll to Work Experience section
2. Observe technology tags on each card

**Expected Results:**
- Tech tags display in uppercase
- Tags have brutal border styling
- Tags are displayed in a flex wrap layout
- Font is monospace

---

### 6. Journey Timeline Section

**Seed**: Fresh page load

#### 6.1 Timeline Display
**Steps:**
1. Load the page
2. Scroll to Journey Timeline section (`#about`)

**Expected Results:**
- Section title "JOURNEY" is visible
- Subtitle "10+ years of building things that matter" is displayed
- Timeline items are displayed vertically
- Each milestone has an icon in a bordered box
- Vertical line connects milestones (except last one)
- Year, title, and description are visible for each milestone

#### 6.2 Timeline Item Hover
**Steps:**
1. Scroll to Journey Timeline section
2. Hover over a timeline item

**Expected Results:**
- Icon box shows shadow transition on hover
- Shadow changes from normal to hover state
- Group hover effect applies

#### 6.3 Timeline Icon Boxes
**Steps:**
1. Scroll to Journey Timeline section
2. Observe icon boxes

**Expected Results:**
- Icon boxes are 16x16 (4rem) size
- Boxes have brutal border styling
- Icons are properly centered
- Icons are 8x8 (2rem) size

---

### 7. Now Section

**Seed**: Fresh page load

#### 7.1 Now Section Display
**Steps:**
1. Load the page
2. Scroll to Now section (`#now`)

**Expected Results:**
- Section has primary background color with 5% opacity
- Content is in a bordered brutal-style card
- Title "NOW" with Sparkles icon is visible
- Last updated date is displayed with Calendar icon
- Three subsections are visible:
  - "Currently Working On" with description
  - "Learning" with tech tags
  - "Status" with MapPin icon and description

#### 7.2 Now Section Learning Tags
**Steps:**
1. Scroll to Now section
2. Observe learning tags

**Expected Results:**
- Learning items are displayed as bordered tags
- Tags use monospace font
- Tags wrap properly in flex layout
- Tags have brutal border styling

---

### 8. Beyond Code Section

**Seed**: Fresh page load

#### 8.1 Beyond Code Display
**Steps:**
1. Load the page
2. Scroll to Beyond Code section

**Expected Results:**
- Section title "BEYOND CODE" is visible
- Subtitle "What makes me tick outside of development" is displayed
- Three interest cards are displayed in a grid (3 columns on desktop)
- Each card has: icon box, title, description
- Cards have brutal border styling

#### 8.2 Interest Card Hover
**Steps:**
1. Scroll to Beyond Code section
2. Hover over an interest card

**Expected Results:**
- Card shadow transitions to hover state
- Icon box has primary color background at 10% opacity
- Smooth transition effect

---

### 9. Projects Section

**Seed**: Fresh page load

#### 9.1 Projects Display
**Steps:**
1. Load the page
2. Scroll to Projects section (`#projects`)

**Expected Results:**
- Section title "SIDE PROJECTS" is visible
- Subtitle "Personal projects & experiments" is displayed
- Technology filter buttons are displayed above project grid
- "All" filter is selected by default with primary background
- Project cards are displayed in a 2-column grid (desktop)
- Each card shows: image, title, description, tech tags, action buttons

#### 9.2 Project Technology Filters
**Steps:**
1. Scroll to Projects section
2. Count total projects visible with "All" selected
3. Click a specific technology filter (e.g., "React")
4. Observe filtered projects

**Expected Results:**
- Clicking a technology filter updates the selection
- Selected filter has primary background and shadow
- Unselected filters have default background
- Projects are filtered to show only those with selected technology
- Filter count and project count match expectation

#### 9.3 Project Filter - Return to All
**Steps:**
1. With a specific technology filter selected
2. Click "All" filter button

**Expected Results:**
- All projects are displayed again
- "All" button has primary background
- Previously selected filter returns to default state

#### 9.4 Project Card Hover
**Steps:**
1. Scroll to Projects section
2. Hover over a project card
3. Hover over the project image

**Expected Results:**
- Card shadow transitions to hover state
- Image scales to 105% on hover
- Smooth transition animations

#### 9.5 Project Card Links
**Steps:**
1. Scroll to Projects section
2. Find a project with a "Visit" button
3. Find a project with a "Code" button
4. Click each button type

**Expected Results:**
- "Visit" button opens project live link in new tab
- "Code" button opens GitHub repository in new tab
- Buttons have External Link and GitHub icons respectively
- Both have `rel="noopener noreferrer"`
- Buttons have brutal border styling

#### 9.6 Projects Responsive Layout
**Steps:**
1. Resize viewport to mobile (<768px)
2. Observe project grid

**Expected Results:**
- Projects display in single column on mobile
- Filter buttons wrap properly
- Card layout adjusts for mobile

---

### 10. Blog Section

**Seed**: Fresh page load

#### 10.1 Blog Placeholder Display
**Steps:**
1. Load the page
2. Scroll to Blog section (`#blog`)

**Expected Results:**
- Section is centered in a bordered card
- PenTool icon is displayed in icon box at top
- Title "BLOG" is visible
- "Coming Soon" text is displayed
- Description paragraph explains future blog plans
- "Notify Me" button is displayed

#### 10.2 Blog Notify Button
**Steps:**
1. Scroll to Blog section
2. Click "Notify Me" button

**Expected Results:**
- Button has brutal border styling and shadow
- Arrow icon is visible on the right
- Button shows hover state with shadow transition
- Note: Button currently has no action (future implementation)

---

### 11. Contact Section

**Seed**: Fresh page load

#### 11.1 Contact Section Display
**Steps:**
1. Load the page
2. Scroll to Contact section (`#contact`)

**Expected Results:**
- Section title "LET'S WORK TOGETHER" is visible
- Subtitle about opportunities is displayed
- Three contact cards are shown in grid (3 columns on desktop):
  - Email card
  - GitHub card
  - LinkedIn card
- Each card shows: icon, label, value
- "Send Me a Message" button is at bottom

#### 11.2 Contact Card Links
**Steps:**
1. Scroll to Contact section
2. Hover over each contact card
3. Click on Email card
4. Click on GitHub card
5. Click on LinkedIn card

**Expected Results:**
- Cards show hover effects: shadow transition, icon box background color change
- Email card opens mail client with `mailto:chaim@lev-ari.me`
- GitHub card opens GitHub profile in new tab
- LinkedIn card opens LinkedIn profile in new tab
- External links have `rel="noopener noreferrer"`

#### 11.3 Send Message Button
**Steps:**
1. Scroll to Contact section
2. Click "Send Me a Message" button

**Expected Results:**
- Button opens mail client with email address
- Button has full width on mobile, auto width on desktop
- Button has brutal styling with shadow effects

---

### 12. Footer

**Seed**: Fresh page load

#### 12.1 Footer Display
**Steps:**
1. Load the page
2. Scroll to bottom footer

**Expected Results:**
- Footer has top brutal border
- Two-column layout on desktop (stacks on mobile)
- Left column shows "Built With" section with tech stack tags
- Tech stack includes: React, TypeScript, Tailwind, Three.js
- Last updated date is shown
- Right column shows social icons
- Copyright text with current year is centered at bottom

#### 12.2 Footer Social Links
**Steps:**
1. Scroll to footer
2. Click each social icon

**Expected Results:**
- GitHub icon opens GitHub profile in new tab
- LinkedIn icon opens LinkedIn profile in new tab
- Email icon opens mail client
- Icons have proper hover states with color transition
- Icons have proper `aria-label` attributes

---

### 13. Responsive Design

**Seed**: Fresh page load at various viewports

#### 13.1 Mobile Viewport (320px - 767px)
**Steps:**
1. Set viewport to 375px width
2. Scroll through entire page

**Expected Results:**
- Navigation shows only logo and theme toggle
- Desktop nav links are hidden
- Hero section adapts to mobile (stacked layout)
- Hero buttons stack vertically
- Work experience cards stack image on top
- Timeline displays properly in narrow layout
- Now section card is readable
- Interest cards stack in single column
- Project filters wrap properly
- Projects display in single column
- Contact cards stack vertically
- Footer stacks to single column
- All text remains readable
- No horizontal overflow

#### 13.2 Tablet Viewport (768px - 1023px)
**Steps:**
1. Set viewport to 768px width
2. Scroll through entire page

**Expected Results:**
- Desktop navigation appears at 768px breakpoint
- Work experience cards show side-by-side image and content
- Journey timeline displays properly
- Interest cards display in 3-column grid
- Projects display in 2-column grid
- Contact cards display in 3-column grid
- All spacing and layouts are appropriate

#### 13.3 Desktop Viewport (1024px+)
**Steps:**
1. Set viewport to 1920px width
2. Scroll through entire page

**Expected Results:**
- All content is properly centered with max-width containers
- No excessive whitespace
- Images and content maintain proper proportions
- All multi-column layouts display correctly

#### 13.4 Viewport Transitions
**Steps:**
1. Start at mobile viewport
2. Slowly resize to desktop width
3. Resize back to mobile

**Expected Results:**
- All transitions are smooth
- No layout breaks or jumps
- Navigation transitions smoothly between mobile/desktop
- Grid layouts transition gracefully
- No content cut-off or overflow at any breakpoint

---

### 14. Accessibility

**Seed**: Fresh page load

#### 14.1 Keyboard Navigation
**Steps:**
1. Load the page
2. Press Tab key repeatedly to navigate through all interactive elements
3. Use arrow keys in navigation menu
4. Press Enter on focused elements

**Expected Results:**
- All interactive elements are keyboard accessible
- Focus indicators are visible
- Tab order is logical (top to bottom, left to right)
- All buttons and links can be activated with Enter/Space
- No keyboard traps

#### 14.2 Screen Reader Compatibility
**Steps:**
1. Load the page with screen reader enabled
2. Navigate through page content

**Expected Results:**
- All images have descriptive alt text
- Links have descriptive text or aria-labels
- Icons have aria-labels
- Headings create proper document outline (h1, h2, h3 hierarchy)
- Sections have semantic HTML landmarks
- Theme toggle has aria-label

#### 14.3 Focus Management
**Steps:**
1. Load the page
2. Tab through all interactive elements
3. Observe focus states

**Expected Results:**
- Focus outline is visible on all interactive elements
- Focus outline contrasts with background
- Focus is not trapped in any section
- Focus indicators follow WCAG guidelines

#### 14.4 Color Contrast
**Steps:**
1. Load the page in light mode
2. Switch to dark mode
3. Check text contrast throughout

**Expected Results:**
- All text meets WCAG AA contrast requirements (4.5:1 for normal text)
- Primary text has sufficient contrast
- Muted text has sufficient contrast
- Links are distinguishable from regular text
- Both light and dark themes maintain proper contrast

#### 14.5 ARIA Labels and Roles
**Steps:**
1. Load the page
2. Inspect HTML for ARIA attributes

**Expected Results:**
- Navigation has appropriate landmarks
- Buttons have aria-labels where text is not sufficient
- Social icons have aria-labels
- Theme toggle has aria-label
- No redundant or incorrect ARIA usage

---

### 15. Performance

**Seed**: Fresh page load with cleared cache

#### 15.1 Initial Page Load
**Steps:**
1. Clear browser cache
2. Open DevTools Network tab
3. Load the page
4. Record performance metrics

**Expected Results:**
- Page loads within 3 seconds on standard connection
- First Contentful Paint (FCP) < 2 seconds
- Largest Contentful Paint (LCP) < 2.5 seconds
- Time to Interactive (TTI) < 3.5 seconds
- No render-blocking resources

#### 15.2 Image Loading
**Steps:**
1. Load the page
2. Observe image loading behavior
3. Scroll to sections with images

**Expected Results:**
- Images load efficiently
- No layout shift as images load
- Images have appropriate dimensions
- Work experience and project images maintain aspect ratio

#### 15.3 3D Scene Performance
**Steps:**
1. Load the page
2. Observe 3D scene rendering
3. Monitor CPU/GPU usage

**Expected Results:**
- 3D scene renders smoothly at 60fps
- No significant frame drops
- CPU/GPU usage is reasonable
- Scene does not impact scrolling performance
- Scene works on lower-end devices (degrades gracefully)

#### 15.4 Smooth Scrolling
**Steps:**
1. Load the page
2. Scroll through entire page
3. Click navigation links to jump to sections

**Expected Results:**
- Scrolling is smooth and responsive
- No janky animations
- Section transitions are smooth
- Navigation jumps scroll smoothly
- No performance degradation while scrolling

---

### 16. Cross-Browser Compatibility

**Seed**: Fresh page load in different browsers

#### 16.1 Chrome/Chromium
**Steps:**
1. Open page in latest Chrome
2. Test all interactive features

**Expected Results:**
- All features work correctly
- 3D scene renders properly
- Animations are smooth
- Theme toggle works
- All styles render correctly

#### 16.2 Firefox
**Steps:**
1. Open page in latest Firefox
2. Test all interactive features

**Expected Results:**
- All features work correctly
- 3D scene renders properly (may have minor differences)
- Animations are smooth
- Theme toggle works
- All styles render correctly
- No Firefox-specific issues

#### 16.3 Safari
**Steps:**
1. Open page in latest Safari
2. Test all interactive features

**Expected Results:**
- All features work correctly
- 3D scene renders properly
- Animations are smooth
- Theme toggle works
- All styles render correctly
- Backdrop blur works properly
- No WebKit-specific issues

#### 16.4 Edge
**Steps:**
1. Open page in latest Edge
2. Test all interactive features

**Expected Results:**
- All features work correctly (similar to Chrome)
- All Chromium-based features work
- No Edge-specific issues

---

### 17. Edge Cases and Error Handling

**Seed**: Various edge case scenarios

#### 17.1 No JavaScript
**Steps:**
1. Disable JavaScript in browser
2. Load the page

**Expected Results:**
- Static content is still visible and readable
- HTML structure remains accessible
- Navigation links work (anchor links)
- Graceful degradation of interactive features
- Note: 3D scene and React components won't render

#### 17.2 Slow Network Connection
**Steps:**
1. Throttle network to Slow 3G in DevTools
2. Load the page

**Expected Results:**
- Page loads progressively
- Critical content loads first
- Loading states are handled gracefully
- No broken images or missing content
- User can still interact with loaded sections

#### 17.3 Large Viewport
**Steps:**
1. Set viewport to 4K resolution (3840x2160)
2. Observe page layout

**Expected Results:**
- Content remains centered with proper max-width
- No excessive whitespace
- Images maintain quality
- All layouts remain proportional

#### 17.4 Very Small Viewport
**Steps:**
1. Set viewport to 320px width (iPhone SE)
2. Scroll through entire page

**Expected Results:**
- All content fits within viewport
- No horizontal scroll
- Text remains readable (no text cut-off)
- Buttons are tappable (min 44x44 touch target)
- All interactive elements accessible

#### 17.5 Rapid Theme Switching
**Steps:**
1. Load the page
2. Rapidly click theme toggle 10 times

**Expected Results:**
- Theme switches correctly each time
- No visual glitches
- No JavaScript errors
- localStorage updates correctly
- No flash of unstyled content

#### 17.6 Missing Images
**Steps:**
1. Block image loading or provide invalid image URLs
2. Observe page behavior

**Expected Results:**
- Page doesn't break with missing images
- Alt text is displayed for missing images
- Layout remains intact
- No broken image icons break design

#### 17.7 Long Content
**Steps:**
1. Imagine data with very long strings in project descriptions
2. Observe text overflow handling

**Expected Results:**
- Text wraps properly
- No overflow outside containers
- Brutal borders remain intact
- Card layouts adapt to content

---

### 18. Local Storage

**Seed**: Various localStorage scenarios

#### 18.1 Clear Storage and Reload
**Steps:**
1. Set theme to dark
2. Clear all localStorage
3. Reload page

**Expected Results:**
- Page defaults to light theme
- No errors in console
- Theme toggle works after reload

#### 18.2 Corrupted Storage Data
**Steps:**
1. Manually set `localStorage.theme = "invalid"`
2. Reload page

**Expected Results:**
- Page handles invalid theme gracefully
- Falls back to default light theme
- No JavaScript errors

#### 18.3 Storage Persistence
**Steps:**
1. Set theme to dark
2. Close browser tab
3. Reopen page in new tab

**Expected Results:**
- Dark theme persists across browser sessions
- Theme loads correctly on new tab

---

### 19. Animation and Transitions

**Seed**: Fresh page load

#### 19.1 3D Scene Animation Consistency
**Steps:**
1. Load the page
2. Observe 3D animation for 30 seconds
3. Minimize/restore browser window
4. Switch browser tabs and return

**Expected Results:**
- Animation continues smoothly
- No animation freezing
- Animation resumes after tab switch
- Frame rate remains consistent

#### 19.2 Scroll-triggered Animations
**Steps:**
1. Load the page
2. Scroll through each section slowly
3. Scroll back up

**Expected Results:**
- Navigation background animates on scroll
- Hover effects are smooth
- Card shadows transition smoothly
- No jarring or broken animations

#### 19.3 Button Hover Animations
**Steps:**
1. Hover over various buttons throughout page
2. Move mouse quickly on and off buttons

**Expected Results:**
- Shadow effects transition smoothly
- No lingering hover states
- Animations complete even with quick interactions
- Consistent timing across all buttons

#### 19.4 Image Hover Scaling
**Steps:**
1. Hover over project card images
2. Hover over work experience images

**Expected Results:**
- Images scale to 105% smoothly
- No overflow outside containers
- Transform origin is center
- Transition duration is appropriate

---

### 20. URL Hash Navigation

**Seed**: Fresh page load

#### 20.1 Direct Hash URL Access
**Steps:**
1. Navigate to `http://localhost:4321/#projects`
2. Navigate to `http://localhost:4321/#contact`
3. Navigate to `http://localhost:4321/#about`

**Expected Results:**
- Page loads and scrolls directly to specified section
- Navigation bar reflects current section
- Section is properly positioned in viewport

#### 20.2 Invalid Hash
**Steps:**
1. Navigate to `http://localhost:4321/#invalid-section`

**Expected Results:**
- Page loads normally
- No errors in console
- User remains at top of page or default position

#### 20.3 Hash Updates on Scroll
**Steps:**
1. Load the page
2. Click navigation links to different sections
3. Observe URL bar

**Expected Results:**
- URL hash updates when clicking navigation links
- Hash corresponds to section anchors
- Browser back/forward buttons work with hash changes

---

### 21. Form and Input Validation

**Note**: Current implementation does not have forms, but Blog section has a button that may be implemented later

#### 21.1 Future Blog Notify Button
**Steps:**
1. Click "Notify Me" button in Blog section

**Expected Results:**
- Button is clickable
- Current implementation: Button may not have action
- Future: Should open modal or navigate to subscription form

---

### 22. Content Validation

**Seed**: Fresh page load

#### 22.1 Verify All External Links
**Steps:**
1. Collect all external links on page
2. Verify each link format

**Expected Results:**
- GitHub links point to correct profile/repos
- LinkedIn link is correctly formatted
- Email link uses mailto: protocol
- All external links open in new tabs
- All external links have `target="_blank"` and `rel="noopener noreferrer"`

#### 22.2 Verify Data Integration
**Steps:**
1. Compare rendered content with JSON data files
2. Verify work experience data
3. Verify projects data
4. Verify milestones data
5. Verify interests data
6. Verify now section data

**Expected Results:**
- All data from JSON files renders correctly
- No missing data fields
- Icons map correctly from strings to components
- Arrays iterate and display all items

#### 22.3 Technology Filters Match Projects
**Steps:**
1. Scroll to Projects section
2. Note all available filter tags
3. Verify each technology appears in at least one project

**Expected Results:**
- Filter buttons only show technologies that exist in projects
- "All" filter shows all projects
- Each technology filter shows correct subset of projects
- No orphaned filter buttons

---

## Accessibility Considerations

### WCAG 2.1 Level AA Compliance
- Color contrast ratios meet minimum requirements
- Interactive elements have minimum 44x44px touch targets
- All functionality available via keyboard
- Focus indicators are visible
- Proper heading hierarchy
- Alt text for images
- ARIA labels for icon-only buttons

### Semantic HTML
- Use of proper landmarks: header, nav, main, section, footer
- Proper heading structure (h1, h2, h3)
- Button elements for interactive actions
- Link elements for navigation

### Screen Reader Support
- All interactive elements have accessible names
- Images have descriptive alt text
- Icon-only buttons have aria-labels
- Status messages announced appropriately

---

## Responsive Design Considerations

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1023px
- Desktop: >= 1024px

### Layout Adaptations
- Navigation: Mobile shows only logo + theme toggle, desktop shows full nav
- Grids: Multi-column grids collapse to single column on mobile
- Typography: Font sizes scale down on smaller screens
- Images: Full width on mobile, constrained on desktop
- Spacing: Reduced padding/margins on mobile

---

## Performance Considerations

### Optimization Targets
- Lighthouse Performance Score: >= 90
- First Contentful Paint: < 2s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1

### Assets
- Images optimized for web
- Font loading optimized
- CSS/JS minified in production
- 3D scene complexity balanced for performance

---

## Browser Support

### Minimum Supported Versions
- Chrome: 90+
- Firefox: 88+
- Safari: 14+
- Edge: 90+

### Progressive Enhancement
- Core content accessible without JavaScript
- 3D features gracefully degrade on unsupported browsers
- Modern CSS features have fallbacks

---

## Testing Tools Recommendations

1. **Playwright** - E2E testing and UI interactions
2. **axe-core** - Accessibility testing
3. **Lighthouse** - Performance and best practices
4. **BrowserStack** - Cross-browser testing
5. **ResponsivelyApp** - Responsive design testing
6. **WebGL Report** - 3D graphics support testing

---

## Known Limitations / Future Enhancements

1. **Blog Section**: Currently placeholder, "Notify Me" button has no action
2. **Mobile Navigation**: No hamburger menu for section links on mobile
3. **Contact Form**: No inline contact form, relies on external mailto
4. **Analytics**: No mention of analytics tracking
5. **Search**: No search functionality
6. **Animations**: Limited scroll-triggered animations
7. **Loading States**: No explicit loading indicators for slow connections

---

## Priority Test Scenarios

### P0 (Critical - Must Pass)
1. Page loads successfully without errors
2. All navigation links work correctly
3. Theme toggle switches between light/dark
4. External social links open correctly
5. Responsive layout works on mobile, tablet, desktop
6. Core content is readable and accessible

### P1 (High Priority)
1. 3D scene renders and animates
2. Project filters work correctly
3. All hover states function properly
4. Keyboard navigation works throughout
5. Theme persists across page reloads
6. Images load and display correctly

### P2 (Medium Priority)
1. Scroll-aware navigation background
2. Smooth scroll animations
3. Performance metrics meet targets
4. Cross-browser consistency
5. Accessibility compliance
6. Image hover scaling effects

### P3 (Nice to Have)
1. 3D scene manual rotation
2. Animation performance on low-end devices
3. Edge case handling (very large/small viewports)
4. Rapid interaction handling
5. Content overflow scenarios

---

## Test Data Requirements

### Required Data Files
- `/src/data/hero.json` - Hero section content
- `/src/data/work-experience.json` - Professional experience
- `/src/data/milestones.json` - Journey timeline
- `/src/data/now.json` - Current status
- `/src/data/interests.json` - Beyond Code interests
- `/src/data/projects.json` - Side projects

### Test Environment
- Node.js environment for Astro
- Local server running at `http://localhost:4321`
- Modern browser with JavaScript enabled
- DevTools available for debugging

---

## Conclusion

This comprehensive test plan covers all major functionality, edge cases, and quality considerations for the portfolio website. The scenarios are designed to ensure:

1. **Functionality**: All features work as expected
2. **Usability**: Site is intuitive and easy to navigate
3. **Accessibility**: Site is usable by everyone
4. **Performance**: Site loads quickly and runs smoothly
5. **Compatibility**: Site works across browsers and devices
6. **Reliability**: Site handles edge cases gracefully

Each test scenario can be automated with Playwright or performed manually as part of QA process.
