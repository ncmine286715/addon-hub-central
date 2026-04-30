import Link from 'next/link'
import Image from 'next/image'
import { Download, Star, Tag } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import type { Addon, Category, Tag as TagType } from '@/lib/types'

interface AddonCardProps {
  addon: Addon & { category?: Category; tags?: TagType[] }
}

export function AddonCard({ addon }: AddonCardProps) {
  return (
    <Link href={`/addon/${addon.slug}`}>
      <Card className={`group overflow-hidden border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg ${addon.is_featured ? 'glow-green ring-1 ring-primary/30' : ''}`}>
        <div className="relative aspect-video overflow-hidden bg-secondary">
          {addon.image_url ? (
            <Image
              src={addon.image_url}
              alt={addon.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/20">
                <span className="text-2xl font-bold text-primary">M</span>
              </div>
            </div>
          )}
          {addon.is_featured && (
            <div className="absolute right-2 top-2">
              <Badge className="bg-primary text-primary-foreground">
                <Star className="mr-1 h-3 w-3" />
                Destaque
              </Badge>
            </div>
          )}
        </div>
        
        <CardContent className="p-4">
          <div className="mb-2 flex items-start justify-between gap-2">
            <h3 className="line-clamp-1 font-semibold text-card-foreground group-hover:text-primary">
              {addon.title}
            </h3>
            {addon.version && (
              <Badge variant="outline" className="shrink-0 text-xs">
                v{addon.version}
              </Badge>
            )}
          </div>
          
          <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
            {addon.description}
          </p>

          <div className="flex flex-wrap items-center gap-2">
            {addon.category && (
              <Badge 
                variant="secondary" 
                className="text-xs"
                style={{ 
                  backgroundColor: `${addon.category.color}20`,
                  color: addon.category.color,
                  borderColor: `${addon.category.color}40`
                }}
              >
                {addon.category.name}
              </Badge>
            )}
            {addon.tags?.slice(0, 2).map((tag) => (
              <Badge 
                key={tag.id} 
                variant="outline" 
                className="text-xs"
              >
                <Tag className="mr-1 h-2.5 w-2.5" />
                {tag.name}
              </Badge>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Download className="h-3.5 w-3.5" />
              {addon.downloads.toLocaleString('pt-BR')} downloads
            </span>
            {addon.minecraft_version && (
              <span>MC {addon.minecraft_version}</span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
