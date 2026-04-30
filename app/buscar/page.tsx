'use client'

import { useState, useEffect } from 'react'
import { Search, SearchX } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { SearchBar } from '@/components/search-bar'
import { AddonCard } from '@/components/addon-card'
import { Empty } from '@/components/ui/empty'
import { Spinner } from '@/components/ui/spinner'
import { createClient } from '@/lib/supabase/client'
import type { Addon, Category } from '@/lib/types'

export default function SearchPage() {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState<(Addon & { category?: Category })[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  useEffect(() => {
    const searchAddons = async () => {
      if (!search.trim()) {
        setResults([])
        setHasSearched(false)
        return
      }

      setIsLoading(true)
      setHasSearched(true)

      const supabase = createClient()
      const { data } = await supabase
        .from('addons')
        .select('*, category:categories(*)')
        .eq('is_published', true)
        .or(`title.ilike.%${search}%,description.ilike.%${search}%,author.ilike.%${search}%`)
        .order('downloads', { ascending: false })
        .limit(20)

      setResults(data || [])
      setIsLoading(false)
    }

    const debounce = setTimeout(searchAddons, 300)
    return () => clearTimeout(debounce)
  }, [search])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-8">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Search className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold md:text-4xl">Buscar Addons</h1>
            <p className="mt-2 text-muted-foreground">
              Encontre addons por nome, descricao ou autor
            </p>
          </div>

          <div className="mx-auto max-w-xl mb-8">
            <SearchBar 
              value={search}
              onChange={setSearch}
              placeholder="Digite para buscar..."
            />
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Spinner className="h-8 w-8 text-primary" />
            </div>
          ) : hasSearched ? (
            results.length > 0 ? (
              <div>
                <p className="mb-6 text-center text-muted-foreground">
                  {results.length} resultado{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
                </p>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {results.map((addon) => (
                    <AddonCard key={addon.id} addon={addon} />
                  ))}
                </div>
              </div>
            ) : (
              <Empty className="py-16">
                <SearchX className="h-12 w-12 text-muted-foreground" />
                <Empty.Title>Nenhum resultado</Empty.Title>
                <Empty.Description>
                  Nao encontramos addons para &quot;{search}&quot;. Tente outro termo.
                </Empty.Description>
              </Empty>
            )
          ) : (
            <div className="py-16 text-center text-muted-foreground">
              Digite algo para comecar a buscar
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
