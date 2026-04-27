import { createFileRoute } from "@tanstack/react-router";
import { Smartphone, FolderOpen, Package, Play } from "lucide-react";

export const Route = createFileRoute("/tutorial")({
  head: () => ({
    meta: [
      { title: "Como instalar addons no Minecraft Bedrock — MineAddonsNews" },
      { name: "description", content: "Tutorial completo: como baixar do Terabox e instalar addons no Minecraft Bedrock (celular e PC)." },
    ],
  }),
  component: TutorialPage,
});

function TutorialPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <h1 className="font-pixel text-2xl sm:text-3xl text-primary text-glow mb-2">COMO INSTALAR</h1>
      <p className="text-muted-foreground mb-10">Passo a passo pra instalar qualquer addon do site no seu Minecraft Bedrock.</p>

      <div className="space-y-6">
        <Step n={1} icon={<Smartphone className="w-5 h-5" />} title="Abra no navegador">
          Se você veio do TikTok ou Instagram, toque nos <strong className="text-foreground">3 pontinhos</strong> e escolha "Abrir no navegador" (Chrome ou Safari). Isso evita erro no download do Terabox.
        </Step>
        <Step n={2} icon={<Package className="w-5 h-5" />} title="Baixe o addon">
          Clique no addon que quer, toque no botão verde <strong className="text-primary">"Baixar no Terabox"</strong> e siga o passo a passo do Terabox pra salvar o arquivo no seu celular.
        </Step>
        <Step n={3} icon={<FolderOpen className="w-5 h-5" />} title="Abra o arquivo">
          O arquivo geralmente vem como <code className="px-1.5 py-0.5 rounded bg-muted text-primary text-xs">.mcaddon</code> ou <code className="px-1.5 py-0.5 rounded bg-muted text-primary text-xs">.mcpack</code>. É só tocar nele que ele abre direto no Minecraft.
        </Step>
        <Step n={4} icon={<Play className="w-5 h-5" />} title="Ative no mundo">
          Crie um mundo novo (ou edite um existente), vá em <strong className="text-foreground">Pacotes de Comportamento / Recursos</strong> e ative o addon. Pronto, é só jogar!
        </Step>
      </div>

      <div className="mt-12 p-6 rounded-2xl bg-gradient-card border border-primary/30">
        <h3 className="font-bold mb-2 text-primary">Não funcionou?</h3>
        <p className="text-sm text-muted-foreground">
          Verifica se a versão do seu Minecraft é igual ou maior que a indicada no addon. Alguns addons só funcionam em versões específicas.
        </p>
      </div>
    </div>
  );
}

function Step({ n, icon, title, children }: { n: number; icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 p-5 rounded-2xl bg-gradient-card border border-border">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/40 text-primary flex items-center justify-center font-pixel text-sm">
          {n}
        </div>
      </div>
      <div className="flex-1">
        <h3 className="font-bold mb-1 flex items-center gap-2">
          <span className="text-primary">{icon}</span>{title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{children}</p>
      </div>
    </div>
  );
}
