'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { IconBox } from '@/components/ui/IconBox'
import { fadeUp, viewportDefault } from '@/lib/animations'
import { company } from '@/lib/data'
import { withBasePath } from '@/lib/paths'

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

export function SolutionsList({ solutions }: { solutions: SolutionItem[] }) {
  return (
    <div className="container-site flex flex-col gap-16 lg:gap-24">
      {solutions.map((s, i) => {
        const reverse = i % 2 === 1
        return (
          <motion.article
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportDefault}
            custom={i % 3}
            key={s.id}
            id={s.id}
            aria-labelledby={`${s.id}-title`}
            className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center scroll-mt-28"
          >
            {/* Image slot */}
            <div
              className={`lg:col-span-7 ${
                reverse ? 'lg:order-2' : 'lg:order-1'
              }`}
            >
              <div
                className={`relative aspect-[16/10] overflow-hidden rounded-3xl border shadow-sm ${
                  s.imageBg === 'purple'
                    ? 'border-border bg-surface-2'
                    : 'border-border-blue bg-surface-2'
                }`}
              >
                <div
                  aria-hidden
                  className="absolute inset-0 bg-dots bg-[length:22px_22px] opacity-[0.18]"
                />
                <div
                  aria-hidden
                  className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-accent/25 blur-[90px]"
                />
                <div
                  aria-hidden
                  className={`absolute -bottom-20 -left-16 h-72 w-72 rounded-full blur-[100px] ${
                    s.imageBg === 'purple' ? 'bg-amber/20' : 'bg-royal-light/25'
                  }`}
                />

                {s.imageSrc ? (
                  <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-10">
                    <Image
                      src={withBasePath(s.imageSrc)}
                      alt={s.imageAlt ?? s.title}
                      fill
                      sizes="(max-width: 1024px) 90vw, 55vw"
                      className="relative object-contain drop-shadow-xl"
                      priority={i < 2}
                    />
                  </div>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-muted">
                    <IconBox icon={<Sparkles className="h-8 w-8" />} variant="accent" size="lg" />
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em]">
                      Foto em breve
                    </span>
                  </div>
                )}

                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-[#060d1a]/60 via-transparent to-transparent pointer-events-none"
                />

                {s.inDevelopment && (
                  <>
                    <div
                      aria-hidden
                      className="absolute inset-0 z-[5] bg-[#060d1a]/35 backdrop-blur-[1px] pointer-events-none"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 z-[5] opacity-40 pointer-events-none"
                      style={{
                        backgroundImage:
                          'repeating-linear-gradient(135deg, rgba(245,165,36,0.18) 0px, rgba(245,165,36,0.18) 2px, transparent 2px, transparent 18px)',
                      }}
                    />
                    <div className="absolute inset-0 z-[6] flex items-center justify-center pointer-events-none">
                      <div className="flex flex-col items-center gap-3 rounded-2xl bg-black/55 backdrop-blur-md border border-amber/40 px-7 py-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                        <span className="flex items-center gap-2 font-mono uppercase text-[10px] tracking-[0.28em] text-amber">
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inset-0 rounded-full bg-amber animate-ping opacity-70" />
                            <span className="relative h-2 w-2 rounded-full bg-amber" />
                          </span>
                          Em desenvolvimento
                        </span>
                        <span className="font-display text-white text-lg sm:text-xl font-semibold tracking-[-0.01em]">
                          Lançamento em breve
                        </span>
                      </div>
                    </div>
                  </>
                )}

                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-3 z-10">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full backdrop-blur-md border px-3 py-1.5 text-xs font-medium ${
                      s.inDevelopment
                        ? 'bg-amber/15 border-amber/50 text-amber'
                        : 'bg-white/10 border-white/20 text-white'
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        s.inDevelopment ? 'bg-amber' : 'bg-amber'
                      }`}
                    />
                    {s.badge}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/70 tabular-nums">
                    {String(i + 1).padStart(2, '0')} /{' '}
                    {String(solutions.length).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>

            {/* Copy */}
            <div
              className={`lg:col-span-5 flex flex-col gap-5 ${
                reverse ? 'lg:order-1' : 'lg:order-2'
              }`}
            >
              <SectionLabel>
                Solução {String(i + 1).padStart(2, '0')}
              </SectionLabel>
              <h2
                id={`${s.id}-title`}
                className="font-display font-bold text-ink tracking-[-0.02em] leading-[1.05]"
                style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)' }}
              >
                {s.title}
              </h2>
              <p className="body-text text-ink/80 text-base lg:text-[1.05rem] leading-relaxed">
                {s.description}
              </p>

              {s.highlights && (
                <ul className="flex flex-col gap-2.5 mt-1">
                  {s.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-3 text-ink/85 text-sm"
                    >
                      <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex flex-wrap gap-3 pt-3">
                {s.inDevelopment ? (
                  <>
                    <Button
                      asChild
                      variant="secondary"
                      size="md"
                      trailingIcon={<Sparkles className="h-4 w-4" />}
                      className="border-amber/60 text-amber hover:bg-amber/10 hover:border-amber"
                    >
                      <a
                        href={company.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Avise-me no lançamento
                      </a>
                    </Button>
                    <span className="inline-flex items-center gap-1.5 text-muted font-mono uppercase text-[11px] tracking-[0.18em] self-center">
                      Beta fechado · em construção
                    </span>
                  </>
                ) : (
                  <>
                    <Button
                      asChild
                      variant="primary"
                      size="md"
                      trailingIcon={<ArrowRight className="h-4 w-4" />}
                    >
                      <a
                        href={company.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Quero saber mais
                      </a>
                    </Button>
                    <Link
                      href="/#contato"
                      className="inline-flex items-center gap-1.5 text-accent hover:text-white font-body text-sm font-medium transition-colors"
                    >
                      Falar com consultor
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.article>
        )
      })}
    </div>
  )
}
