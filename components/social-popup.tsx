'use client'

import { useEffect, useState } from 'react'
import { ExternalLink, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

const SOCIAL_REFERRERS = [
  'instagram',
  'facebook',
  'twitter',
  't.co',
  'tiktok',
  'youtube',
  'discord',
  'reddit',
  'whatsapp',
  'telegram',
  'snapchat',
  'linkedin',
]

export function SocialPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    // Check if already shown in this session
    const shown = sessionStorage.getItem('social-popup-shown')
    if (shown) {
      setHasShown(true)
      return
    }

    // Check referrer
    const referrer = document.referrer.toLowerCase()
    const isFromSocial = SOCIAL_REFERRERS.some(social => referrer.includes(social))

    // Also check if opened in in-app browser (common pattern)
    const userAgent = navigator.userAgent.toLowerCase()
    const isInAppBrowser = 
      userAgent.includes('instagram') ||
      userAgent.includes('fban') || // Facebook
      userAgent.includes('fbav') ||
      userAgent.includes('twitter') ||
      userAgent.includes('tiktok') ||
      userAgent.includes('snapchat')

    if ((isFromSocial || isInAppBrowser) && !hasShown) {
      setIsOpen(true)
      sessionStorage.setItem('social-popup-shown', 'true')
      setHasShown(true)
    }
  }, [hasShown])

  const handleOpenInBrowser = () => {
    // Copy current URL to clipboard and show instructions
    const currentUrl = window.location.href
    
    // Try to open in system browser
    window.open(currentUrl, '_system')
    
    // Fallback: copy URL
    navigator.clipboard?.writeText(currentUrl)
  }

  const handleSkip = () => {
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ExternalLink className="h-5 w-5 text-primary" />
            Abrir no Navegador
          </DialogTitle>
          <DialogDescription className="text-left">
            Para uma melhor experiencia e downloads funcionando corretamente, 
            recomendamos abrir este site no seu navegador padrao (Chrome, Safari, etc).
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 rounded-lg bg-secondary p-4">
          <p className="text-sm font-medium text-foreground">Como abrir:</p>
          <ol className="list-inside list-decimal space-y-2 text-sm text-muted-foreground">
            <li>Toque nos tres pontinhos (...) ou no icone de menu</li>
            <li>Selecione &quot;Abrir no navegador&quot; ou &quot;Abrir no Chrome/Safari&quot;</li>
          </ol>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row-reverse">
          <Button onClick={handleOpenInBrowser} className="gap-2">
            <ExternalLink className="h-4 w-4" />
            Tentar Abrir
          </Button>
          <Button variant="ghost" onClick={handleSkip} className="gap-2">
            <X className="h-4 w-4" />
            Pular
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
