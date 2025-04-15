'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function About() {
  return (
    <section className="relative bg-[#D1FF73] pt-20 pb-32">
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-7xl font-black tracking-tighter"
            >
              ABOUT THE WORD SNAKE
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6 text-xl"
            >
              <p>
                Welcome to Word Snake, where gaming meets learning in an exciting new way! 
                Our platform transforms the classic snake game into an innovative word 
                collection adventure that challenges both your reflexes and vocabulary.
              </p>
              
              <p>
                Our signature game, Snake Byte, puts a unique twist on traditional gameplay. 
                Guide your snake to collect letters in the correct sequence to form words, 
                while avoiding collisions with walls and yourself. With multiple difficulty 
                levels and customizable snake colors, every player can find their perfect challenge.
              </p>
              
              <p>
                Beyond Snake Byte, we offer a variety of mini-games including Hangman and more, 
                each designed to test different skills while keeping you entertained. Our daily 
                challenges give you fresh objectives to tackle, keeping the gameplay experience 
                dynamic and engaging.
              </p>
            </motion.div>
          </div>

          {/* Image Section */}
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-square rounded-3xl overflow-hidden bg-[#FF9B5C]"
            >
              <Image
                src="/1.png"
                alt="Word Snake Game"
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            {/* Smiley Sticker */}
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 10 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              className="absolute -top-8 -left-8 w-24 h-24 bg-[#FFB1E7] rounded-full flex items-center justify-center"
            >
              <div className="text-4xl">😊</div>
            </motion.div>

            {/* Hello Bubble */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-8 right-0 bg-[#7EB7FF] px-8 py-4 rounded-full"
            >
              <span className="text-2xl font-bold text-black">Hello!</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Pink Wave Bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[100px]"
          style={{ transform: 'rotate(180deg)' }}
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-[#FFB1E7]"
          ></path>
        </svg>
      </div>
    </section>
  )
} 