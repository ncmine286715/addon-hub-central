import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AddonCard, type AddonCardData } from "@/components/AddonCard";
import { Search, X } from "lucide-react";

export const Route = createFileRoute("/addons")({
  head: () => ({
    meta: [
      { title: "Todos os Addons — MineAddonsNews" },
      { name: "description", content: "Procure entre todos os addons de Minecraft Bedrock disponíveis. Filtre por categoria e baixe fácil pelo Terabox." },
    ],
  }),
  component: AddonsPage,
});

type Addon = AddonCardData & { category_id: string | null };
type Category = { id: string; name: string; slug: string };

function AddonsPage() {
  const [addons, setAddons] = useState<Addon[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [a, c] = await Promise.all([
        supabase
          .from("addons")
          .select("id, slug, name, short_description, image_url, views, downloads, is_featured, category_id, categories(name)")
          .eq("is_published", true)
          .order("created_at", { ascending: false }),
        supabase.from("categories").select("id, name, slug").order("sort_order"),
      ]);
      setAddons(((a.data ?? []) as any[]).map((r) => ({ ...r, category_name: r.categories?.name ?? null })));
      setCategories(c.data ?? []);
      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(() => {
    return addons.filter((a) => {
      if (activeCat && a.category_id !== activeCat) return false;
      if (search) {
        const q = search.toLowerCase();
        return a.name.toLowerCase().includes(q) || a.short_description.toLowerCase().includes(q);
      }
      return true;
    });
  }, [addons, search, activeCat]);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="font-pixel text-2xl sm:text-3xl text-primary text-glow mb-2">CATÁLOGO</h1>
        <p className="text-sm text-muted-foreground">{addons.length} addons disponíveis</p>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar addon, mod ou textura..."
          className="w-full h-14 pl-12 pr-12 rounded-2xl bg-surface-elevated border-2 border-border focus:border-primary outline-none text-base transition placeholder:text-muted-foreground"
        />
        {search && (
          <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:text-primary text-muted-foreground" aria-label="Limpar">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 -mx-4 px-4">
          <Chip active={activeCat === null} onClick={() => setActiveCat(null)}>Todos</Chip>
          {categories.map((c) => (
            <Chip key={c.id} active={activeCat === c.id} onClick={() => setActiveCat(c.id)}>
              {c.name}
            </Chip>
          ))}
        </div>
      )}

      {loading ? (
        <p className="text-center text-muted-foreground py-12">Carregando...</p>
      ) : filtered.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">Nenhum addon encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filtered.map((a) => <AddonCard key={a.slug} addon={a} />)}
        </div>
      )}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={
        "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition " +
        (active
          ? "bg-primary text-primary-foreground border-primary shadow-neon"
          : "bg-muted border-border text-muted-foreground hover:text-foreground hover:border-primary/50")
      }
    >
      {children}
    </button>
  );
}
