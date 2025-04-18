// smoothScroll.js
// This file manages smooth scrolling functionality for the portfolio website

export function setupSmoothScrolling() {
    // Select all links with hash (#) in the href attribute
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          // Get the navbar height to offset scrolling position
          const navbar = document.querySelector('nav');
          const navbarHeight = navbar ? navbar.offsetHeight : 0;
          
          // Calculate the position to scroll to (subtracting navbar height)
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
          
          // Smooth scroll to the target
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Update URL without page jump (optional)
          history.pushState(null, null, targetId);
        }
      });
    });
  }
  
  // Function to highlight the active nav item based on scroll position
  export function setupScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    window.addEventListener('scroll', () => {
      // Get current scroll position
      let scrollPosition = window.scrollY;
      
      // Get the navbar height
      const navbar = document.querySelector('nav');
      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      
      // Find which section is currently in view
      sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 20; // 20px buffer
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          // Remove active class from all nav links
          navLinks.forEach(link => {
            link.classList.remove('text-purple-400');
            link.classList.add('text-gray-300');
          });
          
          // Add active class to current nav link
          const activeLink = document.querySelector(`nav a[href="#${sectionId}"]`);
          if (activeLink) {
            activeLink.classList.remove('text-gray-300');
            activeLink.classList.add('text-purple-400');
          }
        }
      });
    });
  }