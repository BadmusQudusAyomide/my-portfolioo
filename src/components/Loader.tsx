'use client';
import { motion } from 'framer-motion';
import React from 'react';

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ 
        delay: 2, 
        duration: 0.5,
        ease: "easeInOut"
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900"
      role="status"
      aria-label="Loading"
    >
      <div className="relative flex space-x-2">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`loader-dot-${i}`}
            initial={{ y: 0 }}
            animate={{ y: [0, -12, 0] }} // Reduced jump height for subtlety
            transition={{
              repeat: Infinity,
              duration: 1.2, // Slightly faster animation
              delay: i * 0.08, // Reduced delay between dots
              ease: "easeInOut"
            }}
            className="w-3 h-3 rounded-full bg-purple-400" // Smaller and softer color
            aria-hidden="true"
          />
        ))}
      </div>
      <span className="sr-only">Loading content...</span>
    </motion.div>
  );
}