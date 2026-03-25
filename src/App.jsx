import React, { useState } from 'react';
import Login from './pages/Login';
import Shell from './components/Shell';
import PNMDashboard from './pages/PNMDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard';
import PanhellenicDashboard from './pages/PanhellenicDashboard';

// Seed data so the app feels alive on first load
const INITIAL_HOUSES = [
  { name: 'Alpha Delta Pi', quota: 2 },
  { name: 'Kappa Delta',    quota: 2 },
  { name: 'Chi Omega',      quota: 2 },
];
const INITIAL_PNMS = ['Emma Chen', 'Sofia Martinez', 'Priya Patel', 'Jade Williams', 'Lily Thompson'];

export default function App() {
  const [user, setUser] = useState(null);

  // Shared state — all roles read/write the same data
  const [houses, setHouses]       = useState(INITIAL_HOUSES);
  const [pnms, setPNMs]           = useState(INITIAL_PNMS);
  const [pnmPrefs, setPnmPrefs]   = useState({});
  const [housePrefs, setHousePrefs] = useState({});
  const [result, setResult]       = useState(null);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <Shell user={user} onLogout={() => setUser(null)}>
      {user.role === 'pnm' && (
        <PNMDashboard
          user={user}
          houses={houses}
          pnmPrefs={pnmPrefs}
          setPnmPrefs={setPnmPrefs}
        />
      )}
      {user.role === 'recruiter' && (
        <RecruiterDashboard
          user={user}
          pnms={pnms}
          housePrefs={housePrefs}
          setHousePrefs={setHousePrefs}
          pnmPrefs={pnmPrefs}
        />
      )}
      {user.role === 'panhellenic' && (
        <PanhellenicDashboard
          houses={houses}       setHouses={setHouses}
          pnms={pnms}           setPNMs={setPNMs}
          pnmPrefs={pnmPrefs}   setPnmPrefs={setPnmPrefs}
          housePrefs={housePrefs} setHousePrefs={setHousePrefs}
          result={result}       setResult={setResult}
        />
      )}
    </Shell>
  );
}
