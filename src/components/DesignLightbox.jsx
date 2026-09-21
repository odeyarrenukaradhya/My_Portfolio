import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function DesignLightbox({
  item,
  items = [],
  onClose,
  onNavigate
}) {
  const currentIndex = items.findIndex((d) => d.image === item?.image);

  const handleNext = useCallback(() => {
    if (items.length <= 1) return;
    const nextIndex = (currentIndex + 1) % items.length;
    onNavigate?.(nextIndex);
  }, [currentIndex, items.length, onNavigate]);

  const handlePrev = useCallback(() => {
    if (items.length <= 1) return;
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    onNavigate?.(prevIndex);
  }, [currentIndex, items.length, onNavigate]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose, handleNext, handlePrev]);

  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="design-lightbox-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 md:p-10 select-none"
        onClick={onClose}
      >
        {/* TOP RIGHT CLOSE ICON */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Close design"
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-white hover:text-[#a3f036] border border-white/20 hover:border-[#a3f036]/50 backdrop-blur-md flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xl active:scale-95 group"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 group-hover:rotate-90" />
          <span className="sr-only">Close</span>
        </button>

        {/* PREVIOUS BUTTON */}
        {items.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Previous design"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-white hover:text-[#a3f036] border border-white/20 hover:border-[#a3f036]/50 backdrop-blur-md flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xl active:scale-95"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* NEXT BUTTON */}
        {items.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next design"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-white hover:text-[#a3f036] border border-white/20 hover:border-[#a3f036]/50 backdrop-blur-md flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xl active:scale-95"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* CENTER ELABORATED IMAGE CONTAINER */}
        <motion.div
          key={item.image}
          initial={{ opacity: 0, scale: 0.92, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 10 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-h-[82vh] max-w-[92vw] flex flex-col items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={item.image}
            alt={item.alt || 'Design showcase image'}
            className="max-h-[78vh] sm:max-h-[80vh] max-w-[92vw] sm:max-w-[85vw] object-contain rounded-2xl sm:rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.85)] border border-white/15 pointer-events-auto"
          />
        </motion.div>

        {/* BOTTOM CAPTION & COUNTER BAR */}
        <div
          className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-neutral-900/90 backdrop-blur-md border border-white/20 text-white shadow-2xl max-w-[92vw]"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="w-2 h-2 rounded-full bg-[#a3f036] flex-shrink-0 animate-pulse" />
          <span className="font-sans text-xs sm:text-sm font-semibold tracking-tight text-neutral-100 truncate max-w-[200px] xs:max-w-[280px] sm:max-w-[420px]">
            {item.alt}
          </span>
          {items.length > 1 && (
            <span className="text-[11px] font-mono text-neutral-400 border-l border-neutral-700 pl-2.5 sm:pl-3 flex-shrink-0">
              {currentIndex + 1} / {items.length}
            </span>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
