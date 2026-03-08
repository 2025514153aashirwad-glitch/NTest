import React from 'react';
import { motion } from 'framer-motion';

export default function PageHero({ eyebrow, title, subtitle, accent, children }) {
  return (
    <section className="scholar-hero relative min-h-[58vh] flex flex-col justify-end px-[clamp(2rem,6vw,7rem)] pt-36 pb-20 overflow-hidden">

      {/* Video placeholder — drop in a <video> later with zero CSS changes */}
      <div className="video-bg-layer absolute inset-0" />

      {/* Layered breathing warm radial glows */}
      <div className="absolute inset-0 pointer-events-none scholar-breathe" style={{
        background: `
          radial-gradient(ellipse 80% 60% at 20% 50%, rgba(201,120,20,0.06) 0%, transparent 60%),
          radial-gradient(ellipse 60% 80% at 80% 30%, rgba(30,15,60,0.06) 0%, transparent 50%)
        `,
        zIndex: 1,
      }} />

      {/* Top fade — connects to Navbar */}
      <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none" style={{
        background: 'linear-gradient(to bottom, #00000f 0%, transparent 100%)',
        zIndex: 2,
      }} />

      {/* Bottom dissolve — eliminates the dead gap into the next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{
        background: 'linear-gradient(to bottom, transparent 0%, #00000f 100%)',
        zIndex: 2,
      }} />

      {/* Content */}
      <div className="relative max-w-[820px]" style={{ zIndex: 10 }}>
        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-pill border border-gold/25 bg-gold/6 font-mono text-[0.58rem] text-gold uppercase tracking-[0.22em] mb-8"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            {eyebrow}
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(3.2rem,6.5vw,7rem)] font-light text-white leading-[0.95] tracking-[-0.03em] mb-6"
        >
          <span className="block">{title}</span>
          {accent && (
            <motion.span
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="block italic text-gold/90"
            >
              {accent}
            </motion.span>
          )}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans text-[0.95rem] font-light text-white/50 leading-[1.9] max-w-[560px]"
          >
            {subtitle}
          </motion.p>
        )}

        {children}
      </div>
    </section>
  );
}
