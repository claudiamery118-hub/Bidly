import React, { useState } from 'react';

const s = {
  wrap: { padding: '36px 40px', maxWidth: 780 },
  greeting: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '1.8rem', color: 'var(--wine)', marginBottom: 4,
  },
  sub: { color: 'var(--muted)', fontSize: '0.88rem', marginBottom: 32 },
  tabs: { display: 'flex', gap: 10, marginBottom: 28 },
  tabBtn: (active) => ({
    padding: '9px 22px', borderRadius: 8,
    border: `1.5px solid ${active ? 'var(--wine)' : 'var(--border)'}`,
    background: active ? 'var(--wine)' : 'white',
    color: active ? 'var(--cream)' : 'var(--muted)',
    fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
    fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.18s',
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
  rankList: { listStyle: 'none' },
  rankItem: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 },
  rankNum: {
    width: 28, height: 28, borderRadius: '50%',
    background: 'var(--blush)', color: 'var(--wine)',
    fontSize: '0.78rem', fontWeight: 600,
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  select: {
    flex: 1, padding: '9px 14px', border: '1.5px solid var(--border)',
    borderRadius: 8, fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.9rem', color: 'var(--dark)', background: 'white',
    outline: 'none', cursor: 'pointer',
  },
  saveBtn: {
    padding: '11px 28px', borderRadius: 9, border: 'none',
    background: 'var(--wine)', color: 'var(--cream)',
    fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
    fontSize: '0.88rem', cursor: 'pointer', marginTop: 8,
  },
  savedBanner: {
    background: 'var(--lightgreen)', border: '1px solid #b2d9bc',
    borderRadius: 10, padding: '11px 16px',
    color: 'var(--green)', fontSize: '0.85rem', marginTop: 14,
    display: 'flex', alignItems: 'center', gap: 8,
  },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: 4 },
  th: {
    textAlign: 'left', padding: '10px 14px',
    fontSize: '0.75rem', fontWeight: 600,
    textTransform: 'uppercase', letterSpacing: '0.07em',
    color: 'var(--muted)', borderBottom: '2px solid var(--border)',
  },
  td: {
    padding: '12px 14px', borderBottom: '1px solid var(--border)',
    fontSize: '0.88rem', color: 'var(--dark)',
  },
  rank1: {
    display: 'inline-block', padding: '2px 10px', borderRadius: 20,
    background: 'linear-gradient(135deg, var(--gold), #b8954e)',
    color: 'white', fontSize: '0.75rem', fontWeight: 700,
  },
  rankBadge: (n) => ({
    display: 'inline-block', padding: '2px 10px', borderRadius: 20,
    background: n <= 2 ? 'var(--blush)' : '#f5f5f5',
    color: n <= 2 ? 'var(--wine)' : 'var(--muted)',
    fontSize: '0.75rem', fontWeight: 500,
    border: `1px solid ${n <= 2 ? 'var(--border)' : '#e0e0e0'}`,
  }),
  noData: { textAlign: 'center', padding: '32px', color: 'var(--muted)', fontStyle: 'italic' },
};

function swapRanking(list, idx, newVal) {
  const updated = [...list];
  const swapIdx = updated.indexOf(newVal);
  if (swapIdx !== -1) updated[swapIdx] = updated[idx];
  updated[idx] = newVal;
  return updated;
}

export default function RecruiterDashboard({ user, pnms, housePrefs, setHousePrefs, pnmPrefs }) {
  const [view, setView] = useState('rank');
  const [saved, setSaved] = useState(false);

  const myPrefs = housePrefs[user.name] || pnms;

  const update = (idx, val) => {
    setHousePrefs(prev => ({
      ...prev,
      [user.name]: swapRanking(prev[user.name] || [...pnms], idx, val),
    }));
    setSaved(false);
  };

  // Where does this house appear on each PNM's ranking?
  const pnmInsights = pnms.map(pnm => {
    const prefs = pnmPrefs[pnm] || [];
    const rank = prefs.indexOf(user.name) + 1;
    return { pnm, rank: rank > 0 ? rank : null };
  }).sort((a, b) => (a.rank ?? 999) - (b.rank ?? 999));

  return (
    <div style={s.wrap}>
      <div style={s.greeting}>{user.name}</div>
      <div style={s.sub}>Manage your chapter's PNM rankings and see recruitment insights.</div>

      <div style={s.tabs}>
        <button style={s.tabBtn(view === 'rank')} onClick={() => setView('rank')}>📋 Rank PNMs</button>
        <button style={s.tabBtn(view === 'insights')} onClick={() => setView('insights')}>📊 PNM Interest</button>
      </div>

      {view === 'rank' && (
        <div style={s.card}>
          <div style={s.cardTitle}>Your PNM Rankings</div>
          <div style={s.cardSub}>
            Rank PNMs from most to least preferred for your chapter. Rankings are confidential to PNMs.
          </div>
          {pnms.length === 0 ? (
            <div style={s.noData}>No PNMs in the system yet. Panhellenic will add them.</div>
          ) : (
            <>
              <ul style={s.rankList}>
                {pnms.map((_, i) => (
                  <li key={i} style={s.rankItem}>
                    <div style={s.rankNum}>{i + 1}</div>
                    <select
                      style={s.select}
                      value={myPrefs[i] || ''}
                      onChange={e => update(i, e.target.value)}
                    >
                      {pnms.map(p => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </li>
                ))}
              </ul>
              <button style={s.saveBtn} onClick={() => setSaved(true)}>Save Rankings</button>
              {saved && (
                <div style={s.savedBanner}>✓ Rankings saved successfully.</div>
              )}
            </>
          )}
        </div>
      )}

      {view === 'insights' && (
        <div style={s.card}>
          <div style={s.cardTitle}>Where You Stand</div>
          <div style={s.cardSub}>
            See where {user.name} ranks on each PNM's preference list.
          </div>
          {pnmInsights.length === 0 ? (
            <div style={s.noData}>No PNM rankings submitted yet.</div>
          ) : (
            <table style={s.table}>
              <thead>
                <tr>
                  <th style={s.th}>PNM</th>
                  <th style={s.th}>Ranks you</th>
                </tr>
              </thead>
              <tbody>
                {pnmInsights.map(({ pnm, rank }) => (
                  <tr key={pnm}>
                    <td style={s.td}>{pnm}</td>
                    <td style={s.td}>
                      {rank === 1
                        ? <span style={s.rank1}>🏆 #1 Choice</span>
                        : rank
                        ? <span style={s.rankBadge(rank)}>#{rank} of {pnms.length}</span>
                        : <span style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>Not ranked yet</span>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
