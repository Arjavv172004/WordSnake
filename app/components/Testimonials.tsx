'use client'

import { motion, LazyMotion, domAnimation } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function Testimonials() {
  return (
    <LazyMotion features={domAnimation}>
      <section className="relative bg-[#FF9B5C] py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-black text-7xl md:text-8xl font-black tracking-tighter text-center mb-12"
          >
            EXPLORE OUR MINI GAMES
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-black text-center space-y-8 max-w-4xl mx-auto mb-16"
          >
            <p className="text-2xl">
              Take a break and challenge yourself with our exciting collection of mini-games!
            </p>
            <p className="text-2xl">
              Test your word-guessing skills in Hangman or show off your reflexes in Snake Byte. Each game offers unique challenges and endless fun.
            </p>
            <p className="text-2xl">
              Ready to play? Choose your game and start your adventure!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center gap-8"
          >
            <Link href="/hangman">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#BBFF00] text-black font-bold text-xl px-12 py-4 rounded-full border-b-[4px] border-black/25 hover:border-b-[2px] hover:translate-y-[2px] active:border-b-[0px] active:translate-y-[4px] transition-all duration-150 shadow-xl flex items-center gap-2"
              >
                <Image
                  src="/1.png"
                  alt="Snake"
                  width={24}
                  height={24}
                  className="transform -scale-x-100"
                />
                HANGMAN
              </motion.button>
            </Link>
            <Link href="/game">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#BBFF00] text-black font-bold text-xl px-12 py-4 rounded-full border-b-[4px] border-black/25 hover:border-b-[2px] hover:translate-y-[2px] active:border-b-[0px] active:translate-y-[4px] transition-all duration-150 shadow-xl flex items-center gap-2"
              >
                <Image
                  src="/1.png"
                  alt="Snake"
                  width={24}
                  height={24}
                  className="transform -scale-x-100"
                />
                SNAKE BYTE
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Small Snake Icon */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="absolute bottom-24 left-8"
        >
          <Image
            src="/1.png"
            alt="Snake"
            width={48}
            height={48}
            className="transform -scale-x-100"
          />
        </motion.div>

        {/* Wavy Border */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            preserveAspectRatio="none"
          >
            <path
              d="M0 0C240 80 480 120 720 120C960 120 1200 80 1440 0V120H0V0Z"
              fill="#4169E1"
            />
          </svg>
        </div>
      </section>
    </LazyMotion>
  )
} 