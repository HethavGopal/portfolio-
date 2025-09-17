'use client';

import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { Calendar, MapPin, ExternalLink, Briefcase, Code, ChevronDown } from 'lucide-react';
import assistiqLogo from '../assets/assistiq_logo.jpg';
import enabledtalentLogo from '../assets/enabledtalent_logo.jpg';
import ScrollFadeIn from './ScrollFadeIn';

export default function ExperienceSection() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleCards, setVisibleCards] = useState(new Set());
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Progressive timeline fill based on scroll and card visibility
  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;
      
      // More intuitive and smooth scroll progress calculation
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;
      
      let progress = 0;
      
      if (sectionBottom > 0 && sectionTop < windowHeight) {
        // Start when the FIRST card reaches 80% of the viewport for earlier timeline activation
        const firstCardEl = cardRefs.current && cardRefs.current[0];
        // Fallback to a reasonable trigger if ref not ready
        let triggerTop = windowHeight * 0.8;
        let afterTriggerSlack = windowHeight * 0.2;

        if (firstCardEl) {
          const firstRect = firstCardEl.getBoundingClientRect();
          const firstOffsetWithinSection = firstRect.top - rect.top; // distance from section top to first card top
          const viewportTrigger = windowHeight * 0.8; // start much earlier - when first card is at 80% of screen
          triggerTop = viewportTrigger - firstOffsetWithinSection;
          afterTriggerSlack = windowHeight - viewportTrigger; // remaining viewport after trigger
        }

        if (sectionTop <= triggerTop) {
          // Calculate smooth progress based on distance since trigger
          const viewportEntry = Math.max(0, triggerTop - sectionTop);
          const totalScrollDistance = sectionHeight + afterTriggerSlack;
          progress = viewportEntry / totalScrollDistance;

          // Smooth easing function for more natural feel
          progress = Math.min(1, progress * 1.2);
          progress = progress * progress * (3 - 2 * progress);
        }
      }
      
      setScrollProgress(Math.max(0, Math.min(1, progress)));
    };

    // Intersection Observer for individual cards
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const cardIndex = parseInt(entry.target.dataset.cardIndex);
          if (entry.isIntersecting) {
            setVisibleCards(prev => new Set([...prev, cardIndex]));
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-10% 0px -10% 0px'
      }
    );

    // Observe all cards
    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [mounted]);

  const isDark = mounted && theme === 'dark';

  const experiences = [
    {
      id: 1,
      company: "AssistIQ",
      role: "Software Engineering Intern",
      period: "Sept 2025 - Dec 2025",
      location: "Toronto, ON",
      logo: assistiqLogo,
      technologies: ["Python", "TensorFlow", "NumPy", "Matplotlib", "Scikit-Learn"],
      description: "Currently working with the ML and Data Science team to develop data-driven solutions, and integrate machine learning models into production systems.",
      current: true
    },
    {
      id: 2,
      company: "Enabled Talent",
      role: "Software Engineering Intern",
      period: "Jun 2025 - Aug 2025",
      location: "Toronto, ON",
      logo: enabledtalentLogo,
      technologies: ["React", "TypeScript", "AWS", "PostgreSQL", "Node.js", "Docker"],
      description: "Developed core features for a UNICEF-backed job portal supporting 5,000+ youth job seekers, improved platform performance with AWS, designed PostgreSQL schemas, and contributed to deployment workflows.",
      current: false
    }
  ];

  return (
    <div id="experience" ref={sectionRef} className="min-h-screen w-full flex items-center justify-center relative z-10 py-20">
      {/* Enhanced Background Elements with Geometric Patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }}></div>
        
      </div>

      {/* Add custom CSS for grid animation */}
      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Simplified Header */}
        <ScrollFadeIn delay={0.1}>
          <div className="text-center mb-25">
            <h2 
              className="text-3xl md:text-4xl font-light tracking-wide mb-6"
              style={{ color: isDark ? 'white' : 'black' }}
            >
              Experience
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-40 mx-auto"></div>
          </div>
        </ScrollFadeIn>

        {/* Unique Timeline Layout */}
        <div className="relative max-w-5xl mx-auto">
          {/* Progressive Timeline Line */}
          <div className="absolute left-12 top-0 bottom-0 w-0.5">
            {/* Background line (unfilled) */}
            <div className={`absolute inset-0 ${isDark ? 'bg-white/10' : 'bg-black/10'}`}></div>
            
            {/* Progressive fill line */}
            <div 
              className={`absolute top-0 left-0 w-full ${isDark ? 'bg-white' : 'bg-black'} transition-all duration-150 ease-out`}
              style={{ 
                height: `${scrollProgress * 100}%`,
                boxShadow: isDark 
                  ? '0 0 15px rgba(255, 255, 255, 0.3), 0 0 30px rgba(255, 255, 255, 0.1)' 
                  : '0 0 15px rgba(0, 0, 0, 0.3), 0 0 30px rgba(0, 0, 0, 0.1)'
              }}
            ></div>
            
            {/* Progress indicator circle */}
            <div 
              className={`absolute left-1/2 w-2 h-2 rounded-full ${isDark ? 'bg-white' : 'bg-black'} transition-all duration-150 ease-out`}
              style={{ 
                top: `${scrollProgress * 100}%`,
                transform: 'translateX(-50%) translateY(-50%)',
                opacity: scrollProgress > 0.01 ? 1 : 0,
                boxShadow: isDark 
                  ? '0 0 6px rgba(255, 255, 255, 0.8), 0 0 12px rgba(255, 255, 255, 0.4)' 
                  : '0 0 6px rgba(0, 0, 0, 0.8), 0 0 12px rgba(0, 0, 0, 0.4)'
              }}
            ></div>
          </div>
          
          {/* Enhanced Floating Timeline Markers with Geometric Shapes */}
          <div className="absolute left-6 top-16 w-12 h-12 opacity-10">
            <div className={`absolute inset-0 border ${isDark ? 'border-white/20' : 'border-black/20'} rounded-full animate-spin`} style={{ animationDuration: '20s' }}></div>
            <div className={`absolute inset-2 border ${isDark ? 'border-white/30' : 'border-black/30'} rounded-full animate-spin`} style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
            <div className={`absolute inset-4 ${isDark ? 'bg-white/20' : 'bg-black/20'} rounded-full`}></div>
          </div>
          
          
          {/* Subtle connecting lines */}
          <div className={`absolute left-12 top-0 w-px h-full ${isDark ? 'bg-gradient-to-b from-transparent via-white/5 to-transparent' : 'bg-gradient-to-b from-transparent via-black/5 to-transparent'}`}></div>
          
          
          {experiences.map((exp, index) => (
            <ScrollFadeIn key={exp.id} delay={0.3 + (index * 0.2)} className={`${index < experiences.length - 1 ? 'mb-16' : ''}`}>
              <div 
                ref={(el) => cardRefs.current[index] = el}
                data-card-index={index}
                className="relative group"
              >
              {/* Animated Timeline Node */}
              <div className="absolute top-4 z-20" style={{ left: '3.1rem', transform: 'translateX(-50%)' }}>
                <div className="relative">
                  {/* Main Timeline Node - Static */}
                  <div className={`relative w-4 h-4 rounded-full transition-all duration-500 ${isDark ? 'bg-white' : 'bg-black'} border-2 ${isDark ? 'border-black/60' : 'border-white/60'} shadow-lg group-hover:scale-110`}
                  style={{ 
                    transitionDelay: visibleCards.has(index) ? `${index * 300}ms` : '0ms'
                  }}>
                    {/* Current Status Indicator */}
                    {exp.current && (
                      <div className={`absolute inset-0 rounded-full ${isDark ? 'bg-white' : 'bg-black'} opacity-40`}></div>
                    )}
                  </div>
                  
                  {/* Animated Connection Line */}
                  <div className={`absolute top-1/2 left-full h-0.5 transform -translate-y-1/2 transition-all duration-500 ${
                    visibleCards.has(index) 
                      ? `w-8 ${isDark ? 'bg-gradient-to-r from-white/60 via-white/30 to-transparent' : 'bg-gradient-to-r from-black/60 via-black/30 to-transparent'}` 
                      : 'w-0 bg-transparent'
                  }`}
                  style={{ 
                    transitionDelay: visibleCards.has(index) ? `${index * 400}ms` : '0ms'
                  }}></div>
                </div>
              </div>

              {/* Enhanced Animated Experience Card */}
              <div className={`relative ml-20 group/card ${isDark ? 'bg-gradient-to-br from-slate-800/40 via-slate-900/30 to-black/20' : 'bg-gradient-to-br from-white/40 via-gray-50/30 to-gray-100/20'} backdrop-blur-xl border ${isDark ? 'border-white/10' : 'border-black/10'} rounded-2xl p-4 hover:${isDark ? 'from-slate-800/50 via-slate-900/35 to-black/25' : 'from-white/50 via-gray-50/35 to-gray-100/25'} hover:border-white/15 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg shadow-md overflow-hidden`}>
                
                {/* Animated border effect */}
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500`}>
                  <div className={`absolute inset-0 rounded-2xl ${isDark ? 'bg-gradient-to-r from-white/5 via-transparent to-white/5' : 'bg-gradient-to-r from-black/5 via-transparent to-black/5'}`}></div>
                </div>
                
                {/* Corner decorations */}
                <div className={`absolute top-0 left-0 w-8 h-8 ${isDark ? 'border-l-2 border-t-2 border-white/10' : 'border-l-2 border-t-2 border-black/10'} rounded-tl-2xl opacity-30`}></div>
                <div className={`absolute bottom-0 right-0 w-8 h-8 ${isDark ? 'border-r-2 border-b-2 border-white/10' : 'border-r-2 border-b-2 border-black/10'} rounded-br-2xl opacity-30`}></div>
                  
                {/* Compact Header Layout */}
                <div className="flex items-start justify-between mb-3">
                  {/* Left - Logo & Main Info */}
                  <div className="flex items-start space-x-3 flex-1">
                    {/* Smaller Logo */}
                    <div className="relative w-10 h-10 rounded-xl overflow-hidden border-2 border-white/20 group-hover:border-white/30 transition-all duration-300 shadow-sm flex-shrink-0">
                      <Image
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h3 
                          className="text-base font-bold"
                          style={{ color: isDark ? 'white' : 'black' }}
                        >
                          {exp.role}
                        </h3>
                        {exp.current && (
                          <div className={`px-2 py-0.5 ${isDark ? 'bg-white/20 border-white/30' : 'bg-black/20 border-black/30'} border rounded-lg backdrop-blur-sm`}>
                            <span className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-black'}`}>CURRENT</span>
                          </div>
                        )}
                      </div>
                      <p 
                        className="text-sm font-medium opacity-80"
                        style={{ color: isDark ? 'white' : 'black' }}
                      >
                        @ {exp.company}
                      </p>
                    </div>
                  </div>
                  
                  {/* Right - Date & Location */}
                  <div className="text-xs opacity-70 text-right">
                    <div className="mb-1">
                      <span style={{ color: isDark ? 'white' : 'black' }}>{exp.period}</span>
                    </div>
                    <div>
                      <span style={{ color: isDark ? 'white' : 'black' }}>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Compact Tech Stack */}
                <div className="mb-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className={`p-1 rounded-lg ${isDark ? 'bg-white/20' : 'bg-black/20'}`}>
                      <Code size={12} style={{ color: isDark ? 'white' : 'black' }} />
                    </div>
                    <h4 className="text-sm font-semibold opacity-80" style={{ color: isDark ? 'white' : 'black' }}>
                      Tech Stack
                    </h4>
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className={`px-2 py-1 text-xs font-medium ${isDark ? 'bg-white/10 text-white/90 border-white/20' : 'bg-black/10 text-black/90 border-black/20'} border rounded-lg backdrop-blur-sm hover:scale-105 transition-all duration-200`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Compact Description */}
                <div className={`p-3 rounded-xl ${isDark ? 'bg-white/5' : 'bg-black/5'} border ${isDark ? 'border-white/10' : 'border-black/10'} backdrop-blur-sm`}>
                  <p 
                    className="text-sm leading-relaxed opacity-85"
                    style={{ color: isDark ? 'white' : 'black' }}
                  >
                    {exp.description}
                  </p>
                </div>
              </div>
              </div>
            </ScrollFadeIn>
          ))}
        </div>

        {/* Bottom Scroll Indicator - Outside timeline container */}
        <div className="text-center mt-35">
          <div className="flex flex-col items-center space-y-2">
            <span 
              className="text-xs font-light tracking-wide"
              style={{ color: isDark ? '#94a3b8' : '#64748b' }}
            >
              Projects
            </span>
            <ChevronDown 
              size={16} 
              className="animate-bounce"
              style={{ color: isDark ? '#94a3b8' : '#64748b' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

