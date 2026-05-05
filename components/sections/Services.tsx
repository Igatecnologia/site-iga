'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  BarChart3,
  Blocks,
  CloudCog,
  Factory,
  LineChart,
  Megaphone,
} from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { ServiceCard } from '@/components/ui/ServiceCard'
import { services } from '@/lib/data'
import { blurReveal, viewportDefault } from '@/lib/animations'

const serviceIcons = {
  'consultoria-erp': <CloudCog className="h-6 w-6" />,
  'implementacao-erp': <Blocks className="h-6 w-6" />,
  'analise-dados': <LineChart className="h-6 w-6" />,
  dashboards: <BarChart3 className="h-6 w-6" />,
  'gestao-mudancas': <Factory className="h-6 w-6" />,
  branding: <Megaphone className="h-6 w-6" />,
} as const

const proofItems = [
  'Diagnóstico antes da ferramenta',
  'Integração com operação real',
  'Indicadores acompanhados',
] as const

const pillars = [
  {
    label: '01',
    title: 'ERP e processos',
    text: 'Parametrização, integração e rotina operacional para o sistema trabalhar a favor da gestão.',
  },
  {
    label: '02',
    title: 'BI e dashboards',
    text: 'Indicadores executivos, painéis por área e governança para decisões com dado confiável.',
  },
  {
    label: '03',
    title: 'Automação aplicada',
    text: 'PDV, mobile, delivery, indústria e fluxos digitais conectados ao dia a dia da empresa.',
  },
] as const

export function Services() {
  return (
    <section
      id="servicos"
      aria-labelledby="services-heading"
      className="section-padding bg-surface relative overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-dots bg-[length:32px_32px] opacity-[0.05] pointer-events-none"
      />

      <div className="container-site relative">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-end mb-10 lg:mb-14">
          <motion.div
            variants={blurReveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewportDefault}
            className="lg:col-span-7 flex flex-col gap-5"
          >
            <SectionLabel>Três pilares de atuação</SectionLabel>
            <h2
              id="services-heading"
              className="font-display font-bold text-ink leading-[1.02] tracking-[-0.03em] text-[clamp(2rem,4.5vw,3.75rem)]"
            >
              Consultoria, dados e automação{' '}
              <span className="text-accent italic">no mesmo plano</span>,{' '}
              <br className="hidden sm:inline" />
              não em projetos isolados.
            </h2>
          </motion.div>
          <motion.p
            variants={blurReveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewportDefault}
            custom={1}
            className="lg:col-span-5 body-text text-body-lg lg:pb-2"
          >
            A IGA organiza o caminho entre sistema, operação e diretoria:
            primeiro entende o processo, depois conecta os dados e só então
            entrega painéis e automações que sustentam a rotina.
          </motion.p>
        </div>

        <div className="mb-8 grid gap-5 lg:grid-cols-3">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              variants={blurReveal}
              initial="hidden"
              whileInView="visible"
              viewport={viewportDefault}
              custom={i}
              className="rounded-2xl border border-border bg-bg p-6 shadow-sm"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                {pillar.label}
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-ink">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {pillar.text}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={blurReveal}
          initial="hidden"
          whileInView="visible"
          viewport={viewportDefault}
          custom={2}
          className="mb-8 grid grid-cols-1 gap-3 rounded-2xl border border-border bg-bg/70 p-3 shadow-sm sm:grid-cols-3"
        >
          {proofItems.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3"
            >
              <span className="h-2 w-2 shrink-0 rounded-full bg-accent shadow-[0_0_14px_rgba(74,144,217,0.7)]" />
              <span className="text-sm font-medium text-ink">{item}</span>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {services.map((service, i) => (
            <ServiceCard
              key={service.id}
              id={service.id}
              index={i}
              title={service.title}
              description={service.description}
              badge={service.badge}
              lottieSrc={service.lottieSrc}
              fallbackIcon={
                serviceIcons[service.id as keyof typeof serviceIcons]
              }
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportDefault}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-surface/50 px-6 py-5"
        >
          <p className="font-display text-ink text-base lg:text-lg max-w-xl">
            Quer ver nossos{' '}
            <span className="text-accent italic">produtos em detalhe</span>?{' '}
            <span className="text-muted">ERP, PDV e Mobile em uma página.</span>
          </p>
          <Link
            href="/solucoes"
            className="inline-flex items-center gap-2 font-mono uppercase text-[11px] tracking-[0.18em] text-accent hover:text-royal transition-colors group"
          >
            Ver todas as soluções
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
