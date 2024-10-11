"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

interface ScrollPromptProps {
  className?: string
}

export default function ScrollPrompt({ className = "" }: ScrollPromptProps) {
  return (
    <div className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 ${className}`}>
      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: '2',
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
        className="flex space-x-1"
      >
        {[...Array(3)].map((_, index) => (
          <ChevronDown key={index} className="h-10 w-8 text-primary" />
        ))}
      </motion.div>
    </div>
  )
}