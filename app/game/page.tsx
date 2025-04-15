'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import SnakeGame from '../components/SnakeGame'
import GameSettings from '../components/GameSettings'

export default function GamePage() {
  const [snakeColor, setSnakeColor] = useState('#FF69B4')

  return (
    <main className="min-h-screen bg-[#4169E1] pt-4">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Back Button */}
        <Link href="/">
          <div className="inline-flex items-center gap-2 bg-[#BBFF00] text-black font-bold px-6 py-3 rounded-full hover:bg-[#a3e600] transition-colors mb-2">
            <svg 
              viewBox="0 0 24 24" 
              className="w-6 h-6 fill-current"
            >
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
            Back
          </div>
        </Link>

        <h1 className="text-[#BBFF00] text-6xl md:text-7xl font-black text-center mb-4 drop-shadow-[0_0_30px_rgba(187,255,0,0.7)]" style={{ textShadow: '4px 4px 0px rgba(0,0,0,0.2)' }}>
          SNAKE BYTE
        </h1>

        <div className="flex flex-col lg:flex-row gap-6 justify-center items-start">
          {/* Game Container */}
          <div className="bg-[#1a1a1a] p-6 rounded-[40px] shadow-2xl">
            <SnakeGame snakeColor={snakeColor} />
          </div>

          {/* Settings Panel */}
          <GameSettings
            snakeColor={snakeColor}
            onColorChange={setSnakeColor}
          />
        </div>
      </div>
    </main>
  )
} 