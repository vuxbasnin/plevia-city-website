'use client';

import dynamic from 'next/dynamic';
import React from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  once?: boolean;
}

// Dynamic import để tránh vấn đề SSR
const MotionDiv = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.div })), {
  ssr: false,
});

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  y = 40,
  duration = 0.7,
  once = true,
}) => {
  return (
    <MotionDiv
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration, ease: 'easeOut', delay }}
      viewport={{ once, amount: 0.2 }}
    >
      {children}
    </MotionDiv>
  );
};

export default ScrollReveal; 