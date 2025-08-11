"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type Project = {
    title: string;
    description: string;
    tags: string[];
    image: string;
    link: string;
    github: string;
    featured?: boolean;
    status?: 'live' | 'coming-soon' | 'beta';
};

const projectImages = [
    "/projects/30day.jpg",
    "/projects/gpa.jpg",
    "/projects/att.jpg",
    "/projects/p.jpg",
    "/projects/portfolio.jpg",
];

const projects: Project[] = [
    {
        title: "30 days Submission Platform",
        description:
            "A comprehensive platform for submitting daily coding challenges with real-time leaderboard, progress tracking, and community features.",
        tags: ["React", "Node.js", "MongoDB", "Express.js", "WebSocket"],
        image: projectImages[0],
        link: "https://30-day-code-w46x.vercel.app",
        github: "https://github.com/BadmusQudusAyomide/30-day-code",
        featured: true,
        status: 'live'
    },
    {
        title: "Smart GPA Calculator",
        description:
            "Intelligent GPA calculator with predictive algorithms to suggest optimal course combinations and comprehensive academic tracking.",
        tags: ["Flutter", "Dart", "SQLite", "Material Design"],
        image: projectImages[1],
        link: "#",
        github: "https://github.com/BadmusQudusAyomide/smartgpa",
        status: 'beta'
    },
    {
        title: "AI-Powered Attendance System",
        description:
            "Advanced student attendance solution featuring geolocation verification, facial recognition, and real-time analytics dashboard.",
        tags: ["PHP", "OpenCV", "JavaScript", "MySQL", "AI/ML"],
        image: projectImages[2],
        link: "#",
        github: "https://github.com/BadmusQudusAyomide/ilarostudentattendance",
        featured: true,
        status: 'live'
    },
    {
        title: "Weather Intelligence Dashboard",
        description: "Interactive weather visualization platform with predictive analytics, climate trends, and location-based insights.",
        tags: ["React", "D3.js", "Weather API", "TypeScript"],
        image: projectImages[3],
        link: "#",
        github: "#",
        status: 'coming-soon'
    },
    {
        title: "Interactive Portfolio Experience",
        description:
            "Immersive portfolio website featuring advanced animations, 3D elements, and seamless user interactions.",
        tags: ["Next.js", "Tailwind CSS", "Framer Motion", "Three.js"],
        image: projectImages[4],
        link: "https://badmusqudusay.vercel.app/",
        github: "https://github.com/BadmusQudusAyomide/my-portfolioo",
        featured: true,
        status: 'live'
    },
];

const filterCategories = ['All', 'Featured', 'Web Apps', 'Mobile', 'AI/ML'];

export default function Projects({
    prefersReducedMotion = false,
}: {
    prefersReducedMotion?: boolean;
}) {
    const [activeFilter, setActiveFilter] = useState('All');
    const [hoveredProject, setHoveredProject] = useState<number | null>(null);

    const filteredProjects = projects.filter(project => {
        if (activeFilter === 'All') return true;
        if (activeFilter === 'Featured') return project.featured;
        if (activeFilter === 'Web Apps') return project.tags.some(tag =>
            ['React', 'Next.js', 'JavaScript', 'TypeScript'].includes(tag));
        if (activeFilter === 'Mobile') return project.tags.includes('Flutter');
        if (activeFilter === 'AI/ML') return project.tags.some(tag =>
            ['OpenCV', 'AI/ML'].includes(tag));
        return true;
    });

    const getStatusColor = (status: Project['status']) => {
        switch (status) {
            case 'live': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
            case 'beta': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
            case 'coming-soon': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
            default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
        }
    };

    const getStatusText = (status: Project['status']) => {
        switch (status) {
            case 'live': return 'Live';
            case 'beta': return 'Beta';
            case 'coming-soon': return 'Coming Soon';
            default: return 'In Development';
        }
    };

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

                {/* Projects Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeFilter}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={`${project.title}-${activeFilter}`}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                onHoverStart={() => setHoveredProject(index)}
                                onHoverEnd={() => setHoveredProject(null)}
                                className={`group relative overflow-hidden rounded-2xl transition-all duration-500 ${project.featured
                                        ? 'bg-gradient-to-br from-gray-800/80 via-gray-800/50 to-purple-900/30'
                                        : 'bg-gray-800/50'
                                    } backdrop-blur-sm border border-gray-700/30 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10`}
                                style={{
                                    transform: hoveredProject === index && !prefersReducedMotion ? 'translateY(-8px)' : 'translateY(0)',
                                }}
                                itemScope
                                itemType="https://schema.org/CreativeWork"
                            >
                                {/* Featured Badge */}
                                {project.featured && (
                                    <div className="absolute top-4 left-4 z-20">
                                        <div className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xs font-bold text-white shadow-lg">
                                            ⭐ Featured
                                        </div>
                                    </div>
                                )}

                                {/* Status Badge */}
                                <div className="absolute top-4 right-4 z-20">
                                    <div className={`px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${getStatusColor(project.status)}`}>
                                        {getStatusText(project.status)}
                                    </div>
                                </div>

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

                                    {/* Hover Actions */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileHover={{ opacity: 1, scale: 1 }}
                                        className="absolute inset-0 flex items-center justify-center gap-4 z-10"
                                    >
                                        <motion.a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: prefersReducedMotion ? 1 : 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-6 py-3 bg-white/20 backdrop-blur-md rounded-xl font-medium text-white border border-white/20 hover:bg-white/30 transition-all flex items-center gap-2 shadow-lg"
                                            aria-label={`View ${project.title} live demo`}
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            View Live
                                        </motion.a>
                                    </motion.div>
                                </div>

                                {/* Content */}
                                <div className="p-6 space-y-4">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors leading-tight" itemProp="name">
                                            {project.title}
                                        </h3>
                                        <motion.a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: prefersReducedMotion ? 1 : 1.1, rotate: prefersReducedMotion ? 0 : 5 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="text-gray-400 hover:text-white p-2 hover:bg-gray-700/50 rounded-lg transition-all"
                                            aria-label={`GitHub repository for ${project.title}`}
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                        </motion.a>
                                    </div>

                                    <p className="text-gray-300 leading-relaxed" itemProp="description">
                                        {project.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag, tagIndex) => (
                                            <motion.span
                                                key={tagIndex}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.1 + index * 0.05 + tagIndex * 0.03 }}
                                                className="text-xs px-3 py-1.5 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full text-purple-300 border border-purple-500/20 hover:border-purple-400/40 hover:from-purple-500/20 hover:to-pink-500/20 transition-all backdrop-blur-sm"
                                            >
                                                {tag}
                                            </motion.span>
                                        ))}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3 pt-2">
                                        <motion.a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: prefersReducedMotion ? 1 : 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="flex-1 px-4 py-3 text-sm font-medium text-center text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-purple-500/25"
                                            aria-label={`Visit ${project.title}`}
                                        >
                                            <span>Explore Project</span>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </motion.a>
                                        <motion.a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: prefersReducedMotion ? 1 : 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="px-4 py-3 text-sm font-medium text-purple-400 border border-purple-500/30 rounded-xl hover:bg-purple-500/10 hover:border-purple-400/50 transition-all flex items-center justify-center backdrop-blur-sm"
                                            aria-label={`View ${project.title} source code`}
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                        </motion.a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>

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