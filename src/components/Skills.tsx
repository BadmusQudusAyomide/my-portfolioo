'use client';
import React, { useState, useEffect, useRef } from 'react';

interface Skill {
  name: string;
  level: number;
  category: string;
  color: string;
  description: string;
  years: number;
}

const skillsData: Skill[] = [
  { name: 'React', level: 90, category: 'Frontend', color: '#61DAFB', description: 'Building dynamic user interfaces', years: 4 },
  { name: 'JavaScript', level: 95, category: 'Frontend', color: '#F7DF1E', description: 'Core language mastery', years: 5 },
  { name: 'TypeScript', level: 85, category: 'Frontend', color: '#3178C6', description: 'Type-safe development', years: 3 },
  { name: 'Next.js', level: 88, category: 'Frontend', color: '#000000', description: 'Full-stack React framework', years: 2 },
  { name: 'CSS/SASS', level: 92, category: 'Frontend', color: '#CC6699', description: 'Advanced styling & animations', years: 5 },
  { name: 'Tailwind CSS', level: 88, category: 'Frontend', color: '#38BDF8', description: 'Utility-first CSS framework', years: 2 },

  { name: 'Node.js', level: 85, category: 'Backend', color: '#339933', description: 'Server-side JavaScript', years: 3 },
  { name: 'MongoDB', level: 75, category: 'Backend', color: '#47A248', description: 'NoSQL database design', years: 2 },

  { name: 'Figma', level: 90, category: 'Design', color: '#F24E1E', description: 'UI/UX design & prototyping', years: 4 },
  { name: 'Three.js', level: 70, category: 'Creative', color: '#000000', description: '3D web experiences', years: 1 },
];

const CreativeSkillCard: React.FC<{ skill: Skill; index: number; isVisible: boolean }> = ({
  skill,
  index,
  isVisible
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [animationDelay, setAnimationDelay] = useState(0);

  useEffect(() => {
    setAnimationDelay(index * 150);
  }, [index]);

  return (
    <div
      className={`relative group cursor-pointer transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      style={{ transitionDelay: `${animationDelay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hexagonal container */}
      <div className="relative w-48 h-48 mx-auto">
        {/* Background hexagon */}
        <div
          className="absolute inset-0 transition-all duration-500 transform hover:scale-110"
          style={{
            background: `linear-gradient(135deg, ${skill.color}20, ${skill.color}40)`,
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            filter: isHovered ? 'blur(0px)' : 'blur(1px)',
          }}
        />

        {/* Animated border */}
        <div
          className="absolute inset-1 transition-all duration-500"
          style={{
            background: `conic-gradient(from ${isHovered ? '360deg' : '0deg'}, ${skill.color}, transparent, ${skill.color})`,
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            animation: isHovered ? 'spin 3s linear infinite' : 'none',
          }}
        />

        {/* Inner content area */}
        <div
          className="absolute inset-3 bg-gray-900 flex flex-col items-center justify-center text-center p-4"
          style={{
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          }}
        >
          {/* Skill level visualization */}
          <div className="relative w-16 h-16 mb-2">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 64 64">
              <circle
                cx="32" cy="32" r="28"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="4"
              />
              <circle
                cx="32" cy="32" r="28"
                fill="none"
                stroke={skill.color}
                strokeWidth="4"
                strokeDasharray={`${(skill.level / 100) * 175.9} 175.9`}
                strokeLinecap="round"
                className="transition-all duration-1000"
                style={{
                  animation: isVisible ? 'draw-circle 2s ease-out forwards' : 'none',
                  animationDelay: `${animationDelay + 500}ms`,
                }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-white">{skill.level}%</span>
            </div>
          </div>

          <h3 className="text-sm font-bold text-white mb-1">{skill.name}</h3>
          <p className="text-xs text-gray-400 text-center leading-tight">
            {skill.description}
          </p>
          <div className="text-xs text-gray-500 mt-1">
            {skill.years} year{skill.years > 1 ? 's' : ''}
          </div>
        </div>

        {/* Floating particles */}
        {isHovered && (
          <>
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full animate-ping"
                style={{
                  backgroundColor: skill.color,
                  top: `${20 + i * 10}%`,
                  left: `${10 + i * 15}%`,
                  animationDelay: `${i * 200}ms`,
                  animationDuration: '1.5s',
                }}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

const SkillConstellation: React.FC<{ skills: Skill[] }> = ({ skills }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      size: number;
    }> = [];

    // Create particles based on skills
    skills.forEach((skill) => {
      for (let i = 0; i < Math.floor(skill.level / 10); i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          color: skill.color,
          size: Math.random() * 2 + 1,
        });
      }
    });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x <= 0 || particle.x >= canvas.width) particle.vx *= -1;
        if (particle.y <= 0 || particle.y >= canvas.height) particle.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + '40';
        ctx.fill();

        // Connect nearby particles
        particles.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = particle.color + '20';
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, [skills]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default function CreativeSkillsPortfolio() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  const [activeView, setActiveView] = useState<'hexagon' | 'radar' | 'timeline'>('hexagon');

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const categories = ['all', 'Frontend', 'Backend', 'Design', 'Creative'];

  const filteredSkills = selectedCategory === 'all'
    ? skillsData
    : skillsData.filter(skill => skill.category === selectedCategory);

  const RadarChart: React.FC = () => {
    const centerX = 150;
    const centerY = 150;
    const radius = 120;

    const categoryLevels = categories.slice(1).map(cat => {
      const categorySkills = skillsData.filter(s => s.category === cat);
      const avgLevel = categorySkills.reduce((acc, s) => acc + s.level, 0) / categorySkills.length || 0;
      return { category: cat, level: avgLevel };
    });

    return (
      <div className="bg-gray-900 rounded-2xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 text-center">Skill Radar</h3>
        <svg width="300" height="300" className="mx-auto">
          {/* Grid circles */}
          {[20, 40, 60, 80, 100].map(percent => (
            <circle
              key={percent}
              cx={centerX} cy={centerY}
              r={radius * (percent / 100)}
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />
          ))}

          {/* Axis lines */}
          {categoryLevels.map((_, index) => {
            const angle = (index * 2 * Math.PI) / categoryLevels.length - Math.PI / 2;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            return (
              <line
                key={index}
                x1={centerX} y1={centerY}
                x2={x} y2={y}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1"
              />
            );
          })}

          {/* Data polygon */}
          <polygon
            points={categoryLevels.map((cat, index) => {
              const angle = (index * 2 * Math.PI) / categoryLevels.length - Math.PI / 2;
              const distance = radius * (cat.level / 100);
              const x = centerX + Math.cos(angle) * distance;
              const y = centerY + Math.sin(angle) * distance;
              return `${x},${y}`;
            }).join(' ')}
            fill="rgba(99, 102, 241, 0.3)"
            stroke="rgb(99, 102, 241)"
            strokeWidth="2"
          />

          {/* Category labels */}
          {categoryLevels.map((cat, index) => {
            const angle = (index * 2 * Math.PI) / categoryLevels.length - Math.PI / 2;
            const x = centerX + Math.cos(angle) * (radius + 20);
            const y = centerY + Math.sin(angle) * (radius + 20);
            return (
              <text
                key={cat.category}
                x={x} y={y}
                textAnchor="middle"
                fill="white"
                fontSize="12"
                fontWeight="bold"
              >
                {cat.category}
              </text>
            );
          })}
        </svg>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black relative overflow-hidden">
      {/* Animated background constellation */}
      <SkillConstellation skills={skillsData} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Creative header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            SKILLS
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Crafting digital experiences through code, design, and innovation
          </p>
        </div>

        {/* Creative controls */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-12 gap-6">

          {/* View selector */}
          <div className="flex bg-gray-800/50 backdrop-blur-sm rounded-full p-2 border border-gray-700">
            {([
              { id: 'hexagon', icon: '⬡', label: 'Hexagon' },
              { id: 'radar', icon: '📡', label: 'Radar' },
              { id: 'timeline', icon: '📈', label: 'Timeline' }
            ] as const).map(view => (
              <button
                key={view.id}
                onClick={() => setActiveView(view.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeView === view.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white'
                  }`}
              >
                <span className="mr-2">{view.icon}</span>
                {view.label}
              </button>
            ))}
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${selectedCategory === category
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-purple-500/25'
                    : 'bg-gray-800/50 text-gray-300 hover:text-white border border-gray-700'
                  }`}
              >
                {category === 'all' ? '✨ All' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Skills display based on active view */}
        {activeView === 'hexagon' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
            {filteredSkills.map((skill, index) => (
              <CreativeSkillCard
                key={skill.name}
                skill={skill}
                index={index}
                isVisible={isVisible}
              />
            ))}
          </div>
        )}

        {activeView === 'radar' && (
          <div className="flex justify-center">
            <RadarChart />
          </div>
        )}

        {activeView === 'timeline' && (
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-400 to-purple-500"></div>

              {filteredSkills.map((skill, index) => (
                <div key={skill.name} className={`relative flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'} mb-12`}>
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300">
                      <h3 className="text-xl font-bold text-white mb-2">{skill.name}</h3>
                      <p className="text-gray-300 mb-3">{skill.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="w-full bg-gray-700 rounded-full h-2 mr-4">
                          <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{
                              width: `${skill.level}%`,
                              backgroundColor: skill.color
                            }}
                          />
                        </div>
                        <span className="text-sm text-gray-400 whitespace-nowrap">{skill.level}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div
                    className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 border-gray-900"
                    style={{ backgroundColor: skill.color }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes draw-circle {
          from { stroke-dasharray: 0 175.9; }
          to { stroke-dasharray: var(--target-dash) 175.9; }
        }
      `}</style>
    </div>
  );
}