'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function TutorialPage() {
  const rules = [
    "Find all hidden words in the grid by selecting letters",
    "Words can be found in any direction - horizontal, vertical, or diagonal",
    "Click and drag to select letters and form words",
    "Complete each puzzle within the time limit",
    "Use hints when you're stuck, but use them wisely!",
    "The faster you complete, the higher you rank on the leaderboard"
  ]

  const features = [
    {
      title: "Daily Challenges",
      description: "New puzzles every day! Each day brings fresh word combinations and themes. Progress through the week to unlock harder challenges.",
      icon: "📅"
    },
    {
      title: "Hints System",
      description: "Stuck on a word? Use hints to reveal clues about word meanings or get a peek at the first letter. Each puzzle comes with specific hints.",
      icon: "💡"
    },
    {
      title: "Time Attack",
      description: "Race against the clock! Your completion time determines your position on the leaderboard. Compete with players worldwide for the fastest times.",
      icon: "⏱️"
    }
  ]

  return (
    <div className="relative min-h-screen bg-[#4169E1] flex flex-col items-center overflow-hidden px-4 pt-24">
      {/* Background Snake Icons */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/fullscreen.png"
          alt="Background"
          fill
          className="object-cover opacity-50"
        />
      </div>

      {/* Back Button */}
      <div className="absolute top-4 left-4 z-10">
        <Link href="/">
          <div className="bg-[#BBFF00] rounded-full px-5 py-2 flex items-center gap-2">
            <Image
              src="/1.png"
              alt="Snake"
              width={28}
              height={28}
              className="transform -scale-x-100"
            />
            <span className="text-xl font-bold text-black">Back</span>
          </div>
        </Link>
      </div>

      {/* Title */}
      <h1 className="text-[6rem] font-black text-[#BBFF00] mb-12 z-10 text-center leading-none tracking-tighter drop-shadow-[0_0_10px_rgba(187,255,0,0.7)]">
        HOW TO PLAY
      </h1>

      {/* Main Content */}
      <div className="w-full max-w-4xl z-10 space-y-8 pb-16">
        {/* Game Rules */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#BBFF00] rounded-3xl p-8 shadow-2xl"
        >
          <h2 className="text-3xl font-black text-[#4169E1] mb-6">Game Rules</h2>
          <ul className="space-y-4">
            {rules.map((rule, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 text-xl"
              >
                <div className="w-8 h-8 bg-[#4169E1] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[#BBFF00] font-bold">{index + 1}</span>
                </div>
                <span className="text-black font-medium">{rule}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Game Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="bg-[#BBFF00] rounded-2xl p-6 shadow-xl"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-[#4169E1] mb-3">{feature.title}</h3>
              <p className="text-black/80 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Example Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-[#BBFF00] rounded-3xl p-8 shadow-2xl"
        >
          <h2 className="text-3xl font-black text-[#4169E1] mb-6">Example Puzzle</h2>
          <div className="grid grid-cols-6 gap-2 max-w-sm mx-auto">
            {['S','W','O','R','D','S',
              'N','A','M','E','K','P',
              'A','T','I','M','E','L',
              'K','C','N','I','Y','A',
              'E','H','D','T','S','Y'].map((letter, index) => (
              <div 
                key={index}
                className="w-12 h-12 bg-[#4169E1] rounded-xl flex items-center justify-center text-[#BBFF00] font-bold text-xl"
              >
                {letter}
              </div>
            ))}
          </div>
          <div className="mt-6 text-center text-black/80">
            <p className="font-medium">Try finding: SNAKE, WORD, TIME</p>
            <p className="text-sm mt-2">Words can be found in any direction!</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 