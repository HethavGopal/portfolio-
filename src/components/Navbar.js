'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function Navbar() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll event listener for navbar visibility
  useEffect(() => {
    // Ensure page is at top and ready
    window.scrollTo(0, 0);
    
    const initTimer = setTimeout(() => {
      setIsReady(true);
    }, 500);

    return () => clearTimeout(initTimer);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const scrollHandler = () => {
      const scrollPosition = window.scrollY;
      // Show navbar after scrolling 100px
      setShowNavbar(scrollPosition > 100);

      // Simple scroll-based section detection
      const windowHeight = window.innerHeight;
      let currentSection = 'home';
      
      if (scrollPosition < windowHeight * 0.5) {
        currentSection = 'home';
      } else if (scrollPosition < windowHeight * 1.5) {
        currentSection = 'about';
      } else if (scrollPosition < windowHeight * 2.5) {
        currentSection = 'experience';
      } else if (scrollPosition < windowHeight * 3.5) {
        currentSection = 'projects';
      } else {
        currentSection = 'contact';
      }
      
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', scrollHandler, { passive: true });

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [isReady]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isDark = mounted && theme === 'dark';

  return (
    <nav 
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-40 transition-all duration-500 ease-out ${
        showNavbar ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}
    >
      <div 
        className={`flex items-center space-x-6 px-4 py-2 rounded-full backdrop-blur-md shadow-2xl ${
          isDark 
            ? 'bg-white/10 border border-white/20' 
            : 'bg-black/10 border border-black/20'
        }`}
      >
        {/* Navigation Links */}
        <button 
          onClick={() => scrollToSection('home')}
          className={`text-xs font-medium transition-all duration-300 cursor-pointer px-3 py-1 rounded-full ${
            activeSection === 'home' 
              ? isDark
                ? 'text-white bg-white/20'
                : 'text-black bg-black/20'
              : isDark
                ? 'text-white/90 hover:text-white'
                : 'text-black/90 hover:text-black'
          }`}
        >
          Home
        </button>
        <button 
          onClick={() => scrollToSection('about')}
          className={`text-xs font-medium transition-all duration-300 cursor-pointer px-3 py-1 rounded-full ${
            activeSection === 'about' 
              ? isDark
                ? 'text-white bg-white/20'
                : 'text-black bg-black/20'
              : isDark
                ? 'text-white/90 hover:text-white'
                : 'text-black/90 hover:text-black'
          }`}
        >
          About
        </button>
        <button 
          onClick={() => scrollToSection('experience')}
          className={`text-xs font-medium transition-all duration-300 cursor-pointer px-3 py-1 rounded-full ${
            activeSection === 'experience' 
              ? isDark
                ? 'text-white bg-white/20'
                : 'text-black bg-black/20'
              : isDark
                ? 'text-white/90 hover:text-white'
                : 'text-black/90 hover:text-black'
          }`}
        >
          Experience
        </button>
        <button 
          onClick={() => scrollToSection('projects')}
          className={`text-xs font-medium transition-all duration-300 cursor-pointer px-3 py-1 rounded-full ${
            activeSection === 'projects' 
              ? isDark
                ? 'text-white bg-white/20'
                : 'text-black bg-black/20'
              : isDark
                ? 'text-white/90 hover:text-white'
                : 'text-black/90 hover:text-black'
          }`}
        >
          Projects
        </button>
        <button 
          onClick={() => scrollToSection('contact')}
          className={`text-xs font-medium transition-all duration-300 cursor-pointer px-3 py-1 rounded-full ${
            activeSection === 'contact' 
              ? isDark
                ? 'text-white bg-white/20'
                : 'text-black bg-black/20'
              : isDark
                ? 'text-white/90 hover:text-white'
                : 'text-black/90 hover:text-black'
          }`}
        >
          Contact
        </button>
      </div>
    </nav>
  );
} 