'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import { navLinks, company } from '@/lib/data'
import { cn } from '@/lib/utils'
import { stripBasePath, withBasePath } from '@/lib/paths'
import { CallbackDialog } from '@/components/ui/CallbackDialog'

export function IgaLogoMark({
  size = 'md',
  className,
}: {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const dims = {
    sm: { w: 96, h: 45 },
    md: { w: 120, h: 56 },
    lg: { w: 160, h: 75 },
  }[size]

  return (
    <Image
      src="/brand/iga-logo.png"
      alt="IGA Tecnologia"
      width={dims.w}
      height={dims.h}
      priority
      className={cn('object-contain h-auto w-auto', className)}
      style={{ maxHeight: dims.h }}
    />
  )
}

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

export function Navbar() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = React.useState(false)
  const [hidden, setHidden] = React.useState(false) 
  const [open, setOpen] = React.useState(false)
  const [callbackOpen, setCallbackOpen] = React.useState(false)
  const [activeHash, setActiveHash] = React.useState<string>('#home')
  const [hoverHash, setHoverHash] = React.useState<string | null>(null)
  const prevScrollY = React.useRef(0)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 20)

    const delta = latest - prevScrollY.current
    // Ignora micro-tremores (trackpad/inércia) e mantém visível no topo.
    if (Math.abs(delta) > 4) { 
      if (latest < 80) {
        setHidden(false)
      } else if (delta > 0) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      prevScrollY.current = latest
    }
  })

  React.useEffect(() => {
    if (typeof window === 'undefined') return
    const syncHash = () => {
      const { hash } = window.location
      const pathname = stripBasePath(window.location.pathname)
      if (pathname !== '/' && pathname !== '') {
        setActiveHash(pathname)
      } else {
        setActiveHash(hash || '/#home')
      }
    }
    syncHash()
    window.addEventListener('hashchange', syncHash)
    window.addEventListener('popstate', syncHash)
    return () => {
      window.removeEventListener('hashchange', syncHash)
      window.removeEventListener('popstate', syncHash)
    }
  }, [])

  React.useEffect(() => {
    if (typeof window === 'undefined') return
    if (stripBasePath(window.location.pathname) !== '/') return
    const hashIds = navLinks
      .map((l) => l.href)
      .filter((h) => h.startsWith('/#'))
      .map((h) => h.replace('/#', ''))
    const sections = hashIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el)
    if (!sections.length) return
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) setActiveHash(`/#${visible.target.id}`)
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const highlightedHash = hoverHash ?? activeHash

  const isHidden = hidden && !open

  return (
    <motion.header
      role="navigation"
      aria-label="Principal"
      animate={{ y: isHidden ? '-120%' : '0%' }}
      transition={{ type: 'spring', stiffness: 260, damping: 30, mass: 0.9 }}
      className={cn(
        'theme-dark fixed inset-x-0 top-0 z-50 transition-[padding] duration-500',
        scrolled ? 'pt-3' : 'pt-5'
      )}
    >
      <motion.div
        animate={{
          maxWidth: scrolled ? '920px' : '1280px',
          y: scrolled ? 2 : 0,
        }}
        transition={{ type: 'spring', stiffness: 210, damping: 28 }}
        className={cn(
          'mx-auto w-[calc(100%-2rem)] flex items-center justify-between gap-4 h-[64px]',
          'rounded-full border transition-[background-color,box-shadow,border-color] duration-500',
          scrolled
            ? 'bg-[#060d1a]/85 backdrop-blur-xl border-white/10 shadow-[0_10px_40px_rgb(0,0,0,0.4)]'
            : 'bg-[#060d1a]/40 backdrop-blur-md border-white/10'
        )}
        style={{
          paddingLeft: 'clamp(1rem, 2vw, 1.5rem)',
          paddingRight: 'clamp(0.5rem, 1vw, 0.75rem)',
        }}
      >
        <Link
          href="/#home"
          className="relative z-10 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
          aria-label="IGA Tecnologia — ir para o topo"
        >
          <IgaLogoMark size="sm" />
        </Link>

        {/* Floating pill nav — centered */}
        <nav
          className="hidden lg:flex items-center gap-0.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md p-1"
          onMouseLeave={() => setHoverHash(null)}
        >
          {navLinks.map((link) => {
            const isHighlighted = highlightedHash === link.href
            const isActive = activeHash === link.href
            return (
              <a
                key={link.href}
                href={withBasePath(link.href)}
                onClick={() => setActiveHash(link.href)}
                onMouseEnter={() => setHoverHash(link.href)}
                className={cn(
                  'relative px-4 py-2 rounded-full text-[13px] font-body font-medium whitespace-nowrap',
                  'transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-accent',
                  isActive ? 'text-white' : 'text-white/75 hover:text-white'
                )}
              >
                {isHighlighted && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-accent-dim border border-border-blue/60"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    aria-hidden
                  />
                )}
                {isActive && (
                  <motion.span
                    layoutId="nav-lamp"
                    className="absolute -top-1 left-1/2 -translate-x-1/2 h-[3px] w-8 rounded-full bg-accent"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    aria-hidden
                  >
                    <span className="absolute inset-x-0 -top-1 h-4 bg-accent/30 blur-md rounded-full" />
                  </motion.span>
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            )
          })}
        </nav>

        {/* Right — "Ligamos para você" CTA */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setCallbackOpen(true)}
            className={cn(
              'group relative inline-flex items-center gap-2 h-10 pl-3 pr-4 rounded-full',
              'bg-gradient-to-b from-accent to-royal text-white font-body text-sm font-semibold',
              'shadow-[0_4px_14px_rgba(27,94,166,0.45),inset_0_1px_0_rgba(255,255,255,0.25)]',
              'border border-royal-light/60 transition-all duration-200',
              'hover:brightness-110 hover:shadow-[0_6px_22px_rgba(27,94,166,0.6)]',
              'active:scale-[0.98]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg'
            )}
            aria-label="Solicitar retorno — ligamos para você"
          >
            <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <Phone className="h-3.5 w-3.5" />
              <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.9)]">
                <span className="absolute inset-0 rounded-full bg-white animate-ping opacity-75" />
              </span>
            </span>
            <span>Ligamos para você</span>
          </button>
        </div>

        {/* Mobile trigger */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/15 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label="Abrir menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </motion.div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 lg:hidden bg-bg/95 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="container-site flex items-center justify-between h-[72px]">
              <IgaLogoMark size="md" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center h-10 w-10 rounded-lg border border-border-blue text-ink hover:bg-accent-dim transition-colors"
                aria-label="Fechar menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <motion.nav
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.06, delayChildren: 0.1 },
                },
              }}
              className="container-site flex flex-col gap-2 pt-8"
            >
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={withBasePath(link.href)}
                  onClick={() => setOpen(false)}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.5,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    },
                  }}
                  className="font-display text-3xl font-semibold text-ink hover:text-accent transition-colors py-3 border-b border-border"
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, delay: 0.3 },
                  },
                }}
                className="mt-6 flex flex-col gap-3"
              >
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false)
                    setCallbackOpen(true)
                  }}
                  className={cn(
                    'flex w-full items-center justify-center gap-3 h-14 rounded-2xl',
                    'bg-gradient-to-b from-accent to-royal text-white font-body font-semibold text-lg',
                    'shadow-[0_4px_14px_rgba(27,94,166,0.45),inset_0_1px_0_rgba(255,255,255,0.25)]',
                    'border border-royal-light/60'
                  )}
                >
                  <Phone className="h-5 w-5" />
                  Ligamos para você
                </button>
                <a
                  href={company.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className={cn(
                    'flex w-full items-center justify-center gap-3 h-14 rounded-2xl',
                    'bg-gradient-to-b from-[#25D366] to-[#1FB855] text-white font-body font-semibold text-lg',
                    'shadow-[0_4px_14px_rgba(37,211,102,0.45),inset_0_1px_0_rgba(255,255,255,0.25)]',
                    'border border-[#1FB855]/60'
                  )}
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Falar no WhatsApp
                </a>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      <CallbackDialog open={callbackOpen} onOpenChange={setCallbackOpen} />
    </motion.header>
  )
}
