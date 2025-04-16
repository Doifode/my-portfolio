"use client"

import { motion } from "framer-motion"
import { useEffect, useRef } from "react"

const Hero = () => {
  const nameRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!nameRef.current) return

    const symbols = "!@#$%^&*()_+=-<>?/|{}[]01"
    let frame: number
    let startTime: number | null = null

    const originalText = nameRef.current.dataset.value || ""

    const animate = (time: number) => {
      if (!nameRef.current) return
      if (startTime === null) startTime = time

      const elapsed = (time - startTime) / 1000
      const progress = Math.min(elapsed * 3, originalText.length)

      const displayText = originalText
        .split("")
        .map((char, index) => {
          if (index < progress) {
            return originalText[index]
          } else {
            return symbols[Math.floor(Math.random() * symbols.length)]
          }
        })
        .join("")

      nameRef.current.innerText = displayText

      if (progress < originalText.length) {
        frame = requestAnimationFrame(animate)
      }
    }

    const startAnimation = () => {
      startTime = null
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(animate)
    }

    startAnimation()

    const handleMouseOver = () => {
      startAnimation()
    }

    nameRef.current.addEventListener("mouseover", handleMouseOver)

    return () => {
      if (nameRef.current) {
        nameRef.current.removeEventListener("mouseover", handleMouseOver)
      }
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section className="min-h-[90vh] flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl"
      >
        <h2 className="text-lg md:text-xl font-light text-gray-500 dark:text-gray-400 mb-2">
          Hello, I'm
        </h2>
        <h1
          ref={nameRef}
          data-value="Yash Doifode"
          className="text-5xl md:text-7xl font-bold mb-4 tracking-tight cursor-default transition-all duration-300 ease-in-out text-lime-600 dark:text-lime-400"
        >
          Yash Doifode
        </h1>
        <h2 className="text-2xl md:text-3xl font-medium text-gray-700 dark:text-gray-300 mb-6">
          Frontend Developer & UI/UX Enthusiast
        </h2>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mb-8">
          I build exceptional digital experiences with clean code and thoughtful design. Specializing in React,
          TypeScript, and modern frontend technologies.
        </p>
        <div className="flex flex-wrap gap-4">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-md font-medium"
          >
            Get in touch
          </motion.a>
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 border border-black dark:border-white rounded-md font-medium"
          >
            View my work
          </motion.a>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
