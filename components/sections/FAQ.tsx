'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { cn } from '@/lib/utils'

const faqs = [
  {
    question: 'A IGA Tecnologia atende qualquer ERP do mercado?',
    answer: 'Sim. Temos expertise profunda em integrações via API ou banco de dados com os principais ERPs do mercado (Totvs, SAP, Oracle, Senior, Linx) e também com sistemas proprietários. O foco é extrair o dado, não importa onde ele esteja.',
  },
  {
    question: 'Quanto tempo leva para os primeiros resultados aparecerem?',
    answer: 'Trabalhamos com entregas incrementais. Geralmente, em 15 a 21 dias já entregamos o primeiro "Quick Win": um dashboard crítico ou a automação de um processo gargalo que já paga o investimento inicial.',
  },
  {
    question: 'Vocês fazem apenas a ferramenta ou também a consultoria?',
    answer: 'Somos consultoria de negócios primeiro, tecnologia depois. Não adiantaria entregar um dashboard lindo baseado em um processo errado. Nós ajustamos a lógica do seu negócio antes de automatizá-la.',
  },
  {
    question: 'Como funciona o suporte após a entrega do projeto?',
    answer: 'Oferecemos planos de sustentação e evolução contínua. Diferente de desenvolvedores freelas, somos uma empresa ativa desde 2001, com estrutura para garantir continuidade e escalabilidade dos seus dados.',
  },
  {
    question: 'Atendem apenas empresas em São Paulo?',
    answer: 'Nossa sede é em São Paulo, mas atendemos empresas em todo o território nacional através de consultoria remota e híbrida, com a mesma eficiência e proximidade.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0)

  return (
    <section id="faq" className="section-padding bg-surface-2/30">
      <div className="container-site">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Sticky Header */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="heading-lg font-display mt-4">
              Dúvidas que <br /> <span className="text-accent italic">precisam ser respondidas</span>
            </h2>
            <p className="body-text mt-6 max-w-sm">
              Se você ainda tem dúvidas sobre como a consultoria da IGA pode destravar sua empresa, aqui estão as respostas mais comuns.
            </p>
          </div>

          {/* Accordion List */}
          <div className="lg:col-span-7 flex flex-col">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                faq={faq}
                isOpen={openIndex === i}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function AccordionItem({ faq, isOpen, onClick }: { faq: typeof faqs[0], isOpen: boolean, onClick: () => void }) {
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-6 lg:py-8 text-left group"
      >
        <span className={cn(
          "text-lg lg:text-xl font-display font-bold transition-colors duration-300",
          isOpen ? "text-accent" : "text-ink group-hover:text-royal"
        )}>
          {faq.question}
        </span>
        <div className={cn(
          "h-8 w-8 rounded-full border flex items-center justify-center transition-all duration-300",
          isOpen ? "bg-accent border-accent text-white rotate-180" : "border-border text-muted group-hover:border-royal group-hover:text-royal"
        )}>
          {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8 text-muted leading-relaxed max-w-2xl">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
