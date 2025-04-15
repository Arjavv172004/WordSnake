'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function ContactUs() {
  const [showFeedback, setShowFeedback] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    phone: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowFeedback(true)
    setTimeout(() => {
      setShowFeedback(false)
      setFormData({
        name: '',
        email: '',
        country: '',
        phone: ''
      })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <main className="min-h-screen bg-[#4169E1] relative overflow-hidden">
      {/* Back Button */}
      <Link href="/">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute top-8 left-8 bg-[#BBFF00] text-black font-bold px-6 py-3 rounded-full flex items-center gap-2 z-10"
        >
          <Image src="/back.png" alt="Back" width={24} height={24} />
          Back
        </motion.div>
      </Link>

      {/* Floating Snake Decorations */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        >
          <Image
            src="/snake-decoration.png"
            alt="Snake"
            width={60}
            height={60}
            className="opacity-50"
          />
        </motion.div>
      ))}

      <div className="container mx-auto px-4 py-20">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[#BBFF00] text-7xl md:text-8xl font-black text-center mb-4"
        >
          CONNECT WITH US
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white text-xl text-center mb-12"
        >
          We've been waiting for you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto bg-[#BBFF00] p-8 rounded-[40px]"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full bg-[#4169E1] text-white placeholder-white/80 px-6 py-4 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full bg-[#4169E1] text-white placeholder-white/80 px-6 py-4 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Your country"
              required
              className="w-full bg-[#4169E1] text-white placeholder-white/80 px-6 py-4 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone number"
              required
              className="w-full bg-[#4169E1] text-white placeholder-white/80 px-6 py-4 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="w-full bg-[#4169E1] text-white font-bold text-xl px-6 py-4 rounded-full hover:bg-[#3158d0] transition-colors"
            >
              Submit
            </button>
          </form>
        </motion.div>
      </div>

      {/* Feedback Popup */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.5, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 20 }}
              className="relative bg-[#BBFF00] px-12 py-8 rounded-3xl shadow-2xl text-center"
            >
              <h3 className="text-4xl font-black text-[#4169E1] mb-4">Thank you!</h3>
              <p className="text-xl text-[#4169E1]">We will respond to you shortly!</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
} 