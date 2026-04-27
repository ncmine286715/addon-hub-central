import { useEffect, useState } from "react";
import { detectInAppBrowser, isIOS, type InAppBrowser } from "@/lib/in-app-browser";
import { X, MoreVertical, Share2, ExternalLink, Copy, Check } from "lucide-react";

export function InAppBrowserBanner() {
  const [app, setApp] = useState<InAppBrowser>(null);
  const [dismissed, setDismissed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [ios, setIos] = useState(false);

  useEffect(() => {
    setApp(detectInAppBrowser());
    setIos(isIOS());
    setDismissed(sessionStorage.getItem("inapp-dismissed") === "1");
  }, []);

  if (!app || dismissed) return null;

  const close = () => {
    sessionStorage.setItem("inapp-dismissed", "1");
    setDismissed(true);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md flex items-end sm:items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-gradient-card border-2 border-primary/40 rounded-2xl shadow-glow p-6 animate-in slide-in-from-bottom duration-500">
        <button
          onClick={close}
          className="absolute top-3 right-3 p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition"
          aria-label="Fechar"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-lg bg-primary/15 border border-primary/40 flex items-center justify-center">
            <ExternalLink className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Aviso importante</p>
            <h2 className="text-base font-bold">Abra no navegador</h2>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          Você está dentro do <span className="text-primary font-semibold">{app}</span>.
          Para baixar do <span className="text-foreground font-semibold">Terabox</span> sem erros,
          abra esta página no navegador do seu celular.
        </p>

        <div className="space-y-3 mb-5">
          <Step n={1} icon={<MoreVertical className="w-4 h-4" />}>
            Toque nos <strong className="text-foreground">3 pontinhos</strong>{" "}
            {ios ? <>(canto inferior)</> : <>(canto superior direito)</>}
          </Step>
          <Step n={2} icon={ios ? <Share2 className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}>
            Escolha <strong className="text-foreground">"Abrir no navegador"</strong>
            {ios ? <> ou "Abrir no Safari"</> : <> ou "Chrome"</>}
          </Step>
          <Step n={3} icon={<Check className="w-4 h-4" />}>
            Pronto! O download vai funcionar normal.
          </Step>
        </div>

        <button
          onClick={copyLink}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary/15 border border-primary/40 text-primary font-semibold hover:bg-primary/25 transition"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" /> Link copiado!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" /> Copiar link
            </>
          )}
        </button>

        <button
          onClick={close}
          className="w-full mt-2 py-2 text-xs text-muted-foreground hover:text-foreground transition"
        >
          Continuar mesmo assim
        </button>
      </div>
    </div>
  );
}

function Step({ n, icon, children }: { n: number; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
        {n}
      </div>
      <p className="text-sm text-muted-foreground pt-1 flex items-center gap-2 flex-wrap">
        <span className="text-primary">{icon}</span>
        {children}
      </p>
    </div>
  );
}
