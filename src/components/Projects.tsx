"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type Project = {
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  github: string;
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
      "A platform for submitting daily coding challenges with a leaderboard.",
    tags: ["React", "Node js", "Mongo DB", "Express js"],
    image: projectImages[0],
    link: "https://30-day-code-w46x.vercel.app",
    github: "https://github.com/BadmusQudusAyomide/30-day-code",
  },
  {
    title: "Smart Gpa",
    description:
      "A GPA calculator with a smart algorithm to suggest course combinations and track it for the whole school years.",
    tags: ["Flutter", "LocalStorage"],
    image: projectImages[1],
    link: "#",
    github: "https://github.com/BadmusQudusAyomide/smartgpa",
  },
  {
    title: "Student Attendance System",
    description:
      "A Student Attendance website With Geolocation and Face Recognition",
    tags: ["Php", "Open Cv", "Javascript"],
    image: projectImages[2],
    link: "#",
    github: "https://github.com/BadmusQudusAyomide/ilarostudentattendance",
  },
  {
    title: "Weather Dashboard",
    description: "Real-time weather data visualization with interactive maps.",
    tags: ["React", "API", "Chart.js"],
    image: projectImages[3],
    link: "#",
    github: "#",
  },
  {
    title: "Portfolio Website",
    description:
      "A clean portfolio built with Next.js and Tailwind CSS with advanced animations.",
    tags: ["Next.js", "Tailwind", "Framer Motion"],
    image: projectImages[4],
    link: "https://badmusqudusay.vercel.app/",
    github: "https://github.com/BadmusQudusAyomide/my-portfolioo",
  },
];

export default function Projects({
  prefersReducedMotion,
}: {
  prefersReducedMotion: boolean;
}) {
  return (
    <section id="projects" className="py-20 relative overflow-hidden" aria-label="My projects">
      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            My Projects
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Here are some of my recent works that showcase my skills and expertise.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={prefersReducedMotion ? {} : { y: -10 }}
              className="group relative overflow-hidden rounded-xl bg-gray-800 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300"
              itemScope
              itemType="https://schema.org/CreativeWork"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image}
                  alt={`Screenshot of ${project.title}`}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="transition-transform duration-500 group-hover:scale-105"
                  loading={index < 2 ? "eager" : "lazy"}
                />

                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center z-20"
                >
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-medium flex items-center gap-2 shadow-lg"
                    aria-label={`View ${project.title} live demo`}
                  >
                    <span>Live Preview</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </motion.a>
                </motion.div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-100 group-hover:text-purple-400 transition-colors" itemProp="name">
                    {project.title}
                  </h3>
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: prefersReducedMotion ? 0 : -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-gray-400 hover:text-white p-2"
                    aria-label={`GitHub repository for ${project.title}`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </motion.a>
                </div>

                <p className="text-gray-400 mb-4 min-h-[60px]" itemProp="description">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <motion.span
                      key={tagIndex}
                      initial={{ scale: 0.9 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + index * 0.05 + tagIndex * 0.03 }}
                      className="text-xs px-3 py-1 bg-gray-700/50 rounded-full text-purple-300 border border-gray-600/50 hover:bg-purple-500/10 hover:border-purple-500/30 transition-all"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 px-4 py-2 text-sm font-medium text-center text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2"
                    aria-label={`Visit ${project.title}`}
                  >
                    <span>Visit Project</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </motion.a>
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 text-sm font-medium text-purple-400 border border-purple-400 rounded-lg hover:bg-purple-400/10 transition-colors flex items-center justify-center"
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
        </div>
      </div>
    </section>
  );
}
