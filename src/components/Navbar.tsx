'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Home, User, Code, Folder, Mail } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '#home', Icon: Home },
  { name: 'About', href: '#about', Icon: User },
  { name: 'Skills', href: '#skills', Icon: Code },
  { name: 'Projects', href: '#projects', Icon: Folder },
  { name: 'Contact', href: '#contact', Icon: Mail },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [currentHash, setCurrentHash] = useState('#home');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#home');
    };

    handleHashChange();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const getItemScale = (index: number) => {
    if (hoveredIndex === null) return 1;
    const distance = Math.abs(index - hoveredIndex);
    if (distance === 0) return 1.2;
    if (distance === 1) return 1.1;
    if (distance === 2) return 1.05;
    return 1;
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.2
      }}
      className="fixed inset-x-0 top-0 z-50 px-4 sm:px-6"
    >
      <div className={`mx-auto max-w-fit transition-all duration-500 ease-out ${scrolled ? 'mt-3' : 'mt-6'
        }`}>
        {/* Main navigation container */}
        <div className="relative">
          {/* Animated background with multiple layers */}
          <div className="absolute inset-0 rounded-full">
            {/* Base glass layer */}
            <div className="absolute inset-0 rounded-full bg-white/[0.08] backdrop-blur-xl border border-white/[0.12] shadow-2xl" />

            {/* Gradient border animation */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-sm opacity-70 animate-pulse" />

            {/* Inner glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/10 to-purple-600/10" />
          </div>

          {/* Navigation items */}
          <div className="relative flex items-center gap-1 px-3 py-2.5">
            {navItems.map((item, index) => {
              const { Icon } = item;
              const isActive = currentHash === item.href;
              const isHovered = hoveredIndex === index;
              const scale = getItemScale(index);

              return (
                <motion.div
                  key={item.name}
                  className="relative"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale
                  }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 300,
                    damping: 25
                  }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                >
                  <motion.a
                    href={item.href}
                    className={`
                      relative flex items-center justify-center w-10 h-10 rounded-xl
                      transition-all duration-300 ease-out cursor-pointer
                      ${isActive
                        ? 'bg-white/20 text-white shadow-lg shadow-cyan-500/25'
                        : 'bg-white/5 text-white/70 hover:bg-white/15 hover:text-white'
                      }
                    `}
                    whileHover={{
                      y: -2,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{
                      scale: 0.95,
                      transition: { duration: 0.1 }
                    }}
                  >
                    {/* Active indicator */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/30 to-blue-500/30 blur-sm"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Icon */}
                    <motion.div
                      animate={{
                        rotate: isHovered ? 5 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon
                        size={16}
                        className="relative z-10"
                        strokeWidth={isActive ? 2.5 : 2}
                      />
                    </motion.div>

                    {/* Hover glow effect */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          className="absolute inset-0 rounded-xl bg-white/10 blur-md"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1.2 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Enhanced tooltip */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.8 }}
                          animate={{ opacity: 1, y: -16, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.8 }}
                          transition={{
                            duration: 0.2,
                            type: "spring",
                            stiffness: 400,
                            damping: 25
                          }}
                          className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
                        >
                          <div className="relative">
                            {/* Tooltip background */}
                            <div className="px-2.5 py-1.5 rounded-lg bg-gray-900/90 backdrop-blur-sm border border-white/20 shadow-xl">
                              <span className="text-xs font-medium text-white whitespace-nowrap">
                                {item.name}
                              </span>
                            </div>

                            {/* Tooltip arrow */}
                            <div className="absolute left-1/2 -translate-x-1/2 top-full">
                              <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-t-[4px] border-transparent border-t-gray-900/90" />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.a>
                </motion.div>
              );
            })}
          </div>

          {/* Floating particles effect */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
            {[...Array(6)].map((_, i) => {
              // Use deterministic values based on index to avoid hydration mismatch
              const xPos = (i * 33) % 200;
              const yPos = (i * 7) % 40;
              const duration = 3 + (i * 0.5);
              const delay = i * 0.3;
              
              return (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white/30 rounded-full"
                  initial={{
                    x: xPos,
                    y: yPos,
                    opacity: 0
                  }}
                  animate={{
                    x: xPos + 50,
                    y: yPos + 10,
                    opacity: [0, 0.6, 0],
                  }}
                  transition={{
                    duration: duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: delay
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}