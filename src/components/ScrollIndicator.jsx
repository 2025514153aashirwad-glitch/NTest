import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export default function ScrollIndicator() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Reactive percentage text
  const percentRaw = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    return percentRaw.on("change", (latest) => setPercent(Math.round(latest)));
  }, [percentRaw]);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="fixed left-8 top-1/2 -translate-y-1/2 h-[30vh] w-[4px] z-[150] transition-opacity duration-1000 pointer-events-none"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {/* Track */}
      <div className="absolute inset-0 bg-white/5 rounded-full overflow-hidden backdrop-blur-md border border-white/5 shadow-inner" />
      
      {/* Thumb/Progress Track */}
      <motion.div 
        className="absolute top-0 left-0 right-0 bg-gradient-to-b from-gold via-gold-hi to-transparent origin-top rounded-full shadow-[0_0_15px_rgba(201,169,110,0.2)]"
        style={{ height: '100%', scaleY }}
      />

      {/* Level Marker Pill - Follows current progress position */}
      <motion.div 
        className="absolute left-6"
        style={{ 
          top: `${percent}%`,
          transform: 'translateY(-50%)',
          opacity: visible ? 0.82 : 0
        }}
      >
        <div className="font-mono text-[0.5rem] text-gold-hi tracking-[0.2em] whitespace-nowrap bg-glass backdrop-blur-xl px-2.5 py-1.5 rounded-full border border-gold/25 shadow-2xl flex items-center gap-2">
          <div className="w-1 h-1 bg-gold rounded-full pulse-dot" />
          U∞ — {percent}%
        </div>
      </motion.div>
    </div>
  );
}
