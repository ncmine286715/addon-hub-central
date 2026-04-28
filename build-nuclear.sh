#!/bin/bash
echo "--- INICIANDO LIMPEZA NUCLEAR ---"
# Remove qualquer arquivo wrangler em qualquer lugar do diretório de build
find . -name "wrangler.jsonc" -delete
find . -name "wrangler.json" -delete
find . -name "wrangler.toml" -delete

# Limpa a pasta dist
rm -rf dist

echo "--- EXECUTANDO VITE BUILD ---"
vite build
