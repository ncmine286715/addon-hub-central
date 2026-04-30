'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Edit, Trash2, Save, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FieldGroup, Field, FieldLabel } from '@/components/ui/field'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Spinner } from '@/components/ui/spinner'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import type { Tag } from '@/lib/types'

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default function AdminTagsPage() {
  const router = useRouter()
  const [tags, setTags] = useState<Tag[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [editingTag, setEditingTag] = useState<Tag | null>(null)
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    color: '#6366F1',
  })

  useEffect(() => {
    loadTags()
  }, [])

  const loadTags = async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from('tags')
      .select('*')
      .order('name')
    setTags(data || [])
    setIsLoading(false)
  }

  const openDialog = (tag?: Tag) => {
    if (tag) {
      setEditingTag(tag)
      setFormData({
        name: tag.name,
        slug: tag.slug,
        color: tag.color,
      })
    } else {
      setEditingTag(null)
      setFormData({
        name: '',
        slug: '',
        color: '#6366F1',
      })
    }
    setIsDialogOpen(true)
  }

  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      slug: editingTag ? prev.slug : generateSlug(name),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    const supabase = createClient()

    try {
      if (editingTag) {
        const { error } = await supabase
          .from('tags')
          .update(formData)
          .eq('id', editingTag.id)
        if (error) throw error
        toast.success('Tag atualizada!')
      } else {
        const { error } = await supabase
          .from('tags')
          .insert(formData)
        if (error) throw error
        toast.success('Tag criada!')
      }

      setIsDialogOpen(false)
      loadTags()
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error('Erro ao salvar tag')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return

    const supabase = createClient()
    const { error } = await supabase
      .from('tags')
      .delete()
      .eq('id', deleteId)

    if (error) {
      toast.error('Erro ao deletar tag')
    } else {
      toast.success('Tag deletada!')
      loadTags()
      router.refresh()
    }

    setDeleteId(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Tags</h2>
          <p className="text-muted-foreground">Gerencie as tags para os addons</p>
        </div>
        <Button onClick={() => openDialog()} className="gap-2">
          <Plus className="h-4 w-4" />
          Nova Tag
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Spinner className="h-6 w-6" />
            </div>
          ) : tags.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => (
                <div
                  key={tag.id}
                  className="group flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-2"
                >
                  <Badge
                    style={{ backgroundColor: tag.color, color: '#fff' }}
                  >
                    {tag.name}
                  </Badge>
                  <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => openDialog(tag)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => setDeleteId(tag.id)}
                    >
                      <Trash2 className="h-3 w-3 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              Nenhuma tag criada ainda.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingTag ? 'Editar Tag' : 'Nova Tag'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel>Nome *</FieldLabel>
                <Input
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Ex: Aventura"
                  required
                />
              </Field>
              <Field>
                <FieldLabel>Slug</FieldLabel>
                <Input
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="aventura"
                  required
                />
              </Field>
              <Field>
                <FieldLabel>Cor</FieldLabel>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                    className="h-10 w-14 cursor-pointer p-1"
                  />
                  <Input
                    value={formData.color}
                    onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                    placeholder="#6366F1"
                    className="flex-1"
                  />
                </div>
              </Field>
            </FieldGroup>
            <div className="mt-6 flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)}>
                <X className="mr-2 h-4 w-4" />
                Cancelar
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? <Spinner className="mr-2 h-4 w-4" /> : <Save className="mr-2 h-4 w-4" />}
                Salvar
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Alert */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deletar tag?</AlertDialogTitle>
            <AlertDialogDescription>
              A tag sera removida de todos os addons. Esta acao nao pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Deletar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
