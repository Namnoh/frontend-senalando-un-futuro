"use client"

import { motion, useInView, useAnimation } from "framer-motion"
import { useEffect, useRef } from "react"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
}

export default function AnimatedSection({ children, className = "" }: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.3 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { 
            duration: 0.5, 
            ease: "easeOut",
            delay: 0.2 // Pequeño retraso para mejorar la visibilidad
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}