import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import gsap from 'gsap';

const DEFAULT_ITEMS = [
  { image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80', alt: 'Slide 1' },
  { image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80', alt: 'Slide 2' },
  { image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80', alt: 'Slide 3' },
  { image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&auto=format&fit=crop&q=80', alt: 'Slide 4' },
  { image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&auto=format&fit=crop&q=80', alt: 'Slide 5' },
  { image: 'https://images.unsplash.com/photo-1542744094-3a31b272c490?w=800&auto=format&fit=crop&q=80', alt: 'Slide 6' }
];

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
const normalizeItem = (it) =>
  typeof it === 'string'
    ? { image: it, alt: '', title: '', category: '' }
    : {
        image: it.image || it.src,
        alt: it.alt || '',
        title: it.title || '',
        category: it.category || ''
      };

const DepthCarousel = ({
  items = DEFAULT_ITEMS,
  cardWidth = 560,
  cardHeight = 350,
  radius = 20,
  tint = '#05060a',
  depth = 200,
  spread = 125,
  tilt = 16,
  tiltDirection = 'right',
  perspective = 1400,
  visibleCards = 3,
  falloff = 0.18,
  blur = 4,
  duration = 550,
  ease = 'power2.out',
  autoplay = true,
  autoplayDelay = 3500,
  loop = true,
  showControls = true,
  showIndicators = true,
  onChange,
  onItemClick,
  className = ''
}) => {
  const data = useMemo(() => (Array.isArray(items) ? items : []).map(normalizeItem), [items]);
  const count = data.length;

  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const cardRefs = useRef([]);
  const overlayRefs = useRef([]);

  const posRef = useRef(0);
  const focusRef = useRef(0);
  const tweenRef = useRef(null);
  const scaleRef = useRef(1);
  const cfgRef = useRef({});
  const onChangeRef = useRef(onChange);

  const dragRef = useRef(null);
  const wheelTimerRef = useRef(null);
  const autoTimerRef = useRef(null);
  const reducedRef = useRef(false);

  const [active, setActive] = useState(0);

  // Dynamic responsive dimensions for mobile vs tablet vs desktop
  const [dimensions, setDimensions] = useState(() => {
    const isClient = typeof window !== 'undefined';
    const isMobile = isClient ? window.innerWidth < 640 : false;
    const isTablet = isClient ? window.innerWidth >= 640 && window.innerWidth < 1024 : false;
    const w = isClient ? window.innerWidth : 1200;
    if (isMobile) {
      const targetW = Math.min(Math.max(Math.round(w - 28), 280), 340);
      return {
        cardWidth: targetW,
        cardHeight: Math.min(Math.round(targetW * 0.72), 245),
        spread: 22,
        depth: 80,
        isMobile: true
      };
    }
    if (isTablet) {
      return {
        cardWidth: 440,
        cardHeight: 290,
        spread: 70,
        depth: 130,
        isMobile: false
      };
    }
    return {
      cardWidth: cardWidth || 540,
      cardHeight: cardHeight || 330,
      spread: spread || 125,
      depth: depth || 200,
      isMobile: false
    };
  });

  onChangeRef.current = onChange;
  cfgRef.current = {
    count,
    depth: dimensions.depth,
    spread: dimensions.spread,
    tilt,
    tiltDirection,
    visibleCards: dimensions.isMobile ? 2 : visibleCards,
    falloff,
    blur,
    duration,
    ease,
    loop,
    cardWidth: dimensions.cardWidth,
    autoplayDelay
  };

  const layout = useCallback((pos) => {
    const cfg = cfgRef.current;
    const n = cfg.count;
    if (!n) return;
    const dir = cfg.tiltDirection === 'left' ? -1 : 1;
    const sc = scaleRef.current;

    for (let i = 0; i < n; i++) {
      const el = cardRefs.current[i];
      if (!el) continue;

      let d = i - pos;
      if (cfg.loop && n > 1) {
        d = ((d % n) + n) % n;
        if (d > n / 2) d -= n;
      }

      const back = Math.max(0, d);
      const az = Math.abs(d);
      const shown = az <= cfg.visibleCards + 0.5;

      const tz = -cfg.depth * d;
      const tx = dir * cfg.spread * d;
      const ry = dir * cfg.tilt * clamp(d, 0, 1);

      let opacity = d < 0 ? Math.max(0, 1 + d) : 1;
      if (!shown) opacity = 0;

      const brightness = Math.max(0.15, 1 - back * cfg.falloff);
      const blurPx = cfg.blur > 0 ? Math.min(cfg.blur, (back / Math.max(1, cfg.visibleCards)) * cfg.blur) : 0;
      const zi = Math.round(2000 - d * 20);

      el.style.transform = `translate(-50%, -50%) scale(${sc}) translateX(${tx.toFixed(2)}px) translateZ(${tz.toFixed(2)}px) rotateY(${ry.toFixed(3)}deg)`;
      el.style.opacity = opacity.toFixed(3);
      el.style.filter = `brightness(${brightness.toFixed(3)}) blur(${blurPx.toFixed(2)}px)`;
      el.style.zIndex = String(zi);
      el.style.pointerEvents = shown && opacity > 0.05 ? 'auto' : 'none';

      const ov = overlayRefs.current[i];
      if (ov) ov.style.opacity = clamp(back * cfg.falloff * 1.25, 0, 0.86).toFixed(3);
    }
  }, []);

  const notify = useCallback(
    (idx) => {
      setActive(idx);
      onChangeRef.current?.(idx, data[idx]);
    },
    [data]
  );

  const tweenTo = useCallback(
    (target, animate) => {
      tweenRef.current?.kill();
      const cfg = cfgRef.current;
      const proxy = { p: posRef.current };
      const dur = animate && !reducedRef.current ? cfg.duration / 1000 : 0;
      tweenRef.current = gsap.to(proxy, {
        p: target,
        duration: dur,
        ease: cfg.ease,
        onUpdate: () => {
          posRef.current = proxy.p;
          layout(proxy.p);
        },
        onComplete: () => {
          const n = cfg.count;
          if (n > 0) posRef.current = ((posRef.current % n) + n) % n;
          layout(posRef.current);
        }
      });
    },
    [layout]
  );

  const setFocus = useCallback(
    (rawIndex, animate = true) => {
      const cfg = cfgRef.current;
      const n = cfg.count;
      if (!n) return;
      const idx = cfg.loop ? ((rawIndex % n) + n) % n : clamp(rawIndex, 0, n - 1);
      let delta = idx - posRef.current;
      if (cfg.loop && n > 1) {
        delta = ((delta % n) + n) % n;
        if (delta > n / 2) delta -= n;
      }
      tweenTo(posRef.current + delta, animate);
      if (idx !== focusRef.current) {
        focusRef.current = idx;
        notify(idx);
      }
    },
    [tweenTo, notify]
  );

  const navigateBy = useCallback((step) => setFocus(focusRef.current + step, true), [setFocus]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ro = new ResizeObserver(entries => {
      if (!entries[0]) return;
      const w = entries[0].contentRect.width;
      const isMobile = w < 640;
      const isTablet = w >= 640 && w < 1024;

      let targetW;
      let targetH;
      let targetSpread;
      let targetDepth;

      if (isMobile) {
        // MOBILE: Prominent card deck with dedicated vertical clearance for titles & indicators
        targetW = Math.min(Math.max(Math.round(w - 28), 280), 340);
        targetH = Math.min(Math.round(targetW * 0.72), 245);
        targetSpread = 22;
        targetDepth = 80;
        scaleRef.current = 1; // Pure 1:1 scale on mobile, no downscaling blur!
      } else if (isTablet) {
        targetW = 440;
        targetH = 290;
        targetSpread = 70;
        targetDepth = 130;
        const needed = targetW + targetSpread * 1.5 + 40;
        scaleRef.current = clamp(w / needed, 0.75, 1);
      } else {
        targetW = cardWidth || 540;
        targetH = cardHeight || 330;
        targetSpread = spread || 125;
        targetDepth = depth || 200;
        const needed = targetW + targetSpread * 2 + 120;
        scaleRef.current = clamp(w / needed, 0.4, 1);
      }

      cfgRef.current.cardWidth = targetW;
      cfgRef.current.cardHeight = targetH;
      cfgRef.current.spread = targetSpread;
      cfgRef.current.depth = targetDepth;
      cfgRef.current.visibleCards = isMobile ? 2 : visibleCards;

      setDimensions(prev => {
        if (
          prev.cardWidth === targetW &&
          prev.cardHeight === targetH &&
          prev.spread === targetSpread &&
          prev.depth === targetDepth &&
          prev.isMobile === isMobile
        ) {
          return prev;
        }
        return {
          cardWidth: targetW,
          cardHeight: targetH,
          spread: targetSpread,
          depth: targetDepth,
          isMobile
        };
      });

      layout(posRef.current);
    });
    ro.observe(root);
    return () => ro.disconnect();
  }, [layout, cardWidth, cardHeight, spread, depth, visibleCards]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const onWheel = (e) => {
      const cfg = cfgRef.current;
      if (cfg.count < 2) return;
      e.preventDefault();
      tweenRef.current?.kill();
      const raw = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      const delta = e.deltaMode === 1 ? raw * 24 : raw;
      const step = clamp(delta / (cfg.cardWidth * 0.9), -0.6, 0.6);
      posRef.current += step;
      layout(posRef.current);
      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
      wheelTimerRef.current = setTimeout(() => setFocus(Math.round(posRef.current), true), 130);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
    };
  }, [layout, setFocus]);

  const onPointerDown = useCallback((e) => {
    const cfg = cfgRef.current;
    if (cfg.count < 2) return;
    tweenRef.current?.kill();
    dragRef.current = {
      x: e.clientX,
      y: e.clientY,
      startPos: posRef.current,
      lastX: e.clientX,
      lastT: performance.now(),
      v: 0,
      moved: false,
      id: e.pointerId
    };
  }, []);

  const onPointerMove = useCallback(
    (e) => {
      const drag = dragRef.current;
      if (!drag) return;
      const cfg = cfgRef.current;
      const stepPx = Math.max(cfg.cardWidth * 0.55 * scaleRef.current, 40);
      const dx = e.clientX - drag.x;
      const dy = e.clientY - drag.y;

      // Distinguish horizontal carousel dragging from vertical page scrolling on touch devices
      if (!drag.moved) {
        if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 5) {
          // User is scrolling the page vertically — cancel carousel gesture
          dragRef.current = null;
          return;
        }
        if (Math.abs(dx) > 7 && Math.abs(dx) > Math.abs(dy)) {
          drag.moved = true;
          rootRef.current?.setPointerCapture(drag.id);
        }
      }

      if (!drag.moved) return;
      const now = performance.now();
      const dt = Math.max(now - drag.lastT, 1);
      drag.v = (e.clientX - drag.lastX) / dt;
      drag.lastX = e.clientX;
      drag.lastT = now;
      posRef.current = drag.startPos - dx / stepPx;
      layout(posRef.current);
    },
    [layout]
  );

  const onPointerEnd = useCallback(() => {
    const drag = dragRef.current;
    if (!drag) return;
    dragRef.current = null;
    if (!drag.moved) return;
    const cfg = cfgRef.current;
    const stepPx = Math.max(cfg.cardWidth * 0.55 * scaleRef.current, 40);
    const projected = posRef.current - (drag.v * 180) / stepPx;
    setFocus(Math.round(projected), true);
  }, [setFocus]);

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigateBy(-1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigateBy(1);
      }
    },
    [navigateBy]
  );

  const onCardClick = useCallback(
    (index) => {
      if (dragRef.current?.moved) return;
      setFocus(index, true);
      onItemClick?.(data[index], index);
    },
    [setFocus, onItemClick, data]
  );

  useEffect(() => {
    reducedRef.current = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!autoplay || reducedRef.current || count < 2) return;
    const root = rootRef.current;
    let hovered = false;
    let focused = false;
    const stop = () => {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
      autoTimerRef.current = null;
    };
    const start = () => {
      stop();
      autoTimerRef.current = setInterval(
        () => {
          if (!hovered && !focused) navigateBy(1);
        },
        Math.max(cfgRef.current.autoplayDelay, 600)
      );
    };
    const onEnter = () => {
      hovered = true;
    };
    const onLeave = () => {
      hovered = false;
    };
    const onFocusIn = () => {
      focused = true;
    };
    const onFocusOut = () => {
      focused = false;
    };
    root?.addEventListener('mouseenter', onEnter);
    root?.addEventListener('mouseleave', onLeave);
    root?.addEventListener('focusin', onFocusIn);
    root?.addEventListener('focusout', onFocusOut);
    start();
    return () => {
      stop();
      root?.removeEventListener('mouseenter', onEnter);
      root?.removeEventListener('mouseleave', onLeave);
      root?.removeEventListener('focusin', onFocusIn);
      root?.removeEventListener('focusout', onFocusOut);
    };
  }, [autoplay, autoplayDelay, count, navigateBy]);

  useEffect(() => {
    layout(posRef.current);
  }, [layout, depth, spread, tilt, tiltDirection, visibleCards, falloff, blur, cardWidth, cardHeight, radius, count]);

  useEffect(
    () => () => {
      tweenRef.current?.kill();
      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    },
    []
  );

  return (
    <div
      ref={rootRef}
      className={`relative flex h-full min-h-[380px] xs:min-h-[420px] sm:min-h-[360px] w-full cursor-grab touch-pan-y select-none items-center justify-center outline-none [perspective-origin:50%_50%] active:cursor-grabbing focus-visible:rounded-xl focus-visible:outline-2 focus-visible:outline-white/50 focus-visible:[outline-offset:4px] ${className}`.trim()}
      style={{ perspective: `${perspective}px` }}
      role="group"
      aria-roledescription="carousel"
      aria-label="Depth carousel"
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
      onKeyDown={onKeyDown}
    >
      <div className="absolute inset-0 [transform-style:preserve-3d]" ref={stageRef}>
        {data.map((item, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-[39%] xs:top-[41%] sm:top-[44%] md:top-[46%] cursor-zoom-in overflow-hidden bg-neutral-900 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.35)] [transform:translate(-50%,-50%)] [transform-origin:center] [will-change:transform,opacity,filter] group"
            ref={el => {
              cardRefs.current[i] = el;
            }}
            style={{
              width: dimensions.cardWidth,
              height: dimensions.cardHeight,
              borderRadius: radius
            }}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            aria-hidden={active !== i}
            onClick={() => onCardClick(i)}
          >
            <img
              className="block h-full w-full select-none object-cover [pointer-events:none] [-webkit-user-drag:none] transition-transform duration-300 group-hover:scale-[1.02]"
              src={item.image}
              alt={item.alt || ''}
              draggable={false}
            />
            <span
              className="pointer-events-none absolute inset-0 opacity-0 mix-blend-multiply"
              ref={el => {
                overlayRefs.current[i] = el;
              }}
              style={{ background: tint }}
            />

            {/* Fullscreen Expand Icon Badge */}
            <div className="absolute top-2.5 right-2.5 z-20 pointer-events-none">
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-sans font-medium border border-white/20 shadow-md">
                <svg className="w-3 h-3 text-[#a3f036]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h6v6" />
                  <path d="M9 21H3v-6" />
                  <path d="M21 3l-7 7" />
                  <path d="M3 21l7-7" />
                </svg>
                <span className="hidden xs:inline">Fullscreen</span>
              </span>
            </div>

            {/* Desktop Hover Expand Overlay */}
            <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:flex items-center justify-center pointer-events-none z-10">
              <span className="px-4 py-2 rounded-full bg-black/85 backdrop-blur-md text-white text-xs font-sans font-semibold border border-white/20 flex items-center gap-2 shadow-xl scale-90 group-hover:scale-100 transition-transform">
                <svg className="w-4 h-4 text-[#a3f036]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h6v6" />
                  <path d="M9 21H3v-6" />
                  <path d="M21 3l-7 7" />
                  <path d="M3 21l7-7" />
                </svg>
                <span>View Fullscreen</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {showControls && count > 1 && (
        <>
          <button
            type="button"
            className="absolute left-1.5 sm:left-4 top-[39%] xs:top-[41%] sm:top-[44%] md:top-[46%] z-[3000] grid h-[36px] w-[36px] sm:h-[42px] sm:w-[42px] -translate-y-1/2 place-items-center rounded-full border border-black/20 bg-black/75 text-white backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer shadow-lg"
            aria-label="Previous slide"
            onClick={() => navigateBy(-1)}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path
                d="M15 5l-7 7 7 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className="absolute right-1.5 sm:right-4 top-[39%] xs:top-[41%] sm:top-[44%] md:top-[46%] z-[3000] grid h-[36px] w-[36px] sm:h-[42px] sm:w-[42px] -translate-y-1/2 place-items-center rounded-full border border-black/20 bg-black/75 text-white backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer shadow-lg"
            aria-label="Next slide"
            onClick={() => navigateBy(1)}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path
                d="M9 5l7 7-7 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </>
      )}

      {/* Active Design Title & Category Caption - Positioned clearly below the artwork */}
      {data[active] && (
        <div className="absolute bottom-8 sm:bottom-11 left-1/2 -translate-x-1/2 z-[3000] text-center pointer-events-none w-full px-3 max-w-[320px] xs:max-w-[380px] sm:max-w-md transition-all duration-300 flex flex-col items-center">
          <div className="inline-flex flex-col items-center px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-2xl bg-white/95 sm:bg-white/90 backdrop-blur-md border border-neutral-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.06)] max-w-full">
            <h4 className="text-neutral-900 font-clash font-extrabold text-xs xs:text-sm sm:text-base tracking-tight leading-snug truncate max-w-[280px] xs:max-w-[340px] sm:max-w-none">
              {data[active].title || data[active].alt}
            </h4>
            <p className="text-neutral-500 font-sans text-[10px] xs:text-[11px] sm:text-xs tracking-normal mt-0.5 truncate max-w-[280px] xs:max-w-[340px] sm:max-w-none">
              {data[active].category || 'Tap poster to elaborate fullscreen'}
            </p>
          </div>
        </div>
      )}

      {showIndicators && count > 1 && (
        <div
          className="absolute bottom-1.5 sm:bottom-2.5 left-1/2 z-[3000] flex -translate-x-1/2 gap-1.5 sm:gap-2 rounded-full bg-neutral-900/80 px-3 py-1 sm:px-3.5 sm:py-1.5 backdrop-blur-md border border-white/10 shadow-lg"
          role="tablist"
          aria-label="Slides"
        >
          {data.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={active === i}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-[5px] sm:h-[6px] cursor-pointer rounded-full transition-all duration-[250ms] ${
                active === i ? 'w-5 sm:w-6 bg-[#a3f036]' : 'w-[5px] sm:w-[6px] bg-white/40 hover:bg-white/70'
              }`}
              onClick={() => setFocus(i, true)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DepthCarousel;
