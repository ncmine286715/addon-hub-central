import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    define: {
      // Injetamos um shim para o process.env para evitar erros de referência no Worker
      "process.env": "{}",
      "process.browser": "false",
    },
    ssr: {
      target: "webworker",
      noExternal: true, // Garante que todas as dependências sejam bundladas para o Worker
    },
    build: {
      minify: true,
    }
  }
});
