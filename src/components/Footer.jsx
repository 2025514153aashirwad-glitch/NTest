import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  const cinematicEase = [0.22, 1, 0.36, 1];

  return (
    <footer className="relative parchment-section overflow-hidden light-top-dissolve">
      <div className="parchment-texture" />
      {/* Middle Divider Protocol (Now Top Divider) */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--ink)]/10 to-transparent relative z-10" />


      {/* Bottom Row: Metadata cluster */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-10 px-[clamp(2rem,7vw,8rem)] py-12 relative z-10">
        
        {/* Left: Brand Identity */}
        <div className="flex flex-col gap-1.5 items-center md:items-start text-center md:text-left">
          <span className="font-sans text-[0.88rem] font-medium text-[var(--ink)]/70 tracking-tight">U∞ Infinitum</span>
          <span className="font-mono text-[0.56rem] text-[var(--ink)]/30 tracking-normal uppercase">© 2026. All rights reserved.</span>
        </div>

        {/* Center: Quick Matrix */}
        <div className="flex items-center gap-8 lg:gap-14">
          {['Scholar', 'Syndicate', 'Institution', 'Tech'].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} className="font-mono text-[0.56rem] text-[var(--ink)]/40 hover:text-gold tracking-[0.14em] transition-colors duration-300 uppercase">
              {link}
            </a>
          ))}
        </div>

        {/* Right: Geographic Anchor */}
        <div className="font-mono text-[0.58rem] text-[var(--ink)]/30 tracking-[0.2em] uppercase">
          NEW DELHI, IN
        </div>

      </div>

    </footer>
  );
}
