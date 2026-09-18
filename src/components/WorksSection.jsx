import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function WorksSection({ projects = [], onSelectProject, onViewAll, containerRef, sectionRef }) {
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const trackRef = useRef(null);
  const viewportRef = useRef(null);
  const [maxScroll, setMaxScroll] = useState(0);

  // Detect Mobile Viewport & Reduced Motion Preference
  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
      const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setPrefersReducedMotion(reduced);
    };

    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // Framer Motion Scroll Progress Binding
  const { scrollYProgress } = useScroll(
    containerRef && sectionRef
      ? { target: sectionRef, container: containerRef }
      : {}
  );

  // Smooth Physics Spring Interpolation
  const smoothProgress = useSpring(scrollYProgress || 0, {
    stiffness: 85,
    damping: 26,
    mass: 0.18
  });

  // Calculate Maximum Horizontal Distance
  useEffect(() => {
    const updateDimensions = () => {
      if (trackRef.current && viewportRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const viewportWidth = viewportRef.current.clientWidth;
        const scrollableDistance = Math.max(0, trackWidth - viewportWidth + 32);
        setMaxScroll(scrollableDistance);
      }
    };

    updateDimensions();
    const timer = setTimeout(updateDimensions, 100);
    window.addEventListener('resize', updateDimensions);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateDimensions);
    };
  }, [projects]);

  // Transform Vertical Scroll Progress -> Horizontal Translation
  const translateX = useTransform(smoothProgress, [0, 1], [0, -maxScroll]);

  // Arrow Button Handlers
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(projects.length - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < projects.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  return (
    <div className="w-full max-w-[1280px] h-full max-h-[93vh] bg-white rounded-[24px] sm:rounded-[32px] md:rounded-[40px] border border-neutral-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.06)] p-3 sm:p-5 md:p-6 relative overflow-hidden flex flex-col justify-between">
      
      {/* Top Header - Fixed at Top */}
      <div className="flex items-center justify-between pb-1 pt-1 z-20 flex-shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif font-black text-2xl sm:text-4xl md:text-5xl text-neutral-900 tracking-tight drop-shadow-sm uppercase">
              WORKS
            </h2>
            <span className="hidden md:inline-flex items-center gap-1 bg-[#a3f036] text-black border border-black/20 text-[11px] font-sans font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              <Sparkles className="w-3 h-3 fill-black" />
              Scroll Showcase
            </span>
          </div>
          <p className="font-serif italic text-neutral-600 text-xs sm:text-sm mt-0.5">
            A glimpse into the work i've created — scroll to explore
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

      {/* Main Track Showcase Area */}
      <div ref={viewportRef} className="relative w-full my-auto flex-1 overflow-hidden flex items-center">
        
        {/* Left Arrow Button */}
        <button
          onClick={handlePrev}
          aria-label="Previous Project"
          className="z-30 absolute left-2 top-1/2 -translate-y-1/2 bg-black/90 text-white hover:bg-black p-2 sm:p-2.5 rounded-full shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95 cursor-pointer flex-shrink-0 backdrop-blur-sm"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3]" />
        </button>

        {/* DESKTOP / TABLET SCROLL-DRIVEN HORIZONTAL TRACK */}
        {!isMobile && !prefersReducedMotion ? (
          <motion.div
            ref={trackRef}
            style={{ x: translateX }}
            className="flex flex-nowrap gap-5 sm:gap-6 items-center px-4 will-change-transform py-2"
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                total={projects.length}
                smoothProgress={smoothProgress}
                onSelectProject={onSelectProject}
              />
            ))}
          </motion.div>
        ) : (
          /* MOBILE / ACCESSIBILITY REDUCED MOTION CAROUSEL FALLBACK */
          <div className="w-full flex overflow-x-auto snap-x snap-mandatory gap-4 py-2 scrollbar-none px-2">
            {projects.map((project) => (
              <div key={project.id} className="w-[85vw] max-w-[340px] flex-shrink-0 snap-center">
                <ProjectCard
                  project={project}
                  onSelectProject={onSelectProject}
                  isMobile
                />
              </div>
            ))}
          </div>
        )}

        {/* Right Arrow Button */}
        <button
          onClick={handleNext}
          aria-label="Next Project"
          className="z-30 absolute right-2 top-1/2 -translate-y-1/2 bg-black/90 text-white hover:bg-black p-2 sm:p-2.5 rounded-full shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95 cursor-pointer flex-shrink-0 backdrop-blur-sm"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3]" />
        </button>
      </div>

      {/* Footer Info Bar */}
      <div className="flex items-center justify-between pt-1 text-xs text-neutral-400 font-serif flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#a3f036] animate-pulse"></span>
          <span>{projects.length} Featured Case Studies</span>
        </div>
        <span className="hidden sm:inline text-neutral-400 font-sans">Scroll vertically to translate projects</span>
      </div>

    </div>
  );
}

// Sub-component for individual project card with distance-based scale animation
function ProjectCard({ project, index, total, smoothProgress, onSelectProject, isMobile }) {
  // Compute card scale dynamically based on scroll position proximity
  const targetProgress = total > 1 ? index / (total - 1) : 0;
  
  const scale = smoothProgress && !isMobile
    ? useTransform(smoothProgress, (p) => {
        const diff = Math.abs(p - targetProgress);
        return Math.max(0.96, 1.03 - diff * 0.25);
      })
    : 1;

  const opacity = smoothProgress && !isMobile
    ? useTransform(smoothProgress, (p) => {
        const diff = Math.abs(p - targetProgress);
        return Math.max(0.88, 1 - diff * 0.3);
      })
    : 1;

  return (
    <motion.div
      style={!isMobile ? { scale, opacity } : {}}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      onClick={() => onSelectProject(project)}
      className={`${project.bgColor} text-white rounded-[20px] sm:rounded-[24px] border border-neutral-800/80 p-4 sm:p-5 flex flex-col justify-between shadow-xl hover:shadow-2xl transition-shadow duration-300 group relative overflow-hidden cursor-pointer ${
        isMobile ? 'w-full h-[380px]' : 'w-[420px] sm:w-[480px] md:w-[520px] h-[390px] sm:h-[420px] flex-shrink-0'
      }`}
    >
      {/* Image Showcase Container */}
      <div className="w-full rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-900/60 border border-white/10 mb-3 flex-1 relative">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity" />
      </div>

      {/* Card Content & Tags */}
      <div className="w-full flex items-end justify-between gap-3 pt-1">
        <div className="flex-1 pr-1">
          <h3 className="font-serif font-extrabold text-white text-base sm:text-lg tracking-wider uppercase">
            {project.title}
          </h3>
          <p className="font-serif text-neutral-300 text-xs sm:text-sm mt-0.5 leading-snug line-clamp-1">
            {project.subtitle}
          </p>
          <p className="font-serif italic text-neutral-400 text-xs mt-1 tracking-tight">
            {project.tags}
          </p>
        </div>

        {/* View Work Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            onSelectProject(project);
          }}
          className="bg-white text-neutral-900 hover:bg-neutral-100 rounded-full px-4 py-2 font-serif text-xs font-bold transition-all flex items-center gap-1 shadow-md whitespace-nowrap cursor-pointer flex-shrink-0"
        >
          <span>View Work</span>
          <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </motion.button>
      </div>
    </motion.div>
  );
}
