'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function ContactPage() {
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
      <div className="text-center z-10 mb-12">
        <h1 className="text-[6rem] font-black text-[#BBFF00] leading-none tracking-tighter drop-shadow-[0_0_10px_rgba(187,255,0,0.7)]">
          CONNECT WITH US
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl text-white/90 mt-6"
        >
          We've been waiting for you.
        </motion.p>
      </div>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl z-10 bg-[#BBFF00] rounded-3xl p-8 shadow-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full px-6 py-4 bg-[#4169E1] text-[#BBFF00] placeholder-[#BBFF00]/70 rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-[#BBFF00] transition-all"
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-6 py-4 bg-[#4169E1] text-[#BBFF00] placeholder-[#BBFF00]/70 rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-[#BBFF00] transition-all"
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Your country"
                className="w-full px-6 py-4 bg-[#4169E1] text-[#BBFF00] placeholder-[#BBFF00]/70 rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-[#BBFF00] transition-all"
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone number"
                className="w-full px-6 py-4 bg-[#4169E1] text-[#BBFF00] placeholder-[#BBFF00]/70 rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-[#BBFF00] transition-all"
                required
              />
            </motion.div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-[#4169E1] text-[#BBFF00] rounded-2xl text-xl font-bold transition-all hover:bg-[#4169E1]/90"
          >
            Submit
          </motion.button>
        </form>
      </motion.div>

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
    </div>
  )
} 