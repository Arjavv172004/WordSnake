'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function About() {
  return (
    <div className="min-h-screen bg-[#BBFF00] p-8 relative overflow-hidden">
      <motion.h1 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-8xl font-black mb-12"
      >
        ABOUT THE WORD SNAKE
      </motion.h1>

      <div className="flex flex-col md:flex-row gap-12 items-center">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 text-xl space-y-8"
        >
          <p>
            Welcome to Word Snake, where gaming meets learning in an exciting new way! Our platform transforms the classic snake game into an innovative word collection adventure that challenges both your reflexes and vocabulary.
          </p>

          <p>
            Our signature game, Snake Byte, puts a unique twist on traditional gameplay. Guide your snake to collect letters in the correct sequence to form words, while avoiding collisions with walls and yourself. With multiple difficulty levels and customizable snake colors, every player can find their perfect challenge.
          </p>

          <p>
            Beyond Snake Byte, we offer a variety of mini-games including Hangman and more, each designed to test different skills while keeping you entertained. Our daily challenges give you fresh objectives to tackle, keeping the gameplay experience dynamic and engaging.
          </p>

          <p>
            Track your progress on our global leaderboard, compete with players worldwide, and see your name rise to the top. Whether you're here to improve your word skills, challenge yourself with our daily puzzles, or simply have fun, Word Snake has something for everyone.
          </p>
        </motion.div>

        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          <div className="absolute -top-4 -right-4 bg-[#BBFF00] rounded-full p-4 z-10">
            <span className="text-4xl">😊</span>
          </div>
          <div className="rounded-[40px] overflow-hidden border-8 border-black">
            <Image
              src="/1.png"
              alt="Word Snake Game"
              width={500}
              height={600}
              className="object-cover"
            />
          </div>
          <motion.div 
            initial={{ y: 20 }}
            animate={{ y: -20 }}
            transition={{ 
              repeat: Infinity,
              repeatType: "reverse",
              duration: 2,
              ease: "easeInOut"
            }}
            className="absolute bottom-8 right-8 bg-[#87CEEB] text-black px-6 py-3 rounded-full font-bold text-xl"
          >
            Hello!
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
} 