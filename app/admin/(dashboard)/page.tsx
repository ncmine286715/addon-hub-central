import { Package, Layers, Tag, Download } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/server'

async function getStats() {
  const supabase = await createClient()
  
  const [addonsRes, categoriesRes, tagsRes, downloadsRes] = await Promise.all([
    supabase.from('addons').select('id', { count: 'exact' }),
    supabase.from('categories').select('id', { count: 'exact' }),
    supabase.from('tags').select('id', { count: 'exact' }),
    supabase.from('addons').select('downloads'),
  ])

  const totalDownloads = downloadsRes.data?.reduce((acc, addon) => acc + (addon.downloads || 0), 0) || 0

  return {
    addons: addonsRes.count || 0,
    categories: categoriesRes.count || 0,
    tags: tagsRes.count || 0,
    downloads: totalDownloads,
  }
}

async function getRecentAddons() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('addons')
    .select('*, category:categories(name)')
    .order('created_at', { ascending: false })
    .limit(5)
  return data || []
}

export default async function AdminDashboard() {
  const [stats, recentAddons] = await Promise.all([
    getStats(),
    getRecentAddons(),
  ])

  const statCards = [
    { label: 'Total Addons', value: stats.addons, icon: Package, color: 'text-primary' },
    { label: 'Categorias', value: stats.categories, icon: Layers, color: 'text-blue-500' },
    { label: 'Tags', value: stats.tags, icon: Tag, color: 'text-purple-500' },
    { label: 'Total Downloads', value: stats.downloads.toLocaleString('pt-BR'), icon: Download, color: 'text-green-500' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="text-muted-foreground">Visao geral do seu site</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Addons */}
      <Card>
        <CardHeader>
          <CardTitle>Addons Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          {recentAddons.length > 0 ? (
            <div className="space-y-3">
              {recentAddons.map((addon) => (
                <div 
                  key={addon.id} 
                  className="flex items-center justify-between rounded-lg border border-border p-3"
                >
                  <div>
                    <p className="font-medium">{addon.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {addon.category?.name || 'Sem categoria'} • v{addon.version}
                    </p>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    {addon.downloads.toLocaleString('pt-BR')} downloads
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              Nenhum addon cadastrado ainda.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
