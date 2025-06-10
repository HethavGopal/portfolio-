'use client';

import { useTheme } from 'next-themes';
import { MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Footer() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === 'dark';

  return (
    <footer className="fixed bottom-0 left-0 w-full z-50">
      <div className={`p-4 backdrop-blur-sm border-t flex items-center justify-center gap-2 ${
        isDark 
          ? 'bg-white/5 border-white/10' 
          : 'bg-black/5 border-black/10'
      }`}>
        <MapPin size={16} className={isDark ? 'text-white/50' : 'text-black/50'} />
        <p className={`text-sm ${isDark ? 'text-white/50' : 'text-black/50'}`}>
          Hethav Gopal • Toronto, Canada
        </p>
      </div>
    </footer>
  );
} 