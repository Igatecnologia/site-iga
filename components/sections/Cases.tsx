'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Factory,
  LineChart,
  ShoppingBag,
} from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { fadeUp, viewportDefault } from '@/lib/animations'
import { cn } from '@/lib/utils'

const cases = [
  {
    id: 'industria',
    icon: Factory,
    client: 'Operação industrial',
    metric: '+21%',
    metricLabel: 'receita em 6 meses',
    title: 'De planilhas a dashboards em tempo real',
    problem: 'A diretoria dependia de planilhas manuais e indicadores divergentes por área.',
    action: 'Integramos dados do ERP, saneamos bases críticas e criamos um painel executivo de acompanhamento.',
    result: 'Mais visibilidade sobre produção, faturamento e margem para decisões semanais.',
    indicators: ['Produção', 'Faturamento', 'Margem'],
  },
  {
    id: 'varejo',
    icon: ShoppingBag,
    client: 'Rede de varejo',
    metric: '-40%',
    metricLabel: 'tempo de fechamento',
    title: 'ERP fluido e gestão de alto impacto',
    problem: 'O fechamento mensal era lento, com conferências repetidas entre financeiro, estoque e vendas.',
    action: 'Revisamos parametrizações, padronizamos rotinas e conectamos os relatórios ao fluxo de gestão.',
    result: 'Menos retrabalho no backoffice e mais previsibilidade para a liderança.',
    indicators: ['Vendas', 'Estoque', 'Financeiro'],
  },
  {
    id: 'servicos',
    icon: BarChart3,
    client: 'Empresa de serviços',
    metric: '+16%',
    metricLabel: 'eficiência operacional',
    title: 'Dados centralizados, decisão imediata',
    problem: 'Cada área acompanhava a operação por fontes diferentes, sem visão consolidada do negócio.',
    action: 'Centralizamos as fontes, definimos KPIs e montamos uma rotina de análise gerencial.',
    result: 'Gestores passaram a acompanhar prioridades com indicadores únicos e comparáveis.',
    indicators: ['Contratos', 'Receita', 'Produtividade'],
  }
]

export function Cases() {
  return (
    <section id="cases" className="section-padding bg-bg">
      <div className="container-site">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportDefault}
          className="flex flex-col items-center text-center gap-5 max-w-2xl mx-auto mb-16 lg:mb-24"
        >
          <SectionLabel>Cases & Resultados</SectionLabel>
          <h2 className="heading-lg">
            Consultoria que gera <span className="text-accent italic">impacto real</span>
          </h2>
          <p className="body-text mx-auto">
            Exemplos anonimizados de desafios comuns em ERP, BI e operação.
            O foco é mostrar a lógica de entrega: cenário, intervenção e
            resultado mensurável.
          </p>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-3">
          {cases.map((c, i) => (
            <motion.article
              key={c.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportDefault}
              custom={i}
              className="group relative flex min-h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all duration-300 hover:border-border-blue hover:shadow-md"
            >
              <CaseVisual caseItem={c} index={i} />

              <div className="flex flex-1 flex-col p-6 lg:p-7">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                  Case anonimizado / {c.client}
                </span>
                
                <div className="mb-6 mt-5 flex items-baseline gap-3">
                  <span className="font-display font-black text-ink text-5xl sm:text-6xl tabular-nums tracking-tighter">
                    {c.metric}
                  </span>
                  <span className="max-w-[110px] font-body text-sm font-medium leading-snug text-muted">
                    {c.metricLabel}
                  </span>
                </div>

                <h3 className="mb-5 font-display text-2xl font-semibold leading-tight text-ink">
                  {c.title}
                </h3>
                
                <div className="mb-8 grid gap-3">
                  {[
                    ['Cenário', c.problem],
                    ['Ação IGA', c.action],
                    ['Resultado', c.result],
                  ].map(([label, text]) => (
                    <div
                      key={label}
                      className="flex items-start gap-3 rounded-xl border border-border bg-bg/70 p-4"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <p className="text-sm leading-relaxed text-muted">
                        <span className="font-semibold text-ink">{label}:</span>{' '}
                        {text}
                      </p>
                    </div>
                  ))}
                </div>

                <a href="#contato" className="inline-flex items-center gap-2 text-sm font-semibold text-royal hover:text-accent transition-colors group/link mt-auto w-fit">
                  Quero resultados assim
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function CaseVisual({
  caseItem,
  index,
}: {
  caseItem: (typeof cases)[number]
  index: number
}) {
  const Icon = caseItem.icon
  const bars = [
    ['h-[42%]', 'bg-royal/45'],
    ['h-[68%]', 'bg-accent/80'],
    ['h-[54%]', 'bg-royal-light/65'],
    ['h-[82%]', 'bg-accent'],
  ] as const

  return (
    <div className="theme-dark relative min-h-[260px] overflow-hidden border-b border-border-blue bg-royal-grad p-6">
      <div
        aria-hidden
        className="absolute inset-0 bg-dots bg-[length:24px_24px] opacity-[0.16]"
      />
      <div
        aria-hidden
        className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/25 blur-[90px]"
      />
      <div className="relative flex h-full min-h-[212px] flex-col justify-between">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-accent backdrop-blur-sm">
            <Icon className="h-6 w-6" />
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/55">
            {String(index + 1).padStart(2, '0')} / 03
          </span>
        </div>

        <div className="rounded-2xl border border-white/12 bg-black/20 p-4 backdrop-blur-sm">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">
                Painel gerencial
              </span>
              <p className="mt-1 font-display text-lg font-semibold text-white">
                Indicadores conectados
              </p>
            </div>
            <LineChart className="h-5 w-5 text-accent" />
          </div>

          <div className="flex h-24 items-end gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
            {bars.map(([height, color], i) => (
              <div key={i} className="flex h-full flex-1 items-end">
                <div
                  className={cn(
                    'w-full rounded-t-md shadow-[0_0_18px_rgba(74,144,217,0.25)]',
                    height,
                    color
                  )}
                />
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {caseItem.indicators.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/12 bg-white/8 px-3 py-1 text-xs text-white/75"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
