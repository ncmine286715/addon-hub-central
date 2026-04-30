import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'MineAddonsNews - Os Melhores Addons de Minecraft',
  description: 'Descubra e baixe os melhores addons de Minecraft. Categorias organizadas, busca avançada e downloads seguros. Por ncmine.',
  keywords: ['minecraft', 'addons', 'mods', 'bedrock', 'mcpe', 'download'],
  authors: [{ name: 'ncmine' }],
  creator: 'ncmine',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    title: 'MineAddonsNews - Os Melhores Addons de Minecraft',
    description: 'Descubra e baixe os melhores addons de Minecraft.',
    siteName: 'MineAddonsNews',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MineAddonsNews',
    description: 'Os melhores addons de Minecraft',
  },
}

export const viewport: Viewport = {
  themeColor: '#09090b',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark bg-background">
      <body className={`${inter.className} antialiased`}>
        {children}
        <Toaster />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
