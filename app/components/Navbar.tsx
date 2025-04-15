'use client'

import { motion, LazyMotion, domAnimation } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  return (
    <LazyMotion features={domAnimation}>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="container mx-auto pl-2 pr-4 py-4 flex items-center justify-between">
          <Link href="/" className="w-[320px] h-[100px] relative -ml-4">
            <Image
              src="/logo.png"
              alt="Logo"
              fill
              className="object-contain"
              priority
            />
          </Link>

          <Link href="/leaderboard">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="play-button !px-10 !py-4 !text-lg"
            >
              LEADERBOARD
            </motion.button>
          </Link>
        </div>
      </nav>
    </LazyMotion>
  )
} 