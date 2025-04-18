"use client";
// Hero.jsx
import { useState, useEffect } from 'react';

const Hero = () => {
    const [text, setText] = useState('');
    const [index, setIndex] = useState(0);
    const fullText = "Full Stack Developer | UI/UX Designer | Problem Solver";

    useEffect(() => {
        if (index < fullText.length) {
            const timeout = setTimeout(() => {
                setText(prev => prev + fullText[index]);
                setIndex(index + 1);
            }, 100);

            return () => clearTimeout(timeout);
        }
    }, [index]);

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 to-black">
            {/* Animated background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative z-10 px-4 text-center">
                <h2 className="text-xl text-purple-300 font-mono mb-4">Hello, I'm</h2>
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                        Your Name
                    </span>
                </h1>

                <div className="h-8 mb-8">
                    <p className="text-lg md:text-xl text-gray-300 font-light">
                        {text}<span className="animate-pulse">|</span>
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-8 rounded-full hover:opacity-90 transition-all shadow-lg">
                        View Projects
                    </button>
                    <button className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-full hover:bg-white hover:text-black transition-all">
                        Contact Me
                    </button>
                </div>

                <div className="mt-12 animate-bounce">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </div>
        </div>
    );
};


export default Hero;