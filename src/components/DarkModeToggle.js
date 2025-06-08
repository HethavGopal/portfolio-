'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="fixed top-4 right-4 z-50 w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
    );
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 p-2 rounded-full bg-white/10 dark:bg-black/10 backdrop-blur-sm border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-200 shadow-lg"
      aria-label="Toggle dark mode"
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-white" />
      ) : (
        <Moon className="w-4 h-4 text-black" />
      )}
    </button>
  );
};

export default DarkModeToggle; 