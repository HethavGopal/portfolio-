'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

const animationVariants = {
  blurInUp: {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.05,
        },
      },
    },
    item: {
      hidden: {
        opacity: 0,
        y: 10,
        filter: 'blur(8px)',
      },
      visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
          duration: 0.4,
        },
      },
    },
  },
  fadeInUp: {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
    },
    item: {
      hidden: {
        opacity: 0,
        y: 20,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
        },
      },
    },
  },
  slideInLeft: {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.03,
        },
      },
    },
    item: {
      hidden: {
        opacity: 0,
        x: -20,
      },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.4,
        },
      },
    },
  },
};

export function TextAnimate({
  children,
  animation = 'blurInUp',
  by = 'character',
  className = '',
  once = true,
  ...props
}) {
  const animationConfig = animationVariants[animation] || animationVariants.blurInUp;

  const segments = useMemo(() => {
    if (by === 'character') {
      return children.split('');
    } else if (by === 'word') {
      return children.split(' ');
    }
    return [children];
  }, [children, by]);

  return (
    <motion.div
      className={cn('inline-block', className)}
      variants={animationConfig.container}
      initial="hidden"
      animate="visible"
      viewport={{ once }}
      {...props}
    >
      {segments.map((segment, index) => (
        <motion.span
          key={index}
          variants={animationConfig.item}
          className="inline-block"
          style={{
            marginRight: by === 'word' && segment !== segments[segments.length - 1] ? '0.25em' : '0',
          }}
        >
          {segment === ' ' ? '\u00A0' : segment}
        </motion.span>
      ))}
    </motion.div>
  );
}

export function TextAnimateDemo() {
  return (
    <TextAnimate animation="blurInUp" by="character" once>
      Blur in by character
    </TextAnimate>
  );
}
