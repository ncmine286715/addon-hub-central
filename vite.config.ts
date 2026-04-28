import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouterVite } from "@tanstack/router-plugin";
import tsconfigPaths from "vite-tsconfig-paths";
import cloudflare from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    tanstackRouterVite(),
    react(),
    tailwindcss(),
    tsconfigPaths(),
    cloudflare({
      configPath: resolve(__dirname, "wrangler.toml"),
    }),
  ],
  build: {
    outDir: "dist",
    minify: "esbuild",
  },
  ssr: {
    noExternal: true,
    target: "webworker",
  },
  define: {
    "process.env": "{}",
  }
});
