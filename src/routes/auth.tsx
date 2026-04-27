import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Pickaxe, LogIn } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Entrar — Painel admin | MineAddonsNews" }] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/admin" },
        });
        if (error) throw error;
        toast.success("Conta criada! Verifique seu email.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Bem-vindo!");
        navigate({ to: "/admin" });
      }
    } catch (err: any) {
      toast.error(err.message ?? "Erro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <div className="text-center mb-8">
        <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-neon items-center justify-center shadow-neon mb-4">
          <Pickaxe className="w-7 h-7 text-primary-foreground" />
        </div>
        <h1 className="font-pixel text-xl text-primary text-glow">PAINEL ADMIN</h1>
        <p className="text-sm text-muted-foreground mt-2">Entre para gerenciar addons</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 p-6 rounded-2xl bg-gradient-card border border-border">
        <div>
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 px-4 py-3 rounded-lg bg-surface-elevated border border-border focus:border-primary outline-none transition"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Senha</label>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 px-4 py-3 rounded-lg bg-surface-elevated border border-border focus:border-primary outline-none transition"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-primary text-primary-foreground font-bold shadow-neon hover:opacity-90 transition disabled:opacity-50"
        >
          <LogIn className="w-4 h-4" />
          {loading ? "..." : mode === "login" ? "Entrar" : "Criar conta"}
        </button>
        <button
          type="button"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="w-full text-xs text-muted-foreground hover:text-primary transition"
        >
          {mode === "login" ? "Não tem conta? Criar uma" : "Já tem conta? Entrar"}
        </button>
      </form>

      <p className="text-[11px] text-muted-foreground text-center mt-6">
        Após criar a conta, peça pro admin do site liberar suas permissões.
      </p>
    </div>
  );
}
