import React from 'react';

const s = {
  shell: { minHeight: '100vh', display: 'flex', flexDirection: 'column' },
  topbar: {
    background: 'var(--deepwine)',
    padding: '0 32px',
    display: 'flex', alignItems: 'center',
    justifyContent: 'space-between', height: 60,
  },
  logo: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '1.5rem', color: 'var(--cream)',
    letterSpacing: '-0.3px',
  },
  right: { display: 'flex', alignItems: 'center', gap: 16 },
  userName: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.82rem', color: 'rgba(253,246,240,0.7)',
  },
  roleBadge: (role) => ({
    padding: '3px 10px', borderRadius: 20,
    fontSize: '0.72rem', fontWeight: 600,
    letterSpacing: '0.05em', textTransform: 'uppercase',
    background: role === 'panhellenic' ? 'rgba(200,169,110,0.25)' :
                role === 'recruiter'   ? 'rgba(201,98,110,0.25)' :
                                         'rgba(255,255,255,0.12)',
    color: role === 'panhellenic' ? 'var(--gold)' :
           role === 'recruiter'   ? '#f5a0aa' : '#f5d5d8',
    border: '1px solid rgba(255,255,255,0.1)',
  }),
  logoutBtn: {
    background: 'none', border: '1px solid rgba(255,255,255,0.2)',
    color: 'rgba(253,246,240,0.7)', borderRadius: 7,
    padding: '5px 12px', fontSize: '0.78rem',
    cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
    transition: 'all 0.15s',
  },
  nav: {
    display: 'flex',
    background: 'var(--blush)',
    borderBottom: '2px solid var(--border)',
    padding: '0 32px',
  },
  navBtn: (active) => ({
    padding: '12px 20px',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.82rem', fontWeight: 500,
    letterSpacing: '0.04em', textTransform: 'uppercase',
    cursor: 'pointer',
    color: active ? 'var(--wine)' : 'var(--muted)',
    background: 'transparent', border: 'none',
    borderBottom: `3px solid ${active ? 'var(--wine)' : 'transparent'}`,
    marginBottom: -2, transition: 'all 0.15s',
  }),
  main: { flex: 1 },
};

const ROLE_LABEL = { pnm: 'PNM', recruiter: 'Recruiter', panhellenic: 'Panhellenic' };

export default function Shell({ user, onLogout, tabs, activeTab, setActiveTab, children }) {
  return (
    <div style={s.shell}>
      <div style={s.topbar}>
        <div style={s.logo}>BidLy</div>
        <div style={s.right}>
          <span style={s.userName}>{user.name}</span>
          <span style={s.roleBadge(user.role)}>{ROLE_LABEL[user.role]}</span>
          <button style={s.logoutBtn} onClick={onLogout}>Sign out</button>
        </div>
      </div>

      {tabs && tabs.length > 1 && (
        <nav style={s.nav}>
          {tabs.map(t => (
            <button key={t.id} style={s.navBtn(activeTab === t.id)} onClick={() => setActiveTab(t.id)}>
              {t.label}
            </button>
          ))}
        </nav>
      )}

      <main style={s.main}>{children}</main>
    </div>
  );
}
