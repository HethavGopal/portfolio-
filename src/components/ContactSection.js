'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Mail, Github, Linkedin, Calendar, Briefcase } from 'lucide-react';

export default function ContactSection() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === 'dark';

  return (
    <div id="contact" className="w-full relative z-10 flex justify-center pt-24 pb-24">
      <div className="max-w-4xl mx-auto px-6 pb-24">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 
            className="text-3xl md:text-4xl font-thin tracking-wide"
            style={{ color: isDark ? 'white' : 'black' }}
          >
            Let&apos;s Connect
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-30 mx-auto mt-4"></div>
        </div>

        {/* Social Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a 
            href="mailto:hethava.v@gmail.com"
            className={`group p-4 rounded-xl backdrop-blur-sm border flex flex-col items-center gap-2 transition-all duration-300 ${
              isDark 
                ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                : 'bg-black/5 border-black/10 hover:bg-black/10'
            }`}
          >
            <div className={`p-3 rounded-full ${
              isDark 
                ? 'bg-white/10 group-hover:bg-white/20' 
                : 'bg-black/10 group-hover:bg-black/20'
            } transition-all duration-300`}>
              <Mail size={20} className={isDark ? 'text-white' : 'text-black'} />
            </div>
            <span className={`text-sm font-medium ${isDark ? 'text-white/70' : 'text-black/70'}`}>
              Email
            </span>
          </a>

          <a 
            href="https://github.com/HethavGopal"
            target="_blank"
            rel="noopener noreferrer"
            className={`group p-4 rounded-xl backdrop-blur-sm border flex flex-col items-center gap-2 transition-all duration-300 ${
              isDark 
                ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                : 'bg-black/5 border-black/10 hover:bg-black/10'
            }`}
          >
            <div className={`p-3 rounded-full ${
              isDark 
                ? 'bg-white/10 group-hover:bg-white/20' 
                : 'bg-black/10 group-hover:bg-black/20'
            } transition-all duration-300`}>
              <Github size={20} className={isDark ? 'text-white' : 'text-black'} />
            </div>
            <span className={`text-sm font-medium ${isDark ? 'text-white/70' : 'text-black/70'}`}>
              GitHub
            </span>
          </a>

          <a 
            href="https://www.linkedin.com/in/hethav-gopal/"
            target="_blank"
            rel="noopener noreferrer"
            className={`group p-4 rounded-xl backdrop-blur-sm border flex flex-col items-center gap-2 transition-all duration-300 ${
              isDark 
                ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                : 'bg-black/5 border-black/10 hover:bg-black/10'
            }`}
          >
            <div className={`p-3 rounded-full ${
              isDark 
                ? 'bg-white/10 group-hover:bg-white/20' 
                : 'bg-black/10 group-hover:bg-black/20'
            } transition-all duration-300`}>
              <Linkedin size={20} className={isDark ? 'text-white' : 'text-black'} />
            </div>
            <span className={`text-sm font-medium ${isDark ? 'text-white/70' : 'text-black/70'}`}>
              LinkedIn
            </span>
          </a>
        </div>

        {/* Additional Info */}
        <div className="mt-12 flex justify-center">
          <div className={`p-4 rounded-xl backdrop-blur-sm border ${
            isDark 
              ? 'bg-white/5 border-white/10' 
              : 'bg-black/5 border-black/10'
          }`}>
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-full ${
                isDark 
                  ? 'bg-white/10' 
                  : 'bg-black/10'
              }`}>
                <Briefcase size={18} className={isDark ? 'text-white' : 'text-black'} />
              </div>
              <div>
                <h3 className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                  Looking For
                </h3>
                <p className={`${isDark ? 'text-white/70' : 'text-black/70'}`}>
                  Fall 2025 and Summer 2026<br />
                  Internships
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 