'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const GRID_SIZE = 20
const CELL_SIZE = 20
const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 }
]
const INITIAL_DIRECTION = { x: 1, y: 0 }

const WORDS = ['SNAKE', 'QUICK', 'BYTES', 'SPEED', 'LEVEL']

export default function SnakeGame({ snakeColor = '#FF69B4' }) {
  const [snake, setSnake] = useState(INITIAL_SNAKE)
  const [direction, setDirection] = useState(INITIAL_DIRECTION)
  const [letters, setLetters] = useState<{x: number, y: number, letter: string}[]>([])
  const [currentWord, setCurrentWord] = useState('')
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0)
  const [wordsCollected, setWordsCollected] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [message, setMessage] = useState('')
  const [time, setTime] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isLevelComplete, setIsLevelComplete] = useState(false)
  const [isGameStarted, setIsGameStarted] = useState(false)

  // Prevent scrolling with arrow keys
  useEffect(() => {
    const preventScroll = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault()
      }
    }
    window.addEventListener('keydown', preventScroll)
    return () => window.removeEventListener('keydown', preventScroll)
  }, [])

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isGameStarted && !gameOver && !isPaused && !isLevelComplete) {
      interval = setInterval(() => {
        setTime(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [gameOver, isPaused, isLevelComplete, isGameStarted])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const placeLetters = useCallback(() => {
    if (wordsCollected >= WORDS.length) {
      setIsLevelComplete(true)
      setMessage('CONGRATULATIONS! YOU HAVE COMPLETED THIS LEVEL!')
      setLetters([])
      return
    }

    const word = WORDS[wordsCollected]
    setCurrentWord(word)
    setCurrentLetterIndex(0)

    // Clear existing letters first
    setLetters([])

    // Add slight delay before placing new letters
    setTimeout(() => {
      const newLetters = []
      const usedPositions = new Set()

      for (const letter of word) {
        let position
        do {
          position = {
            x: Math.floor(Math.random() * (GRID_SIZE - 2)) + 1,
            y: Math.floor(Math.random() * (GRID_SIZE - 2)) + 1
          }
        } while (usedPositions.has(`${position.x},${position.y}`))

        usedPositions.add(`${position.x},${position.y}`)
        newLetters.push({ ...position, letter })
      }

      setLetters(newLetters)
    }, 100)
  }, [wordsCollected])

  useEffect(() => {
    placeLetters()
  }, [placeLetters])

  const checkCollision = useCallback(() => {
    const head = snake[0]
    const nextHead = {
      x: head.x + direction.x,
      y: head.y + direction.y
    }
    
    // Wall collision - now triggers game over
    if (nextHead.x < 0 || nextHead.x >= GRID_SIZE || nextHead.y < 0 || nextHead.y >= GRID_SIZE) {
      setGameOver(true)
      setMessage('GAME OVER! YOU HIT THE WALL.')
      return true
    }

    // Self collision
    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        setGameOver(true)
        setMessage('Game Over! You hit yourself.')
        return true
      }
    }

    // Letter collision
    const letterIndex = letters.findIndex(letter => letter.x === head.x && letter.y === head.y)
    if (letterIndex !== -1) {
      const letter = letters[letterIndex]
      if (letter.letter === currentWord[currentLetterIndex]) {
        // Correct letter in sequence
        const newLetters = letters.filter((_, i) => i !== letterIndex)
        setLetters(newLetters)
        
        if (currentLetterIndex === currentWord.length - 1) {
          // Word completed
          const nextWordsCollected = wordsCollected + 1
          setWordsCollected(nextWordsCollected)
          
          if (nextWordsCollected >= WORDS.length) {
            setIsLevelComplete(true)
            setMessage('CONGRATULATIONS! YOU HAVE COMPLETED THIS LEVEL!')
          } else {
            // Place letters for the next word after a delay
            setTimeout(() => {
              const nextWord = WORDS[nextWordsCollected]
              setCurrentWord(nextWord)
              setCurrentLetterIndex(0)
              placeLetters()
            }, 100)
          }
        } else {
          setCurrentLetterIndex(prev => prev + 1)
        }
      } else {
        // Wrong letter in sequence
        setGameOver(true)
        setMessage('Game Over! Wrong letter sequence.')
        return true
      }
    }

    return false
  }, [snake, direction, letters, currentWord, currentLetterIndex, wordsCollected])

  const moveSnake = useCallback(() => {
    if (!isGameStarted || gameOver || isPaused || isLevelComplete) return

    const head = snake[0]
    const nextHead = {
      x: head.x + direction.x,
      y: head.y + direction.y
    }

    // Check if next move would hit wall
    if (nextHead.x < 0 || nextHead.x >= GRID_SIZE || nextHead.y < 0 || nextHead.y >= GRID_SIZE) {
      setGameOver(true)
      setMessage('GAME OVER! YOU HIT THE WALL.')
      return
    }

    setSnake(prev => {
      const newSnake = [nextHead, ...prev.slice(0, -1)]
      return newSnake
    })
  }, [snake, direction, gameOver, isPaused, isLevelComplete, isGameStarted])

  useEffect(() => {
    const interval = setInterval(moveSnake, 150)
    return () => clearInterval(interval)
  }, [moveSnake])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isPaused) return

      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 })
          break
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 })
          break
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 })
          break
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 })
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [direction, isPaused])

  useEffect(() => {
    if (!gameOver && !isLevelComplete) {
      checkCollision()
    }
  }, [snake, checkCollision, gameOver, isLevelComplete])

  const resetGame = () => {
    setSnake(INITIAL_SNAKE)
    setDirection(INITIAL_DIRECTION)
    setCurrentLetterIndex(0)
    setWordsCollected(0)
    setGameOver(false)
    setMessage('')
    setTime(0)
    setIsPaused(false)
    setIsLevelComplete(false)
    placeLetters()
  }

  const togglePause = () => {
    setIsPaused(prev => !prev)
  }

  const startGame = () => {
    setIsGameStarted(true)
    setSnake(INITIAL_SNAKE)
    setDirection(INITIAL_DIRECTION)
    setCurrentLetterIndex(0)
    setWordsCollected(0)
    setGameOver(false)
    setMessage('')
    setTime(0)
    setIsPaused(false)
    setIsLevelComplete(false)
    placeLetters()
  }

  // Generate checkerboard cells
  const renderCheckerboard = () => {
    const cells = []
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        cells.push(
          <div
            key={`${x}-${y}`}
            className="absolute border border-gray-800"
            style={{
              width: CELL_SIZE,
              height: CELL_SIZE,
              left: x * CELL_SIZE,
              top: y * CELL_SIZE,
              backgroundColor: (x + y) % 2 === 0 ? '#1a1a1a' : '#2a2a2a'
            }}
          />
        )
      }
    }
    return cells
  }

  return (
    <div className="relative">
      {/* Timer and Controls */}
      {isGameStarted && (
        <div className="flex justify-between items-center mb-4">
          <div className="text-[#BBFF00] text-2xl font-bold">
            Time: {formatTime(time)}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={togglePause}
            className={`px-6 py-2 rounded-full font-bold text-xl transition-colors shadow-lg ${
              isPaused 
                ? 'bg-[#BBFF00] text-black hover:bg-[#a3e600]' 
                : 'bg-black text-[#BBFF00] border-2 border-[#BBFF00] hover:bg-[#BBFF00] hover:text-black'
            }`}
          >
            {isPaused ? 'RESUME' : 'PAUSE'}
          </motion.button>
        </div>
      )}

      {/* Word Display */}
      {isGameStarted && (
        <div className="text-center mb-4">
          <div className="text-[#BBFF00] text-3xl font-bold mb-2">
            Collect: {currentWord}
          </div>
          <div className="text-white text-xl">
            Next Letter: {currentWord[currentLetterIndex]}
          </div>
          <div className="text-[#BBFF00] text-xl mt-2">
            Words Collected: {wordsCollected}/5
          </div>
        </div>
      )}

      {/* Game Board */}
      <div
        className="relative border-4 border-[#BBFF00] overflow-hidden"
        style={{
          width: GRID_SIZE * CELL_SIZE,
          height: GRID_SIZE * CELL_SIZE
        }}
      >
        {/* Checkerboard */}
        {renderCheckerboard()}

        {/* Start Game Overlay */}
        {!isGameStarted && !gameOver && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              className="bg-[#BBFF00] text-black px-12 py-4 rounded-full font-bold text-3xl hover:bg-[#a3e600] transition-colors shadow-lg"
            >
              PLAY NOW
            </motion.button>
          </div>
        )}

        {isGameStarted && (
          <>
            {/* Snake */}
            {snake.map((segment, index) => (
              <motion.div
                key={index}
                className="absolute"
                style={{
                  width: CELL_SIZE - 2,
                  height: CELL_SIZE - 2,
                  backgroundColor: snakeColor,
                  left: segment.x * CELL_SIZE,
                  top: segment.y * CELL_SIZE,
                  borderRadius: '50%'
                }}
              />
            ))}

            {/* Letters */}
            {letters.map((letter, index) => (
              <div
                key={index}
                className="absolute flex items-center justify-center font-bold text-lg"
                style={{
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                  left: letter.x * CELL_SIZE,
                  top: letter.y * CELL_SIZE,
                  color: letter.letter === currentWord[currentLetterIndex] ? '#BBFF00' : 'white',
                  zIndex: 2
                }}
              >
                {letter.letter}
              </div>
            ))}

            {/* Small Pause Indicator */}
            {isPaused && (
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
                <div className="text-[#BBFF00] text-3xl font-bold">
                  PAUSED
                </div>
              </div>
            )}
          </>
        )}

        {/* Game Over / Level Complete Overlay */}
        <AnimatePresence>
          {(gameOver || isLevelComplete) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                className="bg-[#1a1a1a] p-8 rounded-[30px] border-4 border-[#BBFF00] shadow-2xl text-center max-w-[80%]"
              >
                <h2 className="text-[#BBFF00] text-5xl font-black mb-4 leading-tight">
                  {message}
                </h2>
                {gameOver && (
                  <div className="text-white text-xl mb-6">
                    Words Collected: {wordsCollected}/5
                  </div>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startGame}
                  className="bg-[#BBFF00] text-black px-12 py-4 rounded-full font-bold text-2xl hover:bg-[#a3e600] transition-colors shadow-lg"
                >
                  Play Again
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* All Popups Container - Only for Game Over, Level Complete, and Start Game */}
      <AnimatePresence>
        {(gameOver || isLevelComplete || (!isGameStarted && !gameOver)) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.5, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 50 }}
              className="bg-[#1a1a1a] p-12 rounded-[40px] border-4 border-[#BBFF00] shadow-2xl text-center max-w-[90%] md:max-w-[600px]"
            >
              {/* Start Game */}
              {!isGameStarted && !gameOver && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startGame}
                  className="bg-[#BBFF00] text-black px-16 py-6 rounded-full font-bold text-4xl hover:bg-[#a3e600] transition-colors shadow-lg"
                >
                  PLAY NOW
                </motion.button>
              )}

              {/* Game Over */}
              {gameOver && (
                <>
                  <h2 className="text-[#BBFF00] text-6xl font-black mb-6 leading-tight">
                    {message}
                  </h2>
                  <div className="text-white text-2xl mb-8">
                    Words Collected: {wordsCollected}/5
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={startGame}
                    className="bg-[#BBFF00] text-black px-12 py-4 rounded-full font-bold text-2xl hover:bg-[#a3e600] transition-colors shadow-lg"
                  >
                    Play Again
                  </motion.button>
                </>
              )}

              {/* Level Complete */}
              {isLevelComplete && (
                <>
                  <h2 className="text-[#BBFF00] text-6xl font-black mb-6 leading-tight">
                    CONGRATULATIONS!
                  </h2>
                  <p className="text-[#BBFF00] text-4xl font-bold mb-8">
                    YOU HAVE COMPLETED THIS LEVEL!
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={startGame}
                    className="bg-[#BBFF00] text-black px-12 py-4 rounded-full font-bold text-2xl hover:bg-[#a3e600] transition-colors shadow-lg"
                  >
                    Play Again
                  </motion.button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 