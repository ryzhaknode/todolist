'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { RefreshCw, Home, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto animate-fade-in">
        <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-destructive/10 to-destructive/20 flex items-center justify-center">
          <AlertTriangle className="h-16 w-16 text-destructive" />
        </div>
        
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-destructive to-destructive/70 bg-clip-text text-transparent">
          Что-то пошло не так!
        </h2>
        
        <div className="mb-8 p-4 bg-muted/50 rounded-xl">
          <p className="text-muted-foreground text-sm">
            {error.message || 'Произошла неожиданная ошибка'}
          </p>
          {error.digest && (
            <p className="text-xs text-muted-foreground/70 mt-2">
              Код ошибки: {error.digest}
            </p>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={reset}
            className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Попробовать снова
          </Button>
          
          <Button asChild variant="outline" className="flex items-center gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              На главную
            </Link>
          </Button>
        </div>
        
        <div className="mt-8 p-4 bg-muted/50 rounded-xl">
          <p className="text-sm text-muted-foreground">
            Если проблема повторяется, попробуйте обновить страницу или обратитесь в поддержку.
          </p>
        </div>
      </div>
    </div>
  )
} 