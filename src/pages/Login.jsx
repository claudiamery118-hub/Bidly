import React, { useState } from 'react';

const ROLES = [
  {
    id: 'pnm',
    emoji: '🌸',
    title: 'Potential New Member',
    desc: 'Rank your preferred houses during recruitment.',
    color: 'var(--rose)',
    bg: '#fff5f6',
  },
  {
    id: 'recruiter',
    emoji: '🏛',
    title: 'House Recruiter',
    desc: 'Enter your chapter\'s PNM rankings and view match results.',
    color: 'var(--wine)',
    bg: '#fdf0f2',
  },
  {
    id: 'panhellenic',
    emoji: '⚖️',
    title: 'Panhellenic Council',
    desc: 'Oversee all rankings, run the algorithm, and manage recruitment.',
    color: '#5a3e00',
    bg: '#fef8ee',
  },
];

// Hardcoded demo users for each role
const DEMO_USERS = {
  pnm: [
    { id: 'pnm-emma',  name: 'Emma Chen' },
    { id: 'pnm-sofia', name: 'Sofia Martinez' },
    { id: 'pnm-priya', name: 'Priya Patel' },
    { id: 'pnm-jade',  name: 'Jade Williams' },
    { id: 'pnm-lily',  name: 'Lily Thompson' },
  ],
  recruiter: [
    { id: 'rec-adpi', name: 'Alpha Delta Pi' },
    { id: 'rec-kd',   name: 'Kappa Delta' },
    { id: 'rec-cx',   name: 'Chi Omega' },
  ],
  panhellenic: [
    { id: 'pan-admin', name: 'Panhellenic Admin' },
  ],
};

const s = {
  page: {
    minHeight: '100vh',
    background: 'var(--deepwine)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
    position: 'relative',
    overflow: 'hidden',
  },
  orb1: {
    position: 'absolute', top: -80, right: -80,
    width: 320, height: 320, borderRadius: '50%',
    background: 'rgba(200,169,110,0.1)', pointerEvents: 'none',
  },
  orb2: {
    position: 'absolute', bottom: -100, left: -60,
    width: 260, height: 260, borderRadius: '50%',
    background: 'rgba(201,98,110,0.12)', pointerEvents: 'none',
  },
  logo: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '3.2rem', color: 'var(--cream)',
    letterSpacing: '-1px', marginBottom: 4,
    animation: 'fadeUp 0.5s ease both',
  },
  logoSub: {
    fontFamily: "'Cormorant Garamond', serif",
    fontStyle: 'italic', color: 'var(--gold)',
    fontSize: '1rem', marginBottom: 48,
    animation: 'fadeUp 0.5s ease 0.1s both',
    opacity: 0,
    animationFillMode: 'forwards',
  },
  card: {
    background: 'white', borderRadius: 20,
    padding: '36px 40px', width: '100%', maxWidth: 480,
    boxShadow: '0 24px 80px rgba(0,0,0,0.25)',
    animation: 'popIn 0.5s ease 0.2s both',
    opacity: 0, animationFillMode: 'forwards',
  },
  cardTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '1.4rem', color: 'var(--dark)',
    marginBottom: 4,
  },
  cardSub: { color: 'var(--muted)', fontSize: '0.85rem', marginBottom: 24 },
  roleBtn: (selected, color, bg) => ({
    width: '100%', padding: '14px 18px', marginBottom: 10,
    border: `2px solid ${selected ? color : 'var(--border)'}`,
    borderRadius: 12, background: selected ? bg : 'white',
    cursor: 'pointer', textAlign: 'left', transition: 'all 0.18s',
    display: 'flex', alignItems: 'center', gap: 14,
  }),
  roleEmoji: { fontSize: '1.5rem', flexShrink: 0 },
  roleInfo: {},
  roleTitle: (selected, color) => ({
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 600, fontSize: '0.92rem',
    color: selected ? color : 'var(--dark)',
  }),
  roleDesc: { fontSize: '0.78rem', color: 'var(--muted)', marginTop: 2 },
  divider: { height: 1, background: 'var(--border)', margin: '20px 0' },
  label: { fontSize: '0.8rem', fontWeight: 500, color: 'var(--muted)', marginBottom: 8, display: 'block' },
  select: {
    width: '100%', padding: '11px 14px',
    border: '1.5px solid var(--border)', borderRadius: 9,
    fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem',
    color: 'var(--dark)', background: 'white', outline: 'none',
    marginBottom: 20, cursor: 'pointer',
  },
  loginBtn: (ready) => ({
    width: '100%', padding: '13px',
    border: 'none', borderRadius: 10,
    background: ready ? 'var(--wine)' : 'var(--border)',
    color: ready ? 'var(--cream)' : 'var(--muted)',
    fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
    fontSize: '0.95rem', cursor: ready ? 'pointer' : 'not-allowed',
    transition: 'all 0.2s',
  }),
};

export default function Login({ onLogin }) {
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState('');

  const handleLogin = () => {
    if (!role || !userId) return;
    const users = DEMO_USERS[role];
    const user = users.find(u => u.id === userId);
    if (user) onLogin({ role, id: user.id, name: user.name });
  };

  const users = role ? DEMO_USERS[role] : [];

  return (
    <div style={s.page}>
      <div style={s.orb1} /><div style={s.orb2} />
      <div style={s.logo}>BidDay</div>
      <div style={s.logoSub}>Sorority Recruitment Matcher</div>

      <div style={s.card}>
        <div style={s.cardTitle}>Welcome back</div>
        <div style={s.cardSub}>Select your role to continue</div>

        {ROLES.map(r => (
          <button
            key={r.id}
            style={s.roleBtn(role === r.id, r.color, r.bg)}
            onClick={() => { setRole(r.id); setUserId(''); }}
          >
            <span style={s.roleEmoji}>{r.emoji}</span>
            <div style={s.roleInfo}>
              <div style={s.roleTitle(role === r.id, r.color)}>{r.title}</div>
              <div style={s.roleDesc}>{r.desc}</div>
            </div>
          </button>
        ))}

        {role && (
          <>
            <div style={s.divider} />
            <label style={s.label}>Sign in as</label>
            <select
              style={s.select}
              value={userId}
              onChange={e => setUserId(e.target.value)}
            >
              <option value="">— Select account —</option>
              {users.map(u => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
          </>
        )}

        <button
          style={s.loginBtn(role && userId)}
          onClick={handleLogin}
          disabled={!role || !userId}
        >
          Sign In →
        </button>
      </div>
    </div>
  );
}
