import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PageHero from '../components/PageHero';
import PageLayout from '../components/PageLayout';

const FORMATS = [
  { label: '90-MIN HACKATHON', duration: '1.5 hours', best: 'First-time builders, events', output: '1 validated tool', who: 'Students curious about the program', icon: '⚡' },
  { label: '3-WEEK COURSE', duration: '6 sessions + homework', best: 'Deep learning, peer work', output: '2–3 chained tools', who: 'Students wanting depth and community', icon: '📐' },
  { label: '2-DAY WORKSHOP', duration: '10 hours intensive', best: 'Professional upskilling', output: '2 complex tools', who: 'Working engineers, researchers', icon: '🏗' },
];

const FIELDS = ['Structural Engineering', 'Biomedical Engineering', 'Energy Systems', 'Computational Science'];

export default function Join() {
  const [form, setForm] = useState({ first: '', last: '', email: '', phone: '', org: '', field: '', format: '', why: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleSubmit = e => { e.preventDefault(); setSubmitted(true); };

  return (
    <PageLayout>
      <Navbar />
      <PageHero
        eyebrow="How to Participate"
        title="Three formats."
        accent="One standard."
        subtitle="Every format produces the same output: a validated, deployed tool that passes the same quality gates. The format changes the pace. The standard never changes."
      />

      {/* Format Cards */}
      <section className="px-[clamp(2rem,6vw,7rem)] py-20 border-t border-white/6">
        <div className="font-mono text-[0.58rem] text-gold tracking-[0.22em] uppercase mb-10 flex items-center gap-4">
          <div className="w-6 h-px bg-gold" /> CHOOSE YOUR FORMAT
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {FORMATS.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="p-7 rounded-2xl border border-white/8 bg-glass hover:border-gold/25 transition-all duration-400 group flex flex-col gap-5"
            >
              <div className="text-3xl">{f.icon}</div>
              <div>
                <div className="font-mono text-[0.55rem] text-gold tracking-[0.18em] uppercase mb-2">{f.label}</div>
                <div className="font-display text-[1.6rem] text-white mb-1">{f.duration}</div>
              </div>
              <div className="flex-1 space-y-3 text-[0.8rem] text-white/50 leading-[1.7]">
                <p><span className="text-white/30">Best for:</span> {f.best}</p>
                <p><span className="text-white/30">Output:</span> {f.output}</p>
                <p><span className="text-white/30">Who:</span> {f.who}</p>
              </div>
              <div className="w-full h-px bg-gradient-to-r from-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Eligibility */}
      <section className="px-[clamp(2rem,6vw,7rem)] py-20 border-t border-white/6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-[1000px]">
          <div>
            <div className="font-mono text-[0.58rem] text-gold tracking-[0.22em] uppercase mb-6 flex items-center gap-4">
              <div className="w-6 h-px bg-gold" /> YOU SHOULD APPLY IF
            </div>
            {[
              "You have domain knowledge in at least one field: Structural, Biomedical, Energy, or Computational",
              "You can write basic Python (pandas, scikit-learn) or are willing to prepare before the session",
              "You are in Year 3 or 4 of an engineering programme, or are a working professional",
              "You understand that only validated output ships — effort alone is not rewarded",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 mb-4">
                <span className="text-green-400 mt-1">✓</span>
                <p className="font-sans text-[0.82rem] text-white/60 leading-[1.75]">{item}</p>
              </div>
            ))}
          </div>
          <div>
            <div className="font-mono text-[0.58rem] text-red-400 tracking-[0.22em] uppercase mb-6 flex items-center gap-4">
              <div className="w-6 h-px bg-red-400/60" /> DO NOT APPLY IF
            </div>
            {[
              "You hope to learn your engineering domain from scratch — this is not that programme",
              "You cannot commit to the full session format you choose — partial completions do not produce deployed tools",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 mb-4">
                <span className="text-red-400 mt-1">✕</span>
                <p className="font-sans text-[0.82rem] text-white/40 leading-[1.75]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section id="institution" className="px-[clamp(2rem,6vw,7rem)] py-20 border-t border-white/6">
        <div className="max-w-[760px]">
          <div className="font-mono text-[0.58rem] text-gold tracking-[0.22em] uppercase mb-8 flex items-center gap-4">
            <div className="w-6 h-px bg-gold" /> REGISTRATION
          </div>

          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="p-10 rounded-2xl border border-green-500/25 bg-green-500/5 text-center">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="font-display text-[2rem] text-white mb-3">Protocol Submitted</h3>
              <p className="font-sans text-[0.85rem] text-white/45">You'll receive a confirmation email shortly. Your facilitator will reach out to confirm your format and field assignment.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 p-10 rounded-2xl border border-white/8 bg-glass">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Field label="First Name" name="first" type="text" required value={form.first} onChange={handleChange} />
                <Field label="Last Name" name="last" type="text" required value={form.last} onChange={handleChange} />
                <Field label="Email" name="email" type="email" required value={form.email} onChange={handleChange} />
                <Field label="Phone" name="phone" type="tel" required value={form.phone} onChange={handleChange} />
                <Field label="Institution / Organisation" name="org" type="text" value={form.org} onChange={handleChange} />
                <div className="space-y-2">
                  <label className="block font-mono text-[0.56rem] text-gold/70 tracking-[0.18em] uppercase ml-1">Field of Expertise</label>
                  <select name="field" value={form.field} onChange={handleChange} className="w-full h-[48px] px-4 rounded-lg bg-white/4 border border-white/10 font-sans text-[0.85rem] text-white/70 focus:outline-none focus:border-gold/40 transition-all">
                    <option value="">Select a field…</option>
                    {FIELDS.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="block font-mono text-[0.56rem] text-gold/70 tracking-[0.18em] uppercase ml-1">Programme Format</label>
                  <select name="format" value={form.format} onChange={handleChange} className="w-full h-[48px] px-4 rounded-lg bg-white/4 border border-white/10 font-sans text-[0.85rem] text-white/70 focus:outline-none focus:border-gold/40 transition-all">
                    <option value="">Select a format…</option>
                    <option>90-Minute Hackathon</option>
                    <option>3-Week Course</option>
                    <option>2-Day Workshop</option>
                  </select>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="block font-mono text-[0.56rem] text-gold/70 tracking-[0.18em] uppercase ml-1">Why are you applying? (max 300 chars)</label>
                  <textarea name="why" value={form.why} onChange={handleChange} maxLength={300}
                    className="w-full h-[100px] px-4 py-3 rounded-lg bg-white/4 border border-white/10 font-sans text-[0.85rem] text-white/70 placeholder:text-white/20 focus:outline-none focus:border-gold/40 transition-all resize-none"
                    placeholder="Tell us what brings you here…" />
                  <div className="font-mono text-[0.5rem] text-white/20 text-right">{form.why.length}/300</div>
                </div>
              </div>
              <motion.button type="submit" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                className="w-full h-[52px] rounded-lg bg-gold font-sans text-[0.8rem] font-medium text-void tracking-[0.12em] uppercase shadow-[0_4px_28px_rgba(201,169,110,0.35)]">
                Submit Protocol →
              </motion.button>
            </form>
          )}
        </div>
      </section>
    </PageLayout>
  );
}

function Field({ label, name, type, required, value, onChange }) {
  return (
    <div className="space-y-2">
      <label className="block font-mono text-[0.56rem] text-gold/70 tracking-[0.18em] uppercase ml-1">{label}</label>
      <input type={type} name={name} required={required} value={value} onChange={onChange}
        className="w-full h-[48px] px-4 rounded-lg bg-white/4 border border-white/10 font-sans text-[0.85rem] text-white/70 focus:outline-none focus:border-gold/40 transition-all" />
    </div>
  );
}
