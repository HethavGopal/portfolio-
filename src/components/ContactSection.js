'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function ContactSection() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
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
  );
} 