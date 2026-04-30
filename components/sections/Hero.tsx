'use client'

import * as React from 'react'
import { motion, LazyMotion, domAnimation } from 'framer-motion'
import { ChevronDown, MessageCircle } from 'lucide-react'
import { GooeyText } from '@/components/ui/gooey-text-morphing'
import { company } from '@/lib/data'
import { cn } from '@/lib/utils'

const MORPH_WORDS = [
  'viram decisão.',
  'viram lucro.',
  'viram controle.',
  'viram escala.',
] as const

export function Hero() {
  const yearsActive = new Date().getFullYear() - company.foundedYear

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="home"
        className="theme-dark relative w-full overflow-hidden bg-bg pb-16 pt-32 font-light text-white antialiased md:pb-20 md:pt-36"
        style={{
          background:
            'linear-gradient(135deg, #040913 0%, #081427 42%, #0B2140 72%, #050B15 100%)',
        }}
      >
        {/* Abstract live backdrop */}
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.36]"
            style={{
              backgroundImage:
                'linear-gradient(135deg, rgba(74,144,217,0.00) 0%, rgba(74,144,217,0.14) 42%, rgba(74,144,217,0.03) 60%, rgba(74,144,217,0.00) 100%), linear-gradient(90deg, rgba(74,144,217,0.06) 0%, rgba(74,144,217,0.00) 35%, rgba(74,144,217,0.10) 70%, rgba(74,144,217,0.00) 100%)',
              backgroundSize: '100% 100%, 100% 100%',
            }}
          />
          <div className="absolute -top-24 right-[-12rem] h-[34rem] w-[34rem] rotate-[-18deg] rounded-[6rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(74,144,217,0.16),rgba(255,255,255,0.02))] blur-[90px] opacity-70" />
          <div className="absolute top-[-10rem] right-[-18rem] h-[40rem] w-[8rem] rotate-[-18deg] bg-[linear-gradient(180deg,rgba(255,255,255,0.10),rgba(74,144,217,0.34),rgba(255,255,255,0.02))] blur-[72px] opacity-70" />
          <div className="absolute top-[-8rem] right-[-10rem] h-[38rem] w-[8rem] rotate-[-18deg] bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(27,94,166,0.28),rgba(255,255,255,0.02))] blur-[72px] opacity-65" />
          <div className="absolute bottom-[-14rem] left-[-8rem] h-[32rem] w-[32rem] rotate-[-18deg] rounded-[5rem] bg-[linear-gradient(180deg,rgba(6,13,26,0.0),rgba(74,144,217,0.12),rgba(255,255,255,0.02))] blur-[110px] opacity-90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_56%_at_50%_38%,rgba(74,144,217,0.18)_0%,rgba(27,94,166,0.08)_34%,rgba(6,13,26,0.0)_56%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,13,26,0.08)_0%,rgba(6,13,26,0.24)_36%,rgba(6,13,26,0.70)_100%)]" />
          <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,0.9)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.9)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_65%_52%_at_50%_42%,black,transparent_78%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.22)_50%,transparent_100%)] opacity-80" />
        </div>

        {/* Corner accents */}
        <div
          aria-hidden
          className="absolute right-0 top-0 h-1/2 w-1/2 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 70% 30%, rgba(74,144,217,0.10) 0%, rgba(6,13,26,0) 60%)',
          }}
        />
        <div
          aria-hidden
          className="absolute left-0 top-0 h-1/2 w-1/2 -scale-x-100 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 70% 30%, rgba(27,94,166,0.10) 0%, rgba(6,13,26,0) 60%)',
          }}
        />

        {/* Subtle grid */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.05] [mask-image:radial-gradient(ellipse_72%_56%_at_50%_40%,black,transparent_76%)] pointer-events-none"
          style={{
            backgroundSize: '72px 72px',
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          }}
        />

        {/* Bottom legibility fade */}
        <div
          aria-hidden
          className="absolute bottom-0 inset-x-0 h-40 bg-[linear-gradient(180deg,transparent_0%,rgba(6,13,26,0.85)_70%,#060D1A_100%)] pointer-events-none z-10"
        />

        <div className="container relative z-10 mx-auto max-w-2xl px-4 text-center md:max-w-4xl md:px-6 lg:max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1
              className="mx-auto mb-2 max-w-4xl font-display font-light leading-[0.95] tracking-[-0.035em]"
              style={{ fontSize: 'clamp(2.25rem, 6vw, 5rem)' }}
            >
              ERP, dados e processos
              <br />
              alinhados para
            </h1>

            <div
              className="mx-auto mb-6 mt-2 relative"
              style={{ height: 'clamp(2.6rem, 6.4vw, 5.2rem)' }}
              aria-label={`Em: ${MORPH_WORDS.join(', ')}`}
            >
              <GooeyText
                texts={MORPH_WORDS as unknown as string[]}
                morphTime={1.1}
                cooldownTime={1.5}
                className="h-full w-full"
                textClassName={cn(
                  'font-display italic font-light text-accent',
                  'tracking-[-0.025em] leading-none whitespace-nowrap',
                  '!text-[clamp(2.25rem,6vw,5rem)]'
                )}
              />
            </div>

            <p className="mx-auto mb-10 mt-8 max-w-2xl text-base text-white/65 md:text-lg leading-relaxed">
              Há {yearsActive} anos ajudamos empresas a sair de ERPs
              subutilizados, planilhas paralelas e indicadores inconsistentes
              para uma gestão com{' '}
              <span className="text-white">processos integrados</span>,{' '}
              <span className="text-accent">dashboards confiáveis</span> e{' '}
              <span className="text-white">decisões em tempo real</span>.
            </p>

            <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={company.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'neumorphic-button group inline-flex items-center justify-center gap-2',
                  'w-full sm:w-auto rounded-full px-8 py-4',
                  'border border-white/10 bg-gradient-to-b from-white/10 to-white/5',
                  'text-white font-medium shadow-lg',
                  'transition-all duration-300',
                  'hover:border-accent/40 hover:shadow-[0_0_24px_rgba(74,144,217,0.35)]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#060D1A]'
                )}
              >
                <MessageCircle className="h-4 w-4 relative z-10" />
                <span className="relative z-10">
                  Agendar diagnóstico gratuito
                </span>
              </a>

              <a
                href="#servicos"
                className="flex w-full items-center justify-center gap-2 text-white/70 transition-colors hover:text-white sm:w-auto"
              >
                <span>Ver problemas que resolvemos</span>
                <ChevronDown className="h-4 w-4" strokeWidth={1.5} />
              </a>
            </div>
          </motion.div>

          {/* Proof strip */}
          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            className="mx-auto grid grid-cols-3 gap-6 max-w-2xl border-t border-white/10 pt-8"
          >
            {[
              { n: yearsActive.toString(), s: '', l: 'anos de mercado' },
              { n: '200', s: '+', l: 'empresas atendidas' },
              { n: '3', s: '', l: 'pilares de atuação' },
            ].map((item) => (
              <div key={item.l} className="flex flex-col items-center gap-2">
                <dd className="flex items-baseline gap-0.5">
                  <span className="font-display font-light text-white tabular-nums text-[clamp(1.75rem,3vw,2.5rem)] leading-none">
                    {item.n}
                  </span>
                  <span className="font-display font-light text-accent text-[clamp(1rem,1.6vw,1.25rem)] leading-none">
                    {item.s}
                  </span>
                </dd>
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45 text-center">
                  {item.l}
                </dt>
              </div>
            ))}
          </motion.dl>
        </div>
      </section>
    </LazyMotion>
  )
}
