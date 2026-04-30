import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { AddonForm } from '../addon-form'

interface PageProps {
  params: Promise<{ id: string }>
}

async function getAddon(id: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('addons')
    .select('*')
    .eq('id', id)
    .single()
  return data
}

async function getAddonTags(addonId: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('addon_tags')
    .select('tag_id')
    .eq('addon_id', addonId)
  return data?.map(at => at.tag_id) || []
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

export default async function EditAddonPage({ params }: PageProps) {
  const { id } = await params
  const [addon, addonTags, categories, tags] = await Promise.all([
    getAddon(id),
    getAddonTags(id),
    getCategories(),
    getTags(),
  ])

  if (!addon) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <Link 
          href="/admin/addons" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Link>
        <h2 className="text-2xl font-bold">Editar Addon</h2>
        <p className="text-muted-foreground">Editando: {addon.title}</p>
      </div>

      <AddonForm 
        addon={addon} 
        categories={categories} 
        tags={tags}
        addonTags={addonTags}
      />
    </div>
  )
}
