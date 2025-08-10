
'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { House, User as UserIcon, Code as CodeIcon, FolderSimple, EnvelopeSimple, IconProps } from 'phosphor-react';

type IconComponent = React.ComponentType<IconProps>;
const navItems: { name: string; href: string; Icon: IconComponent }[] = [
  { name: 'Home', href: '#home', Icon: House },
  { name: 'About', href: '#about', Icon: UserIcon },
  { name: 'Skills', href: '#skills', Icon: CodeIcon },
  { name: 'Projects', href: '#projects', Icon: FolderSimple },
  { name: 'Contact', href: '#contact', Icon: EnvelopeSimple },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [currentHash, setCurrentHash] = useState<string>('');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#home');
    };

    // initialize
    handleHashChange();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const closeMobileMenu = () => {
    // kept for anchor clicks; no-op now that menu is always visible
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed inset-x-0 top-0 z-50 px-3 sm:px-4"
      >
        <div
          className={`mx-auto max-w-max transition-all ${scrolled ? 'mt-2' : 'mt-4'}`}
        >
          {/* Centered, fully rounded glass bar */}
          <div
            className={`mx-auto inline-flex items-center justify-center gap-2 sm:gap-3 rounded-full border border-white/15 bg-white/10 backdrop-blur-2xl shadow-lg shadow-black/20 px-2.5 sm:px-3 py-2 
            dark:bg-gray-900/50 dark:border-white/10 supports-[backdrop-filter]:bg-white/10`}
          >
            {/* Icon-only items with tooltip; distance-based scaling */}
            <div className="flex-1">
              <div className="flex items-center justify-center gap-2 sm:gap-3 min-w-max">
                {navItems.map((item, index) => {
                  const active = currentHash === item.href;
                  const isHovered = hoveredIndex === index;
                  const distance = hoveredIndex === null ? Infinity : Math.abs(index - (hoveredIndex ?? 0));
                  const scale =
                    hoveredIndex === null
                      ? 1.0
                      : distance === 0
                      ? 1.35
                      : distance === 1
                      ? 1.15
                      : distance === 2
                      ? 1.06
                      : 1.0;
                  const { Icon } = item;
                  return (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      aria-label={item.name}
                      className={`group relative grid place-items-center w-12 h-12 rounded-full ring-1 ring-white/20 bg-white/10 text-white overflow-visible select-none 
                        ${active ? 'ring-2 ring-cyan-400/60' : ''}`}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0, scale }}
                      transition={{ type: 'spring', stiffness: 260, damping: 22, delay: 0.12 + index * 0.06 }}
                      onHoverStart={() => setHoveredIndex(index)}
                      onHoverEnd={() => setHoveredIndex(null)}
                      onFocus={() => setHoveredIndex(index)}
                      onBlur={() => setHoveredIndex(null)}
                      onClick={closeMobileMenu}
                    >
                      {/* Icon (white, bold) */}
                      <span className="relative z-10 text-white">
                        <Icon size={22} weight="bold" color="#ffffff" className="transition-transform duration-300" style={{ transform: isHovered ? 'scale(1.15)' : 'scale(1.0)' }} />
                      </span>

                      {/* Tooltip */}
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.95 }}
                          animate={{ opacity: 1, y: -4, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.95 }}
                          transition={{ duration: 0.18 }}
                          className="pointer-events-none absolute -top-2 translate-y-[-100%] px-2 py-1 rounded-md text-[10px] font-medium text-white 
                            shadow-lg border border-white/15 bg-gray-900/80 backdrop-blur-md"
                        >
                          {item.name}
                        </motion.div>
                      )}

                      {/* Gradient glow behind icon */}
                      <span className={`pointer-events-none absolute inset-0 rounded-full blur-lg transition-opacity duration-300 glow-rotate ${
                        isHovered || active ? 'opacity-60' : 'opacity-0'
                      }`} style={{
                        background: 'conic-gradient(from 180deg at 50% 50%, rgba(0,220,255,0.95), rgba(124,58,237,0.95), rgba(0,132,255,0.95), rgba(0,220,255,0.95))'
                      }} />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* No mobile dropdown; links are always visible in the top bar */}

    </>
  );
}