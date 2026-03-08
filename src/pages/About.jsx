import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PageHero from '../components/PageHero';
import PageLayout from '../components/PageLayout';

const TEAM = [
  { role: 'Master Facilitator', domain: 'Session design, quality verification, cohort operations' },
  { role: 'Paper Structurization Lead', domain: 'Converts research papers into machine-readable records' },
  { role: 'Platform Developer', domain: 'Question Engine, notebook generator, REGISTRY infrastructure' },
  { role: 'Assessment Engineer', domain: 'Scoring engine, facilitator dashboard, quality metrics' },
];

const DIFFERENCES = [
  {
    label: 'Standard ML Courses',
    negative: true,
    points: [
      'Teach model architectures on cleaned datasets',
      'Student produces code that runs — code is submitted — grade is given',
      'Nothing is deployed',
    ],
  },
  {
    label: 'U Infinitum',
    negative: false,
    points: [
      'Student builds a tool rooted in a specific paper',
      'Validates it physically before coding',
      'Passes adversarial test cases',
      'Deploys it to a public REGISTRY that real engineers query',
    ],
  },
];

export default function About() {
  return (
    <PageLayout>
      <Navbar />
      <PageHero
        eyebrow="What Is U Infinitum"
        title="One thing."
        accent="Done completely."
        subtitle="U Infinitum takes students with domain knowledge and gives them a structured environment to convert that knowledge into validated, deployed engineering tools — anchored in real research papers, verified by physical hand-solve, and tested against adversarial inputs."
      />

      {/* What Makes This Different */}
      <section className="px-[clamp(2rem,6vw,7rem)] py-20 border-t border-white/6">
        <div className="font-mono text-[0.58rem] text-gold tracking-[0.22em] uppercase mb-10 flex items-center gap-4">
          <div className="w-6 h-px bg-gold" /> WHAT MAKES THIS DIFFERENT
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px]">
          {DIFFERENCES.map((d, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="p-7 rounded-2xl border"
              style={{
                borderColor: d.negative ? 'rgba(239,68,68,0.15)' : 'rgba(201,169,110,0.2)',
                background: d.negative ? 'rgba(239,68,68,0.03)' : 'rgba(201,169,110,0.04)',
              }}
            >
              <div className="font-mono text-[0.58rem] tracking-[0.18em] uppercase mb-5"
                style={{ color: d.negative ? '#ef4444aa' : '#c9a96e' }}>{d.label}</div>
              <ul className="space-y-3">
                {d.points.map((p, j) => (
                  <li key={j} className="flex items-start gap-3 font-sans text-[0.82rem] leading-[1.75]"
                    style={{ color: d.negative ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.65)' }}>
                    <span style={{ color: d.negative ? '#ef444460' : '#c9a96e80' }}>{d.negative ? '—' : '→'}</span>
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Architecture Paragraph */}
      <section className="px-[clamp(2rem,6vw,7rem)] py-16 border-t border-white/6">
        <div className="max-w-[720px]">
          <div className="font-mono text-[0.58rem] text-gold tracking-[0.22em] uppercase mb-6 flex items-center gap-4">
            <div className="w-6 h-px bg-gold" /> THE ARCHITECTURE
          </div>
          <p className="font-sans text-[0.92rem] text-white/60 leading-[2.0]">
            Every paper is structurised into a five-layer record: bibliographic identity, conceptual anatomy, numerical parameters, tool connections, and pedagogy data. The Question Engine reads this record and drives the student session — Socratic questions, parameter validation, notebook generation. The student's output is validated by automated test cases and a human facilitator. Approved tools enter the REGISTRY as nodes in a connected graph. The graph grows with every cohort. The chains that visitors execute on the home page are real — they query real tools, built by real students, from real papers.
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="px-[clamp(2rem,6vw,7rem)] py-16 border-t border-white/6">
        <div className="font-mono text-[0.58rem] text-gold tracking-[0.22em] uppercase mb-8 flex items-center gap-4">
          <div className="w-6 h-px bg-gold" /> TEAM
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[800px]">
          {TEAM.map((member, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-6 rounded-xl border border-white/6 bg-glass">
              <div className="font-sans text-[0.9rem] text-white mb-1.5">{member.role}</div>
              <div className="font-sans text-[0.75rem] text-white/35 leading-[1.7]">{member.domain}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Programme Formats summary */}
      <section className="px-[clamp(2rem,6vw,7rem)] py-16 border-t border-white/6">
        <div className="font-mono text-[0.58rem] text-gold tracking-[0.22em] uppercase mb-8 flex items-center gap-4">
          <div className="w-6 h-px bg-gold" /> PROGRAMME FORMATS
        </div>
        <div className="overflow-x-auto max-w-[700px]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-white/8">
                {['Format', 'Duration', 'Best For'].map(h => (
                  <th key={h} className="text-left pb-3 pr-10 font-mono text-[0.52rem] text-white/25 tracking-[0.15em] uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                ['90-Min Hackathon', '1.5 hours', 'First-time builders. Events. One tool per student.'],
                ['3-Week Course', '6 sessions', 'Deep learning. Peer collaboration. Chained tools.'],
                ['2-Day Workshop', '10 hours', 'Professional upskilling. Complex tools. Advanced chains.'],
              ].map(([f, d, b], i) => (
                <tr key={i} className="hover:bg-white/2 transition-colors">
                  <td className="py-4 pr-10 font-sans text-[0.82rem] text-white/75">{f}</td>
                  <td className="py-4 pr-10 font-mono text-[0.7rem] text-gold/60">{d}</td>
                  <td className="py-4 font-sans text-[0.78rem] text-white/35">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Institution CTA */}
      <section className="px-[clamp(2rem,6vw,7rem)] py-20 border-t border-white/6">
        <div className="max-w-[640px] p-10 rounded-2xl border border-gold/20 bg-gold/4 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
          <div className="font-mono text-[0.58rem] text-gold tracking-[0.22em] uppercase mb-4">INSTITUTIONAL PARTNERSHIP</div>
          <h2 className="font-display text-[2.2rem] text-white leading-tight mb-4">
            Your portal.<br /><span className="italic text-gold/90">Our infrastructure.</span>
          </h2>
          <p className="font-sans text-[0.85rem] text-white/50 leading-[1.85] mb-7">
            U Infinitum provides the simulation backbone for modern institutional research — removing hardware bottlenecks from the learning cycle. Zero infrastructure required on your end.
          </p>
          <Link to="/join#institution">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              className="h-[50px] px-10 rounded-pill bg-gold font-sans text-[0.76rem] font-medium text-void tracking-[0.12em] uppercase shadow-[0_4px_28px_rgba(201,169,110,0.4)]">
              Initiate MoU →
            </motion.button>
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
