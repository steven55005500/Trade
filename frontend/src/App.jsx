import { useEffect, useState } from 'react';

function App() {
  const [dbUser, setDbUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [debugStatus, setDebugStatus] = useState('Starting app...');

  useEffect(() => {
    try {
      if (window.Telegram && window.Telegram.WebApp) {
        setDebugStatus('Telegram WebApp found. Reading data...');
        const tg = window.Telegram.WebApp;
        
        // This tells Telegram that the app is fully loaded
        tg.ready(); 
        tg.expand();

        const tgUser = tg.initDataUnsafe?.user;

        if (tgUser) {
          setDebugStatus(`User ${tgUser.first_name} found! Connecting to database...`);
          autoLogin(tgUser);
        } else {
          setError("Telegram data is empty! Are you testing on PC? Try opening this on your Mobile phone.");
          setLoading(false);
        }
      } else {
        setError("Not running inside Telegram.");
        setLoading(false);
      }
    } catch (err) {
      setError("App Crash: " + err.message);
      setLoading(false);
    }
  }, []);

  const autoLogin = async (tgUser) => {
    try {
      // Safe fallback if Telegram ID is missing
      const userId = tgUser.id ? tgUser.id.toString() : "000000";

      const res = await fetch('https://eliteinfinity.live/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          telegramId: userId,
          username: tgUser.username || "Unknown",
          firstName: tgUser.first_name || "User"
        })
      });

      const data = await res.json();
      if (data.success) {
        setDbUser(data.user);
        setLoading(false);
      } else {
        setError("Backend Error: " + (data.error || "Unknown"));
        setLoading(false);
      }
    } catch (err) {
      setError("Network Error: Could not connect to https://eliteinfinity.live/api/login");
      setLoading(false);
    }
  };

  // 1. ERROR SCREEN (Shows exact problem)
  if (error) {
    return (
      <div style={{ padding: '30px', color: '#ff4d4d', backgroundColor: '#121212', minHeight: '100vh', fontFamily: 'Arial' }}>
        <h2>⚠️ Error Occurred</h2>
        <p style={{ fontSize: '18px' }}>{error}</p>
        <p style={{ color: 'gray', marginTop: '20px' }}>Status Log: {debugStatus}</p>
      </div>
    );
  }

  // 2. LOADING SCREEN (Shows what it is doing right now)
  if (loading || !dbUser) {
    return (
      <div style={{ padding: '50px', color: 'white', textAlign: 'center', backgroundColor: '#121212', minHeight: '100vh', fontFamily: 'Arial' }}>
        <h2>⏳ Loading Dashboard...</h2>
        <p style={{ color: '#00ff88', marginTop: '20px' }}>{debugStatus}</p>
      </div>
    );
  }

  // 3. MAIN DASHBOARD
  return (
    <div style={{ padding: '20px', color: 'white', textAlign: 'center', backgroundColor: '#121212', minHeight: '100vh', fontFamily: 'Arial' }}>
      <header style={{ borderBottom: '1px solid #333', paddingBottom: '10px' }}>
        <h2>Welcome, {dbUser.firstName}!</h2>
      </header>
      
      <div style={{ margin: '30px 0', padding: '30px', backgroundColor: '#1e1e1e', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>
        <p style={{ color: '#aaa', fontSize: '16px', margin: '0' }}>Total Balance</p>
        <h1 style={{ fontSize: '42px', color: '#00ff88', margin: '10px 0' }}>
          ${dbUser.balance?.toFixed(2) || "0.00"}
        </h1>
        <p style={{ color: '#666', fontSize: '12px' }}>Telegram ID: {dbUser.telegramId}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        <button style={{ padding: '15px', backgroundColor: '#2a2a2a', color: '#fff', border: '1px solid #444', borderRadius: '10px', fontSize: '16px', cursor: 'pointer' }}>
          Deposit
        </button>
        <button style={{ padding: '15px', backgroundColor: '#2a2a2a', color: '#fff', border: '1px solid #444', borderRadius: '10px', fontSize: '16px', cursor: 'pointer' }}>
          Withdraw
        </button>
      </div>
    </div>
  );
}

export default App;