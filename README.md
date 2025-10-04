# Chaim Lev-Ari - Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS.

## Features

- 🌓 **Light/Dark Mode** - Theme toggle with localStorage persistence
- 📱 **Fully Responsive** - Mobile-first design that looks great on all devices
- ⚡ **Smooth Animations** - Subtle transitions and hover effects
- 🎯 **Sticky Navigation** - Smooth scrolling to sections
- ♿ **Accessible** - Semantic HTML and ARIA labels
- 🚀 **Production Ready** - Optimized build configuration

## Tech Stack

- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Icons:** Lucide React
- **Routing:** React Router DOM

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── Navigation.tsx  # Sticky navigation
│   ├── Hero.tsx        # Hero section
│   ├── About.tsx       # About section
│   ├── Projects.tsx    # Projects grid
│   ├── ProjectCard.tsx # Individual project card
│   ├── Contact.tsx     # Contact section
│   ├── Footer.tsx      # Footer
│   └── ThemeToggle.tsx # Theme switcher
├── pages/              # Page components
│   ├── Index.tsx       # Home page
│   └── NotFound.tsx    # 404 page
├── assets/             # Images and static files
├── lib/                # Utility functions
└── hooks/              # Custom React hooks
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:8080`

## Build for Production

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Customization

### Update Personal Information

Edit the following files to update personal information:

- `src/components/Hero.tsx` - Name and introduction
- `src/components/About.tsx` - About section content
- `src/components/Projects.tsx` - Project details
- `src/components/Contact.tsx` - Contact information

### Modify Color Scheme

The color scheme is defined in `src/index.css`. Update the CSS variables for both light and dark modes:

```css
:root {
  --primary: 210 71% 58%;  /* Blue accent */
  /* ... other colors */
}

.dark {
  --primary: 210 71% 58%;  /* Same blue accent */
  /* ... other colors */
}
```

### Add New Projects

Edit `src/components/Projects.tsx` and add to the `projects` array:

```typescript
{
  name: "Project Name",
  description: "Project description",
  tech: ["React", "TypeScript"],
  link: "https://project-url.com",
  github: "https://github.com/username/repo",
  image: projectImage,
}
```

## Deployment

This project can be deployed to any static hosting service:

- **Lovable** - Click "Publish" in the Lovable editor
- **Vercel** - Connect your Git repository
- **Netlify** - Drag and drop the `dist` folder
- **GitHub Pages** - Use the build output

## License

MIT License - feel free to use this template for your own portfolio!

## Contact

- Email: chiptus@gmail.com
- GitHub: [@chiptus](https://github.com/chiptus)
- LinkedIn: [chiptus](http://linkedin.com/in/chiptus)
