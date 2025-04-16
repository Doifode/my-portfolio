"use client"

import { useEffect, useRef } from "react"

const BackgroundAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas: any = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasDimensions()

    const mouse = {
      x: undefined as number | undefined,
      y: undefined as number | undefined,
      radius: 150,
    }

    class Particle {
      x: number
      y: number
      size: number
      baseX: number
      baseY: number
      density: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 1
        this.baseX = this.x
        this.baseY = this.y
        this.density = Math.random() * 40 + 1
        this.color = `hsla(${Math.random() * 360}, 100%, 70%, 0.8)`
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }

      update() {
        if (mouse.x !== undefined && mouse.y !== undefined) {
          const dx = mouse.x - this.x
          const dy = mouse.y - this.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < mouse.radius) {
            const forceDirectionX = dx / distance
            const forceDirectionY = dy / distance
            const maxDistance = mouse.radius
            const force = (maxDistance - distance) / maxDistance
            const directionX = forceDirectionX * force * this.density
            const directionY = forceDirectionY * force * this.density

            this.x -= directionX
            this.y -= directionY
            this.size = 4 // Increase size on hover
          } else {
            if (this.x !== this.baseX) {
              const dx = this.x - this.baseX
              this.x -= dx / 20
            }
            if (this.y !== this.baseY) {
              const dy = this.y - this.baseY
              this.y -= dy / 20
            }
            this.size = Math.max(this.size - 0.1, 2) // Smooth return to original size
          }
        }
        this.draw()
      }
    }

    const particlesArray: Particle[] = []
    const particleCount = 80

    const init = () => {
      particlesArray.length = 0
      for (let i = 0; i < particleCount; i++) {
        particlesArray.push(new Particle())
      }
    }
    init()

    const connectParticles = () => {
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a + 1; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x
          const dy = particlesArray[a].y - particlesArray[b].y
          const distance = dx * dx + dy * dy

          if (distance < 10000) {
            const opacity = 1 - distance / 10000
            ctx.strokeStyle = `rgba(200,200,255,${opacity})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.globalCompositeOperation = 'lighter'
      particlesArray.forEach((particle) => particle.update())
      connectParticles()
      requestAnimationFrame(animate)
    }
    animate()

    // Event listeners
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.x
      mouse.y = e.y
    }

    const handleMouseLeave = () => {
      mouse.x = undefined
      mouse.y = undefined
    }

    const handleResize = () => {
      setCanvasDimensions()
      init()
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-80 pointer-events-none"
      aria-hidden="true"
    />
  )
}

export default BackgroundAnimation
