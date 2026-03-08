import React, { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import PageHero from '../components/PageHero';
import PageLayout from '../components/PageLayout';
import PaperCard from '../components/PaperCard';
import { PAPERS } from '../data/mockData';

const FIELDS = ['All', 'Structural', 'Biomedical', 'Energy', 'Computational'];
const STATUSES = ['All', 'Has Tools', 'Pending'];

export default function Papers() {
  const [field, setField] = useState('All');
  const [status, setStatus] = useState('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return PAPERS.filter(p =>
      (field === 'All' || p.field === field) &&
      (status === 'All' || p.status === status) &&
      (query === '' || p.title.toLowerCase().includes(query.toLowerCase()) || p.authors.toLowerCase().includes(query.toLowerCase()))
    );
  }, [field, status, query]);

  return (
    <PageLayout>
      <Navbar />
      <PageHero
        eyebrow="Research Library"
        title="A dead PDF"
        accent="teaches nothing."
        subtitle="Every paper here has been disassembled: equations extracted, parameters validated, test cases derived, Socratic questions written. It is not a reference — it is a tool specification."
      />

      {/* Filter Bar */}
      <section className="px-[clamp(2rem,6vw,7rem)] py-8 border-t border-white/6 sticky top-[72px] z-50 bg-void/90 backdrop-blur-xl">
        <div className="flex flex-wrap items-center gap-4">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by title or author…"
            className="h-[38px] px-4 rounded-pill bg-white/5 border border-white/10 font-sans text-[0.78rem] text-white placeholder:text-white/25 focus:outline-none focus:border-gold/40 transition-all w-[240px]"
          />
          <FG label="Field" options={FIELDS} value={field} onChange={setField} />
          <FG label="Status" options={STATUSES} value={status} onChange={setStatus} />
          <span className="ml-auto font-mono text-[0.52rem] text-white/25 tracking-[0.15em] uppercase">{filtered.length} papers</span>
        </div>
      </section>

      {/* Paper List */}
      <section className="px-[clamp(2rem,6vw,7rem)] py-10">
        {filtered.length === 0 ? (
          <div className="py-24 text-center font-sans text-[0.85rem] text-white/25">No papers match your filters.</div>
        ) : (
          <div className="space-y-4 max-w-[900px]">
            {filtered.map((paper) => <PaperCard key={paper.id} paper={paper} />)}
          </div>
        )}
      </section>

      {/* Bottom note */}
      <section className="px-[clamp(2rem,6vw,7rem)] py-16 border-t border-white/6">
        <p className="font-sans text-[0.82rem] text-white/25 max-w-[600px] leading-[1.85]">
          Papers are added as new students are assigned them. Each paper enters the library only after its full five-layer structurisation is complete — bibliographic, conceptual, numerical, tool-connection, and pedagogy records.
        </p>
      </section>
    </PageLayout>
  );
}

function FG({ label, options, value, onChange }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="font-mono text-[0.48rem] text-white/25 tracking-[0.14em] uppercase mr-1">{label}:</span>
      {options.map(opt => (
        <button key={opt} onClick={() => onChange(opt)}
          className={`h-[30px] px-3 rounded-pill font-mono text-[0.5rem] tracking-[0.1em] uppercase transition-all duration-200 border ${value === opt ? 'border-gold/40 bg-gold/10 text-gold' : 'border-white/8 text-white/35 hover:border-white/20 hover:text-white/60'}`}>
          {opt}
        </button>
      ))}
    </div>
  );
}
