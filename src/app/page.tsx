'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import Skills from '../components/Skills';
import About from '../components/About';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

// Projects data moved into components/Projects.tsx

export default function Home() {
  const [loading] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && 'matchMedia' in window) {
        setPrefersReducedMotion(
          window.matchMedia('(prefers-reduced-motion: reduce)').matches
        );
      }
    } catch {
      // ignore
    }
    // If you want a brief loader, set loading true then clear it
    // setLoading(true);
    // const timer = setTimeout(() => setLoading(false), 1200);
    // return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <AnimatePresence>
      <div className="min-h-screen bg-transparent text-gray-100">
        <Navbar />

        <main>
          {/* Hero Section */}
          <section id="home" className="relative min-h-[85vh] md:min-h-screen flex items-center overflow-hidden py-20" aria-label="Introduction">
            <div className="container mx-auto px-6 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="max-w-4xl mx-auto text-center md:text-left"
              >
                <p className="text-sm md:text-base text-purple-300/80 font-mono tracking-wide mb-3">Hi, I’m Badmus</p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-5">
                  <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                   Transforming vision into impactful digital reality.
                  </span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-300/90 max-w-2xl">
                  I’m a software engineer based in Nigeria, focused on building fast, accessible, and beautiful web experiences.
                </p>

                {/* CTAs */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4 md:justify-start justify-center">
                  <motion.a
                    href="#contact"
                    whileHover={{ scale: prefersReducedMotion ? 1 : 1.04 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label="Let’s work together"
                    className="px-7 py-3.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-lg shadow-purple-900/30"
                  >
                    <span>Let’s Work Together</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </motion.a>
                  <motion.a
                    href="/BADMUS%20QUDUS%20AYOMIDE%20CV.pdf"
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: prefersReducedMotion ? 1 : 1.04 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label="Download my CV"
                    className="px-7 py-3.5 border border-purple-400/70 text-purple-300 rounded-lg font-semibold flex items-center justify-center gap-2 backdrop-blur-sm bg-white/0"
                  >
                    <span>Download CV</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                    </svg>
                  </motion.a>
                </div>

                {/* Social proof / quick stats */}
                <div className="mt-8 flex flex-wrap gap-6 text-sm text-gray-400 md:justify-start justify-center">
                  <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-purple-500"></span> 50+ Projects</div>
                  <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-pink-500"></span> 5+ Years Learning</div>
                  <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-indigo-500"></span> Open Source</div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* About Section */}
          <About />

          <Skills />

          {/* Projects Section */}
          <Projects prefersReducedMotion={prefersReducedMotion} />

          {/* Contact Section */}
          <Contact prefersReducedMotion={prefersReducedMotion} />

        </main>

        <Footer />
      </div>
    </AnimatePresence>
  );
}