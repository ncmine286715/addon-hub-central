import { Link } from "@tanstack/react-router";
import { Music2, Youtube, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-surface/50">
      <div className="container mx-auto px-4 py-10">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          <div>
            <p className="font-pixel text-xs text-primary mb-3">NCMINE</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Criador de addons do Minecraft Bedrock. 140k+ no TikTok.
              O melhor lugar pra baixar addons sem dor de cabeça.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Navegação</p>
            <ul className="space-y-2 text-sm">
              <li><Link to="/addons" className="hover:text-primary transition">Todos os addons</Link></li>
              <li><Link to="/categories" className="hover:text-primary transition">Categorias</Link></li>
              <li><Link to="/tutorial" className="hover:text-primary transition">Como instalar</Link></li>
              <li><Link to="/admin" className="hover:text-primary transition opacity-60">Painel admin</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Me siga</p>
            <div className="flex gap-2">
              <Social href="https://www.tiktok.com/@ncmine" label="TikTok"><Music2 className="w-4 h-4" /></Social>
              <Social href="#" label="YouTube"><Youtube className="w-4 h-4" /></Social>
              <Social href="#" label="Instagram"><Instagram className="w-4 h-4" /></Social>
            </div>
          </div>
        </div>
        <div className="pt-6 border-t border-border/60 text-xs text-muted-foreground flex flex-col sm:flex-row justify-between gap-2">
          <p>© {new Date().getFullYear()} MineAddonsNews — feito por ncmine</p>
          <p>Não afiliado oficialmente à Mojang ou Microsoft.</p>
        </div>
      </div>
    </footer>
  );
}

function Social({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-9 h-9 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground border border-border transition flex items-center justify-center"
    >
      {children}
    </a>
  );
}
