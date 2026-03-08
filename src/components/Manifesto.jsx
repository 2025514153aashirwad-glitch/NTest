import React from 'react';
import { motion } from 'framer-motion';

const MANIFESTO_ITEMS = [
  {
    index: "01",
    bold: "No passive consumption.",
    text: "Every session is an active, recorded interaction with real industrial data."
  },
  {
    index: "02",
    bold: "Anti-gravity grading.",
    text: "Your work is weightless here — free from institutional bias. Only output matters."
  },
  {
    index: "03",
    bold: "Syndicate access.",
    text: "Complete the sprint and enter a network of operators, not scholars."
  }
];

export default function Manifesto() {
  const cinematicEase = [0.22, 1, 0.36, 1];

  return (
    <section className="relative h-screen w-full flex items-center bg-transparent overflow-hidden px-[clamp(3rem,7vw,8rem)]">
      {/* Background System */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      >
        <source src="/132253-752803366_medium.mp4" type="video/mp4" />
      </video>

      {/* Atmospheric Overlays */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        {/* Perimeter Vignette */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(3,8,16,0.2) 70%, rgba(3,8,16,0.6) 100%)'
        }} />
        
        {/* Center Glow */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at 70% 50%, rgba(60,130,246,0.08) 0%, transparent 60%)'
        }} />

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-[25vh]" style={{
          background: 'linear-gradient(to top, rgba(3,8,16,0.7) 0%, transparent 100%)'
        }} />
        
        {/* Top Fade */}
        <div className="absolute top-0 left-0 right-0 h-[20vh]" style={{
          background: 'linear-gradient(to bottom, rgba(3,8,16,0.5) 0%, transparent 100%)'
        }} />
      </div>
      {/* Section Counter */}
      <div className="absolute top-16 right-14 z-10">
        <div className="font-mono text-[0.6rem] text-gold tracking-[0.2em] uppercase">
          06
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 w-full min-h-[60vh] items-center">
        
        {/* Left: Pull Quote Portal */}
        <div className="lg:pr-16 space-y-10">
          <motion.blockquote
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: cinematicEase }}
            className="font-display text-[clamp(2rem,3.2vw,3rem)] italic text-w88 leading-[1.25] tracking-tight"
          >
            "The simulation is<br />
            the <span className="font-bold text-white not-italic">credential.</span><br />
            The environment is<br />
            the <span className="font-bold text-white not-italic">classroom.</span>"
          </motion.blockquote>

          <div className="space-y-4">
            <div className="w-9 h-px bg-gold" />
            <div className="font-mono text-[0.58rem] text-w30 tracking-[0.18em] uppercase">
              — U∞ Infinitum, 2026
            </div>
          </div>
        </div>

        {/* Vertical Divider Logic */}
        <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-y-1/2 w-px h-[40vh] bg-w08" />

        {/* Right: Manifesto Points Protocol */}
        <div className="lg:pl-20 space-y-14">
          {MANIFESTO_ITEMS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: idx * 0.15, ease: cinematicEase }}
              className="flex gap-6 group"
            >
              <div className="font-mono text-[0.62rem] text-gold/60 group-hover:text-gold tracking-[0.1em] transition-colors duration-500 pt-1">
                [{item.index}]
              </div>
              <p className="font-sans text-[0.85rem] font-light text-white/80 group-hover:text-white leading-[1.9] transition-colors duration-500">
                <strong className="text-white font-normal block mb-1">{item.bold}</strong>
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
