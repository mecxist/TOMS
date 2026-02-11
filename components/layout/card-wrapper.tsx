import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardWrapperProps {
  children: ReactNode
  className?: string
  padding?: 'standard' | 'inner' | 'compact'
  nested?: boolean
  hover?: boolean
  glassmorphic?: boolean
}

export function CardWrapper({ 
  children, 
  className, 
  padding = 'standard',
  nested = false,
  hover = false,
  glassmorphic = false
}: CardWrapperProps) {
  const paddingClass = padding === 'standard' 
    ? 'p-6' 
    : padding === 'inner' 
    ? 'p-4' 
    : 'p-3'
  
  const backgroundClass = nested
    ? 'bg-white dark:bg-[#151515]'
    : 'bg-white/50 dark:bg-black/20'
  
  const borderClass = 'ring-1 ring-black/10 dark:ring-white/10'
  
  const hoverClass = hover && !nested
    ? 'hover:bg-white/70 dark:hover:bg-black/30 transition-colors'
    : ''
  
  const glassClass = glassmorphic 
    ? 'backdrop-blur-xl bg-gradient-to-br from-white/90 via-white/80 to-white/70 dark:from-black/50 dark:via-black/40 dark:to-black/30'
    : ''

  return (
    <div 
      className={cn(
        borderClass,
        backgroundClass,
        'rounded-xl',
        paddingClass,
        hoverClass,
        glassClass,
        className
      )}
    >
      {children}
    </div>
  )
}
