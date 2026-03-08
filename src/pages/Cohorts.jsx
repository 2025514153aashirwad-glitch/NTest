import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import PageHero from '../components/PageHero';
import PageLayout from '../components/PageLayout';
import { COHORTS } from '../data/mockData';

export default function Cohorts() {
  const [expanded, setExpanded] = useState(null);

  const totalStudents = COHORTS.reduce((a, c) => a + c.students, 0);
  const totalApproved = COHORTS.reduce((a, c) => a + c.toolsApproved, 0);
  const totalChains = COHORTS.reduce((a, c) => a + c.chains, 0);

  return (
    <PageLayout>
      <Navbar />
      <PageHero
        eyebrow="Cohort History"
        title="Every cohort"
        accent="is on record."
        subtitle="Every tool, every score, every paper. Queryable. Verifiable. No marketing — only data."
      />

      {/* Aggregate Stats */}
      <section className="px-[clamp(2rem,6vw,7rem)] py-12 border-t border-white/6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Students', value: totalStudents },
            { label: 'Tools Deployed', value: totalApproved },
            { label: 'Chain Connections', value: totalChains },
            { label: 'Cohorts Run', value: COHORTS.length },
          ].map(s => (
            <div key={s.label} className="p-5 rounded-xl border border-white/6 bg-glass text-center">
              <div className="font-display text-[3rem] text-gold leading-none mb-2">{s.value}</div>
              <div className="font-mono text-[0.52rem] text-white/30 tracking-[0.15em] uppercase">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Cohort Table */}
      <section className="px-[clamp(2rem,6vw,7rem)] py-10 border-t border-white/6">
        <div className="font-mono text-[0.52rem] text-white/25 tracking-[0.18em] uppercase mb-6">All Cohorts</div>
        <div className="space-y-3">
          {COHORTS.map((cohort, i) => (
            <div key={cohort.id} className="rounded-xl border border-white/6 overflow-hidden hover:border-white/12 transition-all">
              <button
                onClick={() => setExpanded(expanded === cohort.id ? null : cohort.id)}
                className="w-full text-left grid grid-cols-[1fr_auto_auto_auto_auto] md:grid-cols-[200px_1fr_80px_80px_80px] gap-4 items-center p-5"
              >
                <div>
                  <div className="font-display text-[1.1rem] text-white">{cohort.name}</div>
                  <div className="font-mono text-[0.52rem] text-white/30 tracking-[0.08em] mt-0.5">{cohort.period}</div>
                </div>
                <div className="hidden md:block font-sans text-[0.75rem] text-white/35 leading-[1.6]">{cohort.description}</div>
                <div className="text-center">
                  <div className="font-display text-[1.4rem] text-white">{cohort.students}</div>
                  <div className="font-mono text-[0.45rem] text-white/25 uppercase tracking-[0.1em]">Students</div>
                </div>
                <div className="text-center">
                  <div className="font-display text-[1.4rem] text-green-400">{cohort.toolsApproved}</div>
                  <div className="font-mono text-[0.45rem] text-white/25 uppercase tracking-[0.1em]">Approved</div>
                </div>
                <div className={`text-[0.75rem] transition-transform duration-300 text-white/30 ${expanded === cohort.id ? 'rotate-180' : ''}`}>▾</div>
              </button>

              <AnimatePresence>
                {expanded === cohort.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="overflow-hidden border-t border-white/6"
                  >
                    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div>
                        <div className="font-mono text-[0.5rem] text-white/25 uppercase tracking-[0.15em] mb-3">Metrics</div>
                        <dl className="space-y-2 text-[0.8rem]">
                          <DF label="Avg Accuracy" value={`${(cohort.avgAccuracy * 100).toFixed(0)}%`} />
                          <DF label="Chains Formed" value={cohort.chains} />
                          <DF label="VOIDs" value={cohort.toolsVoid} red />
                          <DF label="Satisfaction" value={`${cohort.satisfaction}/5`} />
                        </dl>
                      </div>
                      <div>
                        <div className="font-mono text-[0.5rem] text-white/25 uppercase tracking-[0.15em] mb-3">Formats</div>
                        <div className="flex flex-wrap gap-2">
                          {cohort.formats.map(f => (
                            <span key={f} className="px-3 py-1 rounded-full font-mono text-[0.5rem] border border-gold/20 text-gold/70 bg-gold/6 uppercase tracking-[0.1em]">{f}</span>
                          ))}
                        </div>
                        <div className="mt-4">
                          <div className="font-mono text-[0.5rem] text-white/25 uppercase tracking-[0.15em] mb-2">Fields</div>
                          <div className="flex flex-wrap gap-2">
                            {cohort.fields.map(f => (
                              <span key={f} className="px-3 py-1 rounded-full font-mono text-[0.5rem] border border-white/12 text-white/40 bg-white/4 uppercase tracking-[0.08em]">{f}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="font-mono text-[0.5rem] text-white/25 uppercase tracking-[0.15em] mb-3">Top Tool</div>
                        <p className="font-sans text-[0.82rem] text-white/60 mb-5">{cohort.topTool}</p>
                        <Link to={`/cohorts/${cohort.id}`}
                          className="inline-flex items-center gap-2 font-mono text-[0.55rem] text-gold tracking-[0.12em] uppercase hover:gap-3 transition-all">
                          View Full Cohort →
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}

function DF({ label, value, red }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-white/30 font-mono text-[0.55rem] uppercase tracking-[0.08em]">{label}</dt>
      <dd className={red ? 'text-red-400' : 'text-white/70'}>{value}</dd>
    </div>
  );
}
