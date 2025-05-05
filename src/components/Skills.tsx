'use client';
import { motion } from 'framer-motion';

const skills = [
  {
    category: 'Frontend',
    items: [
      { name: 'HTML/CSS', level: 90 },
      { name: 'JavaScript', level: 85 },
      { name: 'React', level: 80 },
      { name: 'Next.js', level: 75 },
      { name: 'Tailwind CSS', level: 85 },
    ]
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js', level: 70 },
      { name: 'Express', level: 65 },
      { name: 'MongoDB', level: 60 },
      { name: 'REST APIs', level: 75 },
    ]
  },
  {
    category: 'Tools',
    items: [
      { name: 'Git', level: 80 },
      { name: 'Webpack', level: 65 },
      { name: 'Figma', level: 70 },
      { name: 'VS Code', level: 85 },
    ]
  }
];

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
            These are the technologies and tools I work with to bring ideas to life.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skills.map((skillCategory, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.2, duration: 0.6 }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6"
            >
              <h3 className="text-2xl font-bold mb-6 text-center text-purple-400">
                {skillCategory.category}
              </h3>
              <div className="space-y-6">
                {skillCategory.items.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: (categoryIndex * 0.2) + (skillIndex * 0.1), duration: 0.5 }}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-200 font-medium">{skill.name}</span>
                      <span className="text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: (categoryIndex * 0.2) + (skillIndex * 0.1) + 0.3, duration: 0.8, ease: "easeOut" }}
                        className="h-2.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                      ></motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}