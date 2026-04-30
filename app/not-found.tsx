'use client'

import * as React from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Magnetic } from '@/components/ui/magnetic'
import { Button } from '@/components/ui/Button'

const WebGLShader = dynamic(
  () => import('@/components/ui/web-gl-shader').then((mod) => mod.WebGLShader),
  { ssr: false }
)

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden bg-bg min-h-screen flex items-center justify-center pt-20">
        <WebGLShader className="absolute inset-0 h-full w-full opacity-10" />
        
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_10%,rgba(6,13,26,0.6)_80%,rgba(6,13,26,1)_100%)] pointer-events-none"
        />

        <div className="container-site relative z-10 flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
            animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <h1 className="font-display font-black text-white text-[clamp(6rem,15vw,12rem)] leading-none tracking-tighter opacity-90">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center mix-blend-overlay pointer-events-none">
              <h1 className="font-display font-black text-accent text-[clamp(6rem,15vw,12rem)] leading-none tracking-tighter">
                404
              </h1>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 flex flex-col items-center gap-6"
          >
            <p className="font-body text-xl md:text-2xl text-white/80 max-w-md">
              A página que você está procurando se perdeu no espaço de dados.
            </p>
            
            <Magnetic strength={20}>
              <Button
                asChild
                variant="primary"
                size="lg"
                leadingIcon={<ArrowLeft className="h-5 w-5" />}
                className="mt-4"
              >
                <Link href="/">
                  Voltar ao Início
                </Link>
              </Button>
            </Magnetic>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}
