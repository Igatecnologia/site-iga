'use client'

import * as React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MessageCircle, Phone, ArrowRight } from 'lucide-react'
import { company } from '@/lib/data'
import { cn } from '@/lib/utils'

interface CallbackDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

function formatPhone(v: string) {
  const digits = v.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 2) return digits
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

export function CallbackDialog({ open, onOpenChange }: CallbackDialogProps) {
  const [nome, setNome] = React.useState('')
  const [empresa, setEmpresa] = React.useState('')
  const [telefone, setTelefone] = React.useState('')
  const [assunto, setAssunto] = React.useState('')
  const [horario, setHorario] = React.useState('qualquer')
  const [mensagem, setMensagem] = React.useState('')

  const assuntos = [
    'ERP — consultoria e implementação',
    'PDV e frente de caixa',
    'Sistema Mobile / Delivery',
    'Dashboards e BI',
    'Gestão em nuvem',
    'Outro assunto',
  ]

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const lines = [
      'Olá IGA Tecnologia! 👋',
      '',
      'Quero que vocês me liguem.',
      '',
      `*Nome:* ${nome}`,
      empresa ? `*Empresa:* ${empresa}` : '',
      `*Telefone:* ${telefone}`,
      `*Assunto:* ${assunto}`,
      `*Melhor horário:* ${horario}`,
      mensagem ? `*Detalhes:*\n${mensagem}` : '',
    ].filter(Boolean)
    const text = encodeURIComponent(lines.join('\n'))
    const url = `${company.whatsappApi}&text=${text}`
    window.open(url, '_blank', 'noopener,noreferrer')
    onOpenChange(false)
  }

  const canSubmit = nome.trim() && telefone.replace(/\D/g, '').length >= 10 && assunto

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[70] bg-ink/60 backdrop-blur-md"
              />
            </Dialog.Overlay>
            
            <Dialog.Content asChild>
              {/* This wrapper ensures the dialog is centered and scrollable if too tall */}
              <div className="fixed inset-0 z-[71] overflow-y-auto grid place-items-center p-4 py-12 pointer-events-none">
                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: 18 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 18 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                  className={cn(
                    'pointer-events-auto relative',
                    'w-full max-w-[560px]',
                    'rounded-3xl border border-border-blue bg-bg text-ink',
                    'shadow-[0_40px_80px_-20px_rgba(6,13,26,0.5)]'
                  )}
                >
                  {/* Header */}
                  <div className="relative theme-dark rounded-t-3xl bg-royal-grad overflow-hidden p-6 sm:p-7">
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-dots bg-[length:24px_24px] opacity-[0.15]"
                    />
                    <div
                      aria-hidden
                      className="absolute -top-20 -right-10 h-60 w-60 rounded-full bg-accent/30 blur-[90px]"
                    />

                    <Dialog.Close asChild>
                      <button
                        type="button"
                        aria-label="Fechar"
                        className="absolute top-4 right-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </Dialog.Close>

                    <div className="relative flex flex-col gap-2">
                      <span className="inline-flex items-center gap-2 font-mono uppercase text-[10px] tracking-[0.24em] text-white/70 w-fit">
                        <Phone className="h-3 w-3 text-accent" />
                        Solicitação de retorno
                      </span>
                      <Dialog.Title asChild>
                        <h2 className="font-display font-bold text-white leading-[1.1] tracking-[-0.02em] text-[clamp(1.5rem,2.8vw,2rem)]">
                          Contato via <span className="italic text-accent">WhatsApp</span>
                        </h2>
                      </Dialog.Title>
                      <Dialog.Description asChild>
                        <p className="text-white/70 text-sm leading-relaxed max-w-md">
                          Preencha os dados e retornaremos o mais rápido possível.
                        </p>
                      </Dialog.Description>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={onSubmit} className="flex flex-col gap-5 p-6 sm:p-7">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Nome" required>
                        <input
                          required
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                          placeholder="Seu nome"
                          className={inputClass}
                        />
                      </Field>
                      <Field label="Empresa">
                        <input
                          value={empresa}
                          onChange={(e) => setEmpresa(e.target.value)}
                          placeholder="Nome da empresa"
                          className={inputClass}
                        />
                      </Field>
                      <Field label="Telefone" required>
                        <input
                          required
                          type="tel"
                          value={telefone}
                          onChange={(e) => setTelefone(formatPhone(e.target.value))}
                          placeholder="(11) 9 9999-9999"
                          className={cn(inputClass, 'tabular-nums')}
                        />
                      </Field>
                      <Field label="Melhor horário">
                        <select
                          value={horario}
                          onChange={(e) => setHorario(e.target.value)}
                          className={inputClass}
                        >
                          <option value="qualquer">Qualquer horário</option>
                          <option value="manhã (8–12h)">Manhã (8–12h)</option>
                          <option value="tarde (12–18h)">Tarde (12–18h)</option>
                          <option value="fim do dia (18–20h)">Fim do dia (18–20h)</option>
                        </select>
                      </Field>
                    </div>

                    <Field label="Sobre o que deseja falar" required>
                      <select
                        required
                        value={assunto}
                        onChange={(e) => setAssunto(e.target.value)}
                        className={inputClass}
                      >
                        <option value="" disabled>
                          Selecione um assunto
                        </option>
                        {assuntos.map((a) => (
                          <option key={a} value={a}>
                            {a}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field label="O que você quer saber? (opcional)">
                      <textarea
                        value={mensagem}
                        onChange={(e) => setMensagem(e.target.value)}
                        rows={3}
                        placeholder="Conte um pouco sobre sua necessidade."
                        className={cn(inputClass, 'resize-y min-h-[88px]')}
                      />
                    </Field>

                    <button
                      type="submit"
                      disabled={!canSubmit}
                      className={cn(
                        'group relative inline-flex items-center justify-center gap-2',
                        'h-12 w-full rounded-xl font-body font-semibold text-white',
                        'bg-gradient-to-b from-[#25D366] to-[#1FB855]',
                        'shadow-[0_8px_24px_rgba(37,211,102,0.4),inset_0_1px_0_rgba(255,255,255,0.25)]',
                        'border border-[#1FB855]/70 transition-all duration-200',
                        'hover:brightness-110 active:scale-[0.98]',
                        'disabled:opacity-50 disabled:cursor-not-allowed'
                      )}
                    >
                      <MessageCircle className="h-4 w-4" />
                      Enviar pelo WhatsApp
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </form>
                </motion.div>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}

const inputClass = cn(
  'w-full bg-surface border border-border rounded-xl px-4 h-11 text-sm',
  'text-ink placeholder:text-muted/60',
  'outline-none transition-colors duration-200',
  'focus:border-accent focus:bg-surface-2',
  'hover:border-border-blue'
)

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </span>
      {children}
    </div>
  )
}
