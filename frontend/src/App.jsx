import { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (window.Telegram.WebApp) {
      window.Telegram.WebApp.expand();
      setUser(window.Telegram.WebApp.initDataUnsafe.user);
    }
  }, []);

  const handleLogin = async () => {
    if (!user) return alert("Telegram data missing!");

    const res = await fetch('https://eliteinfinity.live/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        telegramId: user.id.toString(),
        username: user.username,
        firstName: user.first_name
      })
    });

    const data = await res.json();
    if (data.success) {
      setIsLoggedIn(true);
    }
  };

  if (isLoggedIn) {
    return (
      <div style={{ padding: '20px', color: 'white', textAlign: 'center' }}>
        <h1>Welcome to Dashboard</h1>
        <p>Hello, {user?.first_name}! You are now logged in via Telegram ID: {user?.id}</p>
        <div style={{ marginTop: '20px', border: '1px solid #444', padding: '20px' }}>
           {/* Yahan aapka dashboard content aayega */}
           <h3>Your Stats</h3>
           <p>Balance: $0.00</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', padding: '50px', color: 'white' }}>
      <h2>Project Login</h2>
      <button 
        onClick={handleLogin}
        style={{ padding: '15px 30px', backgroundColor: '#0088cc', color: 'white', borderRadius: '10px', border: 'none', fontSize: '18px' }}
      >
        Start Auto-Login
      </button>
    </div>
  );
}

export default App;