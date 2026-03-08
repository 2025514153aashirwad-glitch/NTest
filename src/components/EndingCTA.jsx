import React from 'react';
import { motion } from 'framer-motion';

export default function EndingCTA() {
  const cinematicEase = [0.22, 1, 0.36, 1];

  return (
    <section className="relative min-h-[60vh] flex flex-col items-center justify-center text-center px-[clamp(2rem,7vw,8rem)] py-28 parchment-section overflow-hidden z-10 light-both-dissolve">
      <div className="parchment-texture" />
      <div className="parchment-glow" />
      {/* Eyebrow Protocol */}
      <div className="flex items-center gap-7 mb-7 relative z-10">
        <div className="w-7 h-px bg-gold" />
        <span className="font-mono text-[0.6rem] text-[var(--ink)] tracking-[0.22em] uppercase">BEGIN HERE</span>
        <div className="w-7 h-px bg-gold" />
      </div>

      {/* Enormous Finish Headline */}
      <motion.h2
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: cinematicEase }}
        className="font-display text-[clamp(4rem,8vw,9rem)] font-light italic text-[var(--ink)] leading-[0.9] tracking-tight group hover:drop-shadow-[0_0_80px_rgba(201,169,110,0.1)] relative z-10 transition-all duration-1000"
      >
        Ready to run<br />
        the <span className="text-gold italic">simulation?</span>
      </motion.h2>

      {/* Final Ghost CTA Pill */}
      <div className="mt-12 relative z-10">
        <button className="px-11 py-4 rounded-pill border border-gold-border bg-transparent font-mono text-[0.72rem] text-[var(--ink)] tracking-[0.14em] uppercase hover:bg-gold/5 hover:border-gold transition-all duration-300">
          Open a Protocol →
        </button>
      </div>
    </section>
  );
}
