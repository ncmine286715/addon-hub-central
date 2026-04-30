'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, LogIn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FieldGroup, Field, FieldLabel } from '@/components/ui/field'
import { Spinner } from '@/components/ui/spinner'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const supabase = createClient()
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        toast.error('Erro ao fazer login', {
          description: error.message,
        })
        return
      }

      // Check if user is admin
      const { data: adminData } = await supabase
        .from('admins')
        .select('*')
        .eq('id', data.user.id)
        .single()

      if (!adminData) {
        await supabase.auth.signOut()
        toast.error('Acesso negado', {
          description: 'Voce nao tem permissao de administrador.',
        })
        return
      }

      toast.success('Login realizado com sucesso!')
      router.push('/admin')
      router.refresh()
    } catch {
      toast.error('Erro inesperado', {
        description: 'Tente novamente mais tarde.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Link 
          href="/" 
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar ao site
        </Link>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <span className="text-lg font-bold text-primary-foreground">M</span>
            </div>
            <CardTitle className="text-2xl">Painel Admin</CardTitle>
            <CardDescription>
              Faca login para acessar o painel de administracao
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <FieldGroup>
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </Field>
                <Field>
                  <FieldLabel>Senha</FieldLabel>
                  <Input
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </Field>
              </FieldGroup>

              <Button 
                type="submit" 
                className="mt-6 w-full gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Spinner className="h-4 w-4" />
                ) : (
                  <LogIn className="h-4 w-4" />
                )}
                Entrar
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          MineAddonsNews Admin Panel
        </p>
      </div>
    </div>
  )
}
