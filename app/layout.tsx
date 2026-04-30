import type { Metadata } from 'next'
import { outfit, inter, jetbrainsMono } from '@/lib/fonts'
import { company } from '@/lib/data'
import { FloatingActions } from '@/components/layout/FloatingActions'
import { CustomCursor } from '@/components/ui/custom-cursor'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(company.site),
  title: 'IGA Tecnologia — Consultoria ERP e BI em São Paulo',
  description:
    'Desde 2001 transformando dados em estratégias. Consultoria ERP, dashboards gerenciais e análise de dados para médias empresas em São Paulo.',
  keywords: [
    'consultoria ERP',
    'business intelligence',
    'dashboards',
    'análise de dados',
    'São Paulo',
  ],
  openGraph: {
    title: 'IGA Tecnologia — ERP e Business Intelligence',
    description: 'Transformamos seus dados em decisões desde 2001.',
    url: company.site,
    siteName: 'IGA Tecnologia',
    locale: 'pt_BR',
    type: 'website',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: company.site },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: company.name,
    alternateName: company.short,
    url: company.site,
    foundingDate: String(company.foundedYear),
    email: company.email,
    telephone: company.phones[0],
    taxID: company.cnpj,
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address.street,
      addressLocality: company.address.city,
      addressRegion: company.address.state,
      postalCode: company.address.zip,
      addressCountry: 'BR',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Brasil',
    },
    sameAs: [company.social.facebook, company.social.instagram],
    serviceType: [
      'Consultoria ERP',
      'Business Intelligence',
      'Dashboards gerenciais',
      'Automação de processos',
      'Sistemas de gestão empresarial',
    ],
  }

  return (
    <html
      lang="pt-BR"
      className={`${outfit.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-bg text-ink font-body antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-royal focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
        >
          Pular para o conteúdo
        </a>
        {children}
        <FloatingActions />
        <CustomCursor />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  )
}
