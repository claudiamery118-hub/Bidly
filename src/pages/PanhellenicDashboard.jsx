import React, { useState } from 'react';
import { galeShapley } from '../galeShapley';

const s = {
  wrap: { padding: '36px 40px', maxWidth: 900 },
  greeting: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '1.8rem', color: 'var(--wine)', marginBottom: 4,
  },
  sub: { color: 'var(--muted)', fontSize: '0.88rem', marginBottom: 32 },
  tabs: { display: 'flex', gap: 10, marginBottom: 28, flexWrap: 'wrap' },
  tabBtn: (active) => ({
    padding: '9px 20px', borderRadius: 8,
    border: `1.5px solid ${active ? 'var(--wine)' : 'var(--border)'}`,
    background: active ? 'var(--wine)' : 'white',
    color: active ? 'var(--cream)' : 'var(--muted)',
    fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
    fontSize: '0.83rem', cursor: 'pointer', transition: 'all 0.18s',
  }),
  card: {
    background: 'white', border: '1px solid var(--border)',
    borderRadius: 14, padding: '24px 28px', marginBottom: 20,
  },
  cardTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '1.2rem', color: 'var(--wine)', marginBottom: 6,
  },
  cardSub: { fontSize: '0.83rem', color: 'var(--muted)', marginBottom: 20 },
  row: { display: 'flex', gap: 10, marginBottom: 16 },
  input: {
    flex: 1, padding: '10px 14px', border: '1.5px solid var(--border)',
    borderRadius: 8, fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem',
    color: 'var(--dark)', background: 'white', outline: 'none',
  },
  addBtn: {
    padding: '10px 20px', borderRadius: 8, border: 'none',
    background: 'var(--wine)', color: 'var(--cream)',
    fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
    fontSize: '0.88rem', cursor: 'pointer',
  },
  item: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '12px 16px', border: '1px solid var(--border)',
    borderRadius: 9, marginBottom: 8, background: 'white',
    animation: 'fadeUp 0.25s ease both',
  },
  itemName: { fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', color: 'var(--dark)' },
  quotaRow: { display: 'flex', alignItems: 'center', gap: 8 },
  quotaLabel: { fontSize: '0.78rem', color: 'var(--muted)' },
  numInput: {
    width: 52, padding: '5px 8px', border: '1.5px solid var(--border)',
    borderRadius: 6, fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.85rem', textAlign: 'center', outline: 'none',
  },
  removeBtn: {
    background: 'none', border: 'none', color: 'var(--muted)',
    cursor: 'pointer', fontSize: '1rem', padding: '3px 7px',
    borderRadius: 5, transition: 'all 0.15s',
  },
  runBox: {
    background: 'white', border: '1.5px solid var(--border)',
    borderRadius: 14, padding: '32px', textAlign: 'center', marginBottom: 28,
  },
  runTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '1.4rem', color: 'var(--dark)', marginBottom: 8,
  },
  runSub: { color: 'var(--muted)', fontSize: '0.86rem', marginBottom: 22, lineHeight: 1.6 },
  runBtn: {
    padding: '14px 40px', borderRadius: 10, border: 'none',
    background: 'linear-gradient(135deg, var(--gold), #b8954e)',
    color: 'white', fontFamily: "'DM Sans', sans-serif",
    fontWeight: 700, fontSize: '1rem', cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(200,169,110,0.4)', transition: 'transform 0.15s',
  },
  statsRow: { display: 'flex', gap: 14, marginBottom: 28, flexWrap: 'wrap' },
  stat: {
    background: 'white', border: '1px solid var(--border)',
    borderRadius: 10, padding: '14px 20px',
    textAlign: 'center', flex: 1, minWidth: 90,
  },
  statNum: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '2rem', color: 'var(--wine)',
  },
  statLabel: { fontSize: '0.75rem', color: 'var(--muted)', marginTop: 2 },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(210px,1fr))',
    gap: 13, marginBottom: 24,
  },
  resultCard: (matched, delay) => ({
    background: 'white',
    border: `1.5px solid ${matched ? 'var(--gold)' : '#ddd'}`,
    borderRadius: 12, padding: '18px 20px',
    opacity: matched ? 1 : 0.6,
    animation: `fadeUp 0.4s ease ${delay}s both`,
  }),
  houseLabel: {
    fontSize: '0.72rem', textTransform: 'uppercase',
    letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: 4,
  },
  pnmName: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '1.1rem', color: 'var(--wine)', marginBottom: 8,
  },
  badge: (matched) => ({
    display: 'inline-block', padding: '2px 10px', borderRadius: 20,
    fontSize: '0.72rem', fontWeight: 500,
    background: matched ? '#fef3e2' : '#f5f5f5',
    color: matched ? '#8a5c00' : '#888',
    border: `1px solid ${matched ? 'var(--gold)' : '#ddd'}`,
  }),
  choiceNote: { fontSize: '0.72rem', color: 'var(--muted)', marginTop: 5 },
  sectionLabel: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '1.1rem', color: 'var(--wine)', marginBottom: 16,
  },
  algoNote: {
    background: '#fdf0f2', borderLeft: '3px solid var(--rose)',
    padding: '13px 16px', borderRadius: '0 8px 8px 0',
    fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.7,
  },
  empty: { textAlign: 'center', padding: '32px', color: 'var(--muted)', fontStyle: 'italic' },
  progressRow: { marginBottom: 10 },
  progressLabel: {
    display: 'flex', justifyContent: 'space-between',
    fontSize: '0.82rem', color: 'var(--dark)', marginBottom: 4,
  },
  progressBar: { height: 7, background: 'var(--border)', borderRadius: 10, overflow: 'hidden' },
  progressFill: (pct) => ({
    height: '100%', borderRadius: 10,
    background: 'linear-gradient(90deg, var(--rose), var(--wine))',
    width: `${pct}%`, transition: 'width 0.4s ease',
  }),
};

export default function PanhellenicDashboard({
  houses, setHouses, pnms, setPNMs,
  pnmPrefs, setPnmPrefs, housePrefs, setHousePrefs,
  result, setResult,
}) {
  const [view, setView] = useState('overview');
  const [houseInput, setHouseInput] = useState('');
  const [pnmInput, setPnmInput] = useState('');

  const addHouse = () => {
    const name = houseInput.trim();
    if (!name || houses.find(h => h.name === name)) return;
    setHouses(prev => [...prev, { name, quota: 2 }]);
    setHouseInput('');
  };
  const removeHouse = name => setHouses(prev => prev.filter(h => h.name !== name));
  const updateQuota = (name, val) =>
    setHouses(prev => prev.map(h => h.name === name ? { ...h, quota: Math.max(1, parseInt(val) || 1) } : h));

  const addPNM = () => {
    const name = pnmInput.trim();
    if (!name || pnms.includes(name)) return;
    setPNMs(prev => [...prev, name]);
    setPnmInput('');
  };
  const removePNM = name => setPNMs(prev => prev.filter(p => p !== name));

  const runMatch = () => {
    const { pnmMatch, houseMatch } = galeShapley(pnms, houses, pnmPrefs, housePrefs);
    setResult({ pnmMatch, houseMatch });
    setView('results');
  };

  const pnmsRanked = pnms.filter(p => pnmPrefs[p] && pnmPrefs[p].length > 0).length;
  const housesRanked = houses.filter(h => housePrefs[h.name] && housePrefs[h.name].length > 0).length;

  return (
    <div style={s.wrap}>
      <div style={s.greeting}>Panhellenic Council ⚖️</div>
      <div style={s.sub}>Oversee recruitment — manage houses, PNMs, and run the final match.</div>

      <div style={s.tabs}>
        <button style={s.tabBtn(view === 'overview')} onClick={() => setView('overview')}>📊 Overview</button>
        <button style={s.tabBtn(view === 'houses')} onClick={() => setView('houses')}>🏛 Houses</button>
        <button style={s.tabBtn(view === 'pnms')} onClick={() => setView('pnms')}>🌸 PNMs</button>
        <button style={s.tabBtn(view === 'run')} onClick={() => setView('run')}>⚙️ Run Match</button>
        {result && <button style={s.tabBtn(view === 'results')} onClick={() => setView('results')}>🎀 Results</button>}
      </div>

      {/* OVERVIEW */}
      {view === 'overview' && (
        <>
          <div style={s.statsRow}>
            {[
              { num: houses.length, label: 'Houses' },
              { num: pnms.length, label: 'PNMs' },
              { num: pnmsRanked, label: 'PNMs Ranked' },
              { num: housesRanked, label: 'Houses Ranked' },
            ].map(({ num, label }) => (
              <div key={label} style={s.stat}>
                <div style={s.statNum}>{num}</div>
                <div style={s.statLabel}>{label}</div>
              </div>
            ))}
          </div>

          <div style={s.card}>
            <div style={s.cardTitle}>Ranking Progress</div>
            <div style={s.cardSub}>Track who has submitted their preferences.</div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: '0.83rem', fontWeight: 600, color: 'var(--dark)', marginBottom: 12 }}>PNMs</div>
              {pnms.length === 0 ? <div style={s.empty}>No PNMs added yet.</div> :
                pnms.map(p => {
                  const done = pnmPrefs[p] && pnmPrefs[p].length > 0;
                  return (
                    <div key={p} style={s.progressRow}>
                      <div style={s.progressLabel}>
                        <span>{p}</span>
                        <span style={{ color: done ? 'var(--green)' : 'var(--muted)' }}>{done ? '✓ Submitted' : 'Pending'}</span>
                      </div>
                      <div style={s.progressBar}><div style={s.progressFill(done ? 100 : 0)} /></div>
                    </div>
                  );
                })}
            </div>

            <div>
              <div style={{ fontSize: '0.83rem', fontWeight: 600, color: 'var(--dark)', marginBottom: 12 }}>Houses</div>
              {houses.length === 0 ? <div style={s.empty}>No houses added yet.</div> :
                houses.map(h => {
                  const done = housePrefs[h.name] && housePrefs[h.name].length > 0;
                  return (
                    <div key={h.name} style={s.progressRow}>
                      <div style={s.progressLabel}>
                        <span>{h.name}</span>
                        <span style={{ color: done ? 'var(--green)' : 'var(--muted)' }}>{done ? '✓ Submitted' : 'Pending'}</span>
                      </div>
                      <div style={s.progressBar}><div style={s.progressFill(done ? 100 : 0)} /></div>
                    </div>
                  );
                })}
            </div>
          </div>
        </>
      )}

      {/* HOUSES */}
      {view === 'houses' && (
        <div style={s.card}>
          <div style={s.cardTitle}>Manage Houses</div>
          <div style={s.cardSub}>Add the sorority houses participating this cycle and set their bid quotas.</div>
          <div style={s.row}>
            <input style={s.input} value={houseInput} onChange={e => setHouseInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addHouse()} placeholder="e.g. Alpha Delta Pi" />
            <button style={s.addBtn} onClick={addHouse}>Add</button>
          </div>
          {houses.length === 0
            ? <div style={s.empty}>No houses added yet.</div>
            : houses.map(h => (
              <div key={h.name} style={s.item}>
                <div>
                  <div style={s.itemName}>{h.name}</div>
                  <div style={s.quotaRow}>
                    <span style={s.quotaLabel}>Quota:</span>
                    <input type="number" style={s.numInput} min={1} max={99} value={h.quota}
                      onChange={e => updateQuota(h.name, e.target.value)} />
                  </div>
                </div>
                <button style={s.removeBtn} onClick={() => removeHouse(h.name)}>✕</button>
              </div>
            ))
          }
        </div>
      )}

      {/* PNMS */}
      {view === 'pnms' && (
        <div style={s.card}>
          <div style={s.cardTitle}>Manage PNMs</div>
          <div style={s.cardSub}>Add all potential new members participating in recruitment.</div>
          <div style={s.row}>
            <input style={s.input} value={pnmInput} onChange={e => setPnmInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addPNM()} placeholder="e.g. Emma Chen" />
            <button style={s.addBtn} onClick={addPNM}>Add</button>
          </div>
          {pnms.length === 0
            ? <div style={s.empty}>No PNMs added yet.</div>
            : pnms.map(p => (
              <div key={p} style={s.item}>
                <div style={s.itemName}>{p}</div>
                <button style={s.removeBtn} onClick={() => removePNM(p)}>✕</button>
              </div>
            ))
          }
        </div>
      )}

      {/* RUN */}
      {view === 'run' && (
        <div style={s.runBox}>
          <div style={s.runTitle}>Run the Matching Algorithm</div>
          <div style={s.runSub}>
            This uses the <strong>Gale-Shapley stable matching algorithm</strong> — the same method
            used by the NRMP for medical residency placement.<br />
            A stable match guarantees no PNM and house mutually prefer each other over their current pairing.
          </div>
          <div style={{ marginBottom: 20, fontSize: '0.85rem', color: 'var(--muted)' }}>
            {pnms.length} PNMs · {houses.length} houses · {pnmsRanked}/{pnms.length} PNM rankings in · {housesRanked}/{houses.length} house rankings in
          </div>
          <button style={s.runBtn} onClick={runMatch}>🎀 Generate Bids</button>
        </div>
      )}

      {/* RESULTS */}
      {view === 'results' && result && (
        <>
          <div style={s.statsRow}>
            {[
              { num: pnms.length, label: 'Total PNMs' },
              { num: Object.keys(result.pnmMatch).length, label: 'Matched' },
              { num: pnms.length - Object.keys(result.pnmMatch).length, label: 'Unmatched' },
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
              if (!members.length) return (
                <div key={h.name} style={s.resultCard(false, 0)}>
                  <div style={s.houseLabel}>{h.name}</div>
                  <div style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>No bids</div>
                </div>
              );
              return members.map((pnm, i) => {
                const rank = (pnmPrefs[pnm] || []).indexOf(h.name) + 1;
                return (
                  <div key={pnm} style={s.resultCard(true, i * 0.06)}>
                    <div style={s.houseLabel}>{h.name}</div>
                    <div style={s.pnmName}>{pnm}</div>
                    <span style={s.badge(true)}>🎀 Bid</span>
                    {rank > 0 && <div style={s.choiceNote}>PNM's #{rank} choice</div>}
                  </div>
                );
              });
            })}
            {pnms.filter(p => !result.pnmMatch[p]).map(p => (
              <div key={p} style={s.resultCard(false, 0)}>
                <div style={s.houseLabel}>Unmatched</div>
                <div style={s.pnmName}>{p}</div>
                <span style={s.badge(false)}>No bid</span>
              </div>
            ))}
          </div>

          <div style={s.algoNote}>
            <strong style={{ color: 'var(--wine)' }}>Algorithm: </strong>
            Gale-Shapley runs in O(n²). Result is PNM-optimal — every PNM receives the best possible match
            given all constraints. No blocking pairs exist in the output.
          </div>
        </>
      )}
    </div>
  );
}
