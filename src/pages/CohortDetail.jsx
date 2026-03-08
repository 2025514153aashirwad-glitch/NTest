import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PageLayout from '../components/PageLayout';
import { COHORTS, TOOLS } from '../data/mockData';

const SAMPLE_STUDENTS = [
  { code: 'STU-C1-001', field: 'Structural', scale: 'NANO', tool: 'UINF-2024-STRUCT-0001', tc1: 'Pass', acc: '91%', paper: 'Mehta & Sharma 2022' },
  { code: 'STU-C1-002', field: 'Biomedical', scale: 'ORGAN', tool: 'UINF-2024-BIO-0021', tc1: 'Pass', acc: '90%', paper: 'Rajamani et al. 2021' },
  { code: 'STU-C1-003', field: 'Energy', scale: 'NANO', tool: 'UINF-2024-ENERGY-0008', tc1: 'Pass', acc: '85%', paper: 'Liu et al. 2023' },
  { code: 'STU-C1-004', field: 'Computational', scale: 'ALGORITHM', tool: 'UINF-2024-COMP-0033', tc1: 'Pass', acc: '83%', paper: 'Zhang & Wei 2022' },
  { code: 'STU-C1-005', field: 'Structural', scale: 'MICRO', tool: 'UINF-2024-STRUCT-0012', tc1: 'Pass', acc: '88%', paper: 'Christensen & Lo 1979' },
  { code: 'STU-C1-006', field: 'Structural', scale: 'MESO', tool: 'UINF-2024-STRUCT-0007', tc1: 'Pass', acc: '93%', paper: 'Timoshenko & Gere 1961' },
];

export default function CohortDetail() {
  const { cohortId } = useParams();
  const cohort = COHORTS.find(c => c.id === cohortId);
  if (!cohort) return <Navigate to="/cohorts" replace />;

  const students = SAMPLE_STUDENTS.slice(0, cohort.toolsApproved);

  return (
    <PageLayout>
      <Navbar />
      <div className="pt-28 px-[clamp(2rem,6vw,7rem)] pb-20">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-mono text-[0.52rem] text-white/25 tracking-[0.15em] uppercase mb-8">
          <Link to="/cohorts" className="hover:text-gold transition-colors">Cohorts</Link>
          <span>/</span>
          <span className="text-white/40">{cohort.name}</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="font-mono text-[0.58rem] text-gold tracking-[0.22em] uppercase mb-3">{cohort.period}</div>
          <h1 className="font-display text-[clamp(3rem,5vw,5rem)] text-white leading-[0.95] mb-4">{cohort.name}</h1>
          <p className="font-sans text-[0.88rem] text-white/45 max-w-[540px] leading-[1.85]">{cohort.description}</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-12">
          {[
            { label: 'Students', value: cohort.students },
            { label: 'Approved', value: cohort.toolsApproved, color: '#22c55e' },
            { label: 'Void', value: cohort.toolsVoid, color: '#ef4444' },
            { label: 'Avg Accuracy', value: `${(cohort.avgAccuracy * 100).toFixed(0)}%` },
          ].map(s => (
            <div key={s.label} className="p-5 rounded-xl border border-white/6 bg-glass text-center">
              <div className="font-display text-[2.2rem] leading-none mb-1" style={{ color: s.color || '#c9a96e' }}>{s.value}</div>
              <div className="font-mono text-[0.5rem] text-white/25 uppercase tracking-[0.12em]">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Student Roster */}
        <div>
          <div className="font-mono text-[0.52rem] text-white/25 tracking-[0.18em] uppercase mb-5">Student Roster — Anonymised</div>
          <div className="overflow-x-auto rounded-xl border border-white/8">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/6">
                  <Th>Student ID</Th>
                  <Th>Field</Th>
                  <Th>Scale</Th>
                  <Th>Tool</Th>
                  <Th>TC1</Th>
                  <Th>Accuracy</Th>
                  <Th>Paper</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/4">
                {students.map(s => (
                  <tr key={s.code} className="hover:bg-white/2 transition-colors">
                    <td className="px-5 py-3.5 font-mono text-[0.65rem] text-white/50">{s.code}</td>
                    <td className="px-5 py-3.5 font-sans text-[0.78rem] text-white/65">{s.field}</td>
                    <td className="px-5 py-3.5 font-mono text-[0.62rem] text-gold/60">{s.scale}</td>
                    <td className="px-5 py-3.5">
                      <Link to={`/explore/${s.tool}`} className="font-mono text-[0.55rem] text-gold hover:underline">{s.tool.split('-').slice(-1)[0].padStart(4,'0')}</Link>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="font-mono text-[0.6rem] text-green-400">{s.tc1}</span>
                    </td>
                    <td className="px-5 py-3.5 font-mono text-[0.7rem] text-white/60">{s.acc}</td>
                    <td className="px-5 py-3.5 font-sans text-[0.72rem] text-white/35">{s.paper}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

function Th({ children }) {
  return <th className="px-5 py-3 font-mono text-[0.48rem] text-white/25 tracking-[0.15em] uppercase">{children}</th>;
}
