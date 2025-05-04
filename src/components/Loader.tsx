'use client';
import { motion } from 'framer-motion';
import React from 'react';

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 2, duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900"
    >
      <div className="relative flex space-x-2">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: 0 }}
            animate={{ y: [0, -20, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              delay: i * 0.1,
              ease: "easeInOut"
            }}
            className="w-4 h-4 rounded-full bg-purple-500"
          />
        ))}
      </div>
    </motion.div>
  );
}