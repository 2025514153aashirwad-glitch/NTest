import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// ─────────────────────────────────────────────────────────────
//  Warm particle canvas — fire/telemetry signal aesthetic
// ─────────────────────────────────────────────────────────────
function WarmParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 140 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.3,
      alpha: Math.random() * 0.4 + 0.08,
      vx: (Math.random() - 0.5) * 0.14,
      vy: (Math.random() - 0.5) * 0.07,
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.012 + 0.004,
      color: Math.random() > 0.55
        ? '201,168,76'   // gold
        : Math.random() > 0.5
        ? '240,220,180'  // warm white
        : '180,140,60',  // amber
    }));

    let raf;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Subtle warm radial heat glow at bottom-center
      const glow = ctx.createRadialGradient(
        canvas.width * 0.5, canvas.height * 0.9, 0,
        canvas.width * 0.5, canvas.height * 0.9, canvas.width * 0.55
      );
      glow.addColorStop(0, 'rgba(200,130,25,0.05)');
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.twinkle += p.twinkleSpeed;
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;
        const a = p.alpha * (0.5 + 0.5 * Math.sin(p.twinkle));
        ctx.fillStyle = `rgba(${p.color},${a})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

// ─────────────────────────────────────────────────────────────
//  PageLayout — warm void, noise, vignette
// ─────────────────────────────────────────────────────────────
export default function PageLayout({ children, dark = true }) {
  return (
    <main
      className="relative min-h-screen font-sans overflow-x-hidden antialiased selection:bg-gold selection:text-void"
      style={{ background: '#00000f', color: 'rgba(255,255,255,0.9)' }}
    >
      {/* Global atmospheric overlays */}
      <div className="noise-overlay" />
      <div className="vignette" />
      <div className="scanlines" />

      {/* Warm ambient particle field — fills entire page bg */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <WarmParticleCanvas />
        {/* Top-left warm radial glow */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 80% 50% at 15% 20%, rgba(201,120,18,0.035) 0%, transparent 60%)'
        }} />
      </div>

      {/* Video placeholder layer — drop <video> in here later */}
      <div className="video-bg-layer-global fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />

      {/* Page content above background */}
      <div className="relative" style={{ zIndex: 1 }}>
        {children}
        <PageFooter />
      </div>
    </main>
  );
}

function PageFooter() {
  return (
    <footer className="relative border-t border-white/6 py-10 px-[clamp(2rem,7vw,8rem)] flex flex-col md:flex-row justify-between items-center gap-6">
      <Link to="/" className="font-sans text-[0.8rem] font-medium opacity-60 hover:opacity-100 transition-opacity uppercase tracking-[0.06em]">
        U∞ Infinitum
      </Link>
      <div className="flex items-center gap-8">
        {[['Scholar', '/scholar'], ['Fields', '/fields'], ['Explore', '/explore'], ['Registry', '/registry'], ['Cohorts', '/cohorts'], ['About', '/about']].map(([label, href]) => (
          <Link key={href} to={href} className="font-mono text-[0.52rem] uppercase tracking-[0.14em] opacity-35 hover:opacity-80 hover:text-gold transition-all duration-300">
            {label}
          </Link>
        ))}
      </div>
      <span className="font-mono text-[0.5rem] opacity-25 tracking-[0.2em] uppercase">© 2026 · New Delhi, IN</span>
    </footer>
  );
}
