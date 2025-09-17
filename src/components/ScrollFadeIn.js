'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function ScrollFadeIn({ 
  children, 
  className = '', 
  delay = 0, 
  duration = 0.6,
  y = 30,
  once = true,
  threshold = 0.1 
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once, 
    threshold,
    margin: "0px 0px -100px 0px" 
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ 
        duration, 
        delay,
        ease: [0.25, 0.25, 0, 1] // Custom easing for smooth animation
      }}
    >
      {children}
    </motion.div>
  );
}
