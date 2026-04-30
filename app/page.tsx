import Link from 'next/link'
import { ArrowRight, Download, Layers, Search, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AddonCard } from '@/components/addon-card'
import { SocialPopup } from '@/components/social-popup'
import { createClient } from '@/lib/supabase/server'

export const revalidate = 60

async function getFeaturedAddons() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('addons')
    .select('*, category:categories(*)')
    .eq('is_published', true)
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
    .limit(4)
  return data || []
}

async function getLatestAddons() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('addons')
    .select('*, category:categories(*)')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(8)
  return data || []
}

async function getCategories() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('categories')
    .select('*')
    .order('name')
  return data || []
}

export default async function HomePage() {
  const [featuredAddons, latestAddons, categories] = await Promise.all([
    getFeaturedAddons(),
    getLatestAddons(),
    getCategories(),
  ])

  return (
    <div className="flex min-h-screen flex-col">
      <SocialPopup />
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary/5 to-background py-20 md:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.65_0.2_145_/_0.1),transparent_50%)]" />
          <div className="container relative mx-auto px-4 text-center">
            <div className="mx-auto max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
                <Sparkles className="h-4 w-4" />
                Os melhores addons de Minecraft
              </div>
              <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight md:text-6xl">
                Descubra Addons
                <span className="text-primary"> Incriveis</span>
              </h1>
              <p className="mb-8 text-lg text-muted-foreground md:text-xl">
                Explore nossa colecao de addons selecionados para Minecraft. 
                Downloads seguros, categorias organizadas e atualizacoes constantes.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/addons">
                  <Button size="lg" className="gap-2 px-8">
                    Explorar Addons
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/buscar">
                  <Button size="lg" variant="outline" className="gap-2 px-8">
                    <Search className="h-4 w-4" />
                    Buscar
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-b border-border bg-card py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary md:text-3xl">
                  {latestAddons.length}+
                </div>
                <div className="text-xs text-muted-foreground md:text-sm">Addons</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary md:text-3xl">
                  {categories.length}
                </div>
                <div className="text-xs text-muted-foreground md:text-sm">Categorias</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary md:text-3xl">100%</div>
                <div className="text-xs text-muted-foreground md:text-sm">Gratuito</div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Addons */}
        {featuredAddons.length > 0 && (
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold md:text-3xl">
                    <Sparkles className="mr-2 inline h-6 w-6 text-primary" />
                    Em Destaque
                  </h2>
                  <p className="mt-1 text-muted-foreground">
                    Addons selecionados especialmente para voce
                  </p>
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {featuredAddons.map((addon) => (
                  <AddonCard key={addon.id} addon={addon} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Latest Addons */}
        <section className="bg-card py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold md:text-3xl">
                  <Download className="mr-2 inline h-6 w-6 text-primary" />
                  Ultimos Addons
                </h2>
                <p className="mt-1 text-muted-foreground">
                  Os addons mais recentes adicionados
                </p>
              </div>
              <Link href="/addons">
                <Button variant="ghost" className="gap-2">
                  Ver Todos
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {latestAddons.map((addon) => (
                <AddonCard key={addon.id} addon={addon} />
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        {categories.length > 0 && (
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold md:text-3xl">
                  <Layers className="mr-2 inline h-6 w-6 text-primary" />
                  Categorias
                </h2>
                <p className="mt-1 text-muted-foreground">
                  Encontre addons por categoria
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/categorias/${category.slug}`}
                    className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
                    style={{ borderLeftColor: category.color, borderLeftWidth: '4px' }}
                  >
                    <div className="flex items-center gap-3">
                      {category.icon && (
                        <span className="text-2xl">{category.icon}</span>
                      )}
                      <div>
                        <h3 className="font-semibold group-hover:text-primary">
                          {category.name}
                        </h3>
                        {category.description && (
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {category.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
