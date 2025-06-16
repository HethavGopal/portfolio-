'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { ChevronDown, Github, Linkedin, Mail, Instagram } from 'lucide-react';

export default function HomeSection() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div id="home" className="h-screen w-full flex items-center justify-center relative z-10">
      <main className="text-center z-20 px-4 max-w-4xl">
        <div className="space-y-4">
          <h1 
            className="text-4xl md:text-6xl lg:text-7xl font-thin tracking-wide leading-tight"
            style={{ 
              color: mounted && theme === 'dark' ? 'white' : 'black'
            }}
          >
            Hi, I'm Hethav Gopal
          </h1>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-30 mx-auto"></div>
          <p 
            className="text-xs md:text-sm font-extralight tracking-widest uppercase"
            style={{ 
              color: mounted && theme === 'dark' ? 'white' : 'black',
              letterSpacing: '0.2em'
            }}
          >
            Mathematics and Computer Science Student @ University of Waterloo
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
          href="mailto:hethava.v@gmail.com" 
          className="hover:opacity-70 transition-opacity"
          style={{ color: mounted && theme === 'dark' ? 'white' : 'black' }}
        >
          <Mail size={20} />
        </a>
        <a 
          href="https://www.instagram.com/hethav.06" 
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-70 transition-opacity"
          style={{ color: mounted && theme === 'dark' ? 'white' : 'black' }}
        >
          <Instagram size={20} />
        </a>
      </div>

      {/* Scroll Indicator - Below Home Section */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center space-y-2">
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