'use client'

import * as React from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
  MapPin,
  Phone,
  MessageCircle,
  Loader2,
  CheckCircle2,
  ArrowRight,
  Smartphone
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { company } from '@/lib/data'
import { cn } from '@/lib/utils'
import { fadeUp, viewportDefault } from '@/lib/animations'

type Status = 'idle' | 'loading' | 'success' | 'error'

export function Contact() {
  const [status, setStatus] = React.useState<Status>('idle')
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null)

  const [formState, setFormState] = React.useState({
    nome: '',
    empresa: '',
    telefone: '',
    mensagem: '',
    origem: '',
    horario: '',
  })

  const requiredFields = ['nome', 'empresa', 'telefone', 'mensagem', 'origem', 'horario']
  const filledCount = requiredFields.filter(f => formState[f as keyof typeof formState].trim().length > 0).length
  const progressPercent = Math.round((filledCount / requiredFields.length) * 100)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const setHorario = (val: string) => setFormState(prev => ({ ...prev, horario: val }))

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg(null)
    
    // Validar se horario foi preenchido
    if (!formState.horario) {
      setStatus('error')
      setErrorMsg('Por favor, selecione o melhor horário para contato.')
      return
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error ?? 'Falha ao enviar mensagem')
      }
      setStatus('success')
      setFormState({ nome: '', empresa: '', telefone: '', mensagem: '', origem: '', horario: '' })
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Erro desconhecido')
    }
  }

  return (
    <section
      id="contato"
      aria-labelledby="contact-heading"
      className="section-padding relative overflow-hidden bg-bg"
    >
      <div 
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" 
      />
      {/* People photo backdrop */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-[45%] hidden lg:block pointer-events-none"
      >
        <Image
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80"
          alt=""
          fill
          sizes="45vw"
          className="object-cover opacity-[0.14] grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg/60 via-bg/80 to-bg" />
      </div>

      <div className="container-site relative">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left — copy + contact data */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportDefault}
            className="lg:col-span-5 flex flex-col gap-7 lg:sticky top-32"
          >
            <SectionLabel>Diagnóstico</SectionLabel>
            <h2 id="contact-heading" className="heading-lg font-display">
              Agende sua <span className="text-accent italic">Consultoria</span>
            </h2>
            <p className="body-text text-body-lg">
              Deixe nossa equipe de especialistas avaliar o cenário atual da sua empresa. Retornaremos em menos de 2 horas.
            </p>

            <ul className="flex flex-col gap-4 mt-2">
              <li className="flex items-start gap-4">
                <span className="h-10 w-10 shrink-0 rounded-lg bg-accent/10 border border-border-blue flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-accent" />
                </span>
                <span className="text-sm text-ink opacity-90 leading-relaxed pt-2">
                  {company.address.full}
                </span>
              </li>
              {company.phones.map((phone) => (
                <li key={phone} className="flex items-center gap-4">
                  <span className="h-10 w-10 shrink-0 rounded-lg bg-accent/10 border border-border-blue flex items-center justify-center">
                    <Phone className="h-4 w-4 text-accent" />
                  </span>
                  <a
                    href={`tel:${phone.replace(/\D/g, '')}`}
                    className="text-sm text-ink opacity-90 hover:text-accent transition-colors tabular-nums"
                  >
                    {phone}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-4">
                <span className="h-10 w-10 shrink-0 rounded-lg bg-accent/10 border border-border-blue flex items-center justify-center">
                  <MessageCircle className="h-4 w-4 text-accent" />
                </span>
                <a
                  href={company.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-ink opacity-90 hover:text-accent transition-colors group"
                >
                  Falar no WhatsApp
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Right — form */}
          <motion.form
            onSubmit={onSubmit}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportDefault}
            custom={1}
            className="lg:col-span-7 relative rounded-3xl border border-border bg-surface p-7 lg:p-10 shadow-md flex flex-col gap-6"
            aria-describedby="form-status"
            noValidate
          >
            {/* Progress Indicator */}
            <div className="flex flex-col gap-2 mb-2">
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-muted">
                <span>Progresso</span>
                <span>{filledCount}/6 Preenchidos</span>
              </div>
              <div className="h-1.5 w-full bg-surface-2 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-accent transition-all duration-500 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Nome Completo" name="nome" value={formState.nome} onChange={handleChange} required />
              <Field label="Empresa" name="empresa" value={formState.empresa} onChange={handleChange} required />
              
              <div className="flex flex-col gap-1">
                <Field
                  label="WhatsApp Corporativo"
                  name="telefone"
                  type="tel"
                  value={formState.telefone}
                  onChange={handleChange}
                  required
                  placeholder="(11) 9 9999-9999"
                />
                <AnimatePresence>
                  {formState.telefone.length > 4 && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="flex items-center gap-1.5 text-[11px] text-muted mt-1"
                    >
                      <Smartphone className="h-3 w-3 text-emerald-500" />
                      <span>Retornaremos neste número via WhatsApp</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                  Como nos encontrou? <span className="text-accent ml-1">*</span>
                </label>
                <select 
                  name="origem"
                  value={formState.origem}
                  onChange={handleChange}
                  required
                  className="w-full bg-surface-2 border border-border rounded-xl p-4 text-ink text-sm outline-none transition-all duration-300 focus:border-accent focus:bg-surface focus:shadow-[0_0_0_4px_rgba(74,144,217,0.1)] appearance-none"
                >
                  <option value="" disabled>Selecione uma opção</option>
                  <option value="Google">Pesquisa no Google</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Indicacao">Indicação</option>
                  <option value="Eventos">Eventos / Outros</option>
                </select>
              </div>

              <div className="sm:col-span-2 flex flex-col gap-2">
                <label className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                  Melhor horário para contato <span className="text-accent ml-1">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Manhã (09h-12h)', 'Tarde (13h-18h)', 'Qualquer horário'].map(horario => (
                    <button
                      key={horario}
                      type="button"
                      onClick={() => setHorario(horario)}
                      className={cn(
                        "px-4 py-2 rounded-full text-xs font-medium border transition-colors",
                        formState.horario === horario 
                          ? "bg-royal text-white border-royal" 
                          : "bg-surface-2 text-ink/70 border-border hover:border-border-blue"
                      )}
                    >
                      {horario}
                    </button>
                  ))}
                </div>
              </div>

              <div className="sm:col-span-2">
                <Field
                  label="Qual é o seu maior desafio atual com dados/sistemas?"
                  name="mensagem"
                  value={formState.mensagem}
                  onChange={handleChange}
                  required
                  as="textarea"
                  rows={4}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={status === 'loading'}
                disabled={status === 'loading' || filledCount < 6}
                trailingIcon={
                  status === 'idle' || status === 'error' ? (
                    <ArrowRight className="h-4 w-4" />
                  ) : undefined
                }
              >
                {status === 'loading' ? 'Enviando…' : 'Solicitar Diagnóstico'}
              </Button>

              <p
                id="form-status"
                className="text-xs text-muted max-w-xs leading-relaxed"
                role="status"
                aria-live="polite"
              >
                Suas informações estão seguras. Retornaremos rapidamente com um diagnóstico prático, sem pitch de vendas agressivo.
              </p>
            </div>

            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  role="status"
                  className="mt-4 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-700"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                  <p className="text-sm font-medium">
                    Solicitação recebida! Fique de olho no seu WhatsApp.
                  </p>
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  role="alert"
                  className="mt-4 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700"
                >
                  <Loader2 className="h-5 w-5 shrink-0 text-red-600 animate-spin" />
                  <p className="text-sm font-medium">
                    {errorMsg ?? 'Não foi possível enviar agora. Tente pelo WhatsApp direto.'}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

interface FieldProps {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  type?: string
  required?: boolean
  placeholder?: string
  as?: 'input' | 'textarea'
  rows?: number
}

function Field({
  label,
  name,
  value,
  onChange,
  type = 'text',
  required,
  placeholder,
  as = 'input',
  rows,
}: FieldProps) {
  const id = `field-${name}`
  const sharedClass = cn(
    'w-full bg-surface-2 border border-border rounded-xl p-4',
    'text-ink placeholder:text-muted/60 text-sm',
    'outline-none transition-all duration-300',
    'focus:border-accent focus:bg-surface focus:shadow-[0_0_0_4px_rgba(74,144,217,0.1)]',
    'hover:border-border-blue'
  )

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted"
      >
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </label>
      {as === 'textarea' ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          rows={rows}
          className={cn(sharedClass, 'resize-y min-h-[120px]')}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className={sharedClass}
        />
      )}
    </div>
  )
}
