'use client'

import * as React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { viewportDefault } from '@/lib/animations'
import { withBasePath } from '@/lib/paths'

const CLIENT_IMAGES = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  src: `/brand/clients/${i + 1}.jpg`,
}))

export function Clients() {
  return (
    <section
      id="clientes"
      aria-labelledby="clients-heading"
      className="section-padding relative overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-dots bg-[length:30px_30px] opacity-[0.08] pointer-events-none"
      />

      <div className="container-site relative">
        {/* Editorial header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportDefault}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-end mb-12 lg:mb-16"
        >
          <div className="lg:col-span-7 flex flex-col gap-5">
            <SectionLabel>Clientes</SectionLabel>
            <h2
              id="clients-heading"
              className="font-display font-bold text-ink leading-[1.02] tracking-[-0.03em] text-[clamp(2rem,4.5vw,3.75rem)]"
            >
              Conheça{' '}
              <span className="italic text-muted font-light">alguns</span>{' '}
              dos nossos{' '}
              <span className="text-accent italic">clientes</span>.
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-4">
            <p className="body-text text-base leading-relaxed">
              Empresas de portes e mercados distintos que escolheram a IGA
              para reorganizar dados, automatizar rotinas e transformar
              relatórios em decisão.
            </p>
            <a
              href="#contato"
              className="inline-flex items-center gap-2 font-mono uppercase text-[11px] tracking-[0.18em] text-accent hover:text-accent transition-colors w-fit group"
            >
              Seja o próximo
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </motion.div>

        {/* Logo grid — clean, sem títulos fake */}
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-0 border-t border-l border-border">
          {CLIENT_IMAGES.map((c, i) => (
            <motion.li
              key={c.id}
              initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{
                duration: 0.75,
                delay: (i % 4) * 0.06 + Math.floor(i / 4) * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative border-r border-b border-border aspect-[4/3] overflow-hidden bg-surface/50"
            >
              <Image
                src={withBasePath(c.src)}
                alt={`Cliente IGA ${c.id}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-[1.03]"
              />
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-bg/50 group-hover:to-bg/10 transition-colors duration-500"
              />
              <div className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/50 group-hover:text-accent transition-colors duration-300">
                / {String(c.id).padStart(2, '0')}
              </div>
            </motion.li>
          ))}
        </ul>

        {/* Footer strip */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono uppercase tracking-[0.2em] text-muted">
          <span>+ de 200 operações atendidas · 2001–{new Date().getFullYear()}</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Aceitando novos clientes
          </span>
        </div>
      </div>
    </section>
  )
}
