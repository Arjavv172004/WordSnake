'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

// Sample word puzzles for Day 1
const DAY_1_PUZZLES = [
  {
    id: 1,
    grid: [
      ['S', 'W', 'O', 'R', 'D', 'Q', 'V'],
      ['N', 'R', 'D', 'S', 'K', 'E', 'F'],
      ['A', 'S', 'U', 'S', 'E', 'R', 'A'],
      ['K', 'R', 'K', 'A', 'D', 'O', 'U'],
      ['E', 'A', 'N', 'K', 'E', 'I', 'T'],
      ['R', 'I', 'S', 'D', 'F', 'P', 'L']
    ],
    words: ['SNAKE', 'WORD', 'USER'],
    hints: [
      'What game are you playing?',
      'What are you finding?',
      'Who plays the game?'
    ]
  },
  {
    id: 2,
    grid: [
      ['G', 'A', 'M', 'E', 'P', 'L', 'Y'],
      ['P', 'L', 'A', 'Y', 'C', 'O', 'R'],
      ['W', 'D', 'L', 'E', 'V', 'E', 'L'],
      ['I', 'I', 'T', 'M', 'E', 'N', 'U'],
      ['N', 'L', 'A', 'Y', 'R', 'S', 'T'],
      ['S', 'I', 'N', 'S', 'F', 'U', 'N']
    ],
    words: ['PLAY', 'GAME', 'WIN'],
    hints: [
      'Press this button to start',
      'What is Snake?',
      'Your goal is to...'
    ]
  },
  {
    id: 3,
    grid: [
      ['S', 'P', 'E', 'E', 'D', 'A', 'T'],
      ['M', 'N', 'P', 'U', 'T', 'R', 'E'],
      ['O', 'S', 'C', 'O', 'R', 'E', 'T'],
      ['V', 'C', 'O', 'R', 'E', 'O', 'W'],
      ['E', 'O', 'V', 'E', 'S', 'W', 'S'],
      ['S', 'N', 'D', 'S', 'K', 'I', 'P']
    ],
    words: ['SPEED', 'SCORE', 'MOVE'],
    hints: [
      'How fast can you go?',
      'Points you collect',
      'How to control the snake'
    ]
  }
]

export default function DailyChallenges() {
  const [currentDay] = useState(1)
  const [currentPuzzle, setCurrentPuzzle] = useState(0)
  const [foundWords, setFoundWords] = useState<string[]>([])
  const [selectedCells, setSelectedCells] = useState<number[][]>([])
  const [showCompletion, setShowCompletion] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startCell, setStartCell] = useState<number[]>([])
  const [isPaused, setIsPaused] = useState(false)
  const [time, setTime] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const [showLockedDayPopup, setShowLockedDayPopup] = useState(false)

  const puzzle = DAY_1_PUZZLES[currentPuzzle] || DAY_1_PUZZLES[0]
  const lineColors = ['#FF3366', '#00FFCC', '#FFCC00'] // Updated attractive colors

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setTime(prev => prev + 1)
      }, 1000)
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isPaused])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const togglePause = () => {
    setIsPaused(prev => !prev)
  }

  const handleCellMouseDown = (row: number, col: number) => {
    if (isPaused) return
    setIsDragging(true)
    setStartCell([row, col])
    setSelectedCells([[row, col]])
  }

  const getLineCells = (startRow: number, startCol: number, endRow: number, endCol: number) => {
    const cells: number[][] = []
    
    // Determine the primary direction of movement
    const rowDiff = endRow - startRow
    const colDiff = endCol - startCol
    
    // Only allow straight lines (horizontal, vertical, or diagonal)
    const isHorizontal = rowDiff === 0
    const isVertical = colDiff === 0
    const isDiagonal = Math.abs(rowDiff) === Math.abs(colDiff)
    
    if (!isHorizontal && !isVertical && !isDiagonal) {
      return [] // Return empty array if not a valid line
    }

    // For horizontal movement
    if (isHorizontal) {
      const start = Math.min(startCol, endCol)
      const end = Math.max(startCol, endCol)
      for (let col = start; col <= end; col++) {
        cells.push([startRow, col])
      }
      return cells
    }

    // For vertical movement
    if (isVertical) {
      const start = Math.min(startRow, endRow)
      const end = Math.max(startRow, endRow)
      for (let row = start; row <= end; row++) {
        cells.push([row, startCol])
      }
      return cells
    }

    // For diagonal movement
    if (isDiagonal) {
      const steps = Math.abs(rowDiff)
      const rowStep = rowDiff > 0 ? 1 : -1
      const colStep = colDiff > 0 ? 1 : -1
      
      for (let i = 0; i <= steps; i++) {
        const row = startRow + (i * rowStep)
        const col = startCol + (i * colStep)
        cells.push([row, col])
      }
      return cells
    }

    return cells
  }

  const handleCellMouseEnter = (row: number, col: number) => {
    if (!isDragging || isPaused) return
    
    // Get the line of cells between start and current position
    const newCells = getLineCells(startCell[0], startCell[1], row, col)
    
    // Only update if we have valid cells
    if (newCells.length > 0) {
      setSelectedCells(newCells)
    }
  }

  const handleCellMouseUp = () => {
    if (isPaused) return
    setIsDragging(false)
    
    // Get word from selection
    const word = getWordFromSelection()
    const reversedWord = word.split('').reverse().join('')
    
    // Check if word is valid
    if ((puzzle.words.includes(word) || puzzle.words.includes(reversedWord)) && 
        !foundWords.includes(word) && !foundWords.includes(reversedWord)) {
      setFoundWords([...foundWords, puzzle.words.includes(word) ? word : reversedWord])
    }
    
    setSelectedCells([])
  }

  const getWordFromSelection = () => {
    return selectedCells
      .map(([row, col]) => puzzle.grid[row][col])
      .join('')
  }

  useEffect(() => {
    if (foundWords.length === puzzle.words.length) {
      if (currentPuzzle === DAY_1_PUZZLES.length - 1) {
        setShowCompletion(true)
      } else {
        // Clear found words before changing puzzle
        setFoundWords([])
        // Use setTimeout to ensure state updates properly
        setTimeout(() => {
          setCurrentPuzzle(prev => Math.min(prev + 1, DAY_1_PUZZLES.length - 1))
        }, 1500)
      }
    }
  }, [foundWords, currentPuzzle, puzzle.words.length])

  const handleDayClick = (day: number) => {
    if (day !== 1) {
      setShowLockedDayPopup(true)
    }
  }

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-[#4169E1] to-[#00FF87] flex flex-col items-center py-12">
      {/* Background Snake Icons */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg.png"
          alt="Background"
          fill
          className="object-cover opacity-30"
        />
      </div>

      {/* Back Button and Timer */}
      <div className="absolute top-4 left-0 right-0 flex justify-between items-center px-4 z-10">
        <Link href="/">
          <motion.div
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
            <span className="text-xl font-bold text-black">Back</span>
          </motion.div>
        </Link>

        <div className="flex items-center gap-4">
          <div className="bg-[#BBFF00] rounded-full px-6 py-3 text-xl font-bold text-black shadow-lg">
            {formatTime(time)}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={togglePause}
            className="bg-[#BBFF00] hover:bg-[#BBFF00]/90 rounded-full px-6 py-3 text-xl font-bold text-black shadow-lg"
          >
            {isPaused ? 'Resume' : 'Pause'}
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
        {/* Title with exact Snake Game style */}
        <h1 className="text-7xl font-black text-center mb-12 text-[#BBFF00] tracking-wider transform hover:scale-105 transition-transform duration-300 [text-shadow:_0_0_10px_rgba(187,255,0,0.5)]">
          WORD SEARCH
        </h1>

        {/* Days Progress */}
        <div className="flex justify-center gap-4 mb-12">
          {[1, 2, 3, 4, 5, 6, 7].map((day) => (
            <motion.div
              key={day}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleDayClick(day)}
              className={`px-8 py-4 rounded-full font-bold text-xl cursor-pointer shadow-lg whitespace-nowrap ${
                day === currentDay
                  ? 'bg-[#BBFF00] text-black'
                  : 'bg-black/20 text-white backdrop-blur-sm'
              }`}
            >
              Day {day}
            </motion.div>
          ))}
        </div>

        {/* Game Area */}
        <div className="bg-[#BBFF00] rounded-3xl p-8 shadow-2xl backdrop-blur-lg">
          <h2 className="text-5xl font-black text-black text-center mb-8 [text-shadow:_2px_2px_0px_rgb(255_255_255_/_40%)]">
            Day {currentDay} - Challenge {currentPuzzle + 1}
          </h2>

          {/* Word Grid with integrated tiles and letters */}
          <div className="flex justify-center mb-8">
            <div className="grid grid-cols-7 gap-3 bg-black/10 p-6 rounded-2xl max-w-fit select-none">
              {puzzle.grid.map((row, rowIndex) => (
                row.map((letter, colIndex) => (
                  <motion.button
                    key={`${rowIndex}-${colIndex}`}
                    className={`w-16 h-16 flex items-center justify-center text-2xl font-bold rounded-xl cursor-pointer shadow-lg select-none
                      ${selectedCells.some(([r, c]) => r === rowIndex && c === colIndex)
                        ? 'bg-[#4169E1] text-white'
                        : 'bg-white text-black hover:bg-white/90'
                      } transition-all duration-150`}
                    whileHover={{ scale: 1.05 }}
                    onMouseDown={(e) => {
                      e.preventDefault()
                      handleCellMouseDown(rowIndex, colIndex)
                    }}
                    onMouseEnter={(e) => {
                      e.preventDefault()
                      handleCellMouseEnter(rowIndex, colIndex)
                    }}
                    onMouseUp={(e) => {
                      e.preventDefault()
                      handleCellMouseUp()
                    }}
                    style={{
                      WebkitUserSelect: 'none',
                      userSelect: 'none',
                      touchAction: 'none'
                    }}
                  >
                    {letter}
                  </motion.button>
                ))
              ))}
            </div>
          </div>

          {/* Found Words */}
          <div className="flex justify-center gap-6 mb-8">
            {puzzle.words.map((word, index) => (
              <motion.div
                key={word}
                initial={false}
                animate={{
                  scale: foundWords.includes(word) ? [1.2, 1] : 1,
                  rotate: foundWords.includes(word) ? [0, 360] : 0
                }}
                className={`px-8 py-4 rounded-full text-xl font-bold shadow-lg
                  ${foundWords.includes(word)
                    ? 'bg-[#4169E1] text-white'
                    : 'bg-black/10 text-black/50'
                  }`}
              >
                {foundWords.includes(word) ? word : '?????'}
              </motion.div>
            ))}
          </div>

          {/* Hints */}
          <div className="text-center text-black font-bold">
            <p className="text-3xl mb-6 tracking-wider [text-shadow:_1px_1px_0px_rgb(255_255_255_/_40%)]">HINTS :</p>
            {puzzle.hints.map((hint, index) => (
              <p key={index} className="italic text-xl mb-2">
                {hint}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Locked Day Popup */}
      <AnimatePresence>
        {showLockedDayPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm"
            onClick={() => setShowLockedDayPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              className="bg-[#BBFF00] px-12 py-8 rounded-3xl shadow-2xl text-center"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-4xl font-bold text-black mb-4">Day Not Unlocked!</h3>
              <p className="text-xl text-black/70 mb-6">Complete the previous day's challenges first.</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowLockedDayPopup(false)}
                className="bg-black text-white font-bold text-xl px-8 py-3 rounded-full"
              >
                Got it!
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rest of the existing popups with updated styling */}
      <AnimatePresence>
        {isPaused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              className="bg-[#BBFF00] px-12 py-8 rounded-3xl shadow-2xl text-center"
            >
              <h3 className="text-4xl font-bold text-black mb-4">GAME PAUSED</h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={togglePause}
                className="bg-black text-white font-bold text-xl px-8 py-3 rounded-full"
              >
                Resume
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Level Complete Popup */}
      <AnimatePresence>
        {foundWords.length === puzzle.words.length && !showCompletion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm"
          >
            <div className="absolute inset-0 bg-black/50" />
            <motion.div
              className="relative bg-[#BBFF00] px-12 py-8 rounded-3xl shadow-2xl text-center"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
            >
              <h3 className="text-4xl font-bold text-black mb-4">
                Challenge {currentPuzzle + 1} Completed!
              </h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-black text-white font-bold text-xl px-8 py-3 rounded-full"
                onClick={() => setCurrentPuzzle(currentPuzzle + 1)}
              >
                Next Challenge
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Day Complete Popup */}
      <AnimatePresence>
        {showCompletion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm"
          >
            <div className="absolute inset-0 bg-black/50" />
            <motion.div
              className="relative bg-[#BBFF00] px-12 py-8 rounded-3xl shadow-2xl text-center"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
            >
              <h3 className="text-4xl font-bold text-black mb-4">
                Daily Challenge Completed!
              </h3>
              <p className="text-xl text-black/70 mb-6">
                Come back tomorrow for new challenges!
              </p>
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-black text-white font-bold text-xl px-8 py-3 rounded-full"
                >
                  Back to Home
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
} 