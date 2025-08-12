import React from "react";
import { motion } from "framer-motion";

const socialLinks = [
    { name: "GitHub", url: "https://github.com/BadmusQudusAyomide", icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" },
    { name: "LinkedIn", url: "https://ng.linkedin.com/in/qudus-ayomide-badmus", icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" },
    { name: "Twitter", url: "https://x.com/Codestreamyy", icon: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" },
    { name: "Dribbble", url: "https://dribbble.com", icon: "M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm9.747 7.089c.896.525 1.604 1.237 2.129 2.133-.645-.028-1.344-.01-2.049.052-.021-.748-.168-1.46-.423-2.133.343.05.684.129 1.018.242a9.575 9.575 0 00-1.675-2.133c.525.896 1.237 1.604 2.133 2.129-.05-.343-.129-.684-.242-1.018.673.255 1.385.402 2.133.423-.062.705-.08 1.404-.052 2.049zM12 21.782c-5.414 0-9.782-4.368-9.782-9.782S6.586 2.218 12 2.218s9.782 4.368 9.782 9.782-4.368 9.782-9.782 9.782zm-4.726-16.5c-.255.673-.402 1.385-.423 2.133-.705-.062-1.404-.08-2.049-.052.525-.896 1.237-1.604 2.133-2.129.05.343.129.684.242 1.018a9.575 9.575 0 00-1.675 2.133c.896-.525 1.604-1.237 2.129-2.133-.343.05-.684.129-1.018.242.255.673.402 1.385.423 2.133.062-.705.08-1.404.052-2.049z" }
];

const quickLinks = ['Home', 'About', 'Projects', 'Contact'];

const contactInfo = [
    {
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
        text: "badmusqududayomide@gmail.com",
        href: "mailto:badmusqududayomide@gmail.com"
    },
    {
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
        ),
        text: "+(234) 902 259 4853",
        href: "tel:+2349022594853"
    }
];

export default function Footer() {
    return (
        <footer className="relative py-16 bg-gradient-to-b from-gray-900 to-gray-950 overflow-visible">
            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-10"
                        initial={{
                            x: `${Math.random() * 100}%`,
                            y: `${Math.random() * 100}%`,
                            width: `${Math.random() * 10 + 5}px`,
                            height: `${Math.random() * 10 + 5}px`
                        }}
                        animate={{
                            y: [`${Math.random() * 20}%`, `${Math.random() * 80}%`, `${Math.random() * 20}%`],
                            x: [`${Math.random() * 20}%`, `${Math.random() * 80}%`, `${Math.random() * 20}%`],
                            opacity: [0.05, 0.2, 0.05]
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                    {/* Brand section */}
                    <div className="space-y-6">
                        <motion.a
                            href="#home"
                            aria-label="Home"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="text-3xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 bg-clip-text text-transparent">
                                Badmus Qudus
                            </span>
                        </motion.a>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Crafting exceptional digital experiences that drive impact and inspire users.
                        </p>

                        {/* Social links */}
                        <div className="flex space-x-3">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={social.name}
                                    className="p-1.5 rounded-full bg-gray-800 hover:bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                                    whileHover={{ y: -2, scale: 1.06 }}
                                    whileTap={{ scale: 0.9 }}
                                    aria-label={`${social.name} profile`}
                                >
                                    <svg className="w-4 h-4 text-gray-300 hover:text-white" viewBox="0 0 24 24">
                                        <path fill="currentColor" d={social.icon} />
                                    </svg>
                                </motion.a>
                            ))}
                        </div>

                        {/* Resume download */}
                        <div className="pt-4">
                            <motion.a
                                href="/BADMUS%20QUDUS%20AYOMIDE%20CV.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                download
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium shadow hover:shadow-lg transition-shadow"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                aria-label="Download Resume PDF"
                                title="Download Resume"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                                </svg>
                                <span>Download Resume</span>
                            </motion.a>
                        </div>
                    </div>

                    {/* Quick links */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-gray-200">Quick Links</h3>
                        <ul className="space-y-3">
                            {quickLinks.map((item) => (
                                <motion.li
                                    key={item}
                                    whileHover={{ x: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <a
                                        href={`#${item.toLowerCase()}`}
                                        className="text-gray-400 hover:text-purple-400 transition-colors duration-300 py-1 inline-flex items-center"
                                        aria-label={`Navigate to ${item}`}
                                    >
                                        <span className="mr-2 text-purple-500">→</span>
                                        {item}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact info */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-gray-200">Get In Touch</h3>
                        <address className="not-italic text-gray-400 space-y-4">
                            {contactInfo.map((info, index) => (
                                <motion.div
                                    key={index}
                                    className="flex items-start"
                                    whileHover={{ x: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <span className="mr-3 mt-0.5 text-purple-400">{info.icon}</span>
                                    <a
                                        href={info.href}
                                        className="hover:text-purple-400 transition-colors"
                                    >
                                        {info.text}
                                    </a>
                                </motion.div>
                            ))}
                        </address>

                        {/* Newsletter */}
                        <div className="mt-6">
                            <h4 className="text-sm font-medium text-gray-300 mb-2">Subscribe to my newsletter</h4>
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white w-full"
                                />
                                <motion.button
                                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-r-lg font-medium"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Join
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <motion.div
                    className="mt-20 pt-10 border-t border-gray-800 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <p className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} Badmus Qudus Ayomide. All rights reserved.
                    </p>
                    <p className="text-gray-600 text-xs mt-2">
                        Crafted with ❤️ and React
                    </p>
                </motion.div>
            </div>
        </footer>
    );
}