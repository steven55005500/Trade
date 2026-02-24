import React, { useState, useEffect } from 'react';

export default function Dashboard({ user }) {
  const [activeBottomTab, setActiveBottomTab] = useState("AiEarn");
  const [activeMidTab, setActiveMidTab] = useState("Ai Trading status");

  // Timer logic for "Settlement time" (Mock countdown for UI)
  const [timeLeft, setTimeLeft] = useState({ h: 15, m: 32, s: 11 });
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { h, m, s } = prev;
        if (s > 0) s--;
        else { s = 59; if (m > 0) m--; else { m = 59; h--; } }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Database Values
  const earned = user?.totalEarned?.toFixed(4) || "0.0000";
  const tp = user?.tradePower || "0.0";
  const daily = user?.dailyEarn?.toFixed(3) || "0.000";

  return (
    <div style={{ backgroundColor: '#f4f5fa', minHeight: '100vh', paddingBottom: '80px', fontFamily: 'Arial, sans-serif', color: '#333' }}>
      
      {/* 1. TOP HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: '12px 15px', borderBottom: '1px solid #eee' }}>
        <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#64748b' }}>
          You Earned : <span style={{ color: '#10b981' }}>₮ {earned}</span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{ backgroundColor: '#f59e0b', color: '#fff', border: 'none', padding: '6px 15px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
            Withdraw <span style={{ fontSize: '16px' }}>→</span>
          </button>
        </div>
      </div>

      {/* 2. PROMO BANNER */}
      <div style={{ backgroundColor: '#2f3e2e', color: '#fff', padding: '10px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
          <span style={{ color: '#f472b6' }}>WEEKEND EARN FAST</span> 🎉<br/>
          Earn <span style={{ color: '#4ade80' }}>↑30%</span> in 48h
        </div>
        <button style={{ backgroundColor: '#3b82f6', color: '#fff', border: 'none', padding: '5px 12px', borderRadius: '15px', fontSize: '12px', fontWeight: 'bold' }}>LET'S GO</button>
      </div>

      <div style={{ padding: '15px' }}>
        
        {/* 3. MAIN TRADE POWER CARD */}
        <div style={{ backgroundColor: '#fff', borderRadius: '15px', padding: '20px 15px', textAlign: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>
          <div style={{ color: '#475569', fontWeight: 'bold', fontSize: '16px' }}>
            TP (Trade Power) 🔄
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', margin: '15px 0' }}>
            {/* Cube SVG Icon */}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="#10b981"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            <h1 style={{ fontSize: '38px', margin: 0, color: '#0f172a' }}>{tp}</h1>
          </div>

          <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '15px' }}>
            Daily Earn : <span style={{ fontWeight: 'bold', color: '#0f172a' }}>${daily}</span> <span style={{ color: '#84cc16', fontWeight: 'bold' }}>(+5.5%)</span> 📄 History
          </div>

          {/* Settlement Timer */}
          <div style={{ display: 'inline-block', backgroundColor: '#ede9fe', color: '#6d28d9', padding: '6px 15px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold' }}>
            🕒 Settlement time: {timeLeft.h}h {timeLeft.m}m {timeLeft.s}s
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button style={{ flex: 1, backgroundColor: '#84cc16', color: '#fff', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 'bold', fontSize: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
               Buy TP
            </button>
            <button style={{ flex: 1, backgroundColor: '#fce7f3', color: '#db2777', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 'bold', fontSize: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
               Refer&Earn
            </button>
          </div>
        </div>

        {/* 4. ROI TABLE SECTION */}
        <div style={{ backgroundColor: '#fff', borderRadius: '15px', marginTop: '15px', padding: '15px', position: 'relative', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>
          <div style={{ position: 'absolute', top: 10, right: -25, backgroundColor: '#f97316', color: '#fff', padding: '2px 30px', transform: 'rotate(45deg)', fontSize: '10px', fontWeight: 'bold' }}>HOT</div>
          
          <h3 style={{ color: '#6d28d9', textAlign: 'center', margin: '0 0 15px 0', fontSize: '15px' }}>Return on Investment in AiEarn</h3>
          
          <table style={{ width: '100%', fontSize: '13px', color: '#475569', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <th style={{ textAlign: 'left', paddingBottom: '8px', fontWeight: 'normal' }}>TP purchased</th>
                <th style={{ textAlign: 'right', paddingBottom: '8px', fontWeight: 'normal' }}>Daily Return</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '10px 0', color: '#94a3b8' }}>≥$0</td>
                <td style={{ textAlign: 'right', color: '#84cc16', fontWeight: 'bold' }}>5.5%</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '10px 0', color: '#94a3b8' }}>≥$20</td>
                <td style={{ textAlign: 'right', color: '#84cc16', fontWeight: 'bold' }}>6%</td>
              </tr>
              <tr>
                <td style={{ padding: '10px 0', color: '#94a3b8' }}>≥$300 🔥🔥🔥</td>
                <td style={{ textAlign: 'right', color: '#84cc16', fontWeight: 'bold' }}>6.5%</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 5. SUB-TABS (Trading Status / My Trade Power) */}
        <div style={{ display: 'flex', marginTop: '15px', backgroundColor: '#fff', borderRadius: '10px', overflow: 'hidden' }}>
          <button 
            onClick={() => setActiveMidTab("Ai Trading status")}
            style={{ flex: 1, padding: '12px', border: 'none', backgroundColor: activeMidTab === "Ai Trading status" ? '#fff' : '#f8fafc', color: activeMidTab === "Ai Trading status" ? '#6d28d9' : '#64748b', fontWeight: 'bold', borderBottom: activeMidTab === "Ai Trading status" ? '2px solid #6d28d9' : 'none', cursor: 'pointer' }}>
            Ai Trading status
          </button>
          <button 
            onClick={() => setActiveMidTab("My Trade Power")}
            style={{ flex: 1, padding: '12px', border: 'none', backgroundColor: activeMidTab === "My Trade Power" ? '#fff' : '#f8fafc', color: activeMidTab === "My Trade Power" ? '#6d28d9' : '#64748b', fontWeight: 'bold', borderBottom: activeMidTab === "My Trade Power" ? '2px solid #6d28d9' : 'none', cursor: 'pointer' }}>
            My Trade Power
          </button>
        </div>
      </div>

      {/* 6. BOTTOM NAVIGATION (FOOTER) */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', display: 'flex', justifyContent: 'space-around', padding: '10px 0', borderRadius: '20px 20px 0 0', boxShadow: '0 -2px 10px rgba(0,0,0,0.05)' }}>
        <div onClick={() => setActiveBottomTab("AiEarn")} style={{ textAlign: 'center', cursor: 'pointer', color: activeBottomTab === "AiEarn" ? '#ef4444' : '#64748b' }}>
          <div style={{ fontSize: '20px', marginBottom: '2px' }}>🧊</div>
          <div style={{ fontSize: '12px', fontWeight: 'bold' }}>AiEarn</div>
        </div>
        <div onClick={() => setActiveBottomTab("Friends")} style={{ textAlign: 'center', cursor: 'pointer', color: activeBottomTab === "Friends" ? '#3b82f6' : '#64748b' }}>
          <div style={{ fontSize: '20px', marginBottom: '2px' }}>👥</div>
          <div style={{ fontSize: '12px', fontWeight: 'bold' }}>Friends</div>
        </div>
        <div onClick={() => setActiveBottomTab("Introduction")} style={{ textAlign: 'center', cursor: 'pointer', color: activeBottomTab === "Introduction" ? '#10b981' : '#64748b' }}>
          <div style={{ fontSize: '20px', marginBottom: '2px' }}>ℹ️</div>
          <div style={{ fontSize: '12px', fontWeight: 'bold' }}>Introduction</div>
        </div>
      </div>

    </div>
  );
}