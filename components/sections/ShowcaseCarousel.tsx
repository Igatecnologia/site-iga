'use client'

import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'
import { motion } from 'framer-motion'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { fadeUp, viewportDefault } from '@/lib/animations'

const slides = [
  {
    title: 'Reunião executiva',
    text: 'A leitura do negócio ganha clareza quando diretoria e operação olham para os mesmos números.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80',
    tag: 'Diretoria / decisão',
  },
  {
    title: 'Diagnóstico de processo',
    text: 'O trabalho começa entendendo gargalos, rotinas manuais e pontos onde a operação perde ritmo.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80',
    tag: 'Consultoria / operação',
  },
  {
    title: 'Time alinhado',
    text: 'Quando indicadores, áreas e responsabilidades convergem, a empresa passa a andar com menos ruído.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80',
    tag: 'Equipe / alinhamento',
  },
  {
    title: 'Análise em campo',
    text: 'A tecnologia só faz sentido quando acompanha a rotina real de quem vende, produz e atende.',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80',
    tag: 'Gestão / rotina',
  },
] as const

export function ShowcaseCarousel() {
  return (
    <section
      aria-labelledby="showcase-heading"
      className="section-padding relative overflow-hidden bg-bg"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_55%_40%_at_50%_0%,rgba(74,144,217,0.14),transparent_68%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-dots bg-[length:30px_30px] opacity-[0.05]"
      />

      <div className="container-site relative">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportDefault}
          className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl">
            <SectionLabel>Carrossel de soluções</SectionLabel>
            <h2
              id="showcase-heading"
              className="mt-4 font-display text-[clamp(2rem,4.5vw,3.75rem)] font-bold leading-[1.02] tracking-[-0.03em] text-ink"
            >
              O negócio precisa parecer{' '}
              <span className="text-accent italic">real na primeira tela</span>.
            </h2>
          </div>
          <p className="max-w-xl body-text text-body-lg">
            Este carrossel mostra o contexto da entrega: pessoas, rotinas,
            diagnóstico e decisão. A tecnologia entra como consequência.
          </p>
        </motion.div>

        <Carousel
          opts={{ loop: true, align: 'start' }}
          plugins={[
            Autoplay({
              delay: 4500,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]}
          className="relative"
        >
          <CarouselContent className="-ml-5">
            {slides.map((slide) => (
              <CarouselItem
                key={slide.title}
                className="pl-5 md:basis-1/2 xl:basis-1/3"
              >
                <article className="group h-full overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all duration-300 hover:border-border-blue hover:shadow-md">
                  <div className="theme-dark relative aspect-[4/3] overflow-hidden border-b border-border-blue bg-royal-grad">
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-dots bg-[length:24px_24px] opacity-[0.14]"
                    />
                    <div
                      aria-hidden
                      className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-accent/20 blur-[90px]"
                    />
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      sizes="(max-width: 1280px) 90vw, 33vw"
                      className="object-contain p-5 transition-transform duration-700 group-hover:scale-[1.03]"
                      priority={slide.title === 'Reunião executiva'}
                    />
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,transparent_0%,rgba(6,13,26,0.75)_100%)]" />
                    <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">
                      {slide.tag}
                    </span>
                  </div>

                  <div className="flex h-full flex-col gap-3 p-6">
                    <h3 className="font-display text-2xl font-semibold text-ink">
                      {slide.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted">
                      {slide.text}
                    </p>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="mt-6 flex items-center justify-center gap-3">
            <CarouselPrevious className="static translate-y-0 border-border-blue bg-surface text-ink hover:bg-accent-dim hover:text-ink" />
            <CarouselNext className="static translate-y-0 border-border-blue bg-surface text-ink hover:bg-accent-dim hover:text-ink" />
          </div>
        </Carousel>
      </div>
    </section>
  )
}
