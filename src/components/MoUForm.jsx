import React from 'react';
import { motion } from 'framer-motion';

const PROOFS = [
  { symbol: "∞", text: "Zero infrastructure required on your end" },
  { symbol: "◎", text: "Live telemetry dashboard for educators" },
  { symbol: "✦", text: "Verified credentials for every graduate" }
];

export default function MoUForm() {
  const cinematicEase = [0.22, 1, 0.36, 1];

  return (
    <section className="relative min-h-screen py-24 flex items-center parchment-section overflow-hidden px-[clamp(2rem,6vw,7rem)] light-both-dissolve">
      {/* Parchment Background Architecture */}
      <div className="parchment-texture" />
      <div className="parchment-glow" />

      {/* Section Counter */}
      <div className="absolute top-16 right-14 z-10">
        <div className="font-mono text-[0.6rem] text-gold tracking-[0.2em] uppercase">
          07
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full items-center relative z-10">
        
        {/* Left: Institutional Context */}
        <div className="space-y-12">
          <div className="space-y-6">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: cinematicEase }}
              className="font-display text-[clamp(2.5rem,4.5vw,4.5rem)] text-[var(--ink)] leading-[1.05] tracking-tight"
            >
              Your portal.<br />
              <span className="italic-gold">Our infrastructure.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: cinematicEase }}
              className="font-sans text-[0.9rem] font-light text-[var(--ink)]/70 leading-[1.85] max-w-[380px]"
            >
              U Infinitum provides the secure simulation backbone 
              for modern institutional research, removing 
              hardware bottlenecks from the learning cycle.
            </motion.p>
          </div>

          {/* Proof Cards Cluster */}
          <div className="space-y-3">
            {PROOFS.map((proof, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 + idx * 0.1, ease: cinematicEase }}
                className="flex items-center gap-4 parchment-card rounded-lg p-[0.9rem_1.2rem] hover:border-gold-border transition-all duration-500 group"
              >
                <div className="w-8 h-8 rounded-sm bg-gold/10 border border-gold/20 flex items-center justify-center font-display text-gold text-sm group-hover:scale-110 transition-transform">
                  {proof.symbol}
                </div>
                <span className="font-sans text-[0.82rem] font-light text-[var(--ink)]/65 group-hover:text-[var(--ink)] transition-colors">
                  {proof.text}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Glassmorphic Inquiry Protocol */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.1, ease: cinematicEase }}
          className="p-11 rounded-[32px] parchment-card saturate-[1.8] relative overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
        >
          {/* Form Top Shimmer */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div className="mb-8">
            <h3 className="font-display text-[2rem] font-normal text-[var(--ink)]">Initiate MoU</h3>
            <div className="font-mono text-[0.58rem] text-gold tracking-[0.2em] uppercase mt-1">
              INQUIRY PROTOCOL
            </div>
          </div>

          <div className="w-full h-px bg-w08 mb-8" />

          <form className="space-y-6" onSubmit={e => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormField label="INSTITUTION NAME" placeholder="e.g. Imperial College" />
              <FormField label="COHORT SIZE" placeholder="e.g. 24 Operators" />
              <FormField label="DOMAIN" placeholder="e.g. Robotics" />
              <FormField label="CONTACT EMAIL" placeholder="operator@domain.in" />
            </div>

            <div className="pt-8">
              <button className="relative w-full h-[50px] rounded-md bg-gold group/btn overflow-hidden transition-all duration-500 hover:-translate-y-0.5 shadow-[0_2px_22px_rgba(201,169,110,0.38)] hover:shadow-[0_8px_30px_rgba(201,169,110,0.52)]">
                {/* Hover Shimmer Overlay */}
                <div className="absolute inset-0 bg-gold-hi translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[var(--ease)]" />
                <span className="relative z-10 font-sans font-medium text-[0.82rem] tracking-[0.12em] uppercase text-[#060e0b]">
                  Submit Protocol →
                </span>
              </button>
            </div>
          </form>
        </motion.div>

      </div>
    </section>
  );
}

function FormField({ label, placeholder }) {
  return (
    <div className="space-y-2">
      <label className="block font-mono text-[0.58rem] text-gold/70 tracking-[0.18em] uppercase ml-1">
        {label}
      </label>
      <input 
        type="text" 
        placeholder={placeholder}
        className="w-full h-[48px] px-4 rounded-md bg-[var(--parchment)]/30 border border-[var(--ink)]/10 font-sans text-[0.85rem] font-light text-[var(--ink)] placeholder:text-[var(--ink)]/30 focus:outline-none focus:border-gold/55 focus:bg-[var(--parchment)]/50 focus:ring-4 focus:ring-gold/5 transition-all duration-300"
      />
    </div>
  );
}
