"use client"

import { useState, useRef } from "react"
import { Calendar, ExternalLink, Heart, Github } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

const projects = [
  {
    id: 1,
    title: "E-Commerce Dashboard",
    description: "A comprehensive dashboard for managing online stores with real-time analytics.",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    image: "/placeholder.svg?height=400&width=600",
    link: "#",
    github: "#",
    year: "2023",
    featured: true,
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with team collaboration features.",
    tags: ["React", "Redux", "TypeScript"],
    image: "/placeholder.svg?height=400&width=600",
    link: "#",
    github: "#",
    year: "2022",
  },
  {
    id: 3,
    title: "Financial Analytics Platform",
    description: "An interactive platform for visualizing financial data with customizable charts.",
    tags: ["Next.js", "TypeScript", "D3.js"],
    image: "/placeholder.svg?height=400&width=600",
    link: "#",
    github: "#",
    year: "2021",
    featured: true,
  },
  {
    id: 4,
    title: "Travel Booking Interface",
    description: "A modern booking interface with interactive maps and real-time availability.",
    tags: ["React", "GraphQL", "Mapbox"],
    image: "/placeholder.svg?height=400&width=600",
    link: "#",
    github: "#",
    year: "2020",
  },
]

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const [likedProjects, setLikedProjects] = useState<number[]>([])
  const [filter, setFilter] = useState<string>("all")

  const toggleLike = (e: React.MouseEvent, projectId: number) => {
    e.preventDefault()
    e.stopPropagation()
    setLikedProjects((prev) =>
      prev.includes(projectId) ? prev.filter((id) => id !== projectId) : [...prev, projectId]
    )
  }

  const filteredProjects = filter === "all" 
    ? projects 
    : filter === "featured" 
      ? projects.filter(p => p.featured) 
      : projects.filter(p => p.tags.includes(filter))

  const uniqueTags = Array.from(new Set(projects.flatMap(p => p.tags)))

  return (
    <section id="projects" className="py-24   from-gray-50 to-white dark:from-black dark:to-zinc-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-16 text-center">
          <motion.h2 
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Project Timeline
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Explore my journey through various projects over the years
          </motion.p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <Button 
            variant={filter === "all" ? "default" : "outline"} 
            onClick={() => setFilter("all")}
            className="rounded-full"
            size="sm"
          >
            All
          </Button>
          <Button 
            variant={filter === "featured" ? "default" : "outline"} 
            onClick={() => setFilter("featured")}
            className="rounded-full"
            size="sm"
          >
            Featured
          </Button>
          {uniqueTags.map(tag => (
            <Button 
              key={tag} 
              variant={filter === tag ? "default" : "outline"} 
              onClick={() => setFilter(tag)}
              className="rounded-full"
              size="sm"
            >
              {tag}
            </Button>
          ))}
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-400 to-purple-600 rounded-full hidden md:block"></div>
          
          {/* Timeline Items */}
          <div className="space-y-12 md:space-y-24 relative">
            {filteredProjects.map((project, index) => {
              const isLeft = index % 2 === 0;
              const isLiked = likedProjects.includes(project.id);
              
              return (
                <div key={project.id} className="relative">
                  {/* Timeline node */}
                  <div className="absolute left-1/2 top-24 transform -translate-x-1/2 w-5 h-5 rounded-full bg-white dark:bg-zinc-800 border-4 border-blue-500 dark:border-blue-400 z-10 hidden md:block"></div>
                  
                  {/* Year indicator */}
                  <div className="absolute left-1/2 top-12 transform -translate-x-1/2 bg-blue-500 dark:bg-blue-400 text-white px-4 py-1 rounded-full font-medium text-sm z-10 hidden md:block">
                    {project.year}
                  </div>
                  
                  {/* Project Card */}
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`md:w-5/12 ${isLeft ? 'md:mr-auto' : 'md:ml-auto'}`}
                  >
                    <div
                      className="group bg-white dark:bg-zinc-900/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-100 dark:border-zinc-800 hover:shadow-xl dark:hover:shadow-zinc-900/30 transition-all duration-300 cursor-pointer"
                      onClick={() => setSelectedProject(project)}
                    >
                      <div className="relative overflow-hidden">
                        <div className="aspect-video bg-gradient-to-tr from-gray-100 to-gray-200 dark:from-zinc-800 dark:to-zinc-700">
                          <img
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        </div>
                        
                        {project.featured && (
                          <Badge className="absolute top-4 right-4 bg-white/80 dark:bg-black/60 backdrop-blur-sm text-black dark:text-white hover:bg-white/80 dark:hover:bg-black/60">
                            Featured
                          </Badge>
                        )}
                        
                        {/* Mobile-only year badge */}
                        <Badge className="absolute top-4 left-4 bg-blue-500 text-white hover:bg-blue-600 md:hidden">
                          {project.year}
                        </Badge>
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 hover:text-white"
                              onClick={(e) => {
                                e.stopPropagation()
                                window.open(project.link, "_blank")
                              }}
                            >
                              <ExternalLink className="w-4 h-4 mr-1" />
                              Preview
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 hover:text-white"
                              onClick={(e) => {
                                e.stopPropagation()
                                window.open(project.github, "_blank")
                              }}
                            >
                              <Github className="w-4 h-4 mr-1" />
                              Code
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6">                      
                        <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {project.title}
                        </h3>
                        
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.map((tag, i) => (
                            <Badge key={i} variant="secondary" className="bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-zinc-800">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => toggleLike(e, project.id)}
                            className={isLiked ? "text-red-500" : ""}
                          >
                            <Heart className={`w-4 h-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
                            {isLiked ? "Liked" : "Like"}
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-600 dark:text-blue-400"
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Dialog */}
      <Dialog
        open={!!selectedProject}
        onOpenChange={(open) => {
          if (!open) setSelectedProject(null)
        }}
      >
        <DialogContent className="max-w-3xl">
          {selectedProject && (
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedProject.title}</DialogTitle>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  {selectedProject.year}
                </p>
              </DialogHeader>

              <div className="aspect-video bg-gray-100 dark:bg-zinc-800 rounded-lg overflow-hidden">
                <img
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="font-medium mb-2">Project Overview</h3>
                <p className="text-gray-700 dark:text-gray-300">{selectedProject.description}</p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary" className="bg-gray-100 dark:bg-zinc-800">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Button className="flex-1" asChild>
                  <a href={selectedProject.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </a>
                </Button>

                <Button variant="outline" className="flex-1" asChild>
                  <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    Source Code
                  </a>
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={(e) => toggleLike(e, selectedProject.id)}
                  className={likedProjects.includes(selectedProject.id) ? "text-red-500" : ""}
                >
                  <Heart
                    className={`w-5 h-5 ${likedProjects.includes(selectedProject.id) ? "fill-current" : ""}`}
                  />
                </Button>
              </div>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}