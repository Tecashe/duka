'use client'

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SavedIndicatorProps {
  show: boolean
  className?: string
}

export function SavedIndicator({ show, className }: SavedIndicatorProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-1.5 text-sm text-primary transition-opacity duration-300',
        show ? 'opacity-100' : 'opacity-0',
        className
      )}
    >
      <Check className="h-3.5 w-3.5" />
      <span>Saved</span>
    </div>
  )
}
