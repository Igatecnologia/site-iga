'use client'

import * as React from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

type Stat = {
  n: number
  suffix?: string
  label: string
  context: string
  accent?: boolean
}

const STATS: Stat[] = [
  { n: 23, label: 'Anos', context: 'no mercado de ERP e BI', accent: true },
  { n: 200, suffix: '+', label: 'Empresas', context: 'operando com soluções IGA' },
  { n: 6, label: 'Frentes', context: 'do diagnóstico ao dashboard' },
  { n: 100, suffix: '%', label: 'Foco', context: 'em resultado mensurável' },
]

function BigNumber({ n, suffix, accent }: { n: number; suffix?: string; accent?: boolean }) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const rootRef = React.useRef<HTMLDivElement>(null)
  const inView = useInView(rootRef, { once: true, margin: '-20%' })

  React.useEffect(() => {
    if (!inView) return
    const el = ref.current
    if (!el) return
    const start = performance.now()
    const dur = 1600
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur)
      const eased = 1 - Math.pow(1 - t, 4)
      el.textContent = String(Math.round(eased * n))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, n])

  return (
    <div ref={rootRef} className="flex items-baseline gap-1 leading-none">
      <span
        ref={ref}
        className={cn(
          'font-display font-black tabular-nums tracking-[-0.04em] leading-[0.85]',
          'text-[clamp(3.5rem,7.5vw,6rem)]',
          accent ? 'text-accent' : 'text-ink'
        )}
      >
        0
      </span>
      {suffix && (
        <span
          className={cn(
            'font-display font-black leading-none',
            'text-[clamp(1.75rem,3vw,2.5rem)]',
            accent ? 'text-accent' : 'text-accent'
          )}
        >
          {suffix}
        </span>
      )}
    </div>
  )
}

export function SocialProof() {
  return (
    <section
      aria-labelledby="social-proof-heading"
      className="relative overflow-hidden border-y border-border bg-bg"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-dots bg-[length:32px_32px] opacity-[0.05] pointer-events-none"
      />

      <div className="container-site relative py-[clamp(5rem,9vw,7rem)]">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 lg:mb-16"
        >
          <h2
            id="social-proof-heading"
            className="font-display font-bold text-ink max-w-2xl leading-[1.05] tracking-[-0.03em] text-[clamp(1.75rem,3.5vw,2.75rem)]"
          >
            Não somos nova no mercado.{' '}
            <span className="italic text-muted font-light">
              Somos nova no que <span className="text-accent not-italic font-bold">está por vir</span>.
            </span>
          </h2>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted whitespace-nowrap">
            · · · Indicadores internos
          </p>
        </motion.div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-0 gap-y-10">
          {STATS.map((stat, i) => (
            <motion.li
              key={stat.label}
              initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-15%' }}
              transition={{
                duration: 0.9,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={cn(
                'flex flex-col gap-4 relative pl-0 lg:pl-8',
                i > 0 && 'lg:border-l lg:border-border'
              )}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                {String(i + 1).padStart(2, '0')} · {stat.label}
              </span>
              <BigNumber n={stat.n} suffix={stat.suffix} accent={stat.accent} />
              <p className="text-sm text-muted max-w-[22ch] leading-snug font-body">
                {stat.context}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
