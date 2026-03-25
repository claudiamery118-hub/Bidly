import React, { useState, useEffect } from 'react';

const s = {
  wrap: { padding: '32px 40px', maxWidth: 800 },
  title: { fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color: 'var(--wine)', marginBottom: 4 },
  sub: { color: 'var(--muted)', fontSize: '0.88rem', marginBottom: 24 },
  toggleRow: { display: 'flex', gap: 10, marginBottom: 28 },
  toggleBtn: (active) => ({
    padding: '9px 22px', borderRadius: 8,
    border: `1.5px solid ${active ? 'var(--wine)' : 'var(--border)'}`,
    background: active ? 'var(--wine)' : 'white',
    color: active ? 'var(--cream)' : 'var(--muted)',
    fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: '0.85rem',
    cursor: 'pointer', transition: 'all 0.2s',
  }),
  sectionLabel: {
    fontFamily: "'Playfair Display', serif", fontSize: '1rem',
    color: 'var(--wine)', marginBottom: 16,
  },
  card: {
    background: 'white', border: '1px solid var(--border)', borderRadius: 12,
    padding: '20px 24px', marginBottom: 16,
    animation: 'fadeUp 0.3s ease both',
  },
  cardName: { fontFamily: "'Playfair Display', serif", fontSize: '1rem', color: 'var(--dark)', marginBottom: 14 },
  rankList: { listStyle: 'none' },
  rankItem: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 },
  rankNum: {
    width: 26, height: 26, borderRadius: '50%',
    background: 'var(--blush)', color: 'var(--wine)',
    fontSize: '0.75rem', fontWeight: 600,
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  select: {
    flex: 1, padding: '7px 12px', border: '1.5px solid var(--border)',
    borderRadius: 7, fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem',
    color: 'var(--dark)', background: 'white', outline: 'none', cursor: 'pointer',
  },
  empty: { textAlign: 'center', padding: '48px 24px', color: 'var(--muted)' },
};

function swapRanking(list, idx, newVal) {
  const updated = [...list];
  const swapIdx = updated.indexOf(newVal);
  if (swapIdx !== -1) updated[swapIdx] = updated[idx];
  updated[idx] = newVal;
  return updated;
}

export default function Rankings({ pnms, houses, pnmPrefs, setPnmPrefs, housePrefs, setHousePrefs }) {
  const [side, setSide] = useState('pnm');

  // Initialize missing rankings with defaults
  useEffect(() => {
    setPnmPrefs(prev => {
      const updated = { ...prev };
      pnms.forEach(p => {
        if (!updated[p] || updated[p].some(h => !houses.find(x => x.name === h))) {
          updated[p] = houses.map(h => h.name);
        }
      });
      return updated;
    });
  }, [pnms, houses]); // eslint-disable-line

  useEffect(() => {
    setHousePrefs(prev => {
      const updated = { ...prev };
      houses.forEach(h => {
        if (!updated[h.name] || updated[h.name].some(p => !pnms.includes(p))) {
          updated[h.name] = [...pnms];
        }
      });
      return updated;
    });
  }, [pnms, houses]); // eslint-disable-line

  const noData = pnms.length === 0 || houses.length === 0;

  return (
    <div style={s.wrap}>
      <div style={s.title}>Rankings</div>
      <div style={s.sub}>Set preferences for each party. Drag or select from most to least preferred.</div>

      <div style={s.toggleRow}>
        <button style={s.toggleBtn(side === 'pnm')} onClick={() => setSide('pnm')}>🌸 PNM → House Preferences</button>
        <button style={s.toggleBtn(side === 'house')} onClick={() => setSide('house')}>🏛 House → PNM Preferences</button>
      </div>

      {noData ? (
        <div style={s.empty}>Add houses and PNMs first to set rankings.</div>
      ) : side === 'pnm' ? (
        <>
          <div style={s.sectionLabel}>PNM preferences — most preferred house first</div>
          {pnms.map(pnm => {
            const ranks = pnmPrefs[pnm] || houses.map(h => h.name);
            return (
              <div key={pnm} style={s.card}>
                <div style={s.cardName}>{pnm}</div>
                <ul style={s.rankList}>
                  {houses.map((_, i) => (
                    <li key={i} style={s.rankItem}>
                      <div style={s.rankNum}>{i + 1}</div>
                      <select
                        style={s.select}
                        value={ranks[i] || ''}
                        onChange={e => setPnmPrefs(prev => ({
                          ...prev,
                          [pnm]: swapRanking(prev[pnm] || houses.map(h => h.name), i, e.target.value)
                        }))}
                      >
                        {houses.map(h => (
                          <option key={h.name} value={h.name}>{h.name}</option>
                        ))}
                      </select>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </>
      ) : (
        <>
          <div style={s.sectionLabel}>House preferences — most preferred PNM first</div>
          {houses.map(house => {
            const ranks = housePrefs[house.name] || pnms;
            return (
              <div key={house.name} style={s.card}>
                <div style={s.cardName}>{house.name}</div>
                <ul style={s.rankList}>
                  {pnms.map((_, i) => (
                    <li key={i} style={s.rankItem}>
                      <div style={s.rankNum}>{i + 1}</div>
                      <select
                        style={s.select}
                        value={ranks[i] || ''}
                        onChange={e => setHousePrefs(prev => ({
                          ...prev,
                          [house.name]: swapRanking(prev[house.name] || [...pnms], i, e.target.value)
                        }))}
                      >
                        {pnms.map(p => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
