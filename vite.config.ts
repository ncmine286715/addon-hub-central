import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    define: {
      "process.env": "{}",
    },
    ssr: {
      target: "webworker",
      noExternal: true,
    },
    build: {
      minify: "esbuild",
      cssMinify: true,
      rollupOptions: {
        output: {
          format: "esm",
        },
      },
    },
    optimizeDeps: {
      include: ["react", "react-dom"],
    },
  },
});
