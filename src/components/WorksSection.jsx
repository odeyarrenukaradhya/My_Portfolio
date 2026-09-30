import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function WorksSection({ projects = [], onSelectProject, onViewAll, containerRef, sectionRef }) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const trackRef = useRef(null);
  const viewportRef = useRef(null);
  const mobileCarouselRef = useRef(null);
  const scrollRaf = useRef(null);

  // Drag tracking to distinguish swipe/scroll from card tap
  const touchStartPos = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const isMouseDown = useRef(false);
  const mouseStartX = useRef(0);
  const scrollLeftStart = useRef(0);

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

  // Framer Motion Scroll Progress Binding (for Desktop)
  const { scrollYProgress } = useScroll(
    containerRef && sectionRef && !isMobile
      ? { target: sectionRef, container: containerRef }
      : {}
  );

  // Smooth Physics Spring Interpolation
  const smoothProgress = useSpring(scrollYProgress || 0, {
    stiffness: 85,
    damping: 26,
    mass: 0.18
  });

  // Calculate Maximum Horizontal Distance for Desktop
  useEffect(() => {
    const updateDimensions = () => {
      if (trackRef.current && viewportRef.current && !isMobile) {
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
  }, [projects, isMobile]);

  // Transform Vertical Scroll Progress -> Horizontal Translation (Desktop)
  const translateX = useTransform(smoothProgress, [0, 1], [0, -maxScroll]);

  // Programmatic scroll to specific project card
  const scrollToProject = (targetIndex) => {
    const validIndex = Math.max(0, Math.min(targetIndex, projects.length - 1));
    setCurrentIndex(validIndex);

    if (isMobile && mobileCarouselRef.current) {
      const container = mobileCarouselRef.current;
      const children = container.children;
      if (children && children[validIndex]) {
        const card = children[validIndex];
        const containerWidth = container.offsetWidth;
        const cardWidth = card.offsetWidth;
        const cardLeft = card.offsetLeft;
        const scrollPos = cardLeft - (containerWidth - cardWidth) / 2;

        container.scrollTo({
          left: Math.max(0, scrollPos),
          behavior: 'smooth'
        });
      }
    } else if (!isMobile && containerRef?.current && sectionRef?.current) {
      const sectionTop = sectionRef.current.offsetTop;
      const sectionHeight = sectionRef.current.offsetHeight;
      const viewportHeight = containerRef.current.clientHeight;
      const totalScrollable = Math.max(0, sectionHeight - viewportHeight);
      const progress = projects.length > 1 ? validIndex / (projects.length - 1) : 0;
      containerRef.current.scrollTo({
        top: sectionTop + progress * totalScrollable,
        behavior: 'smooth'
      });
    }
  };

  // Arrow Button Handlers (works seamlessly on mobile & desktop)
  const handlePrev = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : projects.length - 1;
    scrollToProject(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex < projects.length - 1 ? currentIndex + 1 : 0;
    scrollToProject(newIndex);
  };

  // Synchronize currentIndex as user swipes/scrolls on mobile
  const handleMobileScroll = () => {
    if (scrollRaf.current) return;
    scrollRaf.current = requestAnimationFrame(() => {
      scrollRaf.current = null;
      if (!mobileCarouselRef.current) return;
      const container = mobileCarouselRef.current;
      const scrollCenter = container.scrollLeft + container.offsetWidth / 2;

      let closestIndex = 0;
      let minDistance = Infinity;

      Array.from(container.children).forEach((child, index) => {
        const childCenter = child.offsetLeft + child.offsetWidth / 2;
        const distance = Math.abs(scrollCenter - childCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      setCurrentIndex(closestIndex);
    });
  };

  // Touch handlers to prevent accidental card clicks when swiping
  const handleTouchStart = (e) => {
    if (e.touches && e.touches[0]) {
      touchStartPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      isDragging.current = false;
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      const dx = Math.abs(e.touches[0].clientX - touchStartPos.current.x);
      const dy = Math.abs(e.touches[0].clientY - touchStartPos.current.y);
      if (dx > 8 || dy > 8) {
        isDragging.current = true;
      }
    }
  };

  // Mouse drag-to-scroll support (great for desktop responsive emulators)
  const handleMouseDown = (e) => {
    if (!mobileCarouselRef.current) return;
    isMouseDown.current = true;
    mouseStartX.current = e.pageX - mobileCarouselRef.current.offsetLeft;
    scrollLeftStart.current = mobileCarouselRef.current.scrollLeft;
    isDragging.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown.current || !mobileCarouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - mobileCarouselRef.current.offsetLeft;
    const walk = (x - mouseStartX.current) * 1.3;
    if (Math.abs(x - mouseStartX.current) > 5) {
      isDragging.current = true;
    }
    mobileCarouselRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  const handleMouseUp = () => {
    isMouseDown.current = false;
  };

  const handleCardClick = (project) => {
    if (isDragging.current) {
      isDragging.current = false;
      return;
    }
    onSelectProject(project);
  };

  return (
    <div className="w-full max-w-[1280px] min-h-[calc(100dvh-85px)] md:min-h-0 md:h-full md:max-h-[93vh] bg-white rounded-[24px] sm:rounded-[32px] md:rounded-[40px] border border-neutral-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.06)] p-3 sm:p-5 md:p-6 relative overflow-hidden flex flex-col justify-between">
      
      {/* Top Header - Fixed at Top */}
      <div className="flex items-center justify-between pb-1 pt-1 z-20 flex-shrink-0 gap-2">
        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center gap-2">
            <h2 className="font-serif font-black text-2xl sm:text-4xl md:text-5xl text-neutral-900 tracking-tight drop-shadow-sm uppercase">
              WORKS
            </h2>
            <span className="hidden md:inline-flex items-center gap-1 bg-[#a3f036] text-black border border-black/20 text-[11px] font-sans font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              <Sparkles className="w-3 h-3 fill-black" />
              Scroll Showcase
            </span>
          </div>
          <p className="font-serif italic text-neutral-600 text-[11px] sm:text-sm mt-0.5 truncate sm:whitespace-normal">
            A glimpse into the work i've created — scroll to explore
          </p>
        </div>

        {/* Top Right View All Button */}
        <motion.button
          onClick={onViewAll}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="bg-[#a3f036] hover:bg-[#b5ff47] text-black border border-black sm:border-2 shadow-[2px_2px_0px_0px_#000000] sm:shadow-[3px_3px_0px_0px_#000000] px-2.5 xs:px-3 sm:px-5 py-1 sm:py-2 rounded-full font-sans font-bold text-[10px] xs:text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-1 sm:gap-1.5 cursor-pointer whitespace-nowrap flex-shrink-0 active:translate-x-0.5 active:translate-y-0.5"
        >
          <span>View All</span>
          <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5]" />
        </motion.button>
      </div>

      {/* Main Track Showcase Area */}
      <div ref={viewportRef} className="relative w-full my-auto flex-1 overflow-hidden flex items-center">
        
        {/* Left Arrow Button (Desktop / Tablet) */}
        <button
          onClick={handlePrev}
          aria-label="Previous Project"
          className="z-30 absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 hidden sm:flex bg-black/90 text-white hover:bg-black p-2 sm:p-2.5 rounded-full shadow-xl transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer flex-shrink-0 backdrop-blur-md border border-white/20 items-center justify-center"
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
                onCardClick={handleCardClick}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
              />
            ))}
          </motion.div>
        ) : (
          /* MOBILE / ACCESSIBILITY REDUCED MOTION CAROUSEL FALLBACK */
          <div
            ref={mobileCarouselRef}
            onScroll={handleMobileScroll}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            className="w-full flex overflow-x-auto snap-x snap-mandatory gap-3 sm:gap-4 py-2 px-3 sm:px-4 scrollbar-none touch-pan-x touch-pan-y select-none"
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollBehavior: 'smooth',
              overscrollBehaviorX: 'contain',
              touchAction: 'pan-x pan-y'
            }}
          >
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="w-[84vw] max-w-[320px] xs:max-w-[340px] flex-shrink-0 snap-center"
              >
                <ProjectCard
                  project={project}
                  index={index}
                  total={projects.length}
                  onSelectProject={onSelectProject}
                  onCardClick={handleCardClick}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  isMobile
                />
              </div>
            ))}
          </div>
        )}

        {/* Right Arrow Button (Desktop / Tablet) */}
        <button
          onClick={handleNext}
          aria-label="Next Project"
          className="z-30 absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 hidden sm:flex bg-black/90 text-white hover:bg-black p-2 sm:p-2.5 rounded-full shadow-xl transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer flex-shrink-0 backdrop-blur-md border border-white/20 items-center justify-center"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3]" />
        </button>
      </div>

      {/* Footer Info Bar & Mobile Pagination Indicators */}
      <div className="flex items-center justify-between pt-1 text-xs text-neutral-400 font-serif flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#a3f036] animate-pulse"></span>
          <span>{projects.length} Featured Case Studies</span>
        </div>

        {/* Interactive Pagination Dots with Prev/Next Buttons on Mobile */}
        <div className="flex sm:hidden items-center gap-1.5 bg-neutral-100/90 px-2 py-1 rounded-full border border-neutral-200/60 shadow-xs">
          <button
            onClick={handlePrev}
            aria-label="Previous Project"
            className="p-1 rounded-full text-neutral-600 hover:text-black active:scale-90 transition-transform"
          >
            <ChevronLeft className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
          
          <div className="flex items-center gap-1">
            {projects.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => scrollToProject(idx)}
                aria-label={`Go to project ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx
                    ? 'w-4 bg-neutral-900 shadow-xs'
                    : 'w-1.5 bg-neutral-300 hover:bg-neutral-400'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            aria-label="Next Project"
            className="p-1 rounded-full text-neutral-600 hover:text-black active:scale-90 transition-transform"
          >
            <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>

        <span className="hidden sm:inline text-neutral-400 font-sans">Scroll vertically to translate projects</span>
      </div>

    </div>
  );
}

// Sub-component for individual project card
function ProjectCard({
  project,
  index,
  total,
  smoothProgress,
  onSelectProject,
  onCardClick,
  onTouchStart,
  onTouchMove,
  isMobile
}) {
  // Compute card scale dynamically based on scroll position proximity (Desktop)
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
      whileHover={!isMobile ? { y: -6, scale: 1.02 } : {}}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onClick={() => (onCardClick ? onCardClick(project) : onSelectProject(project))}
      className={`${project.bgColor} text-white rounded-[20px] sm:rounded-[24px] border border-neutral-800/80 p-3.5 xs:p-4 sm:p-5 flex flex-col justify-between shadow-xl hover:shadow-2xl transition-shadow duration-300 group relative overflow-hidden cursor-pointer select-none ${
        isMobile
          ? 'w-full h-[350px] xs:h-[370px]'
          : 'w-[420px] sm:w-[480px] md:w-[520px] h-[390px] sm:h-[420px] flex-shrink-0'
      }`}
    >
      {/* Image Showcase Container */}
      <div className="w-full rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-900/60 border border-white/10 mb-2.5 xs:mb-3 flex-1 min-h-0 relative pointer-events-none">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity" />
      </div>

      {/* Card Content & Tags */}
      <div className="w-full flex items-end justify-between gap-2.5 xs:gap-3 pt-0.5 xs:pt-1">
        <div className="flex-1 pr-1 min-w-0">
          <h3 className="font-serif font-extrabold text-white text-sm xs:text-base sm:text-lg tracking-wider uppercase truncate">
            {project.title}
          </h3>
          <p className="font-serif text-neutral-300 text-[11px] xs:text-xs sm:text-sm mt-0.5 leading-snug line-clamp-1">
            {project.subtitle}
          </p>
          <p className="font-serif italic text-neutral-400 text-[10px] xs:text-xs mt-0.5 xs:mt-1 tracking-tight truncate">
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
          className="bg-white text-neutral-900 hover:bg-neutral-100 rounded-full px-3 xs:px-4 py-1.5 xs:py-2 font-serif text-[11px] xs:text-xs font-bold transition-all flex items-center gap-1 shadow-md whitespace-nowrap cursor-pointer flex-shrink-0"
        >
          <span>View Work</span>
          <ArrowUpRight className="w-3 xs:w-3.5 h-3 xs:h-3.5 stroke-[2.5]" />
        </motion.button>
      </div>
    </motion.div>
  );
}
