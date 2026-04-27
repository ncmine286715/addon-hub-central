import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    plugins: [],
    // We override the cloudflare plugin behavior by ensuring it doesn't try to 
    // resolve a non-existent file before the build finishes.
    ssr: {
      external: ["node:events", "node:async_hooks", "node:stream/web", "node:stream"],
    }
  }
});
