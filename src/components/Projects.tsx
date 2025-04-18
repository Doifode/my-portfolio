
"use client";

import { useState } from 'react';

const Projects = () => {
    const [activeProject, setActiveProject] = useState(null);

    const projects = [
        {
            id: 1,
            date: "2025",
            title: "Project Nebula",
            description: "A full-stack e-commerce platform with real-time inventory management and integrated payment processing.",
            technologies: ["React", "Node.js", "MongoDB", "Stripe"],
            image: "/api/placeholder/800/600",
            link: "#"
        },
        {
            id: 2,
            date: "2024",
            title: "Quantum Dashboard",
            description: "An analytics dashboard with interactive data visualization using advanced charting libraries.",
            technologies: ["Next.js", "D3.js", "Firebase", "Tailwind CSS"],
            image: "/api/placeholder/800/600",
            link: "#"
        },
        {
            id: 3,
            date: "2023",
            title: "Harmonic AI",
            description: "A machine learning application that analyzes music patterns and generates melodic compositions.",
            technologies: ["Python", "TensorFlow", "React", "Web Audio API"],
            image: "/api/placeholder/800/600",
            link: "#"
        },
        {
            id: 4,
            date: "2022",
            title: "Orbital CMS",
            description: "A custom content management system with a modern interface and robust permission controls.",
            technologies: ["Vue.js", "Express", "PostgreSQL", "GraphQL"],
            image: "/api/placeholder/800/600",
            link: "#"
        }
    ];

    return (
        <div className="py-20 bg-indigo-950 text-white">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-16">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                        My Projects
                    </span>
                </h2>

                <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-600 to-pink-600"></div>

                    {/* Projects */}
                    <div className="space-y-16">
                        {projects.map((project: any, index) => (
                            <div
                                key={project.id}
                                className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                            >
                                {/* Timeline dot */}
                                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center z-10">
                                    <div className="w-4 h-4 rounded-full bg-indigo-950"></div>
                                </div>

                                {/* Date */}
                                <div className="md:w-1/2 pl-16 md:pl-0 md:pr-8 md:text-right mb-4 md:mb-0">
                                    <div className="text-xl font-light text-purple-300">{project.date}</div>
                                </div>

                                {/* Content */}
                                <div className="md:w-1/2 pl-16 md:pl-8">
                                    <div
                                        className="bg-indigo-900/30 backdrop-blur-sm rounded-xl p-6 border border-indigo-800/50 hover:border-purple-500/50 transition-all cursor-pointer"
                                        onMouseEnter={() => setActiveProject(project.id)}
                                        onMouseLeave={() => setActiveProject(null)}
                                    >
                                        <h3 className="text-2xl font-bold mb-3 text-purple-300">{project.title}</h3>
                                        <p className="text-gray-300 mb-4">{project.description}</p>

                                        <div className="mb-4">
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {project.technologies.map((tech: any, i: number) => (
                                                    <span
                                                        key={i}
                                                        className="px-3 py-1 bg-indigo-800/70 text-indigo-200 rounded-full text-xs"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {activeProject === project.id && (
                                            <div className="transform transition-all duration-500 ease-in-out">
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                                />
                                                <a
                                                    href={project.link}
                                                    className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium py-2 px-4 rounded-lg hover:opacity-90 transition-all"
                                                >
                                                    View Project
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Projects;