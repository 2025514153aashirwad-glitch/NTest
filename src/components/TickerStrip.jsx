import React from 'react';
import { motion } from 'framer-motion';

const ROW_1 = [
  "NASA APIs", "SpaceX", "ISS Position", "Solar System", 
  "NeoWs Asteroids", "N2YO Satellites", "Celestrak"
];

const ROW_2 = [
  "USGS Seismic", "OpenAQ", "Open-Meteo", "PubChem", 
  "arXiv Research", "NIST Materials", "World Bank", 
  "PVGIS Solar", "IP Geolocation", "Papers With Code"
];

export default function TickerStrip() {
  return (
    <section className="ticker-wrapper">
      {/* Edge Masks - Dark Protocol */}
      <div className="absolute inset-y-0 left-0 w-[120px] z-10 bg-gradient-to-r from-[#000008]/90 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-[120px] z-10 bg-gradient-to-l from-[#000008]/90 to-transparent pointer-events-none" />

      <div className="flex flex-col gap-4">
        {/* Row 1: Scrolls Left */}
        <div className="relative flex whitespace-nowrap group">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
            className="flex gap-4 pr-4"
          >
            {[...ROW_1, ...ROW_1].map((item, i) => (
              <TickerItem key={i} name={item} />
            ))}
          </motion.div>
        </div>

        {/* Row 2: Scrolls Right */}
        <div className="relative flex whitespace-nowrap group">
          <motion.div 
            animate={{ x: [-1000, 0] }}
            transition={{ duration: 44, repeat: Infinity, ease: "linear" }}
            className="flex gap-4 pr-4"
          >
            {[...ROW_2, ...ROW_2].map((item, i) => (
              <TickerItem key={i} name={item} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TickerItem({ name }) {
  return (
    <motion.div 
      whileHover={{ y: -1, scale: 1.02 }}
      className="ticker-pill group/item flex items-center gap-2.5"
    >
      <div className="w-3.5 h-3.5 flex items-center justify-center text-w33 group-hover/item:text-gold transition-colors">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" />
        </svg>
      </div>
      <span className="font-mono">
        {name}
      </span>
    </motion.div>
  );
}
