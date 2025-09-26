import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { GithubLogo, ArrowSquareOut } from "phosphor-react";

interface ProjectData {
    title: string;
    description: string;
    image: string;
    technologies: string[];
    liveUrl?: string;
    githubUrl?: string;
    slug?: string | null;
    featured?: boolean;
}

interface ProjectCardProps {
    project: ProjectData;
    index: number;
    prefersReducedMotion: boolean;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
    return (
        <>
            {/* Image Container */}
            <div className="relative h-56 overflow-hidden rounded-t-xl">
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
                
                {/* Featured Badge */}
                {project.featured && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xs font-medium">
                        Featured
                    </div>
                )}
            </div>

            {/* Project info */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-b-xl p-6">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-100 group-hover:text-purple-400 transition-colors">
                        {project.title}
                    </h3>
                    {/* Only show icon links for legacy projects (no slug) */}
                    {!project.slug && (
                        <div className="flex gap-2">
                            {project.githubUrl && project.githubUrl !== "#" && (
                                <motion.a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="text-gray-400 hover:text-white p-1"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <GithubLogo className="w-5 h-5" weight="bold" />
                                </motion.a>
                            )}
                            {project.liveUrl && project.liveUrl !== "#" && (
                                <motion.a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="text-gray-400 hover:text-white p-1"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <ArrowSquareOut className="w-5 h-5" weight="bold" />
                                </motion.a>
                            )}
                        </div>
                    )}
                </div>
                <p className="text-gray-400 mb-4 line-clamp-3">
                    {project.description}
                </p>

                <div className="mt-2 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <span
                            key={techIndex}
                            className="text-xs px-3 py-1 bg-gray-700/50 rounded-full text-purple-300 border border-gray-600/50"
                        >
                            {tech}
                        </span>
                    ))}
                    {project.technologies.length > 3 && (
                        <span className="text-xs px-3 py-1 bg-gray-700/50 rounded-full text-gray-400 border border-gray-600/50">
                            +{project.technologies.length - 3} more
                        </span>
                    )}
                </div>

                <div className="mt-5 flex gap-3">
                    {project.slug ? (
                        <div className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-sm font-medium flex items-center gap-2 shadow-lg">
                            <span>View Case Study</span>
                            <ArrowSquareOut className="w-4 h-4" weight="bold" />
                        </div>
                    ) : (
                        <>
                            {project.liveUrl && project.liveUrl !== "#" && (
                                <motion.a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.03, y: -1 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-sm font-medium flex items-center gap-2 shadow-lg"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <span>Live Preview</span>
                                    <ArrowSquareOut className="w-4 h-4" weight="bold" />
                                </motion.a>
                            )}
                            {project.githubUrl && project.githubUrl !== "#" && (
                                <motion.a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.03, y: -1 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="px-4 py-2 text-purple-400 border border-purple-400 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-purple-400/10 transition-colors"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <span>GitHub</span>
                                    <GithubLogo className="w-4 h-4" weight="bold" />
                                </motion.a>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
}