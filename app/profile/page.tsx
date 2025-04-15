'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function ProfilePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [followStatus, setFollowStatus] = useState<{ [key: string]: boolean }>({});

  // Example player stats - in a real app, these would come from your backend
  const playerStats = {
    username: "SnakeMaster123",
    level: 25,
    streak: 7,
    friends: 42,
    gamesPlayed: 156,
    bio: "Snake enthusiast and competitive gamer. Always up for a challenge! 🐍",
    highestScore: 2489
  };

  // Example suggested players - in a real app, these would come from your backend
  const suggestedPlayers = [
    { id: '1', username: "SnakeWarrior", score: 2100, level: 15, image: '/3.jpg' },
    { id: '2', username: "VenomMaster", score: 1950, level: 12, image: '/7.jpg' },
    { id: '3', username: "CobraKing", score: 2300, level: 18, image: '/11.jpg' },
    { id: '4', username: "PythonPro", score: 1850, level: 14, image: '/15.jpg' }
  ];

  const handleFollow = (playerId: string) => {
    setFollowStatus(prev => ({
      ...prev,
      [playerId]: true
    }));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#4169E1] via-[#00FF00] to-[#00BFFF] p-8">
      {/* Back Button */}
      <Link href="/">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#BBFF00] hover:bg-[#BBFF00]/90 rounded-full px-6 py-3 flex items-center gap-2 shadow-lg mb-8"
        >
          <span className="text-xl font-black text-black">← Back</span>
        </motion.button>
      </Link>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Player Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#4169E1] rounded-[2rem] p-8 shadow-xl"
        >
          <div className="flex items-start gap-6">
            <Image
              src="/12.jpg"
              alt="Profile Picture"
              width={120}
              height={120}
              className="rounded-2xl shadow-lg"
            />
            <div>
              <h2 className="text-4xl font-black text-white mb-2">{playerStats.username}</h2>
              <p className="text-white/80 text-lg mb-2 italic">Level {playerStats.level}</p>
              <p className="text-white/80 text-lg mb-4 italic">{playerStats.bio}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-white rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-[#4169E1] mb-1">Current Streak</h3>
              <p className="text-4xl font-black text-[#4169E1]">{playerStats.streak} days</p>
            </div>
            <div className="bg-white rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-[#4169E1] mb-1">Friends</h3>
              <p className="text-4xl font-black text-[#4169E1]">{playerStats.friends}</p>
            </div>
            <div className="bg-white rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-[#4169E1] mb-1">Games Played</h3>
              <p className="text-4xl font-black text-[#4169E1]">{playerStats.gamesPlayed}</p>
            </div>
            <div className="bg-white rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-[#4169E1] mb-1">Highest Score</h3>
              <p className="text-4xl font-black text-[#4169E1]">{playerStats.highestScore}</p>
            </div>
          </div>
        </motion.div>

        {/* User Search and Suggestions Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#4169E1] rounded-[2rem] p-8 shadow-xl"
        >
          <h2 className="text-4xl font-black text-white mb-6">Find Players</h2>
          
          {/* Search Bar */}
          <div className="relative mb-8">
            <input
              type="text"
              placeholder="Search players by username..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white rounded-full px-6 py-4 text-[#4169E1] placeholder:text-[#4169E1]/60 focus:outline-none focus:ring-2 focus:ring-[#BBFF00] text-lg font-medium"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="h-[2.75rem] bg-[#BBFF00] hover:bg-[#BBFF00]/90 rounded-full px-6 text-black font-black flex items-center justify-center"
              >
                Search
              </motion.button>
            </div>
          </div>

          {/* Suggested Players */}
          <div className="space-y-4">
            <h3 className="text-2xl font-black text-white mb-4">Suggested Players</h3>
            {suggestedPlayers.map((player) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={player.image}
                    alt={player.username}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <h4 className="text-xl font-bold text-[#4169E1]">{player.username}</h4>
                    <p className="text-[#4169E1]/60 italic">Level {player.level} • Score {player.score}</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleFollow(player.id)}
                  className={`px-6 py-2 rounded-full font-black ${
                    followStatus[player.id]
                      ? 'bg-gray-200 text-[#4169E1]/60 cursor-default'
                      : 'bg-[#BBFF00] hover:bg-[#BBFF00]/90 text-black'
                  }`}
                  disabled={followStatus[player.id]}
                >
                  {followStatus[player.id] ? 'Sent' : 'Follow'}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
} 