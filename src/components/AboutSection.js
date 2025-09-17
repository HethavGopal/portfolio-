'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import profilePic from '../assets/self-pic.jpg';
import { TextAnimate } from '../registry/magicui/text-animate';
import ScrollFadeIn from './ScrollFadeIn';

export default function AboutSection() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === 'dark';

  return (
    <div id="about" className="h-screen w-full flex items-center justify-center relative z-10">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 
            className="text-3xl md:text-4xl font-thin tracking-wide"
            style={{ color: isDark ? 'white' : 'black' }}
          >
            About Me
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-30 mx-auto mt-4"></div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Column - Image Container */}
          <ScrollFadeIn delay={0.2}>
            <div className="relative">
            <div className={`w-full aspect-square max-w-48 mx-auto rounded-full ${isDark ? 'bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20' : 'bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10'} flex items-center justify-center backdrop-blur-sm border ${isDark ? 'border-white/20' : 'border-black/20'} relative overflow-hidden`}>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10"></div>
              <div className="relative w-full h-full rounded-full overflow-hidden z-10">
                <Image
                  src={profilePic}
                  alt="Hethav Gopal"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            </div>
          </ScrollFadeIn>

          {/* Right Column - Description */}
          <ScrollFadeIn delay={0.2}>
            <div className="space-y-4 text-center">
            <div>
              <div className="space-y-3 text-sm leading-relaxed">
                <p className={`text-center ${isDark ? 'text-white/90' : 'text-black/90'}`}>
                  I'm a second year Math + CS student and full-stack developer based in Toronto. I'm currently looking for Winter and Summer 2026 Internships in full stack development and ML. Feel free to contact me if you have any questions!
                </p>
              </div>
            </div>
            </div>
          </ScrollFadeIn>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center space-y-2">
        <span 
          className="text-xs font-light tracking-wide"
          style={{ color: mounted && theme === 'dark' ? '#94a3b8' : '#64748b' }}
        >
          Experience
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