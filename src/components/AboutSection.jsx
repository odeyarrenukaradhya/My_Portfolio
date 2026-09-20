import React, { useState } from 'react';
import { Download, Menu, Linkedin, Sparkles, Briefcase, Award, Heart, ArrowRight, CheckCircle2, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ResumeModal from './ResumeModal';

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState('overview');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredStat, setHoveredStat] = useState(null);
  const [selectedPill, setSelectedPill] = useState(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'approach', label: 'My Approach', icon: Sparkles },
    { id: 'experience', label: 'Impact & Milestones', icon: Briefcase },
    { id: 'hobbies', label: 'Beyond Work', icon: Heart },
  ];

  const stats = [
    {
      id: 'products',
      value: '3+',
      label: 'PRODUCTS DESIGNED',
      details: 'SaaS platforms, Web Applications & Enterprise Dashboards'
    },
    {
      id: 'projects',
      value: '5+',
      label: 'PROJECTS DELIVERED',
      details: 'End-to-end UX research, wireframing & UI design systems'
    },
    {
      id: 'clients',
      value: '3',
      label: 'CLIENT PROJECTS',
      details: 'Active collaborations with startups and growing businesses'
    }
  ];

  const approachPoints = [
    {
      title: 'User-Centric & Research-Driven',
      desc: 'Understanding user pain points deeply before placing a single pixel.',
      tag: 'Research'
    },
    {
      title: 'Systematic Design Systems',
      desc: 'Building scalable tokenized UI component libraries for rapid product iteration.',
      tag: 'Design Systems'
    },
    {
      title: 'Conversion-Focused Aesthetics',
      desc: 'Balancing visually striking modern aesthetics with clean, intuitive usability.',
      tag: 'UI/UX'
    }
  ];

  const milestones = [
    { year: '2024 - Present', role: 'UI/UX & Product Designer', company: 'Freelance & SaaS Projects' },
    { year: '2023 - 2024', role: 'Frontend & UI Specialist', company: 'Web & SaaS Solutions' },
    { year: '2022 - 2023', role: 'UX Researcher & Wireframer', company: 'Digital Product Design' }
  ];

  const personalInterests = [
    '🌿 Nature Photography',
    '🎨 Sketching & Painting',
    '✨ 3D Motion & Spline Explorations'
  ];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 50;
    const y = (e.clientY - rect.top - rect.height / 2) / 50;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div className="w-full max-w-[1280px] min-h-[92vh] md:h-full md:max-h-[95vh] bg-white rounded-[24px] sm:rounded-[32px] md:rounded-[40px] border border-neutral-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.06)] p-3 sm:p-6 md:p-8 relative overflow-y-auto md:overflow-hidden flex flex-col justify-between">
      
      {/* Top Header & Tab Controls */}
      <div className="w-full flex flex-col items-center pt-1 sm:pt-2 pb-2 sm:pb-3 z-10">
        <h2 className="font-serif font-bold text-2xl sm:text-5xl md:text-6xl text-neutral-900 tracking-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)] text-center">
          About Me
        </h2>

        {/* Interactive Tab Switcher */}
        <div className="flex flex-nowrap sm:flex-wrap items-center justify-start sm:justify-center gap-1 sm:gap-2 mt-2 sm:mt-3 bg-neutral-100/90 p-1 sm:p-1.5 rounded-full border border-neutral-200 shadow-inner max-w-full overflow-x-auto scrollbar-none w-full sm:w-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-2.5 sm:px-5 py-1 sm:py-2 rounded-full font-sans font-bold text-[11px] sm:text-sm flex items-center gap-1 sm:gap-1.5 transition-all duration-300 cursor-pointer whitespace-nowrap flex-shrink-0 ${
                  isActive ? 'text-black' : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 bg-[#a3f036] rounded-full border border-black shadow-sm"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1 sm:gap-1.5">
                  <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>{tab.label}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Center Main Interactive Card */}
      <motion.div 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${-mousePos.y}deg) rotateY(${mousePos.x}deg)`,
          transition: 'transform 0.15s ease-out'
        }}
        className="bg-[#e4e6ea] rounded-[24px] sm:rounded-[32px] border border-neutral-300/70 p-4 sm:p-6 md:p-7 shadow-inner w-full max-w-5xl mx-auto my-auto relative overflow-hidden flex flex-col md:flex-row items-center md:items-stretch justify-between gap-5 sm:gap-7"
      >
        {/* Interactive Left Cutout Portrait */}
        <div className="w-full md:w-[230px] lg:w-[260px] flex-shrink-0 flex flex-col items-center justify-end z-10 group">
          <div className="relative overflow-hidden rounded-2xl md:rounded-t-2xl md:rounded-b-none border-2 border-neutral-400/40 shadow-xl bg-neutral-200/50">
            <img
              src="/hero/hero-3.png"
              alt="Renukaradhya Odeyar Portrait"
              className="w-[160px] sm:w-[190px] md:w-[230px] lg:w-[250px] h-auto object-cover object-top filter grayscale group-hover:grayscale-0 contrast-110 transition-all duration-500 transform group-hover:scale-105"
            />
          </div>
        </div>

        {/* Right Dynamic Content Pane */}
        <div className="flex-1 flex flex-col justify-between text-center md:text-left z-20 w-full max-w-xl mx-auto py-1">
          
          <AnimatePresence mode="wait">
            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col justify-between h-full"
              >
                <div>
                  <p className="font-serif text-neutral-800 text-xs sm:text-sm md:text-base leading-relaxed font-normal">
                    I have worked on SaaS platforms, business websites, and digital products, helping transform ideas into intuitive and user-friendly experiences. My approach combines design thinking, usability, and problem-solving to create meaningful solutions.
                  </p>

                  <p className="font-serif font-bold text-neutral-900 text-xs sm:text-sm md:text-base mt-2.5 sm:mt-3">
                    UI/UX Designer • Product Designer • Frontend Designer
                  </p>
                </div>

                {/* Interactive Stats Box with Hover Tooltips */}
                <div className="bg-white rounded-[20px] sm:rounded-[24px] p-3 sm:p-4 border border-neutral-200/90 shadow-[0_10px_25px_rgba(0,0,0,0.07)] grid grid-cols-3 divide-x divide-neutral-200 mt-3 sm:mt-5 w-full">
                  {stats.map((stat) => (
                    <motion.div
                      key={stat.id}
                      onMouseEnter={() => setHoveredStat(stat.id)}
                      onMouseLeave={() => setHoveredStat(null)}
                      whileHover={{ scale: 1.04 }}
                      className="px-2 flex flex-col items-center justify-center cursor-pointer relative group"
                    >
                      <span className="font-serif font-extrabold text-2xl sm:text-3xl md:text-4xl text-neutral-900 leading-none group-hover:text-[#456b10] transition-colors">
                        {stat.value}
                      </span>
                      <span className="font-serif text-[10px] sm:text-[11px] font-bold text-neutral-800 tracking-wide uppercase mt-1.5 text-center leading-tight">
                        {stat.label.split(' ')[0]}<br />{stat.label.split(' ').slice(1).join(' ')}
                      </span>

                      {/* Interactive Hover Tooltip */}
                      {hoveredStat === stat.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute bottom-full mb-2 bg-neutral-900 text-white text-[11px] p-2 rounded-xl shadow-xl border border-neutral-700 w-48 text-center pointer-events-none z-50 font-sans"
                        >
                          {stat.details}
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* TAB 2: MY APPROACH */}
            {activeTab === 'approach' && (
              <motion.div
                key="approach"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-2.5 sm:space-y-3 my-auto"
              >
                {approachPoints.map((pt, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 6 }}
                    className="bg-white/90 backdrop-blur-sm p-3 rounded-2xl border border-neutral-200 shadow-sm flex items-start gap-3 text-left hover:border-black transition-all cursor-pointer group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#a3f036] border border-black flex items-center justify-center font-bold text-black flex-shrink-0 group-hover:scale-110 transition-transform">
                      {i + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-sans font-bold text-neutral-900 text-xs sm:text-sm">
                          {pt.title}
                        </h4>
                        <span className="text-[10px] bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full font-sans font-medium border border-neutral-200">
                          {pt.tag}
                        </span>
                      </div>
                      <p className="font-serif text-neutral-600 text-xs mt-0.5 leading-relaxed">
                        {pt.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* TAB 3: IMPACT & MILESTONES */}
            {activeTab === 'experience' && (
              <motion.div
                key="experience"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-2.5 my-auto"
              >
                {milestones.map((m, i) => (
                  <div
                    key={i}
                    className="bg-white/90 p-3 rounded-2xl border border-neutral-200 flex items-center justify-between text-left hover:border-black transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-neutral-900 text-white flex items-center justify-center font-bold text-xs">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-sans font-bold text-neutral-900 text-xs sm:text-sm">
                          {m.role}
                        </h4>
                        <p className="font-serif text-neutral-500 text-xs">
                          {m.company}
                        </p>
                      </div>
                    </div>
                    <span className="font-sans font-bold text-[11px] bg-[#a3f036] text-black px-2.5 py-1 rounded-full border border-black shadow-xs">
                      {m.year}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}

            {/* TAB 4: BEYOND WORK */}
            {activeTab === 'hobbies' && (
              <motion.div
                key="hobbies"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="my-auto"
              >
                <p className="font-serif text-neutral-800 text-xs sm:text-sm mb-3">
                  Click chips below to explore what drives my creativity outside of product design:
                </p>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  {personalInterests.map((interest, i) => {
                    const isSelected = selectedPill === i;
                    return (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedPill(isSelected ? null : i)}
                        className={`px-3 py-1.5 rounded-full font-sans font-semibold text-xs border transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-[#a3f036] text-black border-black shadow-sm'
                            : 'bg-white text-neutral-800 border-neutral-300 hover:border-neutral-900'
                        }`}
                      >
                        <span>{interest}</span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-black" />}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Action Pill Buttons Row */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-4 sm:mt-5 pt-2 border-t border-neutral-300/50">
            {/* Resume Button */}
            <motion.button
              onClick={() => setIsResumeOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#a3f036] hover:bg-[#b5ff47] text-black border-2 border-black shadow-[4px_4px_0px_0px_#000000] hover:shadow-[6px_6px_0px_0px_#000000] px-5 sm:px-6 py-2 rounded-full font-serif font-extrabold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#000000]"
            >
              <span>Resume</span>
              <Download className="w-3.5 h-3.5 stroke-[2.5]" />
            </motion.button>

            {/* Case Studies Button */}
            <motion.a
              href="#works"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#a3f036] hover:bg-[#b5ff47] text-black border-2 border-black shadow-[4px_4px_0px_0px_#000000] hover:shadow-[6px_6px_0px_0px_#000000] px-5 sm:px-6 py-2 rounded-full font-serif font-extrabold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#000000]"
            >
              <span>Case Studies</span>
              <Menu className="w-3.5 h-3.5 stroke-[2.5]" />
            </motion.a>

            {/* LinkedIn Button */}
            <motion.a
              href="https://www.linkedin.com/in/renukaradhyaodeyar/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#a3f036] hover:bg-[#b5ff47] text-black border-2 border-black shadow-[4px_4px_0px_0px_#000000] hover:shadow-[6px_6px_0px_0px_#000000] px-5 sm:px-6 py-2 rounded-full font-serif font-extrabold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#000000]"
            >
              <span>LinkedIn</span>
              <Linkedin className="w-3.5 h-3.5 stroke-[2.5]" />
            </motion.a>
          </div>

        </div>
      </motion.div>

      {/* Footer */}
      <div className="flex items-center justify-end pt-1 border-t border-neutral-100 text-xs text-neutral-400 font-serif">
        <a href="#home" className="hover:text-neutral-900 font-semibold transition-colors flex items-center gap-1">
          <span>Back to Top</span>
          <span>↑</span>
        </a>
      </div>

      {/* Resume Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </div>
  );
}
