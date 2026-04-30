'use client'

import { Tag } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import type { Tag as TagType } from '@/lib/types'

interface TagFilterProps {
  tags: TagType[]
  selected: string[]
  onToggle: (tagId: string) => void
}

export function TagFilter({ tags, selected, onToggle }: TagFilterProps) {
  if (tags.length === 0) return null

  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex gap-2 pb-2">
        {tags.map((tag) => {
          const isSelected = selected.includes(tag.id)
          return (
            <Badge
              key={tag.id}
              variant={isSelected ? 'default' : 'outline'}
              className="cursor-pointer px-3 py-1.5 text-xs transition-all hover:opacity-80"
              style={isSelected ? {
                backgroundColor: tag.color,
                color: '#fff',
                borderColor: tag.color,
              } : {
                borderColor: `${tag.color}60`,
                color: tag.color,
              }}
              onClick={() => onToggle(tag.id)}
            >
              <Tag className="mr-1 h-3 w-3" />
              {tag.name}
            </Badge>
          )
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
