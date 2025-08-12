"use client";
import React from "react";
import { motion } from "framer-motion";

interface ContactProps {
    prefersReducedMotion: boolean;
}

export default function Contact({ prefersReducedMotion }: ContactProps) {
    const socialLinks = [
        {
            icon: 'github',
            url: 'https://github.com/BadmusQudusAyomide',
            label: 'GitHub',
            color: 'from-gray-700 to-gray-900'
        },
        {
            icon: 'linkedin',
            url: 'https://ng.linkedin.com/in/qudus-ayomide-badmus',
            label: 'LinkedIn',
            color: 'from-blue-600 to-blue-800'
        },
        {
            icon: 'twitter',
            url: 'https://x.com/Codestreamyy',
            label: 'Twitter',
            color: 'from-sky-400 to-sky-600'
        },
        {
            icon: 'mail',
            url: 'mailto:badmusqududayomide@gmail.com',
            label: 'Email',
            color: 'from-rose-500 to-pink-600'
        }
    ];

    return (
        <section id="contact" className="relative py-20 overflow-hidden bg-gradient-to-b from-gray-900 to-gray-950" aria-label="Contact me">
            {/* Floating background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(10)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10"
                        initial={{
                            x: `${Math.random() * 100}%`,
                            y: `${Math.random() * 100}%`,
                            width: `${Math.random() * 300 + 100}px`,
                            height: `${Math.random() * 300 + 100}px`,
                            opacity: 0.05
                        }}
                        animate={{
                            x: [`${Math.random() * 20}%`, `${Math.random() * 80}%`],
                            y: [`${Math.random() * 20}%`, `${Math.random() * 80}%`],
                            opacity: [0.05, 0.15, 0.05]
                        }}
                        transition={{
                            duration: Math.random() * 20 + 20,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        className="text-4xl md:text-6xl font-bold mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-rose-500 bg-clip-text text-transparent">
                            Let&#39;s Connect
                        </span>
                    </motion.h2>

                    <motion.p
                        className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Have a project in mind or want to collaborate? I&#39;d love to hear from you!
                    </motion.p>
                </div>

                <div className="max-w-2xl mx-auto">
                    <form
                        action="https://formspree.io/f/xpwddlaj"
                        method="POST"
                        className="space-y-6 bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 shadow-xl"
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
                                        className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-100 transition-all duration-200 peer"
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
                                        className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-100 transition-all duration-200 peer"
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
                                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-100 transition-all duration-200 peer"
                                    placeholder="What&#39;s this about?"
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
                                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-100 transition-all duration-200 peer"
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
                                    scale: prefersReducedMotion ? 1 : 1.03,
                                    boxShadow: "0 0 30px rgba(192, 132, 252, 0.4)"
                                }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-medium text-white flex items-center justify-center gap-2 group relative overflow-hidden"
                            >
                                <span className="relative z-10">Send Message</span>
                                <motion.span
                                    animate={{
                                        x: prefersReducedMotion ? 0 : [0, 4, 0]
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity
                                    }}
                                    className="relative z-10 group-hover:translate-x-1 transition-transform"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                    </svg>
                                </motion.span>
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </motion.button>
                        </motion.div>
                    </form>

                    <motion.div
                        className="mt-16"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <h3 className="text-center text-xl font-semibold text-gray-300 mb-8">
                            Or find me on
                        </h3>
                        <div className="flex justify-center gap-4 flex-wrap">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{
                                        y: prefersReducedMotion ? 0 : -5,
                                        scale: prefersReducedMotion ? 1 : 1.1
                                    }}
                                    whileTap={{ scale: 0.9 }}
                                    className={`p-3 rounded-xl bg-gradient-to-br ${social.color} shadow-md hover:shadow-lg transition-all duration-300`}
                                    aria-label={social.label}
                                >
                                    {social.icon === 'github' && (
                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                    )}
                                    {social.icon === 'linkedin' && (
                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                        </svg>
                                    )}
                                    {social.icon === 'twitter' && (
                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                        </svg>
                                    )}
                                    {social.icon === 'mail' && (
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    )}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}