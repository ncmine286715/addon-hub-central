import { Outlet, createRootRoute, HeadContent, Scripts, Link } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { InAppBrowserBanner } from "@/components/InAppBrowserBanner";
import { Toaster } from "sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="font-pixel text-5xl text-primary text-glow mb-4">404</p>
        <h2 className="text-xl font-bold mb-2">Página não encontrada</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Esse addon foi minerado e não está mais aqui.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90 transition shadow-neon"
        >
          Voltar pro início
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "MineAddonsNews — Addons de Minecraft Bedrock por ncmine" },
      { name: "description", content: "Os melhores addons, texturas e mods para Minecraft Bedrock. Download fácil pelo Terabox. Por ncmine — 140k seguidores no TikTok." },
      { name: "author", content: "ncmine" },
      { property: "og:title", content: "MineAddonsNews — Addons de Minecraft por ncmine" },
      { property: "og:description", content: "Baixe addons de Minecraft Bedrock fácil e rápido pelo Terabox." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "MineAddonsNews" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#1a2e1a" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Press+Start+2P&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="min-h-screen flex flex-col">
      <InAppBrowserBanner />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster theme="dark" position="top-center" richColors />
    </div>
  );
}
