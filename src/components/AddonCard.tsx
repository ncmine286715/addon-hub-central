import { Link } from "@tanstack/react-router";
import { Eye, Download, Sparkles } from "lucide-react";
import { formatNumber } from "@/lib/format";

export type AddonCardData = {
  slug: string;
  name: string;
  short_description: string;
  image_url: string;
  views: number;
  downloads: number;
  is_featured?: boolean;
  category_name?: string | null;
};

export function AddonCard({ addon }: { addon: AddonCardData }) {
  return (
    <Link
      to="/addon/$slug"
      params={{ slug: addon.slug }}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-gradient-card border border-border hover:border-primary/60 shadow-card hover:shadow-neon transition-all duration-300 hover:-translate-y-1"
    >
      {addon.is_featured && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2 py-1 rounded-full bg-gold text-background text-[10px] font-bold uppercase tracking-wider">
          <Sparkles className="w-3 h-3" /> Destaque
        </div>
      )}
      <div className="relative aspect-[16/10] overflow-hidden bg-surface">
        <img
          src={addon.image_url}
          alt={addon.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='250'><rect fill='%23222' width='400' height='250'/><text x='50%25' y='50%25' fill='%23666' font-size='18' text-anchor='middle' dy='.3em'>sem imagem</text></svg>";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
      </div>
      <div className="p-4 flex flex-col gap-2">
        {addon.category_name && (
          <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
            {addon.category_name}
          </span>
        )}
        <h3 className="font-bold text-base leading-snug group-hover:text-primary transition line-clamp-1">
          {addon.name}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {addon.short_description}
        </p>
        <div className="flex items-center gap-3 pt-2 mt-auto text-xs text-muted-foreground border-t border-border/60">
          <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {formatNumber(addon.views)}</span>
          <span className="flex items-center gap-1"><Download className="w-3 h-3" /> {formatNumber(addon.downloads)}</span>
        </div>
      </div>
    </Link>
  );
}
