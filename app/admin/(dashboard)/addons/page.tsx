import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/server'
import { AddonsTable } from './addons-table'

export const revalidate = 0

async function getAddons() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('addons')
    .select('*, category:categories(name, color)')
    .order('created_at', { ascending: false })
  return data || []
}

export default async function AdminAddonsPage() {
  const addons = await getAddons()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Addons</h2>
          <p className="text-muted-foreground">Gerencie todos os addons do site</p>
        </div>
        <Link href="/admin/addons/novo">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Addon
          </Button>
        </Link>
      </div>

      <AddonsTable addons={addons} />
    </div>
  )
}
