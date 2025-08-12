"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { GithubLogo, ArrowSquareOut } from "phosphor-react";

type Project = {
    title: string;
    description: string;
    tags: string[];
    image: string;
    link: string;
    github: string;
    featured?: boolean;
};

const projects: Project[] = [
    {
        title: "Social Media Mesh",
        description:
            "A modern social platform with authentication, posts, likes, comments, and profiles. Backend built with Node.js, Express, and MongoDB using secure JWT auth and RESTful APIs. Clean architecture with a focus on scalability and developer ergonomics.",
        tags: ["Node.js", "Express", "MongoDB", "JWT", "REST"],
        image: "/projects/mesh.svg",
        link: "http://mesh-blush.vercel.app/",
        github: "https://github.com/BadmusQudusAyomide/mesh",
        featured: true,
    },
    {
        title: "Blorbmart – Buyer",
        description:
            "Buyer-facing e‑commerce for product discovery, search, cart, and checkout. Built with TypeScript + React (Vite), Firebase Auth, Firestore, and Storage. Optimized UX with persistent cart and responsive UI.",
        tags: ["TypeScript", "React (Vite)", "Firebase Auth", "Firestore", "Storage"],
        image: "/projects/blorb-buyer.svg",
        link: "https://blorb-buyer.vercel.app/",
        github: "https://github.com/BadmusQudusAyomide/blorb-buyer",
        featured: true,
    },
    {
        title: "Blorbmart – Seller Dashboard",
        description:
            "Dedicated seller portal for catalog, inventory and order management, with analytics. TypeScript + React (Vite) frontend integrated with Firebase services (Auth, Firestore, Storage). Separate codebase from the buyer app for clear ownership and scaling.",
        tags: ["TypeScript", "React (Vite)", "Firebase", "Dashboard"],
        image: "/projects/blorb-seller.svg",
        link: "https://blorb.vercel.app/",
        github: "https://github.com/BadmusQudusAyomide/Blorb",
        featured: true,
    },
    {
        title: "30 days Submission Platform",
        description:
            "A platform for submitting daily coding challenges with a leaderboard, progress tracking, and community features.",
        tags: ["React", "Node.js", "MongoDB", "Express.js"],
        image: "/projects/30day.svg",
        link: "https://30-day-code-w46x.vercel.app",
        github: "https://github.com/BadmusQudusAyomide/30-day-code",
    },
    {
        title: "Smart GPA Calculator",
        description:
            "Intelligent GPA calculator that suggests optimal course combinations and tracks performance across semesters.",
        tags: ["Flutter", "Dart", "SQLite"],
        image: "/projects/gpa.svg",
        link: "#",
        github: "https://github.com/BadmusQudusAyomide/smartgpa",
    },
    {
        title: "Student Attendance System",
        description:
            "A geolocation and face recognition-based attendance system with an admin dashboard.",
        tags: ["PHP", "OpenCV", "JavaScript", "MySQL"],
        image: "/projects/att.svg",
        link: "#",
        github: "https://github.com/BadmusQudusAyomide/ilarostudentattendance",
    },
];

const filterCategories = ['All', 'Featured', 'Web Apps', 'Mobile'];

export default function Projects({
    prefersReducedMotion = false,
}: {
    prefersReducedMotion?: boolean;
}) {
    const [activeFilter, setActiveFilter] = useState('All');
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const filteredProjects = projects.filter(project => {
        if (activeFilter === 'All') return true;
        if (activeFilter === 'Featured') return !!project.featured;
        if (activeFilter === 'Web Apps') return project.tags.some(tag =>
            ['React', 'Next.js', 'JavaScript', 'TypeScript'].includes(tag));
        if (activeFilter === 'Mobile') return project.tags.includes('Flutter');
        return true;
    });
    

    return (
        <section id="projects" className="py-24 relative overflow-hidden" aria-label="My projects">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20" />
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ scale: 0.9 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent leading-tight">
                            Featured Works
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6 rounded-full" />
                    </motion.div>
                    <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                        Crafting digital experiences that push boundaries and solve real-world problems through innovative technology solutions.
                    </p>
                </motion.div>

                {/* Filter Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    {filterCategories.map((category) => (
                        <motion.button
                            key={category}
                            onClick={() => setActiveFilter(category)}
                            whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeFilter === category
                                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/50 hover:border-purple-500/30'
                                }`}
                        >
                            {category}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Project grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={prefersReducedMotion ? {} : { y: -10 }}
                            onHoverStart={() => !prefersReducedMotion && setHoveredIndex(index)}
                            onHoverEnd={() => !prefersReducedMotion && setHoveredIndex(null)}
                            className="group relative cursor-pointer"
                        >
                            {/* Image Container */}
                            <div className="relative h-56 overflow-hidden">
                                <Image
                                    src={project.image}
                                    alt={`Screenshot of ${project.title}`}
                                    fill
                                    style={{ objectFit: "cover" }}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="transition-all duration-700 group-hover:scale-110"
                                    loading={index < 3 ? "eager" : "lazy"}
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                            </div>

                            {/* Project info */}
                            <div className="relative z-10 p-6">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-xl font-bold text-gray-100 group-hover:text-purple-400 transition-colors">
                                        {project.title}
                                    </h3>
                                    <div className="flex gap-2">
                                        {project.github !== "#" && (
                                            <motion.a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ y: -2 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="text-gray-400 hover:text-white p-1"
                                            >
                                                <GithubLogo className="w-5 h-5" weight="bold" />
                                            </motion.a>
                                        )}
                                        {project.link !== "#" && (
                                            <motion.a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ y: -2 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="text-gray-400 hover:text-white p-1"
                                            >
                                                <ArrowSquareOut className="w-5 h-5" weight="bold" />
                                            </motion.a>
                                        )}
                                    </div>
                                </div>
                                <p className="text-gray-400 mb-4">
                                    {project.description}
                                </p>

                                <div className="mt-2 flex flex-wrap gap-2">
                                    {project.tags.map((tag, tagIndex) => (
                                        <span
                                            key={tagIndex}
                                            className="text-xs px-3 py-1 bg-gray-700/50 rounded-full text-purple-300 border border-gray-600/50"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-5 flex gap-3">
                                    {project.link !== "#" && (
                                        <motion.a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.03, y: -1 }}
                                            whileTap={{ scale: 0.97 }}
                                            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-sm font-medium flex items-center gap-2 shadow-lg"
                                        >
                                            <span>Live Preview</span>
                                            <ArrowSquareOut className="w-4 h-4" weight="bold" />
                                        </motion.a>
                                    )}
                                    {project.github !== "#" && (
                                        <motion.a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.03, y: -1 }}
                                            whileTap={{ scale: 0.97 }}
                                            className="px-4 py-2 text-purple-400 border border-purple-400 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-purple-400/10 transition-colors"
                                        >
                                            <span>GitHub</span>
                                            <GithubLogo className="w-4 h-4" weight="bold" />
                                        </motion.a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-center mt-16"
                >
                    <p className="text-lg text-gray-400 mb-6">
                        Interested in collaborating on your next project?
                    </p>
                    <motion.button
                        whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-medium text-white hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-purple-500/25"
                    >
                        Get In Touch
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}