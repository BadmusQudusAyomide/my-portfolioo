import React, { useState, useEffect, useCallback, useRef } from 'react';

// Helper component for typing effect
function TypewriterEffect({ text, delay = 50 }) {
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

// Custom typewriter component for code
function CodeTypewriter({ code, isActive, onComplete }) {
  const [displayedCode, setDisplayedCode] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setDisplayedCode("");
      setCurrentIndex(0);
      return;
    }

    if (currentIndex < code.length) {
      const timer = setTimeout(() => {
        setDisplayedCode(prev => prev + code[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 30);

      return () => clearTimeout(timer);
    } else if (onComplete) {
      const completeTimer = setTimeout(onComplete, 3000);
      return () => clearTimeout(completeTimer);
    }
  }, [code, isActive, currentIndex, onComplete]);

  return displayedCode;
}

export default function About() {
  const [currentCodeTab, setCurrentCodeTab] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  // Different code snippets to cycle through
  const codeSnippets = [
    {
      title: "About Me",
      code: `const developer = {
  name: "YourName",
  passion: ["Creating", "Problem Solving"],
  currentFocus: "Full Stack Development",
  funFact: "Powered by coffee ☕",
  status: "Available for new projects",
  
  getMotivation() {
    return "Building the future, one line at a time";
  }
};`
    },
    {
      title: "Tech Stack",
      code: `const techStack = {
  frontend: ["React", "Next.js", "TypeScript"],
  backend: ["Node.js", "Python", "PostgreSQL"],
  tools: ["Git", "Docker", "AWS"],
  currentlyLearning: ["Three.js", "WebGL"],
  
  buildAmazingThings: () => {
    return frontend + backend + creativity;
  }
};`
    },
    {
      title: "Philosophy",
      code: `// My coding philosophy
function createSolution(problem) {
  const approach = [
    "Understand deeply",
    "Design thoughtfully", 
    "Code elegantly",
    "Test thoroughly"
  ];
  
  return approach.reduce((solution, step) => {
    return solution + step + passion;
  }, problem);
}

console.log("Clean code is poetry in motion");`
    }
  ];

  const handleTypewriterComplete = useCallback(() => {
    setIsTyping(false);
    setTimeout(() => {
      setCurrentCodeTab((prev) => (prev + 1) % codeSnippets.length);
      setIsTyping(true);
    }, 500);
  }, [codeSnippets.length]);

  // Start the cycle
  useEffect(() => {
    setIsTyping(true);
  }, []);

  // Hover tilt for the comment container
  const tiltRef = useRef<HTMLParagraphElement | null>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const handleTiltMove = (e: React.MouseEvent<HTMLParagraphElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const ry = ((x - midX) / midX) * 22; // left/right tilt (more intense)
    const rx = -((y - midY) / midY) * 22; // up/down tilt (more intense)
    setTilt({ rx, ry });
  };

  const handleTiltLeave = () => setTilt({ rx: 0, ry: 0 });

  // Hover tilt for the code preview container (separate from comment tilt)
  const [previewTilt, setPreviewTilt] = useState({ rx: 0, ry: 0 });
  const handlePreviewTiltMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const ry = ((x - midX) / midX) * 14; // moderate tilt for large box
    const rx = -((y - midY) / midY) * 14;
    setPreviewTilt({ rx, ry });
  };
  const handlePreviewTiltLeave = () => setPreviewTilt({ rx: 0, ry: 0 });

  // Function to safely render code with syntax highlighting
  const renderCodeWithHighlighting = (line) => {
    return line
      .replace(/\b(const|function|return|console|let|var)\b/g, '<span class="text-blue-400">$&</span>')
      .replace(/"/g, '<span class="text-yellow-400">"</span>')
      .replace(/'/g, '<span class="text-yellow-400">\'</span>')
      .replace(/\/\/.+/g, '<span class="text-green-400">$&</span>')
      .replace(/\b(true|false|null|undefined)\b/g, '<span class="text-orange-400">$&</span>')
      .replace(/\b\d+\b/g, '<span class="text-purple-400">$&</span>');
  };

  return (
    <section id="about" className="relative py-28 overflow-hidden" aria-label="Digital presence">
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center opacity-100 transition-opacity duration-800">
          <div className="inline-flex mb-8">
            <span className="text-sm md:text-lg font-mono tracking-widest text-pink-400/90 px-4 py-2 border border-pink-400/30 rounded-full">
              DIGITAL PRESENCE
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-pink-400 to-amber-200">
              <TypewriterEffect text="const creativity = code ^ infinity;" delay={100} />
            </span>
          </h2>

          <div className="text-lg md:text-xl text-gray-300/90 leading-relaxed space-y-6">
            <p>
              Imagine a fusion where <span className="text-purple-300">logic dances</span> with <span className="text-pink-300">artistic vision</span>—that's the space I inhabit.
            </p>

            <div style={{ perspective: '600px' }}>
              <p
                ref={tiltRef}
                onMouseMove={handleTiltMove}
                onMouseLeave={handleTiltLeave}
                className="font-mono text-sm md:text-base border border-gray-700/50 bg-gray-900/30 p-4 rounded-lg backdrop-blur transform-gpu transition-transform duration-300 will-change-transform hover:shadow-[0_20px_40px_-10px_rgba(168,85,247,0.45)] hover:scale-[1.03]"
                style={{ transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}
              >
                <span className="text-emerald-300">//</span> Building digital experiences that <br />
                <span className="text-emerald-300">//</span> feel alive, responsive, and <br />
                <span className="text-emerald-300">//</span> deeply human in their execution
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 pt-6">
              {['Problem Solver', 'Pixel Alchemist', 'Stack Explorer', 'UX Advocate'].map((tag, i) => (
                <span
                  key={i}
                  className="text-xs md:text-sm font-mono px-3 py-1 bg-gray-800/50 border border-gray-700 rounded-full text-gray-300 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
                  style={{ animationDelay: `${i * 0.1 + 0.5}s` }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Live Code Preview Container */}
        <div className="mt-20 mx-auto max-w-2xl opacity-0 animate-[fadeIn_0.8s_ease-out_0.8s_forwards]" style={{ perspective: '700px' }}>
          <div
            className="relative aspect-video w-full bg-gray-800/30 border border-gray-700/50 rounded-xl overflow-hidden backdrop-blur transition-all duration-300 transform-gpu will-change-transform hover:shadow-[0_25px_60px_-15px_rgba(168,85,247,0.35)]"
            onMouseMove={handlePreviewTiltMove}
            onMouseLeave={handlePreviewTiltLeave}
            style={{ transform: `rotateX(${previewTilt.rx}deg) rotateY(${previewTilt.ry}deg)` }}
          >
            {/* Background abstract animation - always visible */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
              <div className="relative w-24 h-24 md:w-32 md:h-32">
                <div
                  className="absolute inset-0 bg-gradient-to-tr from-purple-500/40 to-pink-500/40 rounded-[30%] animate-[spin_12s_linear_infinite]"
                  style={{
                    animation: 'spin 12s linear infinite, morph1 12s ease-in-out infinite'
                  }}
                />
                <div
                  className="absolute inset-2 bg-gradient-to-br from-amber-400/40 to-emerald-400/40 rounded-[50%] animate-[reverse-spin_15s_linear_infinite]"
                  style={{
                    animation: 'reverse-spin 15s linear infinite, morph2 15s ease-in-out infinite'
                  }}
                />
              </div>
            </div>

            {/* Code editor interface - always visible */}
            <div className="absolute inset-2 bg-gray-900/95 rounded-lg backdrop-blur-md border border-gray-700/50">
              {/* Code editor header */}
              <div className="flex items-center justify-between p-3 border-b border-gray-700/50">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  </div>
                  <span className="text-xs font-mono text-gray-400 ml-2">
                    {codeSnippets[currentCodeTab].title.toLowerCase().replace(' ', '_')}.js
                  </span>
                </div>

                {/* Tab indicators */}
                <div className="flex gap-1">
                  {codeSnippets.map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-colors duration-300 ${i === currentCodeTab ? 'bg-purple-400' : 'bg-gray-600'
                        }`}
                    />
                  ))}
                </div>
              </div>

              {/* Code content with typewriter effect */}
              <div className="p-4 font-mono text-xs md:text-sm overflow-hidden h-[calc(100%-6rem)]">
                <div className="space-y-1">
                  {(() => {
                    const typedCode = CodeTypewriter({
                      code: codeSnippets[currentCodeTab].code,
                      isActive: isTyping,
                      onComplete: handleTypewriterComplete
                    });

                    return typedCode.split('\n').map((line, i) => (
                      <div key={`${currentCodeTab}-${i}`} className="flex min-h-[1.2em]">
                        <span className="text-gray-500 w-6 text-right mr-3 select-none">
                          {line.trim() ? i + 1 : ''}
                        </span>
                        <span
                          className="text-gray-300"
                          dangerouslySetInnerHTML={{
                            __html: renderCodeWithHighlighting(line)
                          }}
                        />
                        {/* Blinking cursor at the end of current line being typed */}
                        {i === typedCode.split('\n').length - 1 && (
                          <span className="text-white ml-1 animate-pulse">|</span>
                        )}
                      </div>
                    ));
                  })()}
                </div>
              </div>

              {/* Bottom status bar */}
              <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gray-800/50 border-t border-gray-700/50">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-4 text-gray-400">
                    <span className="flex items-center gap-1">
                      <div
                        className={`w-2 h-2 rounded-full bg-green-400 ${isTyping ? 'animate-pulse' : ''
                          }`}
                      />
                      {isTyping ? 'Typing...' : 'Ready'}
                    </span>
                    <span>JavaScript</span>
                    <span>
                      Line {(() => {
                        const typedCode = CodeTypewriter({
                          code: codeSnippets[currentCodeTab].code,
                          isActive: isTyping,
                          onComplete: handleTypewriterComplete
                        });
                        return typedCode.split('\n').length;
                      })()}
                    </span>
                  </div>
                  <div className="text-gray-500">
                    Live coding in progress...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
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
        
        @keyframes morph1 {
          0%, 100% { border-radius: 30%; }
          50% { border-radius: 50%; }
        }
        
        @keyframes morph2 {
          0%, 100% { border-radius: 50%; }
          50% { border-radius: 30%; }
        }
        
        @keyframes reverse-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
      `}</style>
    </section>
  );
}