import React, { useEffect, useState } from "react";

export default function Dashboard({ user }) {
  const [activeBottomTab, setActiveBottomTab] = useState("AiEarn");
  const [activeMidTab, setActiveMidTab] = useState("Ai Trading status");

  // Countdown timer (15h 32m 11s default)
  const initialSeconds = 15 * 3600 + 32 * 60 + 11;
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : initialSeconds));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const h = Math.floor(secondsLeft / 3600);
  const m = Math.floor((secondsLeft % 3600) / 60);
  const s = secondsLeft % 60;

  const earned = user?.totalEarned?.toFixed(4) || "0.0000";
  const tp = user?.tradePower || "0.0";
  const daily = user?.dailyEarn?.toFixed(3) || "0.000";

  return (
    <div className="app">

      {/* HEADER */}
      <div className="top-header">
        <div className="earned">
          You Earned : <span>₮ {earned}</span>
        </div>
        <button className="withdraw-btn">Withdraw →</button>
      </div>

      {/* PROMO */}
      <div className="promo">
        <div>
          <span className="pink">WEEKEND EARN FAST</span> 🎉<br />
          Earn <span className="green">↑30%</span> in 48h
        </div>
        <button className="promo-btn">LET'S GO</button>
      </div>

      <div className="container">

        {/* TP CARD */}
        <div className="card">
          <div className="title">TP (Trade Power) 🔄</div>

          <div className="tp-box">
            <div className="cube">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#10b981">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <h1>{tp}</h1>
          </div>

          <div className="daily">
            Daily Earn : <b>${daily}</b>{" "}
            <span className="green">(+5.5%)</span> 📄 History
          </div>

          <div className="settlement">
            🕒 Settlement time: {h}h {m}m {s}s
          </div>

          <div className="btn-group">
            <button className="buy-btn">Buy TP</button>
            <button className="refer-btn">Refer&Earn</button>
          </div>
        </div>

        {/* ROI TABLE */}
        <div className="card roi">
          <div className="hot">HOT</div>
          <h3>Return on Investment in AiEarn</h3>

          <table>
            <thead>
              <tr>
                <th>TP purchased</th>
                <th>Daily Return</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>≥$0</td>
                <td className="green">5.5%</td>
              </tr>
              <tr>
                <td>≥$20</td>
                <td className="green">6%</td>
              </tr>
              <tr>
                <td>≥$300 🔥🔥🔥</td>
                <td className="green">6.5%</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* MID TABS */}
        <div className="mid-tabs">
          <button
            className={activeMidTab === "Ai Trading status" ? "active" : ""}
            onClick={() => setActiveMidTab("Ai Trading status")}
          >
            Ai Trading status
          </button>
          <button
            className={activeMidTab === "My Trade Power" ? "active" : ""}
            onClick={() => setActiveMidTab("My Trade Power")}
          >
            My Trade Power
          </button>
        </div>
      </div>

      {/* BOTTOM NAV */}
      <div className="bottom-nav">
        <div
          className={`nav-item ${activeBottomTab === "AiEarn" ? "active-red" : ""}`}
          onClick={() => setActiveBottomTab("AiEarn")}
        >
          🧊
          <span>AiEarn</span>
        </div>

        <div
          className={`nav-item ${activeBottomTab === "Friends" ? "active-blue" : ""}`}
          onClick={() => setActiveBottomTab("Friends")}
        >
          👥
          <span>Friends</span>
        </div>

        <div
          className={`nav-item ${activeBottomTab === "Introduction" ? "active-green" : ""}`}
          onClick={() => setActiveBottomTab("Introduction")}
        >
          ℹ️
          <span>Introduction</span>
        </div>
      </div>

      {/* STYLES */}
      <style>{`
        body { margin:0; }
        .app {
          background:#f4f5fa;
          min-height:100vh;
          padding-bottom:90px;
          font-family:Arial;
        }
        .top-header {
          display:flex;
          justify-content:space-between;
          padding:12px 16px;
          background:#fff;
          border-bottom:1px solid #eee;
        }
        .earned span { color:#10b981; font-weight:bold; }
        .withdraw-btn {
          background:#f59e0b;
          border:none;
          color:#fff;
          padding:6px 14px;
          border-radius:18px;
          font-weight:bold;
          cursor:pointer;
        }
        .promo {
          background:#2f3e2e;
          color:#fff;
          display:flex;
          justify-content:space-between;
          padding:10px 16px;
        }
        .promo-btn {
          background:#3b82f6;
          border:none;
          color:#fff;
          padding:6px 12px;
          border-radius:14px;
          font-weight:bold;
        }
        .pink { color:#f472b6; font-weight:bold; }
        .green { color:#84cc16; font-weight:bold; }
        .container { padding:16px; }
        .card {
          background:#fff;
          padding:20px;
          border-radius:14px;
          margin-bottom:16px;
          position:relative;
        }
        .tp-box {
          display:flex;
          justify-content:center;
          align-items:center;
          gap:12px;
          margin:15px 0;
        }
        .cube {
          background:#e6fffa;
          padding:8px;
          border-radius:8px;
        }
        .settlement {
          background:#ede9fe;
          color:#6d28d9;
          padding:8px 14px;
          border-radius:20px;
          display:inline-block;
          margin-top:10px;
          font-weight:bold;
        }
        .btn-group {
          display:flex;
          gap:10px;
          margin-top:16px;
        }
        .buy-btn {
          flex:1;
          background:#84cc16;
          border:none;
          color:#fff;
          padding:10px;
          border-radius:10px;
          font-weight:bold;
        }
        .refer-btn {
          flex:1;
          background:#fce7f3;
          border:none;
          color:#db2777;
          padding:10px;
          border-radius:10px;
          font-weight:bold;
        }
        .roi .hot {
          position:absolute;
          top:10px;
          right:-25px;
          background:#f97316;
          color:#fff;
          padding:4px 30px;
          transform:rotate(45deg);
          font-size:12px;
          font-weight:bold;
        }
        table { width:100%; font-size:14px; }
        th { text-align:left; padding-bottom:8px; }
        td { padding:8px 0; }
        .mid-tabs {
          display:flex;
          background:#fff;
          border-radius:10px;
          overflow:hidden;
        }
        .mid-tabs button {
          flex:1;
          padding:12px;
          border:none;
          background:#f8fafc;
          font-weight:bold;
        }
        .mid-tabs .active {
          background:#fff;
          color:#6d28d9;
          border-bottom:2px solid #6d28d9;
        }
        .bottom-nav {
          position:fixed;
          bottom:0;
          left:0;
          right:0;
          background:#fff;
          display:flex;
          justify-content:space-around;
          padding:10px 0;
          border-radius:20px 20px 0 0;
          box-shadow:0 -2px 10px rgba(0,0,0,0.05);
        }
        .nav-item {
          text-align:center;
          font-size:20px;
          cursor:pointer;
        }
        .nav-item span {
          display:block;
          font-size:12px;
          font-weight:bold;
        }
        .active-red { color:#ef4444; }
        .active-blue { color:#3b82f6; }
        .active-green { color:#10b981; }
      `}</style>
    </div>
  );
}