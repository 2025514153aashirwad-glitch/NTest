import React from 'react';

export default function CinematicBridge() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-void">
      {/* Background System */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      >
        <source src="/141367-777657244_medium.mp4" type="video/mp4" />
      </video>

      {/* Atmospheric Overlays */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
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

      {/* Minimal UI indicator if needed, or keep completely empty as requested */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10">
        <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
      </div>
    </section>
  );
}
