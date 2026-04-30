'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  Package, 
  Layers, 
  Tag,
  ExternalLink,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: Home },
  { href: '/admin/addons', label: 'Addons', icon: Package },
  { href: '/admin/categorias', label: 'Categorias', icon: Layers },
  { href: '/admin/tags', label: 'Tags', icon: Tag },
]

export function AdminSidebarMobile() {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col bg-card">
      <div className="flex h-16 items-center border-b border-border px-6">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">M</span>
          </div>
          <span className="font-semibold">Admin</span>
        </Link>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/admin' && pathname.startsWith(item.href))
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="mt-6 border-t border-border pt-4">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <ExternalLink className="h-4 w-4" />
            Ver Site
          </Link>
        </div>
      </nav>
    </div>
  )
}
