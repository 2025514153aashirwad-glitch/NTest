import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import PageLayout from '../components/PageLayout';
import { TOOLS } from '../data/mockData';

const FIELD_COLORS = { Structural: '#c0501a', Biomedical: '#8b1ac0', Energy: '#1ac078', Computational: '#1a6bc0' };
const STATUS_STYLES = {
  APPROVED: { bg: 'rgba(34,197,94,0.12)', border: 'rgba(34,197,94,0.35)', text: '#22c55e' },
  CHAINED:  { bg: 'rgba(201,169,110,0.12)', border: 'rgba(201,169,110,0.35)', text: '#c9a96e' },
};

export default function ToolDetail() {
  const { toolId } = useParams();
  const tool = TOOLS.find(t => t.id === toolId);
  const [inputs, setInputs] = useState({});
  const [result, setResult] = useState(null);

  if (!tool) return <Navigate to="/explore" replace />;

  const color = FIELD_COLORS[tool.field] || '#c9a96e';
  const sc = STATUS_STYLES[tool.status] || STATUS_STYLES.APPROVED;
  const chainedTools = tool.chains.map(id => TOOLS.find(t => t.id === id)).filter(Boolean);

  const handleRun = (e) => {
    e.preventDefault();
    // Simulate a plausible result
    const baseAcc = tool.accuracy;
    const simResult = (baseAcc * 100 * (0.95 + Math.random() * 0.1)).toFixed(2);
    setResult({ value: simResult, unit: tool.inputs[0]?.unit || 'units', accuracy: baseAcc });
  };

  return (
    <PageLayout>
      <Navbar />
      <div className="pt-28 px-[clamp(2rem,6vw,7rem)] pb-20">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-mono text-[0.52rem] text-white/25 tracking-[0.15em] uppercase mb-8">
          <Link to="/explore" className="hover:text-gold transition-colors">Explore</Link>
          <span>/</span>
          <span className="text-white/40">{tool.id}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
          {/* Left Column */}
          <div>
            {/* Header */}
            <div className="flex gap-3 mb-5">
              <span className="px-3 py-1.5 rounded-full font-mono text-[0.52rem] tracking-[0.1em] uppercase border"
                style={{ color, borderColor: `${color}40`, background: `${color}12` }}>{tool.field} · {tool.scale}</span>
              <span className="px-3 py-1.5 rounded-full font-mono text-[0.52rem] tracking-[0.1em] uppercase border"
                style={sc}>{tool.status}</span>
            </div>
            <h1 className="font-display text-[clamp(2.5rem,4vw,4rem)] text-white leading-[1.0] mb-3">{tool.name}</h1>
            <div className="font-mono text-[0.58rem] text-white/30 tracking-[0.12em] mb-8">{tool.id}</div>

            <p className="font-sans text-[0.9rem] text-white/55 leading-[1.85] mb-10">{tool.description}</p>

            {/* Governing Equation */}
            <div className="p-5 rounded-xl border border-gold/15 bg-gold/4 mb-8">
              <div className="font-mono text-[0.52rem] text-gold/60 tracking-[0.18em] uppercase mb-3">Governing Equation</div>
              <div className="font-mono text-[1rem] text-gold">{tool.equation}</div>
            </div>

            {/* Source Paper */}
            <div className="p-5 rounded-xl border border-white/8 bg-glass mb-8">
              <div className="font-mono text-[0.52rem] text-white/25 tracking-[0.18em] uppercase mb-2">Source Paper</div>
              <div className="font-sans text-[0.88rem] text-white/75 mb-1">{tool.paper}</div>
              <a href={`https://doi.org/${tool.doi}`} target="_blank" rel="noreferrer"
                className="font-mono text-[0.58rem] text-gold hover:underline">{tool.doi}</a>
            </div>

            {/* Test Case Results */}
            <div className="mb-8">
              <div className="font-mono text-[0.52rem] text-white/25 tracking-[0.18em] uppercase mb-4">Test Case Verification</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {tool.testCases.map(tc => (
                  <div key={tc.id} className="p-4 rounded-xl border text-center"
                    style={{ borderColor: tc.passed ? 'rgba(34,197,94,0.25)' : 'rgba(239,68,68,0.25)', background: tc.passed ? 'rgba(34,197,94,0.06)' : 'rgba(239,68,68,0.06)' }}>
                    <div className="font-mono text-[0.7rem] mb-1" style={{ color: tc.passed ? '#22c55e' : '#ef4444' }}>{tc.id}</div>
                    <div className="font-sans text-[0.62rem] text-white/40">{tc.label}</div>
                    <div className="mt-2 text-[0.85rem]">{tc.passed ? '✓' : '✕'}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Knowledge Capture */}
            <div className="p-6 rounded-xl border border-white/8 bg-glass mb-8">
              <div className="font-mono text-[0.52rem] text-white/25 tracking-[0.18em] uppercase mb-3">Knowledge Capture — Builder Insight</div>
              <p className="font-sans text-[0.85rem] text-white/55 leading-[1.85] italic">&ldquo;{tool.knowledgeCapture}&rdquo;</p>
            </div>

            {/* Chain View */}
            {chainedTools.length > 0 && (
              <div>
                <div className="font-mono text-[0.52rem] text-white/25 tracking-[0.18em] uppercase mb-4">Chain Connections — This Tool Feeds Into</div>
                <div className="flex flex-wrap gap-3">
                  {chainedTools.map(ct => (
                    <Link key={ct.id} to={`/explore/${ct.id}`}
                      className="px-4 py-2.5 rounded-xl border border-gold/20 bg-gold/5 hover:bg-gold/10 transition-all">
                      <div className="font-mono text-[0.55rem] text-gold tracking-[0.1em] uppercase">{ct.scale}</div>
                      <div className="font-sans text-[0.8rem] text-white/80 mt-0.5">{ct.name}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Run Tool */}
          <div className="lg:sticky lg:top-28 self-start">
            <div className="p-7 rounded-2xl border border-white/10 bg-glass">
              <div className="font-mono text-[0.55rem] text-gold tracking-[0.18em] uppercase mb-5">Run This Tool</div>
              <form onSubmit={handleRun} className="space-y-4">
                {tool.inputs.map((inp, i) => (
                  <div key={i} className="space-y-1.5">
                    <label className="font-mono text-[0.52rem] text-white/35 tracking-[0.15em] uppercase">{inp.name}</label>
                    <div className="flex gap-2">
                      <input type="number" step="any"
                        min={inp.min} max={inp.max}
                        defaultValue={((inp.max - inp.min) * 0.3 + inp.min).toFixed(1)}
                        onChange={e => setInputs(p => ({ ...p, [inp.name]: e.target.value }))}
                        className="flex-1 h-[42px] px-3 rounded-lg bg-white/5 border border-white/10 font-mono text-[0.85rem] text-white focus:outline-none focus:border-gold/40 transition-all"
                      />
                      <span className="h-[42px] px-3 flex items-center font-mono text-[0.65rem] text-white/25 bg-white/3 border border-white/8 rounded-lg">{inp.unit}</span>
                    </div>
                    <div className="font-mono text-[0.45rem] text-white/20">Range: {inp.min}–{inp.max} {inp.unit}</div>
                  </div>
                ))}
                <motion.button type="submit" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                  className="w-full h-[46px] rounded-lg bg-gold font-sans text-[0.72rem] font-medium text-void tracking-[0.1em] uppercase shadow-[0_4px_20px_rgba(201,169,110,0.3)] mt-2">
                  RUN TOOL →
                </motion.button>
              </form>

              {result && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-5 p-5 rounded-xl border border-gold/20 bg-gold/5">
                  <div className="font-mono text-[0.5rem] text-gold/60 uppercase tracking-[0.15em] mb-2">Output</div>
                  <div className="font-display text-[2.5rem] text-gold leading-none">{result.value}</div>
                  <div className="font-mono text-[0.65rem] text-white/30 mt-1">R² = {result.accuracy.toFixed(2)} · Model validated</div>
                </motion.div>
              )}

              <div className="mt-5 pt-4 border-t border-white/6">
                <div className="font-mono text-[0.5rem] text-white/20 tracking-[0.12em] uppercase mb-1">Accuracy</div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 rounded-full bg-white/8">
                    <div className="h-full rounded-full bg-gold" style={{ width: `${tool.accuracy * 100}%` }} />
                  </div>
                  <span className="font-mono text-[0.7rem] text-gold">{(tool.accuracy * 100).toFixed(0)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
