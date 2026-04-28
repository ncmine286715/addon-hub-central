import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouterVite } from "@tanstack/router-plugin";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tanstackRouterVite(),
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
  build: {
    outDir: "dist",
    minify: "esbuild",
    ssr: true,
  },
  ssr: {
    noExternal: true,
    target: "webworker",
  },
  define: {
    "process.env": "{}",
  }
});
