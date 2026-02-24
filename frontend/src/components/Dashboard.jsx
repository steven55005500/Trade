import React, { useState } from 'react';

export default function Dashboard({ user }) {
  const [activeTab, setActiveTab] = useState("trading");
  const [exchangeAmount, setExchangeAmount] = useState("");

  // Using your MongoDB user data
  const totalBalance = user?.balance?.toFixed(2) || "0.00";
  const userName = user?.firstName || "User";
  const tgId = user?.telegramId || "000000";

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', paddingBottom: '80px', fontFamily: 'Arial, sans-serif' }}>
      
      {/* --- TOP BAR (Mocked for your UI) --- */}
      <div style={{ backgroundColor: '#fff', padding: '15px 20px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '18px', color: '#1e293b' }}>Hello, {userName}</h2>
          <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>ID: {tgId}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Total Earned</p>
          <h3 style={{ margin: 0, fontSize: '16px', color: '#10b981' }}>${totalBalance}</h3>
        </div>
      </div>

      <div style={{ padding: '15px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* --- MAIN DASHBOARD CARD --- */}
        <div style={{ background: 'linear-gradient(135deg, #6d28d9 0%, #4c1d95 100%)', borderRadius: '16px', padding: '20px', color: 'white', boxShadow: '0 4px 15px rgba(109, 40, 217, 0.3)' }}>
          <p style={{ margin: 0, fontSize: '14px', opacity: 0.8 }}>Wallet Balance</p>
          <h1 style={{ margin: '10px 0', fontSize: '36px', fontWeight: 'bold' }}>${totalBalance}</h1>
          
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button style={{ flex: 1, padding: '12px', backgroundColor: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '8px', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
              Deposit
            </button>
            <button style={{ flex: 1, padding: '12px', backgroundColor: '#fff', border: 'none', borderRadius: '8px', color: '#6d28d9', fontWeight: 'bold', cursor: 'pointer' }}>
              Withdraw
            </button>
          </div>
        </div>

        {/* --- TAB SWITCHER --- */}
        <div style={{ backgroundColor: '#ede9fe', padding: '5px', borderRadius: '12px', display: 'flex' }}>
          <button 
            onClick={() => setActiveTab("trading")}
            style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s',
                     backgroundColor: activeTab === "trading" ? '#fff' : 'transparent', 
                     color: activeTab === "trading" ? '#5b21b6' : '#64748b',
                     boxShadow: activeTab === "trading" ? '0 2px 4px rgba(0,0,0,0.1)' : 'none' }}
          >
            Ai Trading Status
          </button>
          <button 
            onClick={() => setActiveTab("power")}
            style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s',
                     backgroundColor: activeTab === "power" ? '#fff' : 'transparent', 
                     color: activeTab === "power" ? '#5b21b6' : '#64748b',
                     boxShadow: activeTab === "power" ? '0 2px 4px rgba(0,0,0,0.1)' : 'none' }}
          >
            My Trade Power
          </button>
        </div>

        {/* --- CONTENT AREA --- */}
        {activeTab === "trading" ? <TradingStatusPanel /> : <MyTradePowerPanel balance={totalBalance} />}
      </div>
    </div>
  );
}

// ==========================================
// TRADING STATUS PANEL (Using your provided pairs)
// ==========================================
function TradingStatusPanel() {
  const positions = [
    { pair: "BTC/USDT", side: "Short", lev: "20X", entry: 97500, time: "11-04 02:07", pnl: "+14.50%" },
    { pair: "ETH/USDT", side: "Short", lev: "15X", entry: 3380, time: "11-04 02:07", pnl: "+8.20%" },
    { pair: "BNB/USDT", side: "Short", lev: "10X", entry: 585, time: "11-04 02:07", pnl: "-2.10%" },
    { pair: "SOL/USDT", side: "Long", lev: "12X", entry: 168.3, time: "11-04 02:07", pnl: "+22.40%" },
    { pair: "XRP/USDT", side: "Short", lev: "10X", entry: 0.557, time: "11-04 02:07", pnl: "+1.15%" }
  ]; // Maine yahan list choti ki hai testing ke liye, aap apni puri list yahan paste kar sakte hain.

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      {positions.map((t, i) => (
        <div key={i} style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '16px' }}>{t.pair}</span>
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>{t.time}</span>
          </div>
          
          <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
            <span style={{ padding: '2px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold', 
                          backgroundColor: t.side === 'Long' ? '#dcfce7' : '#fee2e2', 
                          color: t.side === 'Long' ? '#166534' : '#991b1b' }}>{t.side}</span>
            <span style={{ padding: '2px 8px', borderRadius: '12px', fontSize: '12px', backgroundColor: '#f1f5f9', color: '#475569' }}>{t.lev}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', fontSize: '14px' }}>
            <div>
              <div style={{ color: '#94a3b8', fontSize: '12px' }}>Entry Price</div>
              <div style={{ fontWeight: 'bold', color: '#334155' }}>{t.entry}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: '#94a3b8', fontSize: '12px' }}>Est. PNL</div>
              <div style={{ fontWeight: 'bold', color: t.pnl.startsWith('+') ? '#10b981' : '#ef4444' }}>{t.pnl}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ==========================================
// TRADE POWER PANEL (Mock History)
// ==========================================
function MyTradePowerPanel({ balance }) {
  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px', textAlign: 'center' }}>
      <h3 style={{ color: '#475569', margin: '0 0 10px 0' }}>Trade Power Active</h3>
      <p style={{ color: '#94a3b8', fontSize: '14px' }}>Your current active trade power generates daily ROI based on your wallet balance.</p>
      
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
        <h2 style={{ margin: 0, color: '#6d28d9' }}>${balance}</h2>
        <span style={{ fontSize: '12px', color: '#64748b' }}>Generating Profits</span>
      </div>
    </div>
  );
}