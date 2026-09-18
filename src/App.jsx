import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import HeroSpotlight from './components/HeroSpotlight';
import SocialPills from './components/SocialPills';
import AboutSection from './components/AboutSection';
import WorksSection from './components/WorksSection';
import ProjectDetailPage from './components/ProjectDetailPage';
import AllWorksPage from './components/AllWorksPage';
import InfiniteSpiral from './components/InfiniteSpiral';
import ContactSection from './components/ContactSection';
import SkillsSection from './components/SkillsSection';
import TextType from './components/TextType';
import DepthCarousel from './components/DepthCarousel';
import TextLoop from './components/TextLoop';

const getTimeBasedGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 4 && hour < 12) return 'Hai, Good Morning!';
  if (hour >= 12 && hour < 17) return 'Hai, Good Afternoon!';
  if (hour >= 17 && hour < 22) return 'Hai, Good Evening!';
  return 'Hai, Good Night!';
};

export default function App() {
  const [viewMode, setViewMode] = useState('main'); // 'main' | 'project-detail' | 'all-works'
  const [activeProject, setActiveProject] = useState(null);
  const [activeSection, setActiveSection] = useState('#home');
  const [targetSection, setTargetSection] = useState('home');

  const mainScrollContainerRef = useRef(null);
  const worksSectionRef = useRef(null);

  const handleNavigateToSection = (targetId) => {
    setActiveSection(`#${targetId}`);
    setTargetSection(targetId);
    if (viewMode !== 'main') {
      setViewMode('main');
    } else {
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  useEffect(() => {
    if (viewMode === 'main' && targetSection && targetSection !== 'home') {
      const scrollToTarget = () => {
        const elem = document.getElementById(targetSection);
        if (elem) {
          elem.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
      };

      scrollToTarget();
      const t1 = setTimeout(scrollToTarget, 50);
      const t2 = setTimeout(scrollToTarget, 200);
      const t3 = setTimeout(scrollToTarget, 400);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [viewMode, targetSection]);

  const projects = [
    {
      id: 'eco-snap',
      title: 'ECO SNAP',
      heading: 'Community-driven waste reporting platform',
      subtitle: 'Community-driven waste reporting platform',
      description: 'EcoSnap helps citizens report waste issues, track cleanup activities, and earn rewards for contributing to a cleaner environment.',
      tagPills: ['UI/UX', 'PRODUCT', 'MOBILE', 'SUSTAINABILITY'],
      tags: 'UI/UX Design • React • Product Design',
      specs: '12+ Screens • 3 User Flows • 1 Design System',
      image: '/eco-snap.jpg',
      bgColor: 'bg-[#0a120c]',
      liveUrl: '#',
      caseStudyUrl: '#'
    },
    {
      id: 'cortineix',
      title: 'CORTINEIX BILLING SYSTEM',
      heading: 'Smart billing platform for modern retail businesses.',
      subtitle: 'Smart billing platform for modern retail businesses.',
      description: 'Cortineix streamlines enterprise invoice generation, inventory tracking, POS checkout, and financial revenue analytics for growing retail brands.',
      tagPills: ['PRODUCT DESIGN', 'SAAS', 'FRONTEND', 'RETAIL'],
      tags: 'Product Design • SaaS Design • Frontend Design',
      specs: '24+ Dashboard Screens • 5 SaaS Modules • 1 Design System',
      image: '/cortineix.jpg',
      bgColor: 'bg-[#090e17]',
      liveUrl: 'https://cortinex-billingsystem.cloud/',
      caseStudyUrl: '#'
    },
    {
      id: 'ai-lab',
      title: 'AI DESIGN LAB',
      heading: 'Generative design studio & prototype engine',
      subtitle: 'Generative design studio & prototype engine',
      description: 'An artificial intelligence design assistant that converts text prompts into production-ready UI design tokens, component hierarchies, and responsive prototypes.',
      tagPills: ['AI RESEARCH', 'WEB APP', 'PRODUCT', 'PROTOTYPE'],
      tags: 'AI Research • WebApp • Product Design',
      specs: '18+ Canvas Views • AI Generation Pipeline • 2 Design Systems',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      bgColor: 'bg-[#140b1e]',
      liveUrl: '#',
      caseStudyUrl: '#'
    },
    {
      id: 'nexus-health',
      title: 'NEXUS HEALTH',
      heading: 'Telemedicine portal & patient vitals monitor',
      subtitle: 'Telemedicine portal & patient vitals monitor',
      description: 'Comprehensive digital healthcare solution enabling remote doctor consultations, real-time wearable vital tracking, prescription management, and encrypted health records.',
      tagPills: ['HEALTHCARE', 'MOBILE', 'UX RESEARCH', 'TELEMEDICINE'],
      tags: 'Healthcare UI • Mobile App • UX Research',
      specs: '30+ App Screens • 4 Clinical Workflows • HIPAA Compliant UI',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
      bgColor: 'bg-[#0c1618]',
      liveUrl: '#',
      caseStudyUrl: '#'
    }
  ];

  const designShowcaseItems = [
    { image: '/designs/design-monster-white.png', alt: 'Monster Energy Zero Ultra Poster' },
    { image: '/designs/design-nike-gold.png', alt: 'Nike Mercurial Strike Gold Poster' },
    { image: '/designs/design-puma-speedcat.png', alt: 'Puma Speedcat Forever Faster Poster' },
    { image: '/designs/design-monster-black.png', alt: 'Monster Energy Ultra Black Poster' },
    { image: '/designs/design-blue-chips.png', alt: 'Blue Chips Classic Salted Packaging & Poster' },
  ];

  const handleSelectProject = (project) => {
    setActiveProject(project);
    setViewMode('project-detail');
  };

  const handleNextProject = () => {
    if (!activeProject) return;
    const currentIndex = projects.findIndex((p) => p.id === activeProject.id);
    const nextIndex = (currentIndex + 1) % projects.length;
    setActiveProject(projects[nextIndex]);
  };

  const handlePrevProject = () => {
    if (!activeProject) return;
    const currentIndex = projects.findIndex((p) => p.id === activeProject.id);
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    setActiveProject(projects[prevIndex]);
  };

  return (
    <div className="min-h-screen w-screen bg-[#e4e5e9] font-sans selection:bg-neutral-900 selection:text-white">
      <AnimatePresence mode="wait">
        
        {/* VIEW MODE 1: PROJECT DETAIL PAGE */}
        {viewMode === 'project-detail' && activeProject && (
          <div key="detail" className="h-screen w-screen p-2 sm:p-4 md:p-5 flex items-center justify-center">
            <ProjectDetailPage
              project={activeProject}
              onBack={() => handleNavigateToSection('works')}
              onNextProject={handleNextProject}
              onPrevProject={handlePrevProject}
            />
          </div>
        )}

        {/* VIEW MODE 2: ALL WORKS GALLERY PAGE */}
        {viewMode === 'all-works' && (
          <div key="all-works" className="h-screen w-screen p-2 sm:p-4 md:p-5 flex items-center justify-center">
            <AllWorksPage
              projects={projects}
              onBack={() => handleNavigateToSection('works')}
              onSelectProject={handleSelectProject}
            />
          </div>
        )}

        {/* VIEW MODE 3: MAIN PORTFOLIO SECTIONS (Home -> About -> Works -> Designs) */}
        {viewMode === 'main' && (
          <motion.div
            key="main"
            ref={mainScrollContainerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onAnimationComplete={() => {
              if (targetSection && targetSection !== 'home') {
                const elem = document.getElementById(targetSection);
                if (elem) {
                  elem.scrollIntoView({ behavior: 'auto', block: 'start' });
                }
              }
            }}
            className="h-screen w-screen overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {/* PAGE 1: HOME */}
            <section id="home" className="h-screen w-screen p-2 sm:p-4 md:p-5 flex items-center justify-center snap-start snap-always">
              <div className="w-full max-w-[1280px] h-full max-h-[95vh] bg-white rounded-[24px] sm:rounded-[32px] md:rounded-[40px] border border-neutral-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.06)] p-3 sm:p-6 md:p-8 relative overflow-hidden flex flex-col justify-between">
                
                {/* Header / Navbar */}
                <Navbar onNavigate={handleNavigateToSection} activeHref={activeSection} />

                {/* Hero Main Section Container */}
                <main className="relative w-full pt-2 md:pt-4 flex-1 flex flex-col justify-between overflow-hidden">
                  
                  {/* Big Headline Block with TextType Typewriter Animation */}
                  <div className="w-full flex flex-col items-center justify-center z-10 pointer-events-none select-none pt-1">
                    <TextType
                      text={[getTimeBasedGreeting(), "RENUKARADHYA\nODEYAR"]}
                      typingSpeed={60}
                      deletingSpeed={35}
                      pauseDuration={2000}
                      loop={true}
                      showCursor={true}
                      cursorCharacter="|"
                      cursorClassName="text-[#a3f036] font-extrabold ml-1 animate-pulse"
                      className="font-sohne-600 uppercase text-[2.2rem] sm:text-[4rem] md:text-[5.2rem] lg:text-[6.2rem] tracking-tight leading-[0.9] text-center text-neutral-900"
                    />
                  </div>

                  {/* Center Portrait with Working Pointer Color Spotlight */}
                  <div className="absolute inset-0 flex items-end justify-center z-30 pointer-events-none pt-6 pb-0">
                    <div className="pointer-events-auto">
                      <HeroSpotlight imageSrc="/hero-portrait.png" alt="Renukaradhya Odeyar" />
                    </div>
                  </div>

                  {/* Bottom Layout Row */}
                  <div className="w-full flex flex-col md:flex-row items-end justify-between gap-4 z-20 pt-4 pb-1 relative">
                    
                    {/* Left Content Block */}
                    <motion.div 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.25 }}
                      className="max-w-sm pl-1 sm:pl-2"
                    >
                      <h3 className="font-sans font-bold text-neutral-900 text-xl sm:text-2xl md:text-3xl tracking-tight">
                        UI/UX Designer
                      </h3>

                      <p className="font-sans text-neutral-600 text-xs sm:text-[13px] mt-1.5 leading-relaxed max-w-[300px]">
                        Designing digital products that are clear, usable, and conversion focused.
                      </p>

                      <motion.a
                        href="#about"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-[#a3f036] hover:bg-[#b5ff47] text-black border-2 border-black shadow-[4px_4px_0px_0px_#000000] hover:shadow-[6px_6px_0px_0px_#000000] px-5 py-2.5 rounded-full font-sans font-extrabold text-xs sm:text-[13px] flex items-center gap-2 transition-all duration-300 w-fit mt-3 cursor-pointer group active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#000000]"
                      >
                        <span>About Me ↓</span>
                        <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </motion.a>
                    </motion.div>

                    {/* Right Content Block: Social Pills */}
                    <div className="w-full md:w-auto flex justify-end">
                      <SocialPills />
                    </div>

                  </div>
                </main>
              </div>
            </section>

            {/* PAGE 2: ABOUT ME SECTION */}
            <section id="about" className="h-screen w-screen p-2 sm:p-4 md:p-5 flex items-center justify-center snap-start snap-always">
              <AboutSection />
            </section>

            {/* PAGE 3: WORKS SECTION */}
            <section id="works" ref={worksSectionRef} className="h-screen md:h-[260vh] w-screen relative snap-start snap-always">
              <div className="sticky top-0 h-screen w-screen p-2 sm:p-4 md:p-5 flex items-center justify-center overflow-hidden">
                <WorksSection
                  projects={projects}
                  onSelectProject={handleSelectProject}
                  onViewAll={() => setViewMode('all-works')}
                  containerRef={mainScrollContainerRef}
                  sectionRef={worksSectionRef}
                />
              </div>
            </section>

            {/* PAGE 4: SKILLS SECTION */}
            <section id="skills" className="h-screen w-screen p-2 sm:p-4 md:p-5 flex items-center justify-center snap-start snap-always">
              <SkillsSection />
            </section>

            {/* PAGE 4: DESIGNS SHOWCASE */}
            <section id="designs" className="h-screen w-screen p-2 sm:p-4 md:p-5 flex items-center justify-center snap-start snap-always">
              <div className="w-full max-w-[1280px] h-full max-h-[95vh] bg-white rounded-[24px] sm:rounded-[32px] md:rounded-[40px] border border-neutral-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.06)] p-4 sm:p-8 relative overflow-hidden flex flex-col justify-between">
                
                {/* Clean Title Header */}
                <div className="w-full pb-3 border-b border-neutral-100 z-10 flex items-center justify-between">
                  <h2 className="font-clash text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight">
                    Designs
                  </h2>
                  <span className="text-xs font-sans text-neutral-400 font-semibold">3D Depth Showcase</span>
                </div>

                {/* DepthCarousel 3D Showcase with TextLoop Ribbon Background */}
                <div className="relative w-full flex-1 my-2 overflow-hidden flex items-center justify-center">
                  
                  {/* Background TextLoop Ribbon Effect */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 select-none z-0 scale-105">
                    <TextLoop
                      text="SELECTED DESIGNS ✦ VISUAL ART ✦ UI/UX PROTOTYPES"
                      shape="wave"
                      speed={75}
                      direction="forward"
                      separator="✦"
                      curviness={100}
                      fontSize={42}
                      fontWeight={900}
                      letterSpacing={3}
                      uppercase
                      color="#000000"
                      ribbon
                      ribbonColor="#a3f036"
                      ribbonWidth={80}
                      pauseOnHover={false}
                    />
                  </div>

                  {/* Foreground DepthCarousel */}
                  <div className="relative z-10 w-full flex items-center justify-center">
                    <DepthCarousel
                      items={designShowcaseItems}
                      depth={200}
                      spread={125}
                      tilt={16}
                      tiltDirection="right"
                      perspective={1400}
                      visibleCards={3}
                      falloff={0.18}
                      blur={4}
                      autoplay={true}
                      autoplayDelay={3500}
                      loop={true}
                      cardWidth={560}
                      cardHeight={350}
                      radius={20}
                    />
                  </div>
                </div>

                {/* Clean Minimalist Footer */}
                <div className="flex items-center justify-end pt-1 text-xs text-neutral-400 font-sans">
                  <a href="#home" className="hover:text-neutral-900 font-semibold transition-colors flex items-center gap-1">
                    <span>Back to Top</span>
                    <span>↑</span>
                  </a>
                </div>

              </div>
            </section>

            {/* PAGE 5: CONTACT SECTION */}
            <section id="contact" className="h-screen w-screen p-2 sm:p-4 md:p-5 flex items-center justify-center snap-start snap-always">
              <ContactSection />
            </section>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
