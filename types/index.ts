import type { LucideIcon } from 'lucide-react'

export interface Metric {
  value: string
  label: string
}

export interface CounterStat {
  value: number
  suffix?: string
  prefix?: string
  label: string
}

export interface Service {
  id: string
  title: string
  description: string
  badge: string
  lottieQuery: string
  lottieSrc?: string
}

export interface Step {
  number: string
  title: string
  description: string
}

export interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
  initials: string
}

export interface ContactInfo {
  icon: LucideIcon
  label: string
  value: string
  href?: string
}

export interface NavLink {
  label: string
  href: string
}

export interface FooterLink {
  label: string
  href: string
}
