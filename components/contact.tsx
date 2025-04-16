"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Github, Linkedin, Mail, Send } from "lucide-react"

const Contact = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic would go here
    console.log(formState)
    alert("Thanks for your message! This is a demo, so no message was actually sent.")
    setFormState({ name: "", email: "", message: "" })
  }

  return (
    <section id="contact" className="py-20">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold mb-8 after:content-[''] after:block after:w-20 after:h-1 after:bg-black dark:after:bg-white after:mt-4"
        >
          Get In Touch
        </motion.h2>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          <div>
            <p className="text-lg mb-6">
              I'm currently available for freelance work and full-time positions. If you have a project that needs some
              creative touch, or if you're looking to hire, feel free to reach out.
            </p>

            <div className="space-y-4 mb-8">
              <a
                href="mailto:hello@alexmorgan.dev"
                className="flex items-center gap-3 text-lg hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <Mail className="w-5 h-5" />
                hello@alexmorgan.dev
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-lg hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <Github className="w-5 h-5" />
                github.com/alexmorgan
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-lg hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                linkedin.com/in/alexmorgan
              </a>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-md font-medium flex items-center gap-2"
              >
                Send Message
                <Send className="w-4 h-4" />
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
