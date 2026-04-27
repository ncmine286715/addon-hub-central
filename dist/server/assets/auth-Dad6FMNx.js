import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-Cd2NupWL.js";
import { c as createLucideIcon, u as useNavigate, P as Pickaxe, t as toast } from "./router-CoZDbHzK.js";
import { s as supabase } from "./client-FSMjw0KX.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode = [
  ["path", { d: "m10 17 5-5-5-5", key: "1bsop3" }],
  ["path", { d: "M15 12H3", key: "6jk70r" }],
  ["path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4", key: "u53s6r" }]
];
const LogIn = createLucideIcon("log-in", __iconNode);
function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = reactExports.useState("login");
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const {
          error
        } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin + "/admin"
          }
        });
        if (error) throw error;
        toast.success("Conta criada! Verifique seu email.");
      } else {
        const {
          error
        } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        toast.success("Bem-vindo!");
        navigate({
          to: "/admin"
        });
      }
    } catch (err) {
      toast.error(err.message ?? "Erro");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-16 max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex w-14 h-14 rounded-2xl bg-gradient-neon items-center justify-center shadow-neon mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pickaxe, { className: "w-7 h-7 text-primary-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-pixel text-xl text-primary text-glow", children: "PAINEL ADMIN" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2", children: "Entre para gerenciar addons" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 p-6 rounded-2xl bg-gradient-card border border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), className: "w-full mt-1 px-4 py-3 rounded-lg bg-surface-elevated border border-border focus:border-primary outline-none transition" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Senha" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", required: true, minLength: 6, value: password, onChange: (e) => setPassword(e.target.value), className: "w-full mt-1 px-4 py-3 rounded-lg bg-surface-elevated border border-border focus:border-primary outline-none transition" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", disabled: loading, className: "w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-primary text-primary-foreground font-bold shadow-neon hover:opacity-90 transition disabled:opacity-50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4" }),
        loading ? "..." : mode === "login" ? "Entrar" : "Criar conta"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setMode(mode === "login" ? "signup" : "login"), className: "w-full text-xs text-muted-foreground hover:text-primary transition", children: mode === "login" ? "Não tem conta? Criar uma" : "Já tem conta? Entrar" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground text-center mt-6", children: "Após criar a conta, peça pro admin do site liberar suas permissões." })
  ] });
}
export {
  AuthPage as component
};
