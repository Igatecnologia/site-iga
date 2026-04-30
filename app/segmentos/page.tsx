import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  Building2,
  Factory,
  MessageCircle,
  ShoppingBag,
  Utensils,
} from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { company } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Segmentos atendidos — ERP, BI e automação | IGA Tecnologia',
  description:
    'Soluções de consultoria ERP, dashboards, BI e automação para varejo, indústria, serviços e alimentação/delivery.',
  alternates: { canonical: `${company.site}/segmentos` },
}

const segments = [
  {
    icon: ShoppingBag,
    title: 'Varejo e redes',
    description:
      'Integração entre PDV, estoque, financeiro, vendas e indicadores para reduzir retrabalho e melhorar margem.',
    pains: ['Fechamento lento', 'Estoque sem visibilidade', 'Vendas sem leitura gerencial'],
    outcomes: ['Curva ABC e giro', 'Dashboards por loja', 'Rotina comercial acompanhada'],
  },
  {
    icon: Factory,
    title: 'Indústria',
    description:
      'Controle de produção, custos, ordens, lotes e indicadores operacionais conectados à gestão executiva.',
    pains: ['Produção em planilhas', 'Custos sem rastreio', 'Prazos pouco previsíveis'],
    outcomes: ['Indicadores de produção', 'Visão de margem', 'Acompanhamento por etapa'],
  },
  {
    icon: Building2,
    title: 'Serviços',
    description:
      'Organização de contratos, financeiro, faturamento, atendimento e produtividade com dados confiáveis.',
    pains: ['Receita pouco previsível', 'Processos manuais', 'Baixa visão por cliente'],
    outcomes: ['KPIs por carteira', 'Fluxos padronizados', 'Painéis de gestão'],
  },
  {
    icon: Utensils,
    title: 'Alimentação e delivery',
    description:
      'PDV, delivery, pedidos, financeiro e operação conectados para dar controle à gestão diária.',
    pains: ['Canais desconectados', 'Comissão alta', 'Controle frágil de pedidos'],
    outcomes: ['Delivery próprio', 'PDV integrado', 'Indicadores de venda e operação'],
  },
] as const

const diagnostics = [
  'Quais sistemas existem hoje e onde o processo trava',
  'Quais dados são confiáveis e quais precisam ser saneados',
  'Quais indicadores a diretoria precisa acompanhar toda semana',
  'Qual automação gera retorno mais rápido para a operação',
] as const

export default function SegmentosPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <section className="theme-dark relative overflow-hidden bg-bg pt-[140px] pb-[clamp(3.5rem,7vw,6rem)]">
          <div
            aria-hidden
            className="absolute inset-0 bg-dots bg-[length:28px_28px] opacity-[0.12]"
          />
          <div
            aria-hidden
            className="absolute -top-32 -right-24 h-[520px] w-[520px] rounded-full bg-accent/15 blur-[120px]"
          />

          <div className="container-site relative">
            <div className="max-w-4xl">
              <SectionLabel className="text-white before:bg-accent">
                Segmentos atendidos
              </SectionLabel>
              <h1
                className="mt-5 font-display font-black text-ink leading-[0.98] tracking-[-0.03em]"
                style={{ fontSize: 'clamp(2.25rem,6vw,4.75rem)' }}
              >
                ERP e BI precisam respeitar{' '}
                <span className="text-accent italic">a rotina do seu setor</span>.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/78 lg:text-lg">
                A IGA adapta processos, dashboards e automações ao modo como
                sua operação vende, produz, entrega, fatura e decide.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  asChild
                  variant="primary"
                  size="lg"
                  leadingIcon={<MessageCircle className="h-5 w-5" />}
                >
                  <a
                    href={company.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Falar com especialista
                  </a>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link href="/solucoes">Ver soluções</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-bg">
          <div className="container-site">
            <div className="grid gap-5 lg:grid-cols-2">
              {segments.map(({ icon: Icon, title, description, pains, outcomes }) => (
                <article
                  key={title}
                  className="rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all duration-300 hover:border-border-blue hover:shadow-md lg:p-8"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-border-blue bg-accent/10 text-accent">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-ink">
                    {title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {description}
                  </p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                        Dores comuns
                      </span>
                      <ul className="mt-3 flex flex-col gap-2">
                        {pains.map((item) => (
                          <li key={item} className="text-sm text-ink/80">
                            - {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                        Ganhos buscados
                      </span>
                      <ul className="mt-3 flex flex-col gap-2">
                        {outcomes.map((item) => (
                          <li key={item} className="text-sm text-ink/80">
                            - {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-surface">
          <div className="container-site">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5">
                <SectionLabel>Diagnóstico por segmento</SectionLabel>
                <h2 className="mt-4 heading-lg">
                  Antes de vender tecnologia, entendemos{' '}
                  <span className="text-accent italic">o fluxo real</span>.
                </h2>
              </div>
              <div className="lg:col-span-7">
                <div className="grid gap-3 sm:grid-cols-2">
                  {diagnostics.map((item, i) => (
                    <div
                      key={item}
                      className="rounded-xl border border-border bg-bg p-4"
                    >
                      <span className="font-mono text-[11px] text-accent">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p className="mt-2 text-sm leading-relaxed text-ink">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border-blue bg-bg p-6">
              <div>
                <p className="font-display text-xl font-semibold text-ink">
                  Quer avaliar o cenário da sua operação?
                </p>
                <p className="mt-1 text-sm text-muted">
                  Envie um briefing e retornamos com um caminho inicial.
                </p>
              </div>
              <Link
                href="/#contato"
                className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-accent transition-colors hover:text-royal"
              >
                Solicitar diagnóstico
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
