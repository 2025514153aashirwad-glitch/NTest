import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PageHero from '../components/PageHero';
import PageLayout from '../components/PageLayout';

const PHASES = [
  { num: 'Phase 1', tag: 'THEORY MODE', time: '15–20 min', title: 'Question Engine', desc: 'The engine asks Socratic questions about the paper\'s domain. Not trivia — deep questions about why things work. It tracks your coverage and flags gaps.' },
  { num: 'Phase 2', tag: 'HAND-SOLVE', time: '15–25 min', title: 'Physical Verification', desc: 'You compute the core result by hand on paper. No calculator shortcuts. Your written answer becomes Test Case 1 — the ground truth your code must match.' },
  { num: 'Phase 3', tag: 'TOOL BUILD', time: '30–50 min', title: 'Jupyter Notebook', desc: '12-cell pre-structured notebook. 8 cells locked. You fill 4 TODO blocks. GENERATE WITH AI is available only after your hand-solve is recorded.' },
  { num: 'Phase 4', tag: 'TESTING', time: '15–30 min', title: 'Adversarial Test Cases', desc: '4 test cases run automatically. TC1 is your hand-solve. TC2–4 are adversarial: edge inputs, boundary values, stress cases. All 4 must pass.' },
  { num: 'Phase 5', tag: 'KNOWLEDGE CAPTURE', time: '10–15 min', title: 'Genuine Understanding', desc: 'Answer 5 structured questions in your own words. Cannot be copy-pasted. Your facilitator will ask you to explain without reading.' },
];

const GATES = [
  { gate: 'TC1 Convergence', threshold: 'Within ±8% of hand-solve', why: 'If code diverges from physics, the session is VOID — not a 0, a VOID.' },
  { gate: 'All 4 Test Cases', threshold: '100% required', why: 'Test cases include adversarial inputs designed to fail weak implementations. 3/4 is not enough.' },
  { gate: 'Accuracy Threshold', threshold: '80–88% field-specific', why: 'Structural: 85%+. Biomedical: 88%+. Energy: 82%+. A tool wrong 1 in 5 times is noise, not a tool.' },
  { gate: 'Feature Coherence', threshold: 'Domain-justifiable', why: 'Your facilitator will ask why the top feature matters. You must answer in domain language referencing the physics.' },
  { gate: 'Knowledge Capture', threshold: 'Genuine, not pasted', why: 'Your facilitator selects one answer at random and asks you to explain it without reading. If you cannot, it is returned.' },
];

// Scroll-reveal wrapper — fades up when section enters viewport
function Section({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px 0px' });

  return (
    <section
      ref={ref}
      className={`relative scholar-section ${className}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0px)' : 'translateY(36px)',
        transition: `opacity 0.9s ${delay}s cubic-bezier(0.22,1,0.36,1), transform 0.9s ${delay}s cubic-bezier(0.22,1,0.36,1)`,
        background: '#00000f',
      }}
    >
      {/* Top section dissolve — removes the hard border-t edge */}
      <div className="absolute top-0 left-0 right-0 h-20 pointer-events-none" style={{
        background: 'linear-gradient(to bottom, #00000f, transparent)',
        zIndex: 2,
      }} />

      {/* Video bg placeholder */}
      <div className="video-bg-layer absolute inset-0" style={{ zIndex: 0 }} />

      <div className="relative" style={{ zIndex: 3 }}>
        {children}
      </div>
    </section>
  );
}

export default function Scholar() {
  return (
    <PageLayout>
      <Navbar />

      <PageHero
        eyebrow="For Students"
        title="This is not a course."
        accent="It's a production environment."
        subtitle="No lectures. No certificates for attendance. No group projects where someone else carries the weight. Only validated output ships."
      />

      {/* What You Build */}
      <Section className="px-[clamp(2rem,6vw,7rem)] py-24" delay={0}>
        <div className="max-w-[860px]">
          <div className="font-mono text-[0.58rem] text-gold tracking-[0.22em] uppercase mb-7 flex items-center gap-4">
            <div className="w-6 h-px bg-gold" /> WHAT YOU WILL BUILD
          </div>
          <h2 className="font-display text-[clamp(2.2rem,3.8vw,3.8rem)] text-white leading-[1.05] mb-10">
            One validated ML tool that solves a real problem<br />
            from a <span className="italic text-gold/90">peer-reviewed research paper.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Computed by hand before any code was written",
              "Passes 4 test cases including adversarial inputs",
              "Meets field-specific accuracy thresholds (80–88%)",
              "Deployed live on uinfinitum.com — queryable by anyone",
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="flex items-start gap-4 p-5 rounded-xl border border-white/6 hover:border-gold/20 transition-all duration-400"
                style={{ background: 'rgba(255,255,255,0.018)' }}
              >
                <span className="text-gold font-mono text-[0.7rem] shrink-0 mt-0.5">→</span>
                <span className="font-sans text-[0.85rem] text-white/65 leading-[1.75]">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* 5 Phases */}
      <Section className="px-[clamp(2rem,6vw,7rem)] py-24" delay={0}>
        <div className="font-mono text-[0.58rem] text-gold tracking-[0.22em] uppercase mb-10 flex items-center gap-4">
          <div className="w-6 h-px bg-gold" /> THE 5-PHASE PROTOCOL
        </div>
        <div className="space-y-4 max-w-[900px]">
          {PHASES.map((phase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.09 }}
              className="group grid grid-cols-[80px_1fr] md:grid-cols-[140px_1fr] gap-6 p-6 rounded-xl border border-white/6 hover:border-gold/22 transition-all duration-400 relative overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.014)' }}
            >
              {/* Hover shimmer */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div>
                <div className="font-mono text-[0.55rem] text-gold/60 tracking-[0.15em] uppercase mb-1">{phase.num}</div>
                <div className="font-mono text-[0.5rem] text-white/22 tracking-[0.12em] uppercase">{phase.time}</div>
              </div>
              <div>
                <div className="font-mono text-[0.55rem] text-gold tracking-[0.15em] uppercase mb-1.5">{phase.tag}</div>
                <h3 className="font-display text-[1.15rem] text-white mb-2">{phase.title}</h3>
                <p className="font-sans text-[0.8rem] text-white/50 leading-[1.78]">{phase.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Quality Gates */}
      <Section className="px-[clamp(2rem,6vw,7rem)] py-24" delay={0}>
        <div className="font-mono text-[0.58rem] text-gold tracking-[0.22em] uppercase mb-10 flex items-center gap-4">
          <div className="w-6 h-px bg-gold" /> QUALITY GATES — NON-NEGOTIABLE
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/8">
                <th className="font-mono text-[0.52rem] text-white/28 tracking-[0.15em] uppercase pb-4 pr-8">Gate</th>
                <th className="font-mono text-[0.52rem] text-white/28 tracking-[0.15em] uppercase pb-4 pr-8">Threshold</th>
                <th className="font-mono text-[0.52rem] text-white/28 tracking-[0.15em] uppercase pb-4">Why it exists</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {GATES.map((g, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="hover:bg-white/2 transition-colors"
                >
                  <td className="py-4 pr-8 font-sans text-[0.82rem] text-white/80">{g.gate}</td>
                  <td className="py-4 pr-8 font-mono text-[0.72rem] text-gold">{g.threshold}</td>
                  <td className="py-4 font-sans text-[0.78rem] text-white/40 leading-[1.75] max-w-[340px]">{g.why}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* The VOID Rule */}
      <Section className="px-[clamp(2rem,6vw,7rem)] py-24" delay={0}>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-[700px] p-8 rounded-2xl relative overflow-hidden"
          style={{ border: '1px solid rgba(239,68,68,0.18)', background: 'rgba(239,68,68,0.03)' }}
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/35 to-transparent" />
          <div className="font-mono text-[0.6rem] text-red-400 tracking-[0.22em] uppercase mb-4">THE VOID RULE</div>
          <p className="font-sans text-[0.88rem] text-white/65 leading-[1.9] mb-4">
            A session where Test Case 1 fails is not graded zero. It receives a <strong className="text-white">VOID</strong>.
          </p>
          <p className="font-sans text-[0.82rem] text-white/42 leading-[1.88]">
            VOID means the session did not happen. Your tool is not in the REGISTRY. Your name is not on the website. The session can be retaken. A tool whose fundamental computation is wrong is not a tool — it is misinformation.
          </p>
        </motion.div>
      </Section>

      {/* CTA */}
      <Section className="px-[clamp(2rem,6vw,7rem)] py-24 flex flex-col md:flex-row items-center justify-between gap-8" delay={0}>
        <div>
          <h2 className="font-display text-[clamp(2rem,3.5vw,3.5rem)] text-white leading-tight">
            Ready to <span className="italic text-gold/90">apply</span>?
          </h2>
          <p className="font-sans text-[0.85rem] text-white/35 mt-2">Three formats. One standard. Choose the pace that works for you.</p>
        </div>
        <Link to="/join">
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="h-[52px] px-10 rounded-pill bg-gold font-sans text-[0.76rem] font-medium text-void tracking-[0.12em] uppercase shadow-[0_4px_28px_rgba(201,169,110,0.4)] whitespace-nowrap"
          >
            Open a Protocol →
          </motion.button>
        </Link>
      </Section>
    </PageLayout>
  );
}
