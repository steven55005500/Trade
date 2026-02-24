import React from 'react';

function Dashboard({ user }) {
  // Yeh component sirf UI dikhane ka kaam karega
  return (
    <div style={{ padding: '20px', color: 'white', textAlign: 'center', backgroundColor: '#121212', minHeight: '100vh', fontFamily: 'Arial' }}>
      <header style={{ borderBottom: '1px solid #333', paddingBottom: '10px' }}>
        <h2>Welcome, {user.firstName}!</h2>
      </header>
      
      <div style={{ margin: '30px 0', padding: '30px', backgroundColor: '#1e1e1e', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>
        <p style={{ color: '#aaa', fontSize: '16px', margin: '0' }}>Total Balance</p>
        <h1 style={{ fontSize: '42px', color: '#00ff88', margin: '10px 0' }}>
          ${user.balance?.toFixed(2) || "0.00"}
        </h1>
        <p style={{ color: '#666', fontSize: '12px' }}>Telegram ID: {user.telegramId}</p>
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

export default Dashboard;