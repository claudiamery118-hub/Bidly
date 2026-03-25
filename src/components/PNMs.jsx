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
  },
  card: {
    background: 'white', border: '1px solid var(--border)', borderRadius: 12,
    padding: '16px 22px', marginBottom: 10,
    animation: 'fadeUp 0.3s ease both',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  },
  cardName: { fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', color: 'var(--dark)' },
  removeBtn: {
    background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer',
    fontSize: '1.1rem', padding: '4px 8px', borderRadius: 6, transition: 'all 0.15s',
  },
  empty: { textAlign: 'center', padding: '48px 24px', color: 'var(--muted)' },
  emptyIcon: { fontSize: '2.5rem', marginBottom: 10 },
  count: {
    display: 'inline-block', background: 'var(--blush)', color: 'var(--wine)',
    borderRadius: 20, padding: '2px 10px', fontSize: '0.78rem', fontWeight: 500, marginLeft: 10,
  },
};

export default function PNMs({ pnms, setPNMs }) {
  const [input, setInput] = useState('');

  const add = () => {
    const name = input.trim();
    if (!name || pnms.includes(name)) return;
    setPNMs(prev => [...prev, name]);
    setInput('');
  };

  const remove = name => setPNMs(prev => prev.filter(p => p !== name));

  return (
    <div style={styles.wrap}>
      <div style={styles.title}>
        Potential New Members
        {pnms.length > 0 && <span style={styles.count}>{pnms.length}</span>}
      </div>
      <div style={styles.sub}>Add all PNMs going through recruitment this cycle.</div>
      <div style={styles.row}>
        <input
          style={styles.input}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && add()}
          placeholder="e.g. Emma Rodriguez"
        />
        <button style={styles.btn} onClick={add}>Add PNM</button>
      </div>

      {pnms.length === 0 ? (
        <div style={styles.empty}>
          <div style={styles.emptyIcon}>🌸</div>
          <div>No PNMs added yet</div>
        </div>
      ) : pnms.map((p, i) => (
        <div key={p} style={{ ...styles.card, animationDelay: `${i * 0.04}s` }}>
          <div style={styles.cardName}>{p}</div>
          <button style={styles.removeBtn} onClick={() => remove(p)}>✕</button>
        </div>
      ))}
    </div>
  );
}
