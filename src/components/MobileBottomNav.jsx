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
              className="relative flex flex-col items-center justify-center w-12 h-11 rounded-2xl cursor-pointer transition-all duration-200 active:scale-90 group focus:outline-none"
            >
              {/* Subtle Active Pill Glow Background */}
              {isActive && (
                <motion.div
                  layoutId="bottomNavPill"
                  className="absolute inset-0 bg-neutral-100 rounded-2xl -z-10"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                />
              )}

              {/* Icon with Dynamic Stroke & Color */}
              <Icon
                className={`w-5 h-5 transition-all duration-200 ${
                  isActive
                    ? 'text-neutral-950 scale-110'
                    : 'text-neutral-400 group-hover:text-neutral-700'
                }`}
                strokeWidth={isActive ? 2.5 : 1.8}
              />

              {/* Active Neon Lime Dot (Instagram / iOS Style) */}
              <div className="h-1.5 flex items-center justify-center mt-1">
                {isActive ? (
                  <motion.span
                    layoutId="bottomNavDot"
                    className="w-1.5 h-1.5 rounded-full bg-[#82cf17] shadow-[0_0_8px_#a3f036]"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  />
                ) : (
                  <span className="w-1.5 h-1.5 opacity-0" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
