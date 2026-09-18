import React from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AllWorksPage({ projects = [], onBack, onSelectProject }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.35 }}
      className="w-full max-w-[1280px] h-full max-h-[95vh] relative flex flex-col justify-between my-auto p-2 sm:p-4"
    >
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-neutral-300/80 z-10 flex-shrink-0">
        <button
          onClick={onBack}
          className="font-serif font-bold text-neutral-800 hover:text-black flex items-center gap-2 text-sm sm:text-base cursor-pointer transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Work section</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="font-serif text-sm sm:text-base font-extrabold text-neutral-900">
            All Featured Projects ({projects.length})
          </span>
        </div>
      </div>

      {/* Projects List Container */}
      <div className="w-full flex-1 overflow-y-auto my-3 sm:my-4 pr-1 sm:pr-3 space-y-6 sm:space-y-8 scroll-smooth scrollbar-thin scrollbar-thumb-neutral-300">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="bg-white rounded-[24px] sm:rounded-[32px] border border-neutral-200/90 p-5 sm:p-7 md:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.06)] grid grid-cols-1 lg:grid-cols-12 gap-6 items-center group hover:shadow-xl transition-all duration-300"
          >
            {/* Left Content Column */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <span className="text-xs font-serif italic text-amber-600 uppercase tracking-widest font-bold mb-1">
                Project #{String(index + 1).padStart(2, '0')}
              </span>
              
              <h2 className="font-serif font-black text-2xl sm:text-4xl text-neutral-900 tracking-tight uppercase">
                {project.title}
              </h2>

              <h3 className="font-serif font-bold text-neutral-800 text-sm sm:text-base mt-2">
                {project.heading || project.subtitle}
              </h3>

              <p className="font-serif text-neutral-600 text-xs sm:text-sm mt-2.5 leading-relaxed max-w-lg">
                {project.description}
              </p>

              {/* Tag Pills */}
              <div className="flex flex-wrap items-center gap-2 mt-4">
                {project.tagPills?.map((tag) => (
                  <span
                    key={tag}
                    className="border border-neutral-800 rounded-lg px-2.5 py-0.5 text-[11px] font-serif font-bold uppercase text-neutral-900 bg-white shadow-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Open Case Study Button */}
              <div className="flex flex-wrap items-center gap-4 mt-5 sm:mt-6">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onSelectProject(project)}
                  className="bg-[#a3f036] hover:bg-[#b5ff47] text-black border-2 border-black shadow-[4px_4px_0px_0px_#000000] hover:shadow-[6px_6px_0px_0px_#000000] px-5 sm:px-6 py-2.5 rounded-full font-serif font-extrabold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#000000]"
                >
                  <span>Open Full Case Study</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </motion.button>
              </div>

              <p className="font-serif font-bold text-xs text-neutral-500 mt-3.5">
                {project.specs}
              </p>
            </div>

            {/* Right Showcase Image */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <div 
                onClick={() => onSelectProject(project)}
                className="w-full h-[240px] sm:h-[300px] md:h-[340px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-neutral-200 relative bg-neutral-900 cursor-pointer group-hover:shadow-2xl transition-all"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Footer Info */}
      <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-neutral-300/80 text-xs text-neutral-500 font-serif flex-shrink-0">
        <span>Showing all {projects.length} projects</span>
        <button onClick={onBack} className="hover:text-neutral-900 font-semibold transition-colors cursor-pointer">
          Back to Work section ↑
        </button>
      </div>
    </motion.div>
  );
}
