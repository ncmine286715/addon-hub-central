import { r as reactExports, U as jsxRuntimeExports, a0 as notFound } from "./worker-entry-Cd2NupWL.js";
import { c as createLucideIcon, R as Route, L as Link, E as ExternalLink } from "./router-CoZDbHzK.js";
import { s as supabase } from "./client-FSMjw0KX.js";
import { f as formatNumber } from "./format-CzipH5n0.js";
import { E as Eye, D as Download } from "./eye-BtUHMuuy.js";
import { T as Tag } from "./tag-mRDz-pV2.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$2 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",
      key: "hh9hay"
    }
  ],
  ["path", { d: "m3.3 7 8.7 5 8.7-5", key: "g66t2b" }],
  ["path", { d: "M12 22V12", key: "d0xqtd" }]
];
const Box = createLucideIcon("box", __iconNode$1);
const __iconNode = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode);
function AddonPage() {
  const {
    slug
  } = Route.useParams();
  const [addon, setAddon] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [activeImg, setActiveImg] = reactExports.useState(0);
  reactExports.useEffect(() => {
    (async () => {
      const {
        data
      } = await supabase.from("addons").select("*, categories(name)").eq("slug", slug).eq("is_published", true).maybeSingle();
      if (!data) {
        setLoading(false);
        return;
      }
      const a = {
        ...data,
        gallery: Array.isArray(data.gallery) ? data.gallery : [],
        category_name: data.categories?.name ?? null
      };
      setAddon(a);
      setLoading(false);
      supabase.rpc("increment_addon_views", {
        addon_slug: slug
      });
    })();
  }, [slug]);
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-20 text-center text-muted-foreground", children: "Carregando..." });
  if (!addon) throw notFound();
  const images = [addon.image_url, ...addon.gallery];
  const handleDownload = () => {
    supabase.rpc("increment_addon_downloads", {
      addon_slug: addon.slug
    });
    window.open(addon.terabox_url, "_blank", "noopener,noreferrer");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-6 max-w-5xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/addons", className: "inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
      " voltar"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-5 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[16/10] rounded-2xl overflow-hidden bg-surface border border-border shadow-card mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: images[activeImg], alt: addon.name, className: "w-full h-full object-cover" }) }),
        images.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto", children: images.map((src, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveImg(i), className: "flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition " + (i === activeImg ? "border-primary shadow-neon" : "border-border opacity-60 hover:opacity-100"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src, alt: "", className: "w-full h-full object-cover" }) }, i)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 flex flex-col", children: [
        addon.category_name && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-wider text-primary mb-2", children: addon.category_name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl sm:text-3xl font-bold mb-3 leading-tight", children: addon.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-5 leading-relaxed", children: addon.short_description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-6 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" }),
            " ",
            formatNumber(addon.views)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
            " ",
            formatNumber(addon.downloads)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleDownload, className: "group relative w-full py-5 rounded-2xl bg-gradient-neon text-primary-foreground font-pixel text-sm sm:text-base shadow-neon hover:shadow-glow animate-pulse-neon transition mb-3 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative z-10 flex items-center justify-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-5 h-5" }),
          "BAIXAR NO TERABOX",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-4 h-4 opacity-70" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground text-center mb-6", children: "⚡ Veio do TikTok? Abra no navegador antes (3 pontinhos)." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
          addon.author && /* @__PURE__ */ jsxRuntimeExports.jsx(Meta, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4" }), label: "Autor", value: addon.author }),
          addon.mc_version && /* @__PURE__ */ jsxRuntimeExports.jsx(Meta, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { className: "w-4 h-4" }), label: "Versão MC", value: addon.mc_version }),
          addon.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-4 h-4 text-muted-foreground mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: addon.tags.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-full bg-muted text-xs text-muted-foreground", children: t }, t)) })
          ] })
        ] })
      ] })
    ] }),
    addon.long_description && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 p-6 rounded-2xl bg-gradient-card border border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold mb-3 text-primary", children: "Sobre o addon" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose prose-invert text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed", children: addon.long_description })
    ] })
  ] });
}
function Meta({
  icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
      label,
      ":"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: value })
  ] });
}
export {
  AddonPage as component
};
