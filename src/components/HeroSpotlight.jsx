import React, { useState, useRef } from 'react';

export default function HeroSpotlight({ imageSrc, alt = "Renukaradhya Odeyar" }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, active: false });
  const [spotlightRadius, setSpotlightRadius] = useState(120);
  const wrapperRef = useRef(null);
  const touchTimerRef = useRef(null);

  useEffect(() => {
    const updateRadius = () => {
      if (typeof window !== 'undefined') {
        setSpotlightRadius(window.innerWidth < 640 ? 90 : 125);
      }
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => {
      window.removeEventListener('resize', updateRadius);
      if (touchTimerRef.current) clearTimeout(touchTimerRef.current);
    };
  }, []);

  const handleMouseMove = (e) => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, active: false }));
  };

  const handleTouchMove = (e) => {
    if (!wrapperRef.current || !e.touches[0]) return;
    if (touchTimerRef.current) clearTimeout(touchTimerRef.current);
    const rect = wrapperRef.current.getBoundingClientRect();
    setMousePos({
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top,
      active: true,
    });
  };

  const handleTouchEnd = () => {
    if (touchTimerRef.current) clearTimeout(touchTimerRef.current);
    touchTimerRef.current = setTimeout(() => {
      setMousePos((prev) => ({ ...prev, active: false }));
    }, 450);
  };

  return (
    <div className="relative flex justify-center items-end w-full select-none z-20 md:z-30">
      <div
        ref={wrapperRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchMove}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative inline-block cursor-crosshair overflow-hidden touch-none"
      >
        {/* Layer 1: Base Black and White Grayscale Image */}
        <img
          src={imageSrc}
          alt={alt}
          className="block w-[220px] xs:w-[250px] sm:w-[320px] md:w-[370px] lg:w-[410px] h-[255px] xs:h-[290px] sm:h-[360px] md:h-[410px] lg:h-[450px] object-cover object-top filter grayscale contrast-[1.15] brightness-[0.95] drop-shadow-[0_15px_30px_rgba(0,0,0,0.18)] pointer-events-auto"
        />

        {/* Layer 2: Full Color Image revealed ONLY inside cursor pointer radius */}
        <div
          style={{
            WebkitMaskImage: mousePos.active
              ? `radial-gradient(circle ${spotlightRadius}px at ${mousePos.x}px ${mousePos.y}px, black 0%, black 75%, transparent 100%)`
              : `radial-gradient(circle 0px at 0px 0px, transparent 0%, transparent 100%)`,
            maskImage: mousePos.active
              ? `radial-gradient(circle ${spotlightRadius}px at ${mousePos.x}px ${mousePos.y}px, black 0%, black 75%, transparent 100%)`
              : `radial-gradient(circle 0px at 0px 0px, transparent 0%, transparent 100%)`,
            opacity: mousePos.active ? 1 : 0,
            transition: 'opacity 0.25s ease',
          }}
          className="absolute inset-0 block pointer-events-none"
        >
          <img
            src={imageSrc}
            alt={`${alt} - Color`}
            className="block w-[220px] xs:w-[250px] sm:w-[320px] md:w-[370px] lg:w-[410px] h-[255px] xs:h-[290px] sm:h-[360px] md:h-[410px] lg:h-[450px] object-cover object-top filter brightness-[1.05] saturate-[1.25] drop-shadow-[0_15px_30px_rgba(0,0,0,0.18)]"
          />
        </div>
      </div>
    </div>
  );
}
