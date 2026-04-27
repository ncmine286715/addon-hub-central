import { U as jsxRuntimeExports } from "./worker-entry-Cd2NupWL.js";
import { c as createLucideIcon } from "./router-CoZDbHzK.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$3 = [
  [
    "path",
    {
      d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
      key: "usdka0"
    }
  ]
];
const FolderOpen = createLucideIcon("folder-open", __iconNode$3);
const __iconNode$2 = [
  [
    "path",
    {
      d: "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",
      key: "1a0edw"
    }
  ],
  ["path", { d: "M12 22V12", key: "d0xqtd" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }]
];
const Package = createLucideIcon("package", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
      key: "10ikf1"
    }
  ]
];
const Play = createLucideIcon("play", __iconNode$1);
const __iconNode = [
  ["rect", { width: "14", height: "20", x: "5", y: "2", rx: "2", ry: "2", key: "1yt0o3" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }]
];
const Smartphone = createLucideIcon("smartphone", __iconNode);
function TutorialPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10 max-w-3xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-pixel text-2xl sm:text-3xl text-primary text-glow mb-2", children: "COMO INSTALAR" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-10", children: "Passo a passo pra instalar qualquer addon do site no seu Minecraft Bedrock." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Step, { n: 1, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "w-5 h-5" }), title: "Abra no navegador", children: [
        "Se você veio do TikTok ou Instagram, toque nos ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "3 pontinhos" }),
        ' e escolha "Abrir no navegador" (Chrome ou Safari). Isso evita erro no download do Terabox.'
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Step, { n: 2, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-5 h-5" }), title: "Baixe o addon", children: [
        "Clique no addon que quer, toque no botão verde ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-primary", children: '"Baixar no Terabox"' }),
        " e siga o passo a passo do Terabox pra salvar o arquivo no seu celular."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Step, { n: 3, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "w-5 h-5" }), title: "Abra o arquivo", children: [
        "O arquivo geralmente vem como ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "px-1.5 py-0.5 rounded bg-muted text-primary text-xs", children: ".mcaddon" }),
        " ou ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "px-1.5 py-0.5 rounded bg-muted text-primary text-xs", children: ".mcpack" }),
        ". É só tocar nele que ele abre direto no Minecraft."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Step, { n: 4, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-5 h-5" }), title: "Ative no mundo", children: [
        "Crie um mundo novo (ou edite um existente), vá em ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Pacotes de Comportamento / Recursos" }),
        " e ative o addon. Pronto, é só jogar!"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 p-6 rounded-2xl bg-gradient-card border border-primary/30", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold mb-2 text-primary", children: "Não funcionou?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Verifica se a versão do seu Minecraft é igual ou maior que a indicada no addon. Alguns addons só funcionam em versões específicas." })
    ] })
  ] });
}
function Step({
  n,
  icon,
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 p-5 rounded-2xl bg-gradient-card border border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-primary/15 border border-primary/40 text-primary flex items-center justify-center font-pixel text-sm", children: n }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold mb-1 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: icon }),
        title
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children })
    ] })
  ] });
}
export {
  TutorialPage as component
};
