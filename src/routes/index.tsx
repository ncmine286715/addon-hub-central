import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AddonCard, type AddonCardData } from "@/components/AddonCard";
import { Search, Sparkles, TrendingUp, Music2, ArrowRight, Pickaxe } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MineAddonsNews — Addons de Minecraft Bedrock | ncmine" },
      { name: "description", content: "Baixe os melhores addons, texturas e mods de Minecraft Bedrock. Catálogo organizado, download fácil pelo Terabox. Por ncmine." },
    ],
  }),
  component: HomePage,
});

type Addon = AddonCardData & { id: string; created_at: string };

function HomePage() {
  const [featured, setFeatured] = useState<Addon[]>([]);
  const [trending, setTrending] = useState<Addon[]>([]);
  const [latest, setLatest] = useState<Addon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const baseSelect = "id, slug, name, short_description, image_url, views, downloads, is_featured, created_at, categories(name)";
      const [f, t, l] = await Promise.all([
        supabase.from("addons").select(baseSelect).eq("is_published", true).eq("is_featured", true).order("created_at", { ascending: false }).limit(6),
        supabase.from("addons").select(baseSelect).eq("is_published", true).order("views", { ascending: false }).limit(6),
        supabase.from("addons").select(baseSelect).eq("is_published", true).order("created_at", { ascending: false }).limit(8),
      ]);
      const map = (rows: any[] | null): Addon[] =>
        (rows ?? []).map((r) => ({ ...r, category_name: r.categories?.name ?? null }));
      setFeatured(map(f.data));
      setTrending(map(t.data));
      setLatest(map(l.data));
      setLoading(false);
    })();
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-10 w-96 h-96 bg-gold/20 rounded-full blur-[140px]" />
        </div>
        <div className="container mx-auto px-4 py-16 sm:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-semibold mb-6">
            <Music2 className="w-3 h-3" /> 140K+ no TikTok • por ncmine
          </div>
          <h1 className="font-pixel text-2xl sm:text-4xl md:text-5xl leading-tight mb-6">
            <span className="text-foreground">ADDONS DE</span><br />
            <span className="text-primary text-glow">MINECRAFT</span><br />
            <span className="text-foreground text-lg sm:text-2xl md:text-3xl">SEM ENROLAÇÃO</span>
          </h1>
          <p className="max-w-xl mx-auto text-base sm:text-lg text-muted-foreground mb-8 leading-relaxed">
            Catálogo organizado de <span className="text-primary font-semibold">addons</span>,{" "}
            <span className="text-primary font-semibold">texturas</span> e mods.
            Download direto pelo <span className="text-foreground font-semibold">Terabox</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <Link
              to="/addons"
              className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-base shadow-neon hover:shadow-glow animate-pulse-neon transition"
            >
              <Search className="w-5 h-5" /> Ver todos os addons
            </Link>
            <Link
              to="/tutorial"
              className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-muted hover:bg-accent border border-border font-semibold transition"
            >
              <Pickaxe className="w-5 h-5" /> Como instalar
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      {!loading && featured.length > 0 && (
        <Section
          icon={<Sparkles className="w-5 h-5 text-gold" />}
          title="Em destaque"
          subtitle="Os preferidos do ncmine"
          link="/addons"
        >
          <Grid addons={featured} />
        </Section>
      )}

      {/* TRENDING */}
      {!loading && trending.length > 0 && (
        <Section
          icon={<TrendingUp className="w-5 h-5 text-primary" />}
          title="Em alta"
          subtitle="Os mais vistos da semana"
          link="/addons"
        >
          <Grid addons={trending} />
        </Section>
      )}

      {/* LATEST */}
      {!loading && latest.length > 0 && (
        <Section
          icon={<Pickaxe className="w-5 h-5 text-primary" />}
          title="Adicionados recentemente"
          subtitle="Sempre tem coisa nova"
          link="/addons"
        >
          <Grid addons={latest} />
        </Section>
      )}

      {/* EMPTY STATE */}
      {!loading && featured.length === 0 && trending.length === 0 && latest.length === 0 && (
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto p-8 rounded-2xl bg-gradient-card border border-border">
            <Pickaxe className="w-12 h-12 text-primary mx-auto mb-4 animate-float" />
            <h2 className="text-xl font-bold mb-2">Nenhum addon ainda</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Acesse o painel admin pra adicionar os primeiros addons do site.
            </p>
            <Link
              to="/admin"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground font-semibold shadow-neon hover:opacity-90 transition"
            >
              Abrir painel admin <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {loading && (
        <div className="container mx-auto px-4 py-16 text-center text-muted-foreground">
          Carregando...
        </div>
      )}
    </>
  );
}

function Section({
  icon, title, subtitle, link, children,
}: { icon: React.ReactNode; title: string; subtitle: string; link: string; children: React.ReactNode }) {
  return (
    <section className="container mx-auto px-4 py-10 sm:py-14">
      <div className="flex items-end justify-between mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {icon}
            <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
          </div>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <Link to={link} className="text-sm text-primary hover:underline flex items-center gap-1 flex-shrink-0">
          ver tudo <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      {children}
    </section>
  );
}

function Grid({ addons }: { addons: AddonCardData[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
      {addons.map((a) => <AddonCard key={a.slug} addon={a} />)}
    </div>
  );
}
