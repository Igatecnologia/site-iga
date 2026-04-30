'use client'

import * as React from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Badge } from './Badge'
import { IconBox } from './IconBox'
import { fadeUp, viewportDefault } from '@/lib/animations'
import { cn } from '@/lib/utils'

export interface ServiceCardProps {
  id?: string
  index?: number
  title: string
  description: string
  badge: string
  lottieSrc?: string
  fallbackIcon?: React.ReactNode
  className?: string
}

export function ServiceCard({
  id,
  index = 0,
  title,
  description,
  badge,
  lottieSrc,
  fallbackIcon,
  className,
}: ServiceCardProps) {
  const [hovered, setHovered] = React.useState(false)
  const cardRef = React.useRef<HTMLElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg'])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    x.set(mouseX / width - 0.5)
    y.set(mouseY / height - 0.5)
  }

  const handleMouseLeave = () => {
    setHovered(false)
    x.set(0)
    y.set(0)
  }

  return (
    <motion.article
      ref={cardRef}
      id={id}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportDefault}
      custom={index}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'group relative flex flex-col h-full',
        'glass-panel glow-on-hover',
        'rounded-2xl p-7',
        'transition-[border-color,box-shadow] duration-300',
        className
      )}
    >
      {/* subtle accent wash on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_60%_40%_at_20%_0%,rgba(74,144,217,0.15),transparent_70%)]"
      />

      {/* corner arrow */}
      <ArrowUpRight
        aria-hidden
        style={{ transform: 'translateZ(30px)' }}
        className="absolute top-6 right-6 h-5 w-5 text-muted transition-[color,transform] duration-300 group-hover:text-accent group-hover:-translate-y-1 group-hover:translate-x-1"
      />

      <div className="relative z-10 flex flex-col h-full gap-5" style={{ transform: 'translateZ(20px)' }}>
        <div className="flex items-center justify-start">
          <IconBox icon={fallbackIcon} variant="primary" size="md" />
        </div>

        <h3 className="font-display text-[clamp(1.25rem,2.2vw,1.625rem)] font-semibold leading-tight text-ink">
          {title}
        </h3>

        <p className="body-text text-[0.95rem] text-muted leading-relaxed flex-1">
          {description}
        </p>

        <div className="pt-2">
          <Badge
            variant="outline"
            size="md"
            showDot={hovered}
            className="transition-all duration-300"
          >
            {badge}
          </Badge>
        </div>
      </div>
    </motion.article>
  )
}
