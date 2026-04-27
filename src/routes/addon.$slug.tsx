import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Download, Eye, ArrowLeft, Tag, User, Box, ExternalLink } from "lucide-react";
import { formatNumber } from "@/lib/format";

export const Route = createFileRoute("/addon/$slug")({
  component: AddonPage,
  notFoundComponent: () => (
    <div className="container mx-auto px-4 py-20 text-center">
      <p className="font-pixel text-3xl text-primary mb-4">404</p>
      <p className="text-muted-foreground mb-6">Esse addon não existe.</p>
      <Link to="/addons" className="text-primary hover:underline">Voltar pra lista</Link>
    </div>
  ),
});

type Addon = {
  id: string; slug: string; name: string; short_description: string; long_description: string | null;
  image_url: string; gallery: string[]; terabox_url: string; tags: string[];
  mc_version: string | null; author: string | null; views: number; downloads: number;
  category_name: string | null;
};

function AddonPage() {
  const { slug } = Route.useParams();
  const [addon, setAddon] = useState<Addon | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("addons")
        .select("*, categories(name)")
        .eq("slug", slug)
        .eq("is_published", true)
        .maybeSingle();
      if (!data) {
        setLoading(false);
        return;
      }
      const a: Addon = {
        ...(data as any),
        gallery: Array.isArray((data as any).gallery) ? (data as any).gallery : [],
        category_name: (data as any).categories?.name ?? null,
      };
      setAddon(a);
      setLoading(false);
      // Increment view count
      supabase.rpc("increment_addon_views", { addon_slug: slug });
    })();
  }, [slug]);

  if (loading) return <div className="container mx-auto px-4 py-20 text-center text-muted-foreground">Carregando...</div>;
  if (!addon) throw notFound();

  const images = [addon.image_url, ...addon.gallery];

  const handleDownload = () => {
    supabase.rpc("increment_addon_downloads", { addon_slug: addon.slug });
    window.open(addon.terabox_url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <Link to="/addons" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="w-4 h-4" /> voltar
      </Link>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Gallery */}
        <div className="lg:col-span-3">
          <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-surface border border-border shadow-card mb-3">
            <img src={images[activeImg]} alt={addon.name} className="w-full h-full object-cover" />
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={
                    "flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition " +
                    (i === activeImg ? "border-primary shadow-neon" : "border-border opacity-60 hover:opacity-100")
                  }
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info + CTA */}
        <div className="lg:col-span-2 flex flex-col">
          {addon.category_name && (
            <span className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
              {addon.category_name}
            </span>
          )}
          <h1 className="text-2xl sm:text-3xl font-bold mb-3 leading-tight">{addon.name}</h1>
          <p className="text-muted-foreground mb-5 leading-relaxed">{addon.short_description}</p>

          <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><Eye className="w-4 h-4" /> {formatNumber(addon.views)}</span>
            <span className="flex items-center gap-1.5"><Download className="w-4 h-4" /> {formatNumber(addon.downloads)}</span>
          </div>

          {/* CTA GIGANTE */}
          <button
            onClick={handleDownload}
            className="group relative w-full py-5 rounded-2xl bg-gradient-neon text-primary-foreground font-pixel text-sm sm:text-base shadow-neon hover:shadow-glow animate-pulse-neon transition mb-3 overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              <Download className="w-5 h-5" />
              BAIXAR NO TERABOX
              <ExternalLink className="w-4 h-4 opacity-70" />
            </span>
          </button>
          <p className="text-[11px] text-muted-foreground text-center mb-6">
            ⚡ Veio do TikTok? Abra no navegador antes (3 pontinhos).
          </p>

          <div className="space-y-2 text-sm">
            {addon.author && <Meta icon={<User className="w-4 h-4" />} label="Autor" value={addon.author} />}
            {addon.mc_version && <Meta icon={<Box className="w-4 h-4" />} label="Versão MC" value={addon.mc_version} />}
            {addon.tags.length > 0 && (
              <div className="flex items-start gap-2 pt-2">
                <Tag className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div className="flex flex-wrap gap-1.5">
                  {addon.tags.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-full bg-muted text-xs text-muted-foreground">{t}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Long description */}
      {addon.long_description && (
        <div className="mt-12 p-6 rounded-2xl bg-gradient-card border border-border">
          <h2 className="font-bold mb-3 text-primary">Sobre o addon</h2>
          <div className="prose prose-invert text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
            {addon.long_description}
          </div>
        </div>
      )}
    </div>
  );
}

function Meta({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-muted-foreground">{icon}</span>
      <span className="text-muted-foreground">{label}:</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
