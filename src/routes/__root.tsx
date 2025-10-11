/// <reference types="vite/client" />
import type { ReactNode } from "react";
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import indexCss from "../index.css?url";
import appCss from "../App.css?url";

export const Route = createRootRoute({
  head: () => {
    const siteUrl = getSiteUrl();
    const ogImageUrl = `${siteUrl}/og-image.svg`;

    return {
      meta: [
        {
          charSet: "utf-8",
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1.0",
        },
        {
          title: "Chaim Lev-Ari | Full-Stack Developer",
        },
        {
          name: "description",
          content:
            "Full-stack developer with 10+ years experience, specializing in React, TypeScript, and modern web technologies.",
        },
        {
          name: "author",
          content: "Chaim Lev-Ari",
        },
        {
          name: "keywords",
          content:
            "Full-Stack Developer, React, TypeScript, Go, AI, Web Development, Software Engineer",
        },
        {
          name: "theme-color",
          content: "#0a0a0a",
        },
        // Open Graph meta tags
        {
          property: "og:title",
          content: "Chaim Lev-Ari | Full-Stack Developer",
        },
        {
          property: "og:description",
          content:
            "Full-stack developer with 10+ years experience, specializing in React, TypeScript, and modern web technologies.",
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:url",
          content: siteUrl,
        },
        {
          property: "og:image",
          content: ogImageUrl,
        },
        {
          property: "og:image:width",
          content: "1200",
        },
        {
          property: "og:image:height",
          content: "630",
        },
        {
          property: "og:image:alt",
          content: "Chaim Lev-Ari - Full-Stack Developer",
        },
        // Twitter Card meta tags
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          name: "twitter:creator",
          content: "@chiptus",
        },
        {
          name: "twitter:title",
          content: "Chaim Lev-Ari | Full-Stack Developer",
        },
        {
          name: "twitter:description",
          content:
            "Full-stack developer with 10+ years experience, specializing in React, TypeScript, and modern web technologies.",
        },
        {
          name: "twitter:image",
          content: ogImageUrl,
        },
      ],
      links: [
        { rel: "stylesheet", href: indexCss },
        { rel: "stylesheet", href: appCss },
        { rel: "canonical", href: siteUrl },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossOrigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
        },
      ],
      scripts: [
        // Structured Data (JSON-LD) for better Google understanding
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Chaim Lev-Ari",
            url: siteUrl,
            image: ogImageUrl,
            jobTitle: "Full-Stack Developer",
            description:
              "Full-stack developer with 10+ years experience, specializing in React, TypeScript, and modern web technologies.",
            knowsAbout: [
              "React",
              "TypeScript",
              "JavaScript",
              "Go",
              "Web Development",
              "Software Engineering",
              "AI",
            ],
            sameAs: [
              "https://github.com/chiptus",
              "http://linkedin.com/in/chiptus",
              "https://twitter.com/chiptus",
            ],
          }),
        },
      ],
    };
  },
  component: RootComponent,
});

const queryClient = new QueryClient();

function RootComponent() {
  return (
    <RootDocument>
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html className="scroll-smooth">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

/**
 * Get the site URL dynamically from the current origin
 * Falls back to localhost for development
 */
const getSiteUrl = () => {
  // Check for Vercel deployment URL first
  if (import.meta.env.VITE_VERCEL_URL) {
    return `https://${import.meta.env.VITE_VERCEL_URL}`;
  }

  // For client-side, use window.location.origin
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  // Fallback for local development
  return "http://localhost:3000";
};
