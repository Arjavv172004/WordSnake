'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import HangmanDrawing from '../components/HangmanDrawing'

// Questions for the game
const QUESTIONS = [
  { question: "A red fruit that keeps the doctor away", answer: "APPLE" },
  { question: "Yellow curved fruit", answer: "BANANA" },
  { question: "King of fruits with spiky shell", answer: "MANGO" },
  { question: "Orange citrus fruit", answer: "ORANGE" },
  { question: "Small purple or green fruit used for wine", answer: "GRAPE" }
]

// Keyboard layout
const KEYBOARD = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
]

export default function HangmanPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set())
  const [wrongGuesses, setWrongGuesses] = useState(0)
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing')

  const currentQuestion = QUESTIONS[currentQuestionIndex]
  const word = currentQuestion.answer

  useEffect(() => {
    if (wrongGuesses >= 6) {
      setGameStatus('lost')
    } else if (word.split('').every(letter => guessedLetters.has(letter))) {
      setGameStatus('won')
    }
  }, [wrongGuesses, guessedLetters, word])

  const resetGame = (nextQuestion: boolean = false) => {
    setGuessedLetters(new Set())
    setWrongGuesses(0)
    setGameStatus('playing')
    if (nextQuestion) {
      setCurrentQuestionIndex((prev) => (prev + 1) % QUESTIONS.length)
    }
  }

  const handleGuess = (letter: string) => {
    if (gameStatus !== 'playing') return

    if (!guessedLetters.has(letter)) {
      const newGuessedLetters = new Set(guessedLetters)
      newGuessedLetters.add(letter)
      setGuessedLetters(newGuessedLetters)

      if (!word.includes(letter)) {
        setWrongGuesses(prev => prev + 1)
      }
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-800 text-white p-8 relative overflow-hidden"
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#BBFF00] rounded-full"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Back button */}
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

      <div className="max-w-6xl mx-auto">
        <motion.h1 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
          className="text-7xl font-black text-center mb-12 tracking-wider text-[#BBFF00] drop-shadow-[0_0_15px_#BBFF00]"
        >
          HANGMAN
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left side - Drawing */}
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center items-center"
          >
            <HangmanDrawing wrongGuesses={wrongGuesses} />
          </motion.div>

          {/* Right side - Game */}
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            {/* Question */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl text-center bg-blue-800/50 p-6 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.3)] backdrop-blur-sm"
            >
              {currentQuestion.question}
            </motion.div>

            {/* Word display */}
            <div className="flex justify-center gap-3">
              {word.split('').map((letter, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0, rotateX: 180 }}
                  animate={{ scale: 1, rotateX: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-12 h-14 border-b-4 border-[#BBFF00] flex items-center justify-center text-3xl font-bold"
                >
                  {guessedLetters.has(letter) ? letter : '_'}
                </motion.div>
              ))}
            </div>

            {/* Keyboard */}
            <div className="space-y-2">
              {KEYBOARD.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-center gap-2">
                  {row.map((letter) => {
                    const isGuessed = guessedLetters.has(letter)
                    const isCorrect = word.includes(letter) && isGuessed
                    return (
                      <motion.button
                        key={letter}
                        whileHover={{ scale: 1.1, boxShadow: "0 0 10px #BBFF00" }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: rowIndex * 0.1 }}
                        onClick={() => handleGuess(letter)}
                        disabled={isGuessed || gameStatus !== 'playing'}
                        className={`w-12 h-12 rounded-lg font-bold text-xl transition-all ${
                          isGuessed
                            ? isCorrect
                              ? 'bg-green-500 shadow-[0_0_15px_#22C55E]'
                              : 'bg-red-500 shadow-[0_0_15px_#EF4444]'
                            : 'bg-[#BBFF00] text-black hover:bg-[#D4FF4D] shadow-[0_0_10px_#BBFF00]'
                        }`}
                      >
                        {letter}
                      </motion.button>
                    )
                  })}
                </div>
              ))}
            </div>

            {/* Game status */}
            <AnimatePresence mode="wait">
              {gameStatus !== 'playing' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-center bg-blue-800/50 p-8 rounded-xl backdrop-blur-sm"
                >
                  <motion.p 
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    className="text-3xl font-bold mb-6"
                  >
                    {gameStatus === 'won' ? '🎉 Congratulations! 🎉' : '😢 Game Over! 😢'}
                  </motion.p>
                  <div className="space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: "0 0 20px #BBFF00" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => resetGame(false)}
                      className="px-6 py-3 bg-[#BBFF00] text-black font-bold rounded-lg text-xl"
                    >
                      Try Again
                    </motion.button>
                    {gameStatus === 'won' && currentQuestionIndex < QUESTIONS.length - 1 && (
                      <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 0 20px #BBFF00" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => resetGame(true)}
                        className="px-6 py-3 bg-[#BBFF00] text-black font-bold rounded-lg text-xl"
                      >
                        Next Question
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
} 