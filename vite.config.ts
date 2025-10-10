// vite.config.ts
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    tsConfigPaths(),
    tanstackStart({
      prerender: {
        enabled: true,
        // Put pages under `/page/index.html` instead of `/page.html` when desired
        autoSubfolderIndex: true,
        // Follow links found in rendered HTML and prerender them too
        crawlLinks: true,
        // How many prerender jobs to run concurrently
        concurrency: 8,
        // Optional callback for successful renders
        onSuccess: ({ page }) => {
          console.log(`Prerendered ${page.path}`);
        },
      },
    }),
    // react's vite plugin must come after start's vite plugin
    viteReact(),
    tailwindcss(),
  ],
});
