'use client'

import { Badge } from '@/components/ui/badge'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import type { Category } from '@/lib/types'

interface CategoryFilterProps {
  categories: Category[]
  selected: string | null
  onSelect: (categoryId: string | null) => void
}

export function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex gap-2 pb-2">
        <Badge
          variant={selected === null ? 'default' : 'outline'}
          className="cursor-pointer px-4 py-2 text-sm transition-all hover:bg-primary hover:text-primary-foreground"
          onClick={() => onSelect(null)}
        >
          Todos
        </Badge>
        {categories.map((category) => (
          <Badge
            key={category.id}
            variant={selected === category.id ? 'default' : 'outline'}
            className="cursor-pointer px-4 py-2 text-sm transition-all hover:opacity-80"
            style={selected === category.id ? {
              backgroundColor: category.color,
              color: '#fff',
              borderColor: category.color,
            } : {
              borderColor: `${category.color}60`,
              color: category.color,
            }}
            onClick={() => onSelect(category.id)}
          >
            {category.name}
          </Badge>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
