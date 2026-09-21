import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import PillNav from './PillNav';

export default function Navbar({ onNavigate, activeHref = '#home' }) {
  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About Me', href: '#about' },
    { label: 'Works', href: '#works' },
    { label: 'Skills', href: '#skills' },
    { label: 'Designs', href: '#designs' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavItemClick = (e, item) => {
    e.preventDefault();
    const targetId = item.href.replace('#', '');
    
    if (onNavigate) {
      onNavigate(targetId);
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <header className="w-full pt-1 sm:pt-2 pb-1 sm:pb-2 px-1 sm:px-4 flex items-center justify-between gap-2 sm:gap-4 z-40 relative">
      {/* Left Badge: Available Status */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2 sm:gap-2.5 bg-white border border-neutral-200/90 rounded-full px-2.5 sm:px-4 py-1.5 sm:py-2 shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-md transition-all duration-300 z-50 flex-shrink-0"
      >
        <span className="relative flex h-2 sm:h-2.5 w-2 sm:w-2.5 items-center justify-center">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 sm:h-2.5 w-2 sm:w-2.5 bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
        </span>
        <span className="font-sans text-[11px] sm:text-[13px] font-semibold tracking-tight text-neutral-900 leading-none whitespace-nowrap">
          <span className="hidden sm:inline">Open to Design Opportunities</span>
          <span className="sm:hidden">Available</span>
        </span>
      </motion.div>

      {/* Center React Bits PillNav with GSAP Circle Liquid Hover Animation (Desktop Only) */}
      <div className="hidden md:flex flex-1 justify-center z-50">
        <PillNav
          items={navItems}
          activeHref={activeHref}
          onNavItemClick={handleNavItemClick}
          baseColor="#0f172a"
          pillColor="#ffffff"
          hoveredPillTextColor="#ffffff"
          pillTextColor="#0f172a"
          ease="power3.easeOut"
          initialLoadAnimation={true}
        />
      </div>

      {/* Right Button: Let's Talk (Brutalist Neon Green Style) */}
      <motion.a
        href="#contact"
        onClick={(e) => handleNavItemClick(e, { href: '#contact' })}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="bg-[#a3f036] hover:bg-[#b5ff47] text-black px-3.5 sm:px-7 py-1.5 sm:py-2.5 rounded-full font-sans font-extrabold text-[12px] sm:text-[15px] flex items-center gap-1 sm:gap-2 border-[2px] sm:border-[2.5px] border-black shadow-[2px_2px_0px_0px_#000000] sm:shadow-[4px_4px_0px_0px_#000000] hover:shadow-[6px_6px_0px_0px_#000000] transition-all duration-200 cursor-pointer group z-50 whitespace-nowrap flex-shrink-0"
      >
        <span>Let's Talk</span>
        <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </motion.a>
    </header>
  );
}

