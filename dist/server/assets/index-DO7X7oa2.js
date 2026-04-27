import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-Cd2NupWL.js";
import { c as createLucideIcon, M as Music2, L as Link, S as Search, P as Pickaxe } from "./router-CoZDbHzK.js";
import { s as supabase } from "./client-FSMjw0KX.js";
import { S as Sparkles, A as AddonCard } from "./AddonCard-CDyI78Zx.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./format-CzipH5n0.js";
import "./eye-BtUHMuuy.js";
const __iconNode$1 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$1);
const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode);
function HomePage() {
  const [featured, setFeatured] = reactExports.useState([]);
  const [trending, setTrending] = reactExports.useState([]);
  const [latest, setLatest] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    (async () => {
      const baseSelect = "id, slug, name, short_description, image_url, views, downloads, is_featured, created_at, categories(name)";
      const [f, t, l] = await Promise.all([supabase.from("addons").select(baseSelect).eq("is_published", true).eq("is_featured", true).order("created_at", {
        ascending: false
      }).limit(6), supabase.from("addons").select(baseSelect).eq("is_published", true).order("views", {
        ascending: false
      }).limit(6), supabase.from("addons").select(baseSelect).eq("is_published", true).order("created_at", {
        ascending: false
      }).limit(8)]);
      const map = (rows) => (rows ?? []).map((r) => ({
        ...r,
        category_name: r.categories?.name ?? null
      }));
      setFeatured(map(f.data));
      setTrending(map(t.data));
      setLatest(map(l.data));
      setLoading(false);
    })();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 -z-10 opacity-30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-[120px]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 right-10 w-96 h-96 bg-gold/20 rounded-full blur-[140px]" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-16 sm:py-24 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-semibold mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Music2, { className: "w-3 h-3" }),
          " 140K+ no TikTok • por ncmine"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-pixel text-2xl sm:text-4xl md:text-5xl leading-tight mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "ADDONS DE" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary text-glow", children: "MINECRAFT" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground text-lg sm:text-2xl md:text-3xl", children: "SEM ENROLAÇÃO" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "max-w-xl mx-auto text-base sm:text-lg text-muted-foreground mb-8 leading-relaxed", children: [
          "Catálogo organizado de ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-semibold", children: "addons" }),
          ",",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-semibold", children: "texturas" }),
          " e mods. Download direto pelo ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: "Terabox" }),
          "."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/addons", className: "flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-base shadow-neon hover:shadow-glow animate-pulse-neon transition", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-5 h-5" }),
            " Ver todos os addons"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/tutorial", className: "flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-muted hover:bg-accent border border-border font-semibold transition", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Pickaxe, { className: "w-5 h-5" }),
            " Como instalar"
          ] })
        ] })
      ] })
    ] }),
    !loading && featured.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-5 h-5 text-gold" }), title: "Em destaque", subtitle: "Os preferidos do ncmine", link: "/addons", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Grid, { addons: featured }) }),
    !loading && trending.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5 text-primary" }), title: "Em alta", subtitle: "Os mais vistos da semana", link: "/addons", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Grid, { addons: trending }) }),
    !loading && latest.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Pickaxe, { className: "w-5 h-5 text-primary" }), title: "Adicionados recentemente", subtitle: "Sempre tem coisa nova", link: "/addons", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Grid, { addons: latest }) }),
    !loading && featured.length === 0 && trending.length === 0 && latest.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-16 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto p-8 rounded-2xl bg-gradient-card border border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Pickaxe, { className: "w-12 h-12 text-primary mx-auto mb-4 animate-float" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold mb-2", children: "Nenhum addon ainda" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "Acesse o painel admin pra adicionar os primeiros addons do site." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin", className: "inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground font-semibold shadow-neon hover:opacity-90 transition", children: [
        "Abrir painel admin ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
      ] })
    ] }) }),
    loading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-16 text-center text-muted-foreground", children: "Carregando..." })
  ] });
}
function Section({
  icon,
  title,
  subtitle,
  link,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container mx-auto px-4 py-10 sm:py-14", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-6 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
          icon,
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl sm:text-2xl font-bold", children: title })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: subtitle })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: link, className: "text-sm text-primary hover:underline flex items-center gap-1 flex-shrink-0", children: [
        "ver tudo ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
      ] })
    ] }),
    children
  ] });
}
function Grid({
  addons
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5", children: addons.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(AddonCard, { addon: a }, a.slug)) });
}
export {
  HomePage as component
};
