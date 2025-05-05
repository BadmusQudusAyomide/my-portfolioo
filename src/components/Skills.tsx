// components/Skills.tsx
'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const skills = [
  {
    category: 'Frontend Development',
    items: [
      { name: 'React', level: 90, icon: 'react' },
      { name: 'Next.js', level: 85, icon: 'nextjs' },
      { name: 'TypeScript', level: 80, icon: 'typescript' },
      { name: 'JavaScript', level: 95, icon: 'javascript' },
      { name: 'HTML/CSS', level: 95, icon: 'html' },
      { name: 'Tailwind CSS', level: 90, icon: 'tailwind' },
    ]
  },
  {
    category: 'Backend Development',
    items: [
      { name: 'Node.js', level: 75, icon: 'nodejs' },
      { name: 'Express', level: 70, icon: 'express' },
      { name: 'MongoDB', level: 65, icon: 'mongodb' },
      { name: 'Firebase', level: 60, icon: 'firebase' },
    ]
  },
  {
    category: 'Tools & Other',
    items: [
      { name: 'Git', level: 85, icon: 'git' },
      { name: 'Figma', level: 70, icon: 'figma' },
      { name: 'Docker', level: 50, icon: 'docker' },
      { name: 'Jest', level: 65, icon: 'jest' },
    ]
  }
];

const iconMap: Record<string, string> = {
  react: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  nextjs: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  typescript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  javascript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  html: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  tailwind: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
  nodejs: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  express: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  mongodb: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  firebase: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
  git: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  figma: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
  docker: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  jest: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg'
};

export default function Skills() {
  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent inline-block">
            My Skills
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Technologies and tools I work with on a daily basis.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skills.map((skillCategory, index) => (
            <motion.div
              key={skillCategory.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
            >
              <h3 className="text-xl font-bold text-purple-400 mb-6">{skillCategory.category}</h3>
              <div className="space-y-6">
                {skillCategory.items.map((skill) => (
                  <motion.div
                    key={skill.name}
                    whileHover={{ scale: 1.02 }}
                    className="group"
                  >
                    <div className="flex items-center mb-2">
                      {iconMap[skill.icon] && (
                        <div className="w-8 h-8 mr-3 relative">
                          <Image
                            src={iconMap[skill.icon]}
                            alt={skill.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                      <span className="text-gray-200 font-medium">{skill.name}</span>
                      <span className="ml-auto text-purple-300 text-sm font-mono">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.2 }}
                        className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
        >
          <h3 className="text-xl font-bold text-purple-400 mb-6">Other Proficiencies</h3>
          <div className="flex flex-wrap gap-3">
            {[
              'Responsive Design', 'UI/UX Principles', 'RESTful APIs', 
              'GraphQL', 'Web Performance', 'Accessibility', 
              'Agile Methodologies', 'CI/CD', 'Testing'
            ].map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -3 }}
                className="px-4 py-2 bg-gray-700/50 rounded-full text-sm text-gray-200 border border-gray-600/50"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}