import React from 'react';

const s = {
  wrap: { padding: '36px 40px', maxWidth: 600 },
  greeting: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '1.8rem', color: 'var(--wine)', marginBottom: 4,
  },
  sub: { color: 'var(--muted)', fontSize: '0.88rem', marginBottom: 32 },
  card: {
    background: 'white', border: '1px solid var(--border)',
    borderRadius: 14, padding: '24px 28px', marginBottom: 24,
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
  rankNumGold: {
    width: 28, height: 28, borderRadius: '50%',
    background: 'linear-gradient(135deg, var(--gold), #b8954e)',
    color: 'white', fontSize: '0.78rem', fontWeight: 700,
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  select: {
    flex: 1, padding: '9px 14px', border: '1.5px solid var(--border)',
    borderRadius: 8, fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.9rem', color: 'var(--dark)',
    background: 'white', outline: 'none', cursor: 'pointer',
  },
  saveBtn: {
    padding: '12px 32px', borderRadius: 9, border: 'none',
    background: 'var(--wine)', color: 'var(--cream)',
    fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
    fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.2s',
    marginTop: 8,
  },
  savedBanner: {
    background: 'var(--lightgreen)', border: '1px solid #b2d9bc',
    borderRadius: 10, padding: '12px 18px',
    color: 'var(--green)', fontSize: '0.88rem',
    marginTop: 16, display: 'flex', alignItems: 'center', gap: 8,
  },
  noHouses: {
    textAlign: 'center', padding: '48px 24px',
    color: 'var(--muted)', fontStyle: 'italic',
  },
  tip: {
    background: '#fdf0f2', borderLeft: '3px solid var(--rose)',
    padding: '12px 16px', borderRadius: '0 8px 8px 0',
    fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.6,
  },
};

function swapRanking(list, idx, newVal) {
  const updated = [...list];
  const swapIdx = updated.indexOf(newVal);
  if (swapIdx !== -1) updated[swapIdx] = updated[idx];
  updated[idx] = newVal;
  return updated;
}

export default function PNMDashboard({ user, houses, pnmPrefs, setPnmPrefs }) {
  const myPrefs = pnmPrefs[user.name] || houses.map(h => h.name);
  const [saved, setSaved] = React.useState(false);

  const update = (idx, val) => {
    setPnmPrefs(prev => ({
      ...prev,
      [user.name]: swapRanking(prev[user.name] || houses.map(h => h.name), idx, val),
    }));
    setSaved(false);
  };

  const save = () => setSaved(true);

  return (
    <div style={s.wrap}>
      <div style={s.greeting}>Hey, {user.name.split(' ')[0]} 🌸</div>
      <div style={s.sub}>Rank the houses you're most excited about — #1 is your top choice.</div>

      <div style={s.card}>
        <div style={s.cardTitle}>Your House Rankings</div>
        <div style={s.cardSub}>
          Drag to reorder or use the dropdowns. Your rankings are confidential.
        </div>

        {houses.length === 0 ? (
          <div style={s.noHouses}>No houses have been added yet. Check back soon!</div>
        ) : (
          <>
            <ul style={s.rankList}>
              {houses.map((_, i) => (
                <li key={i} style={s.rankItem}>
                  <div style={i === 0 ? s.rankNumGold : s.rankNum}>{i + 1}</div>
                  <select
                    style={s.select}
                    value={myPrefs[i] || ''}
                    onChange={e => update(i, e.target.value)}
                  >
                    {houses.map(h => (
                      <option key={h.name} value={h.name}>{h.name}</option>
                    ))}
                  </select>
                </li>
              ))}
            </ul>
            <button style={s.saveBtn} onClick={save}>Save Rankings</button>
            {saved && (
              <div style={s.savedBanner}>
                ✓ Rankings saved! You can update them any time before recruitment closes.
              </div>
            )}
          </>
        )}
      </div>

      <div style={s.tip}>
        <strong style={{ color: 'var(--wine)' }}>How matching works: </strong>
        Your rankings are combined with each house's preferences using the Gale-Shapley algorithm.
        You'll be matched with the highest-ranked house that also wants you — results are released on Bid Day.
      </div>
    </div>
  );
}
