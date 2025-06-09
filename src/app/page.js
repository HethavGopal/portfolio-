'use client';

import { useState, useEffect } from 'react';
import ParticleBackground from '../components/ParticleBackground';
import DarkModeToggle from '../components/DarkModeToggle';
import Navbar from '../components/Navbar';
import HomeSection from '../components/HomeSection';
import AboutSection from '../components/AboutSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import { useTheme } from 'next-themes';

export default function Home() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    // Prevent scroll restoration and ensure page starts at top
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setShowContent(true), 300);
    }, 30); 

    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{
      scrollbarWidth: 'none', /* Firefox */
      msOverflowStyle: 'none', /* Internet Explorer 10+ */
    }}>
      <div 
        className="fixed inset-0 -z-20"
        style={{
          background: mounted && theme === 'dark' ? '#000000' : '#ffffff'
        }}
      />
      
      <ParticleBackground />
      
      {/* Navbar Component */}
      <Navbar />
      
      <div 
        className={`fixed inset-0 bg-black flex items-center justify-center z-50 transition-opacity duration-1000 ${
          isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-light text-white tracking-wide">
            Hethav Gopal
          </h1>
          <p className="text-lg md:text-xl font-extralight text-gray-400 mt-2 tracking-wider">
            Portfolio
          </p>
        </div>
      </div>
      
              
       <div 
         className={`transition-all duration-500 ${
           showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
         }`}
       >
        <DarkModeToggle />
        
        {/* Sections */}
        <HomeSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </div>
    </div>
  );
}
