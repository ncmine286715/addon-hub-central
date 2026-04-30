import { Suspense } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { createClient } from '@/lib/supabase/server'
import { AddonsContent } from './addons-content'

export const revalidate = 60

export const metadata = {
  title: 'Todos os Addons | MineAddonsNews',
  description: 'Explore todos os addons de Minecraft disponíveis. Filtros por categoria e tags.',
}

async function getAddons() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('addons')
    .select('*, category:categories(*)')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
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

async function getTags() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('tags')
    .select('*')
    .order('name')
  return data || []
}

async function getAddonTags() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('addon_tags')
    .select('*')
  return data || []
}

export default async function AddonsPage() {
  const [addons, categories, tags, addonTags] = await Promise.all([
    getAddons(),
    getCategories(),
    getTags(),
    getAddonTags(),
  ])

  // Map tags to addons
  const addonsWithTags = addons.map(addon => ({
    ...addon,
    tags: addonTags
      .filter(at => at.addon_id === addon.id)
      .map(at => tags.find(t => t.id === at.tag_id))
      .filter(Boolean)
  }))

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold md:text-4xl">Todos os Addons</h1>
            <p className="mt-2 text-muted-foreground">
              {addons.length} addons disponiveis
            </p>
          </div>

          <Suspense fallback={<div>Carregando...</div>}>
            <AddonsContent 
              initialAddons={addonsWithTags} 
              categories={categories}
              tags={tags}
            />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  )
}
