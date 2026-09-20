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
