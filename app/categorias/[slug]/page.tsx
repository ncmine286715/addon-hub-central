import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AddonCard } from '@/components/addon-card'
import { Badge } from '@/components/ui/badge'
import { createClient } from '@/lib/supabase/server'
import type { Metadata } from 'next'

export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getCategory(slug: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()
  return data
}

async function getCategoryAddons(categoryId: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('addons')
    .select('*, category:categories(*)')
    .eq('is_published', true)
    .eq('category_id', categoryId)
    .order('created_at', { ascending: false })
  return data || []
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategory(slug)
  
  if (!category) {
    return { title: 'Categoria não encontrada | MineAddonsNews' }
  }

  return {
    title: `${category.name} | MineAddonsNews`,
    description: category.description || `Addons de ${category.name} para Minecraft`,
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const category = await getCategory(slug)

  if (!category) {
    notFound()
  }

  const addons = await getCategoryAddons(category.id)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link 
              href="/categorias" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Todas as Categorias
            </Link>
          </div>

          {/* Header */}
          <div 
            className="mb-8 rounded-xl border p-6 md:p-8"
            style={{ 
              borderColor: `${category.color}40`,
              background: `linear-gradient(to right, ${category.color}10, transparent)`
            }}
          >
            <div className="flex items-center gap-4">
              {category.icon && (
                <span className="text-4xl">{category.icon}</span>
              )}
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold md:text-4xl">{category.name}</h1>
                  <Badge 
                    style={{ backgroundColor: category.color, color: '#fff' }}
                  >
                    {addons.length} addon{addons.length !== 1 ? 's' : ''}
                  </Badge>
                </div>
                {category.description && (
                  <p className="mt-2 text-muted-foreground">
                    {category.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Addons Grid */}
          {addons.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {addons.map((addon) => (
                <AddonCard key={addon.id} addon={addon} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center text-muted-foreground">
              Nenhum addon nesta categoria ainda.
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
