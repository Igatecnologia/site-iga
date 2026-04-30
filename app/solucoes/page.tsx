import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { services, company } from '@/lib/data'
import { SolutionsList } from '@/components/sections/SolutionsList'

export const metadata: Metadata = {
  title: 'Soluções — IGA Tecnologia',
  description:
    'Conheça as soluções IGA: consultoria ERP, dashboards, análise de dados e gestão de mudanças para empresas que querem crescer com decisões baseadas em dados.',
  alternates: { canonical: `${company.site}/solucoes` },
}

type SolutionItem = {
  id: string
  title: string
  description: string
  badge: string
  lottieSrc?: string
  imageSrc?: string
  imageAlt?: string
  imageBg?: 'royal' | 'purple'
  highlights?: string[]
  inDevelopment?: boolean
}

type ProductOverride = {
  imageSrc: string
  imageAlt: string
  imageBg?: 'royal' | 'purple'
  title?: string
  description?: string
  badge?: string
  highlights?: string[]
}

const PRODUCT_BY_ID: Record<string, ProductOverride & { inDevelopment?: boolean }> = {
  'consultoria-erp': {
    imageSrc: '/product/dashboard-analise.png',
    imageAlt: 'Dashboard Analítico IGA — Faturamento, Ticket Médio, Clientes e Margem Bruta',
    imageBg: 'royal',
    title: 'Sistema de Dashboard Analítico IGA',
    description:
      'Plataforma própria da IGA para análise de dados consumindo sua operação via API: faturamento, ticket médio, clientes únicos, margem bruta, vendas diárias e faturamento mensal — tudo em um único painel, com filtros de 7, 30 ou 90 dias.',
    badge: 'Desenvolvimento IGA · API · Em construção',
    inDevelopment: true,
    highlights: [
      'KPIs essenciais: faturamento, ticket médio, clientes, margem',
      'Séries temporais de vendas diárias e faturamento mensal',
      'Filtros rápidos por período (7 / 30 / 90 dias)',
      'Módulos por área: ERP/Produção, Financeiro e Administração',
      'Em desenvolvimento — integração via API da IGA',
    ],
  },
  'implementacao-erp': {
    imageSrc: '/product/pdv.png',
    imageAlt: 'PDV ERP IGA — Caixa Completo',
    imageBg: 'royal',
    title: 'PDV ERP Caixa Completo',
    description:
      'Frente de caixa versátil com interface intuitiva e telas autodidáticas, banco de dados local e operação que não para quando a internet cai. Emissão fiscal completa e layouts customizáveis por segmento.',
    badge: 'Frente de caixa · Desktop',
    highlights: [
      'NFC-e, SAT, ECF e NF-e integrados',
      'TEF, s2Pay e PIX via QR Code',
      'Promoções por horário, valor ou quantidade mínima',
      'Integração com marketplaces (iFood, Nuvem Shop)',
      'Central de Vendas com resumo em tempo real',
    ],
  },
  'analise-dados': {
    imageSrc: '/product/sistema-mobile.png',
    imageAlt: 'Sistema PDV Mobile IGA — app e terminal POS',
    imageBg: 'purple',
    title: 'Sistema PDV Mobile',
    description:
      'Caixa embarcado em Android: mobilidade e versatilidade para o ponto de venda. Operação autodidática, sincronização automática em nuvem e suporte a auto-atendimento — vende no balcão, na rua ou na maquininha.',
    badge: 'Mobile · Android · Auto-atendimento',
    highlights: [
      'NFC-e e NF-e emitidos direto do aparelho',
      'PIX, QR Code e máquinas smart via s2Pay',
      'Leitura de código de barras nativa',
      'Modo auto-atendimento para reduzir erros',
      'Sincroniza com ERP, PDV e Comanda na mesma base',
    ],
  },
  dashboards: {
    imageSrc: '/product/erp-mobile.png',
    imageAlt: 'Sistema de Gerenciamento em Nuvem IGA — desktop e mobile',
    imageBg: 'royal',
    title: 'Sistema de Gerenciamento em Nuvem',
    description:
      'ERP completo com banco e estrutura em nuvem — independe de periféricos, precisa apenas de internet. Administra múltiplas empresas em um único endereço e entrega o sumarizado financeiro em tempo real.',
    badge: 'Cloud · Multi-loja · BI nativo',
    highlights: [
      'Acesso remoto em qualquer lugar e horário',
      'Servidores em data centers no Brasil',
      'Gestão centralizada multi-empresa e multi-loja',
      'Transferência de mercadorias entre estoques',
      'Integração com marketplaces e apps móveis nativos',
    ],
  },
  'gestao-mudancas': {
    imageSrc: '/product/deliveryvip.png',
    imageAlt: 'DeliveryVip — plataforma de delivery própria, site e app personalizados',
    imageBg: 'purple',
    title: 'DeliveryVip — Delivery sem comissão',
    description:
      'Seu site e aplicativo de delivery próprios, personalizados e sem taxas de comissão. Ideal para restaurantes, bares, pizzarias, supermercados, redes e franquias — com aumento de margem em até 30% ao sair das plataformas tradicionais.',
    badge: 'E-commerce · Delivery · Multi-setor',
    highlights: [
      'Site e app de delivery com sua marca, sem comissão',
      'Cardápio, entregas, cupons e atendimento integrados',
      'Descontos progressivos e ofertas dinâmicas',
      'Integração com Facebook Pixel, Instagram Shop e PDV',
      'Relatórios em tempo real e suporte de plantão',
    ],
  },
}

const EXTRA_SOLUTIONS: SolutionItem[] = [
  {
    id: 'gerenciamento-industrial',
    title: 'Sistema de Gerenciamento Industrial',
    description:
      'Controle completo de chão-de-fábrica: ordens de produção, acompanhamento de lotes, apontamento por funcionário e previsão de entrega. Do cadastro ao encerramento, toda a jornada da produção em um único sistema.',
    badge: 'Indústria · Ordens de produção',
    imageSrc: '/product/industria.png',
    imageAlt: 'Sistema de Gerenciamento Industrial — tela de ordens de produção',
    imageBg: 'royal',
    highlights: [
      'Cadastro e acompanhamento de ordens de produção',
      'Controle por lote, funcionário e data de entrega',
      'Busca avançada por código, período e status',
      'Importação e exportação de dados (CSV / XML)',
      'Relatórios gerenciais de produtividade e prazo',
    ],
  },
]

const solutions: SolutionItem[] = [
  ...services.map<SolutionItem>((s) => {
    const override = PRODUCT_BY_ID[s.id]
    const merged: SolutionItem = {
      ...s,
      ...(override ?? {}),
      highlights:
        override?.highlights ?? [
          'Diagnóstico personalizado',
          'Implementação acompanhada',
          'Resultados mensuráveis',
        ],
    }
    if (override?.inDevelopment) merged.inDevelopment = true
    // limpar imageSrc se for placeholder (undefined via cast)
    if (!override?.imageSrc) merged.imageSrc = undefined
    return merged
  }),
  ...EXTRA_SOLUTIONS,
]

export default function SolucoesPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        {/* Hero */}
        <section
          id="solucoes-hero"
          className="theme-dark relative overflow-hidden bg-bg pt-[140px] pb-[clamp(3rem,6vw,5rem)]"
        >
          <div
            aria-hidden
            className="absolute inset-0 bg-dots bg-[length:28px_28px] opacity-[0.12]"
          />
          <div
            aria-hidden
            className="absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full bg-accent/15 blur-[120px]"
          />
          <div
            aria-hidden
            className="absolute -bottom-32 -right-32 h-[520px] w-[520px] rounded-full bg-royal-light/15 blur-[120px]"
          />

          <div className="container-site relative">
            <div className="flex flex-col items-start gap-5 max-w-3xl">
              <SectionLabel className="text-white before:bg-accent">
                Soluções IGA
              </SectionLabel>
              <h1
                className="font-display font-black text-ink tracking-[-0.03em] leading-[0.95]"
                style={{ fontSize: 'clamp(2.25rem, 6vw, 4.5rem)' }}
              >
                Soluções que{' '}
                <span className="italic text-accent">geram resultado</span>,
                não apenas relatórios.
              </h1>
              <p className="body-text text-ink/80 text-base lg:text-lg max-w-[58ch] leading-relaxed">
                Do ERP ao BI, entregamos o ciclo completo — diagnóstico,
                implementação, dashboards e evolução contínua. Cada solução é
                desenhada sob medida para o seu negócio.
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <Button
                  asChild
                  variant="primary"
                  size="md"
                  leadingIcon={<MessageCircle className="h-4 w-4" />}
                >
                  <a
                    href={company.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Fale com um especialista
                  </a>
                </Button>
                <Link
                  href="/#contato"
                  className="inline-flex items-center gap-2 text-ink/90 hover:text-white font-body font-medium text-sm transition-colors group"
                >
                  Enviar briefing
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Solutions list */}
        <section className="section-padding relative bg-bg">
          <SolutionsList solutions={solutions} />
        </section>

        {/* Final CTA */}
        <section className="section-padding bg-bg">
          <div className="container-site">
            <div className="theme-dark relative overflow-hidden rounded-[2rem] border border-border-blue bg-royal-grad p-10 sm:p-14 lg:p-16">
              <div
                aria-hidden
                className="absolute inset-0 bg-dots bg-[length:28px_28px] opacity-[0.18]"
              />
              <div
                aria-hidden
                className="absolute -top-20 -right-20 h-[360px] w-[360px] rounded-full bg-accent/20 blur-[100px]"
              />

              <div className="relative grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 flex flex-col gap-3">
                  <SectionLabel className="text-white before:bg-accent">
                    Pronto para começar?
                  </SectionLabel>
                  <h2 className="heading-lg font-display text-white tracking-[-0.02em]">
                    Vamos desenhar a{' '}
                    <span className="italic text-accent">solução ideal</span>{' '}
                    para sua operação.
                  </h2>
                </div>
                <div className="lg:col-span-4 flex flex-wrap gap-3 lg:justify-end">
                  <Button
                    asChild
                    variant="primary"
                    size="lg"
                    leadingIcon={<MessageCircle className="h-5 w-5" />}
                    className="bg-white text-royal hover:bg-ink after:hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                  >
                    <a
                      href={company.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Estratégia gratuita
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
