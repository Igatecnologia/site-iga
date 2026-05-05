import type {
  Metric,
  CounterStat,
  Service,
  Step,
  Testimonial,
  NavLink,
  FooterLink,
} from '@/types'

const foundedYear = 2001
const yearsActive = new Date().getFullYear() - foundedYear
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://igatecnologia.com.br'

export const company = {
  name: 'IGA Sistemas e Consultoria',
  short: 'IGA Tecnologia',
  tagline: 'IGA | SISTEMAS E CONSULTORIA',
  foundedYear,
  founder: 'Israel de Correa',
  yearsOfExperience: yearsActive,
  cnpj: '31.683.996/0001-00',
  phones: ['+55 (11) 96219-7550', '+55 (11) 99884-3766'],
  email: 'contato@igatecnologia.com.br',
  whatsappUrl: 'https://wa.link/52fiva',
  whatsappApi: 'https://api.whatsapp.com/send?phone=5511962197550',
  address: {
    street: 'Rua Joaquina Augusta Sá dos Anjos, 9 - cj5',
    neighborhood: 'Jardim Analia Franco',
    city: 'São Paulo',
    state: 'SP',
    zip: '03336-007',
    full: 'Rua Joaquina Augusta Sá dos Anjos, 9 - cj5, Jardim Analia Franco, São Paulo - SP, 03336-007',
  },
  policyUrl:
    'https://drive.google.com/file/d/18ScOlGkS7WKBaRKNtS-Letc5mgJZsKLh/view',
  site: siteUrl,
  social: {
    facebook: 'https://facebook.com/igasistemasconsultoria',
    instagram: 'https://instagram.com/igasistemaseconsultoria',
  },
} as const

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/#home' },
  { label: 'Soluções', href: '/solucoes' },
  { label: 'Segmentos', href: '/segmentos' },
  { label: 'Serviços', href: '/#servicos' },
  { label: 'Sobre nós', href: '/#sobre' },
  { label: 'Contato', href: '/#contato' },
]

export const heroMetrics: Metric[] = [
  { value: '+21%', label: 'em receita' },
  { value: '+20%', label: 'em lucro' },
  { value: '+16%', label: 'em eficiência operacional' },
  { value: '+24%', label: 'na retenção de funcionários' },
]

export const socialProofStats: CounterStat[] = [
  { value: yearsActive, label: 'anos de mercado' },
  { value: 200, suffix: '+', label: 'empresas atendidas' },
  { value: 6, label: 'soluções especializadas' },
  { value: 100, suffix: '%', label: 'foco em resultados' },
]

export const services: Service[] = [
  {
    id: 'consultoria-erp',
    title: 'Consultoria ERP Gerencial',
    description:
      'Otimizamos processos, integramos sistemas e melhoramos decisões estratégicas garantindo eficiência e crescimento sustentável para sua empresa.',
    badge: 'Eficiência operacional',
    lottieQuery: 'settings gear process',
  },
  {
    id: 'implementacao-erp',
    title: 'Implementação e Adequação de ERP',
    description:
      'Adaptação perfeita do sistema ERP às necessidades da sua empresa, promovendo eficiência operacional e suporte ao crescimento contínuo.',
    badge: 'Integração completa',
    lottieQuery: 'layers stack implementation',
  },
  {
    id: 'analise-dados',
    title: 'Sistema de Análise de Dados',
    description:
      'Transformamos informações complexas em insights acionáveis que facilitam decisões estratégicas e promovem crescimento inteligente.',
    badge: 'Insights acionáveis',
    lottieQuery: 'bar chart data analytics',
  },
  {
    id: 'dashboards',
    title: 'Dashboards Gerenciais',
    description:
      'Dashboards intuitivos e personalizados que centralizam dados essenciais permitindo visualização clara e decisões rápidas.',
    badge: 'Decisões em tempo real',
    lottieQuery: 'dashboard screen monitor',
  },
  {
    id: 'gestao-mudancas',
    title: 'Gestão de Mudanças',
    description:
      'Gestão baseada em dados com visão 360º. Gerenciamos transições e expectativas de Gestores, Colaboradores e Fornecedores.',
    badge: 'Transição sem fricção',
    lottieQuery: 'cycle refresh arrows process',
  },
  {
    id: 'branding',
    title: 'Branding e Fortalecimento de Marca',
    description:
      'Estratégias de branding para fortalecer sua marca criando identidade única e impactante que impulsiona o reconhecimento no mercado.',
    badge: 'Reconhecimento de mercado',
    lottieQuery: 'megaphone marketing brand',
  },
]

export const howItWorksSteps: Step[] = [
  {
    number: '01',
    title: 'Diagnóstico',
    description: 'Analisamos seus sistemas, dados e processos atuais',
  },
  {
    number: '02',
    title: 'Estratégia',
    description: 'Desenvolvemos um plano sob medida para sua empresa',
  },
  {
    number: '03',
    title: 'Implementação',
    description: 'Executamos com acompanhamento próximo em cada etapa',
  },
  {
    number: '04',
    title: 'Crescimento',
    description: 'Monitoramos resultados e otimizamos continuamente',
  },
]

export const about = {
  p1: 'Fundada em 2001 por Israel de Correa com a visão de transformar a gestão de recursos e processos empresariais. Oferecemos soluções completas de Consultoria e Sistemas Gerenciais ERP que impulsionam a eficiência e o crescimento das organizações.',
  p2: 'Desde 2014, expandimos nossas operações para novas regiões e setores, incorporando tecnologias inovadoras como inteligência artificial, análise de dados e nuvem.',
  mission:
    'Ajudar empresas a atingir seu potencial com soluções de Sistemas Gerenciais ERP eficientes e estratégicas.',
  vision:
    'Ser líder global em consultoria de ERP, reconhecida por inovação, excelência e impacto positivo.',
  values: 'Qualidade, inovação, integridade e parceria.',
  imageAlt:
    'Consultor IGA analisando dashboard de dados em escritório moderno em São Paulo',
  imageSrc: '/images/about-iga.jpg',
} as const

export const testimonials: Testimonial[] = [
  {
    quote:
      'A IGA transformou nossa operação. Em 6 meses passamos de planilhas desatualizadas para dashboards em tempo real que mudaram como tomamos decisões.',
    name: 'Case anonimizado',
    role: 'Diretor Financeiro',
    company: 'Indústria atendida',
    initials: 'IA',
  },
  {
    quote:
      'O nível de entendimento da equipe sobre nosso negócio foi o diferencial. Não foi implementação de ERP — foi reestruturação estratégica.',
    name: 'Case anonimizado',
    role: 'CEO',
    company: 'Rede de varejo',
    initials: 'RV',
  },
  {
    quote:
      'Desde 2001 no mercado não é coincidência. A IGA entrega o que promete, no prazo, com suporte que não some depois da assinatura.',
    name: 'Case anonimizado',
    role: 'COO',
    company: 'Empresa de serviços',
    initials: 'ES',
  },
]

export const biCtaBullets = [
  'Dashboards precisos com seus dados em tempo real',
  'Dados centralizados — fim das planilhas desatualizadas',
  'Análises preditivas para decisões estratégicas',
] as const

export const biCtaStats: Metric[] = [
  { value: '+21%', label: 'receita' },
  { value: '+20%', label: 'lucro' },
  { value: '+16%', label: 'eficiência' },
]

export const footerServiceLinks: FooterLink[] = services.map((s) => ({
  label: s.title,
  href: `#${s.id}`,
}))

export const footerLegalLinks: FooterLink[] = [
  { label: 'Termos e Política', href: company.policyUrl },
]
