import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">M</span>
              </div>
              <span className="text-lg font-bold">
                Mine<span className="text-primary">Addons</span>News
              </span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Os melhores addons de Minecraft em um so lugar. 
              Downloads seguros e atualizados.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">Links</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                Inicio
              </Link>
              <Link href="/addons" className="text-sm text-muted-foreground hover:text-foreground">
                Todos os Addons
              </Link>
              <Link href="/categorias" className="text-sm text-muted-foreground hover:text-foreground">
                Categorias
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">Contato</h3>
            <p className="text-sm text-muted-foreground">
              Criado por <span className="font-medium text-primary">ncmine</span>
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            {new Date().getFullYear()} MineAddonsNews. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
