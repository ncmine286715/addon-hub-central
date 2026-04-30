'use client'

import { useState, useMemo } from 'react'
import { SearchBar } from '@/components/search-bar'
import { CategoryFilter } from '@/components/category-filter'
import { TagFilter } from '@/components/tag-filter'
import { AddonCard } from '@/components/addon-card'
import { Empty, EmptyTitle, EmptyDescription } from '@/components/ui/empty'
import { SearchX } from 'lucide-react'
import type { Addon, Category, Tag } from '@/lib/types'

interface AddonsContentProps {
  initialAddons: (Addon & { category?: Category; tags?: Tag[] })[]
  categories: Category[]
  tags: Tag[]
}

export function AddonsContent({ initialAddons, categories, tags }: AddonsContentProps) {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const filteredAddons = useMemo(() => {
    return initialAddons.filter(addon => {
      // Search filter
      if (search) {
        const searchLower = search.toLowerCase()
        const matchesSearch = 
          addon.title.toLowerCase().includes(searchLower) ||
          addon.description.toLowerCase().includes(searchLower) ||
          addon.author.toLowerCase().includes(searchLower)
        if (!matchesSearch) return false
      }

      // Category filter
      if (selectedCategory && addon.category_id !== selectedCategory) {
        return false
      }

      // Tags filter (all selected tags must be present)
      if (selectedTags.length > 0) {
        const addonTagIds = addon.tags?.map(t => t.id) || []
        const hasAllTags = selectedTags.every(tagId => addonTagIds.includes(tagId))
        if (!hasAllTags) return false
      }

      return true
    })
  }, [initialAddons, search, selectedCategory, selectedTags])

  const handleTagToggle = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    )
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="space-y-4 rounded-xl border border-border bg-card p-4 md:p-6">
        <SearchBar 
          value={search} 
          onChange={setSearch} 
          placeholder="Buscar por nome, descricao ou autor..."
        />
        
        {categories.length > 0 && (
          <div>
            <label className="mb-2 block text-sm font-medium text-muted-foreground">
              Categorias
            </label>
            <CategoryFilter 
              categories={categories}
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>
        )}

        {tags.length > 0 && (
          <div>
            <label className="mb-2 block text-sm font-medium text-muted-foreground">
              Tags
            </label>
            <TagFilter 
              tags={tags}
              selected={selectedTags}
              onToggle={handleTagToggle}
            />
          </div>
        )}
      </div>

      {/* Results */}
      {filteredAddons.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredAddons.map((addon) => (
            <AddonCard key={addon.id} addon={addon} />
          ))}
        </div>
      ) : (
        <Empty className="py-16">
          <SearchX className="h-12 w-12 text-muted-foreground" />
          <EmptyTitle>Nenhum addon encontrado</EmptyTitle>
          <EmptyDescription>
            Tente ajustar os filtros ou buscar por outro termo.
          </EmptyDescription>
        </Empty>
      )}
    </div>
  )
}
