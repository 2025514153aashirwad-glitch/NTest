import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FIELD_COLORS = {
  Structural: '#e07040',
  Biomedical: '#c070e0',
  Energy: '#30d090',
  Computational: '#4090e0',
};

export default function PaperCard({ paper }) {
  const [expanded, setExpanded] = useState(false);
  const color = FIELD_COLORS[paper.field] || '#c9a96e';

  return (
    <div className="rounded-xl border border-white/8 bg-glass overflow-hidden transition-all duration-400 hover:border-white/14"
      style={{ backdropFilter: 'blur(20px)' }}>
      {/* Header */}
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full text-left p-6 flex items-start justify-between gap-6 group"
      >
        <div className="flex-1">
          <div className="flex gap-2 mb-3">
            <span className="px-2.5 py-1 rounded-full font-mono text-[0.5rem] tracking-[0.1em] uppercase border"
              style={{ color, borderColor: `${color}44`, background: `${color}14` }}>
              {paper.field}
            </span>
            <span className="px-2.5 py-1 rounded-full font-mono text-[0.5rem] tracking-[0.1em] uppercase border border-white/10 text-white/35 bg-white/4">
              {paper.scale}
            </span>
            <span className="px-2.5 py-1 rounded-full font-mono text-[0.5rem] tracking-[0.1em] uppercase border border-gold/20 text-gold/70 bg-gold/6">
              {paper.toolCount} tool{paper.toolCount !== 1 ? 's' : ''}
            </span>
          </div>
          <h3 className="font-display text-[1.25rem] text-white leading-tight mb-1 group-hover:text-gold/90 transition-colors">
            {paper.title}
          </h3>
          <div className="font-mono text-[0.58rem] text-white/35 tracking-[0.08em]">
            {paper.authors} · {paper.year}
          </div>
          {!expanded && (
            <p className="font-sans text-[0.78rem] text-white/40 leading-[1.7] mt-3 line-clamp-2">{paper.problem}</p>
          )}
        </div>
        <div className={`text-gold/50 transition-transform duration-300 shrink-0 mt-1 ${expanded ? 'rotate-45' : ''}`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </div>
      </button>

      {/* Expandable Layers */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-5 border-t border-white/6 pt-5">
              {/* Layer 1: Bibliographic */}
              <Layer label="Layer 1 — Bibliographic Core" color={color}>
                <dl className="grid grid-cols-2 gap-x-8 gap-y-2 text-[0.78rem]">
                  <DF label="Journal" value={paper.journal} />
                  <DF label="Year" value={paper.year} />
                  <DF label="Access" value={paper.access} />
                  <DF label="DOI" value={<a href={`https://doi.org/${paper.doi}`} target="_blank" rel="noreferrer" className="text-gold hover:underline">{paper.doi}</a>} />
                </dl>
              </Layer>

              {/* Layer 2: Conceptual Anatomy */}
              <Layer label="Layer 2 — Conceptual Anatomy" color={color}>
                <p className="text-[0.8rem] text-white/55 leading-[1.8] mb-2"><strong className="text-white/80">Problem:</strong> {paper.problem}</p>
                <p className="text-[0.8rem] text-white/55 leading-[1.8]"><strong className="text-white/80">Hypothesis:</strong> {paper.hypothesis}</p>
              </Layer>

              {/* Layer 3: Equations */}
              <Layer label="Layer 3 — Governing Equations" color={color}>
                {paper.equations.map((eq, i) => (
                  <div key={i} className="font-mono text-[0.82rem] text-gold bg-black/30 px-4 py-2 rounded-lg border border-gold/10 mt-1">
                    {eq}
                  </div>
                ))}
              </Layer>

              {/* Layer 5: Pedagogy */}
              <Layer label="Layer 5 — Theory Questions" color={color}>
                <ul className="space-y-2">
                  {paper.theoryQuestions.map((q, i) => (
                    <li key={i} className="flex gap-3 text-[0.78rem] text-white/50">
                      <span className="text-gold/40 shrink-0">[{String(i+1).padStart(2,'0')}]</span>
                      {q}
                    </li>
                  ))}
                </ul>
              </Layer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Layer({ label, color, children }) {
  return (
    <div>
      <div className="font-mono text-[0.52rem] tracking-[0.18em] uppercase mb-2.5" style={{ color: `${color}99` }}>{label}</div>
      {children}
    </div>
  );
}

function DF({ label, value }) {
  return (
    <>
      <dt className="text-white/30 font-mono text-[0.6rem] uppercase tracking-[0.1em]">{label}</dt>
      <dd className="text-white/70">{value}</dd>
    </>
  );
}
