import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, SlidersHorizontal, Search, X, Sparkles, ExternalLink, Code2, Palette, Cpu, Workflow } from 'lucide-react';
import LogoLoop from './LogoLoop';

// Brand SVG Icons
const FigmaIcon = ({ className = "w-10 h-10" }) => (
  <svg className={className} viewBox="0 0 38 57" fill="none">
    <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38H19V28.5Z" fill="#1ABCFE"/>
    <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
    <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
    <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
    <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
  </svg>
);

const NotionIcon = ({ className = "w-9 h-9" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l11.213-.746c.327 0 .047-.327-.047-.42L16.48 2.062c-.42-.373-.84-.56-1.587-.514L3.62 2.342c-.42.046-.56.326-.373.56l1.213 1.306zm.7 2.753v13.623c0 .84.373 1.213 1.26 1.166l12.755-.84c.887-.047 1.12-.653 1.12-1.447V5.98c0-.793-.327-1.12-1.027-1.073l-13.082.84c-.746.046-1.026.42-1.026 1.214zm13.129.747c.093.42.046.793-.327.84l-1.073.187v10.593c.7.28 1.213.14 1.447-.28.187-.327.28-.793.28-1.587V7.754l-.327-.046z"/>
  </svg>
);

const FramerIcon = ({ className = "w-9 h-9" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z"/>
  </svg>
);

const JiraIcon = ({ className = "w-9 h-9" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.53 2c0 2.4 1.97 4.35 4.35 4.35h1.78v1.78c0 2.4 1.95 4.35 4.35 4.35V2h-10.48zm-4.35 4.35c0 2.4 1.95 4.35 4.35 4.35h1.78v1.78c0 2.4 1.95 4.35 4.35 4.35V6.35H7.18zM2.83 10.7c0 2.4 1.95 4.35 4.35 4.35h1.78v1.78c0 2.4 1.95 4.35 4.35 4.35V10.7H2.83z"/>
  </svg>
);

const ConfluenceIcon = ({ className = "w-9 h-9" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M.952 18.067c-.422.615-.815 1.341-1.037 2.053a1.59 1.59 0 0 0 1.508 2.06h9.702c.983 0 1.696-.867 1.34-1.782a17.84 17.84 0 0 0-4.707-6.844 19.34 19.34 0 0 0-6.806-4.487zm22.096-12.134H13.346c-.983 0-1.696.867-1.34 1.782a17.84 17.84 0 0 0 4.707 6.844 19.34 19.34 0 0 0 6.806 4.487c.422-.615.815-1.341 1.037-2.053a1.59 1.59 0 0 0-1.508-2.06z"/>
  </svg>
);

const SlackIcon = ({ className = "w-9 h-9" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165c0-1.394 1.127-2.523 2.522-2.523h2.52v2.523zm1.266 0c0-1.394 1.127-2.523 2.522-2.523s2.522 1.129 2.522 2.523v6.313A2.528 2.528 0 0 1 8.83 24a2.528 2.528 0 0 1-2.522-2.523v-6.312zM8.83 5.042a2.528 2.528 0 0 1-2.522-2.52A2.528 2.528 0 0 1 8.83 0c1.395 0 2.522 1.127 2.522 2.522v2.52H8.83zm0 1.266c1.395 0 2.522 1.127 2.522 2.522s-1.127 2.522-2.522 2.522H2.522A2.528 2.528 0 0 1 0 8.83a2.528 2.528 0 0 1 2.522-2.522h6.308zm10.128 3.78a2.528 2.528 0 0 1 2.52-2.523A2.528 2.528 0 0 1 24 8.83c0 1.394-1.127 2.523-2.522 2.523h-2.52V8.83zm-1.266 0c0 1.394-1.127 2.523-2.522 2.523s-2.522-1.129-2.522-2.523V2.517A2.528 2.528 0 0 1 15.17 0a2.528 2.528 0 0 1 2.522 2.523v6.307zm-3.784 10.128a2.528 2.528 0 0 1 2.522 2.52A2.528 2.528 0 0 1 15.17 24c-1.395 0-2.522-1.127-2.522-2.522v-2.52h2.522zm0-1.266c-1.395 0-2.522-1.127-2.522-2.522s1.127-2.522 2.522-2.522h6.308A2.528 2.528 0 0 1 24 15.17a2.528 2.528 0 0 1-2.522 2.522h-6.308z"/>
  </svg>
);

const OpenAiIcon = ({ className = "w-9 h-9" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 10.9803 0a6.0018 6.0018 0 0 0-5.7389 4.2127 6.0462 6.0462 0 0 0-4.3218 4.3168 5.9847 5.9847 0 0 0 .5157 4.9108 6.0462 6.0462 0 0 0 6.5098 2.9A6.0651 6.0651 0 0 0 13.0197 24a6.0018 6.0018 0 0 0 5.7389-4.2127 6.0462 6.0462 0 0 0 4.3218-4.3168ZM13.0197 22.463a4.5262 4.5262 0 0 1-2.9-1.047l.1428-.0826 3.6163-2.0881a.7651.7651 0 0 0 .3853-.6632v-5.1017l1.5307.8837a.14.14 0 0 1 .0714.1132v4.2045a4.5422 4.5422 0 0 1-2.8465 3.7812ZM4.4447 18.3614a4.5126 4.5126 0 0 1-.5376-3.045l.1428.0862 3.6163 2.0881a.7651.7651 0 0 0 .7706 0l4.4179-2.5508v1.7674a.14.14 0 0 1-.0596.1197l-3.6406 2.1009a4.5422 4.5422 0 0 1-4.71-.4865ZM3.4087 9.8703A4.5262 4.5262 0 0 1 5.77 7.0396l-.0017.1652v4.1762a.7651.7651 0 0 0 .3853.6632l4.4179 2.5508-1.5307.8837a.14.14 0 0 1-.131.0065l-3.6406-2.1009a4.5422 4.5422 0 0 1-1.8605-3.5141Zm14.8219-2.0125l-3.6163 2.0881a.7651.7651 0 0 0-.3853.6632v5.1017l-1.5307-.8837a.14.14 0 0 1-.0714-.1132V10.51a4.5422 4.5422 0 0 1 7.5565-3.2947l-.1428-.0826ZM19.5553 5.6386a4.5126 4.5126 0 0 1 .5376 3.045l-.1428-.0862-3.6163-2.0881a.7651.7651 0 0 0-.7706 0L11.1453 9.06V7.2926a.14.14 0 0 1 .0596-.1197l3.6406-2.1009a4.5422 4.5422 0 0 1 4.71.4866ZM10.9803 1.537a4.5262 4.5262 0 0 1 2.9 1.047l-.1428.0826-3.6163 2.0881a.7651.7651 0 0 0-.3853.6632v5.1017l-1.5307-.8837a.14.14 0 0 1-.0714-.1132V5.3182a4.5422 4.5422 0 0 1 2.8465-3.7812ZM9.4496 11.2335l2.5507-1.4727 2.5507 1.4727v2.9454l-2.5507 1.4727-2.5507-1.4727Z" />
  </svg>
);

const ReactIcon = ({ className = "w-9 h-9" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <ellipse cx="12" cy="12" rx="10" ry="4.5" />
    <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);

const TailwindIcon = ({ className = "w-9 h-9" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z"/>
  </svg>
);

const AdobeBadge = ({ text, bg, color, border }) => (
  <div className={`w-10 h-10 rounded-xl ${bg} ${border} border-2 flex items-center justify-center ${color} font-sans font-black text-sm shadow-sm flex-shrink-0`}>
    {text}
  </div>
);

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'marquee'

  // Master Skills & Tools Registry
  const skillsData = useMemo(() => [
    {
      id: 'figma',
      name: 'Figma',
      category: 'design',
      categoryLabel: 'Design & UX',
      level: 'Daily Driver',
      levelBadge: 'bg-[#a3f036]/20 text-neutral-900 border-[#a3f036]',
      description: 'Design systems, wireframes, responsive auto-layout & interactive prototypes.',
      tags: ['UI/UX', 'Auto Layout', 'Prototypes', 'Design Systems'],
      href: 'https://figma.com',
      icon: <FigmaIcon className="w-10 h-10" />
    },
    {
      id: 'react',
      name: 'React.js',
      category: 'frontend',
      categoryLabel: 'Frontend Dev',
      level: 'Advanced',
      levelBadge: 'bg-cyan-100 text-cyan-900 border-cyan-300',
      description: 'Building modular component hierarchies, custom hooks & web UI logic.',
      tags: ['React 18', 'Vite', 'Hooks', 'Web Apps'],
      href: 'https://react.dev',
      icon: <ReactIcon className="w-10 h-10 text-[#61DAFB]" />
    },
    {
      id: 'tailwind',
      name: 'Tailwind CSS',
      category: 'frontend',
      categoryLabel: 'Frontend Dev',
      level: 'Advanced',
      levelBadge: 'bg-sky-100 text-sky-900 border-sky-300',
      description: 'Utility-first responsive layout design, custom theme tokens & fast styling.',
      tags: ['Responsive UI', 'Custom Tokens', 'Flex & Grid'],
      href: 'https://tailwindcss.com',
      icon: <TailwindIcon className="w-10 h-10 text-[#38BDF8]" />
    },
    {
      id: 'framer',
      name: 'Framer',
      category: 'design',
      categoryLabel: 'Design & UX',
      level: 'Proficient',
      levelBadge: 'bg-purple-100 text-purple-900 border-purple-300',
      description: 'Interactive web publishing, micro-animations & high-fidelity prototype flows.',
      tags: ['Web Publishing', 'Micro-Interactions', 'Prototyping'],
      href: 'https://framer.com',
      icon: <FramerIcon className="w-9 h-9 text-neutral-900" />
    },
    {
      id: 'openai',
      name: 'OpenAI / AI Stack',
      category: 'workflow',
      categoryLabel: 'AI & Workflow',
      level: 'Power User',
      levelBadge: 'bg-[#a3f036]/20 text-neutral-900 border-[#a3f036]',
      description: 'Generative research assistance, prompt engineering & design workflow automation.',
      tags: ['Prompt Engineering', 'Generative Design', 'AI Workflows'],
      href: 'https://openai.com',
      icon: <OpenAiIcon className="w-9 h-9 text-neutral-900" />
    },
    {
      id: 'illustrator',
      name: 'Adobe Illustrator',
      category: 'creative',
      categoryLabel: 'Creative & Motion',
      level: 'Advanced',
      levelBadge: 'bg-amber-100 text-amber-900 border-amber-300',
      description: 'Vector artwork, scalable iconography, brand mark design & typography.',
      tags: ['Vector Graphics', 'Iconography', 'Brand Assets'],
      icon: <AdobeBadge text="Ai" bg="bg-[#330000]" color="text-[#FF9A00]" border="border-[#FF9A00]/40" />
    },
    {
      id: 'photoshop',
      name: 'Adobe Photoshop',
      category: 'creative',
      categoryLabel: 'Creative & Motion',
      level: 'Advanced',
      levelBadge: 'bg-blue-100 text-blue-900 border-blue-300',
      description: 'High-res image editing, UI composition mockups & visual asset post-processing.',
      tags: ['Photo Editing', 'Visual Composition', 'Asset Prep'],
      icon: <AdobeBadge text="Ps" bg="bg-[#001E36]" color="text-[#31A8FF]" border="border-[#31A8FF]/40" />
    },
    {
      id: 'aftereffects',
      name: 'Adobe After Effects',
      category: 'creative',
      categoryLabel: 'Creative & Motion',
      level: 'Proficient',
      levelBadge: 'bg-indigo-100 text-indigo-900 border-indigo-300',
      description: 'Motion graphics keyframing, UI interaction specs & micro-animation exports.',
      tags: ['Motion Graphics', 'UI Animation', 'Keyframing'],
      icon: <AdobeBadge text="Ae" bg="bg-[#000055]" color="text-[#9999FF]" border="border-[#9999FF]/40" />
    },
    {
      id: 'notion',
      name: 'Notion',
      category: 'workflow',
      categoryLabel: 'AI & Workflow',
      level: 'Daily Driver',
      levelBadge: 'bg-neutral-200 text-neutral-900 border-neutral-300',
      description: 'Product documentation, sprint backlogs, design system specs & wikis.',
      tags: ['Design Hand-off', 'Sprint Tracking', 'Wiki'],
      href: 'https://notion.so',
      icon: <NotionIcon className="w-9 h-9 text-neutral-900" />
    },
    {
      id: 'jira',
      name: 'Jira Software',
      category: 'workflow',
      categoryLabel: 'AI & Workflow',
      level: 'Experienced',
      levelBadge: 'bg-blue-100 text-blue-900 border-blue-300',
      description: 'Agile sprint tracking, ticket management & cross-functional team alignment.',
      tags: ['Agile Sprints', 'Issue Management', 'Product Roadmaps'],
      href: 'https://atlassian.com',
      icon: <JiraIcon className="w-9 h-9 text-[#0052CC]" />
    },
    {
      id: 'confluence',
      name: 'Confluence',
      category: 'workflow',
      categoryLabel: 'AI & Workflow',
      level: 'Experienced',
      levelBadge: 'bg-slate-200 text-slate-900 border-slate-300',
      description: 'PRD specifications, user persona mapping & technical design documentation.',
      tags: ['PRD Docs', 'User Personas', 'Specs'],
      href: 'https://atlassian.com',
      icon: <ConfluenceIcon className="w-9 h-9 text-[#172B4D]" />
    },
    {
      id: 'slack',
      name: 'Slack',
      category: 'workflow',
      categoryLabel: 'AI & Workflow',
      level: 'Daily Driver',
      levelBadge: 'bg-rose-100 text-rose-900 border-rose-300',
      description: 'Real-time team communication, stakeholder reviews & design feedback loops.',
      tags: ['Async Comms', 'Team Handoff', 'Feedback'],
      href: 'https://slack.com',
      icon: <SlackIcon className="w-9 h-9 text-[#E01E5A]" />
    }
  ], []);

  // Filtered skills based on Category & Search Query
  const filteredSkills = useMemo(() => {
    return skillsData.filter((skill) => {
      const matchesCategory = activeCategory === 'all' || skill.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [skillsData, activeCategory, searchQuery]);

  // Categories list
  const categories = [
    { id: 'all', label: 'All Stack', icon: Sparkles },
    { id: 'design', label: 'Design & UX', icon: Palette },
    { id: 'frontend', label: 'Frontend Dev', icon: Code2 },
    { id: 'creative', label: 'Creative & Motion', icon: Cpu },
    { id: 'workflow', label: 'AI & Workflow', icon: Workflow },
  ];

  // Prepare LogoLoop Data for Marquee mode
  const row1Logos = skillsData.slice(0, 6).map(s => ({
    node: s.icon,
    title: s.name,
    href: s.href
  }));
  const row2Logos = skillsData.slice(6, 12).map(s => ({
    node: s.icon,
    title: s.name,
    href: s.href
  }));

  return (
    <div className="w-full max-w-[1280px] h-full max-h-[94vh] bg-white rounded-[24px] sm:rounded-[32px] md:rounded-[40px] border border-neutral-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.06)] p-4 sm:p-7 md:p-9 relative overflow-hidden flex flex-col justify-between">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-neutral-100 z-10 flex-shrink-0 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-clash font-extrabold text-2xl sm:text-4xl md:text-5xl text-neutral-900 tracking-tight uppercase">
              SKILLS & TOOLS
            </h2>
            <span className="hidden sm:inline-flex items-center gap-1 bg-[#a3f036] text-black border border-black/20 text-[11px] font-sans font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              <Sparkles className="w-3 h-3 fill-black" />
              Interactive
            </span>
          </div>
          <p className="font-serif italic text-neutral-500 text-xs sm:text-sm mt-0.5">
            Technologies, frameworks & digital design tools I work with daily
          </p>
        </div>

        {/* View Mode Toggle Switcher */}
        <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-xl border border-neutral-200/80 self-start md:self-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans font-extrabold transition-all duration-200 ${
              viewMode === 'grid'
                ? 'bg-neutral-900 text-white shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/50'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Grid Cards</span>
          </button>
          <button
            onClick={() => setViewMode('marquee')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans font-extrabold transition-all duration-200 ${
              viewMode === 'marquee'
                ? 'bg-neutral-900 text-white shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/50'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Marquee Flow</span>
          </button>
        </div>
      </div>

      {/* CONTROL BAR: CATEGORIES & SEARCH INPUT */}
      <div className="py-2.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 z-10 flex-shrink-0">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans font-bold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-neutral-900 text-white shadow-md'
                    : 'bg-neutral-100 hover:bg-neutral-200/80 text-neutral-700 border border-neutral-200/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#a3f036]' : 'text-neutral-500'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Live Search Input */}
        <div className="relative min-w-[200px] sm:max-w-[240px]">
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-neutral-50 border border-neutral-200 rounded-full pl-8 pr-7 py-1.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900 p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 my-1 relative overflow-hidden flex flex-col justify-center">
        
        {/* VIEW MODE 1: INTERACTIVE GRID CARDS */}
        {viewMode === 'grid' && (
          <AnimatePresence mode="wait">
            {filteredSkills.length > 0 ? (
              <motion.div
                key={`${activeCategory}-${searchQuery}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full max-h-[58vh] overflow-y-auto pr-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 scrollbar-thin scrollbar-thumb-neutral-200"
              >
                {filteredSkills.map((skill) => (
                  <motion.div
                    key={skill.id}
                    whileHover={{ y: -4, scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="bg-neutral-50 hover:bg-white border border-neutral-200/90 hover:border-neutral-900/40 rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-md group"
                  >
                    <div>
                      {/* Card Top Row: Icon & Proficiency Badge */}
                      <div className="flex items-start justify-between gap-2 mb-2.5">
                        <div className="p-2 bg-white rounded-xl border border-neutral-200/80 shadow-sm group-hover:scale-105 transition-transform duration-300">
                          {skill.icon}
                        </div>
                        <span className={`text-[10px] font-sans font-extrabold px-2.5 py-0.5 rounded-full border ${skill.levelBadge} uppercase tracking-wider`}>
                          {skill.level}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <div className="flex items-center gap-1.5 mb-1">
                        <h3 className="font-sans font-bold text-neutral-900 text-base sm:text-lg group-hover:text-black">
                          {skill.name}
                        </h3>
                        {skill.href && (
                          <a
                            href={skill.href}
                            target="_blank"
                            rel="noreferrer"
                            className="text-neutral-400 hover:text-neutral-900 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                        )}
                      </div>
                      <p className="font-sans text-neutral-600 text-xs leading-relaxed line-clamp-2">
                        {skill.description}
                      </p>
                    </div>

                    {/* Capability Tags */}
                    <div className="flex flex-wrap gap-1 mt-3 pt-2.5 border-t border-neutral-200/60">
                      {skill.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-white border border-neutral-200 text-neutral-700 text-[10px] font-sans font-semibold px-2 py-0.5 rounded-md group-hover:border-neutral-300 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full py-12 flex flex-col items-center justify-center text-center bg-neutral-50 rounded-2xl border border-dashed border-neutral-300"
              >
                <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-500 mb-2">
                  <Search className="w-5 h-5" />
                </div>
                <h4 className="font-sans font-bold text-neutral-800 text-base">No tools or skills found</h4>
                <p className="font-sans text-neutral-500 text-xs max-w-xs mt-1">
                  We couldn't find any tool matching "{searchQuery}". Try selecting another category or resetting search.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory('all');
                    setSearchQuery('');
                  }}
                  className="mt-3 bg-neutral-900 text-white text-xs font-sans font-bold px-4 py-2 rounded-full hover:bg-neutral-800 transition-colors"
                >
                  Reset Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* VIEW MODE 2: MARQUEE FLOW */}
        {viewMode === 'marquee' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full py-4 sm:py-8 flex flex-col gap-6 sm:gap-10 relative overflow-hidden bg-neutral-50/50 rounded-3xl border border-neutral-200/80 p-4"
          >
            {/* Row 1: Left to Right */}
            <div className="w-full">
              <div className="px-2 mb-2 text-left flex items-center justify-between">
                <span className="font-sans text-[11px] font-extrabold text-neutral-500 tracking-wider uppercase flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-[#a3f036]" />
                  Design & Frontend Stack →
                </span>
                <span className="text-[10px] text-neutral-400 font-serif italic">Hover to pause</span>
              </div>
              <LogoLoop
                logos={row1Logos}
                speed={60}
                direction="right"
                logoHeight={44}
                gap={56}
                pauseOnHover={true}
                scaleOnHover={true}
                fadeOut={true}
                fadeOutColor="#ffffff"
                ariaLabel="Design & Frontend Stack"
              />
            </div>

            {/* Row 2: Right to Left */}
            <div className="w-full">
              <div className="px-2 mb-2 text-right flex items-center justify-between">
                <span className="text-[10px] text-neutral-400 font-serif italic">Hover to pause</span>
                <span className="font-sans text-[11px] font-extrabold text-neutral-500 tracking-wider uppercase flex items-center gap-1.5">
                  ← Creative Suite & AI Workflows
                  <Workflow className="w-3.5 h-3.5 text-[#a3f036]" />
                </span>
              </div>
              <LogoLoop
                logos={row2Logos}
                speed={60}
                direction="left"
                logoHeight={44}
                gap={56}
                pauseOnHover={true}
                scaleOnHover={true}
                fadeOut={true}
                fadeOutColor="#ffffff"
                ariaLabel="Creative Suite & AI Workflows"
              />
            </div>
          </motion.div>
        )}
      </div>

      {/* FOOTER SECTION */}
      <div className="flex items-center justify-between pt-2 border-t border-neutral-100 text-xs text-neutral-500 font-sans z-10 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#a3f036] animate-pulse"></span>
          <span className="font-medium text-neutral-600">
            Showing <strong className="text-neutral-900 font-extrabold">{filteredSkills.length}</strong> of {skillsData.length} core tools & technologies
          </span>
        </div>

        <a
          href="#home"
          className="hover:text-neutral-900 font-semibold transition-colors flex items-center gap-1 font-serif text-neutral-500"
        >
          <span>Back to Top</span>
          <span>↑</span>
        </a>
      </div>

    </div>
  );
}
