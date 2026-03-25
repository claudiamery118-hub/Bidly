import React, { useState } from 'react';

const styles = {
  wrap: { padding: '32px 40px', maxWidth: 700 },
  title: { fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color: 'var(--wine)', marginBottom: 4 },
  sub: { color: 'var(--muted)', fontSize: '0.88rem', marginBottom: 28 },
  row: { display: 'flex', gap: 10, marginBottom: 24 },
  input: {
    flex: 1, padding: '10px 16px', border: '1.5px solid var(--border)',
    borderRadius: 8, fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem',
    color: 'var(--dark)', background: 'white', outline: 'none',
  },
  btn: {
    padding: '10px 22px', borderRadius: 8, border: 'none',
    fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: '0.88rem',
    cursor: 'pointer', background: 'var(--wine)', color: 'var(--cream)',
    transition: 'background 0.2s',
  },
  card: {
    background: 'white', border: '1px solid var(--border)', borderRadius: 12,
    padding: '18px 22px', marginBottom: 12,
    animation: 'fadeUp 0.3s ease both',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
  },
  cardName: { fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', color: 'var(--dark)' },
  quotaRow: { display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 },
  quotaLabel: { fontSize: '0.8rem', color: 'var(--muted)' },
  numInput: {
    width: 56, padding: '5px 8px', border: '1.5px solid var(--border)',
    borderRadius: 6, fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem',
    color: 'var(--dark)', outline: 'none', textAlign: 'center',
  },
  removeBtn: {
    background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer',
    fontSize: '1.1rem', padding: '4px 8px', borderRadius: 6,
    transition: 'all 0.15s', flexShrink: 0,
  },
  empty: { textAlign: 'center', padding: '48px 24px', color: 'var(--muted)' },
  emptyIcon: { fontSize: '2.5rem', marginBottom: 10 },
};

export default function Houses({ houses, setHouses }) {
  const [input, setInput] = useState('');

  const add = () => {
    const name = input.trim();
    if (!name || houses.find(h => h.name === name)) return;
    setHouses(prev => [...prev, { name, quota: 2 }]);
    setInput('');
  };

  const remove = name => setHouses(prev => prev.filter(h => h.name !== name));

  const updateQuota = (name, val) =>
    setHouses(prev => prev.map(h => h.name === name ? { ...h, quota: Math.max(1, parseInt(val) || 1) } : h));

  return (
    <div style={styles.wrap}>
      <div style={styles.title}>Sorority Houses</div>
      <div style={styles.sub}>Add each house participating in recruitment and set their bid quota.</div>
      <div style={styles.row}>
        <input
          style={styles.input}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && add()}
          placeholder="e.g. Alpha Delta Pi"
        />
        <button style={styles.btn} onClick={add}>Add House</button>
      </div>

      {houses.length === 0 ? (
        <div style={styles.empty}>
          <div style={styles.emptyIcon}>🏛</div>
          <div>No houses added yet</div>
        </div>
      ) : houses.map(h => (
        <div key={h.name} style={styles.card}>
          <div>
            <div style={styles.cardName}>{h.name}</div>
            <div style={styles.quotaRow}>
              <span style={styles.quotaLabel}>Bid quota (spots):</span>
              <input
                type="number"
                style={styles.numInput}
                min={1} max={99}
                value={h.quota}
                onChange={e => updateQuota(h.name, e.target.value)}
              />
            </div>
          </div>
          <button style={styles.removeBtn} onClick={() => remove(h.name)}>✕</button>
        </div>
      ))}
    </div>
  );
}
