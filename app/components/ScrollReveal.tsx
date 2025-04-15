'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const ScrollReveal = ({ children, className = '', delay = 0 }: ScrollRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-100px",
    amount: 0.1 // Trigger when 10% of the element is visible
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{
        duration: 0.5,
        delay: delay,
        ease: "easeOut"
      }}
      className={`${className} ${!isInView ? 'invisible' : ''}`}
      style={{
        willChange: 'opacity, transform',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden'
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal; 