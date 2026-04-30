'use client'

import * as React from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { company } from '@/lib/data'
import { cn } from '@/lib/utils'

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  )
}

export function FloatingActions() {
  const { scrollY } = useScroll()
  const [showTop, setShowTop] = React.useState(false)
  const [hovered, setHovered] = React.useState(false)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setShowTop(latest > 420)
  })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div
      className="fixed bottom-5 right-5 lg:bottom-7 lg:right-7 z-[60] flex flex-col items-end gap-3 pointer-events-none"
      aria-label="Ações rápidas"
    >
      {/* Scroll to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.6, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 16 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.94 }}
            aria-label="Voltar ao topo"
            className={cn(
              'pointer-events-auto group relative inline-flex h-12 w-12 items-center justify-center rounded-full',
              'bg-ink text-white border border-ink/80',
              'shadow-[0_8px_24px_rgba(14,18,25,0.35),inset_0_1px_0_rgba(255,255,255,0.15)]',
              'hover:bg-royal hover:border-royal transition-colors duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg'
            )}
          >
            <ArrowUp className="h-5 w-5" strokeWidth={2.2} />
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-accent animate-ping opacity-60" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* WhatsApp */}
      <a
        href={company.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          'pointer-events-auto group relative inline-flex items-center gap-3 overflow-hidden',
          'h-14 rounded-full pl-4 pr-4',
          'bg-gradient-to-b from-[#25D366] to-[#1FB855] text-white',
          'border border-[#1FB855]/70',
          'shadow-[0_10px_30px_rgba(37,211,102,0.45),inset_0_1px_0_rgba(255,255,255,0.25)]',
          'transition-all duration-300',
          'hover:shadow-[0_14px_40px_rgba(37,211,102,0.6),inset_0_1px_0_rgba(255,255,255,0.3)]',
          'hover:brightness-110 active:scale-[0.97]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg'
        )}
      >
        {/* Ripple ring */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-full border-2 border-white/40 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
        />

        <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
          <WhatsAppIcon className="h-4 w-4" />
          <span
            aria-hidden
            className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]"
          >
            <span className="absolute inset-0 rounded-full bg-white animate-ping opacity-75" />
          </span>
        </span>

        <span
          className={cn(
            'whitespace-nowrap font-body font-semibold text-sm overflow-hidden',
            'transition-all duration-300',
            hovered ? 'max-w-[120px] opacity-100' : 'max-w-0 opacity-0'
          )}
        >
          Fale conosco
        </span>
      </a>
    </div>
  )
}
