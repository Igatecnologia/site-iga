import * as React from 'react'
import { cn } from '@/lib/utils'

interface IconBoxProps {
  icon: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'accent' | 'amber' | 'outline'
  className?: string
}

export function IconBox({
  icon,
  size = 'md',
  variant = 'primary',
  className,
}: IconBoxProps) {
  const sizeStyles = {
    sm: 'w-10 h-10 p-2 rounded-lg',
    md: 'w-12 h-12 p-2.5 rounded-xl',
    lg: 'w-16 h-16 p-3.5 rounded-2xl',
  }

  const variantStyles = {
    primary: 'bg-royal/10 text-royal border border-royal/20',
    accent: 'bg-accent/10 text-accent border border-accent/20',
    amber: 'bg-amber/10 text-amber border border-amber/20',
    outline: 'bg-transparent text-muted border border-border',
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center shrink-0 transition-colors duration-300',
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
    >
      {icon}
    </div>
  )
}
