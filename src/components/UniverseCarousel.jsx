import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const UNIVERSES = [
  { 
    id: 1, 
    key: 'forge', 
    name: 'Forge', 
    color: '#c0501a', 
    rgb: '192, 80, 26', 
    tagline: 'Precision engineered industrial simulation backbone.', 
    gradient: 'linear-gradient(135deg,#1a0a04,#3d1a08)',
    glow: 'rgba(192,80,26,0.45)'
  },
  { 
    id: 2, 
    key: 'scholar', 
    name: 'Scholar', 
    color: '#1a6bc0', 
    rgb: '26, 107, 192', 
    tagline: 'The accelerated academic sprint environment.', 
    gradient: 'linear-gradient(135deg,#040d1a,#082040)',
    glow: 'rgba(26,107,192,0.45)'
  },
  { 
    id: 3, 
    key: 'syndicate', 
    name: 'Syndicate', 
    color: '#8b1ac0', 
    rgb: '139, 26, 192', 
    tagline: 'Private operator networks and peer intelligence.', 
    gradient: 'linear-gradient(135deg,#0d041a,#1e0840)',
    glow: 'rgba(139,26,192,0.45)'
  },
  { 
    id: 4, 
    key: 'vault', 
    name: 'Vault', 
    color: '#1ac078', 
    rgb: '26, 192, 120', 
    tagline: 'Secure multi-layered dataset and credential archive.', 
    gradient: 'linear-gradient(135deg,#041a10,#083024)',
    glow: 'rgba(26,192,120,0.40)'
  },
  { 
    id: 5, 
    key: 'registry', 
    name: 'Registry', 
    color: '#c0aa1a', 
    rgb: '192, 170, 26', 
    tagline: 'Verified global institution and talent directory.', 
    gradient: 'linear-gradient(135deg,#1a1604,#3d3208)',
    glow: 'rgba(192,170,26,0.45)'
  },
  { 
    id: 6, 
    key: 'signal', 
    name: 'Signal', 
    color: '#1ac0b8', 
    rgb: '26, 192, 184', 
    tagline: 'Real-time telemetry and performance data feeds.', 
    gradient: 'linear-gradient(135deg,#041a1a,#083040)',
    glow: 'rgba(26,192,184,0.45)'
  },
  { 
    id: 7, 
    key: 'nexus', 
    name: 'Nexus', 
    color: '#c01a4f', 
    rgb: '192, 26, 79', 
    tagline: 'Cross-universe coordination and bridge protocol.', 
    gradient: 'linear-gradient(135deg,#1a0410,#3d0820)',
    glow: 'rgba(192,26,79,0.45)'
  },
  { 
    id: 8, 
    key: 'launchpad', 
    name: 'Launchpad', 
    color: '#4f1ac0', 
    rgb: '79, 26, 192', 
    tagline: 'Institutional onboarding and deployment gateway.', 
    gradient: 'linear-gradient(135deg,#08041a,#14083d)',
    glow: 'rgba(79,26,192,0.50)'
  },
  { 
    id: 9, 
    key: 'atlas', 
    name: 'Atlas', 
    color: '#1a8bc0', 
    rgb: '26, 139, 192', 
    tagline: 'Geographic and structural intelligence mapping.', 
    gradient: 'linear-gradient(135deg,#040f1a,#082535)',
    glow: 'rgba(26,139,192,0.45)'
  },
  { 
    id: 10, 
    key: 'core', 
    name: 'Core', 
    color: '#c05a1a', 
    rgb: '192, 90, 26', 
    tagline: 'Deep architecture and simulation API backbone.', 
    gradient: 'linear-gradient(135deg,#1a0b04,#3d2008)',
    glow: 'rgba(192,90,26,0.45)'
  },
  { 
    id: 11, 
    key: 'prism', 
    name: 'Prism', 
    color: '#6bc01a', 
    rgb: '107, 192, 26', 
    tagline: 'Predictive analytics and high-fidelity visualization.', 
    gradient: 'linear-gradient(135deg,#0a1a04,#183008)',
    glow: 'rgba(107,192,26,0.40)'
  },
  { 
    id: 12, 
    key: 'horizon', 
    name: 'Horizon', 
    color: '#1a4fc0', 
    rgb: '26, 79, 192', 
    tagline: 'R&D sector for exotic simulation protocols.', 
    gradient: 'linear-gradient(135deg,#04081a,#081535)',
    glow: 'rgba(26,79,192,0.50)'
  }
];

export default function UniverseCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoplayRef = useRef(null);

  const goTo = useCallback((index) => {
    setCurrentIndex((index + UNIVERSES.length) % UNIVERSES.length);
  }, []);

  const next = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);
  const prev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);

  useEffect(() => {
    if (!isPaused) {
      autoplayRef.current = setInterval(next, 4000);
    }
    return () => clearInterval(autoplayRef.current);
  }, [next, isPaused]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [next, prev]);

  return (
    <section 
      className="relative min-h-screen h-screen w-full flex flex-col universes-section worlds-section"
      style={{ background: '#00000f', color: '#f0ece4' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Section Header */}
      <div className="relative z-10 universes-header px-[clamp(2rem,5vw,5rem)] pt-12">
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-pill border border-gold/30 bg-transparent font-mono text-[0.6rem] text-gold/80 uppercase tracking-wider mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          12 Universes
        </div>
        <h2 className="font-display text-[clamp(2.8rem,6vw,5.5rem)] font-light text-[#f0ece4] leading-[1.0] tracking-[-0.02em] text-left">
          One Platform. <br />
          <span className="italic-gold italic">Twelve Worlds.</span>
        </h2>
      </div>

      {/* 3D Carousel Field */}
      <div className="relative z-10 w-full flex-1 flex justify-center items-center perspective-[1600px] perspective-origin-[50%_42%] preserve-3d">
        <div className="relative w-full h-[480px] preserve-3d flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            {UNIVERSES.map((universe, index) => {
              const offset = (index - currentIndex + UNIVERSES.length) % UNIVERSES.length;
              const actualOffset = offset > UNIVERSES.length / 2 ? offset - UNIVERSES.length : offset;
              
              const isVisible = Math.abs(actualOffset) <= 3;
              if (!isVisible) return null;

              return (
                <Card 
                  key={universe.id} 
                  universe={universe} 
                  offset={actualOffset} 
                  onClick={() => actualOffset === 0 ? null : goTo(index)}
                />
              );
            })}
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prev}
          className="absolute left-8 z-20 w-[52px] h-[52px] rounded-full bg-white/6 border border-white/11 backdrop-blur-[16px] flex items-center justify-center cursor-none hover:bg-gold/12 hover:border-gold/30 hover:scale-[1.08] transition-all duration-300 pointer-events-auto group"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 stroke-w65 group-hover:stroke-gold transition-colors rotate-180">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
        <button
          onClick={next}
          className="absolute right-8 z-20 w-[52px] h-[52px] rounded-full bg-white/6 border border-white/11 backdrop-blur-[16px] flex items-center justify-center cursor-none hover:bg-gold/12 hover:border-gold/30 hover:scale-[1.08] transition-all duration-300 pointer-events-auto group"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 stroke-w65 group-hover:stroke-gold transition-colors">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Progress Dots */}
      <div className="relative z-10 flex items-center justify-center gap-[6px] mt-8 mb-16">
        {UNIVERSES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-[6px] rounded-full transition-all duration-600 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
              currentIndex === i ? 'w-7 bg-gold' : 'w-[6px] bg-white/25 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
}

function Card({ universe, offset, onClick }) {
  // 3D Transform Protocol Calculation
  const getTransform = () => {
    if (offset === 0) return 'translateX(0px) translateZ(0px) rotateY(0deg) scale(1.0)';
    if (offset === 1) return 'translateX(295px) translateZ(-90px) rotateY(-17deg) scale(0.88)';
    if (offset === -1) return 'translateX(-295px) translateZ(-90px) rotateY(17deg) scale(0.88)';
    if (offset === 2) return 'translateX(545px) translateZ(-200px) rotateY(-27deg) scale(0.74)';
    if (offset === -2) return 'translateX(-545px) translateZ(-200px) rotateY(27deg) scale(0.74)';
    if (offset === 3) return 'translateX(755px) translateZ(-330px) rotateY(-35deg) scale(0.60)';
    if (offset === -3) return 'translateX(-755px) translateZ(-330px) rotateY(35deg) scale(0.60)';
    return 'translateX(0px) translateZ(-1000px) scale(0)';
  };

  const getOpacity = () => {
    if (offset === 0) return 1;
    if (Math.abs(offset) === 1) return 0.72;
    if (Math.abs(offset) === 2) return 0.48;
    if (Math.abs(offset) === 3) return 0.26;
    return 0;
  };

  const getFilter = () => {
    if (offset === 0) return 'brightness(1.0) saturate(1.0)';
    if (Math.abs(offset) === 1) return 'brightness(0.82) saturate(0.80)';
    if (Math.abs(offset) === 2) return 'brightness(0.65) saturate(0.65)';
    if (Math.abs(offset) === 3) return 'brightness(0.50) saturate(0.50)';
    return 'none';
  };

  const activeStyles = offset === 0 ? {
    border: `1px solid rgba(${universe.rgb}, 0.50)`,
    boxShadow: `0 0 0 1px rgba(201,168,76,0.28), 0 20px 60px rgba(0,0,0,0.65), 0 0 80px rgba(201,168,76,0.07), 0 0 55px rgba(${universe.rgb}, 0.14), 0 1px 0 rgba(255,255,255,0.1) inset`
  } : {
    border: '1px solid rgba(255,255,255,0.08)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.45)'
  };

  return (
    <motion.div
      initial={false}
      animate={{
        transform: getTransform(),
        opacity: getOpacity(),
        filter: getFilter(),
      }}
      transition={{ duration: 0.60, ease: [0.34, 1.56, 0.64, 1] }}
      onClick={onClick}
      className={`absolute w-[310px] h-[430px] rounded-[24px] flex flex-col overflow-hidden transform-gpu cursor-none ${offset === 0 ? 'active' : ''}`}
      style={{
        zIndex: 10 - Math.abs(offset),
        ...activeStyles
      }}
    >
      {/* Top Image Zone (52%) */}
      <div className="h-[52%] w-full relative overflow-hidden" style={{ background: universe.gradient }}>
        {/* Radial Glow Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 70% at 55% 45%, ${universe.glow}, transparent 70%)`
          }}
        />
        {/* Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
          <span className="font-display text-[3.2rem] font-light italic text-white/22 tracking-[-0.02em] whitespace-nowrap">
            {universe.name}
          </span>
        </div>
      </div>

      {/* Bottom Information Zone (48%) */}
      <div
        className="h-[48%] p-[1.6rem_1.8rem_1.8rem] flex flex-col"
        style={{
          background: '#0a0806',
          borderTop: '1px solid rgba(201,168,76,0.12)',
        }}
      >
        <div
          className="inline-flex items-center gap-[0.4rem] px-[0.75rem] py-[0.26rem] rounded-pill font-mono text-[0.58rem] tracking-[0.14em] uppercase mb-[0.85rem] w-fit"
          style={{
            border: `1px solid rgba(${universe.rgb}, 0.28)`,
            backgroundColor: `rgba(${universe.rgb}, 0.12)`,
            color: universe.color
          }}
        >
          <div className="w-[4px] h-[4px] rounded-full bg-current shrink-0" />
          {universe.name}
        </div>
        <h3 className="font-display text-[1.65rem] font-normal text-[#f0ece4] mb-[0.55rem] leading-[1.1] tracking-[-0.01em]">
          {universe.name}
        </h3>
        <p className="font-sans text-[0.80rem] font-light text-[rgba(240,236,228,0.52)] leading-[1.7] flex-1">
          {universe.tagline}
        </p>
        <div className="flex items-center justify-between mt-auto pt-4 group/footer">
          <span className="font-mono text-[0.52rem] tracking-[0.18em] uppercase opacity-70" style={{ color: universe.color }}>EXPLORE</span>
          <span className="text-[1rem] transition-transform duration-300 group-hover/footer:translate-x-1" style={{ color: universe.color }}>→</span>
        </div>
      </div>
    </motion.div>
  );
}
