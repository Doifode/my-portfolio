"use client"
import About from "@/components/about"
import BackgroundAnimation from "@/components/background-animation"
import Contact from "@/components/contact"
import Hero from "@/components/hero"
import Projects from "@/components/projects"

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <BackgroundAnimation />
      <div className="container mx-auto px-4 py-8 relative z-10">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </div>
    </main>
  )
}
