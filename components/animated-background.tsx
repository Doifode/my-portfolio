"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const mouse = useRef({ x: 0, y: 0 })
  const prevMouse = useRef({ x: 0, y: 0 })
  const touchActive = useRef(false)
  const particlesRef = useRef<Particle[]>([])
  const trailRef = useRef<TrailPoint[]>([])
  const hoverParticlesRef = useRef<HoverParticle[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Initialize mouse position to center
    mouse.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    }
    prevMouse.current = { ...mouse.current }

    // Set canvas dimensions
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    // Animation variables
    let animationFrameId: number
    const isDark = theme === "dark"

    // Configuration
    const PARTICLE_COUNT = 80
    const CONNECT_DISTANCE = 150
    const TRAIL_LENGTH = 20
    const HOVER_PARTICLE_COUNT = 15
    const HOVER_RADIUS = 120

    // Create particles
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: Math.random() * 0.5 - 0.25,
      vy: Math.random() * 0.5 - 0.25,
      radius: Math.random() * 2 + 1,
      color: `hsl(${Math.random() * 360}, 80%, 60%)`,
      phase: Math.random() * Math.PI * 2,
      phaseSpeed: 0.003 + Math.random() * 0.005,
    }))

    // Initialize trail
    trailRef.current = Array.from({ length: TRAIL_LENGTH }, () => ({
      x: mouse.current.x,
      y: mouse.current.y,
      age: 0,
      size: 0,
    }))

    // Initialize hover particles
    hoverParticlesRef.current = Array.from({ length: HOVER_PARTICLE_COUNT }, () => ({
      angle: Math.random() * Math.PI * 2,
      distance: Math.random() * HOVER_RADIUS * 0.5 + HOVER_RADIUS * 0.5,
      speed: 0.01 + Math.random() * 0.02,
      size: Math.random() * 4 + 2,
      hue: Math.random() * 60 + 180, // Blue-cyan range
    }))

    const updateTrail = () => {
      // Calculate mouse velocity
      const dx = mouse.current.x - prevMouse.current.x
      const dy = mouse.current.y - prevMouse.current.y
      const speed = Math.sqrt(dx * dx + dy * dy)

      // Update previous mouse position
      prevMouse.current = { ...mouse.current }

      // Shift trail points
      for (let i = trailRef.current.length - 1; i > 0; i--) {
        trailRef.current[i] = { ...trailRef.current[i - 1] }
        trailRef.current[i].age = i / trailRef.current.length
        trailRef.current[i].size = 10 * (1 - i / trailRef.current.length) * (0.5 + speed * 0.05)
      }

      // Add new point at current mouse position
      trailRef.current[0] = {
        x: mouse.current.x,
        y: mouse.current.y,
        age: 0,
        size: 10 * (0.5 + speed * 0.05),
      }
    }

    const draw = (time: number) => {
      // Clear with semi-transparent background for trail effect
      ctx.fillStyle = isDark ? "rgba(10, 10, 25, 0.15)" : "rgba(245, 245, 255, 0.15)"
      ctx.fillRect(0, 0, width, height)

      // Update trail
      updateTrail()

      // Draw trail
      trailRef.current.forEach((point, i) => {
        if (i === 0) return // Skip the first point

        const opacity = 1 - point.age
        const size = point.size

        ctx.beginPath()
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2)
        ctx.fillStyle = isDark
          ? `hsla(${(time / 20) % 360}, 100%, 70%, ${opacity * 0.5})`
          : `hsla(${(time / 20) % 360}, 100%, 50%, ${opacity * 0.5})`

        ctx.shadowColor = isDark
          ? `hsla(${(time / 20) % 360}, 100%, 70%, 0.8)`
          : `hsla(${(time / 20) % 360}, 100%, 50%, 0.8)`
        ctx.shadowBlur = 15
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // Update and draw hover particles
      hoverParticlesRef.current.forEach((particle) => {
        particle.angle += particle.speed

        const x = mouse.current.x + Math.cos(particle.angle) * particle.distance
        const y = mouse.current.y + Math.sin(particle.angle) * particle.distance

        ctx.beginPath()
        ctx.arc(x, y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${particle.hue}, 100%, 70%, 0.7)`
        ctx.shadowColor = `hsla(${particle.hue}, 100%, 80%, 0.8)`
        ctx.shadowBlur = 10
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // Update particles
      particlesRef.current.forEach((particle) => {
        // Calculate distance to mouse
        const dx = mouse.current.x - particle.x
        const dy = mouse.current.y - particle.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        // Apply force based on mouse proximity
        if (dist < 200) {
          const force = (200 - dist) / 200
          const angle = Math.atan2(dy, dx)
          const attraction = touchActive.current ? -0.05 : 0.05

          particle.vx += Math.cos(angle) * attraction * force
          particle.vy += Math.sin(angle) * attraction * force
        }

        // Update position with velocity
        particle.x += particle.vx
        particle.y += particle.vy

        // Apply drag
        particle.vx *= 0.98
        particle.vy *= 0.98

        // Bounce off edges
        if (particle.x < 0) {
          particle.x = 0
          particle.vx *= -1
        } else if (particle.x > width) {
          particle.x = width
          particle.vx *= -1
        }

        if (particle.y < 0) {
          particle.y = 0
          particle.vy *= -1
        } else if (particle.y > height) {
          particle.y = height
          particle.vy *= -1
        }

        // Pulsate size
        const pulsatingRadius = particle.radius + Math.sin(time / 300 + particle.phase) * 1

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, pulsatingRadius, 0, Math.PI * 2)

        // Dynamic color based on position and time
        const hue = (particle.x + particle.y + time / 20) % 360
        ctx.fillStyle = `hsla(${hue}, 90%, 65%, 0.8)`

        // Add glow effect
        ctx.shadowColor = `hsla(${hue}, 100%, 70%, 0.8)`
        ctx.shadowBlur = 8
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // Draw connections between particles
      ctx.lineWidth = 0.5
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i]
          const p2 = particlesRef.current[j]

          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < CONNECT_DISTANCE) {
            // Calculate opacity based on distance
            const opacity = 1 - dist / CONNECT_DISTANCE

            // Create gradient for line
            const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y)
            const hue1 = (p1.x + time / 20) % 360
            const hue2 = (p2.y + time / 20) % 360

            gradient.addColorStop(0, `hsla(${hue1}, 100%, 70%, ${opacity * 0.5})`)
            gradient.addColorStop(1, `hsla(${hue2}, 100%, 70%, ${opacity * 0.5})`)

            // Draw line
            ctx.beginPath()
            ctx.strokeStyle = gradient
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      }

      // Continue animation loop
      animationFrameId = requestAnimationFrame(draw)
    }

    // Event handlers
    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      touchActive.current = true
      if (e.touches.length > 0) {
        mouse.current.x = e.touches[0].clientX
        mouse.current.y = e.touches[0].clientY
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault()
      touchActive.current = true
      if (e.touches.length > 0) {
        mouse.current.x = e.touches[0].clientX
        mouse.current.y = e.touches[0].clientY
        prevMouse.current = { ...mouse.current }
      }
    }

    const handleTouchEnd = () => {
      touchActive.current = false
    }

    // Add event listeners
    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleTouchMove, { passive: false })
    window.addEventListener("touchstart", handleTouchStart, { passive: false })
    window.addEventListener("touchend", handleTouchEnd)

    // Start animation
    draw(0)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [theme])

  return (
    <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none" aria-hidden="true" />
  )
}

// Type definitions
interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  phase: number
  phaseSpeed: number
}

interface TrailPoint {
  x: number
  y: number
  age: number
  size: number
}

interface HoverParticle {
  angle: number
  distance: number
  speed: number
  size: number
  hue: number
}
