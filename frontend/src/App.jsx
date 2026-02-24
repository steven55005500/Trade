import { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard'; // Naya file import kiya

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
      setError("Network Error: Could not connect to backend");
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div style={{ padding: '30px', color: '#ff4d4d', backgroundColor: '#121212', minHeight: '100vh', fontFamily: 'Arial' }}>
        <h2>⚠️ Error Occurred</h2>
        <p style={{ fontSize: '18px' }}>{error}</p>
        <p style={{ color: 'gray', marginTop: '20px' }}>Status Log: {debugStatus}</p>
      </div>
    );
  }

  if (loading || !dbUser) {
    return (
      <div style={{ padding: '50px', color: 'white', textAlign: 'center', backgroundColor: '#121212', minHeight: '100vh', fontFamily: 'Arial' }}>
        <h2>⏳ Loading Dashboard...</h2>
        <p style={{ color: '#00ff88', marginTop: '20px' }}>{debugStatus}</p>
      </div>
    );
  }

  // Yahan humne pura code hata kar sirf Dashboard component call kiya hai
  return <Dashboard user={dbUser} />;
}

export default App;