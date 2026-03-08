import React from 'react';

const FIELD_COLORS = {
  Structural: { bg: 'rgba(192,80,26,0.12)', border: 'rgba(192,80,26,0.35)', text: '#e07040' },
  Biomedical: { bg: 'rgba(139,26,192,0.12)', border: 'rgba(139,26,192,0.35)', text: '#c070e0' },
  Energy: { bg: 'rgba(26,192,120,0.12)', border: 'rgba(26,192,120,0.35)', text: '#30d090' },
  Computational: { bg: 'rgba(26,107,192,0.12)', border: 'rgba(26,107,192,0.35)', text: '#4090e0' },
};

const STATUS_STYLES = {
  APPROVED: { bg: 'rgba(34,197,94,0.12)', border: 'rgba(34,197,94,0.35)', text: '#22c55e' },
  CHAINED: { bg: 'rgba(201,169,110,0.12)', border: 'rgba(201,169,110,0.35)', text: '#c9a96e' },
  PENDING: { bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.12)', text: 'rgba(255,255,255,0.35)' },
};

export default function ToolCard({ tool, onClick }) {
  const fc = FIELD_COLORS[tool.field] || FIELD_COLORS.Structural;
  const sc = STATUS_STYLES[tool.status] || STATUS_STYLES.PENDING;

  return (
    <div
      onClick={() => onClick && onClick(tool)}
      className="group relative p-6 rounded-xl bg-glass border border-white/6 hover:border-white/14 transition-all duration-400 cursor-pointer hover:-translate-y-0.5"
      style={{ backdropFilter: 'blur(20px)' }}
    >
      {/* Top shimmer */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Header Row */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex-1 min-w-0">
          <div className="font-mono text-[0.48rem] text-white/25 tracking-[0.2em] uppercase mb-1.5">{tool.id}</div>
          <h3 className="font-display text-[1.2rem] text-white leading-tight">{tool.name}</h3>
        </div>
        <div className="px-2.5 py-1 rounded-full font-mono text-[0.52rem] tracking-[0.12em] uppercase shrink-0 border"
          style={{ background: sc.bg, borderColor: sc.border, color: sc.text }}>
          {tool.status}
        </div>
      </div>

      {/* Badges */}
      <div className="flex gap-2 mb-4">
        <span className="px-2.5 py-1 rounded-full font-mono text-[0.5rem] tracking-[0.12em] uppercase border"
          style={{ background: fc.bg, borderColor: fc.border, color: fc.text }}>
          {tool.field}
        </span>
        <span className="px-2.5 py-1 rounded-full font-mono text-[0.5rem] tracking-[0.12em] uppercase border border-white/10 text-white/35 bg-white/4">
          {tool.scale}
        </span>
      </div>

      {/* Description */}
      <p className="font-sans text-[0.78rem] font-light text-white/45 leading-[1.7] mb-5 line-clamp-2">{tool.description}</p>

      {/* Footer Stats */}
      <div className="flex items-center justify-between pt-4 border-t border-white/6">
        <div className="flex items-center gap-4">
          <span className="font-mono text-[0.55rem] text-white/30 uppercase tracking-[0.1em]">{tool.paper}</span>
          <span className="font-mono text-[0.62rem] text-gold font-medium">R² = {tool.accuracy.toFixed(2)}</span>
        </div>
        {tool.chains.length > 0 && (
          <span className="font-mono text-[0.52rem] text-gold/50 tracking-[0.1em]">
            {tool.chains.length} chain{tool.chains.length > 1 ? 's' : ''}
          </span>
        )}
      </div>
    </div>
  );
}
