'use client'

import { useState } from 'react'
import { motion, LazyMotion, domAnimation, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function Contact() {
  const [showFeedback, setShowFeedback] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    playFrequency: '',
    rating: '',
    highScore: '',
    favoriteFeature: '',
    suggestions: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowFeedback(true)
    setTimeout(() => {
      setShowFeedback(false)
      setFormData({
        username: '',
        email: '',
        playFrequency: '',
        rating: '',
        highScore: '',
        favoriteFeature: '',
        suggestions: ''
      })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <LazyMotion features={domAnimation}>
      <section className="min-h-screen bg-[#FFB1E7] py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-black text-7xl md:text-8xl font-black tracking-tighter text-center mb-6"
          >
            GAME FEEDBACK
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-black text-2xl text-center mb-12"
          >
            Help us improve your gaming experience by sharing your thoughts:
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative bg-[#4169E1] rounded-[40px] p-12 max-w-5xl mx-auto"
          >
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Your username"
                className="bg-[#E8F0FE] text-black text-lg italic rounded-full px-6 py-4 placeholder-black/70"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email (optional)"
                className="bg-[#E8F0FE] text-black text-lg italic rounded-full px-6 py-4 placeholder-black/70"
              />
              <select
                name="playFrequency"
                value={formData.playFrequency}
                onChange={handleChange}
                className="bg-[#BBFF00] text-black text-lg italic rounded-full px-6 py-4 appearance-none"
                required
              >
                <option value="" disabled>How often do you play?</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="rarely">Rarely</option>
              </select>
              <select
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="bg-[#BBFF00] text-black text-lg italic rounded-full px-6 py-4 appearance-none"
                required
              >
                <option value="" disabled>Rate your experience</option>
                <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                <option value="4">⭐⭐⭐⭐ Very Good</option>
                <option value="3">⭐⭐⭐ Good</option>
                <option value="2">⭐⭐ Fair</option>
                <option value="1">⭐ Needs Improvement</option>
              </select>
              <input
                type="text"
                name="highScore"
                value={formData.highScore}
                onChange={handleChange}
                placeholder="Your highest score"
                className="bg-[#E8F0FE] text-black text-lg italic rounded-full px-6 py-4 placeholder-black/70"
                required
              />
              <input
                type="text"
                name="favoriteFeature"
                value={formData.favoriteFeature}
                onChange={handleChange}
                placeholder="Favorite game feature"
                className="bg-[#E8F0FE] text-black text-lg italic rounded-full px-6 py-4 placeholder-black/70"
                required
              />
              <textarea
                name="suggestions"
                value={formData.suggestions}
                onChange={handleChange}
                placeholder="Share your suggestions for improvement or report any bugs you've encountered"
                className="col-span-2 bg-[#E8F0FE] text-black text-lg italic rounded-[30px] px-6 py-4 placeholder-black/70 min-h-[150px] resize-none"
                required
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#BBFF00] text-black font-bold text-xl px-12 py-4 rounded-full border-b-[4px] border-black/25 hover:border-b-[2px] hover:translate-y-[2px] active:border-b-[0px] active:translate-y-[4px] transition-all duration-150 shadow-xl"
                type="submit"
              >
                SUBMIT
              </motion.button>
            </form>

            {/* YAY Bubble */}
            <div className="absolute -bottom-8 right-0 bg-[#FF9B5C] text-black font-black text-4xl py-4 px-8 rounded-full transform rotate-[-8deg]">
              YAY
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feedback Popup */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div
              className="relative bg-[#BBFF00] px-12 py-8 rounded-3xl shadow-2xl text-center"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
            >
              <h3 className="text-4xl font-black text-[#4169E1] mb-4">Thank you for your feedback!</h3>
              <div className="flex justify-center mb-2">
                <Image
                  src="/1.png"
                  alt="Snake"
                  width={60}
                  height={60}
                  className="transform -scale-x-100"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  )
} 