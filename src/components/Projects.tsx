"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { GithubLogo, ArrowSquareOut } from "phosphor-react";
import { client, projectsQuery, urlFor } from "@/lib/sanity";
import { Project as SanityProject } from "@/types/project";
import ProjectCard from "./ProjectCard";

// Legacy type for fallback data
type LegacyProject = {
    title: string;
    description: string;
    tags: string[];
    image: string;
    link: string;
    github: string;
    featured?: boolean;
};

// Fallback projects data (in case Sanity is not available)
const fallbackProjects: LegacyProject[] = [
    {
        title: "Social Media Mesh",
        description:
            "A modern social platform with authentication, posts, likes, comments, and profiles. Backend built with Node.js, Express, and MongoDB using secure JWT auth and RESTful APIs. Clean architecture with a focus on scalability and developer ergonomics.",
        tags: ["Node.js", "Express", "MongoDB", "JWT", "REST"],
        image: "/projects/mesh.svg",
        link: "https://mesh-blush.vercel.app/",
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
    const [projects, setProjects] = useState<(SanityProject | LegacyProject)[]>(fallbackProjects);
    const [isLoading, setIsLoading] = useState(true);
    const [usingSanity, setUsingSanity] = useState(false);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                // Check if Sanity environment variables are available
                if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_DATASET) {
                    const sanityProjects = await client.fetch(projectsQuery);
                    if (sanityProjects && sanityProjects.length > 0) {
                        setProjects(sanityProjects);
                        setUsingSanity(true);
                    }
                }
            } catch (error) {
                console.log('Falling back to static projects data');
                // Keep fallback projects
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const filteredProjects = projects.filter(project => {
        if (activeFilter === 'All') return true;
        if (activeFilter === 'Featured') return !!(project as any).featured;
        
        // Handle both Sanity and legacy project structures
        if (usingSanity) {
            const sanityProject = project as SanityProject;
            if (activeFilter === 'Web Apps') return sanityProject.category === 'web';
            if (activeFilter === 'Mobile') return sanityProject.category === 'mobile';
        } else {
            const legacyProject = project as LegacyProject;
            if (activeFilter === 'Web Apps') return legacyProject.tags.some(tag =>
                ['React', 'Next.js', 'JavaScript', 'TypeScript'].includes(tag));
            if (activeFilter === 'Mobile') return legacyProject.tags.includes('Flutter');
        }
        
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
                    {filteredProjects.map((project, index) => {
                        // Handle both Sanity and legacy project structures
                        const isSanityProject = usingSanity && 'slug' in project;
                        const sanityProject = project as SanityProject;
                        const legacyProject = project as LegacyProject;
                        
                        // Build a safe image URL (fallback if Sanity heroImage is missing)
                        const heroUrl = (isSanityProject && sanityProject.heroImage)
                            ? urlFor(sanityProject.heroImage).width(600).height(400).url()
                            : null;

                        const projectData = {
                            title: project.title,
                            description: isSanityProject ? (sanityProject.summary || '') : legacyProject.description,
                            image: isSanityProject 
                                ? (heroUrl ?? '/placeholder-project.svg')
                                : (legacyProject.image || '/placeholder-project.svg'),
                            technologies: isSanityProject ? (sanityProject.technologies || []) : (legacyProject.tags || []),
                            liveUrl: isSanityProject ? sanityProject.liveUrl : legacyProject.link,
                            githubUrl: isSanityProject ? sanityProject.githubUrl : legacyProject.github,
                            slug: isSanityProject ? sanityProject.slug.current : null,
                            featured: isSanityProject ? sanityProject.featured : legacyProject.featured
                        };

                        return (
                            <motion.div
                                key={isSanityProject ? sanityProject._id : index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                whileHover={prefersReducedMotion ? {} : { y: -10 }}
                                className="group relative cursor-pointer"
                            >
                                {/* Wrap in Link if it's a Sanity project */}
                                {projectData.slug ? (
                                    <Link href={`/projects/${projectData.slug}`}>
                                        <ProjectCard 
                                            project={projectData} 
                                            index={index} 
                                            prefersReducedMotion={prefersReducedMotion}
                                        />
                                    </Link>
                                ) : (
                                    <ProjectCard 
                                        project={projectData} 
                                        index={index} 
                                        prefersReducedMotion={prefersReducedMotion}
                                    />
                                )}
                            </motion.div>
                        );
                    })}
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
                        Want to see more detailed case studies?
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/projects"
                            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-medium text-white hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-purple-500/25"
                        >
                            View All Projects
                        </Link>
                        <motion.a
                            href="#contact"
                            whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-8 py-4 border border-purple-400/70 text-purple-300 rounded-full font-medium hover:bg-purple-400/10 transition-all"
                        >
                            Get In Touch
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}