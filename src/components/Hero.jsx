import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function Hero() {
  const canvasRef = useRef(null);
  const [coords, setCoords] = useState("28.6139° N 77.2090° E");
  const { scrollY } = useScroll();
  
  // Hero scroll fade protocol: opacity = Math.max(0, 1 - scrollY / 130)
  const heroOpacity = useTransform(scrollY, [0, 130], [1, 0]);

  // IP Geolocation fetch
  useEffect(() => {
    fetch('http://ip-api.com/json/')
      .then(r => r.json())
      .then(data => {
        if (data.status === 'success') {
          setCoords(`${Math.abs(data.lat).toFixed(4)}° ${data.lat >= 0 ? 'N' : 'S'}  ${Math.abs(data.lon).toFixed(4)}° ${data.lon >= 0 ? 'E' : 'W'}`);
        }
      })
      .catch(() => {});
  }, []);

  // Particle Canvas Fallback
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width, height;
    const particles = [];
    const particleCount = 400;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.5;
        this.speedY = Math.random() * 0.4 + 0.1;
        this.amplitude = Math.random() * 20 + 5;
        this.frequency = Math.random() * 0.01 + 0.005;
        this.baseX = this.x;
        this.angle = Math.random() * Math.PI * 2;
        this.color = Math.random() > 0.8 
          ? `hsla(40, 60%, 65%, ${Math.random() * 0.45 + 0.1})` // Gold
          : `hsla(35, 60%, 55%, ${Math.random() * 0.45 + 0.1})`; // Amber
      }

      update() {
        this.y -= this.speedY;
        this.angle += this.frequency;
        this.x = this.baseX + Math.sin(this.angle) * this.amplitude;

        if (this.y < -10) {
          this.y = height + 10;
          this.baseX = Math.random() * width;
        }
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      resize();
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const cinematicEase = [0.22, 1, 0.36, 1];

  return (
    <section className="relative h-screen w-full overflow-hidden bg-transparent">
      {/* Background System */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      >
        <source src="/12337050-hd_1920_1028_60fps.mp4" type="video/mp4" />
      </video>
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 z-[1] will-change-transform pointer-events-none"
        style={{ transform: 'translateZ(0)' }}
      />

      {/* Atmospheric Overlays */}
      <div className="absolute inset-0 pointer-events-none z-[5]">
        {/* Perimeter Vignette */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 50%, rgba(0,0,15,0.08) 70%, rgba(0,0,15,0.45) 100%)'
        }} />
        
        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-[32vh]" style={{
          background: 'linear-gradient(to top, rgba(0,0,15,0.65) 0%, transparent 100%)'
        }} />
        
        {/* Top Fade */}
        <div className="absolute top-0 left-0 right-0 h-[18vh]" style={{
          background: 'linear-gradient(to bottom, rgba(0,0,15,0.35) 0%, transparent 100%)'
        }} />
      </div>

      {/* Targetted Text Protection Veil */}
      <div 
        className="absolute inset-0 pointer-events-none z-[8]"
        style={{
          background: `
            radial-gradient(ellipse 400px 200px at 0% 100%, rgba(0,0,0,0.75) 0%, transparent 70%),
            radial-gradient(ellipse 400px 200px at 100% 100%, rgba(0,0,0,0.65) 0%, transparent 70%)
          `
        }}
      />

      {/* Corner UI Protocol */}
      <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 z-10 pointer-events-none">
        
        {/* Top Left: Coordinates */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.9, ease: cinematicEase }}
          className="absolute top-[5.8rem] left-[3.5rem] flex flex-col gap-1.5"
        >
          <div className="font-mono text-[0.58rem] text-gold-lo/60 tracking-[0.2em] uppercase" style={{ textShadow: '0 0 20px rgba(0,0,0,0.95), 0 0 40px rgba(0,0,0,0.8), 0 1px 3px rgba(0,0,0,1)' }}>
            {coords}
          </div>
          <div className="flex items-center gap-2" style={{ textShadow: '0 0 20px rgba(0,0,0,0.95), 0 0 40px rgba(0,0,0,0.8), 0 1px 3px rgba(0,0,0,1)' }}>
            <div className="w-1 h-1 rounded-full bg-[#22c55e] animate-pulse shadow-[0_0_8px_#22c55e]" />
            <span className="font-mono text-[0.52rem] text-w15 tracking-[0.26em] uppercase">
              SECTOR 001 — LIVE
            </span>
          </div>
        </motion.div>

        {/* Top Right: Ghost CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 1.1, ease: cinematicEase }}
          className="absolute top-[5.8rem] right-[3.5rem] pointer-events-auto"
        >
          <button className="px-5 py-2.5 rounded-pill border border-w12 bg-white/5 backdrop-blur-md font-mono text-[0.62rem] text-w40 tracking-[0.14em] uppercase hover:border-gold-border hover:text-gold hover:bg-gold-glow/5 hover:-translate-y-0.5 transition-all duration-300">
            Enter Protocol →
          </button>
        </motion.div>

        {/* Bottom Left: Brand Identity */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.4, ease: cinematicEase }}
          className="absolute bottom-[3.2rem] left-[3.5rem] space-y-2"
        >
          <h1 
            className="font-display text-[1.7rem] font-light text-w85 tracking-tight leading-none"
            style={{ textShadow: '0 0 40px rgba(0,0,0,0.9), 0 0 80px rgba(0,0,0,0.7), 0 2px 4px rgba(0,0,0,1)' }}
          >
            U∞ Infinitum
          </h1>
          <p 
            className="font-sans text-[0.83rem] font-light text-w38 tracking-[0.015em] uppercase"
            style={{ textShadow: '0 0 20px rgba(0,0,0,0.95), 0 0 40px rgba(0,0,0,0.8), 0 1px 3px rgba(0,0,0,1)' }}
          >
            The simulation is live.
          </p>
        </motion.div>

        {/* Bottom Center: Scroll Breath */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 2.2, ease: cinematicEase }}
          className="absolute bottom-[3rem] left-1/2 -translate-x-1/2"
        >
          <div className="w-[1px] h-11 bg-gradient-to-b from-gold/55 to-transparent rounded-pill animate-pulse-slow" />
        </motion.div>

        {/* Bottom Right: Narrative Statement */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.7, ease: cinematicEase }}
          className="absolute bottom-[3.2rem] right-[3.5rem] max-w-[220px] text-right space-y-2"
        >
          <p 
            className="font-sans text-[0.78rem] font-light text-w33 leading-[1.75]"
            style={{ textShadow: '0 0 20px rgba(0,0,0,0.95), 0 0 40px rgba(0,0,0,0.8)' }}
          >
            You don't observe this environment.
          </p>
          <p 
            className="font-sans text-[0.78rem] font-light text-w20"
            style={{ textShadow: '0 0 20px rgba(0,0,0,0.95), 0 0 40px rgba(0,0,0,0.8)' }}
          >
            You work inside it.
          </p>
        </motion.div>

      </motion.div>

      {/* Center Void Protocol: Enforced by Empty Space */}
    </section>
  );
}
