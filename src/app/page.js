'use client';

import { useState, useEffect } from 'react';
import ParticleBackground from '../components/ParticleBackground';
import DarkModeToggle from '../components/DarkModeToggle';
import Navbar from '../components/Navbar';
import { useTheme } from 'next-themes';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';

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
    }, 250); 

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
        
        {/* Landing Page - Home Section */}
        <div id="home" className="h-screen w-full flex items-center justify-center relative z-10">
          <main className="text-center z-20 px-4 max-w-4xl">
            <div className="space-y-4">
              <h1 
                className="text-4xl md:text-6xl lg:text-7xl font-thin tracking-wide leading-tight"
                style={{ 
                  color: mounted && theme === 'dark' ? 'white' : 'black'
                }}
              >
                Hethav Gopal
              </h1>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-30 mx-auto"></div>
              <p 
                className="text-xs md:text-sm font-extralight tracking-widest uppercase"
                style={{ 
                  color: mounted && theme === 'dark' ? 'white' : 'black',
                  letterSpacing: '0.2em'
                }}
              >
                Mathetmatics and Computer Science Student @ University of Waterloo
                 
              </p>
            </div>
          </main>

          {/* Social Links - Only on Home Section */}
          <div className="absolute left-8 bottom-8 z-30 flex flex-col space-y-4">
            <a 
              href="https://github.com/HethavGopal" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
              style={{ color: mounted && theme === 'dark' ? 'white' : 'black' }}
            >
              <Github size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/in/hethav-gopal/" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
              style={{ color: mounted && theme === 'dark' ? 'white' : 'black' }}
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="mailto:your@email.com" 
              className="hover:opacity-70 transition-opacity"
              style={{ color: mounted && theme === 'dark' ? 'white' : 'black' }}
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* Placeholder sections for navigation */}
        <div id="about" className="h-screen w-full flex items-center justify-center relative z-10">
          <div className="text-center">
            <h2 
              className="text-3xl md:text-5xl font-thin tracking-wide"
              style={{ color: mounted && theme === 'dark' ? 'white' : 'black' }}
            >
              About Me
            </h2>
            <p 
              className="text-lg md:text-xl font-extralight mt-4 max-w-2xl"
              style={{ color: mounted && theme === 'dark' ? 'white' : 'black' }}
            >
              Coming soon...
            </p>
          </div>
        </div>

        <div id="projects" className="h-screen w-full flex items-center justify-center relative z-10">
          <div className="text-center">
            <h2 
              className="text-3xl md:text-5xl font-thin tracking-wide"
              style={{ color: mounted && theme === 'dark' ? 'white' : 'black' }}
            >
              Projects
            </h2>
            <p 
              className="text-lg md:text-xl font-extralight mt-4 max-w-2xl"
              style={{ color: mounted && theme === 'dark' ? 'white' : 'black' }}
            >
              Coming soon...
            </p>
          </div>
        </div>

        <div id="contact" className="h-screen w-full flex items-center justify-center relative z-10">
          <div className="text-center">
            <h2 
              className="text-3xl md:text-5xl font-thin tracking-wide"
              style={{ color: mounted && theme === 'dark' ? 'white' : 'black' }}
            >
              Contact
            </h2>
            <p 
              className="text-lg md:text-xl font-extralight mt-4 max-w-2xl"
              style={{ color: mounted && theme === 'dark' ? 'white' : 'black' }}
            >
              Coming soon...
            </p>
          </div>
        </div>
        
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center space-y-2">
          <span 
            className="text-xs font-light tracking-wide"
            style={{ color: mounted && theme === 'dark' ? '#94a3b8' : '#64748b' }}
          >
            Explore
          </span>
          <ChevronDown 
            size={16} 
            className="animate-bounce"
            style={{ color: mounted && theme === 'dark' ? '#94a3b8' : '#64748b' }}
          />
        </div>
      </div>
    </div>
  );
}
