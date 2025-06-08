'use client';

import ParticleBackground from '../components/ParticleBackground';
import DarkModeToggle from '../components/DarkModeToggle';

export default function Home() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative">
      {/* Animated Particle Background */}
      <ParticleBackground />
      
      {/* Dark Mode Toggle */}
      <DarkModeToggle />
      
      {/* Main Content */}
      <main className="text-center z-10 px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-black dark:text-white mb-4 font-[family-name:var(--font-geist-sans)]">
          Hethav Gopal
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl font-light text-gray-700 dark:text-gray-300 tracking-wide font-[family-name:var(--font-geist-sans)]">
          Full-Stack Developer / AI + Web Enthusiast
        </p>
      </main>
    </div>
  );
}
