
"use client";
// About.jsx
const About = () => {
    return (
        <div className="py-20 bg-gradient-to-b from-black to-indigo-950 text-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/2 mb-8 md:mb-0">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur-lg opacity-30"></div>
                            <div className="relative aspect-square overflow-hidden rounded-xl border-2 border-purple-500/30">
                                <h1>IMG</h1>
                            </div>
                        </div>
                    </div>

                    <div className="md:w-1/2">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">About Me</span>
                        </h2>

                        <p className="text-gray-300 mb-4">
                            Hello! I'm a passionate full-stack developer based in [Your Location], specializing in building exceptional digital experiences.
                            With a strong foundation in both front-end and back-end technologies, I create engaging, intuitive interfaces backed by robust server-side logic.
                        </p>

                        <p className="text-gray-300 mb-6">
                            My journey in tech began [brief background]. I'm constantly exploring new technologies and approaches to create innovative solutions for complex problems.
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                                <span className="text-gray-300">React & Next.js</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                                <span className="text-gray-300">Node.js & Express</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                                <span className="text-gray-300">MongoDB & PostgreSQL</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                                <span className="text-gray-300">Tailwind CSS</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <div className="px-4 py-2 bg-indigo-900/60 text-indigo-300 rounded-full text-sm">JavaScript</div>
                            <div className="px-4 py-2 bg-indigo-900/60 text-indigo-300 rounded-full text-sm">TypeScript</div>
                            <div className="px-4 py-2 bg-indigo-900/60 text-indigo-300 rounded-full text-sm">React</div>
                            <div className="px-4 py-2 bg-indigo-900/60 text-indigo-300 rounded-full text-sm">Next.js</div>
                            <div className="px-4 py-2 bg-indigo-900/60 text-indigo-300 rounded-full text-sm">Node.js</div>
                            <div className="px-4 py-2 bg-indigo-900/60 text-indigo-300 rounded-full text-sm">TailwindCSS</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
