import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { AddonForm } from '../addon-form'

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

export default async function NewAddonPage() {
  const [categories, tags] = await Promise.all([
    getCategories(),
    getTags(),
  ])

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
        <h2 className="text-2xl font-bold">Novo Addon</h2>
        <p className="text-muted-foreground">Crie uma nova pagina de addon</p>
      </div>

      <AddonForm categories={categories} tags={tags} />
    </div>
  )
}
