import React from 'react';
import { motion } from 'framer-motion';

export default function EndingBridge() {
  const cinematicEase = [0.22, 1, 0.36, 1];

  return (
    <section className="relative h-[80vh] w-full flex flex-col items-center justify-center bg-transparent overflow-hidden px-[clamp(2rem,6vw,7rem)]">
      {/* Background System */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      >
        <source src="/Sun.mp4" type="video/mp4" />
      </video>

      {/* Atmospheric Overlays */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        {/* Perimeter Vignette */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 20%, rgba(0,0,15,0.3) 60%, rgba(0,0,15,0.85) 100%)'
        }} />
        
        {/* Center Glow */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(201,169,110,0.03) 0%, transparent 60%)'
        }} />

        {/* Bottom Fade - Merging into black Footer text section */}
        <div className="absolute bottom-0 left-0 right-0 h-[35vh]" style={{
          background: 'linear-gradient(to top, rgba(0,0,15,1) 0%, transparent 100%)'
        }} />
        
        {/* Top Fade - Merging from previous content */}
        <div className="absolute top-0 left-0 right-0 h-[35vh]" style={{
          background: 'linear-gradient(to bottom, rgba(0,0,15,1) 0%, transparent 100%)'
        }} />
      </div>

      {/* Empty Content for Blank Bridge Protocol */}
    </section>
  );
}
