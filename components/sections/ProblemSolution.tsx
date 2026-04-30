'use client'

import { motion } from 'framer-motion'
import {
  AlertTriangle,
  CheckCircle2,
  DatabaseZap,
  FileSpreadsheet,
  Gauge,
  GitBranch,
} from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { blurReveal, viewportDefault } from '@/lib/animations'
import { cn } from '@/lib/utils'

const problems = [
  {
    icon: FileSpreadsheet,
    title: 'Planilhas paralelas',
    pain: 'Números divergentes entre financeiro, vendas, estoque e diretoria.',
    outcome: 'Base única para acompanhar indicadores críticos sem retrabalho.',
  },
  {
    icon: GitBranch,
    title: 'ERP subutilizado',
    pain: 'Sistema implantado, mas processos continuam manuais e desconectados.',
    outcome: 'Parametrização, integração e rotina operacional alinhadas ao negócio.',
  },
  {
    icon: AlertTriangle,
    title: 'Decisão sem confiança',
    pain: 'Reuniões gastam tempo discutindo qual número está correto.',
    outcome: 'Dashboards gerenciais com KPIs claros, origem definida e atualização contínua.',
  },
] as const

const outcomes = [
  'Diagnóstico do processo antes da ferramenta',
  'Integração entre operação, ERP e BI',
  'Indicadores para diretoria, gestão e operação',
] as const

export function ProblemSolution() {
  return (
    <section
      id="problemas"
      aria-labelledby="problems-heading"
      className="section-padding relative overflow-hidden bg-bg"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-dots bg-[length:30px_30px] opacity-[0.06] pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-0 h-[420px] w-[min(920px,90vw)] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]"
      />

      <div className="container-site relative">
        <motion.div
          variants={blurReveal}
          initial="hidden"
          whileInView="visible"
          viewport={viewportDefault}
          className="grid gap-8 lg:grid-cols-12 lg:items-end"
        >
          <div className="lg:col-span-7 flex flex-col gap-5">
            <SectionLabel>Problemas que resolvemos</SectionLabel>
            <h2
              id="problems-heading"
              className="font-display font-bold text-ink leading-[1.02] tracking-[-0.03em] text-[clamp(2rem,4.5vw,3.75rem)]"
            >
              Quando o ERP não conversa com a gestão,{' '}
              <span className="text-accent italic">a empresa perde ritmo</span>.
            </h2>
          </div>
          <p className="lg:col-span-5 body-text text-body-lg lg:pb-2">
            A IGA entra onde a maioria dos projetos trava: no espaço entre
            sistema, processo, dado e decisão. O objetivo é transformar
            informação dispersa em rotina de gestão confiável.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {problems.map(({ icon: Icon, title, pain, outcome }, i) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={viewportDefault}
              transition={{ duration: 0.65, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all duration-300 hover:border-border-blue hover:shadow-md"
            >
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-border-blue bg-accent/10 text-accent">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-semibold text-ink">
                {title}
              </h3>
              <div className="mt-5 flex flex-col gap-4">
                <div className="rounded-xl border border-red-200/60 bg-red-50 p-4 text-sm leading-relaxed text-red-800">
                  <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.16em] text-red-600">
                    Cenário comum
                  </span>
                  {pain}
                </div>
                <div className="rounded-xl border border-border-blue bg-accent/10 p-4 text-sm leading-relaxed text-ink">
                  <span className="mb-1 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Resultado esperado
                  </span>
                  {outcome}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportDefault}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-8 grid gap-3 rounded-2xl border border-border-blue bg-surface/70 p-3 shadow-sm md:grid-cols-3"
        >
          {outcomes.map((item, i) => {
            const Icon = i === 0 ? Gauge : i === 1 ? DatabaseZap : CheckCircle2
            return (
              <div
                key={item}
                className={cn(
                  'flex items-center gap-3 rounded-xl border border-border bg-bg px-4 py-3',
                  i === 1 && 'border-border-blue bg-accent/10'
                )}
              >
                <Icon className="h-4 w-4 shrink-0 text-accent" />
                <span className="text-sm font-medium text-ink">{item}</span>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
