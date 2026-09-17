import React from 'react';
import { ArrowUpRight, ArrowLeft, Target, Lightbulb, TrendingUp, ShieldCheck, Zap, Layers, Layout, CheckCircle2, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProjectDetailPage({ project, onBack, onNextProject, onPrevProject }) {
  if (!project) return null;

  // Custom project case study details fallback or tailored data
  const caseStudyDetails = getCaseStudyDetails(project);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-[1240px] h-full max-h-[92vh] bg-white rounded-[24px] sm:rounded-[32px] md:rounded-[40px] border border-neutral-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.08)] p-4 sm:p-6 md:p-8 relative overflow-hidden flex flex-col justify-between my-auto"
    >
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-neutral-100 z-10 flex-shrink-0">
        <button
          onClick={onBack}
          className="font-serif font-bold text-neutral-700 hover:text-black flex items-center gap-2 text-sm sm:text-base cursor-pointer transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Works</span>
        </button>

        {onNextProject && (
          <div className="flex items-center gap-3 font-serif text-xs sm:text-sm text-neutral-500">
            {onPrevProject && (
              <button onClick={onPrevProject} className="hover:text-black transition-colors cursor-pointer">
                ← Previous
              </button>
            )}
            <span>|</span>
            <button onClick={onNextProject} className="hover:text-black transition-colors cursor-pointer font-bold flex items-center gap-1">
              <span>Next Project</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Main Scrollable Case Study Container */}
      <div className="w-full flex-1 overflow-y-auto my-3 sm:my-4 pr-1 sm:pr-3 space-y-10 sm:space-y-14 scroll-smooth">
        
        {/* SECTION 1: HERO & MAIN OVERVIEW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center pt-2">
          {/* Left Info Block */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-xs font-serif italic text-amber-600 uppercase tracking-widest font-bold mb-1">
              Detailed Case Study
            </span>
            
            <h1 className="font-serif font-black text-3xl sm:text-5xl lg:text-6xl text-neutral-900 tracking-tight uppercase drop-shadow-sm leading-tight">
              {project.title}
            </h1>

            <h2 className="font-serif font-bold text-neutral-900 text-base sm:text-xl mt-3 leading-snug">
              {project.heading || project.subtitle}
            </h2>

            <p className="font-serif text-neutral-700 text-xs sm:text-sm md:text-base mt-3 leading-relaxed">
              {project.description}
            </p>

            {/* Category Tags */}
            <div className="flex flex-wrap items-center gap-2 mt-5">
              {project.tagPills?.map((tag) => (
                <span
                  key={tag}
                  className="border border-neutral-800 rounded-lg px-3 py-1 text-xs font-serif font-bold uppercase tracking-wide text-neutral-900 bg-white shadow-xs"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mt-6">
              {/* LIVE Button */}
              <motion.a
                href={project.liveUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-black hover:bg-neutral-800 text-white px-6 py-2.5 rounded-full font-serif font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer inline-flex items-center justify-center"
              >
                LIVE DEMO
              </motion.a>

              {/* VIEW CASE STUDY Button (Neon Green Brutalism Style) */}
              <motion.a
                href={project.caseStudyUrl || '#'}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-[#a3f036] hover:bg-[#b5ff47] text-black border-2 border-black shadow-[4px_4px_0px_0px_#000000] hover:shadow-[6px_6px_0px_0px_#000000] px-6 py-2.5 rounded-full font-serif font-extrabold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#000000]"
              >
                <span>VIEW CASE STUDY</span>
                <ArrowUpRight className="w-4 h-4 stroke-[3]" />
              </motion.a>
            </div>

            {/* Project Specs Summary */}
            <p className="font-serif font-bold text-xs sm:text-sm text-neutral-900 mt-5 tracking-tight">
              {project.specs}
            </p>
          </div>

          {/* Right Visual Showcase Block */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <motion.div 
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full max-h-[420px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-neutral-200/90 relative bg-neutral-900 flex items-center justify-center"
            >
              <img
                src={imageSrcOverride(project.image)}
                alt={project.title}
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
              />
            </motion.div>
          </div>
        </div>

        {/* SECTION 2: EXECUTIVE SUMMARY & METRICS BAR */}
        <div className="bg-[#f8f9fc] rounded-[24px] sm:rounded-[32px] border border-neutral-200/90 p-5 sm:p-7 md:p-8 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200">
            <div className="px-3 py-2 flex flex-col items-center sm:items-start">
              <span className="font-serif text-xs font-bold text-neutral-500 uppercase">ROLE & RESPONSIBILITY</span>
              <span className="font-sans font-bold text-neutral-900 text-sm sm:text-base mt-1">Lead UI/UX & Product Designer</span>
            </div>

            <div className="px-3 py-2 flex flex-col items-center sm:items-start">
              <span className="font-serif text-xs font-bold text-neutral-500 uppercase">PROJECT DURATION</span>
              <span className="font-sans font-bold text-neutral-900 text-sm sm:text-base mt-1">6 - 8 Weeks Sprint</span>
            </div>

            <div className="px-3 py-2 flex flex-col items-center sm:items-start">
              <span className="font-serif text-xs font-bold text-neutral-500 uppercase">CORE DELIVERABLE</span>
              <span className="font-sans font-bold text-neutral-900 text-sm sm:text-base mt-1">Design System & Interactive App UI</span>
            </div>
          </div>
        </div>

        {/* SECTION 3: THE PROBLEM STATEMENT */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 border border-amber-300 flex items-center justify-center">
              <Target className="w-4 h-4 stroke-[2.5]" />
            </div>
            <h3 className="font-serif font-black text-xl sm:text-2xl text-neutral-900 uppercase">
              The Problem Statement
            </h3>
          </div>

          <p className="font-serif text-neutral-700 text-sm sm:text-base leading-relaxed max-w-3xl">
            {caseStudyDetails.problemOverview}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {caseStudyDetails.problems.map((prob, i) => (
              <div key={i} className="bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200/90 shadow-sm flex flex-col justify-between">
                <span className="w-7 h-7 rounded-lg bg-neutral-900 text-white font-mono font-bold text-xs flex items-center justify-center mb-3">
                  0{i + 1}
                </span>
                <h4 className="font-sans font-bold text-neutral-900 text-sm sm:text-base mb-1.5">{prob.title}</h4>
                <p className="font-serif text-neutral-600 text-xs sm:text-sm leading-relaxed">{prob.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 4: THE SOLUTION & UX STRATEGY */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center justify-center">
              <Lightbulb className="w-4 h-4 stroke-[2.5]" />
            </div>
            <h3 className="font-serif font-black text-xl sm:text-2xl text-neutral-900 uppercase">
              The Solution & Design Approach
            </h3>
          </div>

          <p className="font-serif text-neutral-700 text-sm sm:text-base leading-relaxed max-w-3xl">
            {caseStudyDetails.solutionOverview}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {caseStudyDetails.solutions.map((sol, i) => (
              <div key={i} className="bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200/90 shadow-sm flex flex-col justify-between border-l-4 border-l-[#a3f036]">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-sans font-bold text-neutral-900 text-sm sm:text-base">{sol.title}</h4>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>
                <p className="font-serif text-neutral-600 text-xs sm:text-sm leading-relaxed">{sol.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 5: KEY FEATURES & UX HIGHLIGHTS */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 border border-blue-300 flex items-center justify-center">
              <Layers className="w-4 h-4 stroke-[2.5]" />
            </div>
            <h3 className="font-serif font-black text-xl sm:text-2xl text-neutral-900 uppercase">
              Key Features & UX Highlights
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
            {caseStudyDetails.features.map((feat, i) => (
              <div key={i} className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs flex flex-col justify-between">
                <div className="w-8 h-8 rounded-xl bg-neutral-100 text-neutral-900 flex items-center justify-center mb-3 font-bold text-xs">
                  {i === 0 && <Layout className="w-4 h-4" />}
                  {i === 1 && <Zap className="w-4 h-4" />}
                  {i === 2 && <ShieldCheck className="w-4 h-4" />}
                  {i === 3 && <TrendingUp className="w-4 h-4" />}
                </div>
                <h5 className="font-sans font-bold text-neutral-900 text-xs sm:text-sm mb-1">{feat.title}</h5>
                <p className="font-serif text-neutral-500 text-xs leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 6: OUTCOMES & MEASURABLE IMPACT */}
        <div className="bg-neutral-900 text-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 relative overflow-hidden">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-[#a3f036] text-black flex items-center justify-center font-bold">
              <TrendingUp className="w-4 h-4 stroke-[3]" />
            </div>
            <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-white uppercase tracking-tight">
              Outcomes & Impact
            </h3>
          </div>

          <p className="font-serif text-neutral-300 text-xs sm:text-sm leading-relaxed max-w-2xl mb-6">
            {caseStudyDetails.impactOverview}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-neutral-800">
            {caseStudyDetails.metrics.map((m, i) => (
              <div key={i} className="text-center sm:text-left">
                <span className="font-sans font-black text-3xl sm:text-4xl text-[#a3f036] leading-none block">
                  {m.value}
                </span>
                <span className="font-serif font-bold text-xs text-neutral-300 uppercase mt-1 block">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-neutral-100 text-xs text-neutral-400 font-serif flex-shrink-0">
        <span>Project Case Study — {project.title}</span>
        {onNextProject && (
          <button onClick={onNextProject} className="hover:text-neutral-900 font-bold transition-colors cursor-pointer flex items-center gap-1">
            <span>Next Project</span>
            <span>→</span>
          </button>
        )}
      </div>
    </motion.div>
  );
}

function imageSrcOverride(img) {
  return img || '/eco-snap.jpg';
}

function getCaseStudyDetails(project) {
  return {
    problemOverview: `Before this redesign, users experienced friction in navigating legacy workflows, leading to drop-offs during core transactions and high support ticket volume.`,
    problems: [
      {
        title: 'Complex Navigation Hierarchy',
        desc: 'Over-nested sub-menus caused confusion and increased task completion times.'
      },
      {
        title: 'Inconsistent UI Components',
        desc: 'Multiple visual styles across modules created a fragmented brand experience.'
      },
      {
        title: 'Lack of Real-Time Feedback',
        desc: 'Users lacked immediate confirmation during data submissions and status changes.'
      }
    ],
    solutionOverview: `We restructured the end-to-end user journey, introduced a unified component design system, and implemented clear micro-interactions for instant visual feedback.`,
    solutions: [
      {
        title: 'Streamlined Information Architecture',
        desc: 'Simplified core navigation to a 3-click workflow, reducing friction points.'
      },
      {
        title: 'Atomic Design System',
        desc: 'Created tokenized reusable components for consistent cross-platform scaling.'
      },
      {
        title: 'Responsive & Accessible Layouts',
        desc: 'Ensured high-contrast readability (WCAG AA) and mobile responsiveness.'
      }
    ],
    features: [
      {
        title: 'Unified Dashboard',
        desc: 'Centralized key metrics and quick-action triggers in one clean view.'
      },
      {
        title: 'Instant Micro-Interactions',
        desc: 'Animated feedback states for form submissions and item actions.'
      },
      {
        title: 'WCAG 2.1 Compliance',
        desc: 'High-contrast typography and keyboard navigation accessibility.'
      },
      {
        title: 'Scalable Component Tokens',
        desc: 'Design system built for seamless developer handoff & rapid updates.'
      }
    ],
    impactOverview: `The redesigned platform delivered significant improvements in user engagement, task velocity, and user satisfaction ratings post-launch.`,
    metrics: [
      { value: '+45%', label: 'User Engagement' },
      { value: '-60%', label: 'Task Completion Time' },
      { value: '98%', label: 'Positive CSAT Rating' }
    ]
  };
}
