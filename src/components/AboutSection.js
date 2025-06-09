'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import profilePic from '../assets/samplee.jpg';

export default function AboutSection() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === 'dark';

  return (
    <div id="about" className="min-h-screen w-full flex items-center justify-center relative z-10 py-16">
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

          {/* Right Column - Description */}
          <div className="space-y-4">
            <div>
             
              <div className="space-y-3 text-sm leading-relaxed">
                <p className={`${isDark ? 'text-white/90' : 'text-black/90'}`}>
                                 I'm a second year Math + CS student and full-stack developer based in <span className="text-gray-500 font-bold">Toronto</span>. I build full-stack applications that are both useful and fun, and lately I've been really 
                 interested in AI. When I'm not coding, I'm probably out playing soccer or Valorant (peaked Ascendant).
                </p>
         
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 