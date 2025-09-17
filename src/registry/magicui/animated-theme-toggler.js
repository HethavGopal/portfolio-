'use client';

import { Moon, SunDim } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { useTheme } from 'next-themes';

const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export function AnimatedThemeToggler({ className = "" }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`fixed top-4 right-4 z-[9999] w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse ${className}`} />
    );
  }

  const isDarkMode = theme === 'dark';

  const changeTheme = async () => {
    if (!buttonRef.current) return;

    // Check if View Transition API is supported
    if (!document.startViewTransition) {
      // Fallback for browsers that don't support View Transition API
      setTheme(isDarkMode ? 'light' : 'dark');
      return;
    }

    await document.startViewTransition(() => {
      flushSync(() => {
        const dark = document.documentElement.classList.toggle('dark');
        setTheme(dark ? 'dark' : 'light');
      });
    }).ready;

    const { top, left, width, height } = buttonRef.current.getBoundingClientRect();
    const y = top + height / 2;
    const x = left + width / 2;

    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRad = Math.hypot(Math.max(left, right), Math.max(top, bottom));

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRad}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 700,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      }
    );
  };

  return (
    <button
      ref={buttonRef}
      onClick={changeTheme}
      className={cn(
        'fixed top-4 right-4 z-[9999] w-12 h-12 rounded-full bg-white/10 dark:bg-black/10 backdrop-blur-sm border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 flex items-center justify-center relative overflow-hidden',
        className
      )}
      style={{
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        zIndex: 9999
      }}
      aria-label="Toggle theme"
    >
      {/* Sun Icon */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
          isDarkMode 
            ? 'opacity-0 scale-0 rotate-180' 
            : 'opacity-100 scale-100 rotate-0'
        }`}
      >
        <div className="relative">
          {/* Simple Sun Circle */}
          <div className="w-4 h-4 bg-orange-500 rounded-full animate-pulse" />
          
          {/* Sun Rays */}
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '8s' }}>
            {/* Top */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0.5 h-1 bg-orange-500 rounded-full" />
            {/* Bottom */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0.5 h-1 bg-orange-500 rounded-full" />
            {/* Left */}
            <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-1 h-0.5 bg-orange-500 rounded-full" />
            {/* Right */}
            <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-1 h-0.5 bg-orange-500 rounded-full" />
            {/* Diagonal rays */}
            <div className="absolute -top-1.5 -left-1.5 w-0.5 h-0.5 bg-orange-500 rounded-full" />
            <div className="absolute -top-1.5 -right-1.5 w-0.5 h-0.5 bg-orange-500 rounded-full" />
            <div className="absolute -bottom-1.5 -left-1.5 w-0.5 h-0.5 bg-orange-500 rounded-full" />
            <div className="absolute -bottom-1.5 -right-1.5 w-0.5 h-0.5 bg-orange-500 rounded-full" />
          </div>
        </div>
      </div>

      {/* Moon Icon */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
          isDarkMode 
            ? 'opacity-100 scale-100 rotate-0' 
            : 'opacity-0 scale-0 -rotate-180'
        }`}
      >
        <div className="relative">
          {/* Static Crescent Moon - using overlapping circles to create crescent shape */}
          <div className="w-4 h-4 relative">
            {/* Main moon circle */}
            <div className="w-4 h-4 rounded-full bg-slate-400 absolute" />
            {/* Overlapping dark circle to create crescent pointing top-right */}
            <div className="w-3.5 h-3.5 rounded-full bg-gray-900 dark:bg-black absolute -top-0.5 left-1" />
          </div>
          
          {/* Animated Stars and Dots around the moon */}
          <div className="absolute -top-1 -right-1 w-0.5 h-0.5 bg-slate-300 rounded-full animate-ping" />
          <div className="absolute -bottom-1 -left-1 w-0.5 h-0.5 bg-slate-300 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
          <div className="absolute top-0 -left-2 w-0.5 h-0.5 bg-slate-300 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
          
          {/* Additional animated dots for more dynamic effect */}
          <div className="absolute -top-2 left-0 w-0.5 h-0.5 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
          <div className="absolute -right-2 top-1 w-0.5 h-0.5 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: '0.8s' }} />
          <div className="absolute -bottom-2 -right-1 w-0.5 h-0.5 bg-slate-300 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
          
          {/* Orbiting dots around the moon */}
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '15s' }}>
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-0.5 h-0.5 bg-slate-300 rounded-full opacity-60" />
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-0.5 h-0.5 bg-slate-300 rounded-full opacity-60" />
          </div>
          
          {/* Counter-rotating dots for more complex animation */}
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }}>
            <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-0.5 h-0.5 bg-slate-400 rounded-full opacity-40" />
            <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-0.5 h-0.5 bg-slate-400 rounded-full opacity-40" />
          </div>
        </div>
      </div>
    </button>
  );
}

export function AnimatedThemeTogglerDemo() {
  return (
    <div>
      <AnimatedThemeToggler />
    </div>
  );
}

export default AnimatedThemeTogglerDemo;
