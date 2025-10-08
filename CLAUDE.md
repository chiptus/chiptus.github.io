# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A personal portfolio website for Chaim Lev-Ari built with React, TypeScript, Vite, and Tailwind CSS. The site features a brutalist design aesthetic with dark/light mode support and 3D animated elements.

## Development Commands

```bash
# Install dependencies
npm install

# Start dev server (runs on http://localhost:8080)
npm run dev

# Build for production
npm run build

# Build in development mode
npm run build:dev

# Lint code
npm run lint

# Preview production build
npm run preview
```

## Architecture

### Data-Driven Content System

All portfolio content is stored as JSON files in `/public/data/`:
- `hero.json` - Hero section (name, title, skills, social links)
- `projects.json` - Project listings
- `work-experience.json` - Work history
- `milestones.json` - Career milestones for timeline
- `now.json` - Current activities ("Now" page)
- `interests.json` - Beyond code interests

**Important**: Data files exist ONLY in `/public/data/`, NOT in `/src/data/`. The `/src/data/` directory contains outdated duplicates and should be ignored.

### Data Fetching Pattern

Content is fetched at runtime using React Query (TanStack Query):
- Custom hooks in `/src/hooks/` (e.g., `useHeroData.ts`, `useProjectsData.ts`)
- Each hook fetches from `/data/*.json` (served from `/public/data/`)
- All hooks follow the same pattern: fetch function + useQuery hook
- Components show loading state while data is being fetched

Example:
```typescript
const { data, isLoading, error } = useHeroData();
if (isLoading || !data) return <LoadingState />;
```

### Component Structure

- `/src/components/` - Main portfolio section components (Hero, Projects, WorkExperience, etc.)
- `/src/components/ui/` - shadcn/ui components (50+ reusable UI primitives)
- `/src/pages/` - Route components (Index.tsx is the main page, all sections in one scrollable page)
- `/src/hooks/` - Custom hooks for data fetching

### Routing

Single page application with one main route (`/`) that renders all sections in the Index page. React Router setup in `App.tsx` with QueryClient provider.

### Styling System

- **Framework**: Tailwind CSS with CSS variables for theming
- **Theme**: Dark/light mode via `next-themes` package
- **Design System**: Uses brutalist design patterns (thick borders, bold shadows)
- **shadcn/ui**: Component configuration in `components.json`
- **Path Alias**: `@/` maps to `src/`
- **Utility**: `cn()` helper in `/src/lib/utils.ts` combines clsx + tailwind-merge

### 3D Graphics

The hero section includes a 3D scene (`Scene3D.tsx`) using:
- `@react-three/fiber` - React renderer for Three.js
- `@react-three/drei` - Helper components
- Animated wireframe shapes (sphere, box, torus) with auto-rotation

## Key Technical Details

### shadcn/ui Integration

Components are installed via CLI and live in `/src/components/ui/`. They use Radix UI primitives with Tailwind styling. Configuration in `components.json` defines aliases and paths.

### State Management

- React Query for server state (data fetching)
- React hooks for local state
- Theme state managed by `next-themes`

### Build Tool

Vite with SWC for fast builds. Dev server runs on port 8080 (IPv6 enabled).

## Editing Content

To update portfolio content, edit the JSON files in `/public/data/`. Changes will be reflected on next page load. The data structure in each file matches the TypeScript interfaces defined in the corresponding hook files.
