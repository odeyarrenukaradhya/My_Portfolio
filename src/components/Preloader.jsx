import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const COMPONENT_STATES = [
  {
    phase: '01',
    label: 'WIREFRAME',
    icon: '❖',
    spec: 'Layout Grid / 8px',
    content: (
      <div className="flex items-center gap-3 px-4 py-2 border border-dashed border-neutral-400 rounded-xl bg-neutral-100/50">
        <div className="w-4 h-4 border-2 border-neutral-400 rounded-sm" />
        <div className="w-24 h-2 bg-neutral-300 rounded" />
      </div>
    )
  },
  {
    phase: '02',
    label: 'DESIGN TOKENS',
    icon: '🎨',
    spec: 'Colors & Palette',
    content: (
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-neutral-900 text-white shadow-md">
        <div className="w-4 h-4 rounded-full bg-[#a3f036]" />
        <div className="w-4 h-4 rounded-full bg-white" />
        <div className="w-4 h-4 rounded-full bg-neutral-600" />
        <span className="text-[11px] font-mono text-neutral-300 ml-1">#a3f036</span>
      </div>
    )
  },
  {
    phase: '03',
    label: 'TYPOGRAPHY',
    icon: 'Aa',
    spec: 'Söhne / 60FPS',
    content: (
      <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-neutral-200 shadow-sm">
        <span className="font-extrabold text-neutral-900 text-lg">Aa</span>
        <span className="text-xs font-mono text-neutral-500">Plus Jakarta</span>
      </div>
    )
  },
  {
    phase: '04',
    label: 'SYSTEM READY',
    icon: '✦',
    spec: 'Renukaradhya',
    content: (
      <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#a3f036] text-black font-bold shadow-lg">
        <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
        <span className="text-xs font-mono tracking-wider uppercase">RENUKARADHYA — UI/UX & PRODUCT DESIGNER</span>
      </div>
    )
  }
];

const FLOATING_ICONS = [
  {
    id: 'vector',
    icon: (
      <svg className="w-3.5 h-3.5 text-neutral-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    label: 'Vector & UI',
    className: 'top-[14%] left-[4%] sm:left-[8%]',
    delay: 0,
    duration: 5.5,
    yRange: [-10, 10],
    xRange: [-6, 6],
    rotRange: [-4, 6]
  },
  {
    id: 'tokens',
    icon: (
      <span className="flex items-center gap-1">
        <span className="w-2 h-2 rounded-full bg-[#82cf17]" />
        <span className="w-2 h-2 rounded-full bg-neutral-900" />
      </span>
    ),
    label: 'Tokens / HSL',
    className: 'top-[15%] right-[4%] sm:right-[9%]',
    delay: 0.4,
    duration: 6.2,
    yRange: [8, -12],
    xRange: [5, -5],
    rotRange: [5, -3]
  },
  {
    id: 'code',
    icon: (
      <svg className="w-3.5 h-3.5 text-[#16a34a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    label: 'React & GSAP',
    className: 'top-[44%] left-[3%] sm:left-[6%]',
    delay: 0.8,
    duration: 5.8,
    yRange: [-14, 8],
    xRange: [-5, 7],
    rotRange: [4, -5]
  },
  {
    id: 'grid',
    icon: (
      <svg className="w-3.5 h-3.5 text-neutral-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
    label: 'Auto-Layout 8px',
    className: 'top-[46%] right-[3%] sm:right-[7%]',
    delay: 0.3,
    duration: 6.5,
    yRange: [12, -10],
    xRange: [-6, 6],
    rotRange: [-5, 4]
  },
  {
    id: 'sparkles',
    icon: (
      <span className="text-[#82cf17] text-xs font-bold">✦</span>
    ),
    label: 'Micro-interactions',
    className: 'bottom-[16%] left-[4%] sm:left-[10%]',
    delay: 0.6,
    duration: 5.2,
    yRange: [-8, 12],
    xRange: [6, -4],
    rotRange: [-3, 5]
  },
  {
    id: 'type',
    icon: (
      <span className="text-neutral-900 font-extrabold text-xs font-mono">Aa</span>
    ),
    label: 'Söhne / 60fps',
    className: 'bottom-[17%] right-[4%] sm:right-[11%]',
    delay: 1.0,
    duration: 6.0,
    yRange: [10, -12],
    xRange: [-5, 5],
    rotRange: [6, -4]
  }
];

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 2200;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(100, Math.floor((elapsed / duration) * 100));

      setProgress(rawProgress);

      if (rawProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 500);
        }, 250);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 350);
  };

  const activeIndex = Math.min(
    COMPONENT_STATES.length - 1,
    Math.floor((progress / 100) * COMPONENT_STATES.length)
  );

  const activeState = COMPONENT_STATES[activeIndex];

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="preloader-new"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-[#e4e5e9] text-neutral-900 select-none overflow-hidden flex flex-col justify-between p-6 sm:p-12 font-sans"
        >
          {/* Subtle Studio Radial Background Accent */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[400px] bg-[#a3f036]/20 blur-[140px] rounded-full pointer-events-none" />

          {/* Ambient Floating Design Badges / Icons */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-[5]">
            {FLOATING_ICONS.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: [0.75, 0.95, 0.75],
                  y: [item.yRange[0], item.yRange[1], item.yRange[0]],
                  x: [item.xRange[0], item.xRange[1], item.xRange[0]],
                  rotate: [item.rotRange[0], item.rotRange[1], item.rotRange[0]],
                }}
                exit={{ opacity: 0, scale: 0.7, y: -20 }}
                transition={{
                  opacity: { duration: item.duration, repeat: Infinity, ease: 'easeInOut' },
                  y: { duration: item.duration, repeat: Infinity, ease: 'easeInOut' },
                  x: { duration: item.duration * 1.2, repeat: Infinity, ease: 'easeInOut' },
                  rotate: { duration: item.duration * 1.4, repeat: Infinity, ease: 'easeInOut' },
                  delay: item.delay,
                }}
                className={`absolute ${item.className} flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-2xl bg-white/80 backdrop-blur-md border border-neutral-300/70 shadow-[0_10px_25px_rgba(0,0,0,0.06)] text-neutral-800 text-[10px] sm:text-xs font-mono font-medium scale-85 sm:scale-100 transition-transform`}
              >
                <span className="flex items-center justify-center">{item.icon}</span>
                <span className="tracking-tight">{item.label}</span>
              </motion.div>
            ))}
          </div>

          {/* TOP BAR */}
          <div className="relative z-10 flex items-center justify-between border-b border-neutral-300/70 pb-4 text-xs font-mono text-neutral-500">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#82cf17]" />
              <span className="font-semibold text-neutral-900">RENUKARADHYA</span>
            </div>
            <div className="text-[11px] font-semibold text-neutral-700 tracking-wider">
              UI/UX & PRODUCT DESIGNER
            </div>
          </div>

          {/* CENTER INTERACTIVE COMPONENT MORPH STAGE */}
          <div className="relative z-10 my-auto flex flex-col items-center justify-center">
            
            {/* Morphing Component Container Card */}
            <div className="w-full max-w-sm sm:max-w-md bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-[0_25px_60px_rgba(0,0,0,0.06)] flex flex-col items-center text-center space-y-6">
              
              {/* Header Spec Pill */}
              <div className="flex items-center justify-between w-full text-[11px] font-mono text-neutral-400 border-b border-neutral-100 pb-3">
                <span className="text-neutral-900 font-bold">{activeState.phase} // {activeState.label}</span>
                <span className="bg-neutral-100 px-2 py-0.5 rounded-md text-neutral-600">{activeState.spec}</span>
              </div>

              {/* Dynamic Morphing Component Stage */}
              <div className="h-20 flex items-center justify-center w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeState.phase}
                    initial={{ opacity: 0, y: 12, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.9 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                  >
                    {activeState.content}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Sleek Minimal Progress Line */}
              <div className="w-full space-y-2 pt-2">
                <div className="h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#82cf17]"
                    style={{ width: `${progress}%` }}
                    transition={{ ease: 'easeOut' }}
                  />
                </div>
                <div className="flex justify-between items-center text-[11px] font-mono text-neutral-400 pt-1">
                  <span>SYSTEM_LOAD</span>
                  <span className="text-neutral-900 font-bold">{progress}%</span>
                </div>
              </div>

            </div>

            {/* Subtitle Message */}
            <div className="mt-8 flex flex-col items-center gap-1">
              <h2 className="text-sm font-bold text-neutral-900 font-sohne uppercase tracking-wide">
                RENUKARADHYA
              </h2>
              <p className="text-xs font-mono text-neutral-500 tracking-widest uppercase">
                UI/UX & Product Designer
              </p>
            </div>

          </div>

          {/* BOTTOM BAR WITH SKIP BUTTON */}
          <div className="relative z-10 flex items-center justify-between text-xs font-mono text-neutral-400 border-t border-neutral-300/70 pt-4">
            <span>© {new Date().getFullYear()}</span>

            <button
              onClick={handleSkip}
              className="px-4 py-1.5 rounded-full bg-neutral-900 text-white hover:bg-black text-[11px] font-medium tracking-wider uppercase transition-all shadow-sm cursor-pointer flex items-center gap-1.5"
            >
              <span>Skip</span>
              <span>→</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
