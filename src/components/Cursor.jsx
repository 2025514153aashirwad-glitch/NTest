import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function Cursor() {
  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  // Ring: Lerp lag 0.11 (Approx stiffness 150, damping 20-25)
  const ringSpringConfig = { stiffness: 150, damping: 24 };
  const ringX = useSpring(mouse.x, ringSpringConfig);
  const ringY = useSpring(mouse.y, ringSpringConfig);

  // Bloom: Lerp lag 0.06 (Lower stiffness, Higher damping)
  const bloomSpringConfig = { stiffness: 80, damping: 20 };
  const bloomX = useSpring(mouse.x, bloomSpringConfig);
  const bloomY = useSpring(mouse.y, bloomSpringConfig);

  const [cursorState, setCursorState] = useState('default'); // default, hover, text, universe
  const [universeColor, setUniverseColor] = useState('var(--gold)');

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.x.set(e.clientX);
      mouse.y.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      
      // Universe Card check
      const universeCard = target.closest('[data-universe]');
      if (universeCard) {
        setCursorState('universe');
        setUniverseColor(universeCard.getAttribute('data-color') || 'var(--gold)');
        return;
      }

      // Link/Button check
      if (target.closest('a, button, [role="button"]')) {
        setCursorState('hover');
        return;
      }

      // Text block check
      if (target.closest('p, h1, h2, h3, blockquote')) {
        setCursorState('text');
        return;
      }

      setCursorState('default');
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // State-based scales and opacities
  const ringSize = {
    default: 34,
    hover: 58,
    universe: 64,
    text: 20,
  }[cursorState];

  const coreSize = {
    default: 6,
    hover: 10,
    universe: 6,
    text: 4,
  }[cursorState];

  const ringOpacity = {
    default: 0.4,
    hover: 0.65,
    universe: 0.5,
    text: 0.3,
  }[cursorState];

  const bloomSize = {
    default: 120,
    hover: 160,
    universe: 140,
    text: 80,
  }[cursorState];

  return (
    <>
      <style>{`
        * { cursor: none !important; }
      `}</style>
      
      {/* Layer 3: Ambient Bloom */}
      <motion.div
        id="cur-bloom"
        className="fixed top-0 left-0 pointer-events-none z-[9997] rounded-full"
        style={{
          x: bloomX,
          y: bloomY,
          width: bloomSize,
          height: bloomSize,
          translateX: '-50%',
          translateY: '-50%',
          background: `radial-gradient(circle, ${cursorState === 'universe' ? universeColor : 'var(--gold)'} 0%, transparent 70%)`,
          opacity: 0.04,
        }}
      />

      {/* Layer 2: Trailing Ring */}
      <motion.div
        id="cur-ring"
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border"
        animate={{
          width: ringSize,
          height: ringSize,
          borderColor: cursorState === 'universe' ? universeColor : 'rgba(201, 169, 110, 0.4)',
          opacity: ringOpacity,
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Layer 1: Magnetic Dot */}
      <motion.div
        id="cur-core"
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-gold"
        animate={{
          width: coreSize,
          height: coreSize,
          scale: cursorState === 'hover' ? 1.5 : 1,
          backgroundColor: cursorState === 'hover' ? 'var(--gold-hi)' : 'var(--gold)',
        }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          x: mouse.x,
          y: mouse.y,
          translateX: '-50%',
          translateY: '-50%',
          mixBlendMode: 'screen',
        }}
      />
    </>
  );
}
