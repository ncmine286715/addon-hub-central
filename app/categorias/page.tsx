import Link from 'next/link'
import { Layers } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/server'

export const revalidate = 60

export const metadata = {
  title: 'Categorias | MineAddonsNews',
  description: 'Explore todas as categorias de addons de Minecraft.',
}

async function getCategories() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('categories')
    .select('*')
    .order('name')
  return data || []
}

async function getCategoryCounts() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('addons')
    .select('category_id')
    .eq('is_published', true)
  
  const counts: Record<string, number> = {}
  data?.forEach(addon => {
    if (addon.category_id) {
      counts[addon.category_id] = (counts[addon.category_id] || 0) + 1
    }
  })
  return counts
}

export default async function CategoriesPage() {
  const [categories, counts] = await Promise.all([
    getCategories(),
    getCategoryCounts(),
  ])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Layers className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold md:text-4xl">Categorias</h1>
            <p className="mt-2 text-muted-foreground">
              Explore addons organizados por categoria
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categorias/${category.slug}`}
              >
                <Card 
                  className="group h-full border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg"
                  style={{ borderTopColor: category.color, borderTopWidth: '3px' }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        {category.icon && (
                          <span className="mb-2 block text-3xl">{category.icon}</span>
                        )}
                        <h3 className="text-lg font-semibold group-hover:text-primary">
                          {category.name}
                        </h3>
                        {category.description && (
                          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                            {category.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-muted-foreground">
                      {counts[category.id] || 0} addon{(counts[category.id] || 0) !== 1 ? 's' : ''}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {categories.length === 0 && (
            <div className="py-16 text-center text-muted-foreground">
              Nenhuma categoria cadastrada ainda.
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
