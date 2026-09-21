import React from 'react';
import { motion } from 'framer-motion';

function DribbbleIcon() {
  return (
    <svg className="w-4 h-4 text-neutral-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"></path>
      <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32"></path>
      <path d="M8.56 2.75c4.37 6 6 9.42 8 18.5"></path>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="w-4 h-4 text-neutral-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg className="w-4 h-4 text-neutral-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
      <rect x="2" y="9" width="4" height="12"></rect>
      <circle cx="4" cy="4" r="2"></circle>
    </svg>
  );
}

function BehanceIcon() {
  return (
    <svg className="w-4 h-4 text-neutral-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h6a3 3 0 0 1 0 6H3V8z"></path>
      <path d="M3 14h7a3.5 3.5 0 0 1 0 7H3v-7z"></path>
      <path d="M14 13h7a3.5 3.5 0 0 0-7-2 3.5 3.5 0 0 0 0 7c2 0 3.5-1 4-2.5"></path>
      <line x1="15" y1="7" x2="20" y2="7"></line>
    </svg>
  );
}

export default function SocialPills() {
  const socials = [
    { name: 'Dribbble', icon: <DribbbleIcon />, url: 'https://dribbble.com/renukaradhya-odeyar' },
    { name: 'Instagram', icon: <InstagramIcon />, url: 'https://www.instagram.com/renukaradhyaodeyar/' },
    { name: 'LinkedIn', icon: <LinkedinIcon />, url: 'https://www.linkedin.com/in/renukaradhyaodeyar/' },
    { name: 'Behance', icon: <BehanceIcon />, url: 'https://www.behance.net/renukarodeyar' },
  ];

  return (
    <div className="flex flex-row md:flex-col flex-nowrap sm:flex-wrap gap-1 xs:gap-1.5 md:gap-2.5 z-20 items-center justify-center md:items-end w-full md:w-auto">
      {socials.map((social, index) => (
        <motion.a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="bg-white/95 backdrop-blur-sm border border-neutral-200/90 shadow-[0_2px_6px_rgba(0,0,0,0.04)] hover:shadow-md hover:border-neutral-300 rounded-full px-2 xs:px-2.5 sm:px-4 md:px-5 py-1 sm:py-1.5 md:py-2 flex items-center gap-1 xs:gap-1.5 sm:gap-2 text-neutral-900 font-sans text-[10px] xs:text-[11px] sm:text-xs md:text-sm font-medium transition-all duration-300 w-fit cursor-pointer group flex-shrink-0"
        >
          <span className="transition-transform duration-300 group-hover:scale-110 text-neutral-800 scale-90 xs:scale-100">
            {social.icon}
          </span>
          <span>{social.name}</span>
        </motion.a>
      ))}
    </div>
  );
}
