import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center justify-center shrink-0 whitespace-nowrap rounded-full font-mono uppercase tracking-[0.1em] transition-colors',
  {
    variants: {
      variant: {
        outline:
          'bg-accent-dim border border-border-blue text-accent hover:border-accent',
        solid: 'bg-royal text-white border border-royal-light/40',
        ghost: 'bg-transparent text-muted',
        dot: 'bg-accent-dim border border-border-blue text-accent pl-2',
      },
      size: {
        sm: 'text-[10px] h-5 px-2 gap-1',
        md: 'text-[11px] h-6 px-2.5 gap-1.5',
        lg: 'text-[12px] h-7 px-3 gap-1.5',
      },
    },
    defaultVariants: {
      variant: 'outline',
      size: 'md',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode
  showDot?: boolean
}

export function Badge({
  className,
  variant,
  size,
  icon,
  showDot = false,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    >
      {showDot && (
        <span
          aria-hidden
          className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-glow"
        />
      )}
      {icon && (
        <span
          aria-hidden
          className="inline-flex items-center [&>svg]:h-3 [&>svg]:w-3"
        >
          {icon}
        </span>
      )}
      {children}
    </span>
  )
}

export { badgeVariants }
