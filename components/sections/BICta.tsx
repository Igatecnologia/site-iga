'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2, ArrowRight, MessageCircle, Play } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { biCtaBullets, company } from '@/lib/data'
import { cn } from '@/lib/utils'

const YT_ID = 'WWw7opFHsTQ'

export function BICta() {
  const [playing, setPlaying] = React.useState(false)

  return (
    <section
      aria-labelledby="bi-heading"
      className="section-padding relative bg-bg"
    >
      <div className="container-site">
        <div className="theme-dark relative overflow-hidden rounded-[2rem] border border-border-blue bg-royal-grad">
          <div
            aria-hidden
            className="absolute inset-0 bg-dots bg-[length:28px_28px] opacity-[0.18]"
          />
          <div
            aria-hidden
            className="absolute -top-20 -right-20 h-[400px] w-[400px] rounded-full bg-accent/20 blur-[100px]"
          />
          <div
            aria-hidden
            className="absolute -bottom-20 -left-20 h-[300px] w-[300px] rounded-full bg-royal-light/30 blur-[100px]"
          />

          <div className="relative grid lg:grid-cols-12 gap-10 lg:gap-12 p-8 sm:p-12 lg:p-16 items-center">
            <div className="lg:col-span-5 flex flex-col gap-5">
              <SectionLabel className="text-white font-semibold tracking-[0.2em] before:bg-accent before:h-[2px] before:w-8 [text-shadow:0_2px_8px_rgba(0,0,0,0.4)]">
                Business Intelligence
              </SectionLabel>
              <h2
                id="bi-heading"
                className="heading-lg font-display text-white tracking-[-0.02em]"
              >
                Descubra o{' '}
                <span className="italic text-accent">Poder do BI</span>
              </h2>
              <p className="text-white/80 text-lg lg:text-xl leading-relaxed font-display italic">
                Dashboards para tomadas de decisões assertivas.
              </p>

              <ul className="flex flex-col gap-3 mt-2">
                {biCtaBullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 text-white/90 text-body-base"
                  >
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-4 pt-4">
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
                    Agendar demonstração gratuita
                  </a>
                </Button>
                <Link
                  href="#contato"
                  className="inline-flex items-center gap-2 text-white/90 hover:text-white font-body font-medium text-sm transition-colors group"
                >
                  Falar com consultor
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>

            {/* Video */}
            <div className="lg:col-span-7">
              <div
                className={cn(
                  'group relative aspect-video overflow-hidden rounded-2xl',
                  'border border-white/15 bg-black/60 shadow-[0_24px_60px_rgba(0,0,0,0.45)]'
                )}
              >
                {playing ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${YT_ID}?autoplay=1&rel=0&modestbranding=1`}
                    title="IGA Tecnologia — Poder do BI"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    className="absolute inset-0 h-full w-full"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setPlaying(true)}
                    className="absolute inset-0 h-full w-full cursor-pointer focus-visible:outline-none"
                    aria-label="Reproduzir vídeo: Poder do BI"
                  >
                    <Image
                      src={`https://i.ytimg.com/vi/${YT_ID}/maxresdefault.jpg`}
                      alt="Dashboards IGA — pré-visualização do vídeo"
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      unoptimized
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40"
                    />

                    <span
                      aria-hidden
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white/95 text-royal shadow-[0_12px_32px_rgba(0,0,0,0.4)] transition-transform duration-300 group-hover:scale-110">
                        <Play
                          className="h-8 w-8 translate-x-[2px] fill-royal"
                          strokeWidth={0}
                        />
                        <span className="absolute inset-0 rounded-full bg-white/40 animate-ping opacity-60" />
                      </span>
                    </span>

                    <span className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-left">
                      <span className="flex flex-col gap-1">
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
                          Demonstração
                        </span>
                        <span className="font-display text-white text-lg sm:text-xl font-semibold">
                          Dashboards IGA em ação
                        </span>
                      </span>
                      <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1.5 text-xs text-white/90">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                        Assistir agora
                      </span>
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
