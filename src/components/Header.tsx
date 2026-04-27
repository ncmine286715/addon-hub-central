import { Link } from "@tanstack/react-router";
import { Pickaxe, Search } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-neon flex items-center justify-center shadow-neon group-hover:scale-105 transition">
            <Pickaxe className="w-5 h-5 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <div className="leading-tight">
            <p className="font-pixel text-[11px] sm:text-xs text-primary text-glow">MineAddons</p>
            <p className="font-pixel text-[9px] sm:text-[10px] text-muted-foreground">.NEWS</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/">Início</NavLink>
          <NavLink to="/addons">Addons</NavLink>
          <NavLink to="/categories">Categorias</NavLink>
          <NavLink to="/tutorial">Como Instalar</NavLink>
        </nav>

        <Link
          to="/addons"
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/60 hover:bg-muted border border-border text-sm text-muted-foreground hover:text-foreground transition"
        >
          <Search className="w-4 h-4" />
          <span className="hidden sm:inline">Buscar addon...</span>
        </Link>
      </div>
    </header>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition"
      activeProps={{ className: "px-3 py-2 text-sm font-semibold text-primary" }}
      activeOptions={{ exact: to === "/" }}
    >
      {children}
    </Link>
  );
}
