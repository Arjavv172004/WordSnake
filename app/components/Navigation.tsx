'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuVariants = {
    closed: {
      opacity: 0,
      scale: 0.8,
      filter: "blur(10px)",
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    open: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const navItems = [
    { title: 'LEADERBOARD', href: '/leaderboard', delay: 0.2 },
    { title: 'HOW TO PLAY?', href: '/tutorial', delay: 0.3 },
    { title: 'CONTACT US', href: '/contact', delay: 0.4 }
  ];

  return (
    <>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="fixed top-4 right-4 z-50"
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#BBFF00] hover:bg-[#BBFF00]/90 rounded-full px-6 py-3 flex items-center gap-2 shadow-lg"
        >
          <Image
            src="/1.png"
            alt="Snake"
            width={24}
            height={24}
            className="transform -scale-x-100"
          />
          <span className="text-xl font-bold text-black">{isOpen ? 'CLOSE' : 'MENU'}</span>
        </motion.button>
      </motion.div>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center"
            style={{
              background: 'linear-gradient(to bottom right, #4169E1, #00FF00, #00BFFF)'
            }}
          >
            <div className="flex flex-col items-center gap-16 w-full max-w-2xl px-6">
              {navItems.map((item) => (
                <motion.div
                  key={item.title}
                  className="w-full relative group"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: item.delay }}
                >
                  <Link href={item.href} onClick={() => setIsOpen(false)}>
                    <motion.div
                      className="bg-[#BBFF00] hover:bg-[#D4FF4D] transition-all duration-300 rounded-2xl py-8 px-12 flex items-center justify-between shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 relative z-10"
                      animate={{ 
                        y: [0, -10, 0],
                        rotate: [0, 2, 0]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: item.delay
                      }}
                    >
                      <span className="text-4xl font-black text-black tracking-wider">
                        {item.title}
                      </span>
                      <motion.div
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                      >
                        <Image
                          src="/1.png"
                          alt="Snake"
                          width={40}
                          height={40}
                          className="transform -scale-x-100"
                        />
                      </motion.div>
                    </motion.div>
                  </Link>
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-[#BBFF00] rounded-2xl filter blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation; 