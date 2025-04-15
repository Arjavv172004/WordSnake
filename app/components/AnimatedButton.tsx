'use client';

import { motion } from 'framer-motion';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
}

const AnimatedButton = ({ 
  children, 
  onClick, 
  className = '', 
  variant = 'primary' 
}: AnimatedButtonProps) => {
  const baseStyles = "px-6 py-3 rounded-lg font-medium transition-all duration-300";
  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300"
  };

  return (
    <motion.button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17
      }}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton; 