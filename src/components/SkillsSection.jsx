import React from 'react';
import LogoLoop from './LogoLoop';

// SVG Icons (Larger size)
const FigmaIcon = ({ className = "w-12 h-12" }) => (
  <svg className={className} viewBox="0 0 38 57" fill="none">
    <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38H19V28.5Z" fill="#1ABCFE"/>
    <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
    <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
    <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
    <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
  </svg>
);

const NotionIcon = ({ className = "w-10 h-10" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l11.213-.746c.327 0 .047-.327-.047-.42L16.48 2.062c-.42-.373-.84-.56-1.587-.514L3.62 2.342c-.42.046-.56.326-.373.56l1.213 1.306zm.7 2.753v13.623c0 .84.373 1.213 1.26 1.166l12.755-.84c.887-.047 1.12-.653 1.12-1.447V5.98c0-.793-.327-1.12-1.027-1.073l-13.082.84c-.746.046-1.026.42-1.026 1.214zm13.129.747c.093.42.046.793-.327.84l-1.073.187v10.593c.7.28 1.213.14 1.447-.28.187-.327.28-.793.28-1.587V7.754l-.327-.046z"/>
  </svg>
);

const FramerIcon = ({ className = "w-10 h-10" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z"/>
  </svg>
);

const JiraIcon = ({ className = "w-10 h-10" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.53 2c0 2.4 1.97 4.35 4.35 4.35h1.78v1.78c0 2.4 1.95 4.35 4.35 4.35V2h-10.48zm-4.35 4.35c0 2.4 1.95 4.35 4.35 4.35h1.78v1.78c0 2.4 1.95 4.35 4.35 4.35V6.35H7.18zM2.83 10.7c0 2.4 1.95 4.35 4.35 4.35h1.78v1.78c0 2.4 1.95 4.35 4.35 4.35V10.7H2.83z"/>
  </svg>
);

const ConfluenceIcon = ({ className = "w-10 h-10" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M.952 18.067c-.422.615-.815 1.341-1.037 2.053a1.59 1.59 0 0 0 1.508 2.06h9.702c.983 0 1.696-.867 1.34-1.782a17.84 17.84 0 0 0-4.707-6.844 19.34 19.34 0 0 0-6.806-4.487zm22.096-12.134H13.346c-.983 0-1.696.867-1.34 1.782a17.84 17.84 0 0 0 4.707 6.844 19.34 19.34 0 0 0 6.806 4.487c.422-.615.815-1.341 1.037-2.053a1.59 1.59 0 0 0-1.508-2.06z"/>
  </svg>
);

const SlackIcon = ({ className = "w-10 h-10" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165c0-1.394 1.127-2.523 2.522-2.523h2.52v2.523zm1.266 0c0-1.394 1.127-2.523 2.522-2.523s2.522 1.129 2.522 2.523v6.313A2.528 2.528 0 0 1 8.83 24a2.528 2.528 0 0 1-2.522-2.523v-6.312zM8.83 5.042a2.528 2.528 0 0 1-2.522-2.52A2.528 2.528 0 0 1 8.83 0c1.395 0 2.522 1.127 2.522 2.522v2.52H8.83zm0 1.266c1.395 0 2.522 1.127 2.522 2.522s-1.127 2.522-2.522 2.522H2.522A2.528 2.528 0 0 1 0 8.83a2.528 2.528 0 0 1 2.522-2.522h6.308zm10.128 3.78a2.528 2.528 0 0 1 2.52-2.523A2.528 2.528 0 0 1 24 8.83c0 1.394-1.127 2.523-2.522 2.523h-2.52V8.83zm-1.266 0c0 1.394-1.127 2.523-2.522 2.523s-2.522-1.129-2.522-2.523V2.517A2.528 2.528 0 0 1 15.17 0a2.528 2.528 0 0 1 2.522 2.523v6.307zm-3.784 10.128a2.528 2.528 0 0 1 2.522 2.52A2.528 2.528 0 0 1 15.17 24c-1.395 0-2.522-1.127-2.522-2.522v-2.52h2.522zm0-1.266c-1.395 0-2.522-1.127-2.522-2.522s1.127-2.522 2.522-2.522h6.308A2.528 2.528 0 0 1 24 15.17a2.528 2.528 0 0 1-2.522 2.522h-6.308z"/>
  </svg>
);

const OpenAiIcon = ({ className = "w-10 h-10" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 10.9803 0a6.0018 6.0018 0 0 0-5.7389 4.2127 6.0462 6.0462 0 0 0-4.3218 4.3168 5.9847 5.9847 0 0 0 .5157 4.9108 6.0462 6.0462 0 0 0 6.5098 2.9A6.0651 6.0651 0 0 0 13.0197 24a6.0018 6.0018 0 0 0 5.7389-4.2127 6.0462 6.0462 0 0 0 4.3218-4.3168ZM13.0197 22.463a4.5262 4.5262 0 0 1-2.9-1.047l.1428-.0826 3.6163-2.0881a.7651.7651 0 0 0 .3853-.6632v-5.1017l1.5307.8837a.14.14 0 0 1 .0714.1132v4.2045a4.5422 4.5422 0 0 1-2.8465 3.7812ZM4.4447 18.3614a4.5126 4.5126 0 0 1-.5376-3.045l.1428.0862 3.6163 2.0881a.7651.7651 0 0 0 .7706 0l4.4179-2.5508v1.7674a.14.14 0 0 1-.0596.1197l-3.6406 2.1009a4.5422 4.5422 0 0 1-4.71-.4865ZM3.4087 9.8703A4.5262 4.5262 0 0 1 5.77 7.0396l-.0017.1652v4.1762a.7651.7651 0 0 0 .3853.6632l4.4179 2.5508-1.5307.8837a.14.14 0 0 1-.131.0065l-3.6406-2.1009a4.5422 4.5422 0 0 1-1.8605-3.5141Zm14.8219-2.0125l-3.6163 2.0881a.7651.7651 0 0 0-.3853.6632v5.1017l-1.5307-.8837a.14.14 0 0 1-.0714-.1132V10.51a4.5422 4.5422 0 0 1 7.5565-3.2947l-.1428-.0826ZM19.5553 5.6386a4.5126 4.5126 0 0 1 .5376 3.045l-.1428-.0862-3.6163-2.0881a.7651.7651 0 0 0-.7706 0L11.1453 9.06V7.2926a.14.14 0 0 1 .0596-.1197l3.6406-2.1009a4.5422 4.5422 0 0 1 4.71.4866ZM10.9803 1.537a4.5262 4.5262 0 0 1 2.9 1.047l-.1428.0826-3.6163 2.0881a.7651.7651 0 0 0-.3853.6632v5.1017l-1.5307-.8837a.14.14 0 0 1-.0714-.1132V5.3182a4.5422 4.5422 0 0 1 2.8465-3.7812ZM9.4496 11.2335l2.5507-1.4727 2.5507 1.4727v2.9454l-2.5507 1.4727-2.5507-1.4727Z" />
  </svg>
);

const ReactIcon = ({ className = "w-10 h-10" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <ellipse cx="12" cy="12" rx="10" ry="4.5" />
    <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);

const AdobeBadge = ({ text, bg, color, border }) => (
  <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl ${bg} ${border} border-2 flex items-center justify-center ${color} font-sans font-black text-sm sm:text-base shadow-sm`}>
    {text}
  </div>
);

export default function SkillsSection() {
  // Row 1: Left to Right (Design, Frontend & AI Stack)
  const row1Logos = [
    { node: <FigmaIcon className="w-11 h-11 sm:w-13 sm:h-13" />, title: "Figma", href: "https://figma.com" },
    { node: <ReactIcon className="w-11 h-11 sm:w-13 sm:h-13 text-[#61DAFB]" />, title: "React", href: "https://react.dev" },
    { node: <FramerIcon className="w-11 h-11 sm:w-13 sm:h-13 text-black" />, title: "Framer", href: "https://framer.com" },
    { node: <OpenAiIcon className="w-11 h-11 sm:w-13 sm:h-13 text-black" />, title: "OpenAI", href: "https://openai.com" },
    { node: <AdobeBadge text="Ai" bg="bg-[#330000]" color="text-[#FF9A00]" border="border-[#FF9A00]/40" />, title: "Illustrator" },
    { node: <NotionIcon className="w-11 h-11 sm:w-13 sm:h-13 text-black" />, title: "Notion", href: "https://notion.so" },
    { node: <SlackIcon className="w-11 h-11 sm:w-13 sm:h-13 text-[#E01E5A]" />, title: "Slack", href: "https://slack.com" }
  ];

  // Row 2: Right to Left (Creative Suite & Productivity Tools)
  const row2Logos = [
    { node: <AdobeBadge text="Ps" bg="bg-[#001E36]" color="text-[#31A8FF]" border="border-[#31A8FF]/40" />, title: "Photoshop" },
    { node: <AdobeBadge text="Ae" bg="bg-[#000055]" color="text-[#9999FF]" border="border-[#9999FF]/40" />, title: "After Effects" },
    { node: <JiraIcon className="w-11 h-11 sm:w-13 sm:h-13 text-[#0052CC]" />, title: "Jira", href: "https://atlassian.com" },
    { node: <ConfluenceIcon className="w-11 h-11 sm:w-13 sm:h-13 text-[#172B4D]" />, title: "Confluence", href: "https://atlassian.com" },
    { node: <FigmaIcon className="w-11 h-11 sm:w-13 sm:h-13" />, title: "Figma", href: "https://figma.com" },
    { node: <ReactIcon className="w-11 h-11 sm:w-13 sm:h-13 text-[#61DAFB]" />, title: "React", href: "https://react.dev" },
    { node: <OpenAiIcon className="w-11 h-11 sm:w-13 sm:h-13 text-black" />, title: "OpenAI", href: "https://openai.com" }
  ];

  return (
    <div className="w-full max-w-[1280px] h-full max-h-[94vh] bg-white rounded-[24px] sm:rounded-[32px] md:rounded-[40px] border border-neutral-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.06)] p-5 sm:p-8 md:p-10 relative overflow-hidden flex flex-col justify-between">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-100 z-10 flex-shrink-0">
        <div>
          <h2 className="font-clash font-extrabold text-3xl sm:text-5xl md:text-6xl text-neutral-900 tracking-tight uppercase">
            SKILLS & TOOLS
          </h2>
          <p className="font-serif italic text-neutral-500 text-sm sm:text-base mt-1">
            Technologies, frameworks & digital design tools I work with daily
          </p>
        </div>
        <span className="text-xs font-sans text-neutral-400 font-medium hidden sm:inline">Dual Direction Marquee</span>
      </div>

      {/* Main Center Content: Dual Row Infinite Logo Loop Container */}
      <div className="w-full my-auto py-6 sm:py-10 flex flex-col gap-8 sm:gap-12 relative overflow-hidden">
        
        {/* Row 1: Left to Right */}
        <div className="w-full">
          <div className="px-2 sm:px-6 mb-2 text-left">
            <span className="font-sans text-[11px] font-extrabold text-neutral-400 tracking-wider uppercase">
              Design & Development Stack →
            </span>
          </div>
          <LogoLoop
            logos={row1Logos}
            speed={65}
            direction="right"
            logoHeight={48}
            gap={64}
            pauseOnHover={true}
            scaleOnHover={true}
            fadeOut={true}
            fadeOutColor="#ffffff"
            ariaLabel="Design & Development Stack"
          />
        </div>

        {/* Row 2: Right to Left */}
        <div className="w-full">
          <div className="px-2 sm:px-6 mb-2 text-right">
            <span className="font-sans text-[11px] font-extrabold text-neutral-400 tracking-wider uppercase">
              ← Software Suite & Workflows
            </span>
          </div>
          <LogoLoop
            logos={row2Logos}
            speed={65}
            direction="left"
            logoHeight={48}
            gap={64}
            pauseOnHover={true}
            scaleOnHover={true}
            fadeOut={true}
            fadeOutColor="#ffffff"
            ariaLabel="Software Suite & Workflows"
          />
        </div>

      </div>

      {/* Footer */}
      <div className="flex items-center justify-end pt-2 border-t border-neutral-100 text-xs text-neutral-400 font-serif">
        <a href="#home" className="hover:text-neutral-900 font-semibold transition-colors flex items-center gap-1">
          <span>Back to Top</span>
          <span>↑</span>
        </a>
      </div>

    </div>
  );
}
