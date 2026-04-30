import dynamic from 'next/dynamic'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'

const SocialProof = dynamic(() => import('@/components/sections/SocialProof').then((mod) => ({ default: mod.SocialProof })))
const ShowcaseCarousel = dynamic(() => import('@/components/sections/ShowcaseCarousel').then((mod) => ({ default: mod.ShowcaseCarousel })))
const Clients = dynamic(() => import('@/components/sections/Clients').then((mod) => ({ default: mod.Clients })))
const ProblemSolution = dynamic(() => import('@/components/sections/ProblemSolution').then((mod) => ({ default: mod.ProblemSolution })))
const KineticMarquee = dynamic(() => import('@/components/sections/KineticMarquee').then((mod) => ({ default: mod.KineticMarquee })))
const Services = dynamic(() => import('@/components/sections/Services').then((mod) => ({ default: mod.Services })))
const Methodology = dynamic(() => import('@/components/sections/Methodology').then((mod) => ({ default: mod.Methodology })))
const Cases = dynamic(() => import('@/components/sections/Cases').then((mod) => ({ default: mod.Cases })))
const Contact = dynamic(() => import('@/components/sections/Contact').then((mod) => ({ default: mod.Contact })))
const About = dynamic(() => import('@/components/sections/About').then((mod) => ({ default: mod.About })))
const BICta = dynamic(() => import('@/components/sections/BICta').then((mod) => ({ default: mod.BICta })))
const FAQ = dynamic(() => import('@/components/sections/FAQ').then((mod) => ({ default: mod.FAQ })))

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <SocialProof />
        <ShowcaseCarousel />
        <ProblemSolution />
        <KineticMarquee />
        <Services />
        <Methodology />
        <Cases />
        <Clients />
        <Contact />
        <About />
        <BICta />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
