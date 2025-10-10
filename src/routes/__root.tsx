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
  head: () => ({
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
        content: "Full-Stack Developer, React, TypeScript, AI, Web Development",
      },
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
      // {
      //   property: "og:image",
      //   content: "https://lovable.dev/opengraph-image-p98pqg.png",
      // },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:creator",
        content: "@chiptus",
      },
      // {
      //   name: "twitter:image",
      //   content: "https://lovable.dev/opengraph-image-p98pqg.png",
      // },
    ],
    links: [
      { rel: "stylesheet", href: indexCss },
      { rel: "stylesheet", href: appCss },
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
  }),
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
