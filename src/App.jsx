import React, { useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';

import Hero from './components/Hero';
import TickerStrip from './components/TickerStrip';
import Statement from './components/Statement';
import UniverseCarousel from './components/UniverseCarousel';
import Phases from './components/Phases';
import DataStrip from './components/DataStrip';
import PricingBento from './components/PricingBento';
import Manifesto from './components/Manifesto';
import MoUForm from './components/MoUForm';
import Footer from './components/Footer';
import CinematicBridge from './components/CinematicBridge';
import Cursor from './components/Cursor';
import LocationTag from './components/LocationTag';
import EndingBridge from './components/EndingBridge';
import EndingCTA from './components/EndingCTA';

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const observerOptions = {
      threshold: 0.10,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('[data-reveal], [data-line]');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      lenis.destroy();
      observer.disconnect();
    };
  }, []);

  return (
    <main className="relative bg-void selection:bg-gold selection:text-void text-w90 font-sans overflow-x-hidden antialiased">
      {/* Global Vision UI */}
      <Cursor />
      <LocationTag />
      
      {/* Visual Depth Layers */}
      <div className="noise-overlay" />
      <div className="vignette" />
      <div className="scanlines" />
      
      <Navbar />

      <div id="scroll-container" className="relative z-10">
        {/* DARK — cosmos background */}
        <Hero />
        <TickerStrip />
        <Statement />

        {/* LIGHT — parchment, top+bottom dissolve */}
        <UniverseCarousel />

        {/* DARK — video atmosphere */}
        <CinematicBridge />

        {/* LIGHT — parchment, top+bottom dissolve */}
        <Phases />
        <DataStrip />

        {/* DARK — video atmosphere */}
        <PricingBento />

        {/* LIGHT — parchment, top+bottom dissolve */}
        <MoUForm />

        {/* DARK — video atmosphere */}
        <Manifesto />

        {/* LIGHT — parchment, top+bottom dissolve */}
        <EndingCTA />

        {/* DARK — video bridge */}
        <EndingBridge />

        {/* LIGHT — parchment footer */}
        <Footer />
      </div>
    </main>
  );
}

