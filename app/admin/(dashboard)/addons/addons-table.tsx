'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Edit, MoreHorizontal, Trash2, Eye, Star, StarOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
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
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import type { Addon, Category } from '@/lib/types'

interface AddonsTableProps {
  addons: (Addon & { category: Pick<Category, 'name' | 'color'> | null })[]
}

export function AddonsTable({ addons }: AddonsTableProps) {
  const router = useRouter()
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!deleteId) return

    setIsDeleting(true)
    const supabase = createClient()

    const { error } = await supabase
      .from('addons')
      .delete()
      .eq('id', deleteId)

    if (error) {
      toast.error('Erro ao deletar addon')
    } else {
      toast.success('Addon deletado com sucesso')
      router.refresh()
    }

    setIsDeleting(false)
    setDeleteId(null)
  }

  const toggleFeatured = async (id: string, currentValue: boolean) => {
    const supabase = createClient()
    const { error } = await supabase
      .from('addons')
      .update({ is_featured: !currentValue })
      .eq('id', id)

    if (error) {
      toast.error('Erro ao atualizar addon')
    } else {
      toast.success(currentValue ? 'Removido dos destaques' : 'Adicionado aos destaques')
      router.refresh()
    }
  }

  const togglePublished = async (id: string, currentValue: boolean) => {
    const supabase = createClient()
    const { error } = await supabase
      .from('addons')
      .update({ is_published: !currentValue })
      .eq('id', id)

    if (error) {
      toast.error('Erro ao atualizar addon')
    } else {
      toast.success(currentValue ? 'Addon despublicado' : 'Addon publicado')
      router.refresh()
    }
  }

  if (addons.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center">
        <p className="text-muted-foreground">Nenhum addon cadastrado ainda.</p>
        <Link href="/admin/addons/novo">
          <Button className="mt-4">Criar primeiro addon</Button>
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titulo</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Versao</TableHead>
              <TableHead>Downloads</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {addons.map((addon) => (
              <TableRow key={addon.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {addon.is_featured && (
                      <Star className="h-4 w-4 fill-primary text-primary" />
                    )}
                    <span className="font-medium">{addon.title}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {addon.category ? (
                    <Badge 
                      variant="outline"
                      style={{ 
                        borderColor: `${addon.category.color}60`,
                        color: addon.category.color,
                      }}
                    >
                      {addon.category.name}
                    </Badge>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>v{addon.version}</TableCell>
                <TableCell>{addon.downloads.toLocaleString('pt-BR')}</TableCell>
                <TableCell>
                  <Badge variant={addon.is_published ? 'default' : 'secondary'}>
                    {addon.is_published ? 'Publicado' : 'Rascunho'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/addon/${addon.slug}`} target="_blank">
                          <Eye className="mr-2 h-4 w-4" />
                          Ver no site
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/addons/${addon.id}`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => toggleFeatured(addon.id, addon.is_featured)}
                      >
                        {addon.is_featured ? (
                          <>
                            <StarOff className="mr-2 h-4 w-4" />
                            Remover destaque
                          </>
                        ) : (
                          <>
                            <Star className="mr-2 h-4 w-4" />
                            Destacar
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => togglePublished(addon.id, addon.is_published)}
                      >
                        {addon.is_published ? 'Despublicar' : 'Publicar'}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => setDeleteId(addon.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Deletar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acao nao pode ser desfeita. O addon sera permanentemente deletado.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? 'Deletando...' : 'Deletar'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
