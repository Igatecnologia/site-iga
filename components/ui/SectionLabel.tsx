import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SectionLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  as?: 'span' | 'p' | 'h2'
}

export function SectionLabel({
  className,
  children,
  as: Tag = 'span',
  ...props
}: SectionLabelProps) {
  return (
    <Tag
      className={cn(
        'inline-flex items-center gap-2 section-label',
        'before:content-[""] before:h-px before:w-6 before:bg-accent/60',
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}
