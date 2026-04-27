import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-Cd2NupWL.js";
import { L as Link } from "./router-CoZDbHzK.js";
import { s as supabase } from "./client-FSMjw0KX.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function CategoriesPage() {
  const [cats, setCats] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    (async () => {
      const {
        data: c
      } = await supabase.from("categories").select("id, name, slug, icon").order("sort_order");
      const {
        data: a
      } = await supabase.from("addons").select("category_id").eq("is_published", true);
      const counts = /* @__PURE__ */ new Map();
      (a ?? []).forEach((r) => r.category_id && counts.set(r.category_id, (counts.get(r.category_id) ?? 0) + 1));
      setCats((c ?? []).map((x) => ({
        ...x,
        count: counts.get(x.id) ?? 0
      })));
      setLoading(false);
    })();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-pixel text-2xl sm:text-3xl text-primary text-glow mb-8", children: "CATEGORIAS" }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Carregando..." }) : cats.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Nenhuma categoria criada ainda." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4", children: cats.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/addons", className: "group p-6 rounded-2xl bg-gradient-card border border-border hover:border-primary/60 hover:shadow-neon transition", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl mb-2", children: c.icon || "📦" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold mb-1 group-hover:text-primary transition", children: c.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
        c.count,
        " addon",
        c.count !== 1 && "s"
      ] })
    ] }, c.id)) })
  ] });
}
export {
  CategoriesPage as component
};
