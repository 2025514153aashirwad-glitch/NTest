import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import PageHero from '../components/PageHero';
import PageLayout from '../components/PageLayout';
import ToolCard from '../components/ToolCard';
import { TOOLS } from '../data/mockData';

const FIELDS = ['All', 'Structural', 'Biomedical', 'Energy', 'Computational'];
const SCALES = ['All', 'NANO', 'MICRO', 'MESO', 'MACRO', 'MEGA', 'ALGORITHM'];
const STATUSES = ['All', 'APPROVED', 'CHAINED', 'PENDING'];

export default function Explore() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [field, setField] = useState(searchParams.get('field') || 'All');
  const [scale, setScale] = useState('All');
  const [status, setStatus] = useState('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return TOOLS.filter(t =>
      (field === 'All' || t.field === field) &&
      (scale === 'All' || t.scale === scale) &&
      (status === 'All' || t.status === status) &&
      (query === '' || t.name.toLowerCase().includes(query.toLowerCase()) || t.paper.toLowerCase().includes(query.toLowerCase()))
    );
  }, [field, scale, status, query]);

  return (
    <PageLayout>
      <Navbar />
      <PageHero
        eyebrow="Tool Explorer"
        title="Every tool here"
        accent="was built by a student."
        subtitle="Every tool passed 4 test cases, a physical hand-solve verification, and domain-expert review. Every tool is queryable right now."
      />

      {/* Filter Bar */}
      <section className="px-[clamp(2rem,6vw,7rem)] py-8 border-t border-white/6 sticky top-[72px] z-50 bg-void/90 backdrop-blur-xl">
        <div className="flex flex-wrap items-center gap-4">
          {/* Search */}
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search tools or papers…"
            className="h-[38px] px-4 rounded-pill bg-white/5 border border-white/10 font-sans text-[0.78rem] text-white placeholder:text-white/25 focus:outline-none focus:border-gold/40 transition-all w-[220px]"
          />
          <FilterGroup label="Field" options={FIELDS} value={field} onChange={setField} />
          <FilterGroup label="Scale" options={SCALES} value={scale} onChange={setScale} />
          <FilterGroup label="Status" options={STATUSES} value={status} onChange={setStatus} />
          <span className="ml-auto font-mono text-[0.52rem] text-white/25 tracking-[0.15em] uppercase">{filtered.length} tools</span>
        </div>
      </section>

      {/* Tool Grid */}
      <section className="px-[clamp(2rem,6vw,7rem)] py-12">
        {filtered.length === 0 ? (
          <div className="py-24 text-center font-sans text-[0.85rem] text-white/25">No tools match your filters.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((tool, i) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <ToolCard tool={tool} onClick={t => navigate(`/explore/${t.id}`)} />
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </PageLayout>
  );
}

function FilterGroup({ label, options, value, onChange }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="font-mono text-[0.48rem] text-white/25 tracking-[0.14em] uppercase mr-1">{label}:</span>
      {options.map(opt => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`h-[30px] px-3 rounded-pill font-mono text-[0.5rem] tracking-[0.1em] uppercase transition-all duration-200 border ${
            value === opt
              ? 'border-gold/40 bg-gold/10 text-gold'
              : 'border-white/8 text-white/35 hover:border-white/20 hover:text-white/60'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
