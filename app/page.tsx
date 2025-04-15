'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import CustomCursor from './components/CustomCursor'
import Navigation from './components/Navigation'
import Link from 'next/link'
import { Anton } from "next/font/google"

const gameFont = Anton({
  weight: '400',
  subsets: ['latin'],
})

export default function Home() {
  const [showSplash, setShowSplash] = useState(() => {
    if (typeof window !== 'undefined') {
      return !localStorage.getItem('hasVisitedBefore');
    }
    return true;
  });

  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => {
        setShowSplash(false);
        localStorage.setItem('hasVisitedBefore', 'true');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  return (
    <main className="relative overflow-hidden">
      <AnimatePresence mode="wait">
        {showSplash ? (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              scale: 1.2,
              filter: "blur(10px)",
              transition: { duration: 1 }
            }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#4169E1] via-[#00FF00] to-[#00BFFF]"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.8,
                ease: "easeOut"
              }}
              className="flex items-center gap-8"
            >
              <motion.span
                className={`text-8xl font-black tracking-wider ${gameFont.className} text-transparent bg-clip-text bg-gradient-to-r from-black via-[#BBFF00] to-black`}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                style={{
                  textShadow: '4px 4px 0px rgba(0,0,0,0.2)',
                  WebkitTextStroke: '2px black'
                }}
              >
                WORD
              </motion.span>

              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Image
                  src="/1.png"
                  alt="Snake Logo"
                  width={200}
                  height={200}
                  className="transform -scale-x-100"
                />
              </motion.div>

              <motion.span
                className={`text-8xl font-black tracking-wider ${gameFont.className} text-transparent bg-clip-text bg-gradient-to-r from-black via-[#BBFF00] to-black`}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                style={{
                  textShadow: '4px 4px 0px rgba(0,0,0,0.2)',
                  WebkitTextStroke: '2px black'
                }}
              >
                SNAKE
              </motion.span>
            </motion.div>
          </motion.div>
        ) : (
          <div>
            <CustomCursor />
            <Navigation />
            <div>
              <Hero />
              <About />
              <Projects />
              <Testimonials />
              <Contact />
            </div>
          </div>
        )}
      </AnimatePresence>
    </main>
  )
}
