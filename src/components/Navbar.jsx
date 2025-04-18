
"use client";
// Navbar.jsx
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // Handle navbar background change on scroll
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Handle scroll spy functionality
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY;

      // Get the navbar height to adjust calculations
      const navbar = document.querySelector('nav');
      const navbarHeight = navbar ? navbar.offsetHeight : 0;

      // Determine which section is in view
      sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 100; // Adding buffer
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    // Set up smooth scrolling
    const handleNavClick = (e) => {
      const target = e.target;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();

        const targetId = target.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          // Close mobile menu if open
          setIsMobileMenuOpen(false);

          // Get navbar height for offset
          const navbar = document.querySelector('nav');
          const navbarHeight = navbar ? navbar.offsetHeight : 0;

          // Calculate position and scroll
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Update URL without page jump (optional)
          history.pushState(null, null, targetId);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.querySelector('nav').addEventListener('click', handleNavClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      const nav = document.querySelector('nav');
      if (nav) {
        nav.removeEventListener('click', handleNavClick);
      }
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled
          ? 'bg-indigo-950/80 backdrop-blur-md shadow-lg py-3'
          : 'bg-transparent py-6'
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center mr-3">
              <span className="text-white font-bold text-xl">YN</span>
            </div>
            <span className="text-white font-bold text-xl">
              Your<span className="text-purple-400">Name</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className={`transition-colors duration-300 ${activeSection === link.href.substring(1)
                    ? 'text-purple-400'
                    : 'text-gray-300 hover:text-purple-400'
                  }`}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:opacity-90 transition-all shadow-md"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-indigo-950/95 backdrop-blur-md overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-60 shadow-xl' : 'max-h-0'
          }`}
      >
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-col space-y-4 py-4">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className={`transition-colors duration-300 py-2 ${activeSection === link.href.substring(1)
                    ? 'text-purple-400'
                    : 'text-gray-300 hover:text-purple-400'
                  }`}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:opacity-90 transition-all shadow-md text-center"
            >
              Hire Me
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;