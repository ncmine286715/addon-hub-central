import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    // Forçamos o build SSR a ser tratado como webworker para o Cloudflare
    ssr: {
      target: "webworker",
      noExternal: true,
    },
    // Injetamos um shim básico para process para evitar erros de runtime
    define: {
      "process.env": "{}",
    }
  }
});
