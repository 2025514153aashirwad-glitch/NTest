import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Statement() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Find all line-inners and data-reveals inside this section
          const elements = entry.target.querySelectorAll('.line-inner, [data-reveal]');
          elements.forEach(el => el.classList.add('revealed'));
        }
      });
    }, { threshold: 0.15 });

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative h-screen flex flex-col justify-center bg-transparent overflow-hidden px-[7vw]"
    >
      {/* Background System */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      >
        <source src="/216148_medium.mp4" type="video/mp4" />
      </video>

      {/* Atmospheric Overlays */}
      <div className="absolute inset-0 pointer-events-none z-[5]">
        {/* Perimeter Vignette */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 50%, rgba(3,8,16,0.08) 70%, rgba(3,8,16,0.45) 100%)'
        }} />
        
        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-[32vh]" style={{
          background: 'linear-gradient(to top, rgba(3,8,16,0.65) 0%, transparent 100%)'
        }} />
        
        {/* Top Fade */}
        <div className="absolute top-0 left-0 right-0 h-[18vh]" style={{
          background: 'linear-gradient(to bottom, rgba(3,8,16,0.35) 0%, transparent 100%)'
        }} />
      </div>

      <div className="relative z-10">
      {/* Section Counter */}
      <div className="absolute top-16 right-14">
        <div className="font-mono text-[0.6rem] text-gold tracking-[0.2em] uppercase">
          01
        </div>
      </div>

      {/* Main Headline Protocol */}
      <div className="space-y-[-0.05em]">
        <div className="line-mask">
          <span className="line-inner block text-hero text-w92 font-display" data-line>
            We build what
          </span>
        </div>
        <div className="line-mask">
          <span className="line-inner block text-hero text-w92 font-display transition-delay-100" data-line>
            <span className="italic-gold mr-4">standard</span> institutions
          </span>
        </div>
        <div className="line-mask">
          <span className="line-inner block text-hero text-w92 font-display transition-delay-200" data-line>
            cannot.
          </span>
        </div>
      </div>

      {/* Sub-copy Protocol */}
      <div className="mt-9 max-w-[480px]" data-reveal data-reveal-delay="400">
        <p className="font-sans text-body text-w55 leading-[1.9] tracking-wide">
          U Infinitum is the foundational layer for 
          next-generation industrial autonomy and 
          synthetic dataset environments.
        </p>
      </div>

      </div>

      {/* Bottom Horizontal Rule */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
    </section>
  );
}
