import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PageHero from '../components/PageHero';
import PageLayout from '../components/PageLayout';

const FIELDS = [
  {
    name: 'Structural Engineering',
    color: '#c0501a',
    icon: '⬡',
    covers: 'Materials science, composites, beam analysis, load analysis, fatigue, failure mechanics.',
    chain: 'NANO → MICRO (RVE) → MESO (beam) → MACRO (floor) → MEGA (bridge, dam, tower)',
    example: { name: 'CNT Composite E_eff Calculator', paper: 'Mehta & Sharma 2022', id: 'UINF-2024-STRUCT-0001' },
    who: 'Civil, materials, mechanical engineering, architecture students with structural focus',
    domain: 'Stress-strain, modulus of elasticity, composite mechanics, beam bending',
    threshold: '85%+ (safety-critical)',
  },
  {
    name: 'Biomedical Engineering',
    color: '#8b1ac0',
    icon: '◎',
    covers: 'Diagnostic tools, biomarkers, tissue classification, impedance spectroscopy, disease severity staging.',
    chain: 'MOLECULAR (biomarker) → CELLULAR (tissue) → ORGAN (diagnostic) → CLINICAL (patient)',
    example: { name: 'Periodontal Disease Stage Classifier', paper: 'Rajamani et al. 2021', id: 'UINF-2024-BIO-0021' },
    who: 'Biomedical engineering, bioinformatics, clinical data science students',
    domain: 'Cell biology, diagnostic parameters, clinical classification systems',
    threshold: '88%+ (clinical consequences)',
  },
  {
    name: 'Energy Systems',
    color: '#1ac078',
    icon: '◈',
    covers: 'Solar efficiency, grid stability, thermal analysis, battery performance, renewable integration.',
    chain: 'COMPONENT (cell/panel) → SYSTEM (array/grid) → NETWORK (regional) → POLICY (demand)',
    example: { name: 'Perovskite Solar Cell Efficiency Predictor', paper: 'Liu et al. 2023', id: 'UINF-2024-ENERGY-0008' },
    who: 'Electrical, energy engineering, physics, sustainability science students',
    domain: 'Energy conversion, circuit theory, materials under thermal/radiation load',
    threshold: '82%+ (grid/device stability)',
  },
  {
    name: 'Computational Science',
    color: '#1a6bc0',
    icon: '⟨⟩',
    covers: 'Algorithm performance, simulation fidelity, numerical methods, CFD parameter prediction.',
    chain: 'ALGORITHM (op count) → IMPLEMENTATION (runtime) → SYSTEM (HPC node) → SIMULATION',
    example: { name: 'CFD Turbulence Parameter Classifier', paper: 'Zhang & Wei 2022', id: 'UINF-2024-COMP-0033' },
    who: 'Computer science, physics, applied mathematics, simulation-focused engineering students',
    domain: 'Numerical methods, fluid dynamics, algorithm analysis',
    threshold: '80%+',
  },
];

export default function Fields() {
  return (
    <PageLayout>
      <Navbar />
      <PageHero
        eyebrow="Field Tracks"
        title="Four domains."
        accent="Forty tools each."
        subtitle="Every U Infinitum tool lives in one of four engineering domains. Pick the one where you already have depth — not the one that sounds most impressive."
      />

      <section className="px-[clamp(2rem,6vw,7rem)] py-20 border-t border-white/6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {FIELDS.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="p-8 rounded-2xl border bg-glass relative group overflow-hidden"
              style={{ borderColor: `${f.color}25` }}
            >
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none"
                style={{ background: `radial-gradient(circle at 100% 0%, ${f.color}12, transparent 70%)` }} />

              <div className="flex items-start gap-5 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center font-display text-xl shrink-0"
                  style={{ background: `${f.color}14`, border: `1px solid ${f.color}30`, color: f.color }}>
                  {f.icon}
                </div>
                <div>
                  <h2 className="font-display text-[1.55rem] text-white leading-tight">{f.name}</h2>
                  <div className="font-mono text-[0.72rem] mt-1" style={{ color: `${f.color}99` }}>Accuracy ≥ {f.threshold}</div>
                </div>
              </div>

              <p className="font-sans text-[0.82rem] text-white/50 leading-[1.75] mb-5">{f.covers}</p>

              {/* Scale Chain */}
              <div className="p-3 rounded-lg mb-5" style={{ background: `${f.color}08`, border: `1px solid ${f.color}18` }}>
                <div className="font-mono text-[0.5rem] tracking-[0.18em] uppercase mb-1.5" style={{ color: `${f.color}70` }}>Scale Chain</div>
                <div className="font-mono text-[0.65rem] text-white/55 leading-[1.6]">{f.chain}</div>
              </div>

              {/* Domain Requirements */}
              <div className="mb-5">
                <div className="font-mono text-[0.5rem] text-white/25 tracking-[0.15em] uppercase mb-1.5">Required Domain Knowledge</div>
                <p className="font-sans text-[0.78rem] text-white/40">{f.domain}</p>
              </div>

              {/* Example Tool */}
              <div className="pt-5 border-t" style={{ borderColor: `${f.color}18` }}>
                <div className="font-mono text-[0.5rem] text-white/25 tracking-[0.15em] uppercase mb-2">Example Tool in REGISTRY</div>
                <Link to={`/explore/${f.example.id}`}
                  className="flex items-center justify-between group/link hover:opacity-100 transition-opacity"
                  style={{ opacity: 0.7 }}>
                  <div>
                    <div className="font-sans text-[0.82rem] text-white group-hover/link:text-gold transition-colors">{f.example.name}</div>
                    <div className="font-mono text-[0.55rem] text-white/30 mt-0.5">{f.example.paper}</div>
                  </div>
                  <span className="text-gold/50 group-hover/link:translate-x-1 transition-transform">→</span>
                </Link>
              </div>

              {/* Footer */}
              <div className="mt-5 pt-4 border-t flex items-center justify-between" style={{ borderColor: `${f.color}12` }}>
                <span className="font-sans text-[0.72rem] text-white/30">{f.who.split(',')[0]}</span>
                <Link to={`/explore?field=${f.name.split(' ')[0]}`}
                  className="font-mono text-[0.55rem] tracking-[0.12em] uppercase transition-colors"
                  style={{ color: `${f.color}70` }}>
                  View tools →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <section className="px-[clamp(2rem,6vw,7rem)] py-16 border-t border-white/6 flex items-center justify-between">
        <p className="font-display text-[clamp(1.5rem,2.5vw,2.5rem)] text-white/70 leading-tight">
          Chosen your domain? <span className="text-white">Start building.</span>
        </p>
        <Link to="/join">
          <button className="h-[48px] px-8 rounded-pill bg-gold font-sans text-[0.7rem] font-medium text-void tracking-[0.12em] uppercase shadow-[0_4px_24px_rgba(201,169,110,0.35)]">
            Apply Now →
          </button>
        </Link>
      </section>
    </PageLayout>
  );
}
