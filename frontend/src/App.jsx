import { useEffect, useState } from 'react';

function App() {
  const [dbUser, setDbUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Added a loading state

  useEffect(() => {
    // 1. Get Telegram data as soon as the app opens
    if (window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.expand(); 
      const tgUser = tg.initDataUnsafe?.user;

      if (tgUser) {
        // 2. Automatically send data to backend without clicking any button
        autoLogin(tgUser);
      } else {
        setError("Please open this app inside Telegram.");
        setLoading(false);
      }
    } else {
      setError("Telegram Web App is not ready.");
      setLoading(false);
    }
  }, []);

  const autoLogin = async (tgUser) => {
    try {
      const res = await fetch('https://eliteinfinity.live/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          telegramId: tgUser.id.toString(),
          username: tgUser.username,
          firstName: tgUser.first_name
        })
      });

      const data = await res.json();
      if (data.success) {
        setDbUser(data.user); // Save database user details
      } else {
        setError("Login failed on server.");
      }
    } catch (err) {
      setError("Network error. Could not connect to backend.");
    } finally {
      setLoading(false); // Stop the loading screen
    }
  };

  // 1. LOADING SCREEN
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', color: 'white', backgroundColor: '#121212', minHeight: '100vh' }}>
        <h2>Connecting to Database...</h2>
        <p>Please wait...</p>
      </div>
    );
  }

  // 2. ERROR SCREEN
  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', color: 'red', backgroundColor: '#121212', minHeight: '100vh' }}>
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  // 3. DASHBOARD SCREEN (Automatic)
  return (
    <div style={{ padding: '20px', color: 'white', textAlign: 'center', backgroundColor: '#121212', minHeight: '100vh' }}>
      <header style={{ borderBottom: '1px solid #333', paddingBottom: '10px' }}>
        <h2>Welcome, {dbUser?.firstName}!</h2>
      </header>
      
      <div style={{ margin: '30px 0', padding: '30px', backgroundColor: '#1e1e1e', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>
        <p style={{ color: '#aaa', fontSize: '16px', margin: '0' }}>Total Balance</p>
        <h1 style={{ fontSize: '42px', color: '#00ff88', margin: '10px 0' }}>
          ${dbUser?.balance.toFixed(2)}
        </h1>
        <p style={{ color: '#666', fontSize: '12px' }}>ID: {dbUser?.telegramId}</p>
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