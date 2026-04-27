import { U as jsxRuntimeExports } from "./worker-entry-Cd2NupWL.js";
import { c as createLucideIcon, L as Link } from "./router-CoZDbHzK.js";
import { f as formatNumber } from "./format-CzipH5n0.js";
import { E as Eye, D as Download } from "./eye-BtUHMuuy.js";
const __iconNode = [
  [
    "path",
    {
      d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
      key: "1s2grr"
    }
  ],
  ["path", { d: "M20 2v4", key: "1rf3ol" }],
  ["path", { d: "M22 4h-4", key: "gwowj6" }],
  ["circle", { cx: "4", cy: "20", r: "2", key: "6kqj1y" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode);
function AddonCard({ addon }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/addon/$slug",
      params: { slug: addon.slug },
      className: "group relative flex flex-col overflow-hidden rounded-2xl bg-gradient-card border border-border hover:border-primary/60 shadow-card hover:shadow-neon transition-all duration-300 hover:-translate-y-1",
      children: [
        addon.is_featured && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-3 right-3 z-10 flex items-center gap-1 px-2 py-1 rounded-full bg-gold text-background text-[10px] font-bold uppercase tracking-wider", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3 h-3" }),
          " Destaque"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[16/10] overflow-hidden bg-surface", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: addon.image_url,
              alt: addon.name,
              loading: "lazy",
              className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500",
              onError: (e) => {
                e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='250'><rect fill='%23222' width='400' height='250'/><text x='50%25' y='50%25' fill='%23666' font-size='18' text-anchor='middle' dy='.3em'>sem imagem</text></svg>";
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex flex-col gap-2", children: [
          addon.category_name && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-wider text-primary", children: addon.category_name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-base leading-snug group-hover:text-primary transition line-clamp-1", children: addon.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2 leading-relaxed", children: addon.short_description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-2 mt-auto text-xs text-muted-foreground border-t border-border/60", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3 h-3" }),
              " ",
              formatNumber(addon.views)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3 h-3" }),
              " ",
              formatNumber(addon.downloads)
            ] })
          ] })
        ] })
      ]
    }
  );
}
export {
  AddonCard as A,
  Sparkles as S
};
