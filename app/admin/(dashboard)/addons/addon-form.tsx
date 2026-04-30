'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FieldGroup, Field, FieldLabel } from '@/components/ui/field'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Spinner } from '@/components/ui/spinner'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import type { Addon, Category, Tag } from '@/lib/types'

interface AddonFormProps {
  addon?: Addon
  categories: Category[]
  tags: Tag[]
  addonTags?: string[]
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function AddonForm({ addon, categories, tags, addonTags = [] }: AddonFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>(addonTags)

  const [formData, setFormData] = useState({
    title: addon?.title || '',
    slug: addon?.slug || '',
    description: addon?.description || '',
    content: addon?.content || '',
    image_url: addon?.image_url || '',
    download_url: addon?.download_url || '',
    version: addon?.version || '1.0.0',
    minecraft_version: addon?.minecraft_version || '',
    category_id: addon?.category_id || '',
    is_featured: addon?.is_featured || false,
    is_published: addon?.is_published ?? true,
  })

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: addon ? prev.slug : generateSlug(title),
    }))
  }

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev =>
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const supabase = createClient()

      const addonData = {
        ...formData,
        category_id: formData.category_id || null,
      }

      if (addon) {
        // Update
        const { error } = await supabase
          .from('addons')
          .update(addonData)
          .eq('id', addon.id)

        if (error) throw error

        // Update tags
        await supabase
          .from('addon_tags')
          .delete()
          .eq('addon_id', addon.id)

        if (selectedTags.length > 0) {
          await supabase
            .from('addon_tags')
            .insert(selectedTags.map(tag_id => ({ addon_id: addon.id, tag_id })))
        }

        toast.success('Addon atualizado com sucesso!')
      } else {
        // Create
        const { data, error } = await supabase
          .from('addons')
          .insert(addonData)
          .select()
          .single()

        if (error) throw error

        // Add tags
        if (selectedTags.length > 0 && data) {
          await supabase
            .from('addon_tags')
            .insert(selectedTags.map(tag_id => ({ addon_id: data.id, tag_id })))
        }

        toast.success('Addon criado com sucesso!')
      }

      router.push('/admin/addons')
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error('Erro ao salvar addon')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Informacoes Basicas</CardTitle>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field>
                  <FieldLabel>Titulo *</FieldLabel>
                  <Input
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Nome do addon"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel>Slug</FieldLabel>
                  <Input
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="nome-do-addon"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel>Descricao curta *</FieldLabel>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Uma breve descricao do addon..."
                    rows={3}
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel>Conteudo detalhado (HTML)</FieldLabel>
                  <Textarea
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="<p>Descricao detalhada...</p>"
                    rows={6}
                  />
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Midia e Download</CardTitle>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field>
                  <FieldLabel>URL da Imagem</FieldLabel>
                  <Input
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                    placeholder="https://exemplo.com/imagem.png"
                  />
                </Field>
                <Field>
                  <FieldLabel>URL de Download *</FieldLabel>
                  <Input
                    type="url"
                    value={formData.download_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, download_url: e.target.value }))}
                    placeholder="https://exemplo.com/addon.mcaddon"
                    required
                  />
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Publicacao</CardTitle>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <div className="flex items-center justify-between">
                  <FieldLabel className="mb-0">Publicado</FieldLabel>
                  <Switch
                    checked={formData.is_published}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_published: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <FieldLabel className="mb-0">Destaque</FieldLabel>
                  <Switch
                    checked={formData.is_featured}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_featured: checked }))}
                  />
                </div>
              </FieldGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Versoes</CardTitle>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field>
                  <FieldLabel>Versao do Addon</FieldLabel>
                  <Input
                    value={formData.version}
                    onChange={(e) => setFormData(prev => ({ ...prev, version: e.target.value }))}
                    placeholder="1.0.0"
                  />
                </Field>
                <Field>
                  <FieldLabel>Versao do Minecraft</FieldLabel>
                  <Input
                    value={formData.minecraft_version}
                    onChange={(e) => setFormData(prev => ({ ...prev, minecraft_version: e.target.value }))}
                    placeholder="1.20+"
                  />
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Categoria</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={formData.category_id}
                onValueChange={(value) => setFormData(prev => ({ ...prev, category_id: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.icon} {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag.id}
                    variant={selectedTags.includes(tag.id) ? 'default' : 'outline'}
                    className="cursor-pointer"
                    style={selectedTags.includes(tag.id) ? {
                      backgroundColor: tag.color,
                      color: '#fff',
                    } : {
                      borderColor: `${tag.color}60`,
                      color: tag.color,
                    }}
                    onClick={() => toggleTag(tag.id)}
                  >
                    {tag.name}
                  </Badge>
                ))}
                {tags.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    Nenhuma tag criada ainda.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading} className="gap-2">
          {isLoading ? <Spinner className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          {addon ? 'Salvar Alteracoes' : 'Criar Addon'}
        </Button>
      </div>
    </form>
  )
}
