import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PageHero from '../components/PageHero';
import PageLayout from '../components/PageLayout';
import { TOOLS, REGISTRY_STATS } from '../data/mockData';

const FIELD_COLORS = { Structural: '#c0501a', Biomedical: '#8b1ac0', Energy: '#1ac078', Computational: '#1a6bc0' };

export default function Registry() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const [filter, setFilter] = useState('All');

  // Simple force-directed positioning (CSS-based simulation)
  const positions = [
    { id: 'UINF-2024-STRUCT-0001', x: 30, y: 25 },
    { id: 'UINF-2024-STRUCT-0012', x: 55, y: 15 },
    { id: 'UINF-2024-STRUCT-0007', x: 70, y: 38 },
    { id: 'UINF-2024-STRUCT-0043', x: 80, y: 60 },
    { id: 'UINF-2024-BIO-0021',    x: 20, y: 65 },
    { id: 'UINF-2024-ENERGY-0008', x: 45, y: 72 },
    { id: 'UINF-2024-COMP-0033',   x: 60, y: 82 },
  ];

  const filtered = filter === 'All' ? TOOLS : TOOLS.filter(t => t.field === filter);

  return (
    <PageLayout>
      <Navbar />
      <PageHero
        eyebrow="The REGISTRY"
        title="Not a portfolio."
        accent="A connected intelligence."
        subtitle="Each node is a validated tool. Each edge is a data handoff — one tool's output becoming another's input across a change of scale. The graph grows with every session."
      />

      <div className="flex flex-col lg:flex-row gap-0 border-t border-white/6">
        {/* Graph Panel */}
        <section className="flex-1 relative min-h-[600px] overflow-hidden">
          {/* Filter */}
          <div className="absolute top-6 left-6 z-20 flex gap-2 flex-wrap">
            {['All','Structural','Biomedical','Energy','Computational'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`h-[28px] px-3 rounded-pill font-mono text-[0.48rem] tracking-[0.1em] uppercase border transition-all ${filter === f ? 'border-gold/40 bg-gold/10 text-gold' : 'border-white/10 text-white/35 hover:border-white/25'}`}>
                {f}
              </button>
            ))}
          </div>

          {/* Cosmic graph bg */}
          <div className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(201,169,110,0.03) 0%, transparent 70%)' }} />

          {/* SVG edges */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            {TOOLS.map(tool =>
              tool.chains.map(chainId => {
                const src = positions.find(p => p.id === tool.id);
                const dst = positions.find(p => p.id === chainId);
                if (!src || !dst) return null;
                return (
                  <line key={`${tool.id}-${chainId}`}
                    x1={`${src.x}%`} y1={`${src.y}%`}
                    x2={`${dst.x}%`} y2={`${dst.y}%`}
                    stroke="rgba(201,169,110,0.2)" strokeWidth="1.5"
                    strokeDasharray="4 4" />
                );
              })
            )}
          </svg>

          {/* Nodes */}
          {filtered.map(tool => {
            const pos = positions.find(p => p.id === tool.id);
            if (!pos) return null;
            const color = FIELD_COLORS[tool.field] || '#c9a96e';
            const size = 40 + tool.accuracy * 24;
            const isHovered = hovered === tool.id;

            return (
              <button
                key={tool.id}
                onClick={() => navigate(`/explore/${tool.id}`)}
                onMouseEnter={() => setHovered(tool.id)}
                onMouseLeave={() => setHovered(null)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 z-10"
                style={{ left: `${pos.x}%`, top: `${pos.y}%`, zIndex: isHovered ? 20 : 10 }}
              >
                <div
                  className="rounded-full flex items-center justify-center border-2 transition-all duration-300"
                  style={{
                    width: size, height: size,
                    background: `${color}18`,
                    borderColor: isHovered ? color : `${color}50`,
                    boxShadow: isHovered ? `0 0 24px ${color}40` : 'none',
                  }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                </div>
                {isHovered && (
                  <div className="absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-[180px] p-3 rounded-xl border border-white/10 bg-void/95 backdrop-blur text-left pointer-events-none">
                    <div className="font-mono text-[0.48rem] uppercase tracking-[0.1em] mb-1" style={{ color }}>{tool.field} · {tool.scale}</div>
                    <div className="font-sans text-[0.72rem] text-white leading-tight">{tool.name}</div>
                    <div className="font-mono text-[0.58rem] text-gold mt-1">R² = {tool.accuracy.toFixed(2)}</div>
                  </div>
                )}
              </button>
            );
          })}
        </section>

        {/* Stats Sidebar */}
        <aside className="lg:w-[300px] border-t lg:border-t-0 lg:border-l border-white/6 p-8 space-y-6">
          <div>
            <div className="font-mono text-[0.52rem] text-gold tracking-[0.18em] uppercase mb-6">REGISTRY STATS</div>
            {[
              { label: 'Total Tools', value: REGISTRY_STATS.totalTools },
              { label: 'Total Edges', value: REGISTRY_STATS.totalEdges },
              { label: 'Fields Covered', value: REGISTRY_STATS.fields },
              { label: 'Approval Rate', value: `${(REGISTRY_STATS.approvalRate * 100).toFixed(0)}%` },
            ].map(s => (
              <div key={s.label} className="flex items-center justify-between py-3 border-b border-white/5">
                <span className="font-sans text-[0.78rem] text-white/45">{s.label}</span>
                <span className="font-display text-[1.4rem] text-gold">{s.value}</span>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <div className="font-mono text-[0.52rem] text-white/25 tracking-[0.15em] uppercase mb-4">Longest Chain</div>
            <div className="p-4 rounded-xl border border-gold/15 bg-gold/4">
              <div className="font-mono text-[0.65rem] text-gold/80 leading-[1.9]">
                {['NANO', 'MICRO', 'MESO', 'MEGA'].map((s, i, arr) => (
                  <span key={s}>{s}{i < arr.length - 1 ? <span className="text-gold/30"> →<br /></span> : ''}</span>
                ))}
              </div>
              <div className="font-sans text-[0.7rem] text-white/35 mt-2">CNT Composite Chain</div>
            </div>
          </div>

          <div className="pt-2">
            <div className="font-mono text-[0.52rem] text-white/25 tracking-[0.15em] uppercase mb-3">Scales Covered</div>
            <div className="flex flex-wrap gap-1.5">
              {REGISTRY_STATS.scales.map(s => (
                <span key={s} className="px-2.5 py-1 rounded-full font-mono text-[0.48rem] border border-white/10 text-white/30 tracking-[0.1em] uppercase">{s}</span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </PageLayout>
  );
}
