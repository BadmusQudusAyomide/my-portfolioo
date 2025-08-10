import React, { useState, useEffect, useRef } from 'react';

type Skill = {
  name: string;
  x: number;
  y: number;
  z: number;
  level: number;
  type: 'frontend' | 'backend' | 'tools';
  color: string; // hex color like '#61DAFB'
  connections: string[]; // names of connected skills
};

const skillsData: Skill[] = [
  // Frontend Constellation
  { name: 'React', x: 20, y: 30, z: 50, level: 90, type: 'frontend', color: '#61DAFB', connections: ['JavaScript', 'HTML/CSS'] },
  { name: 'JavaScript', x: 45, y: 25, z: 40, level: 95, type: 'frontend', color: '#F7DF1E', connections: ['React', 'Node.js'] },
  { name: 'HTML/CSS', x: 15, y: 60, z: 30, level: 98, type: 'frontend', color: '#E34F26', connections: ['React', 'Tailwind'] },
  { name: 'Next.js', x: 35, y: 15, z: 60, level: 85, type: 'frontend', color: '#000000', connections: ['React'] },
  { name: 'Tailwind', x: 25, y: 75, z: 45, level: 90, type: 'frontend', color: '#06B6D4', connections: ['HTML/CSS'] },

  // Backend Constellation
  { name: 'Node.js', x: 75, y: 40, z: 35, level: 85, type: 'backend', color: '#339933', connections: ['JavaScript', 'Express', 'MongoDB'] },
  { name: 'Express', x: 85, y: 25, z: 50, level: 80, type: 'backend', color: '#000000', connections: ['Node.js'] },
  { name: 'MongoDB', x: 65, y: 65, z: 25, level: 75, type: 'backend', color: '#47A248', connections: ['Node.js'] },
  { name: 'REST APIs', x: 90, y: 55, z: 40, level: 88, type: 'backend', color: '#FF6B35', connections: ['Express'] },

  // Tools Constellation
  { name: 'Git', x: 50, y: 85, z: 70, level: 92, type: 'tools', color: '#F05032', connections: ['VS Code'] },
  { name: 'VS Code', x: 60, y: 90, z: 55, level: 95, type: 'tools', color: '#007ACC', connections: ['Git'] },
  { name: 'Figma', x: 80, y: 80, z: 65, level: 85, type: 'tools', color: '#F24E1E', connections: [] },
  { name: 'Webpack', x: 40, y: 70, z: 80, level: 70, type: 'tools', color: '#8DD6F9', connections: [] }
];

type SkillOrbProps = {
  skill: Skill;
  index: number;
  hoveredSkill: string | null;
  setHoveredSkill: React.Dispatch<React.SetStateAction<string | null>>;
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  reduceMotion: boolean;
};

const SkillOrb = ({ skill, index, hoveredSkill, setHoveredSkill, mouseRef, reduceMotion }: SkillOrbProps) => {
  const orbRef = useRef<HTMLDivElement | null>(null);
  const centerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!orbRef.current) return;

    const computeCenter = () => {
      if (!orbRef.current) return;
      const rect = orbRef.current.getBoundingClientRect();
      centerRef.current = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
    };

    // Initial center and on resize
    computeCenter();
    window.addEventListener('resize', computeCenter);

    const animate = () => {
      if (!orbRef.current) return;
      const base = `translate(-50%, -50%) translateZ(${skill.z}px)`;

      if (reduceMotion) {
        orbRef.current.style.transform = `${base} scale(${hoveredSkill === skill.name ? 1.2 : 1})`;
      } else {
        const { x: cx, y: cy } = centerRef.current;
        const { x: mx, y: my } = mouseRef.current;
        const deltaX = (mx - cx) * 0.06; // reduced sensitivity
        const deltaY = (my - cy) * 0.06;
        const rotX = deltaY;
        const rotY = deltaX;
        const scale = hoveredSkill === skill.name ? 1.3 : 1.08;
        orbRef.current.style.transform = `${base} rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`;
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', computeCenter);
    };
  }, [hoveredSkill, reduceMotion, skill.name, skill.z, mouseRef]);

  const isHovered = hoveredSkill === skill.name;
  const isConnected = hoveredSkill && skill.connections.includes(hoveredSkill);
  const shouldGlow = isHovered || isConnected;

  const orbSize = 60 + (skill.level * 0.5);
  const glowIntensity = shouldGlow ? 22 : 8; // slightly reduced for performance

  return (
    <div
      ref={orbRef}
      className="absolute cursor-pointer transition-all duration-500 ease-out will-change-transform"
      style={{
        left: `${skill.x}%`,
        top: `${skill.y}%`,
        zIndex: isHovered ? 1000 : skill.z,
        animation: `float-${index} 6s ease-in-out infinite`,
        animationDelay: `${index * 0.5}s`
      }}
      onMouseEnter={() => setHoveredSkill(skill.name)}
      onMouseLeave={() => setHoveredSkill(null)}
    >
      {/* Orb glow effect */}
      <div
        className="absolute inset-0 rounded-full blur-xl opacity-60 transition-all duration-300"
        style={{
          width: orbSize + glowIntensity,
          height: orbSize + glowIntensity,
          backgroundColor: skill.color,
          transform: 'translate(-50%, -50%)',
          left: '50%',
          top: '50%',
        }}
      />

      {/* Main orb */}
      <div
        className="relative rounded-full border-2 backdrop-blur-sm transition-all duration-300 flex items-center justify-center"
        style={{
          width: orbSize,
          height: orbSize,
          backgroundColor: `${skill.color}15`,
          borderColor: skill.color,
          boxShadow: `
            inset 0 0 16px ${skill.color}33,
            0 0 14px ${skill.color}55,
            0 0 ${glowIntensity}px ${skill.color}66
          `
        }}
      >
        {/* Inner energy core */}
        <div
          className="absolute rounded-full animate-pulse"
          style={{
            width: '30%',
            height: '30%',
            backgroundColor: skill.color,
            boxShadow: `0 0 10px ${skill.color}`
          }}
        />

        {/* Skill level ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            fill="none"
            stroke={`${skill.color}40`}
            strokeWidth="2"
          />
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            fill="none"
            stroke={skill.color}
            strokeWidth="3"
            strokeDasharray={`${2 * Math.PI * (orbSize * 0.45)}`}
            strokeDashoffset={`${2 * Math.PI * (orbSize * 0.45) * (1 - skill.level / 100)}`}
            className="transition-all duration-1000 ease-out"
            style={{
              filter: `drop-shadow(0 0 3px ${skill.color})`
            }}
          />
        </svg>
      </div>

      {/* Skill label */}
      <div
        className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-4 transition-all duration-300 ${isHovered ? 'opacity-100 scale-110' : 'opacity-70'
          }`}
      >
        <div
          className="px-3 py-1 rounded-full text-sm font-bold text-white backdrop-blur-sm border"
          style={{
            backgroundColor: `${skill.color}20`,
            borderColor: skill.color,
            boxShadow: `0 0 10px ${skill.color}40`
          }}
        >
          {skill.name}
        </div>
        <div className="text-center text-xs text-gray-400 mt-1">
          {skill.level}%
        </div>
      </div>
    </div>
  );
};

type NeuralConnectionProps = { from: string; to: string; isActive: boolean };

const NeuralConnection = ({ from, to, isActive }: NeuralConnectionProps) => {
  const fromSkill = skillsData.find((s) => s.name === from);
  const toSkill = skillsData.find((s) => s.name === to);

  if (!fromSkill || !toSkill) return null;

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
      <defs>
        <linearGradient id={`gradient-${from}-${to}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: fromSkill.color, stopOpacity: isActive ? 0.8 : 0.3 }} />
          <stop offset="100%" style={{ stopColor: toSkill.color, stopOpacity: isActive ? 0.8 : 0.3 }} />
        </linearGradient>
      </defs>
      <line
        x1={`${fromSkill.x}%`}
        y1={`${fromSkill.y}%`}
        x2={`${toSkill.x}%`}
        y2={`${toSkill.y}%`}
        stroke={`url(#gradient-${from}-${to})`}
        strokeWidth={isActive ? 3 : 1}
        strokeDasharray={isActive ? "none" : "5,5"}
        className="transition-all duration-500"
        style={{
          filter: isActive ? `drop-shadow(0 0 5px ${fromSkill.color})` : 'none'
        }}
      />

      {/* Animated energy pulse */}
      {isActive && (
        <circle r="3" fill={fromSkill.color}>
          <animateMotion dur="2s" repeatCount="indefinite">
            <mpath xlinkHref={`#path-${from}-${to}`} />
          </animateMotion>
        </circle>
      )}

      <path
        id={`path-${from}-${to}`}
        d={`M ${fromSkill.x}% ${fromSkill.y}% L ${toSkill.x}% ${toSkill.y}%`}
        fill="none"
        opacity="0"
      />
    </svg>
  );
};

export default function NeuralNetworkSkills() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [selectedType, setSelectedType] = useState<'all' | 'frontend' | 'backend' | 'tools'>('all');
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  // Generate floating animations
  useEffect(() => {
    const style = document.createElement('style');
    let keyframes = '';

    skillsData.forEach((_, index) => {
      keyframes += `
        @keyframes float-${index} {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px) translateZ(${skillsData[index].z}px); }
          50% { transform: translate(-50%, -50%) translateY(${-10 - (index % 3) * 5}px) translateZ(${skillsData[index].z + 20}px); }
        }
      `;
    });

    style.textContent = keyframes;
    document.head.appendChild(style);

    return () => document.head.removeChild(style);
  }, []);

  const filteredSkills = selectedType === 'all'
    ? skillsData
    : skillsData.filter(skill => skill.type === selectedType);

  const activeConnections = hoveredSkill
    ? skillsData.find(s => s.name === hoveredSkill)?.connections || []
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: reduceMotion ? 'none' : 'grid-move 20s linear infinite'
        }} />
      </div>

      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>

      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-7xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            NEURAL SKILLS
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Interactive constellation of my technical expertise
          </p>

          {/* Type filters */}
          <div className="flex justify-center space-x-4">
            {['all', 'frontend', 'backend', 'tools'].map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${selectedType === type
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-gray-800 text-gray-400 hover:text-white'
                  }`}
              >
                {type.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Skills Constellation */}
        <div
          className="relative mx-auto"
          style={{
            height: '600px',
            maxWidth: '1200px',
            perspective: '1000px',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Neural connections - only for hovered skill */}
          {hoveredSkill && (
            (skillsData.find(s => s.name === hoveredSkill)?.connections || []).map(connection => (
              <NeuralConnection
                key={`${hoveredSkill}-${connection}`}
                from={hoveredSkill}
                to={connection}
                isActive={true}
              />
            ))
          )}

          {/* Skill orbs */}
          {filteredSkills.map((skill, index) => (
            <SkillOrb
              key={skill.name}
              skill={skill}
              index={index}
              hoveredSkill={hoveredSkill}
              setHoveredSkill={setHoveredSkill}
              mouseRef={mouseRef}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>

        {/* Skill details panel */}
        {hoveredSkill && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-black/80 backdrop-blur-md rounded-2xl p-6 border border-purple-500/30 min-w-80">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">{hoveredSkill}</h3>
                <div className="flex justify-center space-x-4 text-sm text-gray-400">
                  <span>Level: {skillsData.find(s => s.name === hoveredSkill)?.level}%</span>
                  <span>Connections: {activeConnections.length}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}