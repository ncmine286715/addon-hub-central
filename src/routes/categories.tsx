import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Categorias — MineAddonsNews" },
      { name: "description", content: "Navegue por categorias: addons, texturas, mods, mapas e mais para Minecraft Bedrock." },
    ],
  }),
  component: CategoriesPage,
});

type Cat = { id: string; name: string; slug: string; icon: string | null; count: number };

function CategoriesPage() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data: c } = await supabase.from("categories").select("id, name, slug, icon").order("sort_order");
      const { data: a } = await supabase.from("addons").select("category_id").eq("is_published", true);
      const counts = new Map<string, number>();
      (a ?? []).forEach((r) => r.category_id && counts.set(r.category_id, (counts.get(r.category_id) ?? 0) + 1));
      setCats((c ?? []).map((x) => ({ ...x, count: counts.get(x.id) ?? 0 })));
      setLoading(false);
    })();
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="font-pixel text-2xl sm:text-3xl text-primary text-glow mb-8">CATEGORIAS</h1>
      {loading ? (
        <p className="text-muted-foreground">Carregando...</p>
      ) : cats.length === 0 ? (
        <p className="text-muted-foreground">Nenhuma categoria criada ainda.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {cats.map((c) => (
            <Link
              key={c.id}
              to="/addons"
              className="group p-6 rounded-2xl bg-gradient-card border border-border hover:border-primary/60 hover:shadow-neon transition"
            >
              <div className="text-3xl mb-2">{c.icon || "📦"}</div>
              <h3 className="font-bold mb-1 group-hover:text-primary transition">{c.name}</h3>
              <p className="text-xs text-muted-foreground">{c.count} addon{c.count !== 1 && "s"}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
