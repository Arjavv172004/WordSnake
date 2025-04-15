'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

type TimeFilter = 'This Week' | 'Last Month' | 'All Time'

// Shuffle array function
const shuffleArray = (array: number[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Generate random users with random scores and unique images
const generateUsers = () => {
  const names = ['SnakeMaster', 'ByteWarrior', 'WordNinja', 'SpeedKing', 'GamePro']
  // Create array of numbers 1-15 and shuffle it
  const shuffledImageNumbers = shuffleArray([...Array(15)].map((_, i) => i + 1))
  
  return names.map((name, index) => ({
    id: index + 1,
    name,
    score: Math.floor(Math.random() * 5000) + 5000,
    image: `/${shuffledImageNumbers[index]}.jpg`
  }))
}

const leaderboardData = {
  'This Week': generateUsers(),
  'Last Month': generateUsers(),
  'All Time': generateUsers()
}

export default function LeaderboardPage() {
  const [activeFilter, setActiveFilter] = useState<TimeFilter>('This Week')

  return (
    <div className="relative min-h-screen bg-[#4169E1] flex flex-col items-center justify-center overflow-hidden px-4 pt-24">
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
        LEADERBOARD
      </h1>

      {/* Main Content */}
      <div className="w-full max-w-4xl z-10">
        {/* Time Filters */}
        <div className="bg-[#BBFF00] rounded-full p-2 mb-8 flex justify-between">
          {(['This Week', 'Last Month', 'All Time'] as TimeFilter[]).map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`flex-1 py-2 px-4 rounded-full text-lg font-bold transition-all ${
                activeFilter === filter
                  ? 'bg-[#4169E1] text-[#BBFF00]'
                  : 'text-black hover:bg-[#4169E1]/10'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {filter}
            </motion.button>
          ))}
        </div>

        {/* Leaderboard List */}
        <div className="space-y-4">
          {leaderboardData[activeFilter].map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center gap-4"
            >
              {/* Rank */}
              <div className="w-12 h-12 bg-[#BBFF00] rounded-full flex items-center justify-center">
                <span className="text-2xl font-black text-black">{index + 1}</span>
              </div>

              {/* User Info */}
              <div className="flex items-center gap-4 flex-1">
                <Image
                  src={user.image}
                  alt={user.name}
                  width={48}
                  height={48}
                  className="rounded-full border-2 border-[#BBFF00]"
                />
                <div>
                  <h3 className="text-xl font-bold text-white">{user.name}</h3>
                  <p className="text-[#BBFF00]">{user.score.toLocaleString()} points</p>
                </div>
              </div>

              {/* Trophy for top 3 */}
              {index < 3 && (
                <div className="w-8 h-8">
                  <Image
                    src="/1.png"
                    alt="Trophy"
                    width={32}
                    height={32}
                    className="transform -scale-x-100"
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
} 