'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import Skills from '../components/Skills';
import About from '../components/About';
import Projects from '../components/Projects';

// Projects data moved into components/Projects.tsx

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setPrefersReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
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
                    href="/resume.pdf"
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
          {/* Contact Section */}
<section id="contact" className="py-20 relative overflow-hidden" aria-label="Contact me">
  <div className="container mx-auto px-6 relative">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
        Get In Touch
      </h2>
      <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
        Have a project in mind or want to collaborate? Feel free to reach out!
      </p>
    </div>

    <div className="max-w-2xl mx-auto">
      <form 
        action="https://formspree.io/f/xpwddlaj"
        method="POST"
        className="space-y-6"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Name <span className="text-pink-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                id="name"
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-100 transition-all duration-200 peer"
                placeholder="Your name"
              />
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 peer-focus:w-full"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email <span className="text-pink-500">*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-100 transition-all duration-200 peer"
                placeholder="your.email@example.com"
              />
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 peer-focus:w-full"></div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
            Subject
          </label>
          <div className="relative">
            <input
              type="text"
              id="subject"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-100 transition-all duration-200 peer"
              placeholder="What's this about?"
            />
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 peer-focus:w-full"></div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
            Message <span className="text-pink-500">*</span>
          </label>
          <div className="relative">
            <textarea
              id="message"
              rows={5}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-100 transition-all duration-200 peer"
              placeholder="Your message here..."
            ></textarea>
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 peer-focus:w-full"></div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="pt-4"
        >
          <motion.button
            type="submit"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 0 20px rgba(192, 132, 252, 0.5)"
            }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-medium text-white flex items-center justify-center gap-2 group"
          >
            <span>Send Message</span>
            <motion.span
              animate={{
                x: [0, 4, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity
              }}
              className="group-hover:translate-x-1 transition-transform"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </motion.span>
          </motion.button>
        </motion.div>
      </form>
      
      <div className="mt-12 flex justify-center gap-6">
        {[
          { icon: 'github', url: 'https://github.com/BadmusQudusAyomide', label: 'GitHub' },
          { icon: 'linkedin', url: 'https://ng.linkedin.com/in/qudus-ayomide-badmus', label: 'LinkedIn' },
          { icon: 'twitter', url: 'https://x.com/AyomideQud49713', label: 'Twitter' },
          { icon: 'mail', url: 'mailto:badmusqududayomide@gmail.com', label: 'Email' }
        ].map((social, index) => (
          <motion.a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: prefersReducedMotion ? 0 : -5, scale: prefersReducedMotion ? 1 : 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 hover:text-purple-400 transition-colors p-2"
            aria-label={social.label}
          >
            {social.icon === 'github' && (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            )}
            {social.icon === 'linkedin' && (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            )}
            {social.icon === 'twitter' && (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            )}
            {social.icon === 'mail' && (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            )}
          </motion.a>
        ))}
      </div>
    </div>
  </div>
</section>

        </main>

        <footer className="py-20 bg-transparent">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
              <div className="space-y-6">
                <a href="#home" aria-label="Home">
                  <span className="text-3xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 bg-clip-text text-transparent">
                    Badmus Qudus
                  </span>
                </a>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Crafting exceptional digital experiences that drive impact and inspire users.
                </p>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-200">Quick Links</h3>
                <ul className="space-y-4">
                  {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                    <li key={item}>
                      <a 
                        href={`#${item.toLowerCase()}`} 
                        className="text-gray-400 hover:text-purple-400 transition-colors duration-300 py-1 inline-block"
                        aria-label={`Navigate to ${item}`}
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-200">Contact</h3>
                <address className="not-italic text-gray-400 space-y-4">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 mr-3 mt-0.5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href="mailto:badmusqududayomide@gmail.com" className="hover:text-purple-400 transition-colors">
                      badmusqududayomide@gmail.com
                    </a>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 mr-3 mt-0.5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a href="tel:+2349022594853" className="hover:text-purple-400 transition-colors">
                      +(234) 902 259 4853
                    </a>
                  </div>
                </address>
              </div>
            </div>

            <div className="mt-20 pt-10 border-t border-gray-700/50 text-center">
              <p className="text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} Badmus Qudus Ayomide. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </AnimatePresence>
  );
}