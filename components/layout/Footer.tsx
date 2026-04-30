import Link from 'next/link'
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Facebook,
  Instagram,
} from 'lucide-react'
import { IgaLogoMark } from './Navbar'
import {
  company,
  footerServiceLinks,
  footerLegalLinks,
  navLinks,
} from '@/lib/data'

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border-blue/30 bg-surface/40">
      <div
        aria-hidden
        className="absolute inset-0 bg-dots bg-[length:24px_24px] opacity-[0.15] pointer-events-none"
      />

      <div className="container-site relative py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-4 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <IgaLogoMark size="md" />
              <div className="flex flex-col leading-tight">
                <span className="font-display text-sm text-ink font-semibold">
                  IGA
                </span>
                <span className="font-mono text-[10px] text-muted uppercase tracking-[0.15em]">
                  Sistemas e Consultoria
                </span>
              </div>
            </div>
            <p className="body-text text-sm text-muted max-w-xs">
              Soluções completas de ERP e BI que impulsionam eficiência e
              crescimento das organizações.
            </p>
            <a
              href={company.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-[0.1em] text-accent hover:text-ink transition-colors w-fit"
            >
              <MessageCircle className="h-4 w-4" />
              Falar no WhatsApp
            </a>

            <div className="flex items-center gap-2 mt-2">
              <a
                href={company.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook IGA Tecnologia"
                className="h-9 w-9 inline-flex items-center justify-center rounded-lg border border-border text-muted hover:text-ink hover:border-border-blue transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={company.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram IGA Tecnologia"
                className="h-9 w-9 inline-flex items-center justify-center rounded-lg border border-border text-muted hover:text-ink hover:border-border-blue transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navegação */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <h4 className="section-label">Navegação</h4>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted hover:text-ink transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Serviços */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h4 className="section-label">Serviços</h4>
            <ul className="flex flex-col gap-2.5">
              {footerServiceLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted hover:text-ink transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h4 className="section-label">Contato</h4>
            <ul className="flex flex-col gap-3.5">
              <li className="flex items-start gap-3 text-sm text-muted">
                <MapPin className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                <span className="leading-relaxed">{company.address.full}</span>
              </li>
              {company.phones.map((phone) => (
                <li
                  key={phone}
                  className="flex items-center gap-3 text-sm text-muted hover:text-ink transition-colors"
                >
                  <Phone className="h-4 w-4 text-accent shrink-0" />
                  <a
                    href={`tel:${phone.replace(/\D/g, '')}`}
                    className="tabular-nums"
                  >
                    {phone}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-3 text-sm text-muted hover:text-ink transition-colors">
                <Mail className="h-4 w-4 text-accent shrink-0" />
                <a href={`mailto:${company.email}`} className="break-all">
                  {company.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs font-mono text-muted uppercase tracking-[0.1em]">
            © {new Date().getFullYear()} · CNPJ {company.cnpj} · Todos os
            direitos reservados.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {footerLegalLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={
                    link.href.startsWith('http')
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  className="text-xs font-mono uppercase tracking-[0.1em] text-muted hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
