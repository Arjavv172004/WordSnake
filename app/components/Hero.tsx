'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Anton } from "next/font/google"

const gameFont = Anton({
  weight: '400',
  subsets: ['latin'],
})

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#4169E1]">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/bg.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* My Profile Button */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="absolute top-4 left-4 z-20"
      >
        <Link href="/profile">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-[#BBFF00] hover:bg-[#BBFF00]/90 rounded-full px-4 py-1.5 shadow-lg"
          >
            <Image
              src="/12.jpg"
              alt="Profile"
              width={32}
              height={32}
              className="rounded-full border-2 border-black"
            />
            <span className="text-lg font-black text-black">My Profile</span>
          </motion.div>
        </Link>
      </motion.div>

      {/* Hero Content */}
      <div className="relative flex flex-col items-center justify-center min-h-screen">
        <div className="relative z-10 flex flex-col items-center">
          <h1 className={`text-9xl md:text-[12rem] font-bold text-shadow-lg text-center mb-16 ${gameFont.className}`}>
            <motion.span 
              className="block text-white cursor-pointer transition-all duration-500"
              whileHover={{ 
                color: "#BBFF00",
                textShadow: "0 0 20px rgba(187, 255, 0, 0.5)"
              }}
            >
              WORD
            </motion.span>
            <motion.span 
              className="block text-white cursor-pointer transition-all duration-500"
              whileHover={{ 
                color: "#BBFF00",
                textShadow: "0 0 20px rgba(187, 255, 0, 0.5)"
              }}
            >
              SNAKE
            </motion.span>
          </h1>

          <div className="flex gap-6">
            <Link href="/challenges">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="play-button text-2xl py-6 px-12"
              >
                PLAY NOW
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
} 