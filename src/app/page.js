'use client';

import { useState, useEffect } from 'react';
import ParticleBackground from '../components/ParticleBackground';
import DarkModeToggle from '../components/DarkModeToggle';
import { useTheme } from 'next-themes';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';

export default function Home() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Ensure component is mounted before accessing theme
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <div className="relative min-h-screen">
      {/* Solid Background */}
      <div 
        className="fixed inset-0 -z-20"
        style={{
          background: mounted && theme === 'dark' ? '#000000' : '#ffffff'
        }}
      />
      
      {/* Animated Particle Background - Always render for animation */}
      <ParticleBackground />
      
      {/* Dark Mode Toggle */}
      <DarkModeToggle />
      
      {/* Landing Page - Exactly 100vh */}
      <div className="h-screen w-full flex items-center justify-center relative z-10">
        {/* Main Content */}
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
              className="text-lg md:text-xl font-extralight tracking-widest uppercase"
              style={{ 
                color: mounted && theme === 'dark' ? 'white' : 'black',
                letterSpacing: '0.2em'
              }}
            >
              Full-Stack Developer
            </p>
          </div>
        </main>
      </div>
      
      {/* Social Links */}
      <div className="fixed left-8 bottom-8 z-30 flex flex-col space-y-4">
        <a 
          href="https://github.com" 
          className="hover:opacity-70 transition-opacity"
          style={{ color: mounted && theme === 'dark' ? 'white' : 'black' }}
        >
          <Github size={20} />
        </a>
        <a 
          href="https://linkedin.com" 
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
      
      {/* Scroll Indicator */}
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
  );
}
