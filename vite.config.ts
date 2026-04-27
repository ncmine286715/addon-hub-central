import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Desativamos as validações automáticas do plugin do Cloudflare 
  // que tentam encontrar arquivos no dist antes do build terminar.
  vite: {
    build: {
      ssr: true
    }
  }
});
