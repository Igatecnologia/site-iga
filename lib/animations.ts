import type { Variants } from 'framer-motion'

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1]
const EASE_OUT_QUART: [number, number, number, number] = [0.25, 1, 0.5, 1]

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.1,
      ease: EASE_OUT_EXPO,
    },
  }),
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
    },
  }),
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: EASE_OUT_EXPO,
    },
  }),
}

export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

export const wordReveal: Variants = {
  hidden: { opacity: 0, y: '100%' },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.06,
      ease: EASE_OUT_EXPO,
    },
  }),
}

// Blur + lift — sutil e editorial, ótimo para headlines
export const blurReveal: Variants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(12px)' },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.9,
      delay: i * 0.08,
      ease: EASE_OUT_QUART,
    },
  }),
}

// Reveal por máscara vertical — subida de cortina
export const maskReveal: Variants = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  visible: (i: number = 0) => ({
    clipPath: 'inset(0 0 0% 0)',
    transition: {
      duration: 1.1,
      delay: i * 0.12,
      ease: EASE_OUT_EXPO,
    },
  }),
}

// Stagger de letras — lift com leve blur
export const letterStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.035,
      delayChildren: 0.15,
    },
  },
}

export const letterChild: Variants = {
  hidden: { opacity: 0, y: '60%', filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
}

// Rise com skew — para números/metrics
export const numberRise: Variants = {
  hidden: { opacity: 0, y: 28, skewY: 4 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.08,
      ease: EASE_OUT_EXPO,
    },
  }),
}

export const viewportDefault = { once: true, margin: '-60px' } as const
export const viewportEarly = { once: true, margin: '-10%' } as const
