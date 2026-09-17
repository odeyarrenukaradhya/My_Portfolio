import React, { useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WorksSection({ projects = [], onSelectProject, onViewAll }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, projects.length - 2) : Math.max(0, prev - 1)));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= projects.length - 2 ? 0 : prev + 1));
  };

  const visibleProjects = projects.slice(currentIndex, currentIndex + 2);

  return (
    <div className="w-full max-w-[1280px] h-full max-h-[93vh] bg-white rounded-[24px] sm:rounded-[32px] md:rounded-[40px] border border-neutral-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.06)] p-3 sm:p-5 md:p-6 relative overflow-hidden flex flex-col justify-between">
      
      {/* Top Header - Trimmed vertical padding */}
      <div className="flex items-center justify-between pb-2 pt-1 border-b border-neutral-100 z-10">
        <div>
          <h2 className="font-serif font-black text-2xl sm:text-4xl md:text-5xl text-neutral-900 tracking-tight drop-shadow-sm uppercase">
            WORKS
          </h2>
          <p className="font-serif italic text-neutral-600 text-xs sm:text-sm mt-0.5">
            A glimpse into the work i've created
          </p>
        </div>

        {/* Top Right View All Button */}
        <motion.button
          onClick={onViewAll}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="bg-[#a3f036] hover:bg-[#b5ff47] text-black border-2 border-black shadow-[4px_4px_0px_0px_#000000] hover:shadow-[6px_6px_0px_0px_#000000] px-5 sm:px-6 py-2 rounded-full font-serif font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#000000]"
        >
          <span>View All</span>
          <ArrowUpRight className="w-4 h-4 stroke-[3]" />
        </motion.button>
      </div>

      {/* Carousel Main Container with Navigation Arrows */}
      <div className="relative w-full my-2 flex items-center justify-between gap-2 sm:gap-4 flex-1 overflow-hidden">
        
        {/* Left Arrow Button */}
        <button
          onClick={handlePrev}
          aria-label="Previous Project"
          className="z-30 bg-black text-white hover:bg-neutral-800 p-2 sm:p-2.5 rounded-full shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95 cursor-pointer flex-shrink-0"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3]" />
        </button>

        {/* Projects Cards Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 flex-1 h-full items-stretch">
          <AnimatePresence mode="wait">
            {visibleProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                onClick={() => onSelectProject(project)}
                className={`${project.bgColor} text-white rounded-[20px] sm:rounded-[24px] border border-neutral-800/80 p-3.5 sm:p-4 flex flex-col justify-between shadow-xl hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden cursor-pointer h-full`}
              >
                {/* Image Showcase Container */}
                <div className="w-full rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-900/60 border border-white/10 mb-2.5 flex-1 min-h-[160px] sm:min-h-[200px] max-h-[250px] relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
                </div>

                {/* Bottom Footer Block */}
                <div className="w-full flex items-end justify-between gap-3 pt-1">
                  <div className="flex-1 pr-1">
                    <h3 className="font-serif font-extrabold text-white text-sm sm:text-base tracking-wider uppercase">
                      {project.title}
                    </h3>
                    <p className="font-serif text-neutral-300 text-xs sm:text-[13px] mt-0.5 leading-snug line-clamp-1">
                      {project.subtitle}
                    </p>
                    <p className="font-serif italic text-neutral-400 text-[11px] sm:text-xs mt-1 tracking-tight">
                      {project.tags}
                    </p>
                  </div>

                  {/* Bottom Right White Pill Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProject(project);
                    }}
                    className="bg-white text-neutral-900 hover:bg-neutral-100 rounded-full px-3.5 py-1.5 font-serif text-xs font-bold transition-all flex items-center gap-1 shadow-md whitespace-nowrap cursor-pointer"
                  >
                    <span>View Work</span>
                    <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={handleNext}
          aria-label="Next Project"
          className="z-30 bg-black text-white hover:bg-neutral-800 p-2 sm:p-2.5 rounded-full shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95 cursor-pointer flex-shrink-0"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3]" />
        </button>
      </div>

      {/* Footer info bar */}
      <div className="flex items-center justify-between pt-1.5 border-t border-neutral-100 text-xs text-neutral-400 font-serif">
        <span>Showing {currentIndex + 1}-{currentIndex + 2} of {projects.length} Featured Works</span>
      </div>

    </div>
  );
}

