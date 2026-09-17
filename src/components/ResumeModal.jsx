import React, { useState } from 'react';
import { X, Download, ExternalLink, Eye, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ResumeModal({ isOpen, onClose }) {
  const [viewMode, setViewMode] = useState('pdf'); // 'pdf' or 'document'

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25 }}
          className="bg-neutral-900 border-2 border-neutral-700 shadow-2xl rounded-2xl w-full max-w-5xl h-[92vh] flex flex-col overflow-hidden relative"
        >
          {/* Top Modal Control Bar */}
          <div className="bg-neutral-950 text-white px-4 sm:px-6 py-3 border-b border-neutral-800 flex items-center justify-between flex-shrink-0 gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="w-3 h-3 rounded-full bg-[#a3f036] shrink-0" />
              <h3 className="font-sans font-bold text-xs sm:text-sm text-white tracking-tight truncate">
                RENUKARADHYA ODEYAR C G — Resume
              </h3>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 shrink-0">
              {/* View mode toggle */}
              <div className="hidden sm:flex items-center bg-neutral-800 p-1 rounded-xl border border-neutral-700">
                <button
                  onClick={() => setViewMode('pdf')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    viewMode === 'pdf'
                      ? 'bg-[#a3f036] text-black font-bold shadow'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Original PDF</span>
                </button>
                <button
                  onClick={() => setViewMode('document')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    viewMode === 'document'
                      ? 'bg-[#a3f036] text-black font-bold shadow'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Document View</span>
                </button>
              </div>

              {/* Open in new tab */}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-neutral-800 hover:bg-neutral-700 text-white px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="Open original PDF in new tab"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Open PDF</span>
              </a>

              {/* Direct Download */}
              <a
                href="/resume.pdf"
                download="RENUKARADHYA_ODEYAR_RESUME.pdf"
                className="bg-[#a3f036] hover:bg-[#b5ff47] text-black px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow"
                title="Download Resume PDF"
              >
                <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                <span className="hidden sm:inline">Download PDF</span>
              </a>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center transition-colors ml-1"
                aria-label="Close Modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Modal Main Body */}
          <div className="flex-1 bg-neutral-950 overflow-hidden relative flex flex-col">
            {viewMode === 'pdf' ? (
              <div className="w-full h-full bg-neutral-900 flex flex-col items-center justify-center relative">
                <iframe
                  src="/resume.pdf#view=FitH"
                  className="w-full h-full border-0 bg-white"
                  title="RENUKARADHYA ODEYAR C G Resume PDF"
                />
              </div>
            ) : (
              /* Exact 1:1 HTML Document Replica of the uploaded PDF */
              <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-neutral-900 flex justify-center">
                <div className="bg-white text-black w-full max-w-[800px] p-6 sm:p-10 font-sans shadow-xl text-left border border-neutral-300 leading-normal text-[13.5px]">
                  
                  {/* Header */}
                  <div className="text-center pb-2">
                    <h1 className="font-bold text-xl sm:text-2xl text-black tracking-wide uppercase">
                      RENUKARADHYA ODEYAR C G
                    </h1>
                    <div className="text-xs sm:text-[13px] text-neutral-800 mt-1 flex flex-wrap items-center justify-center gap-1.5">
                      <span>Santheshivara, Hassan, Karnataka, India</span>
                      <span>|</span>
                      <span>7795561563</span>
                      <span>|</span>
                    </div>
                    <div className="text-xs sm:text-[13px] text-blue-700 mt-0.5 flex flex-wrap items-center justify-center gap-1.5">
                      <a href="mailto:odeyarrenukaradhya@gmail.com" className="hover:underline">odeyarrenukaradhya@gmail.com</a>
                      <span className="text-neutral-600">|</span>
                      <a href="https://github.com/odeyarrenukaradhya" target="_blank" rel="noopener noreferrer" className="hover:underline">github.com/odeyarrenukaradhya</a>
                      <span className="text-neutral-600">|</span>
                      <a href="https://linkedin.com/in/renukaradhyaodeyar/" target="_blank" rel="noopener noreferrer" className="hover:underline">linkedin.com/in/renukaradhyaodeyar/</a>
                    </div>
                  </div>

                  {/* SUMMARY */}
                  <div className="mt-4">
                    <h2 className="font-bold text-sm tracking-wider uppercase text-black">SUMMARY</h2>
                    <hr className="border-t border-black my-1" />
                    <p className="text-justify text-neutral-900 leading-snug">
                      Information Science Engineering graduate specializing in Frontend Design and UI/UX Design with experience in creating responsive, user-centered web and mobile applications. Skilled in designing intuitive interfaces, wireframing, prototyping, and developing modern user experiences using Figma, React.js, JavaScript, TypeScript, HTML, CSS, and Jetpack Compose. Passionate about solving user problems through thoughtful design, usability-focused solutions, and visually engaging digital experiences.
                    </p>
                  </div>

                  {/* EXPERIENCE */}
                  <div className="mt-4">
                    <h2 className="font-bold text-sm tracking-wider uppercase text-black">EXPERIENCE</h2>
                    <hr className="border-t border-black my-1" />
                    <div className="flex justify-between items-baseline font-bold text-black text-[13.5px]">
                      <span>Android App Development Intern | MindMatrix</span>
                      <span>Duration: 3 Months</span>
                    </div>
                    <ul className="list-disc list-outside ml-5 mt-1 space-y-0.5 text-neutral-900">
                      <li>Designed and developed responsive mobile user interfaces using Jetpack Compose and Material Design principles.</li>
                      <li>Created reusable UI components and maintained design consistency across multiple application screens.</li>
                      <li>Improved user experience through optimized layouts, navigation flows, and responsive design practices.</li>
                      <li>Collaborated on integrating AI-powered features using Google AI Studio to enhance user interaction.</li>
                    </ul>
                  </div>

                  {/* SKILLS */}
                  <div className="mt-4">
                    <h2 className="font-bold text-sm tracking-wider uppercase text-black">SKILLS</h2>
                    <hr className="border-t border-black my-1" />
                    <div className="space-y-1 text-neutral-900">
                      <p><span className="font-bold">UI/UX:</span> Figma, Wireframing, Prototyping, User Flows, Responsive Design, Visual System, User-Centered Designs</p>
                      <p><span className="font-bold">Frontend:</span> React.js, JavaScript (ES6+), TypeScript, HTML5, CSS3, Responsive Design</p>
                      <p><span className="font-bold">Mobile:</span> Kotlin, Jetpack Compose</p>
                      <p><span className="font-bold">Tools:</span> Git, GitHub, Postman, VS Code, Figma</p>
                      <p><span className="font-bold">Concepts:</span> MVVM Architecture, API Integration, Agile Development</p>
                    </div>
                  </div>

                  {/* EDUCATION */}
                  <div className="mt-4">
                    <h2 className="font-bold text-sm tracking-wider uppercase text-black">EDUCATION</h2>
                    <hr className="border-t border-black my-1" />
                    <div className="flex justify-between items-baseline font-bold text-black">
                      <span>Kalpataru Institute of Technology, Tiptur</span>
                      <span>Graduated: 2026</span>
                    </div>
                    <div className="flex justify-between items-baseline font-semibold text-neutral-900">
                      <span>B.E. in Information Science Engineering</span>
                      <span className="font-bold">CGPA : 7.99</span>
                    </div>
                  </div>

                  {/* PROJECTS */}
                  <div className="mt-4">
                    <h2 className="font-bold text-sm tracking-wider uppercase text-black">PROJECTS</h2>
                    <hr className="border-t border-black my-1" />
                    
                    <div className="space-y-3 mt-2">
                      <div>
                        <div className="font-bold text-black flex items-center gap-1.5">
                          <span>•</span>
                          <span>ShareX (File Sharing System)</span>
                        </div>
                        <div className="font-bold text-neutral-900 text-xs mt-0.5">
                          React | TypeScript | Supabase | QR Code | Cloud Storage
                        </div>
                        <ul className="list-disc list-outside ml-5 mt-1 space-y-0.5 text-neutral-900">
                          <li>Developed a secure web-based file-sharing platform with 24-hour automatic file deletion.</li>
                          <li>Designed a fully responsive UI ensuring smooth cross-device usability.</li>
                        </ul>
                      </div>

                      <div>
                        <div className="font-bold text-black flex items-center gap-1.5">
                          <span>•</span>
                          <span>Placement & Career Development Platform (Gradium)</span>
                        </div>
                        <div className="font-bold text-neutral-900 text-xs mt-0.5">
                          Figma | React | Tailwind CSS | JavaScript
                        </div>
                        <ul className="list-disc list-outside ml-5 mt-1 space-y-0.5 text-neutral-900">
                          <li>Designed and developed a platform that streamlines placement training, aptitude assessments, mock interviews, and career development activities.</li>
                          <li>Designed responsive user interfaces focused on usability, accessibility, and efficient navigation.</li>
                          <li>Created a responsive interface optimized for desktop and mobile devices.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* CERTIFICATES */}
                  <div className="mt-4">
                    <h2 className="font-bold text-sm tracking-wider uppercase text-black">CERTIFICATES</h2>
                    <hr className="border-t border-black my-1" />
                    <ul className="list-disc list-outside ml-5 mt-1 space-y-0.5 text-neutral-900">
                      <li>Deloitte Australia – Data Analytics Job Simulation</li>
                      <li>NPTEL – Cloud Computing</li>
                      <li>TCS iON Career Edge Young Professional</li>
                    </ul>
                  </div>

                  {/* ACHIEVEMENTS */}
                  <div className="mt-4">
                    <h2 className="font-bold text-sm tracking-wider uppercase text-black">ACHIEVEMENTS</h2>
                    <hr className="border-t border-black my-1" />
                    <ul className="list-disc list-outside ml-5 mt-1 space-y-0.5 text-neutral-900">
                      <li>Recognized for Innovative UI Design – ISE-Xecute Hackathon</li>
                      <li>Innoventure Hackathon, Innovative Ignite Symposium</li>
                      <li>InnoHack - Summit</li>
                    </ul>
                  </div>

                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
