"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiNextdotjs,
  SiTailwindcss,
  SiFigma,
} from "react-icons/si"
import { MdDevices } from "react-icons/md" // instead of SiResponsive

// In skills array


const skills = [
  { name: "React", level: 95, icon: <SiReact className="text-cyan-400" /> },
  { name: "TypeScript", level: 90, icon: <SiTypescript className="text-blue-500" /> },
  { name: "JavaScript", level: 95, icon: <SiJavascript className="text-yellow-400" /> },
  { name: "HTML/CSS", level: 98, icon: <SiHtml5 className="text-orange-500" /> },
  { name: "Next.js", level: 85, icon: <SiNextdotjs className="text-gray-900 dark:text-white" /> },
  { name: "Tailwind CSS", level: 92, icon: <SiTailwindcss className="text-teal-400" /> },
  { name: "UI/UX Design", level: 88, icon: <SiFigma className="text-pink-500" /> },
  { name: "Responsive Design", level: 95, icon: <MdDevices className="text-green-400" /> },
]

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="about" className="py-20  ">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white after:content-[''] after:block after:w-24 after:h-1 after:bg-black dark:after:bg-white after:mx-auto after:mt-4"
        >
          About Me
        </motion.h2>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-12"
        >
          {/* Left content */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-900 shadow-2xl rounded-2xl p-6 transform transition-transform duration-500 hover:-rotate-y-3 hover:-translate-y-1"
          >
            <p className="text-lg mb-4">
              I'm a passionate frontend developer with 5+ years of experience creating modern web applications. I focus
              on writing clean, efficient code and crafting intuitive user experiences.
            </p>
            <p className="text-lg mb-4">
              My journey in web development started with a curiosity about how websites work, which evolved into a deep
              passion for building them.
            </p>
            <p className="text-lg">
              When I'm not coding, you'll find me exploring new technologies, contributing to open source, or mentoring others.
            </p>
          </motion.div>

          {/* Skills section with 3D icons */}
          <motion.div
            variants={itemVariants}
            className="grid sm:grid-cols-2 gap-6"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-xl flex items-center gap-4 transform transition-all duration-300 hover:scale-105 hover:-rotate-1"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="text-3xl drop-shadow-md">{skill.icon}</div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-gray-700 dark:text-white">{skill.name}</span>
                    <span className="text-sm text-gray-500">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${skill.level}%` } : {}}
                      transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
