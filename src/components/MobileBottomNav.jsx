import React from 'react';
import { Home, User, Briefcase, Sparkles, Palette, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MobileBottomNav({ activeSection = '#home', onNavigate }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About Me', icon: User },
    { id: 'works', label: 'Works', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: Sparkles },
    { id: 'designs', label: 'Designs', icon: Palette },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const handleClick = (id) => {
    if (onNavigate) {
      onNavigate(id);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const cleanActiveId = activeSection.replace('#', '');

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-0 inset-x-0 z-[999] md:hidden bg-white/95 backdrop-blur-2xl border-t border-neutral-200/90 shadow-[0_-4px_25px_rgba(0,0,0,0.08)] px-2 pt-2 pb-[max(0.65rem,env(safe-area-inset-bottom))] select-none"
    >
      <div className="flex items-center justify-around w-full max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = cleanActiveId === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              aria-label={item.label}
              className="relative flex flex-col items-center justify-center py-1 px-1.5 rounded-xl cursor-pointer transition-all duration-200 active:scale-95 group focus:outline-none min-w-[48px]"
            >
              {/* Subtle Active Pill Glow Background */}
              {isActive && (
                <motion.div
                  layoutId="bottomNavPill"
                  className="absolute inset-0 bg-neutral-100/90 rounded-xl -z-10 shadow-xs"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                />
              )}

              {/* Icon with Dynamic Stroke & Color */}
              <Icon
                className={`w-4.5 h-4.5 transition-all duration-200 ${
                  isActive
                    ? 'text-neutral-950 scale-105'
                    : 'text-neutral-400 group-hover:text-neutral-700'
                }`}
                strokeWidth={isActive ? 2.5 : 1.9}
              />

              {/* Label */}
              <span
                className={`text-[9.5px] font-sans tracking-tight transition-colors duration-200 leading-none mt-1 ${
                  isActive ? 'text-neutral-950 font-extrabold' : 'text-neutral-400 font-medium'
                }`}
              >
                {item.label}
              </span>

              {/* Active Neon Lime Dot Indicator */}
              {isActive && (
                <motion.span
                  layoutId="bottomNavDot"
                  className="w-1 h-1 rounded-full bg-[#82cf17] shadow-[0_0_6px_#a3f036] mt-0.5"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
