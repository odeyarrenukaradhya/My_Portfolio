import React, { useState } from 'react';
import { Mail, MapPin, Phone, Dribbble, Instagram, Linkedin, Send, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const BehanceIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 7h-7v-2h7v2zm-11.75 3.328c-.808-.574-1.996-.867-3.563-.867h-4.687v11.078h4.757c1.722 0 3.037-.367 3.947-1.1 1.011-.814 1.517-2.052 1.517-3.715 0-1.49-.395-2.624-1.185-3.4zm-5.467-1.467h1.725c.954 0 1.637.135 2.05.405.412.27.618.699.618 1.286 0 .584-.206 1.013-.618 1.286-.413.273-1.096.41-2.05.41h-1.725v-3.387zm2.392 7.742h-2.392v-3.642h2.392c1.077 0 1.848.163 2.313.489.465.326.698.813.698 1.462 0 .644-.233 1.127-.698 1.45-.465.323-1.236.485-2.313.485zm12.355-6.843c-1.396-1.503-3.268-2.254-5.617-2.254-2.316 0-4.17.753-5.563 2.258-1.393 1.506-2.09 3.498-2.09 5.976 0 2.457.697 4.435 2.09 5.934 1.393 1.498 3.247 2.247 5.563 2.247 1.865 0 3.385-.456 4.56-1.368 1.175-.912 1.89-2.186 2.146-3.821h-2.923c-.156.766-.54 1.353-1.152 1.761-.612.408-1.428.612-2.448.612-1.341 0-2.378-.408-3.111-1.224-.733-.816-1.1-1.992-1.1-3.528h10.965c.023-.198.035-.459.035-.783 0-2.527-.643-4.524-1.93-5.992zm-5.643-.284c1.17 0 2.052.33 2.646.99.594.66.93 1.62 1.008 2.88h-7.393c.12-1.236.507-2.184 1.161-2.844.654-.66 1.514-.99 2.578-.99z"/>
  </svg>
);

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  return (
    <div className="w-full max-w-[1280px] min-h-[92vh] md:h-full md:max-h-[94vh] bg-white rounded-[24px] sm:rounded-[32px] md:rounded-[40px] border border-neutral-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.06)] p-3 sm:p-5 md:p-6 relative overflow-y-auto md:overflow-hidden flex flex-col justify-between">
      
      {/* Content Grid */}
      <div className="w-full h-full flex flex-col lg:flex-row items-stretch justify-between gap-4 sm:gap-6 overflow-y-auto lg:overflow-hidden">
        
        {/* LEFT COLUMN: Contact Info & Socials */}
        <div className="w-full lg:w-5/12 flex flex-col justify-between p-2 sm:p-4">
          
          <div>
            {/* Top Branding / Logo */}
            <div className="flex items-center gap-2.5 mb-5 sm:mb-7">
              <div className="w-8 h-8 rounded-xl bg-neutral-900 flex items-center justify-center text-white font-clash font-extrabold text-sm shadow-sm">
                RO
              </div>
              <span className="font-clash font-bold text-lg text-neutral-900 tracking-tight">
                Renukaradhya Odeyar
              </span>
            </div>

            {/* Info Stack */}
            <div className="space-y-5 sm:space-y-6">
              
              {/* Direct Email */}
              <div className="flex items-start gap-3.5 group">
                <div className="w-9 h-9 rounded-xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-800 flex-shrink-0 group-hover:bg-neutral-900 group-hover:text-white transition-colors duration-300">
                  <Mail className="w-4 h-4 stroke-[2]" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-neutral-900 text-sm sm:text-base leading-tight">
                    Direct Email
                  </h4>
                  <p className="font-sans text-neutral-500 text-xs mt-0.5">
                    Feel free to reach out for inquiries or design projects.
                  </p>
                  <a href="mailto:odeyarrenukaradhya@gmail.com" className="font-sans font-semibold text-neutral-900 text-xs sm:text-sm mt-0.5 inline-block hover:underline">
                    odeyarrenukaradhya@gmail.com
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3.5 group">
                <div className="w-9 h-9 rounded-xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-800 flex-shrink-0 group-hover:bg-neutral-900 group-hover:text-white transition-colors duration-300">
                  <MapPin className="w-4 h-4 stroke-[2]" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-neutral-900 text-sm sm:text-base leading-tight">
                    Location
                  </h4>
                  <p className="font-sans text-neutral-500 text-xs mt-0.5">
                    Based in India — available for global opportunities.
                  </p>
                  <p className="font-sans font-semibold text-neutral-900 text-xs sm:text-sm mt-0.5 leading-snug">
                    Bengaluru, Karnataka 560001, India
                  </p>
                </div>
              </div>

              {/* Phone / WhatsApp */}
              <div className="flex items-start gap-3.5 group">
                <div className="w-9 h-9 rounded-xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-800 flex-shrink-0 group-hover:bg-neutral-900 group-hover:text-white transition-colors duration-300">
                  <Phone className="w-4 h-4 stroke-[2]" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-neutral-900 text-sm sm:text-base leading-tight">
                    Phone / WhatsApp
                  </h4>
                  <p className="font-sans text-neutral-500 text-xs mt-0.5">
                    Available Mon–Fri, 9:00 AM – 6:00 PM IST.
                  </p>
                  <a href="tel:+917795561563" className="font-sans font-semibold text-neutral-900 text-xs sm:text-sm mt-0.5 inline-block hover:underline">
                    +91 77955 61563
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Social Icons Row */}
          <div className="pt-5 sm:pt-6 flex items-center gap-2.5">
            <a href="https://dribbble.com/renukaradhya-odeyar" target="_blank" rel="noopener noreferrer" aria-label="Dribbble" className="w-9 h-9 rounded-xl border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-200">
              <Dribbble className="w-4 h-4" />
            </a>
            <a href="https://www.instagram.com/renukaradhyaodeyar/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-xl border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-200">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://www.linkedin.com/in/renukaradhyaodeyar/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-9 h-9 rounded-xl border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-200">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://www.behance.net/renukarodeyar" target="_blank" rel="noopener noreferrer" aria-label="Behance" className="w-9 h-9 rounded-xl border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-200">
              <BehanceIcon className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* RIGHT COLUMN: Professional Contact Form Card */}
        <div className="w-full lg:w-7/12 bg-[#a3f036] rounded-[20px] sm:rounded-[28px] p-4 sm:p-6 md:p-7 flex flex-col justify-between text-neutral-900 shadow-md overflow-y-auto max-h-full">
          
          <div>
            <h2 className="font-sans font-extrabold text-xl sm:text-3xl md:text-4xl leading-tight text-neutral-950 tracking-tight">
              Have a product vision?<br className="hidden sm:inline" /> Let’s build it together.
            </h2>
            
            <p className="font-sans font-medium text-neutral-800 text-xs sm:text-sm mt-1 sm:mt-1.5">
              Share details about your product scope, timeline, or design requirements.
            </p>

            <form onSubmit={handleSubmit} className="mt-4 sm:mt-5 space-y-3 sm:space-y-4">
              
              {/* Name Input */}
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent border-b-2 border-neutral-900/60 focus:border-neutral-950 py-1.5 px-0 text-neutral-950 font-sans font-medium text-xs sm:text-sm placeholder:text-neutral-700 outline-none transition-colors"
                />
              </div>

              {/* Email Input */}
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="your.email@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border-b-2 border-neutral-900/60 focus:border-neutral-950 py-1.5 px-0 text-neutral-950 font-sans font-medium text-xs sm:text-sm placeholder:text-neutral-700 outline-none transition-colors"
                />
              </div>

              {/* Message Input */}
              <div className="relative">
                <textarea
                  rows={3}
                  required
                  placeholder="Tell me about your product, project scope, or opportunity..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-transparent border-b-2 border-neutral-900/60 focus:border-neutral-950 py-1.5 px-0 text-neutral-950 font-sans font-medium text-xs sm:text-sm placeholder:text-neutral-700 outline-none resize-none transition-colors"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2 sm:pt-3">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full bg-[#0f172a] hover:bg-black text-white font-sans font-bold text-xs sm:text-sm py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitted ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                      <span>Message Sent Successfully!</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </div>

            </form>
          </div>

        </div>

      </div>

    </div>
  );
}
