'use client'

import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Dot values
  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)
  
  // Ring values
  const ringX = useMotionValue(-100)
  const ringY = useMotionValue(-100)

  // Fast spring for the dot
  const dotXSpring = useSpring(dotX, { damping: 40, stiffness: 400, mass: 0.1 })
  const dotYSpring = useSpring(dotY, { damping: 40, stiffness: 400, mass: 0.1 })

  // Slower, elastic spring for the ring
  const ringXSpring = useSpring(ringX, { damping: 20, stiffness: 150, mass: 0.5 })
  const ringYSpring = useSpring(ringY, { damping: 20, stiffness: 150, mass: 0.5 })

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    setIsVisible(true)

    const moveCursor = (e: MouseEvent) => {
      dotX.set(e.clientX)
      dotY.set(e.clientY)
      ringX.set(e.clientX)
      ringY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('input') ||
        target.closest('textarea')
      ) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [dotX, dotY, ringX, ringY])

  if (!isVisible) return null

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none hidden md:flex items-center justify-center rounded-full border border-royal"
        style={{
          x: ringXSpring,
          y: ringYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? 48 : 32,
          height: isHovered ? 48 : 32,
          opacity: isHovered ? 0.2 : 0.4,
          backgroundColor: isHovered ? 'rgba(27, 94, 166, 0.1)' : 'transparent',
        }}
        transition={{ duration: 0.2 }}
      />
      
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:flex items-center justify-center rounded-full bg-royal shadow-sm"
        style={{
          x: dotXSpring,
          y: dotYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? 4 : 8,
          height: isHovered ? 4 : 8,
          opacity: 1,
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  )
}
