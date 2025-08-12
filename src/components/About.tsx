"use client";
import React, { useState, useEffect, useCallback, useRef } from 'react';

// Helper component for typing effect
function TypewriterEffect({ text, delay = 50 }: { text: string; delay?: number }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typing);
      }
    }, delay);

    return () => clearInterval(typing);
  }, [text, delay]);

  return (
    <>
      {displayedText}
      <span className="animate-pulse">_</span>
    </>
  );
}

// Simplified and optimized code display
function OptimizedCodeDisplay({ codeSnippets }: { codeSnippets: any[] }) {
  const [currentTab, setCurrentTab] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Cycle through tabs
  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentTab(prev => (prev + 1) % codeSnippets.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [codeSnippets.length]);

  // Simple, HTML-safe syntax highlighting
  const highlightSyntax = (code: string) => {
    const escapeHtml = (s: string) =>
      s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    const escaped = escapeHtml(code);

    return escaped
      .replace(/\b(const|function|return|console|let|var|if|else)\b/g, '<span class="text-blue-300">$1</span>')
      .replace(/"(.*?)"/g, '<span class="text-yellow-300">"$1"</span>')
      .replace(/\/\/.*$/g, '<span class="text-green-300">$&</span>')
      .replace(/\b(true|false|null|undefined)\b/g, '<span class="text-orange-300">$1</span>');
    // Note: intentionally skipping number-highlighting to avoid corrupting class names (e.g., text-yellow-300)
  };

  const currentSnippet = codeSnippets[currentTab];

  return (
    <div className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Mobile-first responsive container */}
      <div className="relative w-full bg-gray-800/30 border border-gray-700/50 rounded-lg sm:rounded-xl overflow-hidden backdrop-blur-sm">

        {/* Background decoration - simplified for mobile */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20 sm:opacity-30">
          <div className="relative w-16 h-16 sm:w-24 sm:h-24">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/40 to-pink-500/40 rounded-full animate-spin"
              style={{ animationDuration: '10s' }} />
            <div className="absolute inset-2 bg-gradient-to-br from-amber-400/40 to-emerald-400/40 rounded-full"
              style={{ animation: 'reverse-spin 12s linear infinite' }} />
          </div>
        </div>

        {/* Code editor interface */}
        <div className="relative bg-gray-900/95 rounded-lg backdrop-blur-sm border border-gray-700/30 min-h-[200px] sm:min-h-[280px]">

          {/* Header */}
          <div className="flex items-center justify-between p-2 sm:p-3 border-b border-gray-700/50">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500/80"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500/80"></div>
              </div>
              <span className="text-xs font-mono text-gray-400 ml-1 sm:ml-2 truncate">
                {currentSnippet.title.toLowerCase().replace(' ', '_')}.js
              </span>
            </div>

            {/* Tab indicators */}
            <div className="flex gap-1">
              {codeSnippets.map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors duration-500 ${i === currentTab ? 'bg-purple-400' : 'bg-gray-600'
                    }`}
                />
              ))}
            </div>
          </div>

          {/* Code content - mobile optimized */}
          <div className="p-2 sm:p-4 font-mono text-xs sm:text-sm overflow-hidden">
            <div className="space-y-0.5 sm:space-y-1">
              {currentSnippet.code.split('\n').map((line: string, i: number) => (
                <div
                  key={`${currentTab}-${i}`}
                  className="flex items-start opacity-0 animate-[slideIn_0.3s_ease-out_forwards]"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <span className="text-gray-500 w-4 sm:w-6 text-right mr-2 sm:mr-3 select-none flex-shrink-0 text-xs sm:text-sm">
                    {line.trim() ? i + 1 : ''}
                  </span>
                  <span
                    className="text-gray-300 break-all sm:break-normal leading-relaxed flex-1 text-xs sm:text-sm"
                    dangerouslySetInnerHTML={{
                      __html: highlightSyntax(line || ' ')
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Status bar - simplified for mobile */}
          <div className="absolute bottom-0 left-0 right-0 px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-800/50 border-t border-gray-700/50">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 sm:gap-4 text-gray-400">
                <span className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="hidden sm:inline">Live</span>
                </span>
                <span className="hidden sm:inline">JS</span>
              </div>
              <div className="text-gray-500 text-xs truncate">
                <span className="hidden sm:inline">Live coding in progress...</span>
                <span className="sm:hidden">Coding...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  // Optimized code snippets - shorter for mobile
  const codeSnippets = [
    {
      title: "About Me",
      code: `const developer = {
  name: "Badmus Qudus Ayomide",
  passion: ["Creating", "Building"],
  focus: "Full Stack Dev",
  status: "Available ✨",
  
  getGoal() {
    return "Digital experiences that inspire";
  }
};`
    },
    {
      title: "Tech Stack",
      code: `const stack = {
  frontend: ["React", "Next.js", "TS"],
  backend: ["Node.js", "Python"],
  tools: ["Git", "Docker", "AWS"],
  learning: ["Three.js", "AI"],
  
  build: () => creativity + code
};`
    },
    {
      title: "Philosophy",
      code: `function createMagic(idea) {
  const steps = [
    "Think deeply 🤔",
    "Code elegantly ✨", 
    "Test thoroughly 🔍"
  ];
  
  return steps.reduce((result, step) => 
    result + step + passion, idea
  );
}`
    }
  ];

  // Hover tilt for the comment container
  const tiltRef = useRef<HTMLParagraphElement | null>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const handleTiltMove = (e: React.MouseEvent<HTMLParagraphElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const ry = ((x - midX) / midX) * 15; // Reduced intensity
    const rx = -((y - midY) / midY) * 15;
    setTilt({ rx, ry });
  };

  const handleTiltLeave = () => setTilt({ rx: 0, ry: 0 });

  return (
    <section id="about" className="relative py-16 sm:py-28 overflow-hidden" aria-label="Digital presence">
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex mb-6 sm:mb-8">
            <span className="text-xs sm:text-sm md:text-lg font-mono tracking-widest text-pink-400/90 px-3 sm:px-4 py-1.5 sm:py-2 border border-pink-400/30 rounded-full">
              DIGITAL PRESENCE
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-pink-400 to-amber-200">
              <TypewriterEffect text="const creativity = code ^ infinity;" delay={100} />
            </span>
          </h2>

          <div className="text-base sm:text-lg md:text-xl text-gray-300/90 leading-relaxed space-y-4 sm:space-y-6">
            <p className="px-2">
              Imagine a fusion where <span className="text-purple-300">logic dances</span> with <span className="text-pink-300">artistic vision</span>—that&apos;s the space I inhabit.
            </p>

            <div style={{ perspective: '600px' }} className="px-2">
              <p
                ref={tiltRef}
                onMouseMove={handleTiltMove}
                onMouseLeave={handleTiltLeave}
                className="font-mono text-sm sm:text-base border border-gray-700/50 bg-gray-900/30 p-3 sm:p-4 rounded-lg backdrop-blur transform-gpu transition-all duration-300 will-change-transform hover:shadow-[0_20px_40px_-10px_rgba(168,85,247,0.45)] hover:scale-[1.02] sm:hover:scale-[1.03]"
                style={{ transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}
              >
                <span className="text-emerald-300">{'//'}</span> Building digital experiences that <br />
                <span className="text-emerald-300">{'//'}</span> feel alive, responsive, and <br />
                <span className="text-emerald-300">{'//'}</span> deeply human in their execution
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 pt-4 sm:pt-6 px-2">
              {['Problem Solver', 'Pixel Alchemist', 'Stack Explorer', 'UX Advocate'].map((tag, i) => (
                <span
                  key={i}
                  className="text-xs sm:text-sm font-mono px-2 sm:px-3 py-1 bg-gray-800/50 border border-gray-700 rounded-full text-gray-300 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
                  style={{ animationDelay: `${i * 0.1 + 0.5}s` }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Optimized Live Code Preview Container */}
        <div className="mt-12 sm:mt-20 mx-auto max-w-full sm:max-w-2xl px-2 sm:px-0">
          <OptimizedCodeDisplay codeSnippets={codeSnippets} />
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes slideIn {
          from { 
            opacity: 0; 
            transform: translateX(-10px); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }
        
        @keyframes reverse-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
      `}</style>
    </section>
  );
}