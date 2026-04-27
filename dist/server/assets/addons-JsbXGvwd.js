import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-Cd2NupWL.js";
import { s as supabase } from "./client-FSMjw0KX.js";
import { A as AddonCard } from "./AddonCard-CDyI78Zx.js";
import { S as Search, X } from "./router-CoZDbHzK.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./format-CzipH5n0.js";
import "./eye-BtUHMuuy.js";
function AddonsPage() {
  const [addons, setAddons] = reactExports.useState([]);
  const [categories, setCategories] = reactExports.useState([]);
  const [search, setSearch] = reactExports.useState("");
  const [activeCat, setActiveCat] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    (async () => {
      const [a, c] = await Promise.all([supabase.from("addons").select("id, slug, name, short_description, image_url, views, downloads, is_featured, category_id, categories(name)").eq("is_published", true).order("created_at", {
        ascending: false
      }), supabase.from("categories").select("id, name, slug").order("sort_order")]);
      setAddons((a.data ?? []).map((r) => ({
        ...r,
        category_name: r.categories?.name ?? null
      })));
      setCategories(c.data ?? []);
      setLoading(false);
    })();
  }, []);
  const filtered = reactExports.useMemo(() => {
    return addons.filter((a) => {
      if (activeCat && a.category_id !== activeCat) return false;
      if (search) {
        const q = search.toLowerCase();
        return a.name.toLowerCase().includes(q) || a.short_description.toLowerCase().includes(q);
      }
      return true;
    });
  }, [addons, search, activeCat]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-pixel text-2xl sm:text-3xl text-primary text-glow mb-2", children: "CATÁLOGO" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        addons.length,
        " addons disponíveis"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Buscar addon, mod ou textura...", className: "w-full h-14 pl-12 pr-12 rounded-2xl bg-surface-elevated border-2 border-border focus:border-primary outline-none text-base transition placeholder:text-muted-foreground" }),
      search && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSearch(""), className: "absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:text-primary text-muted-foreground", "aria-label": "Limpar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" }) })
    ] }),
    categories.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mb-8 overflow-x-auto pb-2 -mx-4 px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Chip, { active: activeCat === null, onClick: () => setActiveCat(null), children: "Todos" }),
      categories.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(Chip, { active: activeCat === c.id, onClick: () => setActiveCat(c.id), children: c.name }, c.id))
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground py-12", children: "Carregando..." }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground py-12", children: "Nenhum addon encontrado." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5", children: filtered.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(AddonCard, { addon: a }, a.slug)) })
  ] });
}
function Chip({
  active,
  onClick,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick, className: "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition " + (active ? "bg-primary text-primary-foreground border-primary shadow-neon" : "bg-muted border-border text-muted-foreground hover:text-foreground hover:border-primary/50"), children });
}
export {
  AddonsPage as component
};
