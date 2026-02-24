import React from 'react';

export default function Withdraw({ user, onBack }) {
  const balance = user?.balance?.toFixed(4) || "0.0000";

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* Header with Back Button */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <button 
          onClick={onBack} 
          style={{ border: 'none', background: 'none', fontSize: '24px', cursor: 'pointer', marginRight: '10px' }}
        >
          ←
        </button>
        <h2 style={{ fontSize: '20px', margin: 0 }}>Withdraw</h2>
      </div>

      {/* Available Balance Card */}
      <div style={{ backgroundColor: '#fff', borderRadius: '15px', padding: '20px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', marginBottom: '20px' }}>
        <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 10px 0' }}>Available balance :</p>
        <h1 style={{ fontSize: '32px', margin: '0 0 15px 0' }}>$ {balance}</h1>
        <button style={{ width: '100%', backgroundColor: '#0ea5e9', color: '#fff', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
           <span style={{fontSize: '18px'}}>🧊</span> Exchange to TP
        </button>
      </div>

      {/* Form Fields */}
      <div style={{ backgroundColor: '#fff', borderRadius: '15px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <label style={{ fontSize: '14px', color: '#475569' }}>Withdraw amount</label>
            <span style={{ fontSize: '14px', color: '#6366f1', fontWeight: 'bold', cursor: 'pointer' }}>All Amount</span>
          </div>
          <input type="text" placeholder="Min $1 USDT" style={{ width: '100%', padding: '15px', borderRadius: '25px', border: '1px solid #e2e8f0', fontSize: '16px', textAlign: 'center' }} />
        </div>

        <div style={{ marginBottom: '25px' }}>
          <label style={{ fontSize: '14px', color: '#475569', display: 'block', marginBottom: '8px' }}>
             <span style={{color: '#f59e0b'}}>🟡</span> BSC-USDT Receiving address:
          </label>
          <input type="text" placeholder="Eg. 0x4df...3das" style={{ width: '100%', padding: '15px', borderRadius: '25px', border: '1px solid #e2e8f0', fontSize: '16px', textAlign: 'center' }} />
        </div>

        <button style={{ width: '100%', backgroundColor: '#84cc16', color: '#fff', border: 'none', padding: '15px', borderRadius: '30px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' }}>
          Continue
        </button>
      </div>
    </div>
  );
}