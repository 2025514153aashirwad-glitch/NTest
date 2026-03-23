import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function PricingBento() {
  const cinematicEase = [0.22, 1, 0.36, 1];

  return (
    <section className="relative min-h-screen py-24 flex flex-col items-center justify-center bg-transparent overflow-hidden px-[clamp(1.5rem,5vw,4rem)]">
      {/* Background System */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      >
        <source src="/323784_medium.mp4" type="video/mp4" />
      </video>

      {/* Atmospheric Overlays */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        {/* Perimeter Vignette */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(0,0,15,0.3) 60%, rgba(0,0,15,0.7) 100%)'
        }} />
        
        {/* Center Glow */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(201,130,20,0.06) 0%, transparent 70%)'
        }} />

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-[28vh]" style={{
          background: 'linear-gradient(to top, rgba(0,0,15,0.8) 0%, transparent 100%)'
        }} />
        
        {/* Top Fade */}
        <div className="absolute top-0 left-0 right-0 h-[20vh]" style={{
          background: 'linear-gradient(to bottom, rgba(0,0,15,0.5) 0%, transparent 100%)'
        }} />
      </div>

      {/* Section Counter */}
      <div className="absolute top-16 right-14 z-10">
        <div className="font-mono text-[0.6rem] text-gold tracking-[0.2em] uppercase">
          05
        </div>
      </div>

      {/* Header Protocol */}
      <div className="relative z-10 text-center space-y-6 mb-16 pt-10">
        <div className="inline-flex items-center px-4 py-1 rounded-pill border border-gold/20 bg-gold/5 font-mono text-[0.52rem] text-gold uppercase tracking-[0.2em]">
          Institutional Pricing
        </div>
        <h2 className="font-display text-[clamp(3rem,5.5vw,5rem)] text-w92 leading-tight">
          One flat rate.<br />
          <span className="italic-gold">Zero infrastructure.</span>
        </h2>
      </div>

      {/* Bento Grid Protocol */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4.5 max-w-[960px] w-full mx-auto">
        
        {/* Cell 1: School */}
        <BentoCard label="SCHOOL STUDENTS" price="₹1000" glyph="₹" />

        {/* Cell 2: University */}
        <BentoCard label="UNIVERSITY SCHOLARS" price="₹1550" glyph="₹" />

        {/* Cell 3: Wide Deliverables */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: cinematicEase }}
          className="md:col-span-2 p-8 lg:p-11 rounded-xl bg-glass backdrop-blur-3xl border border-w08 flex flex-col lg:flex-row items-center gap-12 relative overflow-hidden"
        >
          <div className="flex gap-12 flex-shrink-0">
            <StatBlock value="3W" label="SPRINT DURATION" />
            <div className="w-px h-12 bg-w08 self-center" />
            <StatBlock value="0%" label="IT INFRA REQUIRED" />
            <div className="w-px h-12 bg-w08 self-center" />
            <StatBlock value="∞" label="DATASET ACCESS" />
          </div>

          <div className="flex-1 lg:ml-auto">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
              <Deliverable text="Bulk Student Access Keys" />
              <Deliverable text="Performance Telemetry Dashboard" />
              <Deliverable text="Verified Institution Credentials" />
              <Deliverable text="Dedicated Institution Portal" />
            </ul>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

function BentoCard({ label, price, glyph }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]));
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]));

  function handleMouseMove(e) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, perspective: 1000 }}
      className="group relative p-10 rounded-xl bg-glass backdrop-blur-3xl border border-w08 overflow-hidden transition-all duration-500 hover:border-gold-border"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      {/* Ghost Glyph */}
      <div className="absolute bottom-[-2.5rem] right-[-1rem] font-display text-[8rem] opacity-[0.04] text-gold pointer-events-none select-none">
        {glyph}
      </div>

      <div className="relative z-10 space-y-6">
        <div className="font-mono text-[0.6rem] text-gold tracking-[0.2em] uppercase">
          {label}
        </div>
        <div className="space-y-1">
          <div className="font-display text-[clamp(3.5rem,5vw,5rem)] font-light text-w92 leading-none tracking-[-0.03em]">
            {price}
          </div>
          <div className="font-mono text-[0.58rem] text-w30 tracking-[0.2em] uppercase">
            PER STUDENT · PER SPRINT
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StatBlock({ value, label }) {
  return (
    <div className="space-y-1">
      <div className="font-display text-[3rem] text-w92 leading-none">
        {value}
      </div>
      <div className="font-mono text-[0.52rem] text-w28 tracking-[0.2em] uppercase">
        {label}
      </div>
    </div>
  );
}

function Deliverable({ text }) {
  return (
    <li className="flex items-center gap-3 group/item">
      <span className="text-gold opacity-60 group-hover/item:opacity-100 transition-opacity">→</span>
      <span className="font-sans text-[0.82rem] font-light text-w55 group-hover/item:text-w90 group-hover/item:-translate-x-1 transition-all duration-300">
        {text}
      </span>
    </li>
  );
}
