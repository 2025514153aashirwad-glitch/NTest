import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DataStrip() {
  const [coords, setCoords] = useState("—");
  const [time, setTime] = useState("");
  const [iss, setIss] = useState("—");
  const [launch, setLaunch] = useState("—");
  const [pm25, setPm25] = useState("—");

  // Telemetry Protocol Orchestration
  useEffect(() => {
    // 1. Clock Sync
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-GB', { hour12: false }));
    }, 1000);

    // 2. IP & Coords & PM2.5 (Open-Meteo as fallback for PM2.5)
    fetch('http://ip-api.com/json/')
      .then(r => r.json())
      .then(data => {
        if (data.status === 'success') {
          const lat = data.lat.toFixed(4);
          const lon = data.lon.toFixed(4);
          setCoords(`${lat}, ${lon}`);
          
          // Simple PM2.5 Mock or real Open-Meteo if available
          fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${data.lat}&longitude=${data.lon}&current=pm2_5`)
            .then(r => r.json())
            .then(aq => setPm25(`${aq.current.pm2_5} µg/m³`))
            .catch(() => setPm25("12.4 µg/m³"));
        }
      })
      .catch(() => setCoords("28.61, 77.20"));

    // 3. ISS Location
    const fetchISS = () => {
      fetch('http://api.open-notify.org/iss-now.json')
        .then(r => r.json())
        .then(data => setIss(`${parseInt(data.iss_position.latitude)}, ${parseInt(data.iss_position.longitude)}`))
        .catch(() => {});
    };
    fetchISS();
    const issInterval = setInterval(fetchISS, 10000);

    // 4. SpaceX Launch
    fetch('https://api.spacexdata.com/v4/launches/next')
      .then(r => r.json())
      .then(data => {
        const now = new Date().getTime();
        const launchDate = new Date(data.date_utc).getTime();
        const diff = launchDate - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        setLaunch(`T-${days}D ${hours}H`);
      })
      .catch(() => setLaunch("T-14D 02H"));

    return () => {
      clearInterval(timer);
      clearInterval(issInterval);
    };
  }, []);

  return (
    <section className="relative z-10 bg-[#00000f] backdrop-blur-[28px] border-t border-b border-white/5 py-6 px-[6vw] flex items-center justify-between overflow-hidden">
      
      {/* Left Cluster */}
      <div className="flex items-center gap-4">
        <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse shadow-[0_0_10px_#22c55e]" />
        <span className="font-mono text-[0.54rem] text-gold tracking-[0.24em] uppercase">
          LIVE ENVIRONMENT STATUS
        </span>
      </div>

      {/* Data Cells Cluster */}
      <div className="flex gap-12 lg:gap-20">
        <DataCell label="USER COORDINATE" value={coords} />
        <DataCell label="LOCAL TIME" value={time} />
        <DataCell label="ISS POSITION" value={iss} />
        <DataCell label="NEXT LAUNCH" value={launch} />
        <DataCell label="U∞ SPRINTS" value="7 ACTIVE" />
        <DataCell label="ATMOSPHERE" value={pm25} />
      </div>

      {/* Right Identity */}
      <div className="font-mono text-[0.54rem] text-white/30 tracking-[0.18em] uppercase">
        SECTOR 001 · NEW DELHI, IN
      </div>

    </section>
  );
}

function DataCell({ label, value }) {
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (value && value !== "—") {
      setFlash(true);
      const t = setTimeout(() => setFlash(false), 400);
      return () => clearTimeout(t);
    }
  }, [value]);

  return (
    <div className="flex flex-col gap-1.5">
      <div className="font-mono text-[0.5rem] text-white/35 tracking-[0.2em] uppercase">
        {label}
      </div>
      <div className={`font-mono text-[0.82rem] transition-colors duration-400 ${flash ? 'text-gold' : 'text-white/70'}`}>
        {value || "—"}
      </div>
    </div>
  );
}
