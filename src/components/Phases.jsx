import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const PHASES = [
  {
    week: "01",
    tag: "IMMERSION",
    title: "Environment Protocol",
    body: "First-contact with synthetic industrial datasets. You establish spatial baseline and neural mapping of the target simulation.",
    number: "I"
  },
  {
    week: "02",
    tag: "SIMULATION",
    title: "Operator Stress",
    body: "High-latency scenario testing. You work through edge-case industrial failures at 1:1 scale with real machine telemetry.",
    number: "II"
  },
  {
    week: "03",
    tag: "INTEGRATION",
    title: "Output Delivery",
    body: "Final synthesis. Your session logs are compiled into institutional-grade industrial intelligence. Credit is weightless.",
    number: "III"
  }
];

export default function Phases() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const elements = entry.target.querySelectorAll('[data-reveal]');
          elements.forEach(el => el.classList.add('revealed'));
        }
      });
    }, { threshold: 0.1 });

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center parchment-section py-20 px-[clamp(2rem,6vw,7rem)] phases-section z-[2] light-top-dissolve"
    >
      <div className="parchment-texture" />
      <div className="parchment-glow" />
      {/* Section Counter */}
      <div className="absolute top-16 right-14">
        <div className="font-mono text-[0.6rem] text-gold tracking-[0.2em] uppercase">
          03
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[42%_58%] gap-[5vw] w-full">
        
        {/* Left Column: Sticky Context */}
        <div className="lg:sticky lg:top-40 self-start space-y-8">
          <div className="flex items-center gap-6">
            <div className="w-6 h-px bg-gold" />
            <span className="font-mono text-[0.6rem] text-gold tracking-[0.22em] uppercase">
              THREE-PHASE PROTOCOL
            </span>
          </div>
          
          <h2 className="font-display text-[clamp(2.5rem,4.5vw,4.5rem)] text-[var(--ink)] leading-[1.05] tracking-tight">
            Work in <span className="italic-gold">sequence.</span><br />
            Advance by <span className="italic-gold">output.</span>
          </h2>

          <p className="font-sans text-[0.9rem] font-light text-[var(--ink)]/70 leading-[1.85] max-w-[340px]">
            No lectures exist inside U Infinitum. 
            Only environments, datasets, and what 
            you produce inside them.
          </p>
        </div>

        {/* Right Column: Protocol Cards */}
        <div className="space-y-4">
          {PHASES.map((phase, idx) => (
            <PhaseCard key={idx} phase={phase} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}

function PhaseCard({ phase, index }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 150, damping: 20 });

  function handleMouseMove(e) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 45 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: index * 0.11, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX, rotateY, perspective: 1000 }}
      className="group relative p-[2.2rem_2.4rem] rounded-xl border border-w08 parchment-card overflow-hidden transition-all duration-500 hover:border-gold-border hover:-translate-y-1"
    >
      {/* Top Shimmer */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Ghost Number */}
      <div className="absolute top-0 right-6 font-display text-[5.5rem] opacity-[0.03] group-hover:opacity-[0.06] text-gold transition-opacity duration-500 pointer-events-none select-none">
        {phase.number}
      </div>

      <div className="space-y-6 relative z-10">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[0.52rem] text-gold tracking-[0.2em] uppercase">
            WEEK {phase.week} — {phase.tag}
          </span>
        </div>

        <h3 className="font-display text-[1.65rem] font-medium text-[var(--ink)] tracking-tight leading-tight">
          {phase.title}
        </h3>

        <p className="font-sans text-[0.82rem] font-light text-[var(--ink)]/65 leading-relaxed max-w-[420px]">
          {phase.body}
        </p>

        <div className="pt-2">
          <button className="flex items-center gap-2 font-mono text-[0.6rem] text-gold tracking-[0.15em] uppercase group/btn">
            <span className="group-hover/btn:translate-x-1 transition-transform duration-300">→ VIEW PHASE</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
