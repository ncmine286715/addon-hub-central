'use client'

import Link from 'next/link'
import { Search, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-primary-foreground">M</span>
          </div>
          <span className="text-xl font-bold tracking-tight">
            Mine<span className="text-primary">Addons</span>News
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link 
            href="/" 
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Inicio
          </Link>
          <Link 
            href="/addons" 
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Addons
          </Link>
          <Link 
            href="/categorias" 
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Categorias
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/buscar">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Search className="h-5 w-5" />
              <span className="sr-only">Buscar</span>
            </Button>
          </Link>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-muted-foreground hover:text-foreground md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="container mx-auto flex flex-col gap-2 px-4 py-4">
            <Link 
              href="/" 
              className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link 
              href="/addons" 
              className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Addons
            </Link>
            <Link 
              href="/categorias" 
              className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Categorias
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
