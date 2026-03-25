import React from 'react';
import { galeShapley } from '../galeShapley';

const s = {
  wrap: { padding: '32px 40px', maxWidth: 900 },
  title: { fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color: 'var(--wine)', marginBottom: 4 },
  sub: { color: 'var(--muted)', fontSize: '0.88rem', marginBottom: 28 },
  runBox: {
    background: 'white', border: '1.5px solid var(--border)', borderRadius: 14,
    padding: '32px', textAlign: 'center', marginBottom: 28,
  },
  runTitle: { fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', color: 'var(--dark)', marginBottom: 8 },
  runSub: { color: 'var(--muted)', fontSize: '0.88rem', marginBottom: 22, lineHeight: 1.6 },
  runBtn: {
    padding: '14px 40px', borderRadius: 10, border: 'none',
    background: 'linear-gradient(135deg, var(--gold), #b8954e)',
    color: 'white', fontFamily: "'DM Sans', sans-serif",
    fontWeight: 600, fontSize: '1rem', cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(200,169,110,0.4)',
    transition: 'transform 0.15s, box-shadow 0.15s',
  },
  statsRow: { display: 'flex', gap: 14, marginBottom: 28, flexWrap: 'wrap' },
  stat: {
    background: 'white', border: '1px solid var(--border)', borderRadius: 10,
    padding: '14px 20px', textAlign: 'center', flex: 1, minWidth: 90,
  },
  statNum: { fontFamily: "'Playfair Display', serif", fontSize: '1.9rem', color: 'var(--wine)' },
  statLabel: { fontSize: '0.76rem', color: 'var(--muted)', marginTop: 2 },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: 14,
    marginBottom: 28,
  },
  resultCard: (matched, delay) => ({
    background: 'white',
    border: `1.5px solid ${matched ? 'var(--gold)' : '#ddd'}`,
    borderRadius: 12, padding: 20,
    opacity: matched ? 1 : 0.65,
    animation: `fadeUp 0.4s ease ${delay}s both`,
  }),
  houseLabel: {
    fontSize: '0.75rem', fontFamily: "'DM Sans', sans-serif",
    textTransform: 'uppercase', letterSpacing: '0.1em',
    color: 'var(--muted)', marginBottom: 4,
  },
  pnmName: { fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: 'var(--wine)', marginBottom: 10 },
  badge: (matched) => ({
    display: 'inline-block', padding: '3px 11px', borderRadius: 20,
    fontSize: '0.74rem', fontWeight: 500,
    background: matched ? '#fef3e2' : '#f5f5f5',
    color: matched ? '#8a5c00' : '#888',
    border: `1px solid ${matched ? 'var(--gold)' : '#ddd'}`,
  }),
  choiceNote: { fontSize: '0.74rem', color: 'var(--muted)', marginTop: 6 },
  algoNote: {
    background: '#fdf0f2', borderLeft: '3px solid var(--rose)',
    padding: '14px 18px', borderRadius: '0 8px 8px 0',
    fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.7, marginTop: 8,
  },
  sectionLabel: {
    fontFamily: "'Playfair Display', serif", fontSize: '1rem',
    color: 'var(--wine)', marginBottom: 16,
  },
};

export default function Results({ pnms, houses, pnmPrefs, housePrefs, result, setResult }) {
  const run = () => {
    const { pnmMatch, houseMatch } = galeShapley(pnms, houses, pnmPrefs, housePrefs);
    setResult({ pnmMatch, houseMatch });
  };

  const matched = result ? Object.keys(result.pnmMatch).length : 0;

  return (
    <div style={s.wrap}>
      <div style={s.title}>Bid Day</div>
      <div style={s.sub}>Run the algorithm to generate your stable matching.</div>

      <div style={s.runBox}>
        <div style={s.runTitle}>Ready to generate bids?</div>
        <div style={s.runSub}>
          Uses the <strong>Gale-Shapley stable matching algorithm</strong> — the same method used by the
          National Resident Matching Program (NRMP) for medical residencies.
          A stable match guarantees no PNM and house both prefer each other over their current pairing.
        </div>
        <button style={s.runBtn} onClick={run}>🎀 Run Matching</button>
      </div>

      {result && (
        <>
          <div style={s.statsRow}>
            {[
              { num: pnms.length, label: 'Total PNMs' },
              { num: matched, label: 'Matched' },
              { num: pnms.length - matched, label: 'Unmatched' },
              { num: houses.length, label: 'Houses' },
            ].map(({ num, label }) => (
              <div key={label} style={s.stat}>
                <div style={s.statNum}>{num}</div>
                <div style={s.statLabel}>{label}</div>
              </div>
            ))}
          </div>

          <div style={s.sectionLabel}>Results by house</div>
          <div style={s.grid}>
            {houses.map(h => {
              const members = result.houseMatch[h.name] || [];
              if (members.length === 0) {
                return (
                  <div key={h.name} style={s.resultCard(false, 0)}>
                    <div style={s.houseLabel}>{h.name}</div>
                    <div style={{ ...s.pnmName, color: 'var(--muted)', fontSize: '0.9rem' }}>No bids extended</div>
                  </div>
                );
              }
              return members.map((pnm, i) => {
                const prefRank = (pnmPrefs[pnm] || []).indexOf(h.name) + 1;
                return (
                  <div key={pnm} style={s.resultCard(true, i * 0.06)}>
                    <div style={s.houseLabel}>{h.name}</div>
                    <div style={s.pnmName}>{pnm}</div>
                    <span style={s.badge(true)}>🎀 Bid Extended</span>
                    {prefRank > 0 && (
                      <div style={s.choiceNote}>PNM's #{prefRank} choice</div>
                    )}
                  </div>
                );
              });
            })}

            {pnms.filter(p => !result.pnmMatch[p]).map((p, i) => (
              <div key={p} style={s.resultCard(false, i * 0.06)}>
                <div style={s.houseLabel}>Unmatched</div>
                <div style={s.pnmName}>{p}</div>
                <span style={s.badge(false)}>No bid</span>
              </div>
            ))}
          </div>

          <div style={s.algoNote}>
            <strong style={{ color: 'var(--wine)' }}>How it works: </strong>
            Gale-Shapley runs in <em>O(n²)</em> time and is guaranteed to produce a stable matching.
            PNMs propose to their most-preferred houses; houses tentatively accept or reject based on their own rankings and quota.
            The result is optimal from the proposing side (PNMs).
          </div>
        </>
      )}
    </div>
  );
}
