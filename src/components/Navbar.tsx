'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Home, User, Code, Folder, Mail } from 'lucide-react';

type IconComponent = React.ComponentType<{ size?: number; className?: string }>;
const navItems: { name: string; href: string; Icon: IconComponent }[] = [
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
  const [isHoveringNav, setIsHoveringNav] = useState(false);

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

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed inset-x-0 top-0 z-50 px-4"
      onMouseEnter={() => setIsHoveringNav(true)}
      onMouseLeave={() => setIsHoveringNav(false)}
    >
      <div className={`mx-auto max-w-max transition-all duration-300 ${scrolled ? 'mt-2' : 'mt-4'}`}>
        <div className={`relative inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 backdrop-blur-2xl shadow-lg shadow-black/20 px-3 py-2
          dark:bg-gray-900/50 dark:border-white/10 transition-all duration-300 ${isHoveringNav ? 'bg-white/20 dark:bg-gray-900/70' : ''}`}>

          <div className="flex items-center justify-center gap-1 sm:gap-2 min-w-max">
            {navItems.map((item, index) => {
              const active = currentHash === item.href;
              const isHovered = hoveredIndex === index;
              const distance = hoveredIndex === null ? Infinity : Math.abs(index - (hoveredIndex ?? 0));

              // Dynamic scaling based on distance from hovered item
              const scale = isHovered ? 1.2 :
                distance === 1 ? 1.1 :
                  distance === 2 ? 1.05 : 1;

              const { Icon } = item;

              return (
                <motion.div
                  key={item.name}
                  className="relative"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                    delay: 0.1 + index * 0.05
                  }}
                >
                  <motion.a
                    href={item.href}
                    aria-label={item.name}
                    className={`group relative grid place-items-center w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-visible select-none
                      ${active ? 'bg-cyan-500/20' : 'bg-white/5 hover:bg-white/10'}`}
                    animate={{
                      scale,
                      boxShadow: isHovered ? '0 0 12px rgba(34, 211, 238, 0.4)' : 'none'
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    onHoverStart={() => setHoveredIndex(index)}
                    onHoverEnd={() => setHoveredIndex(null)}
                    onFocus={() => setHoveredIndex(index)}
                    onBlur={() => setHoveredIndex(null)}
                  >
                    {/* Active indicator */}
                    {active && (
                      <motion.span
                        className="absolute -bottom-1 left-1/2 w-1 h-1 rounded-full bg-cyan-400"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500 }}
                      />
                    )}

                    {/* Icon with subtle hover effect */}
                    <Icon
                      size={20}
                      className={`transition-all duration-200 ${active ? 'text-cyan-400 scale-110' : 'text-white/90 hover:text-white'}`}
                      strokeWidth={active ? 2.5 : 2}
                    />

                    {/* Subtle glow effect */}
                    <motion.span
                      className={`absolute inset-0 rounded-full bg-cyan-400/20 blur-md -z-10`}
                      animate={{ opacity: isHovered || active ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.a>

                  {/* Tooltip with AnimatePresence for smooth exit */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-1/2 -translate-x-1/2 -top-2 -translate-y-full px-2 py-1 rounded-md text-xs font-medium text-white 
                          shadow-lg border border-white/15 bg-gray-800/90 backdrop-blur-md whitespace-nowrap pointer-events-none"
                        style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' }}
                      >
                        {item.name}
                        {/* Tooltip arrow */}
                        <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-gray-800/90 border-b border-r border-white/15 rotate-45" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Ambient light effect when hovering navbar */}
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none -z-10"
            animate={{
              opacity: isHoveringNav ? 0.3 : 0,
              background: 'radial-gradient(circle at center, rgba(56, 189, 248, 0.3) 0%, transparent 70%)'
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </motion.nav>
  );
}