'use client';

import { useCallback, useEffect, useRef } from 'react';

const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export function MagicCard({
  children,
  className = '',
  gradientColor = '#262626',
  gradientOpacity = 0.8,
  ...props
}) {
  const divRef = useRef(null);
  const gradientRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!divRef.current || !gradientRef.current) return;

    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gradientRef.current.style.setProperty('--x', `${x}px`);
    gradientRef.current.style.setProperty('--y', `${y}px`);
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (!gradientRef.current) return;
    gradientRef.current.style.opacity = gradientOpacity.toString();
  }, [gradientOpacity]);

  const handleMouseLeave = useCallback(() => {
    if (!gradientRef.current) return;
    gradientRef.current.style.opacity = '0';
  }, []);

  useEffect(() => {
    const div = divRef.current;
    if (!div) return;

    div.addEventListener('mousemove', handleMouseMove);
    div.addEventListener('mouseenter', handleMouseEnter);
    div.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      div.removeEventListener('mousemove', handleMouseMove);
      div.removeEventListener('mouseenter', handleMouseEnter);
      div.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

  return (
    <div
      ref={divRef}
      className={cn(
        'group relative overflow-hidden rounded-xl border border-white/10 bg-transparent p-0',
        className
      )}
      {...props}
    >
      <div
        ref={gradientRef}
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 ease-in-out"
        style={{
          background: `radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), ${gradientColor}, transparent 40%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function MagicCardDemo() {
  return (
    <div className="flex h-[500px] w-full flex-col gap-4 lg:h-[250px] lg:flex-row">
      <MagicCard
        className="cursor-pointer flex-col items-center justify-center shadow-2xl whitespace-nowrap text-4xl"
        gradientColor="#262626"
      >
        Magic
      </MagicCard>
      <MagicCard
        className="cursor-pointer flex-col items-center justify-center shadow-2xl whitespace-nowrap text-4xl"
        gradientColor="#D9D9D955"
      >
        Card
      </MagicCard>
    </div>
  );
}
