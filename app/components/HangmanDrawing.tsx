'use client'

import { motion } from 'framer-motion'

interface HangmanDrawingProps {
  wrongGuesses: number
}

export default function HangmanDrawing({ wrongGuesses }: HangmanDrawingProps) {
  return (
    <div className="w-[600px] h-[600px] relative">
      {/* Pre-drawn gallows structure */}
      {/* Base */}
      <div className="absolute bottom-10 left-[75px] w-[450px] h-[6px] bg-[#BBFF00] shadow-[0_0_15px_#BBFF00]" />

      {/* Vertical pole */}
      <div className="absolute bottom-10 left-[150px] w-[6px] h-[450px] bg-[#BBFF00] shadow-[0_0_15px_#BBFF00]" />

      {/* Top beam */}
      <div className="absolute top-[72px] left-[150px] w-[300px] h-[6px] bg-[#BBFF00] shadow-[0_0_15px_#BBFF00]" />

      {/* Diagonal support */}
      <div 
        className="absolute top-[72px] left-[150px] w-[75px] h-[6px] bg-[#BBFF00] shadow-[0_0_15px_#BBFF00] origin-left"
        style={{ transform: 'rotate(-45deg)' }}
      />

      {/* Rope (always visible) */}
      <div className="absolute top-[72px] left-[447px] w-[6px] h-[48px] bg-[#BBFF00] shadow-[0_0_15px_#BBFF00]" />

      {/* Hangman parts - added one by one */}
      {/* Head */}
      {wrongGuesses >= 1 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
          className="absolute top-[120px] left-[410px] w-[80px] h-[80px] rounded-full border-[6px] border-[#BBFF00] shadow-[0_0_15px_#BBFF00]"
        />
      )}

      {/* Body */}
      {wrongGuesses >= 2 && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute top-[200px] left-[447px] w-[6px] h-[160px] bg-[#BBFF00] shadow-[0_0_15px_#BBFF00]"
          style={{ transformOrigin: 'top' }}
        />
      )}

      {/* Left Arm */}
      {wrongGuesses >= 3 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute top-[240px] left-[370px] w-[80px] h-[6px] bg-[#BBFF00] shadow-[0_0_15px_#BBFF00] origin-right"
          style={{ transform: 'rotate(-45deg)' }}
        />
      )}

      {/* Right Arm */}
      {wrongGuesses >= 4 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute top-[240px] left-[450px] w-[80px] h-[6px] bg-[#BBFF00] shadow-[0_0_15px_#BBFF00] origin-left"
          style={{ transform: 'rotate(45deg)' }}
        />
      )}

      {/* Left Leg */}
      {wrongGuesses >= 5 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute top-[360px] left-[370px] w-[80px] h-[6px] bg-[#BBFF00] shadow-[0_0_15px_#BBFF00] origin-right"
          style={{ transform: 'rotate(45deg)' }}
        />
      )}

      {/* Right Leg */}
      {wrongGuesses >= 6 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute top-[360px] left-[450px] w-[80px] h-[6px] bg-[#BBFF00] shadow-[0_0_15px_#BBFF00] origin-left"
          style={{ transform: 'rotate(-45deg)' }}
        />
      )}
    </div>
  )
} 