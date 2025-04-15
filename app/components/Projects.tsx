'use client'

import { useState } from 'react'
import { motion, LazyMotion, domAnimation, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const categories = [
  'WEEKLY WINNER 🏆',
  'MONTHLY WINNER 🌟',
  'ALL-TIME WINNER 👑'
]

const projects = [
  {
    id: 1,
    title: 'Winner #1',
    category: 'WEEKLY WINNER 🏆',
    image: '/1.jpg'
  },
  {
    id: 2,
    title: 'Winner #2',
    category: 'WEEKLY WINNER 🏆',
    image: '/2.jpg'
  },
  {
    id: 3,
    title: 'Winner #3',
    category: 'WEEKLY WINNER 🏆',
    image: '/3.jpg'
  },
  {
    id: 4,
    title: 'Winner #1',
    category: 'MONTHLY WINNER 🌟',
    image: '/4.jpg'
  },
  {
    id: 5,
    title: 'Winner #2',
    category: 'MONTHLY WINNER 🌟',
    image: '/5.jpg'
  },
  {
    id: 6,
    title: 'Winner #3',
    category: 'MONTHLY WINNER 🌟',
    image: '/6.jpg'
  },
  {
    id: 7,
    title: 'Winner #1',
    category: 'ALL-TIME WINNER 👑',
    image: '/7.jpg'
  },
  {
    id: 8,
    title: 'Winner #2',
    category: 'ALL-TIME WINNER 👑',
    image: '/8.jpg'
  },
  {
    id: 9,
    title: 'Winner #3',
    category: 'ALL-TIME WINNER 👑',
    image: '/9.jpg'
  }
]

interface FormData {
  name: string
  mobile: string
  amount: string
  screenshot: File | null
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState(categories[0])
  const [showDonationForm, setShowDonationForm] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    mobile: '',
    amount: '',
    screenshot: null
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData(prev => ({
      ...prev,
      screenshot: file
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setShowDonationForm(false)
    setShowThankYou(true)
    setTimeout(() => {
      setShowThankYou(false)
    }, 3000)
  }

  return (
    <section className="min-h-screen bg-[#FFB1E7] py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-7xl font-black tracking-tighter mb-6">
            WINNERS
          </h2>
          <p className="text-xl max-w-2xl mx-auto">
            Celebrating our champions who have achieved remarkable scores in the game.
            Each winner represents excellence and dedication.
          </p>
        </motion.div>

        {/* Category Toggle */}
        <div className="relative mb-16">
          <div className="flex rounded-full bg-gradient-to-r from-[#4169E1] to-[#D1FF73] p-2 max-w-4xl mx-auto shadow-xl">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`flex-1 py-3 px-6 rounded-full text-lg font-bold transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-[#D1FF73] text-black shadow-lg'
                    : 'text-white hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {projects
            .filter(project => project.category === activeCategory)
            .map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="relative aspect-[3/4] rounded-3xl overflow-hidden group"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">{project.title}</h3>
                </div>
              </motion.div>
            ))}
        </div>

        {/* Donation Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="bg-[#FF9B5C] rounded-[40px] p-12 flex items-center justify-between shadow-xl">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter max-w-2xl">
              INSPIRED BY OUR GAME? WANT TO SUPPORT US IN MAKING IT EVEN BETTER?
            </h2>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowDonationForm(true)}
              className="bg-[#BBFF00] text-black font-bold text-xl px-12 py-4 rounded-full border-b-[4px] border-black/25 hover:border-b-[2px] hover:translate-y-[2px] active:border-b-[0px] active:translate-y-[4px] transition-all duration-150 shadow-xl"
            >
              DONATE
            </motion.button>
          </div>
        </motion.div>

        {/* Donation Form Popup */}
        <AnimatePresence>
          {showDonationForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
              onClick={() => setShowDonationForm(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative bg-[#4169E1] rounded-[40px] p-12 max-w-2xl w-full mx-4 shadow-2xl"
                onClick={e => e.stopPropagation()}
              >
                <div className="text-center mb-8">
                  <h3 className="text-[#BBFF00] text-4xl font-black mb-4">DONATE</h3>
                  <p className="text-white text-xl font-bold">UPI ID - snakemaster123@oksbi</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full bg-[#E8F0FE] text-black text-lg italic rounded-full px-6 py-4 placeholder-black/70"
                    required
                  />
                  
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Mobile Number"
                    className="w-full bg-[#E8F0FE] text-black text-lg italic rounded-full px-6 py-4 placeholder-black/70"
                    required
                  />
                  
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="Donation Amount"
                    className="w-full bg-[#E8F0FE] text-black text-lg italic rounded-full px-6 py-4 placeholder-black/70"
                    required
                  />
                  
                  <div className="relative">
                    <input
                      type="file"
                      name="screenshot"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                      id="screenshot"
                      required
                    />
                    <label
                      htmlFor="screenshot"
                      className="block w-full bg-[#BBFF00] text-black text-lg italic rounded-full px-6 py-4 text-center cursor-pointer hover:bg-[#a3e600] transition-colors"
                    >
                      Upload Payment Screenshot
                    </label>
                    {formData.screenshot && (
                      <p className="mt-2 text-[#BBFF00] text-center">
                        File selected: {formData.screenshot.name}
                      </p>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-[#BBFF00] text-black font-bold text-xl px-8 py-4 rounded-full hover:bg-[#a3e600] transition-colors shadow-lg"
                  >
                    Submit Donation
                  </motion.button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Thank You Popup */}
        <AnimatePresence>
          {showThankYou && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-[#4169E1] rounded-[40px] p-12 text-center shadow-2xl"
              >
                <h3 className="text-[#BBFF00] text-4xl font-black mb-4">
                  Thank you for donating!
                </h3>
                <p className="text-white text-xl">
                  You made our day!
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
} 