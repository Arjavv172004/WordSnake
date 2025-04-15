'use client';

import { motion } from 'framer-motion';

interface GameSettingsProps {
  snakeColor: string;
  onColorChange: (color: string) => void;
}

export default function GameSettings({ snakeColor, onColorChange }: GameSettingsProps) {
  return (
    <div className="bg-[#BBFF00] p-8 rounded-[40px] shadow-2xl w-full lg:w-80">
      <h2 className="text-black text-3xl font-black mb-8 text-center">SETTINGS</h2>

      {/* Snake Color Selection */}
      <div className="mb-8">
        <h3 className="text-black text-xl font-bold mb-4">SNAKE COLOR</h3>
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onColorChange('#FF69B4')}
            className={`w-12 h-12 rounded-full bg-[#FF69B4] border-4 ${
              snakeColor === '#FF69B4' ? 'border-black' : 'border-transparent'
            }`}
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onColorChange('#00BBFF')}
            className={`w-12 h-12 rounded-full bg-[#00BBFF] border-4 ${
              snakeColor === '#00BBFF' ? 'border-black' : 'border-transparent'
            }`}
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onColorChange('#FFFFFF')}
            className={`w-12 h-12 rounded-full bg-white border-4 ${
              snakeColor === '#FFFFFF' ? 'border-black' : 'border-transparent'
            }`}
          />
        </div>
      </div>

      {/* Game Instructions */}
      <div>
        <h3 className="text-black text-xl font-bold mb-4">HOW TO PLAY</h3>
        <ul className="text-black space-y-2">
          <li>• Collect letters in the correct sequence</li>
          <li>• Complete 5 words to win</li>
          <li>• Use arrow keys to move</li>
          <li>• Don't hit the walls or yourself</li>
          <li>• Press Pause to take a break</li>
        </ul>
      </div>
    </div>
  );
} 