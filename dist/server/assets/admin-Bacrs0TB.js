import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-Cd2NupWL.js";
import { c as createLucideIcon, u as useNavigate, t as toast } from "./router-CoZDbHzK.js";
import { s as supabase } from "./client-FSMjw0KX.js";
import { s as slugify } from "./format-CzipH5n0.js";
import { T as Tag } from "./tag-mRDz-pV2.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$6 = [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const EyeOff = createLucideIcon("eye-off", __iconNode$6);
const __iconNode$5 = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
];
const LogOut = createLucideIcon("log-out", __iconNode$5);
const __iconNode$4 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode$4);
const __iconNode$3 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode$3);
const __iconNode$2 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "M12 8v4", key: "1got3b" }],
  ["path", { d: "M12 16h.01", key: "1drbdi" }]
];
const ShieldAlert = createLucideIcon("shield-alert", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode$1);
const __iconNode = [
  ["path", { d: "M10 11v6", key: "nco0om" }],
  ["path", { d: "M14 11v6", key: "outv1u" }],
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
function AdminPage() {
  const navigate = useNavigate();
  const [user, setUser] = reactExports.useState(null);
  const [isAdmin, setIsAdmin] = reactExports.useState(null);
  const [tab, setTab] = reactExports.useState("addons");
  const [addons, setAddons] = reactExports.useState([]);
  const [categories, setCategories] = reactExports.useState([]);
  const [editing, setEditing] = reactExports.useState(null);
  const [editingCat, setEditingCat] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const {
      data: {
        subscription
      }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session) navigate({
        to: "/auth"
      });
    });
    supabase.auth.getSession().then(({
      data
    }) => {
      if (!data.session) {
        navigate({
          to: "/auth"
        });
        return;
      }
      setUser(data.session.user);
    });
    return () => subscription.unsubscribe();
  }, [navigate]);
  reactExports.useEffect(() => {
    if (!user) return;
    (async () => {
      const {
        data
      } = await supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").maybeSingle();
      setIsAdmin(!!data);
    })();
  }, [user]);
  reactExports.useEffect(() => {
    if (!isAdmin) return;
    refresh();
  }, [isAdmin]);
  const refresh = async () => {
    const [a, c] = await Promise.all([supabase.from("addons").select("*").order("created_at", {
      ascending: false
    }), supabase.from("categories").select("*").order("sort_order")]);
    setAddons(a.data ?? []);
    setCategories(c.data ?? []);
  };
  const logout = async () => {
    await supabase.auth.signOut();
    navigate({
      to: "/"
    });
  };
  if (!user) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-20 text-center text-muted-foreground", children: "Carregando..." });
  if (isAdmin === false) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-16 max-w-md text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "w-12 h-12 text-destructive mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold mb-2", children: "Sem permissão" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-6", children: [
        "Sua conta ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: user.email }),
        " não é admin.",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "Pra liberar, abra o painel do banco de dados e adicione um registro na tabela ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "px-1.5 py-0.5 rounded bg-muted text-primary", children: "user_roles" }),
        ":",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "user_id = ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-primary", children: user.id }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "role = ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-primary", children: "admin" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: logout, className: "text-primary hover:underline", children: "Sair" })
    ] });
  }
  if (isAdmin === null) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-20 text-center text-muted-foreground", children: "Verificando permissões..." });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8 max-w-6xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-8 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-pixel text-xl sm:text-2xl text-primary text-glow", children: "PAINEL" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: user.email })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: logout, className: "flex items-center gap-2 px-3 py-2 rounded-lg bg-muted hover:bg-accent text-sm transition", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" }),
        " Sair"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 mb-6 p-1 rounded-xl bg-muted w-fit", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabButton, { active: tab === "addons", onClick: () => setTab("addons"), children: [
        "Addons (",
        addons.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabButton, { active: tab === "categories", onClick: () => setTab("categories"), children: [
        "Categorias (",
        categories.length,
        ")"
      ] })
    ] }),
    tab === "addons" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setEditing({
        name: "",
        short_description: "",
        image_url: "",
        terabox_url: "",
        tags: [],
        gallery: [],
        is_published: true,
        is_featured: false
      }), className: "mb-5 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold shadow-neon hover:opacity-90 transition", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
        " Novo addon"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        addons.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 rounded-xl bg-gradient-card border border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: a.image_url, alt: "", className: "w-16 h-12 rounded-lg object-cover bg-surface flex-shrink-0", onError: (e) => e.currentTarget.style.opacity = "0.2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold truncate", children: a.name }),
              a.is_featured && /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3.5 h-3.5 text-gold fill-gold flex-shrink-0" }),
              !a.is_published && /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-3.5 h-3.5 text-muted-foreground flex-shrink-0" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate", children: [
              a.views,
              " views · ",
              a.downloads,
              " downloads"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditing(a), className: "p-2 hover:bg-muted rounded-lg", "aria-label": "Editar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: async () => {
            if (!confirm(`Excluir "${a.name}"?`)) return;
            const {
              error
            } = await supabase.from("addons").delete().eq("id", a.id);
            if (error) toast.error(error.message);
            else {
              toast.success("Excluído");
              refresh();
            }
          }, className: "p-2 hover:bg-destructive/20 hover:text-destructive rounded-lg", "aria-label": "Excluir", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }) })
        ] }, a.id)),
        addons.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground py-12", children: "Nenhum addon ainda. Crie o primeiro!" })
      ] })
    ] }),
    tab === "categories" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setEditingCat({
        name: "",
        icon: "",
        sort_order: categories.length
      }), className: "mb-5 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold shadow-neon hover:opacity-90 transition", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
        " Nova categoria"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        categories.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 rounded-xl bg-gradient-card border border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: c.icon || "📦" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: c.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "/",
              c.slug
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditingCat(c), className: "p-2 hover:bg-muted rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: async () => {
            if (!confirm(`Excluir "${c.name}"?`)) return;
            const {
              error
            } = await supabase.from("categories").delete().eq("id", c.id);
            if (error) toast.error(error.message);
            else {
              toast.success("Excluído");
              refresh();
            }
          }, className: "p-2 hover:bg-destructive/20 hover:text-destructive rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }) })
        ] }, c.id)),
        categories.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground py-12", children: "Crie sua primeira categoria." })
      ] })
    ] }),
    editing && /* @__PURE__ */ jsxRuntimeExports.jsx(AddonForm, { draft: editing, categories, onClose: () => setEditing(null), onSaved: () => {
      setEditing(null);
      refresh();
    } }),
    editingCat && /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryForm, { draft: editingCat, onClose: () => setEditingCat(null), onSaved: () => {
      setEditingCat(null);
      refresh();
    } })
  ] });
}
function TabButton({
  active,
  onClick,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick, className: "px-4 py-2 rounded-lg text-sm font-semibold transition " + (active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"), children });
}
function AddonForm({
  draft,
  categories,
  onClose,
  onSaved
}) {
  const [form, setForm] = reactExports.useState({
    ...draft,
    gallery: draft.gallery ?? [],
    tags: draft.tags ?? []
  });
  const [tagInput, setTagInput] = reactExports.useState("");
  const [galleryInput, setGalleryInput] = reactExports.useState("");
  const [saving, setSaving] = reactExports.useState(false);
  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
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
      is_published: form.is_published !== false
    };
    const res = form.id ? await supabase.from("addons").update(payload).eq("id", form.id) : await supabase.from("addons").insert(payload);
    setSaving(false);
    if (res.error) toast.error(res.error.message);
    else {
      toast.success("Salvo!");
      onSaved();
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: save, onClick: (e) => e.stopPropagation(), className: "w-full max-w-2xl my-8 bg-gradient-card border border-primary/40 rounded-2xl p-6 shadow-glow space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-lg", children: form.id ? "Editar addon" : "Novo addon" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nome *", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, value: form.name ?? "", onChange: (e) => setForm({
      ...form,
      name: e.target.value,
      slug: form.id ? form.slug : slugify(e.target.value)
    }), className: inputCls }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Slug (URL)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.slug ?? "", onChange: (e) => setForm({
      ...form,
      slug: slugify(e.target.value)
    }), className: inputCls, placeholder: "auto-gerado" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Descrição curta *", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, maxLength: 160, value: form.short_description ?? "", onChange: (e) => setForm({
      ...form,
      short_description: e.target.value
    }), className: inputCls }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Descrição longa", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 4, value: form.long_description ?? "", onChange: (e) => setForm({
      ...form,
      long_description: e.target.value
    }), className: inputCls + " resize-y" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Imagem principal (URL) *", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "url", value: form.image_url ?? "", onChange: (e) => setForm({
      ...form,
      image_url: e.target.value
    }), className: inputCls, placeholder: "https://..." }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "Galeria (URLs adicionais)", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: galleryInput, onChange: (e) => setGalleryInput(e.target.value), className: inputCls, placeholder: "https://..." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
          if (galleryInput) {
            setForm({
              ...form,
              gallery: [...form.gallery ?? [], galleryInput]
            });
            setGalleryInput("");
          }
        }, className: "px-3 rounded-lg bg-primary text-primary-foreground font-semibold", children: "+" })
      ] }),
      (form.gallery ?? []).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mt-2", children: (form.gallery ?? []).map((g, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 px-2 py-1 rounded bg-muted text-xs", children: [
        "img ",
        i + 1,
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setForm({
          ...form,
          gallery: form.gallery.filter((_, x) => x !== i)
        }), className: "hover:text-destructive", children: "×" })
      ] }, i)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Link do Terabox *", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "url", value: form.terabox_url ?? "", onChange: (e) => setForm({
      ...form,
      terabox_url: e.target.value
    }), className: inputCls, placeholder: "https://terabox.com/s/..." }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Categoria", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: form.category_id ?? "", onChange: (e) => setForm({
        ...form,
        category_id: e.target.value || null
      }), className: inputCls, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "— nenhuma —" }),
        categories.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c.id, children: c.name }, c.id))
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Versão MC", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.mc_version ?? "", onChange: (e) => setForm({
        ...form,
        mc_version: e.target.value
      }), className: inputCls, placeholder: "1.21.x" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Autor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.author ?? "", onChange: (e) => setForm({
      ...form,
      author: e.target.value
    }), className: inputCls }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "Tags", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: tagInput, onChange: (e) => setTagInput(e.target.value), onKeyDown: (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          if (tagInput) {
            setForm({
              ...form,
              tags: [...form.tags ?? [], tagInput]
            });
            setTagInput("");
          }
        }
      }, className: inputCls, placeholder: "enter pra adicionar" }) }),
      (form.tags ?? []).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mt-2", children: (form.tags ?? []).map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 px-2 py-1 rounded-full bg-primary/15 text-primary text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-3 h-3" }),
        t,
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setForm({
          ...form,
          tags: form.tags.filter((_, x) => x !== i)
        }), children: "×" })
      ] }, i)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: !!form.is_featured, onChange: (e) => setForm({
          ...form,
          is_featured: e.target.checked
        }) }),
        " Em destaque"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: form.is_published !== false, onChange: (e) => setForm({
          ...form,
          is_published: e.target.checked
        }) }),
        " Publicado"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onClose, className: "flex-1 py-3 rounded-lg bg-muted hover:bg-accent font-semibold transition", children: "Cancelar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: saving, className: "flex-1 py-3 rounded-lg bg-primary text-primary-foreground font-bold shadow-neon hover:opacity-90 transition disabled:opacity-50", children: saving ? "..." : "Salvar" })
    ] })
  ] }) });
}
function CategoryForm({
  draft,
  onClose,
  onSaved
}) {
  const [form, setForm] = reactExports.useState(draft);
  const [saving, setSaving] = reactExports.useState(false);
  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      name: form.name,
      slug: form.slug || slugify(form.name || ""),
      icon: form.icon || null,
      sort_order: form.sort_order ?? 0
    };
    const res = form.id ? await supabase.from("categories").update(payload).eq("id", form.id) : await supabase.from("categories").insert(payload);
    setSaving(false);
    if (res.error) toast.error(res.error.message);
    else {
      toast.success("Salvo!");
      onSaved();
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: save, onClick: (e) => e.stopPropagation(), className: "w-full max-w-md bg-gradient-card border border-primary/40 rounded-2xl p-6 shadow-glow space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-lg", children: form.id ? "Editar categoria" : "Nova categoria" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nome *", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, value: form.name ?? "", onChange: (e) => setForm({
      ...form,
      name: e.target.value,
      slug: form.id ? form.slug : slugify(e.target.value)
    }), className: inputCls }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Ícone (emoji)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.icon ?? "", onChange: (e) => setForm({
      ...form,
      icon: e.target.value
    }), className: inputCls, placeholder: "🐉" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Ordem", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", value: form.sort_order ?? 0, onChange: (e) => setForm({
      ...form,
      sort_order: Number(e.target.value)
    }), className: inputCls }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onClose, className: "flex-1 py-3 rounded-lg bg-muted font-semibold", children: "Cancelar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: saving, className: "flex-1 py-3 rounded-lg bg-primary text-primary-foreground font-bold shadow-neon", children: saving ? "..." : "Salvar" })
    ] })
  ] }) });
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1", children: label }),
    children
  ] });
}
const inputCls = "w-full px-3 py-2.5 rounded-lg bg-surface-elevated border border-border focus:border-primary outline-none transition text-sm";
export {
  AdminPage as component
};
