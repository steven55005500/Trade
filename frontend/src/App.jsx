import React, { useEffect, useState } from 'react';
import Dashboard from './Dashboard';

/**
 * App:
 * - Detects Telegram WebApp (if present) and calls backend login.
 * - For local/dev, it provides a mock user so UI is visible immediately.
 * - Shows loading / error screens similar to your previous code.
 */

export default function App() {
  const [dbUser, setDbUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [debugStatus, setDebugStatus] = useState('Starting app...');

  useEffect(() => {
    // If you're testing outside Telegram, we'll fallback to mock data quickly.
    async function init() {
      try {
        if (window.Telegram && window.Telegram.WebApp) {
          setDebugStatus('Telegram WebApp detected — reading data...');
          const tg = window.Telegram.WebApp;
          tg.ready?.();
          tg.expand?.();

          const tgUser = tg.initDataUnsafe?.user;
          if (!tgUser) {
            setError('Telegram data empty — open inside Telegram mobile app.');
            setLoading(false);
            return;
          }

          setDebugStatus('Logging in via backend...');
          // Try backend login — if fails, still show error clearly
          try {
            const userId = tgUser.id ? tgUser.id.toString() : '000000';
            const res = await fetch('https://eliteinfinity.live/api/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                telegramId: userId,
                username: tgUser.username || 'Unknown',
                firstName: tgUser.first_name || 'User'
              })
            });
            const data = await res.json();
            if (data?.success && data.user) {
              setDbUser(data.user);
              setLoading(false);
            } else {
              setError('Backend login failed: ' + (data?.error || 'unknown'));
              setLoading(false);
            }
          } catch (err) {
            setError('Network Error: Could not call backend.');
            setLoading(false);
          }
        } else {
          // Not inside Telegram — use a mock user for local dev preview.
          setDebugStatus('Telegram not found — using mock demo user.');
          const demo = {
            firstName: 'Rana',
            telegramId: '000000',
            balance: 12.34,
            totalEarned: 0.5245,
            tradePower: 0.5,
            dailyEarn: 0.028
          };
          // small delay to simulate loading
          setTimeout(() => {
            setDbUser(demo);
            setLoading(false);
            setDebugStatus('Demo user loaded.');
          }, 600);
        }
      } catch (err) {
        setError('App Crash: ' + (err?.message || String(err)));
        setLoading(false);
      }
    }
    init();
  }, []);

  if (error) {
    return (
      <div className="err-screen">
        <h2>⚠️ Error</h2>
        <p>{error}</p>
        <p className="small">Status: {debugStatus}</p>
      </div>
    );
  }

  if (loading || !dbUser) {
    return (
      <div className="loading-screen">
        <h2>⏳ Loading Dashboard...</h2>
        <p className="small">{debugStatus}</p>
      </div>
    );
  }

  return <Dashboard user={dbUser} />;
}