'use client'

import * as React from 'react'
import { motion } from 'framer-motion'

type Item = {
  text: string
  variant: 'solid' | 'outline' | 'italic' | 'amber'
}

const ROW_A: Item[] = [
  { text: 'ERP', variant: 'solid' },
  { text: 'Business Intelligence', variant: 'outline' },
  { text: 'Dashboards', variant: 'italic' },
  { text: 'Dados', variant: 'amber' },
  { text: 'Estratégia', variant: 'outline' },
  { text: 'Consultoria', variant: 'solid' },
]

const ROW_B: Item[] = [
  { text: 'Processos', variant: 'italic' },
  { text: 'Integração', variant: 'outline' },
  { text: 'Análise', variant: 'amber' },
  { text: 'Decisão', variant: 'solid' },
  { text: 'Eficiência', variant: 'outline' },
  { text: 'Crescimento', variant: 'italic' },
]

const VARIANT_CLASS: Record<Item['variant'], string> = {
  solid: 'text-white',
  outline:
    'text-transparent [-webkit-text-stroke:1.5px_rgba(232,244,255,0.55)] [text-stroke:1.5px_rgba(232,244,255,0.55)]',
  italic: 'italic text-white/70 font-light',
  amber: 'text-accent',
}

function Token({ item }: { item: Item }) {
  return (
    <span
      className={[
        'font-display font-semibold leading-none whitespace-nowrap',
        'text-[clamp(3rem,9vw,7rem)] tracking-[-0.025em]',
        VARIANT_CLASS[item.variant],
      ].join(' ')}
    >
      {item.text}
    </span>
  )
}

function Separator({ flip = false }: { flip?: boolean }) {
  return (
    <span
      aria-hidden
      className={[
        'font-display leading-none select-none',
        'text-accent/70',
        'text-[clamp(1.75rem,4vw,3rem)]',
        flip ? 'rotate-45' : '',
        'inline-block',
      ].join(' ')}
    >
      ✦
    </span>
  )
}

export function KineticMarquee() {
  return (
    <section
      aria-hidden
      className="theme-dark relative py-[clamp(4rem,7vw,6rem)] border-y border-white/10 bg-bg overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,rgba(27,94,166,0.18),transparent)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-noise opacity-[0.04] mix-blend-overlay pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-40 z-10 bg-gradient-to-r from-bg via-bg/85 to-transparent pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 w-40 z-10 bg-gradient-to-l from-bg via-bg/85 to-transparent pointer-events-none"
      />

      {/* Mono kicker */}
      <div className="relative z-20 container-site mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="h-[2px] w-8 bg-accent" />
          <span className="font-mono uppercase text-[11px] tracking-[0.24em] text-white/60">
            O que pulsa na IGA
          </span>
        </div>
        <span className="font-mono uppercase text-[10px] tracking-[0.2em] text-white/30 hidden sm:inline">
          ← loop infinito →
        </span>
      </div>

      {/* Row A — esq → dir */}
      <motion.div
        initial={{ x: '0%' }}
        animate={{ x: '-50%' }}
        transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
        className="flex shrink-0 whitespace-nowrap items-center gap-x-[clamp(2rem,4vw,4rem)] will-change-transform"
        style={{ width: 'max-content' }}
      >
        {[...ROW_A, ...ROW_A, ...ROW_A].map((item, i) => (
          <React.Fragment key={`a-${i}`}>
            <Token item={item} />
            <Separator />
          </React.Fragment>
        ))}
      </motion.div>

      {/* Row B — dir → esq, escala menor */}
      <motion.div
        initial={{ x: '-50%' }}
        animate={{ x: '0%' }}
        transition={{ duration: 62, repeat: Infinity, ease: 'linear' }}
        className="flex shrink-0 whitespace-nowrap items-center gap-x-[clamp(1.75rem,3.5vw,3.5rem)] mt-2 will-change-transform"
        style={{ width: 'max-content' }}
      >
        {[...ROW_B, ...ROW_B, ...ROW_B].map((item, i) => (
          <React.Fragment key={`b-${i}`}>
            <span className="scale-75 origin-left block">
              <Token item={item} />
            </span>
            <Separator flip />
          </React.Fragment>
        ))}
      </motion.div>
    </section>
  )
}
