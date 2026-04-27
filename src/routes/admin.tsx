import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LogOut, Plus, Pencil, Trash2, Star, Eye, EyeOff, Tag as TagIcon, ShieldAlert } from "lucide-react";
import { slugify } from "@/lib/format";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Painel Admin — MineAddonsNews" }] }),
  component: AdminPage,
});

type Category = { id: string; name: string; slug: string; icon: string | null; sort_order: number };
type Addon = {
  id: string; slug: string; name: string; short_description: string; long_description: string | null;
  image_url: string; gallery: string[]; terabox_url: string; tags: string[];
  mc_version: string | null; author: string | null; category_id: string | null;
  is_featured: boolean; is_published: boolean; views: number; downloads: number;
};

function AdminPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [tab, setTab] = useState<"addons" | "categories">("addons");
  const [addons, setAddons] = useState<Addon[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editing, setEditing] = useState<Partial<Addon> | null>(null);
  const [editingCat, setEditingCat] = useState<Partial<Category> | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session) navigate({ to: "/auth" });
    });
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        navigate({ to: "/auth" });
        return;
      }
      setUser(data.session.user);
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").maybeSingle();
      setIsAdmin(!!data);
    })();
  }, [user]);

  useEffect(() => {
    if (!isAdmin) return;
    refresh();
  }, [isAdmin]);

  const refresh = async () => {
    const [a, c] = await Promise.all([
      supabase.from("addons").select("*").order("created_at", { ascending: false }),
      supabase.from("categories").select("*").order("sort_order"),
    ]);
    setAddons((a.data ?? []) as Addon[]);
    setCategories((c.data ?? []) as Category[]);
  };

  const logout = async () => { await supabase.auth.signOut(); navigate({ to: "/" }); };

  if (!user) return <div className="container mx-auto px-4 py-20 text-center text-muted-foreground">Carregando...</div>;

  if (isAdmin === false) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-md text-center">
        <ShieldAlert className="w-12 h-12 text-destructive mx-auto mb-4" />
        <h1 className="text-xl font-bold mb-2">Sem permissão</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Sua conta <span className="text-foreground font-semibold">{user.email}</span> não é admin.
          <br /><br />
          Pra liberar, abra o painel do banco de dados e adicione um registro na tabela <code className="px-1.5 py-0.5 rounded bg-muted text-primary">user_roles</code>:
          <br />user_id = <code className="text-primary">{user.id}</code><br />role = <code className="text-primary">admin</code>
        </p>
        <button onClick={logout} className="text-primary hover:underline">Sair</button>
      </div>
    );
  }

  if (isAdmin === null) return <div className="container mx-auto px-4 py-20 text-center text-muted-foreground">Verificando permissões...</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="font-pixel text-xl sm:text-2xl text-primary text-glow">PAINEL</h1>
          <p className="text-xs text-muted-foreground mt-1">{user.email}</p>
        </div>
        <button onClick={logout} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted hover:bg-accent text-sm transition">
          <LogOut className="w-4 h-4" /> Sair
        </button>
      </div>

      <div className="flex gap-1 mb-6 p-1 rounded-xl bg-muted w-fit">
        <TabButton active={tab === "addons"} onClick={() => setTab("addons")}>Addons ({addons.length})</TabButton>
        <TabButton active={tab === "categories"} onClick={() => setTab("categories")}>Categorias ({categories.length})</TabButton>
      </div>

      {tab === "addons" && (
        <>
          <button
            onClick={() => setEditing({ name: "", short_description: "", image_url: "", terabox_url: "", tags: [], gallery: [], is_published: true, is_featured: false })}
            className="mb-5 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold shadow-neon hover:opacity-90 transition"
          >
            <Plus className="w-4 h-4" /> Novo addon
          </button>
          <div className="space-y-2">
            {addons.map((a) => (
              <div key={a.id} className="flex items-center gap-3 p-3 rounded-xl bg-gradient-card border border-border">
                <img src={a.image_url} alt="" className="w-16 h-12 rounded-lg object-cover bg-surface flex-shrink-0" onError={(e) => ((e.currentTarget as HTMLImageElement).style.opacity = "0.2")} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold truncate">{a.name}</p>
                    {a.is_featured && <Star className="w-3.5 h-3.5 text-gold fill-gold flex-shrink-0" />}
                    {!a.is_published && <EyeOff className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{a.views} views · {a.downloads} downloads</p>
                </div>
                <button onClick={() => setEditing(a)} className="p-2 hover:bg-muted rounded-lg" aria-label="Editar"><Pencil className="w-4 h-4" /></button>
                <button
                  onClick={async () => {
                    if (!confirm(`Excluir "${a.name}"?`)) return;
                    const { error } = await supabase.from("addons").delete().eq("id", a.id);
                    if (error) toast.error(error.message); else { toast.success("Excluído"); refresh(); }
                  }}
                  className="p-2 hover:bg-destructive/20 hover:text-destructive rounded-lg" aria-label="Excluir"
                ><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
            {addons.length === 0 && <p className="text-center text-muted-foreground py-12">Nenhum addon ainda. Crie o primeiro!</p>}
          </div>
        </>
      )}

      {tab === "categories" && (
        <>
          <button
            onClick={() => setEditingCat({ name: "", icon: "", sort_order: categories.length })}
            className="mb-5 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold shadow-neon hover:opacity-90 transition"
          >
            <Plus className="w-4 h-4" /> Nova categoria
          </button>
          <div className="space-y-2">
            {categories.map((c) => (
              <div key={c.id} className="flex items-center gap-3 p-3 rounded-xl bg-gradient-card border border-border">
                <span className="text-2xl">{c.icon || "📦"}</span>
                <div className="flex-1">
                  <p className="font-semibold">{c.name}</p>
                  <p className="text-xs text-muted-foreground">/{c.slug}</p>
                </div>
                <button onClick={() => setEditingCat(c)} className="p-2 hover:bg-muted rounded-lg"><Pencil className="w-4 h-4" /></button>
                <button
                  onClick={async () => {
                    if (!confirm(`Excluir "${c.name}"?`)) return;
                    const { error } = await supabase.from("categories").delete().eq("id", c.id);
                    if (error) toast.error(error.message); else { toast.success("Excluído"); refresh(); }
                  }}
                  className="p-2 hover:bg-destructive/20 hover:text-destructive rounded-lg"
                ><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
            {categories.length === 0 && <p className="text-center text-muted-foreground py-12">Crie sua primeira categoria.</p>}
          </div>
        </>
      )}

      {editing && <AddonForm draft={editing} categories={categories} onClose={() => setEditing(null)} onSaved={() => { setEditing(null); refresh(); }} />}
      {editingCat && <CategoryForm draft={editingCat} onClose={() => setEditingCat(null)} onSaved={() => { setEditingCat(null); refresh(); }} />}
    </div>
  );
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={"px-4 py-2 rounded-lg text-sm font-semibold transition " + (active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")}
    >{children}</button>
  );
}

function AddonForm({ draft, categories, onClose, onSaved }: { draft: Partial<Addon>; categories: Category[]; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState<Partial<Addon>>({ ...draft, gallery: draft.gallery ?? [], tags: draft.tags ?? [] });
  const [tagInput, setTagInput] = useState("");
  const [galleryInput, setGalleryInput] = useState("");
  const [saving, setSaving] = useState(false);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload: any = {
      name: form.name,
      slug: form.slug || slugify(form.name || ""),
      short_description: form.short_description,
      long_description: form.long_description || null,
      image_url: form.image_url,
      gallery: form.gallery,
      terabox_url: form.terabox_url,
      category_id: form.category_id || null,
      tags: form.tags,
      mc_version: form.mc_version || null,
      author: form.author || null,
      is_featured: !!form.is_featured,
      is_published: form.is_published !== false,
    };
    const res = form.id
      ? await supabase.from("addons").update(payload).eq("id", form.id)
      : await supabase.from("addons").insert(payload);
    setSaving(false);
    if (res.error) toast.error(res.error.message);
    else { toast.success("Salvo!"); onSaved(); }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto" onClick={onClose}>
      <form onSubmit={save} onClick={(e) => e.stopPropagation()} className="w-full max-w-2xl my-8 bg-gradient-card border border-primary/40 rounded-2xl p-6 shadow-glow space-y-4">
        <h2 className="font-bold text-lg">{form.id ? "Editar addon" : "Novo addon"}</h2>

        <Field label="Nome *"><input required value={form.name ?? ""} onChange={(e) => setForm({ ...form, name: e.target.value, slug: form.id ? form.slug : slugify(e.target.value) })} className={inputCls} /></Field>
        <Field label="Slug (URL)"><input value={form.slug ?? ""} onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })} className={inputCls} placeholder="auto-gerado" /></Field>
        <Field label="Descrição curta *"><input required maxLength={160} value={form.short_description ?? ""} onChange={(e) => setForm({ ...form, short_description: e.target.value })} className={inputCls} /></Field>
        <Field label="Descrição longa"><textarea rows={4} value={form.long_description ?? ""} onChange={(e) => setForm({ ...form, long_description: e.target.value })} className={inputCls + " resize-y"} /></Field>
        <Field label="Imagem principal (URL) *"><input required type="url" value={form.image_url ?? ""} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className={inputCls} placeholder="https://..." /></Field>

        <Field label="Galeria (URLs adicionais)">
          <div className="flex gap-2">
            <input value={galleryInput} onChange={(e) => setGalleryInput(e.target.value)} className={inputCls} placeholder="https://..." />
            <button type="button" onClick={() => { if (galleryInput) { setForm({ ...form, gallery: [...(form.gallery ?? []), galleryInput] }); setGalleryInput(""); } }} className="px-3 rounded-lg bg-primary text-primary-foreground font-semibold">+</button>
          </div>
          {(form.gallery ?? []).length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {(form.gallery ?? []).map((g, i) => (
                <span key={i} className="flex items-center gap-1 px-2 py-1 rounded bg-muted text-xs">
                  img {i + 1}
                  <button type="button" onClick={() => setForm({ ...form, gallery: form.gallery!.filter((_, x) => x !== i) })} className="hover:text-destructive">×</button>
                </span>
              ))}
            </div>
          )}
        </Field>

        <Field label="Link do Terabox *"><input required type="url" value={form.terabox_url ?? ""} onChange={(e) => setForm({ ...form, terabox_url: e.target.value })} className={inputCls} placeholder="https://terabox.com/s/..." /></Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Categoria">
            <select value={form.category_id ?? ""} onChange={(e) => setForm({ ...form, category_id: e.target.value || null })} className={inputCls}>
              <option value="">— nenhuma —</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </Field>
          <Field label="Versão MC"><input value={form.mc_version ?? ""} onChange={(e) => setForm({ ...form, mc_version: e.target.value })} className={inputCls} placeholder="1.21.x" /></Field>
        </div>

        <Field label="Autor"><input value={form.author ?? ""} onChange={(e) => setForm({ ...form, author: e.target.value })} className={inputCls} /></Field>

        <Field label="Tags">
          <div className="flex gap-2">
            <input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); if (tagInput) { setForm({ ...form, tags: [...(form.tags ?? []), tagInput] }); setTagInput(""); } } }} className={inputCls} placeholder="enter pra adicionar" />
          </div>
          {(form.tags ?? []).length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {(form.tags ?? []).map((t, i) => (
                <span key={i} className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/15 text-primary text-xs">
                  <TagIcon className="w-3 h-3" />{t}
                  <button type="button" onClick={() => setForm({ ...form, tags: form.tags!.filter((_, x) => x !== i) })}>×</button>
                </span>
              ))}
            </div>
          )}
        </Field>

        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} /> Em destaque</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.is_published !== false} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} /> Publicado</label>
        </div>

        <div className="flex gap-2 pt-3">
          <button type="button" onClick={onClose} className="flex-1 py-3 rounded-lg bg-muted hover:bg-accent font-semibold transition">Cancelar</button>
          <button type="submit" disabled={saving} className="flex-1 py-3 rounded-lg bg-primary text-primary-foreground font-bold shadow-neon hover:opacity-90 transition disabled:opacity-50">{saving ? "..." : "Salvar"}</button>
        </div>
      </form>
    </div>
  );
}

function CategoryForm({ draft, onClose, onSaved }: { draft: Partial<Category>; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState<Partial<Category>>(draft);
  const [saving, setSaving] = useState(false);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload: any = { name: form.name, slug: form.slug || slugify(form.name || ""), icon: form.icon || null, sort_order: form.sort_order ?? 0 };
    const res = form.id ? await supabase.from("categories").update(payload).eq("id", form.id) : await supabase.from("categories").insert(payload);
    setSaving(false);
    if (res.error) toast.error(res.error.message); else { toast.success("Salvo!"); onSaved(); }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <form onSubmit={save} onClick={(e) => e.stopPropagation()} className="w-full max-w-md bg-gradient-card border border-primary/40 rounded-2xl p-6 shadow-glow space-y-4">
        <h2 className="font-bold text-lg">{form.id ? "Editar categoria" : "Nova categoria"}</h2>
        <Field label="Nome *"><input required value={form.name ?? ""} onChange={(e) => setForm({ ...form, name: e.target.value, slug: form.id ? form.slug : slugify(e.target.value) })} className={inputCls} /></Field>
        <Field label="Ícone (emoji)"><input value={form.icon ?? ""} onChange={(e) => setForm({ ...form, icon: e.target.value })} className={inputCls} placeholder="🐉" /></Field>
        <Field label="Ordem"><input type="number" value={form.sort_order ?? 0} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} className={inputCls} /></Field>
        <div className="flex gap-2 pt-2">
          <button type="button" onClick={onClose} className="flex-1 py-3 rounded-lg bg-muted font-semibold">Cancelar</button>
          <button type="submit" disabled={saving} className="flex-1 py-3 rounded-lg bg-primary text-primary-foreground font-bold shadow-neon">{saving ? "..." : "Salvar"}</button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "w-full px-3 py-2.5 rounded-lg bg-surface-elevated border border-border focus:border-primary outline-none transition text-sm";
