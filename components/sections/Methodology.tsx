'use client'

import * as React from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Search, Compass, Rocket, TrendingUp } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { viewportDefault } from '@/lib/animations'
import { cn } from '@/lib/utils'

const steps = [
  {
    icon: Search,
    title: 'Diagnóstico 360°',
    description: 'Analisamos seus gargalos de dados, ERPs subutilizados e processos manuais que estão drenando o seu lucro.',
    color: 'bg-blue-500',
  },
  {
    icon: Compass,
    title: 'Estratégia de Dados',
    description: 'Desenhamos a arquitetura ideal: do saneamento da base à criação de dashboards que realmente respondem perguntas de negócio.',
    color: 'bg-royal',
  },
  {
    icon: Rocket,
    title: 'Implementação Ágil',
    description: 'Colocamos a mão na massa. Parametrizamos sistemas, integramos bases e entregamos a "fonte única da verdade".',
    color: 'bg-accent',
  },
  {
    icon: TrendingUp,
    title: 'Crescimento Contínuo',
    description: 'Não apenas instalamos e saímos. Acompanhamos a evolução dos indicadores para garantir escalabilidade real.',
    color: 'bg-emerald-500',
  },
]

export function Methodology() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <section id="metodologia" className="section-padding bg-bg relative overflow-hidden">
      <div 
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-full bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(27,94,166,0.15),transparent)] pointer-events-none" 
      />
      <div className="container-site">
        <div className="flex flex-col items-center text-center mb-16 lg:mb-24">
          <SectionLabel>Nosso Método</SectionLabel>
          <h2 className="heading-lg font-display mt-4">
            Como transformamos <br /> <span className="text-accent italic">caos em lucro</span>
          </h2>
          <p className="body-text text-body-lg max-w-2xl mt-6">
            Uma abordagem consultiva em 4 etapas focada em destravar o potencial da sua operação.
          </p>
        </div>

        <div ref={containerRef} className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-[20px] lg:left-1/2 lg:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-border/40">
            <motion.div
              className="absolute top-0 left-0 w-full bg-accent origin-top"
              style={{ scaleY }}
            />
          </div>

          <div className="flex flex-col gap-16 lg:gap-24">
            {steps.map((step, i) => (
              <StepItem 
                key={step.title} 
                step={step} 
                index={i} 
                progress={scrollYProgress} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function StepItem({ step, index, progress }: { step: typeof steps[0], index: number, progress: any }) {
  const isEven = index % 2 === 0
  const Icon = step.icon

  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
      {/* Circle Marker */}
      <div className="absolute left-[20px] lg:left-1/2 lg:-translate-x-1/2 top-0 z-10">
        <div className="h-10 w-10 rounded-full bg-bg border-2 border-border flex items-center justify-center">
          <div className={cn("h-3 w-3 rounded-full", step.color)} />
        </div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "pl-14 lg:pl-0",
          isEven ? "lg:text-right lg:pr-12" : "lg:order-2 lg:pl-12"
        )}
      >
        <div className={cn(
          "inline-flex p-3 rounded-2xl bg-surface border border-border mb-4",
          isEven ? "lg:ml-auto" : ""
        )}>
          <Icon className="h-6 w-6 text-accent" />
        </div>
        <h3 className="text-2xl font-display font-bold text-ink mb-3">{step.title}</h3>
        <p className="text-muted leading-relaxed text-[0.95rem] max-w-sm ml-0 mr-auto lg:mx-0 lg:inline-block">
          {step.description}
        </p>
      </motion.div>

      {/* Spacing for mobile / Desktop layout */}
      <div className="hidden lg:block" />
    </div>
  )
}
