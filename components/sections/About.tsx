'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Target,
  Eye,
  Heart,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { about, company, socialProofStats } from '@/lib/data'
import { viewportDefault } from '@/lib/animations'
import { cn } from '@/lib/utils'

const PILLARS = [
  {
    icon: Target,
    title: 'Missão',
    body: about.mission,
    tone: 'from-accent/20 to-accent/5',
  },
  {
    icon: Eye,
    title: 'Visão',
    body: about.vision,
    tone: 'from-royal-light/20 to-royal-light/5',
  },
  {
    icon: Heart,
    title: 'Valores',
    body: about.values,
    tone: 'from-accent/20 to-royal/10',
  },
] as const

const TIMELINE = [
  {
    year: company.foundedYear,
    title: 'Fundação',
    body: `Israel de Correa funda a ${company.short} em São Paulo.`,
  },
  {
    year: 2014,
    title: 'Expansão',
    body: 'Chegada a novas regiões e setores com soluções ERP sob medida.',
  },
  {
    year: new Date().getFullYear(),
    title: 'Hoje',
    body: 'IA, analytics e cloud integrados à consultoria estratégica.',
  },
] as const

export function About() {
  return (
    <section
      id="sobre"
      aria-labelledby="about-heading"
      className="section-padding relative overflow-hidden"
    >
      {/* Decorative backdrop */}
      <div
        aria-hidden
        className="absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-accent/10 blur-[120px] pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -bottom-24 -right-24 h-[420px] w-[420px] rounded-full bg-royal-light/10 blur-[120px] pointer-events-none"
      />

      <div className="container-site relative">
        {/* Header — editorial split */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportDefault}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-14 lg:mb-20"
        >
          <div className="lg:col-span-7 flex flex-col gap-5">
            <SectionLabel>Sobre nós</SectionLabel>
            <h2
              id="about-heading"
              className="heading-lg font-display tracking-[-0.02em]"
            >
              Consultoria que entende{' '}
              <span className="text-accent italic">negócio</span>,
              <br />
              não apenas sistema.
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-4 lg:pb-3">
            <p className="body-text text-ink/80 text-base lg:text-[1.05rem] leading-relaxed">
              {about.p1}
            </p>
            <p className="body-text text-muted text-sm leading-relaxed">
              {about.p2}
            </p>
          </div>
        </motion.div>

        {/* Main grid: portrait panel + pillars */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Left — signature visual + timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportDefault}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <div
              role="img"
              aria-label={about.imageAlt}
              className="relative rounded-3xl overflow-hidden border border-border-blue shadow-royal"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=900&q=80"
                  alt="Consultoria estratégica e análise de dados"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-royal/95 via-royal/35 to-transparent mix-blend-multiply"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent"
                />
                <div
                  aria-hidden
                  className="absolute -top-8 -right-8 h-64 w-64 rounded-full bg-accent/25 blur-[80px] pointer-events-none"
                />

                {/* founder badge */}
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono uppercase text-[10px] tracking-[0.18em] text-white/75">
                      Fundador
                    </span>
                    <span className="font-display text-white text-lg italic">
                      {company.founder}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono uppercase text-[10px] tracking-[0.18em] text-white/75">
                      Desde
                    </span>
                    <div className="font-mono text-accent text-2xl font-bold tabular-nums leading-none">
                      {company.foundedYear}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline chips */}
            <ol className="grid grid-cols-3 gap-2">
              {TIMELINE.map((t, i) => (
                <li
                  key={t.year}
                  className={cn(
                    'relative rounded-xl border border-border bg-surface/60 p-3 flex flex-col gap-1',
                    'hover:border-border-blue transition-colors duration-300'
                  )}
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
                    {t.title}
                  </span>
                  <span className="font-display text-accent font-bold text-lg tabular-nums leading-none">
                    {t.year}
                  </span>
                  <span className="text-[11px] text-ink/70 leading-snug mt-0.5">
                    {t.body}
                  </span>
                  {i < TIMELINE.length - 1 && (
                    <span
                      aria-hidden
                      className="hidden sm:block absolute top-1/2 -right-[5px] h-px w-2 bg-border"
                    />
                  )}
                </li>
              ))}
            </ol>
          </motion.div>

          {/* Right — pillars + quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportDefault}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-7 flex flex-col gap-5"
          >
            <div className="grid sm:grid-cols-3 gap-4">
              {PILLARS.map(({ icon: Icon, title, body, tone }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportDefault}
                  transition={{
                    duration: 0.6,
                    delay: 0.25 + i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={cn(
                    'group relative overflow-hidden rounded-2xl border border-border bg-surface/70 p-5',
                    'hover:border-accent hover:shadow-glow transition-all duration-300 bg-card-shine',
                    'flex flex-col gap-3'
                  )}
                >
                  <div
                    aria-hidden
                    className={cn(
                      'absolute -top-12 -right-12 h-32 w-32 rounded-full blur-2xl opacity-0 group-hover:opacity-80 transition-opacity duration-500 bg-gradient-to-br',
                      tone
                    )}
                  />
                  <div className="relative h-10 w-10 rounded-lg bg-accent-dim border border-border-blue flex items-center justify-center">
                    <Icon className="h-5 w-5 text-accent" strokeWidth={1.75} />
                  </div>
                  <h3 className="relative font-display text-lg font-semibold text-ink">
                    {title}
                  </h3>
                  <p className="relative text-sm text-muted leading-relaxed">
                    {body}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Stats strip */}
            <div className="rounded-2xl border border-border-blue bg-surface/60 bg-card-shine px-5 py-6 lg:px-7 lg:py-7">
              <div className="flex items-center gap-2 mb-5">
                <Sparkles className="h-4 w-4 text-accent" />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  Nossa trajetória em números
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {socialProofStats.map((s) => (
                  <div key={s.label} className="flex flex-col gap-1">
                    <span className="font-mono font-bold text-accent tabular-nums leading-none text-[clamp(1.5rem,2.4vw,2rem)]">
                      {s.value}
                      {s.suffix ?? ''}
                    </span>
                    <span className="text-[11px] text-muted uppercase tracking-[0.08em] leading-snug">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote */}
            <figure className="relative rounded-2xl border border-border bg-surface/50 bg-card-shine p-6 lg:p-7">
              <span
                aria-hidden
                className="absolute -top-3 left-5 font-display text-accent text-5xl leading-none select-none"
              >
                &ldquo;
              </span>
              <blockquote className="font-display italic text-ink/90 text-lg lg:text-xl leading-relaxed">
                Fundada para transformar a forma como empresas enxergam seus
                próprios dados — e como agem sobre eles.
              </blockquote>
              <figcaption className="mt-4 flex items-center justify-between gap-3 text-xs">
                <span className="font-mono uppercase tracking-[0.15em] text-muted">
                  {company.founder} · Fundador
                </span>
                <a
                  href="#contato"
                  className="group inline-flex items-center gap-1 text-accent hover:text-accent/80 transition-colors"
                >
                  Fale com a equipe
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </figcaption>
            </figure>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
