import React, { useState, useEffect, useRef, useMemo } from 'react';

const skillsData = [
  { name: 'React', x: 20, y: 30, level: 90, type: 'frontend', color: '#61DAFB', connections: ['JavaScript', 'HTML/CSS'], magnetism: 0.8 },
  { name: 'JavaScript', x: 45, y: 25, level: 95, type: 'frontend', color: '#F7DF1E', connections: ['React', 'Node.js'], magnetism: 1.0 },
  { name: 'HTML/CSS', x: 15, y: 60, level: 98, type: 'frontend', color: '#E34F26', connections: ['React', 'Tailwind'], magnetism: 0.9 },
  { name: 'Next.js', x: 35, y: 15, level: 85, type: 'frontend', color: '#000000', connections: ['React'], magnetism: 0.7 },
  { name: 'Tailwind', x: 25, y: 75, level: 90, type: 'frontend', color: '#06B6D4', connections: ['HTML/CSS'], magnetism: 0.6 },

  { name: 'Node.js', x: 75, y: 40, level: 85, type: 'backend', color: '#339933', connections: ['JavaScript', 'Express'], magnetism: 0.8 },
  { name: 'Express', x: 85, y: 25, level: 80, type: 'backend', color: '#68217A', connections: ['Node.js'], magnetism: 0.7 },
  { name: 'MongoDB', x: 65, y: 65, level: 75, type: 'backend', color: '#47A248', connections: ['Node.js'], magnetism: 0.6 },
  { name: 'REST APIs', x: 90, y: 55, level: 88, type: 'backend', color: '#FF6B35', connections: ['Express'], magnetism: 0.5 },

  { name: 'Git', x: 50, y: 85, level: 92, type: 'tools', color: '#F05032', connections: ['VS Code'], magnetism: 0.7 },
  { name: 'VS Code', x: 60, y: 90, level: 95, type: 'tools', color: '#007ACC', connections: ['Git'], magnetism: 0.8 },
  { name: 'Figma', x: 80, y: 80, level: 85, type: 'tools', color: '#F24E1E', connections: [], magnetism: 0.6 },
  { name: 'Webpack', x: 40, y: 70, level: 70, type: 'tools', color: '#8DD6F9', connections: [], magnetism: 0.5 }
];

const MagneticOrb = React.memo(({ skill, index, hoveredSkill, setHoveredSkill, mousePos, containerRect }) => {
  const orbRef = useRef(null);
  const [orbPos, setOrbPos] = useState({ x: skill.x, y: skill.y });
  const [isFloating, setIsFloating] = useState(true);

  // Calculate magnetic attraction to cursor
  useEffect(() => {
    if (!mousePos || !containerRect) return;

    const orbElement = orbRef.current;
    if (!orbElement) return;

    const orbRect = orbElement.getBoundingClientRect();
    const orbCenterX = orbRect.left + orbRect.width / 2;
    const orbCenterY = orbRect.top + orbRect.height / 2;

    const distance = Math.sqrt(
      Math.pow(mousePos.x - orbCenterX, 2) + Math.pow(mousePos.y - orbCenterY, 2)
    );

    // Magnetic attraction within 150px
    if (distance < 150) {
      const pullStrength = (150 - distance) / 150 * skill.magnetism * 0.3;
      const angle = Math.atan2(mousePos.y - orbCenterY, mousePos.x - orbCenterX);

      const newX = skill.x + (Math.cos(angle) * pullStrength * 5);
      const newY = skill.y + (Math.sin(angle) * pullStrength * 5);

      setOrbPos({ x: newX, y: newY });
      setIsFloating(false);
    } else {
      // Return to original position
      setOrbPos({ x: skill.x, y: skill.y });
      setIsFloating(true);
    }
  }, [mousePos, containerRect, skill.x, skill.y, skill.magnetism]);

  const isHovered = hoveredSkill === skill.name;
  const isConnected = hoveredSkill && skill.connections.includes(hoveredSkill);
  const shouldGlow = isHovered || isConnected;
  const orbSize = 50 + (skill.level * 0.4);

  return (
    <div
      ref={orbRef}
      className="absolute cursor-pointer will-change-transform"
      style={{
        left: `${orbPos.x}%`,
        top: `${orbPos.y}%`,
        transform: `translate(-50%, -50%) scale(${isHovered ? 1.4 : shouldGlow ? 1.2 : 1})`,
        zIndex: isHovered ? 1000 : 100 + skill.level,
        transition: isFloating ? 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)' : 'transform 0.3s ease-out',
      }}
      onMouseEnter={() => setHoveredSkill(skill.name)}
      onMouseLeave={() => setHoveredSkill(null)}
    >
      {/* Always visible pulsing glow */}
      <div
        className="absolute inset-0 rounded-full animate-pulse"
        style={{
          width: orbSize + 40,
          height: orbSize + 40,
          background: `radial-gradient(circle, ${skill.color}40 0%, ${skill.color}20 40%, transparent 70%)`,
          transform: 'translate(-50%, -50%)',
          left: '50%',
          top: '50%',
          animationDuration: `${2 + index * 0.2}s`,
        }}
      />

      {/* Intense hover glow */}
      {shouldGlow && (
        <div
          className="absolute inset-0 rounded-full animate-ping"
          style={{
            width: orbSize + 60,
            height: orbSize + 60,
            background: `radial-gradient(circle, ${skill.color}60 0%, transparent 70%)`,
            transform: 'translate(-50%, -50%)',
            left: '50%',
            top: '50%',
          }}
        />
      )}

      {/* Main orb with breathing effect */}
      <div
        className="relative rounded-full border-2 flex items-center justify-center"
        style={{
          width: orbSize,
          height: orbSize,
          backgroundColor: `${skill.color}25`,
          borderColor: skill.color,
          boxShadow: `
            inset 0 0 30px ${skill.color}60,
            0 0 30px ${skill.color}80,
            0 0 ${shouldGlow ? 50 : 20}px ${skill.color}
          `,
          animation: `breathe-${index} 3s ease-in-out infinite`,
        }}
      >
        {/* Animated energy core */}
        <div
          className="absolute rounded-full"
          style={{
            width: '40%',
            height: '40%',
            backgroundColor: skill.color,
            animation: `spin 4s linear infinite, pulse 2s ease-in-out infinite alternate`,
            boxShadow: `0 0 20px ${skill.color}`
          }}
        />

        {/* Skill level orbital ring */}
        <div
          className="absolute inset-0 rounded-full border-2"
          style={{
            borderColor: 'transparent',
            borderTopColor: skill.color,
            borderRightColor: skill.level > 50 ? skill.color : 'transparent',
            borderBottomColor: skill.level > 75 ? skill.color : 'transparent',
            borderLeftColor: skill.level > 25 ? skill.color : 'transparent',
            animation: `orbit 6s linear infinite`,
            opacity: 0.8
          }}
        />
      </div>

      {/* Always visible skill name with typewriter effect */}
      <div
        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 transition-all duration-300"
        style={{
          opacity: shouldGlow ? 1 : 0.8,
          transform: `translateX(-50%) scale(${shouldGlow ? 1.1 : 1})`
        }}
      >
        <div
          className="px-3 py-1 rounded-full text-sm font-bold text-white backdrop-blur-sm border whitespace-nowrap"
          style={{
            backgroundColor: `${skill.color}30`,
            borderColor: skill.color,
            boxShadow: `0 0 15px ${skill.color}50`,
            textShadow: `0 0 10px ${skill.color}`
          }}
        >
          {skill.name}
        </div>
        <div
          className="text-center text-xs text-gray-300 mt-1 font-semibold"
          style={{ textShadow: `0 0 5px ${skill.color}` }}
        >
          {skill.level}% mastery
        </div>
      </div>
    </div>
  );
});
MagneticOrb.displayName = 'MagneticOrb';

// Animated connection lines that pulse and spark
const LiveConnection = React.memo(({ from, to, isActive, skillsMap }) => {
  const fromSkill = skillsMap[from];
  const toSkill = skillsMap[to];

  if (!fromSkill || !toSkill) return null;

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 50 }}>
      <defs>
        <linearGradient id={`grad-${from}-${to}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={fromSkill.color} stopOpacity={isActive ? 1 : 0.4} />
          <stop offset="50%" stopColor="#ffffff" stopOpacity={isActive ? 0.8 : 0.2} />
          <stop offset="100%" stopColor={toSkill.color} stopOpacity={isActive ? 1 : 0.4} />
        </linearGradient>
        <filter id={`glow-${from}-${to}`}>
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <line
        x1={`${fromSkill.x}%`}
        y1={`${fromSkill.y}%`}
        x2={`${toSkill.x}%`}
        y2={`${toSkill.y}%`}
        stroke={`url(#grad-${from}-${to})`}
        strokeWidth={isActive ? 3 : 1}
        filter={isActive ? `url(#glow-${from}-${to})` : 'none'}
        strokeDasharray={isActive ? "none" : "8,4"}
        className="transition-all duration-500"
        style={{
          animation: isActive ? `pulse-line 1.5s ease-in-out infinite alternate` : 'none'
        }}
      />

      {/* Energy particle traveling along line */}
      {isActive && (
        <>
          <circle r="4" fill={fromSkill.color} opacity="0.9">
            <animateMotion dur="2s" repeatCount="indefinite">
              <mpath xlinkHref={`#path-${from}-${to}`} />
            </animateMotion>
          </circle>
          <circle r="2" fill="#ffffff" opacity="1">
            <animateMotion dur="2s" repeatCount="indefinite" begin="0.3s">
              <mpath xlinkHref={`#path-${from}-${to}`} />
            </animateMotion>
          </circle>
        </>
      )}

      <path
        id={`path-${from}-${to}`}
        d={`M ${fromSkill.x}% ${fromSkill.y}% L ${toSkill.x}% ${toSkill.y}%`}
        fill="none"
        opacity="0"
      />
    </svg>
  );
});
LiveConnection.displayName = 'LiveConnection';

export default function MagneticSkillsOrb() {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [selectedType, setSelectedType] = useState('all');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [containerRect, setContainerRect] = useState(null);
  const containerRef = useRef(null);
  const [showIntroAnimation, setShowIntroAnimation] = useState(true);

  // Track mouse for magnetic effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleResize = () => {
      if (containerRef.current) {
        setContainerRect(containerRef.current.getBoundingClientRect());
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Intro animation timer
  useEffect(() => {
    const timer = setTimeout(() => setShowIntroAnimation(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const filteredSkills = useMemo(() => {
    return selectedType === 'all'
      ? skillsData
      : skillsData.filter(skill => skill.type === selectedType);
  }, [selectedType]);

  const skillsMap = useMemo(() => {
    return skillsData.reduce((acc, skill) => {
      acc[skill.name] = skill;
      return acc;
    }, {});
  }, []);

  const activeConnections = useMemo(() => {
    if (!hoveredSkill) return [];
    const skill = skillsData.find(s => s.name === hoveredSkill);
    return skill ? skill.connections : [];
  }, [hoveredSkill]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black relative overflow-hidden">
      {/* Animated particle background */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${2 + Math.random() * 4}s ease-in-out infinite ${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 p-4 md:p-8">
        {/* Magnetic header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-8xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            ⚡ MAGNETIC SKILLS ⚡
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-4 animate-pulse">
            Move your cursor around to feel the magnetic attraction!
          </p>

          {showIntroAnimation && (
            <div className="text-lg text-yellow-400 animate-bounce">
              🧲 Hover over the glowing orbs to see the magic ✨
            </div>
          )}

          {/* Magnetic filters */}
          <div className="flex justify-center space-x-4 mt-8 flex-wrap gap-2">
            {['all', 'frontend', 'backend', 'tools'].map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-6 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-110 ${selectedType === type
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50 animate-pulse'
                    : 'bg-gray-800/80 text-gray-300 hover:text-white hover:bg-gray-700/80 border border-gray-600'
                  }`}
                style={{
                  boxShadow: selectedType === type ? `0 0 30px #8B5CF6` : 'none'
                }}
              >
                {type.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Magnetic Skills Constellation */}
        <div
          ref={containerRef}
          className="relative mx-auto"
          style={{
            height: '600px',
            maxWidth: '1200px',
          }}
        >
          {/* Always show some connections for visual appeal */}
          {skillsData.slice(0, 3).map(skill =>
            skill.connections.slice(0, 1).map(connection => (
              <LiveConnection
                key={`base-${skill.name}-${connection}`}
                from={skill.name}
                to={connection}
                isActive={false}
                skillsMap={skillsMap}
              />
            ))
          )}

          {/* Active connections */}
          {hoveredSkill && skillsData.map(skill =>
            skill.connections.map(connection => (
              <LiveConnection
                key={`active-${skill.name}-${connection}`}
                from={skill.name}
                to={connection}
                isActive={hoveredSkill === skill.name || activeConnections.includes(skill.name)}
                skillsMap={skillsMap}
              />
            ))
          )}

          {/* Magnetic skill orbs */}
          {filteredSkills.map((skill, index) => (
            <MagneticOrb
              key={skill.name}
              skill={skill}
              index={index}
              hoveredSkill={hoveredSkill}
              setHoveredSkill={setHoveredSkill}
              mousePos={mousePos}
              containerRect={containerRect}
            />
          ))}
        </div>

        {/* Live status panel */}
        {hoveredSkill && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-slide-up">
            <div
              className="bg-black/90 backdrop-blur-xl rounded-2xl p-6 border-2 min-w-80"
              style={{
                borderColor: skillsData.find(s => s.name === hoveredSkill)?.color,
                boxShadow: `0 0 40px ${skillsData.find(s => s.name === hoveredSkill)?.color}60`
              }}
            >
              <div className="text-center">
                <h3 className="text-3xl font-bold text-white mb-2 animate-pulse">{hoveredSkill}</h3>
                <div className="flex justify-center space-x-6 text-lg">
                  <span className="text-green-400">✅ {skillsData.find(s => s.name === hoveredSkill)?.level}% Mastery</span>
                  <span className="text-blue-400">🔗 {activeConnections.length} Connected</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes breathe-0 { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        @keyframes breathe-1 { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.08); } }
        @keyframes breathe-2 { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.03); } }
        @keyframes breathe-3 { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.07); } }
        @keyframes breathe-4 { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.04); } }
        @keyframes breathe-5 { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.06); } }
        @keyframes breathe-6 { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.08); } }
        @keyframes breathe-7 { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        @keyframes breathe-8 { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.04); } }
        @keyframes breathe-9 { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.07); } }
        @keyframes breathe-10 { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.06); } }
        @keyframes breathe-11 { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        @keyframes breathe-12 { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.08); } }
        
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes orbit { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes pulse { 0% { opacity: 0.8; } 100% { opacity: 1; } }
        @keyframes twinkle { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
        @keyframes pulse-line { 0% { opacity: 0.8; } 100% { opacity: 1; } }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translate(-50%, 20px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
      `}</style>
    </div>
  );
}