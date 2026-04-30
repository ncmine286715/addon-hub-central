import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Calendar, Download, ExternalLink, Star, Tag, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { createClient } from '@/lib/supabase/server'
import type { Metadata } from 'next'

export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getAddon(slug: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('addons')
    .select('*, category:categories(*)')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()
  return data
}

async function getAddonTags(addonId: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('addon_tags')
    .select('*, tag:tags(*)')
    .eq('addon_id', addonId)
  return data?.map(at => at.tag).filter(Boolean) || []
}

async function getRelatedAddons(categoryId: string | null, currentId: string) {
  if (!categoryId) return []
  const supabase = await createClient()
  const { data } = await supabase
    .from('addons')
    .select('*, category:categories(*)')
    .eq('is_published', true)
    .eq('category_id', categoryId)
    .neq('id', currentId)
    .limit(4)
  return data || []
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const addon = await getAddon(slug)
  
  if (!addon) {
    return { title: 'Addon não encontrado | MineAddonsNews' }
  }

  return {
    title: `${addon.title} | MineAddonsNews`,
    description: addon.description,
    openGraph: {
      title: addon.title,
      description: addon.description,
      images: addon.image_url ? [addon.image_url] : [],
    },
  }
}

export default async function AddonPage({ params }: PageProps) {
  const { slug } = await params
  const addon = await getAddon(slug)

  if (!addon) {
    notFound()
  }

  const [tags, relatedAddons] = await Promise.all([
    getAddonTags(addon.id),
    getRelatedAddons(addon.category_id, addon.id),
  ])

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link 
              href="/addons" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para Addons
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image */}
              <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-secondary">
                {addon.image_url ? (
                  <Image
                    src={addon.image_url}
                    alt={addon.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-primary/20">
                      <span className="text-4xl font-bold text-primary">M</span>
                    </div>
                  </div>
                )}
                {addon.is_featured && (
                  <div className="absolute right-4 top-4">
                    <Badge className="bg-primary text-primary-foreground shadow-lg">
                      <Star className="mr-1 h-3 w-3" />
                      Destaque
                    </Badge>
                  </div>
                )}
              </div>

              {/* Title & Info */}
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  {addon.category && (
                    <Link href={`/categorias/${addon.category.slug}`}>
                      <Badge 
                        className="text-sm"
                        style={{ 
                          backgroundColor: `${addon.category.color}20`,
                          color: addon.category.color,
                          borderColor: `${addon.category.color}40`
                        }}
                      >
                        {addon.category.name}
                      </Badge>
                    </Link>
                  )}
                  <Badge variant="outline">v{addon.version}</Badge>
                  {addon.minecraft_version && (
                    <Badge variant="secondary">MC {addon.minecraft_version}</Badge>
                  )}
                </div>
                
                <h1 className="text-3xl font-bold md:text-4xl">{addon.title}</h1>
                
                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {addon.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(addon.created_at)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    {addon.downloads.toLocaleString('pt-BR')} downloads
                  </span>
                </div>
              </div>

              {/* Tags */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge 
                      key={tag.id}
                      variant="outline"
                      style={{ 
                        borderColor: `${tag.color}60`,
                        color: tag.color,
                      }}
                    >
                      <Tag className="mr-1 h-3 w-3" />
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Descricao</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
                    {addon.description}
                  </p>
                </CardContent>
              </Card>

              {/* Content */}
              {addon.content && (
                <Card>
                  <CardHeader>
                    <CardTitle>Detalhes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div 
                      className="prose prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: addon.content }}
                    />
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Download Card */}
              <Card className="sticky top-24 border-primary/30 bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5 text-primary" />
                    Download
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Versao</span>
                      <span className="font-medium">{addon.version}</span>
                    </div>
                    {addon.minecraft_version && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Minecraft</span>
                        <span className="font-medium">{addon.minecraft_version}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Downloads</span>
                      <span className="font-medium">{addon.downloads.toLocaleString('pt-BR')}</span>
                    </div>
                  </div>
                  
                  <a 
                    href={addon.download_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full gap-2" size="lg">
                      <Download className="h-5 w-5" />
                      Baixar Addon
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </a>

                  <p className="text-center text-xs text-muted-foreground">
                    Download seguro e verificado
                  </p>
                </CardContent>
              </Card>

              {/* Related Addons */}
              {relatedAddons.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Addons Relacionados</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {relatedAddons.map((related) => (
                      <Link
                        key={related.id}
                        href={`/addon/${related.slug}`}
                        className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-secondary"
                      >
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-secondary">
                          {related.image_url ? (
                            <Image
                              src={related.image_url}
                              alt={related.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center">
                              <span className="text-xs font-bold text-primary">M</span>
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">{related.title}</p>
                          <p className="text-xs text-muted-foreground">v{related.version}</p>
                        </div>
                      </Link>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
